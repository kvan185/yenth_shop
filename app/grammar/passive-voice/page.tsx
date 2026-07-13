import GrammarLessonRoute, { getGrammarMetadata } from "../GrammarLessonRoute";

export const metadata = getGrammarMetadata("passive-voice");

export default function PassiveVoicePage() {
  return <GrammarLessonRoute topic="passive-voice" />;
}
