import GrammarLessonRoute, { getGrammarMetadata } from "../GrammarLessonRoute";

export const metadata = getGrammarMetadata("modals");

export default function ModalsPage() {
  return <GrammarLessonRoute topic="modals" />;
}
