"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { getCurrentStreakMilestone, getDailyStreak, streakMilestones } from "../../lib/streak";

const settingItems = [
  "Nhắc học từ vựng mỗi ngày",
  "Ưu tiên bài A2 Vocabulary",
  "Lưu tiến độ quiz và flashcard",
];

function getDisplayName(user: User | null) {
  const metadataName = user?.user_metadata?.display_name;

  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  return user?.email?.split("@")[0] || "Người học YENTH";
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function ProfilePageClient() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [streakDays, setStreakDays] = useState(0);
  const currentMilestone = getCurrentStreakMilestone(streakDays);
  const displayName = getDisplayName(user);
  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const achievementItems = useMemo(
    () => [
      { label: currentMilestone ? currentMilestone.title : "Streak", value: `${streakDays} ngày` },
      { label: "XP", value: "1,250" },
      { label: "Level", value: "A2" },
    ],
    [streakDays],
  );

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) {
        return;
      }

      setUser(data.user);
      setIsLoading(false);

      if (data.user) {
        getDailyStreak(data.user).then((days) => {
          if (isMounted) {
            setStreakDays(days);
          }
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    await supabase?.auth.signOut();
    setUser(null);
    router.replace("/");
    router.refresh();
  }

  if (isLoading) {
    return (
      <main className="profilePage">
        <section className="profileHero">
          <p className="homeEyebrow">Profile</p>
          <h1>Đang tải hồ sơ...</h1>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profilePage">
        <section className="profileHero profileSignedOut">
          <p className="homeEyebrow">Profile</p>
          <h1>Bạn chưa đăng nhập.</h1>
          <p>Đăng nhập để xem hồ sơ, streak, XP và tiến độ học tập của bạn.</p>
          <Link className="primaryButton profileActionLink" href="/login">
            Đăng nhập
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="profilePage">
      <section className="profileHero">
        <div className="profileIdentity">
          <div className="profileAvatar" aria-hidden="true">
            {initials || "Y"}
          </div>
          <div>
            <p className="homeEyebrow">Profile</p>
            <h1>{displayName}</h1>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profileHeroActions">
          <Link className="secondaryButton profileActionLink" href="/vocabulary">
            Tiếp tục học
          </Link>
          <button className="secondaryButton" type="button" onClick={handleLogout}>
            Thoát
          </button>
        </div>
      </section>

      <section className="profileStats" aria-label="Thống kê học tập">
        {achievementItems.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className="profileStreakMilestones" aria-label="Huy hiệu streak">
        {streakMilestones.map((milestone) => {
          const unlocked = streakDays >= milestone.days;

          return (
            <div
              className={`profileStreakBadge ${milestone.className} ${unlocked ? "unlocked" : ""}`}
              key={milestone.days}
            >
              <span aria-hidden="true">{milestone.icon}</span>
              <strong>{milestone.label}</strong>
              <small>{unlocked ? milestone.title : `Còn ${milestone.days - streakDays} ngày`}</small>
            </div>
          );
        })}
      </section>

      <section className="profileGrid">
        <article className="profilePanel profileProgressPanel">
          <div>
            <p className="homeEyebrow">Today</p>
            <h2>Mục tiêu hôm nay</h2>
            <p>Hoàn thành 20 từ A2 và một bài multiple-choice để giữ nhịp học.</p>
          </div>
          <div className="profileProgressTrack" aria-label="Tiến độ hôm nay 68%">
            <span style={{ width: "68%" }} />
          </div>
          <Link className="primaryButton profileActionLink" href="/vocabulary/a2">
            Học A2 Vocabulary
          </Link>
        </article>

        <article className="profilePanel">
          <p className="homeEyebrow">Settings</p>
          <h2>Cài đặt học tập</h2>
          <div className="profileSettingList">
            {settingItems.map((item) => (
              <label key={item}>
                <input type="checkbox" defaultChecked />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </article>

        <article className="profilePanel">
          <p className="homeEyebrow">Account</p>
          <h2>Tài khoản</h2>
          <dl className="profileAccountList">
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>User ID</dt>
              <dd>{user.id}</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
