"use client";

import Link from "next/link";
import { type MouseEvent, useEffect, useMemo, useState } from "react";
import type {
  GrammarLesson,
  GrammarTestData,
  GrammarTestQuestion,
} from "../../lib/grammar";
import { recordDailyStreak } from "../../lib/streak";
import { supabase } from "../../lib/supabase";

type GrammarLessonClientProps = {
  lesson: GrammarLesson;
  testData?: GrammarTestData;
};

type StudyMode = "learn" | "test";

type StoredGrammarProgress = {
  correctQuestionIds?: string[];
  currentQuestionId?: string;
  isSubmitted?: boolean;
  mode?: StudyMode;
  selectedAnswer?: string;
  testElapsedSeconds?: number;
  wrongQuestionIds?: string[];
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

function getGrammarProgressStorageKey(lessonId: string) {
  return `yenth:grammar:${lessonId}:test`;
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

function GrammarSpeakButton({ label, text }: { label: string; text: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const cleanText = text.trim();

  function warnUnsupportedAudioBrowser() {
    window.alert(
      "Trình duyệt này không hỗ trợ giọng đọc phù hợp. Hãy dùng Cốc Cốc, Chrome hoặc Edge để nghe ổn định hơn.",
    );
  }

  async function playAudioUrl(audioUrl: string) {
    await new Promise<void>((resolve, reject) => {
      const audio = new Audio(audioUrl);
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error("Audio failed"));
      audio.play().catch(reject);
    });
  }

  function speakWithBrowserVoice() {
    if (
      !("speechSynthesis" in window) ||
      !("SpeechSynthesisUtterance" in window)
    ) {
      setIsSpeaking(false);
      warnUnsupportedAudioBrowser();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  async function speak(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!cleanText) {
      return;
    }

    setIsSpeaking(true);

    try {
      const response = await fetch("/api/tts", {
        body: JSON.stringify({ text: cleanText }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Premium TTS failed");
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);

      try {
        await playAudioUrl(audioUrl);
      } finally {
        URL.revokeObjectURL(audioUrl);
      }
    } catch {
      speakWithBrowserVoice();
    } finally {
      window.setTimeout(() => setIsSpeaking(false), 300);
    }
  }

  return (
    <button
      aria-label={label}
      className={`audioIconButton ${isSpeaking ? "playing" : ""}`}
      disabled={!cleanText}
      title="Nghe"
      type="button"
      onClick={speak}
    >
      <SpeakerIcon />
    </button>
  );
}

function pickQuestion(questions: GrammarTestQuestion[], previousId?: string) {
  if (questions.length === 0) {
    return null;
  }

  const candidates =
    questions.length > 1
      ? questions.filter((question) => question.id !== previousId)
      : questions;

  return (
    candidates[Math.floor(Math.random() * candidates.length)] || questions[0]
  );
}

export default function GrammarLessonClient({
  lesson,
  testData,
}: GrammarLessonClientProps) {
  const [mode, setMode] = useState<StudyMode>("learn");
  const [openId, setOpenId] = useState("");
  const [currentQuestion, setCurrentQuestion] =
    useState<GrammarTestQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctQuestionIds, setCorrectQuestionIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [wrongQuestionIds, setWrongQuestionIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [testElapsedSeconds, setTestElapsedSeconds] = useState(0);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);
  const isTensesLesson = Boolean(lesson.tenseItems);
  const questions = useMemo(() => testData?.questions || [], [testData]);
  const questionMeta = currentQuestion ? getQuestionMeta(currentQuestion) : [];
  const learnItemCount =
    (lesson.tenseItems?.length || 0) + lesson.learnBlocks.length;
  const remainingQuestions = useMemo(
    () => questions.filter((question) => !correctQuestionIds.has(question.id)),
    [correctQuestionIds, questions],
  );
  const wrongQuestions = useMemo(
    () =>
      questions.filter(
        (question) =>
          wrongQuestionIds.has(question.id) &&
          !correctQuestionIds.has(question.id),
      ),
    [correctQuestionIds, questions, wrongQuestionIds],
  );
  const correctCount = Math.min(correctQuestionIds.size, questions.length);
  const progress = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0;
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

  useEffect(() => {
    const validQuestionIds = new Set(questions.map((question) => question.id));
    const storageKey = getGrammarProgressStorageKey(lesson.id);
    const rawProgress = window.localStorage.getItem(storageKey);

    if (!rawProgress) {
      setIsProgressLoaded(true);
      return;
    }

    try {
      const parsed = JSON.parse(rawProgress) as StoredGrammarProgress;
      const nextCorrectIds = new Set(
        (parsed.correctQuestionIds || []).filter((id) =>
          validQuestionIds.has(id),
        ),
      );
      const nextWrongIds = new Set(
        (parsed.wrongQuestionIds || []).filter((id) =>
          validQuestionIds.has(id),
        ),
      );
      const nextQuestion =
        questions.find(
          (question) => question.id === parsed.currentQuestionId,
        ) || null;
      const nextSelectedAnswer =
        nextQuestion &&
        nextQuestion.options.includes(parsed.selectedAnswer || "")
          ? parsed.selectedAnswer || ""
          : "";

      setCorrectQuestionIds(nextCorrectIds);
      setWrongQuestionIds(nextWrongIds);
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(nextSelectedAnswer);
      setIsSubmitted(Boolean(parsed.isSubmitted && nextSelectedAnswer));
      setTestElapsedSeconds(
        Math.max(0, Math.floor(parsed.testElapsedSeconds || 0)),
      );
      setMode(parsed.mode === "test" ? "test" : "learn");
    } catch {
      setCorrectQuestionIds(new Set());
      setWrongQuestionIds(new Set());
      setCurrentQuestion(null);
      setSelectedAnswer("");
      setIsSubmitted(false);
      setTestElapsedSeconds(0);
      setMode("learn");
    } finally {
      setIsProgressLoaded(true);
    }
  }, [lesson.id, questions]);

  useEffect(() => {
    if (!isProgressLoaded) {
      return;
    }

    window.localStorage.setItem(
      getGrammarProgressStorageKey(lesson.id),
      JSON.stringify({
        correctQuestionIds: Array.from(correctQuestionIds),
        currentQuestionId: currentQuestion?.id || "",
        isSubmitted,
        mode,
        selectedAnswer,
        testElapsedSeconds,
        wrongQuestionIds: Array.from(wrongQuestionIds),
      }),
    );
  }, [
    correctQuestionIds,
    currentQuestion,
    isProgressLoaded,
    isSubmitted,
    lesson.id,
    mode,
    selectedAnswer,
    testElapsedSeconds,
    wrongQuestionIds,
  ]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (
      window.location.hash === "#test" ||
      searchParams.get("tab") === "test"
    ) {
      setMode("test");
      setCurrentQuestion(
        (previous) => previous || pickQuestion(remainingQuestions),
      );
      window.history.replaceState(null, "", lesson.href);
    }
  }, [lesson.href, remainingQuestions]);

  useEffect(() => {
    if (
      !isProgressLoaded ||
      mode !== "test" ||
      currentQuestion ||
      remainingQuestions.length === 0
    ) {
      return;
    }

    setCurrentQuestion(pickQuestion(remainingQuestions));
  }, [currentQuestion, isProgressLoaded, mode, remainingQuestions]);

  useEffect(() => {
    if (
      !isProgressLoaded ||
      mode !== "test" ||
      remainingQuestions.length === 0
    ) {
      return;
    }

    const timerId = window.setInterval(() => {
      setTestElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isProgressLoaded, mode, remainingQuestions.length]);

  function resetQuestionState() {
    setSelectedAnswer("");
    setIsSubmitted(false);
  }

  function togglePanel(panelId: string) {
    setOpenId((current) => (current === panelId ? "" : panelId));
  }

  function submitAnswer() {
    if (!currentQuestion || !selectedAnswer || isSubmitted) {
      return;
    }

    if (supabase) {
      void supabase.auth
        .getUser()
        .then(({ data }) => recordDailyStreak(data.user))
        .then(() => window.dispatchEvent(new Event("yenth:streak-updated")));
    }

    setIsSubmitted(true);
    if (selectedAnswer === currentQuestion.answer) {
      setCorrectQuestionIds((previous) => {
        const next = new Set(previous);
        next.add(currentQuestion.id);
        return next;
      });
      setWrongQuestionIds((previous) => {
        const next = new Set(previous);
        next.delete(currentQuestion.id);
        return next;
      });
      return;
    }

    setWrongQuestionIds((previous) =>
      new Set(previous).add(currentQuestion.id),
    );
  }

  function goNextQuestion() {
    const previousId = currentQuestion?.id;
    resetQuestionState();
    setCurrentQuestion(pickQuestion(remainingQuestions, previousId));
  }

  function resetTest() {
    setCurrentQuestion(pickQuestion(questions));
    resetQuestionState();
    setCorrectQuestionIds(new Set());
    setWrongQuestionIds(new Set());
    setTestElapsedSeconds(0);
  }

  function showLearnMode() {
    setMode("learn");
    window.history.replaceState(null, "", lesson.href);
  }

  function showTestMode() {
    setMode("test");
    window.history.replaceState(null, "", lesson.href);
    setCurrentQuestion(
      (previous) => previous || pickQuestion(remainingQuestions),
    );
  }

  return (
    <main
      className={`grammarLessonPage ${isTensesLesson ? "tensesLessonPage" : ""}`}
    >
      <div className="grammarLessonShell">
        <aside className="grammarLessonNav" aria-label="Điều hướng bài học">
          <Link href="/grammar" className="testBackLink">
            Ngữ pháp
          </Link>

          <div className="grammarStudyProgress">
            <span>{progress}% hoàn thành</span>
            <div
              className="grammarProgressBar"
              aria-label={`${progress}% hoàn thành`}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="grammarStudyTabs" aria-label="Chọn chế độ học">
            <button
              className={mode === "learn" ? "active" : ""}
              type="button"
              onClick={showLearnMode}
            >
              Học
            </button>
            <button
              className={mode === "test" ? "active" : ""}
              type="button"
              onClick={showTestMode}
            >
              Kiểm tra
            </button>
          </div>

          <div className="grammarStudyStats" aria-label="Tiến độ ngữ pháp">
            <div>
              <span>Đúng</span>
              <strong>{correctCount}</strong>
            </div>
            <div>
              <span>Sai cần ôn</span>
              <strong>{wrongQuestions.length}</strong>
            </div>
            <div>
              <span>Còn lại</span>
              <strong>{remainingQuestions.length}</strong>
            </div>
            <div>
              <span>Câu hỏi</span>
              <strong>{questions.length}</strong>
            </div>
          </div>
        </aside>

        <div className="grammarLessonContent">
          {isTensesLesson ? (
            <section className="grammarLessonSection tensesStatsSection">
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
            </section>
          ) : null}

          <section
            className={`grammarLessonSection ${mode === "learn" ? "" : "isHidden"}`}
            id="learn"
          >
            <div className="sectionHead">
              <span>Phần 1</span>
              <h2>Chọn mục muốn học</h2>
            </div>

            <div
              className="grammarLearnOverview"
              aria-label="Tổng quan phần học"
            >
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
                    <article
                      className={`grammarAccordionItem ${isOpen ? "open" : ""}`}
                      key={tense.name}
                    >
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
                  <article
                    className={`grammarAccordionItem ${isOpen ? "open" : ""}`}
                    key={block.title}
                  >
                    <button
                      aria-expanded={isOpen}
                      className="grammarAccordionTrigger"
                      type="button"
                      onClick={() => togglePanel(panelId)}
                    >
                      <span>
                        {lesson.tenseItems
                          ? "Ghi chú"
                          : String(index + 1).padStart(2, "0")}
                      </span>
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
                              {example.translation ? (
                                <span>{example.translation}</span>
                              ) : null}
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

          <section
            className={`grammarLessonSection grammarTestSection ${
              mode === "test" ? "" : "isHidden"
            }`}
            id="test"
          >
            <div className="sectionHead">
              <span>Phần 2</span>
              <h2>Kiểm tra</h2>
            </div>
            {remainingQuestions.length === 0 && questions.length > 0 ? (
              <article className="grammarTestCard">
                <div className="vocabEmptyState">
                  <p className="homeEyebrow">Hoàn thành</p>
                  <h2>
                    Bạn đã trả lời đúng toàn bộ{" "}
                    {questions.length.toLocaleString("vi-VN")} câu hỏi.
                  </h2>
                  <button
                    className="primaryButton"
                    type="button"
                    onClick={resetTest}
                  >
                    Làm lại từ đầu
                  </button>
                </div>
              </article>
            ) : currentQuestion ? (
              <article className="grammarTestCard">
                <div className="grammarTestToolbar">
                  <div>
                    <strong>{progress}% hoàn thành</strong>
                    <span>
                      Đúng {correctCount} · Sai cần ôn {wrongQuestions.length} ·
                      Còn lại {remainingQuestions.length} ·{" "}
                      {formatElapsedTime(testElapsedSeconds)}
                    </span>
                  </div>
                  <button
                    className="secondaryButton"
                    type="button"
                    onClick={resetTest}
                  >
                    Làm lại từ đầu
                  </button>
                </div>
                <div className="grammarQuestionPanel">
                  <div className="grammarQuestionMeta">
                    {questionMeta.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="grammarQuestionPrompt">
                    <GrammarSpeakButton
                      label={`Nghe câu hỏi ${currentQuestion.id}`}
                      text={currentQuestion.prompt}
                    />
                    <h3>{currentQuestion.prompt}</h3>
                  </div>
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
                      <div
                        className="grammarAnswerRow"
                        key={`${currentQuestion.id}-${index}-${option}`}
                      >
                        <GrammarSpeakButton
                          label={`Nghe đáp án ${String.fromCharCode(65 + index)}`}
                          text={option}
                        />
                        <label className={`grammarAnswer ${statusClass}`}>
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
                      </div>
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
                      selectedAnswer === currentQuestion.answer
                        ? "correct"
                        : "wrong"
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
            ) : questions.length > 0 ? (
              <div className="grammarTestPlaceholder">
                <strong>Đang chuẩn bị câu hỏi...</strong>
                <p>Hệ thống đang chọn câu kiểm tra phù hợp cho chủ điểm này.</p>
              </div>
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
        </div>
      </div>
    </main>
  );
}
