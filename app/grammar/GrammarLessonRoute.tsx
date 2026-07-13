import { notFound } from "next/navigation";
import tensesTestData from "../../data/grammar-tests/tenses.json";
import sentenceStructureTestData from "../../data/grammar-tests/sentence-structure.json";
import modalsTestData from "../../data/grammar-tests/modals.json";
import relativeClausesTestData from "../../data/grammar-tests/relative-clauses.json";
import passiveVoiceTestData from "../../data/grammar-tests/passive-voice.json";
import comparisonsTestData from "../../data/grammar-tests/comparisons.json";
import {
  getGrammarLesson,
  type GrammarTestData,
  type GrammarTopicId,
} from "../../lib/grammar";
import GrammarLessonClient from "./GrammarLessonClient";

type GrammarLessonRouteProps = {
  topic: string;
};

const grammarTestDataMap: Record<GrammarTopicId, GrammarTestData> = {
  comparisons: comparisonsTestData as GrammarTestData,
  modals: modalsTestData as GrammarTestData,
  "passive-voice": passiveVoiceTestData as GrammarTestData,
  "relative-clauses": relativeClausesTestData as GrammarTestData,
  "sentence-structure": sentenceStructureTestData as GrammarTestData,
  tenses: tensesTestData as GrammarTestData,
};

export function getGrammarMetadata(topic: string) {
  const lesson = getGrammarLesson(topic);

  if (!lesson) {
    return {
      title: "Grammar | YENTH",
    };
  }

  return {
    title: `${lesson.label} | Grammar YENTH`,
    description: lesson.description,
  };
}

export default function GrammarLessonRoute({ topic }: GrammarLessonRouteProps) {
  const lesson = getGrammarLesson(topic);

  if (!lesson) {
    notFound();
  }

  return (
    <GrammarLessonClient
      lesson={lesson}
      testData={grammarTestDataMap[lesson.id]}
    />
  );
}
