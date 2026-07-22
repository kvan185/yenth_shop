import a1PhraseData from "../data/a1_phrase_template.json";
import a2PhraseData from "../data/a2_phrase_template.json";
import b1PhraseData from "../data/b1_phrase_template.json";
import b2PhraseData from "../data/b2_phrase_template.json";
import c1PhraseData from "../data/c1_phrase_template.json";
import type { LevelId } from "./vocabulary";

export type PhraseItem = {
  [key: string]: string | undefined;
  "từ"?: string;
  "loại từ"?: string;
  "nghĩa"?: string;
  "ví dụ"?: string;
  "nghĩa ví dụ"?: string;
  level: LevelId;
};

export const phraseLevelConfig: Array<{
  id: LevelId;
  label: string;
  href: string;
  phrases: number;
}> = [
  { id: "A1", label: "A1", href: "/phrases/a1", phrases: a1PhraseData.length },
  { id: "A2", label: "A2", href: "/phrases/a2", phrases: a2PhraseData.length },
  { id: "B1", label: "B1", href: "/phrases/b1", phrases: b1PhraseData.length },
  { id: "B2", label: "B2", href: "/phrases/b2", phrases: b2PhraseData.length },
  { id: "C1", label: "C1", href: "/phrases/c1", phrases: c1PhraseData.length },
];

export const phraseDataMap: Record<LevelId, PhraseItem[]> = {
  A1: a1PhraseData.map((item) => ({ ...item, level: "A1" })),
  A2: a2PhraseData.map((item) => ({ ...item, level: "A2" })),
  B1: b1PhraseData.map((item) => ({ ...item, level: "B1" })),
  B2: b2PhraseData.map((item) => ({ ...item, level: "B2" })),
  C1: c1PhraseData.map((item) => ({ ...item, level: "C1" })),
};

export const allPhraseData: PhraseItem[] = phraseLevelConfig.flatMap(
  (item) => phraseDataMap[item.id],
);
