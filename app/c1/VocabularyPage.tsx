"use client";

import VocabularyApp from "../VocabularyApp";
import vocabularyData from "../../data/c1_vocab_partial_template.json";

export default function C1VocabularyPage() {
  return <VocabularyApp level="C1" vocabularyData={vocabularyData} />;
}