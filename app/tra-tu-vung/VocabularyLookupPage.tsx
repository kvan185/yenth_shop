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
  "từ"?: string;
  "loại từ"?: string;
  "nghĩa"?: string;
  "ví dụ"?: string;
  "nghĩa ví dụ"?: string;
  level: LevelId;
};

const levelOptions: Array<{ id: "ALL" | LevelId; label: string }> = [
  { id: "ALL", label: "Tất cả" },
  { id: "A1", label: "A1" },
  { id: "A2", label: "A2" },
  { id: "B1", label: "B1" },
  { id: "B2", label: "B2" },
  { id: "C1", label: "C1" },
];

const allVocabularyData: VocabularyItem[] = [
  ...a1VocabularyData.map((item) => ({ ...item, level: "A1" as const })),
  ...a2VocabularyData.map((item) => ({ ...item, level: "A2" as const })),
  ...b1VocabularyData.map((item) => ({ ...item, level: "B1" as const })),
  ...b2VocabularyData.map((item) => ({ ...item, level: "B2" as const })),
  ...c1VocabularyData.map((item) => ({ ...item, level: "C1" as const })),
].filter((item) => item["từ"] && item["nghĩa"]);

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
    item.level,
  ]
    .map(normalizeText)
    .join(" ");

  return haystack.includes(keyword);
}

export default function VocabularyLookupPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"ALL" | LevelId>("ALL");

  const filteredWords = useMemo(() => {
    const keyword = normalizeText(query);
    return allVocabularyData.filter((item) => {
      if (level !== "ALL" && item.level !== level) {
        return false;
      }

      return matchesSearch(item, keyword);
    });
  }, [level, query]);

  return (
    <main className="lookupShell">
      <header className="lookupHeader">
        <div>
          <p className="eyebrow">VSTEP Vocabulary</p>
          <h1>Tra từ vựng toàn data</h1>
          <p className="lookupDescription">
            Tìm kiếm cùng lúc trên A1, A2, B1, B2 và C1. Mỗi kết quả hiển thị rõ cấp độ để đối chiếu nhanh.
          </p>
        </div>

        <div className="lookupHeaderActions">
          <Link className="secondaryButton lookupBackButton" href="/">
            Về trang chọn cấp độ
          </Link>
          <div className="lookupStats" aria-label="Thống kê tra cứu">
            <div>
              <span>Tổng data</span>
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
        <label className="searchBox lookupSearch">
          <span>Tìm từ, nghĩa, ví dụ hoặc loại từ</span>
          <input
            type="search"
            placeholder="Nhập từ khóa..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="lookupLevels" role="tablist" aria-label="Lọc theo cấp độ">
          {levelOptions.map((option) => (
            <button
              key={option.id}
              className={`lookupLevelButton ${level === option.id ? "active" : ""}`}
              type="button"
              onClick={() => setLevel(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="lookupResults" aria-label="Danh sách kết quả">
        {filteredWords.length > 0 ? (
          filteredWords.map((item, index) => (
            <article className="lookupResultCard" key={`${item.level}-${getWord(item)}-${index}`}>
              <div className="lookupResultHead">
                <div>
                  <span className="lookupLevelTag">{item.level}</span>
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
