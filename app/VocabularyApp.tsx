"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { createQuizQuestion, shuffle, type QuizQuestion } from "../lib/quiz";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const levels: Array<{ id: string; href: string | null }> = [
  { id: "A1", href: "/a1" },
  { id: "A2", href: "/a2" },
  { id: "B1", href: "/b1" },
  { id: "B2", href: "/b2" },
  { id: "C1", href: "/c1" },
  { id: "C2", href: null },
];
const defaultLetterPanelWidth = 380;
const minLetterPanelWidth = 280;
const maxLetterPanelRatio = 0.7;
const streakStorageKey = "vstepStreakState";

type VocabularyItem = {
  [key: string]: string | undefined;
  "từ"?: string;
  "loại từ"?: string;
  "nghĩa"?: string;
  "ví dụ"?: string;
  "nghĩa ví dụ"?: string;
};

type VocabularyAppProps = {
  level: string;
  vocabularyData: VocabularyItem[];
};

type StreakState = {
  days: number;
  lastDate: string;
};

function normalizeText(value: string | undefined) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getWord(item: VocabularyItem) {
  return item?.["từ"] || "";
}

function getMeaning(item: VocabularyItem) {
  return item?.["nghĩa"] || "";
}

function getFirstLetter(item: VocabularyItem) {
  const firstLetter = getWord(item).trim().charAt(0).toUpperCase();
  return alphabet.includes(firstLetter) ? firstLetter : "";
}

function getLocalDateKey() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date());
}

