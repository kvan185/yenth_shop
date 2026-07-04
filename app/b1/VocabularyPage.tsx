"use client";

import VocabularyApp from "../VocabularyApp";
import vocabularyData from "../../data/b1_vocab_partial_template.json";

export default function B1VocabularyPage() {
  return <VocabularyApp level="B1" vocabularyData={vocabularyData} />;
}
