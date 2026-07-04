"use client";

import VocabularyApp from "../VocabularyApp";
import vocabularyData from "../../data/a2_vocab_partial_template.json";

export default function A2VocabularyPage() {
  return <VocabularyApp level="A2" vocabularyData={vocabularyData} />;
}
