"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LevelId, VocabularyItem } from "../../../lib/vocabulary";
import {
  getFirstLetter,
  getMeaning,
  getWord,
  normalizeText,
} from "../../../lib/vocabulary";
import { recordLevelCompletion } from "../../../lib/lessonCompletion";
import {
  createQuizQuestionForAnswer,
  shuffle,
  type QuizQuestion,
} from "../../../lib/quiz";
import { supabase } from "../../../lib/supabase";
import {
  getLocalDateKey,
  recordDailyCorrectWord,
  recordDailyStreak,
} from "../../../lib/streak";

type VocabularyStudyPageProps = {
  level: LevelId;
  vocabularyData: VocabularyItem[];
};

type StudyMode = "learn" | "test";

type StoredProgress = {
  completedAt?: string;
  correctKeys?: string[];
  testElapsedSeconds?: number;
  tipCounts?: Record<string, number>;
  totalWords?: number;
  wrongKeys?: string[];
};

type ProgressRow = {
  status: "correct" | "wrong";
  word_key: string;
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const correctFeedbackMessages = [
  "Chính xác",
  "Tuyệt vời",
  "Chuẩn rồi",
  "Quá tốt",
  "Đúng bài",
  "Bạn nhớ từ này rồi",
];
const wrongFeedbackMessages = [
  "Chưa đúng, lưu lại để ôn nhé",
  "Sai rồi, lát nữa gặp lại từ này",
  "Suýt đúng, thử lại vòng sau",
  "Chưa khớp nghĩa, mình giữ vào nhóm cần ôn",
  "Không sao, từ này sẽ quay lại",
  "Sai rồi, đánh dấu để luyện thêm",
];
const audioLookupTimeoutMs = 850;

function getPartOfSpeech(item: VocabularyItem) {
  return item["loại từ"] || item["partOfSpeech"] || "";
}

function getExample(item: VocabularyItem) {
  return item["ví dụ"] || item["example"] || "";
}

function getExampleMeaning(item: VocabularyItem) {
  return item["nghĩa ví dụ"] || item["translatedExample"] || "";
}

function getPronunciation(item: VocabularyItem) {
  const customPronunciation =
    item["phiên âm"] ||
    item["phien am"] ||
    item["pronunciation"] ||
    item["ipa"];

  if (customPronunciation) {
    return customPronunciation.startsWith("/")
      ? customPronunciation
      : `/${customPronunciation}/`;
  }

  return "";
}

function getWordKey(item: VocabularyItem) {
  return `${normalizeText(getWord(item))}::${normalizeText(getMeaning(item))}`;
}

function getStorageKey(level: LevelId, ownerKey: string) {
  return `yenth:vocabulary:${ownerKey}:${level.toLowerCase()}:progress`;
}

function getProgressOwnerKey(userId: string) {
  return userId ? `user:${userId}` : "guest";
}

function getDailyGoalStorageKey(level: LevelId, ownerKey: string) {
  return `yenth:vocabulary:${ownerKey}:${level.toLowerCase()}:daily:${getLocalDateKey()}`;
}

function formatElapsedTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function SpeakerIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      viewBox="0 0 24 24"
      width="18"
    >
      <path
        d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function isTextEntryTarget(target: EventTarget | null) {
  if (target instanceof HTMLTextAreaElement) {
    return true;
  }

  if (target instanceof HTMLInputElement) {
    return !["button", "checkbox", "radio", "reset", "submit"].includes(
      target.type,
    );
  }

  return target instanceof HTMLElement && target.isContentEditable;
}

function pickQuestion(
  remainingWords: VocabularyItem[],
  allWords: VocabularyItem[],
  previousKey?: string,
) {
  if (remainingWords.length === 0) {
    return null;
  }

  const candidates =
    remainingWords.length > 1
      ? remainingWords.filter((item) => getWordKey(item) !== previousKey)
      : remainingWords;
  const answer =
    candidates[Math.floor(Math.random() * candidates.length)] ||
    remainingWords[0];

  return createQuizQuestionForAnswer(answer, allWords);
}

export default function VocabularyStudyPage({
  level,
  vocabularyData,
}: VocabularyStudyPageProps) {
  const words = useMemo(
    () => vocabularyData.filter((item) => getWord(item) && getMeaning(item)),
    [vocabularyData],
  );
  const [mode, setMode] = useState<StudyMode>("learn");
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("ALL");
  const [selectedWordKey, setSelectedWordKey] = useState("");
  const [correctKeys, setCorrectKeys] = useState<Set<string>>(() => new Set());
  const [wrongKeys, setWrongKeys] = useState<Set<string>>(() => new Set());
  const [tipCounts, setTipCounts] = useState<Record<string, number>>({});
  const [testElapsedSeconds, setTestElapsedSeconds] = useState(0);
  const [currentTipStage, setCurrentTipStage] = useState(0);
  const [isTipPopupOpen, setIsTipPopupOpen] = useState(false);
  const [completedAt, setCompletedAt] = useState("");
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const [userId, setUserId] = useState("");
  const [progressStorageKey, setProgressStorageKey] = useState("");
  const [quiz, setQuiz] = useState<QuizQuestion<VocabularyItem> | null>(null);
  const [selectedAnswerKey, setSelectedAnswerKey] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [speakingKey, setSpeakingKey] = useState("");
  const audioCacheRef = useRef<Map<string, string | null>>(new Map());
  const hasResolvedTestSessionRef = useRef(false);

  const letters = useMemo(() => {
    const counts = words.reduce<Record<string, number>>((result, item) => {
      const letter = getFirstLetter(item);
      if (alphabet.includes(letter)) {
        result[letter] = (result[letter] || 0) + 1;
      }
      return result;
    }, {});

    return alphabet.filter((letter) => counts[letter]);
  }, [words]);

  const filteredWords = useMemo(() => {
    const keyword = normalizeText(search);

    return words.filter((item) => {
      const matchesLetter =
        selectedLetter === "ALL" || getFirstLetter(item) === selectedLetter;
      if (!matchesLetter) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      return [
        getWord(item),
        getPartOfSpeech(item),
        getMeaning(item),
        getExample(item),
        getExampleMeaning(item),
      ]
        .map(normalizeText)
        .join(" ")
        .includes(keyword);
    });
  }, [search, selectedLetter, words]);

  const selectedWord = useMemo(() => {
    return (
      filteredWords.find((item) => getWordKey(item) === selectedWordKey) ||
      filteredWords[0]
    );
  }, [filteredWords, selectedWordKey]);

  const remainingWords = useMemo(() => {
    return words.filter((item) => !correctKeys.has(getWordKey(item)));
  }, [correctKeys, words]);

  const wrongWords = useMemo(() => {
    return words.filter(
      (item) =>
        wrongKeys.has(getWordKey(item)) && !correctKeys.has(getWordKey(item)),
    );
  }, [correctKeys, wrongKeys, words]);

  const currentAnswer = quiz?.answer || null;
  const currentAnswerKey = currentAnswer ? getWordKey(currentAnswer) : "";
  const currentWord = currentAnswer ? getWord(currentAnswer) : "";
  const shouldShowPromptInline =
    currentWord.length > 0 &&
    currentWord.length <= 14 &&
    !currentWord.includes(" ");
  const totalTipCount = Object.values(tipCounts).reduce(
    (total, count) => total + count,
    0,
  );
  const correctCount = Math.min(correctKeys.size, words.length);
  const progress = words.length
    ? Math.round((correctCount / words.length) * 100)
    : 0;
  const isCorrect = selectedAnswerKey === currentAnswerKey;
  const didUseCurrentTip = currentTipStage > 0;

  useEffect(() => {
    let isMounted = true;
    const validKeys = new Set(words.map(getWordKey));

    async function loadProgress() {
      setIsProgressLoaded(false);
      let nextCorrectKeys = new Set<string>();
      let nextWrongKeys = new Set<string>();
      let nextTipCounts: Record<string, number> = {};
      let nextTestElapsedSeconds = 0;
      let nextCompletedAt = "";
      let currentUserId = "";

      if (supabase) {
        const { data: userData } = await supabase.auth.getUser();
        currentUserId = userData.user?.id || "";
      }

      const nextStorageKey = getStorageKey(
        level,
        getProgressOwnerKey(currentUserId),
      );
      const rawProgress = window.localStorage.getItem(nextStorageKey);

      if (rawProgress) {
        try {
          const parsed = JSON.parse(rawProgress) as StoredProgress;
          nextCorrectKeys = new Set(
            (parsed.correctKeys || []).filter((key) => validKeys.has(key)),
          );
          nextWrongKeys = new Set(
            (parsed.wrongKeys || []).filter((key) => validKeys.has(key)),
          );
          nextTipCounts = Object.fromEntries(
            Object.entries(parsed.tipCounts || {})
              .filter(
                ([key, count]) =>
                  validKeys.has(key) && Number.isFinite(count) && count > 0,
              )
              .map(([key, count]) => [key, Math.floor(count)]),
          );
          nextTestElapsedSeconds = Math.max(
            0,
            Math.floor(parsed.testElapsedSeconds || 0),
          );
          nextCompletedAt = parsed.completedAt || "";
        } catch {
          nextCorrectKeys = new Set();
          nextWrongKeys = new Set();
          nextTipCounts = {};
          nextTestElapsedSeconds = 0;
          nextCompletedAt = "";
        }
      }

      if (supabase) {
        if (currentUserId) {
          const { data, error } = await supabase
            .from("vocabulary_progress")
            .select("status, word_key")
            .eq("user_id", currentUserId)
            .eq("level", level);

          if (!error && Array.isArray(data)) {
            nextCorrectKeys = new Set(
              (data as ProgressRow[])
                .filter(
                  (row) =>
                    row.status === "correct" && validKeys.has(row.word_key),
                )
                .map((row) => row.word_key),
            );
            nextWrongKeys = new Set(
              (data as ProgressRow[])
                .filter(
                  (row) =>
                    row.status === "wrong" && validKeys.has(row.word_key),
                )
                .map((row) => row.word_key),
            );
          }
        }

        if (isMounted) {
          setUserId(currentUserId);
          setProgressStorageKey(nextStorageKey);
        }
      }

      if (isMounted) {
        if (!supabase) {
          setProgressStorageKey(nextStorageKey);
        }
        setCorrectKeys(nextCorrectKeys);
        setWrongKeys(nextWrongKeys);
        setTipCounts(nextTipCounts);
        setTestElapsedSeconds(nextTestElapsedSeconds);
        setCompletedAt(nextCompletedAt);
        setIsProgressLoaded(true);
      }
    }

    void loadProgress();

    return () => {
      isMounted = false;
    };
  }, [level, words]);

  useEffect(() => {
    if (!isProgressLoaded || !progressStorageKey) {
      return;
    }

    window.localStorage.setItem(
      progressStorageKey,
      JSON.stringify({
        completedAt,
        correctKeys: Array.from(correctKeys),
        testElapsedSeconds,
        tipCounts,
        totalWords: words.length,
        wrongKeys: Array.from(wrongKeys),
      }),
    );
  }, [
    completedAt,
    correctKeys,
    isProgressLoaded,
    progressStorageKey,
    testElapsedSeconds,
    tipCounts,
    words.length,
    wrongKeys,
  ]);

  useEffect(() => {
    if (
      !isProgressLoaded ||
      completedAt ||
      words.length === 0 ||
      correctKeys.size < words.length
    ) {
      return;
    }

    setCompletedAt(new Date().toISOString());
  }, [completedAt, correctKeys.size, isProgressLoaded, words.length]);

  useEffect(() => {
    if (
      !isProgressLoaded ||
      !supabase ||
      words.length === 0 ||
      correctKeys.size < words.length
    ) {
      return;
    }

    void supabase.auth.getUser().then(({ data }) => {
      void recordLevelCompletion(data.user, level, words.length);
    });
  }, [correctKeys.size, isProgressLoaded, level, words.length]);

  useEffect(() => {
    if (!isProgressLoaded || !supabase || !userId) {
      return;
    }

    const rows = [
      ...Array.from(correctKeys).map((wordKey) => ({
        level,
        status: "correct",
        user_id: userId,
        word_key: wordKey,
      })),
      ...Array.from(wrongKeys)
        .filter((wordKey) => !correctKeys.has(wordKey))
        .map((wordKey) => ({
          level,
          status: "wrong",
          user_id: userId,
          word_key: wordKey,
        })),
    ];

    async function syncUserProgress() {
      await supabase
        .from("vocabulary_progress")
        .delete()
        .eq("user_id", userId)
        .eq("level", level);

      if (rows.length > 0) {
        await supabase.from("vocabulary_progress").upsert(rows, {
          onConflict: "user_id,level,word_key",
        });
      }
    }

    void syncUserProgress();
  }, [correctKeys, isProgressLoaded, level, userId, wrongKeys]);

  useEffect(() => {
    if (selectedWord && getWordKey(selectedWord) !== selectedWordKey) {
      setSelectedWordKey(getWordKey(selectedWord));
    }
  }, [selectedWord, selectedWordKey]);

  useEffect(() => {
    if (
      mode !== "test" ||
      !isProgressLoaded ||
      quiz ||
      remainingWords.length === 0
    ) {
      return;
    }

    setQuiz(pickQuestion(remainingWords, words));
  }, [isProgressLoaded, mode, quiz, remainingWords, words]);

  useEffect(() => {
    if (mode !== "test" || !isProgressLoaded || remainingWords.length === 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setTestElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isProgressLoaded, mode, remainingWords.length]);

  function resetQuestionState() {
    setSelectedAnswerKey("");
    setIsSubmitted(false);
    setFeedbackMessage("");
    setCurrentTipStage(0);
    setIsTipPopupOpen(false);
  }

  function startTest() {
    if (!hasResolvedTestSessionRef.current && testElapsedSeconds > 0) {
      hasResolvedTestSessionRef.current = true;

      const shouldContinue = window.confirm(
        `Bạn có phiên kiểm tra trước đó (${formatElapsedTime(testElapsedSeconds)}). Chọn OK để tiếp tục, Cancel để làm lại.`,
      );

      if (!shouldContinue) {
        restartTestSession();
        return;
      }
    }

    setMode("test");
    resetQuestionState();
    setQuiz((previous) => previous || pickQuestion(remainingWords, words));
  }

  function restartTestSession() {
    hasResolvedTestSessionRef.current = true;
    setMode("test");
    setCorrectKeys(new Set());
    setWrongKeys(new Set());
    setTipCounts({});
    setTestElapsedSeconds(0);
    setCompletedAt("");
    resetQuestionState();
    setQuiz(pickQuestion(words, words));
  }

  function goNextQuestion() {
    resetQuestionState();
    setQuiz(pickQuestion(remainingWords, words, currentAnswerKey));
  }

  function submitAnswer() {
    if (!quiz || !selectedAnswerKey || isSubmitted) {
      return;
    }

    if (supabase) {
      void supabase.auth
        .getUser()
        .then(({ data }) => recordDailyStreak(data.user, level));
    }

    setIsSubmitted(true);

    if (didUseCurrentTip && isCorrect) {
      setFeedbackMessage("Tôi sẽ kiểm tra từ này sau");
      return;
    }

    if (isCorrect) {
      setFeedbackMessage(getRandomMessage(correctFeedbackMessages));
      recordTodayCorrectAnswer(currentAnswerKey);
      setCorrectKeys((previous) => {
        const next = new Set(previous);
        next.add(currentAnswerKey);

        if (next.size >= words.length && supabase) {
          void supabase.auth.getUser().then(({ data }) => {
            void recordLevelCompletion(data.user, level, words.length);
          });
        }

        return next;
      });
      setWrongKeys((previous) => {
        const next = new Set(previous);
        next.delete(currentAnswerKey);
        return next;
      });
      return;
    }

    setFeedbackMessage(getRandomMessage(wrongFeedbackMessages));
    setWrongKeys((previous) => new Set(previous).add(currentAnswerKey));
  }

  function resetProgress() {
    setCorrectKeys(new Set());
    setWrongKeys(new Set());
    setTipCounts({});
    setTestElapsedSeconds(0);
    setCompletedAt("");
    hasResolvedTestSessionRef.current = true;
    resetQuestionState();
    setQuiz(pickQuestion(words, words));
  }

  function requestTip() {
    if (!currentAnswerKey || isSubmitted) {
      return;
    }

    if (currentTipStage === 0) {
      setCurrentTipStage(1);
      setIsTipPopupOpen(true);
      setTipCounts((previous) => ({
        ...previous,
        [currentAnswerKey]: (previous[currentAnswerKey] || 0) + 1,
      }));
      return;
    }

    if (currentTipStage === 1) {
      setCurrentTipStage(2);
    }

    setIsTipPopupOpen(true);
  }

  function confirmResetProgress() {
    if (!window.confirm("Bạn có chắc muốn xóa toàn bộ tiến độ của bài này?")) {
      return;
    }

    resetProgress();
  }

  function shuffleLearnList() {
    const shuffled = shuffle(filteredWords);
    const nextWord = shuffled[0];
    if (nextWord) {
      setSelectedWordKey(getWordKey(nextWord));
    }
  }

  function getRandomMessage(messages: string[]) {
    return messages[Math.floor(Math.random() * messages.length)] || messages[0];
  }

  function recordTodayCorrectAnswer(wordKey: string) {
    if (!wordKey) {
      return;
    }

    const storageKey = getDailyGoalStorageKey(
      level,
      getProgressOwnerKey(userId),
    );

    try {
      const parsed = JSON.parse(
        window.localStorage.getItem(storageKey) || "{}",
      ) as {
        correctKeys?: string[];
      };
      const nextCorrectKeys = new Set(parsed.correctKeys || []);
      nextCorrectKeys.add(wordKey);

      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          correctKeys: Array.from(nextCorrectKeys),
        }),
      );
    } catch {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          correctKeys: [wordKey],
        }),
      );
    }

    if (supabase) {
      void supabase.auth.getUser().then(({ data }) => {
        void recordDailyCorrectWord(data.user, level, wordKey);
      });
    }
  }

  function selectEnglishVoice() {
    if (!("speechSynthesis" in window)) {
      return null;
    }

    const voices = window.speechSynthesis.getVoices();
    const englishVoices = voices.filter((voice) =>
      voice.lang.toLowerCase().startsWith("en"),
    );

    return (
      englishVoices
        .map((voice) => {
          const name = voice.name.toLowerCase();
          let score = 0;

          if (voice.lang.toLowerCase() === "en-us") {
            score += 20;
          }
          if (voice.localService) {
            score += 8;
          }
          if (name.includes("google") || name.includes("microsoft")) {
            score += 7;
          }
          if (
            name.includes("aria") ||
            name.includes("jenny") ||
            name.includes("samantha")
          ) {
            score += 5;
          }

          return { voice, score };
        })
        .sort((first, second) => second.score - first.score)[0]?.voice || null
    );
  }

  function speakWithBrowserVoice(word: string) {
    if (!("speechSynthesis" in window)) {
      return;
    }

    if (!word) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(word);
    const voice = selectEnglishVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "en-US";
    }

    utterance.rate = 0.82;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function getDictionaryAudioUrl(
    word: string,
    timeoutMs = audioLookupTimeoutMs,
  ) {
    const normalizedWord = word.trim().toLowerCase();

    if (!normalizedWord || normalizedWord.includes(" ")) {
      return null;
    }

    if (audioCacheRef.current.has(normalizedWord)) {
      return audioCacheRef.current.get(normalizedWord) || null;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalizedWord)}`,
        { signal: controller.signal },
      );

      if (!response.ok) {
        audioCacheRef.current.set(normalizedWord, null);
        return null;
      }

      const entries = await response.json();
      const phonetics = Array.isArray(entries)
        ? entries.flatMap((entry) =>
            Array.isArray(entry?.phonetics) ? entry.phonetics : [],
          )
        : [];
      const audioUrl =
        phonetics.find(
          (item) =>
            typeof item?.audio === "string" && item.audio.includes("-us."),
        )?.audio ||
        phonetics.find((item) => typeof item?.audio === "string" && item.audio)
          ?.audio ||
        null;

      audioCacheRef.current.set(normalizedWord, audioUrl);
      return audioUrl;
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        audioCacheRef.current.set(normalizedWord, null);
      }
      return null;
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  async function playAudioUrl(audioUrl: string) {
    await new Promise<void>((resolve, reject) => {
      const audio = new Audio(audioUrl);
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error("Audio failed"));
      audio.play().catch(reject);
    });
  }

  async function speakWord(item: VocabularyItem | null | undefined) {
    const word = item ? getWord(item).trim() : "";

    if (!word) {
      return;
    }

    setSpeakingKey(item ? getWordKey(item) : word);

    try {
      const audioUrl = await getDictionaryAudioUrl(word);

      if (audioUrl) {
        await playAudioUrl(audioUrl);
        return;
      }

      speakWithBrowserVoice(word);
    } finally {
      window.setTimeout(() => setSpeakingKey(""), 300);
    }
  }

  useEffect(() => {
    const wordsToWarm = [selectedWord, currentAnswer]
      .filter((item): item is VocabularyItem => Boolean(item))
      .map((item) => getWord(item));

    wordsToWarm.forEach((word) => {
      void getDictionaryAudioUrl(word, 2200);
    });
  }, [currentAnswerKey, selectedWordKey]);

  useEffect(() => {
    function handleSpaceKey(event: KeyboardEvent) {
      if (
        isTextEntryTarget(event.target) ||
        mode !== "test" ||
        event.code !== "Space" ||
        !quiz
      ) {
        return;
      }

      if (!selectedAnswerKey && !isSubmitted) {
        return;
      }

      event.preventDefault();

      if (isSubmitted) {
        goNextQuestion();
        return;
      }

      submitAnswer();
    }

    window.addEventListener("keydown", handleSpaceKey);
    return () => window.removeEventListener("keydown", handleSpaceKey);
  }, [didUseCurrentTip, isSubmitted, mode, quiz, selectedAnswerKey]);

  return (
    <main className="vocabStudyPage">
      <section className="vocabStudyHero">
        <div>
          <Link href="/vocabulary" className="testBackLink">
            Vocabulary
          </Link>
          <h1>{level.toUpperCase()} Vocabulary</h1>
          <p>{words.length.toLocaleString("vi-VN")} từ vựng</p>
        </div>

        <div className="vocabStudyStats" aria-label="Tiến độ kiểm tra">
          <div>
            <span>Đúng</span>
            <strong>{correctCount}</strong>
          </div>
          <div>
            <span>Sai cần ôn</span>
            <strong>{wrongWords.length}</strong>
          </div>
          <div>
            <span>Còn lại</span>
            <strong>{remainingWords.length}</strong>
          </div>
          <div>
            <span>Tổng số lần xin tip</span>
            <strong>{totalTipCount}</strong>
          </div>
        </div>

        <div className="vocabStudyTabs" aria-label="Chọn chế độ học">
          <button
            className={mode === "learn" ? "active" : ""}
            type="button"
            onClick={() => setMode("learn")}
          >
            Học
          </button>
          <button
            className={mode === "test" ? "active" : ""}
            type="button"
            onClick={startTest}
          >
            Kiểm tra
          </button>
          <div aria-label={`${progress}% hoàn thành`}>
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      {mode === "learn" ? (
        <section className="vocabLearnLayout">
          <aside className="vocabLearnPanel">
            <label className="searchBox">
              Tìm nhanh
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Từ, nghĩa, ví dụ..."
              />
            </label>

            <div className="vocabLetterFilter" aria-label="Lọc theo chữ cái">
              <button
                className={selectedLetter === "ALL" ? "active" : ""}
                type="button"
                onClick={() => setSelectedLetter("ALL")}
              >
                Tất cả
              </button>
              {letters.map((letter) => (
                <button
                  className={selectedLetter === letter ? "active" : ""}
                  key={letter}
                  type="button"
                  onClick={() => setSelectedLetter(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="vocabWordList" aria-label="Danh sách từ">
              {filteredWords.map((item) => {
                const key = getWordKey(item);
                return (
                  <button
                    className={
                      key === getWordKey(selectedWord || item) ? "active" : ""
                    }
                    key={key}
                    type="button"
                    onClick={() => setSelectedWordKey(key)}
                  >
                    <strong>{getWord(item)}</strong>
                    <span>{getMeaning(item)}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <article className="vocabLearnCard">
            {selectedWord ? (
              <>
                <div className="vocabLearnCardHead">
                  <div>
                    <span>{getPartOfSpeech(selectedWord) || level}</span>
                    <h2>{getWord(selectedWord)}</h2>
                    {getPronunciation(selectedWord) ? (
                      <p>{getPronunciation(selectedWord)}</p>
                    ) : null}
                  </div>
                  <div className="vocabLearnActions">
                    <button
                      aria-label={`Phát âm ${getWord(selectedWord)}`}
                      className={`audioIconButton ${speakingKey === getWordKey(selectedWord) ? "playing" : ""}`}
                      title="Phát âm"
                      type="button"
                      onClick={() => speakWord(selectedWord)}
                    >
                      <SpeakerIcon />
                    </button>
                    <button
                      className="secondaryButton"
                      type="button"
                      onClick={shuffleLearnList}
                    >
                      Đổi từ
                    </button>
                  </div>
                </div>

                <dl className="vocabLearnDetails">
                  <div>
                    <dt>Nghĩa</dt>
                    <dd>{getMeaning(selectedWord)}</dd>
                  </div>
                  <div>
                    <dt>Ví dụ</dt>
                    <dd>
                      {getExample(selectedWord) || "Chưa có ví dụ cho từ này."}
                    </dd>
                  </div>
                  <div>
                    <dt>Dịch ví dụ</dt>
                    <dd>
                      {getExampleMeaning(selectedWord) ||
                        "Chưa có bản dịch ví dụ."}
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <div className="vocabEmptyState">Không tìm thấy từ phù hợp.</div>
            )}
          </article>
        </section>
      ) : (
        <section className="vocabTestLayout">
          <article className="vocabTestCard">
            {remainingWords.length === 0 ? (
              <div className="vocabEmptyState">
                <p className="homeEyebrow">Hoàn thành</p>
                <h2>
                  Chúc mừng! Bạn đã trả lời đúng toàn bộ{" "}
                  {words.length.toLocaleString("vi-VN")} từ.
                </h2>
                <p>Level này đã được đánh dấu Completed.</p>
                <button
                  className="primaryButton"
                  type="button"
                  onClick={resetProgress}
                >
                  Làm lại từ đầu
                </button>
              </div>
            ) : quiz && currentAnswer ? (
              <>
                <div className="questionHead">
                  <span>Chọn nghĩa đúng</span>
                  <strong>
                    {progress}% hoàn thành ·{" "}
                    {formatElapsedTime(testElapsedSeconds)}
                  </strong>
                </div>
                <div className="wordPromptCard">
                  <div
                    className={`wordPromptText ${shouldShowPromptInline ? "inline" : ""}`}
                  >
                    <strong>{currentWord.toUpperCase()}</strong>
                    <span aria-hidden="true" className="wordPromptDivider">
                      |
                    </span>
                    <span>{currentWord.toLowerCase()}</span>
                  </div>
                  <div className="wordPromptMeta">
                    <span>{getPartOfSpeech(currentAnswer) || level}</span>
                    {getPronunciation(currentAnswer) ? (
                      <span>{getPronunciation(currentAnswer)}</span>
                    ) : null}
                    <button
                      aria-label={`Phát âm ${getWord(currentAnswer)}`}
                      className={`audioIconButton ${speakingKey === currentAnswerKey ? "playing" : ""}`}
                      title="Phát âm"
                      type="button"
                      onClick={() => speakWord(currentAnswer)}
                    >
                      <SpeakerIcon />
                    </button>
                  </div>
                </div>

                <div className="tipActionRow">
                  <button
                    className="secondaryButton"
                    disabled={isSubmitted}
                    type="button"
                    onClick={requestTip}
                  >
                    {currentTipStage === 0
                      ? "Xin tip"
                      : currentTipStage === 1
                        ? "Xem nghĩa ví dụ"
                        : "Xem tip"}
                  </button>
                </div>

                <fieldset
                  className={`answerList ${level === "B1" ? "b1AnswerReview" : ""}`}
                >
                  <legend className="srOnly">Chọn đáp án</legend>
                  {quiz.options.map((option, index) => {
                    const optionKey = getWordKey(option);
                    const letter = String.fromCharCode(65 + index);
                    const statusClass =
                      !isSubmitted
                        ? optionKey === selectedAnswerKey
                          ? "selected"
                          : "unselected"
                        : optionKey === currentAnswerKey
                        ? "correct"
                        : optionKey === selectedAnswerKey
                          ? "wrong"
                          : "unselected";

                    return (
                      <label
                        className={`testAnswer ${statusClass}`}
                        key={`${optionKey}-${letter}`}
                      >
                        <input
                          checked={selectedAnswerKey === optionKey}
                          disabled={isSubmitted}
                          name="vocabulary-answer"
                          type="radio"
                          value={optionKey}
                          onChange={() => setSelectedAnswerKey(optionKey)}
                        />
                        <span>
                          {letter}. {getMeaning(option)}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>

                <div className="testActions">
                  <button
                    className="primaryButton"
                    disabled={!selectedAnswerKey}
                    type="button"
                    onClick={isSubmitted ? goNextQuestion : submitAnswer}
                  >
                    {isSubmitted ? "Câu tiếp theo" : "Trả lời"}
                  </button>
                  <button
                    className="secondaryButton"
                    type="button"
                    onClick={confirmResetProgress}
                  >
                    Xóa tiến độ
                  </button>
                </div>
                <span className="vocabShortcutHint">
                  {isSubmitted
                    ? "Nhấn Space để sang câu tiếp theo"
                    : "Chọn đáp án rồi nhấn Space để kiểm tra"}
                </span>

                {isSubmitted ? (
                  <div
                    className={`vocabAnswerFeedback ${level === "B1" ? "b1VocabAnswerFeedback" : ""} ${
                      level === "B1"
                        ? "neutral"
                        : didUseCurrentTip
                          ? "neutral"
                          : isCorrect
                            ? "correct"
                            : "wrong"
                    }`}
                  >
                    {feedbackMessage}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="vocabEmptyState">Đang chuẩn bị câu hỏi...</div>
            )}
          </article>

          <aside className="vocabReviewPanel">
            <h2>Từ trả lời sai</h2>
            <div>
              {wrongWords.length ? (
                wrongWords.slice(0, 12).map((item) => (
                  <span key={getWordKey(item)}>
                    {getWord(item)} <small>{getMeaning(item)}</small>
                  </span>
                ))
              ) : (
                <em>Chưa có từ sai.</em>
              )}
            </div>
          </aside>
        </section>
      )}

      {isTipPopupOpen && currentAnswer && currentTipStage > 0 ? (
        <div
          aria-labelledby="tipPopupTitle"
          aria-modal="true"
          className="tipPopupOverlay"
          role="dialog"
        >
          <div className="tipPopup">
            <div className="tipPopupHead">
              <div>
                <span>Tip</span>
                <h2 id="tipPopupTitle">{currentWord}</h2>
              </div>
              <button
                aria-label="Đóng tip"
                className="tipPopupClose"
                type="button"
                onClick={() => setIsTipPopupOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="tipPopupBody">
              <p>
                <strong>Ví dụ:</strong>{" "}
                {getExample(currentAnswer) || "Chưa có ví dụ cho từ này."}
              </p>
              {currentTipStage > 1 ? (
                <p>
                  <strong>Nghĩa ví dụ:</strong>{" "}
                  {getExampleMeaning(currentAnswer) ||
                    "Chưa có bản dịch ví dụ."}
                </p>
              ) : null}
            </div>

            <div className="tipPopupActions">
              {currentTipStage === 1 ? (
                <button
                  className="primaryButton"
                  type="button"
                  onClick={requestTip}
                >
                  Xem nghĩa ví dụ
                </button>
              ) : null}
              <button
                className="secondaryButton"
                type="button"
                onClick={() => setIsTipPopupOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
