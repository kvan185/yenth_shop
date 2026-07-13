"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  allVocabularyData,
  getMeaning,
  getWord,
  levelConfig,
  normalizeText,
  type LevelId,
  type VocabularyItem,
} from "../lib/vocabulary";
import { shuffle } from "../lib/quiz";

type ProgressSnapshot = {
  correctKeys: Set<string>;
  wrongKeys: Set<string>;
  wrongCounts: Map<string, number>;
};

type ReviewMode = "today" | "weak" | "mistakes";
type PracticeMode = "flashcards" | "matching" | "fill-blank";

function getWordKey(item: VocabularyItem) {
  return `${normalizeText(getWord(item))}::${normalizeText(getMeaning(item))}`;
}

function getExample(item: VocabularyItem) {
  return item["ví dụ"] || item.example || "";
}

function getPartOfSpeech(item: VocabularyItem) {
  return item["loại từ"] || item.partOfSpeech || "";
}

function readProgressSnapshot(): ProgressSnapshot {
  const snapshot: ProgressSnapshot = {
    correctKeys: new Set(),
    wrongKeys: new Set(),
    wrongCounts: new Map(),
  };

  if (typeof window === "undefined") {
    return snapshot;
  }

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index) || "";
    if (!key.startsWith("yenth:vocabulary:") || !key.endsWith(":progress")) {
      continue;
    }

    try {
      const parsed = JSON.parse(window.localStorage.getItem(key) || "{}") as {
        correctKeys?: string[];
        wrongKeys?: string[];
      };

      for (const correctKey of parsed.correctKeys || []) {
        snapshot.correctKeys.add(correctKey);
      }

      for (const wrongKey of parsed.wrongKeys || []) {
        snapshot.wrongKeys.add(wrongKey);
        snapshot.wrongCounts.set(
          wrongKey,
          (snapshot.wrongCounts.get(wrongKey) || 0) + 1,
        );
      }
    } catch {
      continue;
    }
  }

  return snapshot;
}

function getLevelHref(level: LevelId) {
  return levelConfig.find((item) => item.id === level)?.href || "/vocabulary";
}

function getFallbackWords(limit = 12) {
  return allVocabularyData
    .filter((item) => item.level === "A2")
    .slice(0, limit);
}

function useVocabularyProgress() {
  const [refreshKey, setRefreshKey] = useState(0);

  const progress = useMemo(() => readProgressSnapshot(), [refreshKey]);
  const wordsByKey = useMemo(() => {
    return new Map(allVocabularyData.map((item) => [getWordKey(item), item]));
  }, []);

  const wrongWords = useMemo(() => {
    return Array.from(progress.wrongKeys)
      .filter((key) => !progress.correctKeys.has(key))
      .map((key) => wordsByKey.get(key))
      .filter((item): item is VocabularyItem => Boolean(item))
      .sort((first, second) => {
        return (
          (progress.wrongCounts.get(getWordKey(second)) || 0) -
          (progress.wrongCounts.get(getWordKey(first)) || 0)
        );
      });
  }, [progress, wordsByKey]);

  const recentMistakes = useMemo(() => {
    return Array.from(progress.wrongKeys)
      .map((key) => wordsByKey.get(key))
      .filter((item): item is VocabularyItem => Boolean(item));
  }, [progress.wrongKeys, wordsByKey]);

  const todayWords = useMemo(() => {
    const seed = wrongWords.length ? wrongWords : getFallbackWords(8);
    return seed.slice(0, 8);
  }, [wrongWords]);

  return {
    progress,
    recentMistakes,
    refresh: () => setRefreshKey((value) => value + 1),
    todayWords,
    wrongWords,
  };
}

function WordMiniCard({ item, meta }: { item: VocabularyItem; meta?: string }) {
  return (
    <article className="toolWordCard">
      <div>
        <strong>{getWord(item)}</strong>
        <span>{getPartOfSpeech(item) || item.level}</span>
      </div>
      <p>{getMeaning(item)}</p>
      {getExample(item) ? <small>{getExample(item)}</small> : null}
      <Link href={getLevelHref(item.level)}>{meta || `Ôn ${item.level}`}</Link>
    </article>
  );
}

