import GrammarLessonRoute, { getGrammarMetadata } from "../GrammarLessonRoute";

export const metadata = getGrammarMetadata("sentence-structure");

export default function SentenceStructurePage() {
  return <GrammarLessonRoute topic="sentence-structure" />;
}
