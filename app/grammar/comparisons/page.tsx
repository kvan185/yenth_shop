import GrammarLessonRoute, { getGrammarMetadata } from "../GrammarLessonRoute";

export const metadata = getGrammarMetadata("comparisons");

export default function ComparisonsPage() {
  return <GrammarLessonRoute topic="comparisons" />;
}
