"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allVocabularyData, getMeaning, getWord, normalizeText, type LevelId, type VocabularyItem } from "../../../lib/vocabulary";
import { createQuizQuestion, type QuizQuestion } from "../../../lib/quiz";

const levelOptions: Array<"ALL" | LevelId> = ["ALL", "A1", "A2", "B1", "B2", "C1"];

export default function MultipleChoicePage() {
  const [level, setLevel] = useState<"ALL" | LevelId>("ALL");
  const [query, setQuery] = useState("");
  const [question, setQuestion] = useState<QuizQuestion<VocabularyItem> | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<VocabularyItem | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filteredWords = useMemo(() => {
    const keyword = normalizeText(query);
    return allVocabularyData.filter((item) => {
      if (level !== "ALL" && item.level !== level) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      return [item["từ"], item["nghĩa"], item["loại từ"], item["ví dụ"], item["nghĩa ví dụ"], item.level]
        .map(normalizeText)
        .join(" ")
        .includes(keyword);
    });
  }, [level, query]);

  function startNewQuestion() {
    setQuestion(createQuizQuestion(filteredWords));
    setSelectedAnswer(null);
  }

  function chooseAnswer(option: VocabularyItem) {
    if (!question || selectedAnswer) {
      return;
    }

    const isCorrect = option === question.answer;
    setSelectedAnswer(option);
    setScore((previous) => ({
      correct: previous.correct + (isCorrect ? 1 : 0),
      total: previous.total + 1,
    }));
  }

  return (
    <main className="lookupShell">
      <header className="lookupHeader">
        <div>
          <p className="eyebrow">Practice / Multiple Choice</p>
          <h1>Trắc nghiệm từ vựng</h1>
          <p className="lookupDescription">
            Chọn level, lọc từ khóa rồi làm quiz trắc nghiệm trên toàn bộ data hiện có.
          </p>
        </div>

        <div className="lookupHeaderActions">
          <Link className="secondaryButton lookupBackButton" href="/practice">
            Về Practice
          </Link>
          <div className="lookupStats">
            <div>
              <span>Kết quả lọc</span>
              <strong>{filteredWords.length}</strong>
            </div>
            <div>
              <span>Điểm</span>
              <strong>
                {score.correct}/{score.total}
              </strong>
            </div>
          </div>
        </div>
      </header>

      <section className="lookupToolbar">
        <label className="searchBox lookupSearch">
          <span>Lọc từ vựng</span>
          <input
            type="search"
            placeholder="Nhập từ, nghĩa, ví dụ..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="lookupLevels" aria-label="Chọn cấp độ">
          {levelOptions.map((item) => (
            <button
              key={item}
              className={`lookupLevelButton ${level === item ? "active" : ""}`}
              type="button"
              onClick={() => setLevel(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <button className="primaryButton" type="button" onClick={startNewQuestion}>
          Câu mới
        </button>
      </section>

      <section className="lookupResultCard">
        {question ? (
          <>
            <div className="quizHead">
              <div>
                <p className="eyebrow">Chọn nghĩa đúng</p>
                <h2>{getWord(question.answer)}</h2>
              </div>
            </div>

            <div className="answerGrid">
              {question.options.map((option, index) => {
                const isCorrect = option === question.answer;
                const isSelected = option === selectedAnswer;
                const answered = Boolean(selectedAnswer);
                const className = [
                  "answerButton",
                  answered && isCorrect ? "correct" : "",
                  answered && isSelected && !isCorrect ? "wrong" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <button key={`${getMeaning(option)}-${index}`} className={className} type="button" onClick={() => chooseAnswer(option)}>
                    <span className="answerLetter">{String.fromCharCode(65 + index)}</span>
                    <span>{getMeaning(option)}</span>
                  </button>
                );
              })}
            </div>

            <p className={`feedback ${selectedAnswer ? (selectedAnswer === question.answer ? "correct" : "wrong") : ""}`}>
              {selectedAnswer
                ? selectedAnswer === question.answer
                  ? "Đúng."
                  : `Sai. Đáp án đúng: ${getMeaning(question.answer)}`
                : "Bấm vào một đáp án để chấm điểm."}
            </p>
          </>
        ) : (
          <div className="lookupEmpty">
            <p>Chưa có câu hỏi.</p>
            <span>Bấm “Câu mới” để sinh một câu hỏi từ dữ liệu đang lọc.</span>
          </div>
        )}
      </section>
    </main>
  );
}
