"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { VocabularyItem } from "../../../../lib/vocabulary";
import { getMeaning, getWord } from "../../../../lib/vocabulary";

type VocabularyTestPageProps = {
  level: string;
  vocabularyData: VocabularyItem[];
};

const questionTotal = 10;

function buildQuestionSet(words: VocabularyItem[]) {
  const borrow = words.find((item) => getWord(item).toLowerCase() === "borrow");
  const picked = borrow ? [borrow] : [];
  const remaining = words.filter((item) => item !== borrow);

  return [...picked, ...remaining].slice(0, questionTotal);
}

function buildOptions(words: VocabularyItem[], answer: VocabularyItem, questionIndex: number) {
  const correctMeaning = getMeaning(answer);
  const distractors = words
    .map((item) => getMeaning(item))
    .filter((meaning) => meaning && meaning !== correctMeaning);
  const uniqueDistractors = Array.from(new Set(distractors));
  const offset = questionIndex % Math.max(uniqueDistractors.length, 1);
  const rotated = [...uniqueDistractors.slice(offset), ...uniqueDistractors.slice(0, offset)];
  const options = [correctMeaning, ...rotated.slice(0, 3)].filter(Boolean);

  while (options.length < 4) {
    options.push(["mua", "bán", "cho", "học"][options.length] || "khác");
  }

  const correctPosition = questionIndex % 4;
  const [correct] = options.splice(0, 1);
  options.splice(correctPosition, 0, correct);

  return options.slice(0, 4);
}

function getPronunciation(item: VocabularyItem) {
  const customPronunciation =
    item["phiên âm"] ||
    item["phien am"] ||
    item["pronunciation"] ||
    item["ipa"];

  if (customPronunciation) {
    return customPronunciation.startsWith("/") ? customPronunciation : `/${customPronunciation}/`;
  }

  const word = getWord(item)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  return word ? `/${word}/` : "/-/";
}

