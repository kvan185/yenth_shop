"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  getCompletedLevels,
  type CompletedLevel,
} from "../../lib/lessonCompletion";
import {
  getOwnProfile,
  getUserDisplayName,
  type UserProfile,
} from "../../lib/profile";
import { supabase } from "../../lib/supabase";
import {
  getCurrentStreakMilestone,
  getDailyCorrectWordCount,
  getDailyStreak,
  getLocalDateKey,
  streakMilestones,
} from "../../lib/streak";
import { levelConfig, type LevelId } from "../../lib/vocabulary";

const settingItems = [
  "Nhắc học từ vựng mỗi ngày",
  "Ưu tiên bài A2 Vocabulary",
  "Lưu tiến độ quiz và flashcard",
];

const todayWordTarget = 20;
const todayTargetLevel = "A2";

type TodayGoal = {
  completedLevels: number;
  correctWords: number;
  hasStudiedToday: boolean;
};

type LearningLevel = {
  href: string;
  level: LevelId;
  progress: number;
  status: string;
  totalWords: number;
};

function getProfileProgressOwnerKey(userId: string) {
  return userId ? `user:${userId}` : "guest";
}

function getVocabularyProgressStorageKey(level: string, ownerKey: string) {
  return `yenth:vocabulary:${ownerKey}:${level.toLowerCase()}:progress`;
}

function getVocabularyDailyGoalStorageKey(
  level: string,
  ownerKey: string,
  dateKey: string,
) {
  return `yenth:vocabulary:${ownerKey}:${level.toLowerCase()}:daily:${dateKey}`;
}

function readLocalTodayCorrectCount(level: string, ownerKey: string) {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const rawProgress = window.localStorage.getItem(
      getVocabularyDailyGoalStorageKey(level, ownerKey, getLocalDateKey()),
    );
    const parsed = rawProgress
      ? (JSON.parse(rawProgress) as { correctKeys?: string[] })
      : null;
    return parsed?.correctKeys?.length || 0;
  } catch {
    return 0;
  }
}

