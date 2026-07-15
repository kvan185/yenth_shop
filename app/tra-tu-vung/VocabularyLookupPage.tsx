"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import a1VocabularyData from "../../data/a1_vocab_partial_template.json";
import a2VocabularyData from "../../data/a2_vocab_partial_template.json";
import b1VocabularyData from "../../data/b1_vocab_partial_template.json";
import b2VocabularyData from "../../data/b2_vocab_partial_template.json";
import c1VocabularyData from "../../data/c1_vocab_partial_template.json";

type LevelId = "A1" | "A2" | "B1" | "B2" | "C1";

type VocabularyItem = {
  [key: string]: string | undefined;
  từ?: string;
  "loại từ"?: string;
  nghĩa?: string;
  "ví dụ"?: string;
  "nghĩa ví dụ"?: string;
  level: LevelId;
};

const allVocabularyData: VocabularyItem[] = [
  ...a1VocabularyData.map((item) => ({ ...item, level: "A1" as const })),
  ...a2VocabularyData.map((item) => ({ ...item, level: "A2" as const })),
  ...b1VocabularyData.map((item) => ({ ...item, level: "B1" as const })),
  ...b2VocabularyData.map((item) => ({ ...item, level: "B2" as const })),
  ...c1VocabularyData.map((item) => ({ ...item, level: "C1" as const })),
].filter((item) => item["từ"] && item["nghĩa"]);

const letters = Array.from(
  new Set(
    allVocabularyData
      .map((item) => getWord(item).trim().charAt(0).toUpperCase())
      .filter((letter) => /^[A-Z]$/.test(letter)),
  ),
).sort();

function normalizeText(value: string | undefined) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getWord(item: VocabularyItem) {
  return item["từ"] || "";
}

function getMeaning(item: VocabularyItem) {
  return item["nghĩa"] || "";
}

function matchesSearch(item: VocabularyItem, keyword: string) {
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
}

export default function VocabularyLookupPage() {
  const [query, setQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("ALL");

  const filteredWords = useMemo(() => {
    const keyword = normalizeText(query);
    return allVocabularyData.filter((item) => {
      if (
        selectedLetter !== "ALL" &&
        getWord(item).trim().charAt(0).toUpperCase() !== selectedLetter
      ) {
        return false;
      }

      return matchesSearch(item, keyword);
    });
  }, [query, selectedLetter]);

  return (
    <main className="lookupShell dictionaryLookupShell">
      <header className="lookupHeader">
        <div>
          <p className="eyebrow">Dictionary</p>
          <h1>Tra từ vựng</h1>
        </div>

        <div className="lookupHeaderActions">
          <Link className="secondaryButton lookupBackButton" href="/vocabulary">
            Từ vựng
          </Link>
          <div className="lookupStats" aria-label="Thống kê tra cứu">
            <div>
              <span>Tổng</span>
              <strong>{allVocabularyData.length}</strong>
            </div>
            <div>
              <span>Kết quả</span>
              <strong>{filteredWords.length}</strong>
            </div>
          </div>
        </div>
      </header>

      <section className="lookupToolbar" aria-label="Bộ lọc tra từ">
        <label className="searchBox lookupSearch" aria-label="Tìm từ vựng">
          <input
            type="search"
            placeholder="Tìm từ, nghĩa, ví dụ..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="lookupAlphabet" aria-label="Lọc theo chữ cái">
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
      </section>

      <section className="lookupResults" aria-label="Danh sách kết quả">
        {filteredWords.length > 0 ? (
          filteredWords.map((item, index) => (
            <article
              className="lookupResultCard"
              key={`${item.level}-${getWord(item)}-${index}`}
            >
              <div className="lookupResultHead">
                <div>
                  <h2>{getWord(item)}</h2>
                </div>
                <span className="lookupIndex">{index + 1}</span>
              </div>

              <dl className="lookupResultBody">
                <div>
                  <dt>Loại từ</dt>
                  <dd>{item["loại từ"] || "Chưa có"}</dd>
                </div>
                <div>
                  <dt>Nghĩa</dt>
                  <dd>{getMeaning(item)}</dd>
                </div>
                <div>
                  <dt>Ví dụ</dt>
                  <dd>{item["ví dụ"] || "Chưa có ví dụ"}</dd>
                </div>
                <div>
                  <dt>Dịch ví dụ</dt>
                  <dd>{item["nghĩa ví dụ"] || "Chưa có bản dịch"}</dd>
                </div>
              </dl>
            </article>
          ))
        ) : (
          <div className="lookupEmpty">
            <p>Không có kết quả phù hợp.</p>
            <span>Thử bỏ bớt bộ lọc hoặc nhập từ khóa khác.</span>
          </div>
        )}
      </section>
    </main>
  );
}