export default function VocabularyTestPage({ level, vocabularyData }: VocabularyTestPageProps) {
  const words = useMemo(
    () => vocabularyData.filter((item) => getWord(item) && getMeaning(item)),
    [vocabularyData],
  );
  const questions = useMemo(() => buildQuestionSet(words), [words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(() =>
    Array.from({ length: questionTotal }, () => false),
  );
  const answer = questions[currentIndex] || words[0];
  const options = useMemo(
    () => buildOptions(words, answer, currentIndex),
    [answer, currentIndex, words],
  );
  const correctMeaning = getMeaning(answer);
  const fallbackPronunciation = getPronunciation(answer);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [apiPronunciation, setApiPronunciation] = useState("");

  const questionNumber = currentIndex + 1;
  const progress = Math.round((questionNumber / questionTotal) * 100);
  const isCorrect = selectedOption === correctMeaning;
  const isLastQuestion = currentIndex === questionTotal - 1;
  const pronunciation = apiPronunciation || fallbackPronunciation;

  useEffect(() => {
    const word = getWord(answer).trim().toLowerCase();

    setAudioUrl("");
    setApiPronunciation("");

    if (!word || word.includes(" ")) {
      return;
    }

    const controller = new AbortController();

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }

        const phonetics = entries.flatMap((entry) => entry?.phonetics || []);
        const audio = phonetics.find((item) => item?.audio)?.audio || "";
        const text = phonetics.find((item) => item?.text)?.text || entries[0]?.phonetic || "";

        setAudioUrl(audio);
        setApiPronunciation(text);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setAudioUrl("");
          setApiPronunciation("");
        }
      });

    return () => controller.abort();
  }, [answer]);

  function resetAnswerState() {
    setSelectedOption("");
    setIsSubmitted(false);
  }

  function markAnswered(wasCorrect: boolean) {
    setAnsweredQuestions((previous) => {
      const next = [...previous];
      next[currentIndex] = true;
      return next;
    });

    if (wasCorrect) {
      setScore((previous) => previous + 1);
      setStreak((previous) => previous + 1);
      return;
    }

    setStreak(0);
  }

  function handleSubmit() {
    if (!selectedOption || isSubmitted) {
      return;
    }

    setIsSubmitted(true);
    markAnswered(isCorrect);
  }

  function goNext() {
    if (currentIndex < questionTotal - 1) {
      setCurrentIndex((previous) => previous + 1);
    } else {
      setCurrentIndex(0);
      setScore(0);
      setStreak(0);
      setAnsweredQuestions(Array.from({ length: questionTotal }, () => false));
    }

    resetAnswerState();
  }

  function handleListen() {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(() => {
        speakWithBrowserVoice();
      });
      return;
    }

    speakWithBrowserVoice();
  }

  function speakWithBrowserVoice() {
    if (!("speechSynthesis" in window)) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(getWord(answer));

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="vocabTestPage">
      <header className="testTopbar">
        <Link href="/vocabulary" className="testBackLink">
          ← {level} Vocabulary Test
        </Link>
        <div className="testUser">
          <Link href="/">YENTH</Link>
          <Link href="/profile">👤 Văn</Link>
        </div>
      </header>

      <section className="testIntro">
        <p className="homeEyebrow">{level} Vocabulary Checkpoint</p>
        <h1>Kiểm tra nhanh vốn từ vựng {level} của bạn trong 10 câu.</h1>
      </section>

      <section className="testWorkspace">
        <article className="questionPanel">
          <div className="questionHead">
            <span>
              Question {String(questionNumber).padStart(2, "0")} / {questionTotal}
            </span>
            <strong>{progress}%</strong>
          </div>
          <div className="testProgressTrack" aria-label={`Tiến độ ${progress}%`}>
            <span style={{ width: `${progress}%` }} />
          </div>

          <p className="questionPrompt">Choose the correct meaning</p>

          <div className="wordPromptCard">
            <strong>{getWord(answer).toUpperCase()}</strong>
            <div>
              <span>{pronunciation}</span>
              <button type="button" onClick={handleListen}>
                {audioUrl ? "🔊 Audio" : "🔊 Voice"}
              </button>
            </div>
          </div>

          <fieldset className="answerList">
            <legend className="srOnly">Chọn nghĩa đúng</legend>
            {options.map((option, index) => {
              const letter = String.fromCharCode(65 + index);
              const statusClass =
                isSubmitted && option === correctMeaning
                  ? "correct"
                  : isSubmitted && option === selectedOption
                    ? "wrong"
                    : "";

              return (
                <label className={`testAnswer ${statusClass}`} key={`${option}-${letter}`}>
                  <input
                    type="radio"
                    name="vocab-answer"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => {
                      setSelectedOption(option);
                    }}
                    disabled={isSubmitted}
                  />
                  <span>{letter}. {option}</span>
                </label>
              );
            })}
          </fieldset>

          <div className="testActions">
            <button
              className="primaryButton"
              type="button"
              disabled={!selectedOption}
              onClick={isSubmitted ? goNext : handleSubmit}
            >
              {isSubmitted ? (isLastQuestion ? "Restart test" : "Next question") : "Submit answer"}
            </button>
            <button
              className="secondaryButton"
              type="button"
              onClick={goNext}
            >
              Skip
            </button>
          </div>
        </article>

        <aside className="testSidePanel">
          <div>
            <span>Progress</span>
            <div className="testProgressTrack compact">
              <span style={{ width: `${progress}%` }} />
            </div>
            <strong>{progress}%</strong>
          </div>
          <div>
            <span>Score</span>
            <strong>{score} correct</strong>
          </div>
          <div>
            <span>Streak</span>
            <strong>🔥 {streak} answers</strong>
          </div>
          <div>
            <span>Time</span>
            <strong>08:42 left</strong>
          </div>
        </aside>
      </section>

      <section className="testBottomGrid">
        <article className="testTip">
          <strong>Tip</strong>
          <p>{getWord(answer)} = {correctMeaning} từ ai đó.</p>
          <p>Example: {answer["ví dụ"] || "Can I borrow your pen?"}</p>
          {isSubmitted ? (
            <p className={isCorrect ? "testFeedback correct" : "testFeedback wrong"}>
              {isCorrect ? "Chính xác. Bạn chọn đúng nghĩa của từ này." : "Chưa đúng. Hãy xem lại tip và thử câu tiếp theo."}
            </p>
          ) : null}
        </article>

        <footer className="questionMap">
          <strong>Question map</strong>
          <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <button
                className={answeredQuestions[item - 1] ? "done" : item === questionNumber ? "active" : ""}
                type="button"
                key={item}
                onClick={() => {
                  setCurrentIndex(item - 1);
                  resetAnswerState();
                }}
              >
                {answeredQuestions[item - 1] ? `✓ ${item}` : item}
              </button>
            ))}
          </div>
        </footer>
      </section>
    </main>
  );
}
