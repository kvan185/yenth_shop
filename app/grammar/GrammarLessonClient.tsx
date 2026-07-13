"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  GrammarLesson,
  GrammarTestData,
  GrammarTestQuestion,
} from "../../lib/grammar";

type GrammarLessonClientProps = {
  lesson: GrammarLesson;
  testData?: GrammarTestData;
};

function getQuestionMeta(question: GrammarTestQuestion) {
  return [
    question.cefr,
    question.examFocus,
    question.tenseFocus,
    question.structureFocus,
    question.modalFocus,
    question.comparisonFocus,
    question.passiveFocus,
    question.relativeFocus,
    question.level ? `Level ${question.level}` : "",
  ].filter(Boolean);
}

export default function GrammarLessonClient({
  lesson,
  testData,
}: GrammarLessonClientProps) {
  const [openId, setOpenId] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const isTensesLesson = Boolean(lesson.tenseItems);
  const questions = useMemo(() => testData?.questions || [], [testData]);
  const currentQuestion = questions[questionIndex] || null;
  const questionMeta = currentQuestion ? getQuestionMeta(currentQuestion) : [];
  const learnItemCount = (lesson.tenseItems?.length || 0) + lesson.learnBlocks.length;
  const focusItems = useMemo(() => {
    const values = new Set<string>();
    for (const question of questions) {
      const focus =
        question.tenseFocus ||
        question.structureFocus ||
        question.modalFocus ||
        question.comparisonFocus ||
        question.passiveFocus ||
        question.relativeFocus;
      if (focus) {
        values.add(focus);
      }
      if (values.size >= 8) {
        break;
      }
    }
    return Array.from(values);
  }, [questions]);
  const levelRange = useMemo(() => {
    const levels = questions
      .map((question) => question.level)
      .filter((level): level is number => typeof level === "number");
    if (!levels.length) {
      return "Đang cập nhật";
    }
    return `Level ${Math.min(...levels)}-${Math.max(...levels)}`;
  }, [questions]);

  function togglePanel(panelId: string) {
    setOpenId((current) => (current === panelId ? "" : panelId));
  }

  function submitAnswer() {
    if (!currentQuestion || !selectedAnswer) {
      return;
    }

    setIsSubmitted(true);
    if (selectedAnswer === currentQuestion.answer) {
      setCorrectCount((value) => value + 1);
    }
  }

  function goNextQuestion() {
    setSelectedAnswer("");
    setIsSubmitted(false);
    setQuestionIndex((value) => (value + 1) % questions.length);
  }

  function resetTest() {
    setQuestionIndex(0);
    setSelectedAnswer("");
    setIsSubmitted(false);
    setCorrectCount(0);
  }

  return (
    <main className={`grammarLessonPage ${isTensesLesson ? "tensesLessonPage" : ""}`}>
      <header className="grammarLessonHero">
        <div>
          <p className="homeEyebrow">Grammar / {lesson.shortLabel}</p>
          <h1>{lesson.label}</h1>
          <p>{lesson.description}</p>
          {isTensesLesson ? (
            <div className="tensesHeroStats" aria-label="Tổng quan 12 thì">
              <span>
                <strong>12</strong>
                thì
              </span>
              <span>
                <strong>3</strong>
                mốc thời gian
              </span>
              <span>
                <strong>4</strong>
                nhóm cấu trúc
              </span>
            </div>
          ) : null}
        </div>

        <aside className="grammarLessonNav" aria-label="Điều hướng bài học">
          <a href="#learn">Học</a>
          <a href="#test">Kiểm tra</a>
          <Link href="/grammar">Tất cả chủ điểm</Link>
        </aside>
      </header>

      <section className="grammarLessonSection" id="learn">
        <div className="sectionHead">
          <span>Phần 1</span>
          <h2>Chọn mục muốn học</h2>
        </div>

        <div className="grammarLearnOverview" aria-label="Tổng quan phần học">
          <article>
            <span>Mục học</span>
            <strong>{learnItemCount.toLocaleString("vi-VN")}</strong>
            <p>Mở từng mục để xem công thức, cách dùng và ví dụ.</p>
          </article>
          <article>
            <span>Bài kiểm tra</span>
            <strong>{questions.length.toLocaleString("vi-VN")}</strong>
            <p>Câu hỏi được chia mức để luyện từ dễ đến khó.</p>
          </article>
          <article>
            <span>Độ khó</span>
            <strong>{levelRange}</strong>
            <p>Đi từ nền tảng đến dạng VSTEP, IELTS, TOEIC.</p>
          </article>
        </div>

        {focusItems.length ? (
          <div className="grammarFocusStrip" aria-label="Chủ điểm kiểm tra">
            {focusItems.map((focus) => (
              <span key={focus}>{focus}</span>
            ))}
          </div>
        ) : null}

        {lesson.tenseItems ? (
          <div className="grammarAccordion" aria-label="12 thì tiếng Anh">
            {lesson.tenseItems.map((tense, index) => {
              const panelId = `tense-${index}`;
              const isOpen = openId === panelId;

              return (
                <article className={`grammarAccordionItem ${isOpen ? "open" : ""}`} key={tense.name}>
                  <button
                    aria-expanded={isOpen}
                    className="grammarAccordionTrigger"
                    type="button"
                    onClick={() => togglePanel(panelId)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>
                      {tense.name}
                      <em>{tense.signal}</em>
                    </strong>
                    <small>{tense.formula}</small>
                  </button>

                  {isOpen ? (
                    <div className="grammarAccordionBody">
                      <p>{tense.use}</p>
                      <dl>
                        <div>
                          <dt>Dấu hiệu</dt>
                          <dd>{tense.signal}</dd>
                        </div>
                        <div>
                          <dt>Ví dụ</dt>
                          <dd>{tense.example}</dd>
                        </div>
                      </dl>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : null}

        <div className="grammarAccordion" aria-label="Lý thuyết bổ sung">
          {lesson.learnBlocks.map((block, index) => {
            const panelId = `block-${index}`;
            const isOpen = openId === panelId;

            return (
              <article className={`grammarAccordionItem ${isOpen ? "open" : ""}`} key={block.title}>
                <button
                  aria-expanded={isOpen}
                  className="grammarAccordionTrigger"
                  type="button"
                  onClick={() => togglePanel(panelId)}
                >
                  <span>{lesson.tenseItems ? "Ghi chú" : String(index + 1).padStart(2, "0")}</span>
                  <strong>{block.title}</strong>
                  <small>{isOpen ? "Đang mở" : "Bấm để xem"}</small>
                </button>

                {isOpen ? (
                  <div className="grammarAccordionBody">
                    <ul>
                      {block.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="grammarExampleList">
                      {block.examples.map((example) => (
                        <div key={example.text}>
                          <strong>{example.text}</strong>
                          {example.translation ? <span>{example.translation}</span> : null}
                          {example.note ? <p>{example.note}</p> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="grammarLessonSection grammarTestSection" id="test">
        <div className="sectionHead">
          <span>Phần 2</span>
          <h2>Kiểm tra</h2>
        </div>
        {currentQuestion ? (
          <article className="grammarTestCard">
            <div className="grammarTestToolbar">
              <div>
                <strong>
                  Câu {questionIndex + 1}/{questions.length}
                </strong>
                <span>
                  Đúng {correctCount}/{Math.max(questionIndex + (isSubmitted ? 1 : 0), 0)}
                </span>
              </div>
              <button className="secondaryButton" type="button" onClick={resetTest}>
                Làm lại
              </button>
            </div>

            <div className="grammarQuestionPanel">
              <div className="grammarQuestionMeta">
                {questionMeta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <h3>{currentQuestion.prompt}</h3>
            </div>

            <fieldset className="grammarAnswerList">
              <legend className="srOnly">Chọn đáp án đúng</legend>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.answer;
                const statusClass = !isSubmitted
                  ? isSelected
                    ? "selected"
                    : ""
                  : isCorrect
                    ? "correct"
                    : isSelected
                      ? "wrong"
                      : "";

                return (
                  <label
                    className={`grammarAnswer ${statusClass}`}
                    key={`${currentQuestion.id}-${option}`}
                  >
                    <input
                      checked={isSelected}
                      disabled={isSubmitted}
                      name="grammar-answer"
                      type="radio"
                      value={option}
                      onChange={() => setSelectedAnswer(option)}
                    />
                    <span>
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </label>
                );
              })}
            </fieldset>

            <div className="grammarTestActions">
              <button
                className="primaryButton"
                disabled={!selectedAnswer}
                type="button"
                onClick={isSubmitted ? goNextQuestion : submitAnswer}
              >
                {isSubmitted ? "Câu tiếp theo" : "Trả lời"}
              </button>
            </div>

            {isSubmitted ? (
              <div
                className={`grammarFeedback ${
                  selectedAnswer === currentQuestion.answer ? "correct" : "wrong"
                }`}
              >
                <strong>
                  {selectedAnswer === currentQuestion.answer
                    ? "Đúng"
                    : "Sai"}
                </strong>
                <p>{currentQuestion.explanation}</p>
                {selectedAnswer !== currentQuestion.answer ? (
                  <small>Đáp án đúng: {currentQuestion.answer}</small>
                ) : null}
              </div>
            ) : null}
          </article>
        ) : (
          <div className="grammarTestPlaceholder">
            <strong>Chưa có dữ liệu kiểm tra.</strong>
            <p>
              Kiểm tra lại file <code>{lesson.testDataFile}</code> và trường{" "}
              <code>questions</code>.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