function readLocalLearningLevels(
  ownerKey: string,
  completedLevels: CompletedLevel[],
) {
  if (typeof window === "undefined") {
    return [] as LearningLevel[];
  }

  const completedLevelIds = new Set(completedLevels.map((item) => item.level));
  const levels = levelConfig
    .map((level) => {
      let learnedWords = 0;
      let hasProgress = false;

      try {
        const rawProgress = window.localStorage.getItem(
          getVocabularyProgressStorageKey(level.id, ownerKey),
        );
        const parsed = rawProgress
          ? (JSON.parse(rawProgress) as {
              correctKeys?: string[];
              wrongKeys?: string[];
              testElapsedSeconds?: number;
              tipCounts?: Record<string, number>;
            })
          : null;

        learnedWords = parsed?.correctKeys?.length || 0;
        hasProgress = Boolean(
          learnedWords ||
          parsed?.wrongKeys?.length ||
          parsed?.testElapsedSeconds ||
          Object.keys(parsed?.tipCounts || {}).length,
        );
      } catch {
        hasProgress = false;
      }

      const todayWords = readLocalTodayCorrectCount(level.id, ownerKey);
      learnedWords = Math.max(learnedWords, todayWords);
      hasProgress = hasProgress || todayWords > 0;

      if (completedLevelIds.has(level.id) || !hasProgress) {
        return null;
      }

      const progress = Math.min(
        100,
        Math.round((Math.min(learnedWords, level.words) / level.words) * 100),
      );

      return {
        href: level.href,
        level: level.id,
        progress,
        status:
          learnedWords > 0
            ? `${learnedWords.toLocaleString("vi-VN")}/${level.words.toLocaleString("vi-VN")} từ`
            : "Đã bắt đầu",
        totalWords: level.words,
      };
    })
    .filter((item): item is LearningLevel => Boolean(item));

  if (!levels.length && !completedLevelIds.has(todayTargetLevel)) {
    const targetConfig = levelConfig.find(
      (item) => item.id === todayTargetLevel,
    );

    if (targetConfig) {
      levels.push({
        href: targetConfig.href,
        level: targetConfig.id,
        progress: 0,
        status: "Bài gợi ý hôm nay",
        totalWords: targetConfig.words,
      });
    }
  }

  return levels;
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
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [streakDays, setStreakDays] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [completedLevels, setCompletedLevels] = useState<CompletedLevel[]>([]);
  const [learningLevels, setLearningLevels] = useState<LearningLevel[]>([]);
  const [todayGoal, setTodayGoal] = useState<TodayGoal>({
    completedLevels: 0,
    correctWords: 0,
    hasStudiedToday: false,
  });
  const currentMilestone = getCurrentStreakMilestone(streakDays);
  const displayName = getUserDisplayName(user, profile);
  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const isTargetLevelCompleted = completedLevels.some(
    (item) => item.level === todayTargetLevel,
  );
  const todayCorrectWords = todayGoal.correctWords;
  const todayGoalProgress = Math.min(
    100,
    Math.round(
      (Math.min(todayCorrectWords, todayWordTarget) / todayWordTarget) * 100,
    ),
  );
  const remainingTargetWords = Math.max(0, todayWordTarget - todayCorrectWords);
  const todayGoalHref = isTargetLevelCompleted
    ? "/review/weak-words"
    : "/vocabulary/a2";
  const todayGoalAction = isTargetLevelCompleted
    ? "Ôn từ yếu"
    : "Học A2 Vocabulary";
  const todayGoalDescription = isTargetLevelCompleted
    ? "A2 đã hoàn thành. Hôm nay ưu tiên ôn lại các từ sai hoặc trả lời lại vài câu để giữ nhịp."
    : remainingTargetWords > 0
      ? `Còn ${remainingTargetWords.toLocaleString("vi-VN")} từ đúng để đạt mục tiêu ${todayWordTarget} từ A2 hôm nay.`
      : `Bạn đã đạt mục tiêu ${todayWordTarget} từ A2 hôm nay.`;
  const achievementItems = useMemo(
    () => [
      {
        label: currentMilestone ? currentMilestone.title : "Streak",
        value: `${streakDays} ngày`,
      },
      {
        label: "Completed",
        value: completedLevels.length.toLocaleString("vi-VN"),
      },
      { label: "Level", value: "A2" },
    ],
    [completedLevels.length, streakDays],
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
        getOwnProfile(data.user).then((nextProfile) => {
          if (isMounted) {
            setProfile(nextProfile);
            setAvatarUrl(nextProfile?.avatar_url || "");
          }
        });

        getDailyStreak(data.user).then((days) => {
          if (isMounted) {
            setStreakDays(days);
          }
        });

        getCompletedLevels(data.user).then((levels) => {
          if (isMounted) {
            setCompletedLevels(levels);
            setLearningLevels(
              readLocalLearningLevels(
                getProfileProgressOwnerKey(data.user.id),
                levels,
              ),
            );
            setTodayGoal((previous) => ({
              ...previous,
              completedLevels: levels.length,
            }));
          }
        });

        setTodayGoal((previous) => ({
          ...previous,
          correctWords: readLocalTodayCorrectCount(
            todayTargetLevel,
            getProfileProgressOwnerKey(data.user.id),
          ),
        }));

        getDailyCorrectWordCount(data.user, todayTargetLevel).then((count) => {
          if (isMounted) {
            setTodayGoal((previous) => ({
              ...previous,
              correctWords: Math.max(previous.correctWords, count),
            }));
          }
        });

        supabase
          .from("learning_events")
          .select("id")
          .eq("user_id", data.user.id)
          .eq("event_type", "daily_streak")
          .eq("payload->>date", getLocalDateKey())
          .limit(1)
          .then(({ data: rows }) => {
            if (isMounted) {
              setTodayGoal((previous) => ({
                ...previous,
                hasStudiedToday: Boolean(rows?.length),
              }));
            }
          });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSaveAvatar() {
    if (!supabase || !user) {
      return;
    }

    setProfileMessage("");

    const nextAvatarUrl = avatarUrl.trim();
    const { error } = await supabase.from("profiles").upsert(
      {
        avatar_url: nextAvatarUrl || null,
        email: user.email,
        id: user.id,
        username: profile?.username || user.email?.split("@")[0] || null,
      },
      { onConflict: "id" },
    );

    if (error) {
      setProfileMessage(
        "Chưa lưu được avatar. Kiểm tra SQL/RLS trong Supabase.",
      );
      return;
    }

    setProfile((previous) => ({
      ...(previous || {}),
      avatar_url: nextAvatarUrl || null,
    }));
    setProfileMessage("Đã cập nhật avatar.");
  }

  async function handleChangePassword() {
    if (!supabase) {
      return;
    }

    setPasswordMessage("");

    if (newPassword.length < 6) {
      setPasswordMessage("Mật khẩu mới cần tối thiểu 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Mật khẩu nhập lại chưa khớp.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMessage(
        "Chưa đổi được mật khẩu. Vui lòng đăng nhập lại rồi thử tiếp.",
      );
      return;
    }

    setNewPassword("");
    setConfirmPassword("");
    setPasswordMessage("Đã đổi mật khẩu thành công.");
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
      <section className="profileCompactShell">
        <aside className="profileCompactSidebar">
          <div className="profileTopIdentity">
            {profile?.avatar_url ? (
              <img
                className="profileAvatar profileAvatarImage"
                src={profile.avatar_url}
                alt={displayName}
              />
            ) : (
              <div className="profileAvatar" aria-hidden="true">
                {initials || "Y"}
              </div>
            )}
            <div>
              <p className="homeEyebrow">Profile</p>
              <h1>{displayName}</h1>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profileTopStats" aria-label="Tổng quan hồ sơ">
            {achievementItems.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <section className="profileTodayPanel">
            <div className="profileTodayHeader">
              <div>
                <p className="homeEyebrow">Học tập</p>
                <h2>Mục tiêu hôm nay</h2>
              </div>
              <strong>{todayGoalProgress}%</strong>
            </div>
            <p>{todayGoalDescription}</p>
            <div
              className="profileProgressTrack"
              aria-label={`Tiến độ hôm nay ${todayGoalProgress}%`}
            >
              <span style={{ width: `${todayGoalProgress}%` }} />
            </div>
            <div
              className="profileTodayStats"
              aria-label="Chi tiết mục tiêu hôm nay"
            >
              <div>
                <span>Từ đúng</span>
                <strong>
                  {Math.min(todayCorrectWords, todayWordTarget).toLocaleString(
                    "vi-VN",
                  )}
                  /{todayWordTarget}
                </strong>
              </div>
              <div>
                <span>Đã học</span>
                <strong>
                  {todayGoal.hasStudiedToday || todayCorrectWords > 0
                    ? "Có"
                    : "Chưa"}
                </strong>
              </div>
            </div>
            <div className="profileHeroActions">
              <Link
                className="primaryButton profileActionLink"
                href={todayGoalHref}
              >
                {todayGoalAction}
              </Link>
              <Link
                className="secondaryButton profileActionLink"
                href="/vocabulary"
              >
                Từ vựng
              </Link>
            </div>
          </section>
        </aside>

        <section className="profileCompactMain">
          <article
            className="profilePanel profileCompletedPanel"
            id="profile-completed"
          >
            <div className="profilePanelHead">
              <div>
                <p className="homeEyebrow">Completed</p>
                <h2>Bài đã hoàn thành</h2>
              </div>
              <strong>
                {todayGoal.completedLevels.toLocaleString("vi-VN")}
              </strong>
            </div>
            <div className="profileCompletedList">
              {learningLevels.map((item) => (
                <div className="profileCurrentLesson" key={item.level}>
                  <strong>{item.level}</strong>
                  <span>{`Đang học ${item.level} Vocabulary`}</span>
                  <small>{`${item.progress}% - ${item.status}`}</small>
                  <Link
                    className="primaryButton profileCompletedAction"
                    href={item.href}
                  >
                    Học tiếp
                  </Link>
                </div>
              ))}
              {completedLevels.length ? (
                completedLevels.map((item) => (
                  <div key={item.level}>
                    <strong>{item.level}</strong>
                    <span>
                      Hoàn thành{" "}
                      {item.totalWords
                        ? `${item.totalWords.toLocaleString("vi-VN")} từ`
                        : "level"}
                    </span>
                    <small>
                      {new Intl.DateTimeFormat("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(item.completedAt))}
                    </small>
                    <Link
                      className="secondaryButton profileCompletedAction"
                      href={`/vocabulary/${item.level.toLowerCase()}`}
                    >
                      Ôn lại
                    </Link>
                  </div>
                ))
              ) : (
                <p>Chưa có bài nào được đánh dấu hoàn thành.</p>
              )}
            </div>
          </article>

          <article className="profilePanel profileAccountTools">
            <div id="profile-account">
              <p className="homeEyebrow">Account</p>
              <h2>Tài khoản</h2>
              <dl className="profileAccountList">
                <div>
                  <dt>Email</dt>
                  <dd>{user.email}</dd>
                </div>
                <div>
                  <dt>Username</dt>
                  <dd>{profile?.username || "Chưa đặt"}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{profile?.role || "student"}</dd>
                </div>
                <div>
                  <dt>User ID</dt>
                  <dd>{user.id}</dd>
                </div>
              </dl>
            </div>

            <div id="profile-avatar">
              <p className="homeEyebrow">Avatar</p>
              <h2>Đổi avatar</h2>
              <div className="profileForm">
                <label>
                  <span>Avatar URL</span>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={avatarUrl}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                  />
                </label>
                <button
                  className="primaryButton"
                  type="button"
                  onClick={handleSaveAvatar}
                >
                  Lưu avatar
                </button>
                {profileMessage ? <p>{profileMessage}</p> : null}
              </div>
            </div>

            <div id="profile-security">
              <p className="homeEyebrow">Security</p>
              <h2>Đổi mật khẩu</h2>
              <div className="profileForm">
                <label>
                  <span>Mật khẩu mới</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </label>
                <label>
                  <span>Nhập lại mật khẩu</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </label>
                <button
                  className="primaryButton"
                  type="button"
                  onClick={handleChangePassword}
                >
                  Đổi mật khẩu
                </button>
                {passwordMessage ? <p>{passwordMessage}</p> : null}
              </div>
            </div>
          </article>

          <article className="profilePanel profileCompactBottom">
            <div id="profile-streak">
              <p className="homeEyebrow">Today</p>
              <h2>Huy hiệu streak</h2>
              <div
                className="profileStreakMilestones"
                aria-label="Huy hiệu streak"
              >
                {streakMilestones.map((milestone) => {
                  const unlocked = streakDays >= milestone.days;

                  return (
                    <div
                      className={`profileStreakBadge ${milestone.className} ${unlocked ? "unlocked" : ""}`}
                      key={milestone.days}
                    >
                      <span aria-hidden="true">{milestone.icon}</span>
                      <strong>{milestone.label}</strong>
                      <small>
                        {unlocked
                          ? milestone.title
                          : `Còn ${milestone.days - streakDays} ngày`}
                      </small>
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="profile-settings">
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
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
