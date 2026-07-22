import { notFound } from "next/navigation";
import { phraseDataMap } from "../../../lib/phrases";
import type { LevelId } from "../../../lib/vocabulary";
import PhraseLessonClient from "./PhraseLessonClient";

type PhraseLessonPageProps = {
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

export async function generateMetadata({ params }: PhraseLessonPageProps) {
  const { lessonId } = await params;
  const level = lessonMap[lessonId.toLowerCase()];

  return {
    title: level ? `Cụm từ tiếng Anh ${level}` : "Cụm từ tiếng Anh",
    description: level
      ? `Danh sách cụm từ tiếng Anh ${level} kèm nghĩa và ví dụ`
      : "Danh sách cụm từ tiếng Anh kèm nghĩa và ví dụ",
  };
}

export default async function PhraseLessonPage({
  params,
}: PhraseLessonPageProps) {
  const { lessonId } = await params;
  const level = lessonMap[lessonId.toLowerCase()];

  if (!level) {
    notFound();
  }

  const phrases = phraseDataMap[level];

  return <PhraseLessonClient level={level} phrases={phrases} />;
}
