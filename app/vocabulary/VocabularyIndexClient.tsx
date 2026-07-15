"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getCompletedLevels,
  type CompletedLevel,
} from "../../lib/lessonCompletion";
import { supabase } from "../../lib/supabase";
import { levelConfig } from "../../lib/vocabulary";

const levelNotes: Record<string, string> = {
  A1: "Từ nền tảng cho câu giao tiếp ngắn và chủ đề quen thuộc.",
  A2: "Mở rộng từ dùng hằng ngày, học tập và công việc đơn giản.",
  B1: "Từ vựng trung cấp cho đọc hiểu, mô tả và trình bày ý kiến.",
  B2: "Từ học thuật, công việc và các chủ đề trừu tượng hơn.",
  C1: "Từ nâng cao cho bài đọc dài, tranh luận và diễn đạt chính xác.",
};

const shortcuts = [
  {
    href: "/dictionary",
    title: "Tra từ",
    text: "Tìm nghĩa và ví dụ.",
  },
  {
    href: "/review/weak-words",
    title: "Từ yếu",
    text: "Ôn từ chưa nhớ.",
  },
  {
    href: "/practice/multiple-choice",
    title: "Quiz nhanh",
    text: "Làm trắc nghiệm nhanh.",
  },
];

export default function VocabularyIndexClient() {
  const totalWords = levelConfig.reduce(
    (total, level) => total + level.words,
    0,
  );
  const [completedLevels, setCompletedLevels] = useState<CompletedLevel[]>([]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      getCompletedLevels(data.user).then((levels) => {
        if (isMounted) {
          setCompletedLevels(levels);
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const completedLevelMap = new Map(
    completedLevels.map((item) => [item.level, item]),
  );

  return (
    <main className="vocabIndexPage">
      <section className="vocabIndexSection vocabIndexMainSection">
        <div className="vocabIndexToolbar">
          <div className="sectionHead">
            <span>{totalWords.toLocaleString("vi-VN")} từ</span>
            <h2>Chọn level</h2>
          </div>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/vocabulary/a2">
              Tiếp tục A2
            </Link>
            <Link className="secondaryButton" href="/dictionary">
              Tra từ
            </Link>
          </div>
        </div>
        <div className="vocabLevelGrid">
          {levelConfig.map((level) => {
            const completedLevel = completedLevelMap.get(level.id);
            const completedAt = completedLevel?.completedAt
              ? new Intl.DateTimeFormat("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(new Date(completedLevel.completedAt))
              : "";

            return (
              <article
                className={`vocabLevelCard ${level.id === "A2" ? "active" : ""} ${
                  completedLevel ? "completed" : ""
                }`}
                key={level.id}
              >
                <div>
                  <span>
                    {completedLevel
                      ? "Completed"
                      : level.id === "A2"
                        ? "Đang học"
                        : "Level"}
                  </span>
                  <h3>{level.label}</h3>
                </div>
                <p>{levelNotes[level.id]}</p>
                <div className="vocabLevelMeta">
                  <strong>{level.words.toLocaleString("vi-VN")}</strong>
                  <span>từ</span>
                </div>
                {completedLevel ? (
                  <div className="vocabLevelCompleted">
                    <strong>Đã hoàn thành</strong>
                    <span>{completedAt}</span>
                  </div>
                ) : null}
                <div className="vocabLevelActions">
                  <Link className="primaryButton" href={level.href}>
                    {completedLevel ? "Ôn lại level" : "Mở level"}
                  </Link>
                  <Link className="secondaryButton" href={level.href}>
                    Checkpoint
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="vocabIndexSection">
        <div className="sectionHead">
          <span>Luyện tập</span>
          <h2>Công cụ nhanh</h2>
        </div>
        <div className="reviewGrid">
          {shortcuts.map((shortcut) => (
            <Link
              className="reviewCard"
              href={shortcut.href}
              key={shortcut.title}
            >
              <strong>{shortcut.title}</strong>
              <p>{shortcut.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
