import GrammarLessonRoute, { getGrammarMetadata } from "../GrammarLessonRoute";

export const metadata = getGrammarMetadata("relative-clauses");

export default function RelativeClausesPage() {
  return <GrammarLessonRoute topic="relative-clauses" />;
}
