"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getCompletedLevels,
  type CompletedLevel,
} from "../../lib/lessonCompletion";
import { supabase } from "../../lib/supabase";
import { getDailyStreak, streakMilestones } from "../../lib/streak";
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
    text: "Tìm nghĩa, ví dụ và level của từ trong toàn bộ dữ liệu.",
  },
  {
    href: "/review/weak-words",
    title: "Từ yếu",
    text: "Ôn các từ sai nhiều hoặc chưa nhớ chắc.",
  },
  {
    href: "/practice/multiple-choice",
    title: "Quiz nhanh",
    text: "Làm câu hỏi trắc nghiệm để kiểm tra trí nhớ chủ động.",
  },
];

export default function VocabularyIndexClient() {
  const totalWords = levelConfig.reduce(
    (total, level) => total + level.words,
    0,
  );
  const [streakDays, setStreakDays] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<CompletedLevel[]>([]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        getDailyStreak(data.user).then((days) => {
          if (isMounted) {
            setStreakDays(days);
          }
        });
      }

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
      <section className="vocabIndexHero">
        <div className="learnPathHeroCopy">
          <p className="homeEyebrow">Vocabulary</p>
          <h1>Chọn level từ vựng phù hợp với bạn.</h1>
          <p>
            Học theo cấp độ A1-C1, luyện flashcard, làm checkpoint và quay lại
            ôn các từ còn yếu sau mỗi phiên.
          </p>
          <div className="homeHeroActions">
            <Link className="primaryButton" href="/vocabulary/a2">
              Tiếp tục A2
            </Link>
            <Link className="secondaryButton" href="/dictionary">
              Tra từ nhanh
            </Link>
          </div>
        </div>

        <aside className="vocabSummaryPanel" aria-label="Tổng quan từ vựng">
          <span>Kho từ hiện có</span>
          <h2>{totalWords.toLocaleString("vi-VN")} từ</h2>
          <p>
            Được chia theo {levelConfig.length} level, phù hợp để học ngắn mỗi
            ngày.
          </p>
          <div className="todayProgress" aria-label="Tiến độ A2 68%">
            <span style={{ width: "68%" }} />
          </div>
          <div className="learnCurrentStats">
            <div>
              <strong>{streakDays}</strong>
              <span>Ngày streak</span>
            </div>
            <div>
              <strong>10</strong>
              <span>Mốc đầu</span>
            </div>
            <div>
              <strong>500</strong>
              <span>Mốc cao</span>
            </div>
          </div>
          <div className="vocabStreakMilestones" aria-label="Mốc streak">
            {streakMilestones.map((milestone) => (
              <span
                className={`profileStreakBadge ${milestone.className} ${
                  streakDays >= milestone.days ? "unlocked" : ""
                }`}
                key={milestone.days}
              >
                <span aria-hidden="true">{milestone.icon}</span>
                <strong>{milestone.label}</strong>
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="vocabIndexSection">
        <div className="sectionHead">
          <span>Chọn level</span>
          <h2>Đi từ dễ đến khó, mở bài khi đã sẵn sàng</h2>
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
          <h2>Không nhớ chắc thì quay lại ôn ngay</h2>
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
