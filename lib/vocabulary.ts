import a1VocabularyData from "../data/a1_vocab_partial_template.json";
import a2VocabularyData from "../data/a2_vocab_partial_template.json";
import b1VocabularyData from "../data/b1_vocab_partial_template.json";
import b2VocabularyData from "../data/b2_vocab_partial_template.json";
import c1VocabularyData from "../data/c1_vocab_partial_template.json";

export type LevelId = "A1" | "A2" | "B1" | "B2" | "C1";

export type VocabularyItem = {
  [key: string]: string | undefined;
  "từ"?: string;
  "loại từ"?: string;
  "nghĩa"?: string;
  "ví dụ"?: string;
  "nghĩa ví dụ"?: string;
  level: LevelId;
};

export const levelConfig: Array<{
  id: LevelId;
  label: string;
  href: string;
  words: number;
}> = [
  { id: "A1", label: "A1", href: "/vocabulary/a1", words: a1VocabularyData.length },
  { id: "A2", label: "A2", href: "/vocabulary/a2", words: a2VocabularyData.length },
  { id: "B1", label: "B1", href: "/vocabulary/b1", words: b1VocabularyData.length },
  { id: "B2", label: "B2", href: "/vocabulary/b2", words: b2VocabularyData.length },
  { id: "C1", label: "C1", href: "/vocabulary/c1", words: c1VocabularyData.length },
];

export const levelDataMap: Record<LevelId, VocabularyItem[]> = {
  A1: a1VocabularyData.map((item) => ({ ...item, level: "A1" })),
  A2: a2VocabularyData.map((item) => ({ ...item, level: "A2" })),
  B1: b1VocabularyData.map((item) => ({ ...item, level: "B1" })),
  B2: b2VocabularyData.map((item) => ({ ...item, level: "B2" })),
  C1: c1VocabularyData.map((item) => ({ ...item, level: "C1" })),
};

export const allVocabularyData: VocabularyItem[] = levelConfig.flatMap((item) => levelDataMap[item.id]);

export function normalizeText(value: string | undefined) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export function getWord(item: { "từ"?: string }) {
  return item["từ"] || "";
}

export function getMeaning(item: { "nghĩa"?: string }) {
  return item["nghĩa"] || "";
}

export function getFirstLetter(item: { "từ"?: string }) {
  return getWord(item).trim().charAt(0).toUpperCase();
}
