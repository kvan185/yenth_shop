import GrammarLessonRoute, { getGrammarMetadata } from "../GrammarLessonRoute";

export const metadata = getGrammarMetadata("tenses");

export default function TensesPage() {
  return <GrammarLessonRoute topic="tenses" />;
}
