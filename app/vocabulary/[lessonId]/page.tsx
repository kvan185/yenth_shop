import { notFound } from "next/navigation";
import { levelDataMap, type LevelId } from "../../../lib/vocabulary";
import VocabularyStudyPage from "./VocabularyStudyPage";

type LessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

const lessonMap: Record<string, LevelId> = {
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1",
};

export function generateStaticParams() {
  return Object.keys(lessonMap).map((lessonId) => ({ lessonId }));
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const level = lessonMap[lessonId.toLowerCase()];

  return {
    title: level ? `Ôn từ vựng VSTEP ${level}` : "Ôn từ vựng VSTEP",
    description: level
      ? `Ứng dụng học từ vựng và kiểm tra trắc nghiệm VSTEP ${level}`
      : "Ứng dụng học từ vựng và kiểm tra trắc nghiệm VSTEP",
  };
}

export default async function VocabularyLessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const level = lessonMap[lessonId.toLowerCase()];

  if (!level) {
    notFound();
  }

  return <VocabularyStudyPage level={level} vocabularyData={levelDataMap[level]} />;
}
