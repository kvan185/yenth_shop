"use client";

import VocabularyApp from "../VocabularyApp";
import vocabularyData from "../../data/b2_vocab_partial_template.json";

export default function B2VocabularyPage() {
  return <VocabularyApp level="B2" vocabularyData={vocabularyData} />;
}