export function VocabularyReviewClient({ mode }: { mode: ReviewMode }) {
  const { progress, recentMistakes, refresh, todayWords, wrongWords } =
    useVocabularyProgress();
  const list =
    mode === "today"
      ? todayWords
      : mode === "mistakes"
        ? recentMistakes
        : wrongWords;
  const fallback = list.length ? list : getFallbackWords(8);
  const emptySource = !list.length;
  const title =
    mode === "today"
      ? "Ôn hôm nay"
      : mode === "mistakes"
        ? "Lỗi sai gần đây"
        : "Từ yếu";
  const description =
    mode === "today"
      ? "Ưu tiên từ sai chưa sửa, nếu chưa có dữ liệu thì dùng A2 làm bài ôn mẫu."
      : mode === "mistakes"
        ? "Tổng hợp từ từng bị chọn sai trong các bài vocabulary."
        : "Những từ đã sai và chưa được trả lời đúng lại.";

  return (
    <main className="toolPage">
      <section className="toolHero">
        <div>
          <p className="homeEyebrow">Review</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="toolHeroActions">
          <button className="secondaryButton" type="button" onClick={refresh}>
            Tải lại tiến độ
          </button>
          <Link className="primaryButton" href="/vocabulary/a2">
            Làm quiz A2
          </Link>
        </div>
      </section>

      <section className="toolStats" aria-label="Thống kê ôn tập">
        <div>
          <strong>{progress.wrongKeys.size.toLocaleString("vi-VN")}</strong>
          <span>Từng sai</span>
        </div>
        <div>
          <strong>{wrongWords.length.toLocaleString("vi-VN")}</strong>
          <span>Cần sửa</span>
        </div>
        <div>
          <strong>{progress.correctKeys.size.toLocaleString("vi-VN")}</strong>
          <span>Đã đúng</span>
        </div>
      </section>

      {emptySource ? (
        <p className="toolNotice">
          Chưa có lịch sử sai trong trình duyệt này. Bên dưới là dữ liệu A2 mẫu để test giao diện.
        </p>
      ) : null}

      <section className="toolWordGrid">
        {fallback.map((item) => (
          <WordMiniCard item={item} key={getWordKey(item)} />
        ))}
      </section>
    </main>
  );
}

export function VocabularyPracticeClient({ mode }: { mode: PracticeMode }) {
  const { wrongWords } = useVocabularyProgress();
  const sourceWords = useMemo(
    () => (wrongWords.length >= 4 ? wrongWords : getFallbackWords(18)),
    [wrongWords],
  );

  if (mode === "matching") {
    return <MatchingPractice words={sourceWords} />;
  }

  if (mode === "fill-blank") {
    return <FillBlankPractice words={sourceWords} />;
  }

  return <FlashcardPractice words={sourceWords} />;
}

function FlashcardPractice({ words }: { words: VocabularyItem[] }) {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const current = words[index % words.length];

  function moveNext(isKnown: boolean) {
    if (isKnown) {
      setKnownCount((value) => value + 1);
    }
    setIsFlipped(false);
    setIndex((value) => (value + 1) % words.length);
  }

  return (
    <main className="toolPage practiceToolPage">
      <section className="toolHero">
        <div>
          <p className="homeEyebrow">Practice</p>
          <h1>Flashcards</h1>
          <p>Lật thẻ, tự đánh dấu đã nhớ hoặc cần gặp lại.</p>
        </div>
        <Link className="secondaryButton" href="/practice">
          Về Practice
        </Link>
      </section>

      <section className="flashcardTool" aria-live="polite">
        <button
          className={`flashcardToolCard ${isFlipped ? "flipped" : ""}`}
          type="button"
          onClick={() => setIsFlipped((value) => !value)}
        >
          <span>{current.level}</span>
          <strong>{isFlipped ? getMeaning(current) : getWord(current)}</strong>
          <small>
            {isFlipped
              ? getExample(current) || "Nhấn để quay lại mặt từ"
              : "Nhấn để xem nghĩa"}
          </small>
        </button>
        <div className="toolStats compact">
          <div>
            <strong>{index + 1}</strong>
            <span>Lượt</span>
          </div>
          <div>
            <strong>{knownCount}</strong>
            <span>Đã nhớ</span>
          </div>
        </div>
        <div className="toolHeroActions">
          <button className="secondaryButton" type="button" onClick={() => moveNext(false)}>
            Gặp lại
          </button>
          <button className="primaryButton" type="button" onClick={() => moveNext(true)}>
            Đã nhớ
          </button>
        </div>
      </section>
    </main>
  );
}

