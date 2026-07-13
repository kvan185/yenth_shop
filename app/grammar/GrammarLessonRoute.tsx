import { notFound } from "next/navigation";
import { getGrammarLesson } from "../../lib/grammar";
import GrammarLessonClient from "./GrammarLessonClient";

type GrammarLessonRouteProps = {
  topic: string;
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

  return <GrammarLessonClient lesson={lesson} />;
}
