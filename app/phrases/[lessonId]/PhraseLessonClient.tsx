"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PhraseItem } from "../../../lib/phrases";
import { phraseLevelConfig } from "../../../lib/phrases";
import { createQuizQuestion, type QuizQuestion } from "../../../lib/quiz";
import type { LevelId } from "../../../lib/vocabulary";
import { normalizeText } from "../../../lib/vocabulary";

type PhraseLessonClientProps = {
  level: LevelId;
  phrases: PhraseItem[];
};

type PhraseMode = "list" | "test";

function getPhrase(item: PhraseItem) {
  return item["từ"] || "";
}

function getMeaning(item: PhraseItem) {
  return item["nghĩa"] || "";
}

function getPhraseKey(item: PhraseItem) {
  return `${normalizeText(getPhrase(item))}::${normalizeText(getMeaning(item))}`;
}

function getNextQuiz(phrases: PhraseItem[]) {
  return createQuizQuestion(phrases);
}

export default function PhraseLessonClient({
  level,
  phrases,
}: PhraseLessonClientProps) {
  const [mode, setMode] = useState<PhraseMode>("list");
  const [quiz, setQuiz] = useState<QuizQuestion<PhraseItem> | null>(() =>
    getNextQuiz(phrases),
  );
  const [selectedAnswerKey, setSelectedAnswerKey] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const answerKey = quiz ? getPhraseKey(quiz.answer) : "";
  const isCorrect = selectedAnswerKey === answerKey;
  const accuracy = answeredCount
    ? Math.round((correctCount / answeredCount) * 100)
    : 0;

  const levelLinks = useMemo(() => phraseLevelConfig, []);

  function submitAnswer() {
    if (!quiz || !selectedAnswerKey || isSubmitted) {
      return;
    }

    setIsSubmitted(true);
    setAnsweredCount((count) => count + 1);
    if (isCorrect) {
      setCorrectCount((count) => count + 1);
    }
  }

  function goNextQuestion() {
    setQuiz(getNextQuiz(phrases));
    setSelectedAnswerKey("");
    setIsSubmitted(false);
  }

  function resetTest() {
    setCorrectCount(0);
    setAnsweredCount(0);
    setSelectedAnswerKey("");
    setIsSubmitted(false);
    setQuiz(getNextQuiz(phrases));
  }

  return (
    <main className="phraseStudyPage">
      <section className="phraseStudyHeader">
        <div>
          <Link href="/phrases" className="testBackLink">
            ← Cụm từ
          </Link>
          <span>{phrases.length.toLocaleString("vi-VN")} cụm</span>
          <h1>Cụm từ {level}</h1>
        </div>
        <nav className="phraseLevelNav" aria-label="Chọn cấp độ cụm từ">
          {levelLinks.map((item) => (
            <Link
              className={item.id === level ? "active" : ""}
              href={item.href}
              key={item.id}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      <div className="phraseModeTabs" role="tablist" aria-label="Chế độ cụm từ">
        <button
          className={mode === "list" ? "active" : ""}
          type="button"
          onClick={() => setMode("list")}
        >
          Danh sách
        </button>
        <button
          className={mode === "test" ? "active" : ""}
          type="button"
          onClick={() => setMode("test")}
        >
          Kiểm tra
        </button>
      </div>

      {mode === "list" ? (
        <section className="phraseGrid" aria-label={`Danh sách cụm từ ${level}`}>
          {phrases.map((phrase) => (
            <article
              className="phraseCard"
              key={`${phrase["từ"]}-${phrase["nghĩa"]}`}
            >
              <div className="phraseCardHead">
                <span>{phrase["loại từ"]}</span>
                <h2>{phrase["từ"]}</h2>
              </div>
              <p>{phrase["nghĩa"]}</p>
              <dl>
                <div>
                  <dt>Ví dụ</dt>
                  <dd>{phrase["ví dụ"]}</dd>
                </div>
                <div>
                  <dt>Nghĩa ví dụ</dt>
                  <dd>{phrase["nghĩa ví dụ"]}</dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      ) : (
        <section className="phraseTestLayout" aria-label={`Kiểm tra cụm từ ${level}`}>
          <article className="vocabTestCard">
            {quiz ? (
              <>
                <div className="wordPromptCard">
                  <strong>Chọn nghĩa đúng</strong>
                  <div className="wordPromptText inline">
                    <strong>{getPhrase(quiz.answer)}</strong>
                  </div>
                  <div className="wordPromptMeta">
                    <span>{quiz.answer["loại từ"] || level}</span>
                  </div>
                </div>

                <fieldset className="answerList b1AnswerReview">
                  <legend className="srOnly">Chọn đáp án</legend>
                  {quiz.options.map((option, index) => {
                    const optionKey = getPhraseKey(option);
                    const letter = String.fromCharCode(65 + index);
                    const statusClass = !isSubmitted
                      ? optionKey === selectedAnswerKey
                        ? "selected"
                        : "unselected"
                      : optionKey === answerKey
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
                          name="phrase-answer"
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
                    onClick={resetTest}
                  >
                    Làm lại
                  </button>
                </div>

                {isSubmitted ? (
                  <div
                    className={`vocabAnswerFeedback ${isCorrect ? "correct" : "wrong"}`}
                  >
                    {isCorrect
                      ? "Chính xác"
                      : `Đáp án đúng: ${getMeaning(quiz.answer)}`}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="vocabEmptyState">Chưa đủ cụm từ để kiểm tra.</div>
            )}
          </article>

          <aside className="phraseTestStats">
            <div>
              <span>Đã trả lời</span>
              <strong>{answeredCount}</strong>
            </div>
            <div>
              <span>Đúng</span>
              <strong>{correctCount}</strong>
            </div>
            <div>
              <span>Độ chính xác</span>
              <strong>{accuracy}%</strong>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