function MatchingPractice({ words }: { words: VocabularyItem[] }) {
  const pairs = useMemo(() => shuffle(words).slice(0, 6), [words]);
  const meanings = useMemo(() => shuffle(pairs), [pairs]);
  const [selectedWordKey, setSelectedWordKey] = useState("");
  const [matchedKeys, setMatchedKeys] = useState<Set<string>>(() => new Set());
  const [message, setMessage] = useState("Chọn một từ rồi chọn nghĩa tương ứng.");

  function chooseMeaning(item: VocabularyItem) {
    const meaningKey = getWordKey(item);
    if (!selectedWordKey) {
      setMessage("Chọn từ ở cột trái trước.");
      return;
    }

    if (selectedWordKey === meaningKey) {
      setMatchedKeys((previous) => new Set(previous).add(meaningKey));
      setSelectedWordKey("");
      setMessage("Đúng cặp.");
      return;
    }

    setMessage("Chưa đúng, thử ghép lại.");
  }

  return (
    <main className="toolPage practiceToolPage">
      <section className="toolHero">
        <div>
          <p className="homeEyebrow">Practice</p>
          <h1>Ghép từ</h1>
          <p>Ghép từ tiếng Anh với nghĩa tiếng Việt từ dữ liệu vocabulary.</p>
        </div>
        <Link className="secondaryButton" href="/practice">
          Về Practice
        </Link>
      </section>

      <section className="matchingBoard">
        <div>
          {pairs.map((item) => {
            const key = getWordKey(item);
            return (
              <button
                className={`${selectedWordKey === key ? "selected" : ""} ${
                  matchedKeys.has(key) ? "matched" : ""
                }`}
                disabled={matchedKeys.has(key)}
                key={key}
                type="button"
                onClick={() => setSelectedWordKey(key)}
              >
                {getWord(item)}
              </button>
            );
          })}
        </div>
        <div>
          {meanings.map((item) => {
            const key = getWordKey(item);
            return (
              <button
                className={matchedKeys.has(key) ? "matched" : ""}
                disabled={matchedKeys.has(key)}
                key={key}
                type="button"
                onClick={() => chooseMeaning(item)}
              >
                {getMeaning(item)}
              </button>
            );
          })}
        </div>
      </section>
      <p className="toolNotice">{message}</p>
    </main>
  );
}

function createBlankPrompt(item: VocabularyItem) {
  const word = getWord(item);
  const example = getExample(item);
  if (example && word) {
    const pattern = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    if (pattern.test(example)) {
      return example.replace(pattern, "_____");
    }
  }

  return `The word _____ means "${getMeaning(item)}".`;
}

function FillBlankPractice({ words }: { words: VocabularyItem[] }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const current = words[index % words.length];
  const isCorrect = normalizeText(answer) === normalizeText(getWord(current));

  function nextQuestion() {
    setAnswer("");
    setChecked(false);
    setIndex((value) => (value + 1) % words.length);
  }

  return (
    <main className="toolPage practiceToolPage">
      <section className="toolHero">
        <div>
          <p className="homeEyebrow">Practice</p>
          <h1>Điền từ</h1>
          <p>Điền từ còn thiếu dựa trên ví dụ và nghĩa tiếng Việt.</p>
        </div>
        <Link className="secondaryButton" href="/practice">
          Về Practice
        </Link>
      </section>

      <section className="fillBlankCard">
        <span>{current.level}</span>
        <h2>{createBlankPrompt(current)}</h2>
        <p>{getMeaning(current)}</p>
        <label>
          Đáp án
          <input
            value={answer}
            placeholder="Nhập từ tiếng Anh"
            onChange={(event) => {
              setAnswer(event.target.value);
              setChecked(false);
            }}
          />
        </label>
        <div className="toolHeroActions">
          <button
            className="primaryButton"
            disabled={!answer.trim()}
            type="button"
            onClick={() => setChecked(true)}
          >
            Kiểm tra
          </button>
          <button className="secondaryButton" type="button" onClick={nextQuestion}>
            Câu tiếp
          </button>
        </div>
        {checked ? (
          <p className={`toolNotice ${isCorrect ? "correct" : "wrong"}`}>
            {isCorrect ? "Đúng." : `Sai. Đáp án đúng là ${getWord(current)}.`}
          </p>
        ) : null}
      </section>
    </main>
  );
}
