"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LevelId, VocabularyItem } from "../../../lib/vocabulary";
import { getFirstLetter, getMeaning, getWord, normalizeText } from "../../../lib/vocabulary";
import { createQuizQuestionForAnswer, shuffle, type QuizQuestion } from "../../../lib/quiz";

type VocabularyStudyPageProps = {
  level: LevelId;
  vocabularyData: VocabularyItem[];
};

type StudyMode = "learn" | "test";

type StoredProgress = {
  correctKeys?: string[];
  wrongKeys?: string[];
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
    item["phiên âm"] || item["phien am"] || item["pronunciation"] || item["ipa"];

  if (customPronunciation) {
    return customPronunciation.startsWith("/") ? customPronunciation : `/${customPronunciation}/`;
  }

  return "";
}

function getWordKey(item: VocabularyItem) {
  return `${normalizeText(getWord(item))}::${normalizeText(getMeaning(item))}`;
}

function getStorageKey(level: LevelId) {
  return `yenth:vocabulary:${level.toLowerCase()}:progress`;
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
  const answer = candidates[Math.floor(Math.random() * candidates.length)] || remainingWords[0];

  return createQuizQuestionForAnswer(answer, allWords);
}

export default function VocabularyStudyPage({ level, vocabularyData }: VocabularyStudyPageProps) {
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
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion<VocabularyItem> | null>(null);
  const [selectedAnswerKey, setSelectedAnswerKey] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

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
      const matchesLetter = selectedLetter === "ALL" || getFirstLetter(item) === selectedLetter;
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
    return filteredWords.find((item) => getWordKey(item) === selectedWordKey) || filteredWords[0];
  }, [filteredWords, selectedWordKey]);

  const remainingWords = useMemo(() => {
    return words.filter((item) => !correctKeys.has(getWordKey(item)));
  }, [correctKeys, words]);

  const wrongWords = useMemo(() => {
    return words.filter((item) => wrongKeys.has(getWordKey(item)) && !correctKeys.has(getWordKey(item)));
  }, [correctKeys, wrongKeys, words]);

  const currentAnswer = quiz?.answer || null;
  const currentAnswerKey = currentAnswer ? getWordKey(currentAnswer) : "";
  const correctCount = Math.min(correctKeys.size, words.length);
  const progress = words.length ? Math.round((correctCount / words.length) * 100) : 0;
  const isCorrect = selectedAnswerKey === currentAnswerKey;

  useEffect(() => {
    const rawProgress = window.localStorage.getItem(getStorageKey(level));

    if (rawProgress) {
      try {
        const parsed = JSON.parse(rawProgress) as StoredProgress;
        const validKeys = new Set(words.map(getWordKey));
        setCorrectKeys(new Set((parsed.correctKeys || []).filter((key) => validKeys.has(key))));
        setWrongKeys(new Set((parsed.wrongKeys || []).filter((key) => validKeys.has(key))));
      } catch {
        setCorrectKeys(new Set());
        setWrongKeys(new Set());
      }
    }

    setIsProgressLoaded(true);
  }, [level, words]);

  useEffect(() => {
    if (!isProgressLoaded) {
      return;
    }

    window.localStorage.setItem(
      getStorageKey(level),
      JSON.stringify({
        correctKeys: Array.from(correctKeys),
        wrongKeys: Array.from(wrongKeys),
      }),
    );
  }, [correctKeys, isProgressLoaded, level, wrongKeys]);

  useEffect(() => {
    if (selectedWord && getWordKey(selectedWord) !== selectedWordKey) {
      setSelectedWordKey(getWordKey(selectedWord));
    }
  }, [selectedWord, selectedWordKey]);

  useEffect(() => {
    if (mode !== "test" || !isProgressLoaded || quiz || remainingWords.length === 0) {
      return;
    }

    setQuiz(pickQuestion(remainingWords, words));
  }, [isProgressLoaded, mode, quiz, remainingWords, words]);

  function resetQuestionState() {
    setSelectedAnswerKey("");
    setIsSubmitted(false);
    setFeedbackMessage("");
  }

  function startTest() {
    setMode("test");
    resetQuestionState();
    setQuiz((previous) => previous || pickQuestion(remainingWords, words));
  }

  function goNextQuestion() {
    resetQuestionState();
    setQuiz(pickQuestion(remainingWords, words, currentAnswerKey));
  }

  function submitAnswer() {
    if (!quiz || !selectedAnswerKey || isSubmitted) {
      return;
    }

    setIsSubmitted(true);

    if (isCorrect) {
      setFeedbackMessage(getRandomMessage(correctFeedbackMessages));
      setCorrectKeys((previous) => {
        const next = new Set(previous);
        next.add(currentAnswerKey);
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
    resetQuestionState();
    setQuiz(pickQuestion(words, words));
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

  function speakWord(item: VocabularyItem | null | undefined) {
    if (!item || !("speechSynthesis" in window)) {
      return;
    }

    const word = getWord(item).trim();
    if (!word) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    function handleSpaceKey(event: KeyboardEvent) {
      const target = event.target;
      const isEditableTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      if (isEditableTarget || mode !== "test" || event.code !== "Space" || !quiz) {
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
  }, [isSubmitted, mode, quiz, selectedAnswerKey]);

  return (
    <main className="vocabStudyPage">
      <section className="vocabStudyHero">
        <div>
          <Link href="/vocabulary" className="testBackLink">
            Vocabulary
          </Link>
          <h1>Học đầy đủ, kiểm tra đến khi nhớ hết.</h1>

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
        </div>
      </section>

      <section className="vocabStudyTabs" aria-label="Chọn chế độ học">
        <button
          className={mode === "learn" ? "active" : ""}
          type="button"
          onClick={() => setMode("learn")}
        >
          Học
        </button>
        <button className={mode === "test" ? "active" : ""} type="button" onClick={startTest}>
          Kiểm tra
        </button>
        <div>
          <span style={{ width: `${progress}%` }} />
        </div>
      </section>

      {mode === "learn" ? (
        <section className="vocabLearnLayout">
          <aside className="vocabLearnPanel">
            <label className="searchBox">
              Tìm từ, nghĩa hoặc ví dụ
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nhập từ khóa..."
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
                    className={key === getWordKey(selectedWord || item) ? "active" : ""}
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
                    {getPronunciation(selectedWord) ? <p>{getPronunciation(selectedWord)}</p> : null}
                  </div>
                  <div className="vocabLearnActions">
                    <button className="secondaryButton" type="button" onClick={() => speakWord(selectedWord)}>
                      Phát âm
                    </button>
                    <button className="secondaryButton" type="button" onClick={shuffleLearnList}>
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
                    <dd>{getExample(selectedWord) || "Chưa có ví dụ cho từ này."}</dd>
                  </div>
                  <div>
                    <dt>Dịch ví dụ</dt>
                    <dd>{getExampleMeaning(selectedWord) || "Chưa có bản dịch ví dụ."}</dd>
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
                <h2>Bạn đã trả lời đúng toàn bộ {words.length.toLocaleString("vi-VN")} từ.</h2>
                <button className="primaryButton" type="button" onClick={resetProgress}>
                  Làm lại từ đầu
                </button>
              </div>
            ) : quiz && currentAnswer ? (
              <>
                <div className="questionHead">
                  <span>Chọn nghĩa đúng</span>
                  <strong>{progress}% hoàn thành</strong>
                </div>
                <div className="wordPromptCard">
                  <strong>{getWord(currentAnswer).toUpperCase()}</strong>
                  <div>
                    <span>{getPartOfSpeech(currentAnswer) || level}</span>
                    {getPronunciation(currentAnswer) ? <span>{getPronunciation(currentAnswer)}</span> : null}
                    <button type="button" onClick={() => speakWord(currentAnswer)}>
                      Phát âm
                    </button>
                  </div>
                </div>

                <fieldset className="answerList">
                  <legend className="srOnly">Chọn đáp án</legend>
                  {quiz.options.map((option, index) => {
                    const optionKey = getWordKey(option);
                    const letter = String.fromCharCode(65 + index);
                    const statusClass =
                      isSubmitted && optionKey === currentAnswerKey
                        ? "correct"
                        : isSubmitted && optionKey === selectedAnswerKey
                          ? "wrong"
                          : "";

                    return (
                      <label className={`testAnswer ${statusClass}`} key={`${optionKey}-${letter}`}>
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

                {isSubmitted ? (
                  <div className={`vocabAnswerFeedback ${isCorrect ? "correct" : "wrong"}`}>
                    {feedbackMessage}
                  </div>
                ) : null}

                <div className="testActions">
                  <button
                    className="primaryButton"
                    disabled={!selectedAnswerKey}
                    type="button"
                    onClick={isSubmitted ? goNextQuestion : submitAnswer}
                  >
                    {isSubmitted ? "Câu tiếp theo" : "Trả lời"}
                  </button>
                  <span className="vocabShortcutHint">
                    {isSubmitted ? "Nhấn Space để sang câu tiếp theo" : "Chọn đáp án rồi nhấn Space để kiểm tra"}
                  </span>
                  <button className="secondaryButton" type="button" onClick={resetProgress}>
                    Xóa tiến độ
                  </button>
                </div>
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
    </main>
  );
}
