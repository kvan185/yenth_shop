"use client";

import VocabularyApp from "../VocabularyApp";
import vocabularyData from "../../data/a1_vocab_partial_template.json";

export default function A1VocabularyPage() {
  return <VocabularyApp level="A1" vocabularyData={vocabularyData} />;
}