export default function VocabularyApp({ level, vocabularyData }: VocabularyAppProps) {
  const words = useMemo<VocabularyItem[]>(
    () => vocabularyData.filter((item) => getWord(item) && getMeaning(item)),
    [vocabularyData],
  );

  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [search, setSearch] = useState<string>("");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [seenWords, setSeenWords] = useState<Set<string>>(() => new Set());
  const [quiz, setQuiz] = useState<QuizQuestion<VocabularyItem> | null>(() => createQuizQuestion(words));
  const [selectedAnswer, setSelectedAnswer] = useState<VocabularyItem | null>(null);
  const [score, setScore] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0,
  });
  const [shuffledWords, setShuffledWords] = useState<VocabularyItem[]>(words);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [letterPanelWidth, setLetterPanelWidth] = useState<number>(defaultLetterPanelWidth);
  const [streakDays, setStreakDays] = useState<number>(1);
  const learnViewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedState = window.localStorage.getItem("vstepSidebarOpen");
    if (savedState !== null) {
      setIsSidebarOpen(savedState === "true");
    }

    const savedPanelWidth = Number(window.localStorage.getItem("vstepLetterPanelWidth"));
    if (Number.isFinite(savedPanelWidth) && savedPanelWidth > 0) {
      setLetterPanelWidth(
        Math.max(minLetterPanelWidth, savedPanelWidth),
      );
    }

    const today = getLocalDateKey();
    const savedStreak = window.localStorage.getItem(streakStorageKey);
    let nextStreak: StreakState = { days: 1, lastDate: today };

    if (savedStreak) {
      try {
        const parsed = JSON.parse(savedStreak) as Partial<StreakState>;
        const previousDays = Number(parsed.days) || 1;
        const previousDate = typeof parsed.lastDate === "string" ? parsed.lastDate : "";
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Ho_Chi_Minh",
        }).format(yesterday);

        if (previousDate === today) {
          nextStreak = {
            days: previousDays,
            lastDate: today,
          };
        } else if (previousDate === yesterdayKey) {
          nextStreak = {
            days: previousDays + 1,
            lastDate: today,
          };
        }
      } catch {
        nextStreak = { days: 1, lastDate: today };
      }
    }

    window.localStorage.setItem(streakStorageKey, JSON.stringify(nextStreak));
    setStreakDays(nextStreak.days);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      const isEditableTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      if (isEditableTarget) {
        return;
      }

      if (mode !== "quiz" || !selectedAnswer || event.code !== "Space") {
        return;
      }

      event.preventDefault();
      startNewQuestion();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, selectedAnswer, quiz]);

  const letterCounts = useMemo<Record<string, number>>(() => {
    return words.reduce<Record<string, number>>((counts, item) => {
      const letter = getFirstLetter(item);
      if (letter) {
        counts[letter] = (counts[letter] ?? 0) + 1;
      }
      return counts;
    }, {});
  }, [words]);

  const availableLetters = useMemo<string[]>(
    () => alphabet.filter((letter) => letterCounts[letter] > 0),
    [letterCounts],
  );

  const filteredWords = useMemo(() => {
    const keyword = normalizeText(search);
    return shuffledWords.filter((item) => {
      const matchesLetter = selectedLetter === "ALL" || getFirstLetter(item) === selectedLetter;
      if (!matchesLetter) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const haystack = [
        item["từ"],
        item["loại từ"],
        item["nghĩa"],
        item["ví dụ"],
        item["nghĩa ví dụ"],
      ]
        .map(normalizeText)
        .join(" ");

      return haystack.includes(keyword);
    });
  }, [search, selectedLetter, shuffledWords]);

  const safeIndex = filteredWords.length === 0 ? 0 : Math.min(currentIndex, filteredWords.length - 1);
  const currentWord = filteredWords[safeIndex];
  const selectedLetterLabel = selectedLetter === "ALL" ? "Tất cả" : `Chữ ${selectedLetter}`;
  const selectedLetterCount = selectedLetter === "ALL" ? words.length : letterCounts[selectedLetter] || 0;
  const selectedLetterIndex = availableLetters.indexOf(selectedLetter);

  function showWord(index: number) {
    const item = filteredWords[index];
    if (item) {
      setSeenWords((previous) => new Set(previous).add(getWord(item)));
    }
    setCurrentIndex(index);
  }

  function moveWord(step: number) {
    if (filteredWords.length === 0) {
      return;
    }

    const nextIndex = (safeIndex + step + filteredWords.length) % filteredWords.length;
    showWord(nextIndex);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentIndex(0);
  }

  function handleLetterChange(letter: string) {
    setSelectedLetter(letter);
    setCurrentIndex(0);
  }

  function handleWordMenuChange(value: string) {
    showWord(Number(value));
  }

  function moveLetter(step: number) {
    if (availableLetters.length === 0) {
      return;
    }

    if (selectedLetter === "ALL") {
      handleLetterChange(step > 0 ? availableLetters[0] : availableLetters[availableLetters.length - 1]);
      return;
    }

    const currentLetterIndex = selectedLetterIndex >= 0 ? selectedLetterIndex : 0;
    const nextLetterIndex =
      (currentLetterIndex + step + availableLetters.length) % availableLetters.length;
    handleLetterChange(availableLetters[nextLetterIndex]);
  }

  function handleShuffle() {
    setShuffledWords(shuffle(filteredWords.length ? filteredWords : words));
    setCurrentIndex(0);
  }

  function startNewQuestion() {
    setQuiz(createQuizQuestion(words));
    setSelectedAnswer(null);
  }

  function chooseAnswer(option: VocabularyItem) {
    if (selectedAnswer || !quiz) {
      return;
    }

    const isCorrect = option === quiz.answer;
    setSelectedAnswer(option);
    setScore((previous) => ({
      correct: previous.correct + (isCorrect ? 1 : 0),
      total: previous.total + 1,
    }));
  }

  function updateSidebarOpen(nextValue: boolean) {
    setIsSidebarOpen(nextValue);
    window.localStorage.setItem("vstepSidebarOpen", String(nextValue));
  }

  function handlePanelResizeStart(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!learnViewRef.current) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);

    const bounds = learnViewRef.current.getBoundingClientRect();

    function resizePanel(clientX: number) {
      const availableWidth = bounds.width;
      const maxWidth = Math.max(minLetterPanelWidth, availableWidth * maxLetterPanelRatio);
      const nextWidth = Math.min(maxWidth, Math.max(minLetterPanelWidth, bounds.right - clientX));
      setLetterPanelWidth(nextWidth);
      window.localStorage.setItem("vstepLetterPanelWidth", String(Math.round(nextWidth)));
    }

    function handlePointerMove(moveEvent: PointerEvent) {
      resizePanel(moveEvent.clientX);
    }

    function handlePointerUp() {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
  }

  return (
    <main
      className={`appShell ${isSidebarOpen ? "" : "sidebarClosed"}`}
      style={{ "--letter-panel-width": `${letterPanelWidth}px` } as CSSProperties}
    >
      {!isSidebarOpen && (
        <button
          className="menuToggleButton open"
          type="button"
          aria-label="Mở menu"
          onClick={() => updateSidebarOpen(true)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      )}

      <aside className="sidebar" aria-hidden={!isSidebarOpen}>
        <div className="sidebarHeader">
          <div className="menuBrand">
            <span className="menuLogoMark" aria-hidden="true">
              V
            </span>
            <div>
              <strong>VSTEP</strong>
              <small>Chuỗi ngày học: {streakDays}</small>
            </div>
          </div>
          <button
            className="menuToggleButton close"
            type="button"
            aria-label="Đóng menu"
            onClick={() => updateSidebarOpen(false)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <nav className="modeTabs" aria-label="Chọn chế độ học">
          <button
            className={`tabButton ${mode === "learn" ? "active" : ""}`}
            type="button"
            onClick={() => setMode("learn")}
          >
            Học
          </button>
          <button
            className={`tabButton ${mode === "quiz" ? "active" : ""}`}
            type="button"
            onClick={() => {
              setMode("quiz");
              if (!quiz) {
                startNewQuestion();
              }
            }}
          >
            Kiểm tra
            </button>
          </nav>

        <section className="menuSummary" aria-label="Thông tin học tập">
          <div>
            <span>Tổng từ</span>
            <strong>{words.length}</strong>
          </div>
          <div>
            <span>Đã xem</span>
            <strong>{seenWords.size}</strong>
          </div>
          <div>
            <span>Điểm</span>
            <strong>
              {score.correct}/{score.total}
            </strong>
          </div>
        </section>

        <nav className="menuLevelNav" aria-label="Chọn cấp độ">
          {levels.map((item) => {
            if (!item.href) {
              return (
                <button className="levelNavItem locked" type="button" key={item.id} disabled>
                  {item.id}
                </button>
              );
            }

            return (
              <Link
                className={`levelNavItem ${item.id === level ? "active" : ""}`}
                href={item.href}
                key={item.id}
              >
                {item.id}
              </Link>
            );
          })}
        </nav>

      </aside>

      <section className="workspace">
        <header className="miniHeader">
          <div className="miniBrand">
            <span className="miniLogoMark" aria-hidden="true">
              V
            </span>
            <div>
              <strong>VSTEP Vocabulary</strong>
              <small>Ôn từ vựng {level}</small>
            </div>
          </div>

          <div className="miniStreak">
            <span>Chuỗi ngày học</span>
            <strong>{streakDays}</strong>
          </div>
        </header>

        <header className="topbar">
          <label className="searchBox">
            <span>Tìm từ</span>
            <input
              type="search"
              placeholder="Nhập từ hoặc nghĩa..."
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </label>
          <button className="secondaryButton" type="button" onClick={handleShuffle}>
            Trộn từ
          </button>
        </header>

        {mode === "learn" ? (
          <section className="view learnView" aria-label="Học từ vựng" ref={learnViewRef}>
            <div className="wordCard">
              {currentWord ? (
                <>
                  <div className="wordCardHead">
                    <div>
                      <p className="eyebrow">
                        Từ {safeIndex + 1}/{filteredWords.length}
                      </p>
                      <h2>{getWord(currentWord)}</h2>
                    </div>
                    <span className="tag">{currentWord["loại từ"] || "word"}</span>
                  </div>

                  <dl className="wordDetail">
                    <div>
                      <dt>Nghĩa</dt>
                      <dd>{getMeaning(currentWord)}</dd>
                    </div>
                    <div>
                      <dt>Ví dụ</dt>
                      <dd>{currentWord["ví dụ"] || "Chưa có ví dụ"}</dd>
                    </div>
                    <div>
                      <dt>Dịch ví dụ</dt>
                      <dd>{currentWord["nghĩa ví dụ"] || "Chưa có bản dịch"}</dd>
                    </div>
                  </dl>
                </>
              ) : (
                <div>
                  <p className="eyebrow">Không có từ</p>
                  <h2>Không tìm thấy</h2>
                </div>
              )}

              <div className="cardActions">
                <button className="secondaryButton" type="button" onClick={() => moveWord(-1)}>
                  Trước
                </button>
                <button className="primaryButton" type="button" onClick={() => moveWord(1)}>
                  Tiếp theo
                </button>
              </div>
            </div>

            <button
              className="panelResizeHandle"
              type="button"
              aria-label="Kéo để thay đổi độ rộng bộ lọc chữ cái"
              onPointerDown={handlePanelResizeStart}
            />

            <div className="letterPanel" aria-label="Chọn từ theo chữ cái">
              <div className="letterPanelHead">
                <div>
                  <span>Bộ lọc chữ cái</span>
                  <strong>
                    {selectedLetterLabel}: {filteredWords.length}/{selectedLetterCount} từ
                  </strong>
                </div>
                <div className="letterControls" aria-label="Điều hướng chữ cái">
                  <button className="letterNavButton" type="button" onClick={() => moveLetter(-1)}>
                    ←
                  </button>
                  <button className="letterNavButton" type="button" onClick={() => moveLetter(1)}>
                    →
                  </button>
                </div>
              </div>
              <div className="letterGrid">
                <button
                  className={`letterButton ${selectedLetter === "ALL" ? "active" : ""}`}
                  type="button"
                  onClick={() => handleLetterChange("ALL")}
                >
                  Tất cả
                </button>
                {alphabet.map((letter) => (
                  <button
                    className={`letterButton ${selectedLetter === letter ? "active" : ""}`}
                    type="button"
                    key={letter}
                    disabled={!letterCounts[letter]}
                    title={letterCounts[letter] ? `${letterCounts[letter]} từ bắt đầu bằng ${letter}` : ""}
                    onClick={() => handleLetterChange(letter)}
                  >
                    <span>{letter}</span>
                    <small>{letterCounts[letter] || 0}</small>
                  </button>
                ))}
              </div>
              {selectedLetter !== "ALL" && (
                <div className="wordMenu" aria-label={`Từ bắt đầu bằng ${selectedLetter}`}>
                  {filteredWords.length > 0 ? (
                    <>
                      <label className="wordSelect">
                        <span>Từ nhóm {selectedLetter}</span>
                        <select
                          value={safeIndex}
                          onChange={(event) => handleWordMenuChange(event.target.value)}
                        >
                          {filteredWords.map((item, index) => (
                            <option value={index} key={`${getWord(item)}-${index}`}>
                              {getWord(item)}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className="wordMenuGrid">
                        {filteredWords.slice(0, 24).map((item, index) => (
                          <button
                            className={`wordMenuButton ${index === safeIndex ? "active" : ""}`}
                            type="button"
                            key={`${getWord(item)}-menu-${index}`}
                            title={`${getWord(item)}: ${getMeaning(item)}`}
                            onClick={() => showWord(index)}
                          >
                            {getWord(item)}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="wordMenuEmpty">Không có từ phù hợp với tìm kiếm hiện tại.</p>
                  )}
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="view quizView" aria-label="Kiểm tra từ vựng">
            <div className="quizCard">
              <div className="quizHead">
                <div>
                  <h2>{quiz ? getWord(quiz.answer) : "Cần ít nhất 4 từ"}</h2>
                </div>
                <button className="secondaryButton" type="button" onClick={startNewQuestion}>
                  Câu khác
                </button>
              </div>

              <div className="answerGrid">
                {quiz?.options.map((option, index) => {
                  const isCorrect = option === quiz.answer;
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
                    <button
                      className={className}
                      type="button"
                      key={`${getMeaning(option)}-${index}`}
                      onClick={() => chooseAnswer(option)}
                    >
                      <span className="answerLetter">{String.fromCharCode(65 + index)}</span>
                      <span>{getMeaning(option)}</span>
                    </button>
                  );
                })}
              </div>

              <p
                className={`feedback ${selectedAnswer ? (selectedAnswer === quiz?.answer ? "correct" : "wrong") : ""
                  }`}
                aria-live="polite"
              >
                {selectedAnswer
                  ? selectedAnswer === quiz?.answer
                    ? "Đúng."
                    : `Sai. Đáp án đúng: ${getMeaning(quiz?.answer)}`
                  : ""}
              </p>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
