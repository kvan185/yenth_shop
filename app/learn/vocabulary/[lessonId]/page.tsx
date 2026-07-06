import { redirect } from "next/navigation";

type LegacyLessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LegacyVocabularyLessonPage({ params }: LegacyLessonPageProps) {
  const { lessonId } = await params;

  redirect(`/vocabulary/${lessonId}`);
}
