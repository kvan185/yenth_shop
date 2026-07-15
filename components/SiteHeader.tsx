"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import {
  getOwnProfile,
  getUserDisplayName,
  type UserProfile,
} from "../lib/profile";
import { supabase } from "../lib/supabase";
import {
  getCurrentStreakMilestone,
  getDailyStreak,
  hasStudiedToday,
} from "../lib/streak";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/learn", label: "Lộ trình" },
  { href: "/vocabulary", label: "Từ vựng" },
  { href: "/grammar", label: "Ngữ pháp" },
  { href: "/exams", label: "Đề thi" },
  { href: "/blog", label: "Blog" },
];

type SiteHeaderProps = {
  compact?: boolean;
};

export default function SiteHeader({ compact = false }: SiteHeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [streakDays, setStreakDays] = useState(0);
  const [didStudyToday, setDidStudyToday] = useState(false);
  const streakMilestone = getCurrentStreakMilestone(streakDays);
  const userLabel = getUserDisplayName(user, profile);
  const isManager = profile?.role === "manager";

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (isMounted) {
        setUser(data.user);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!user) {
      setStreakDays(0);
      setDidStudyToday(false);
      setProfile(null);
      return;
    }

    function refreshStreakState() {
      getDailyStreak(user).then((days) => {
        if (isMounted) {
          setStreakDays(days);
        }
      });

      hasStudiedToday(user).then((status) => {
        if (isMounted) {
          setDidStudyToday(status);
        }
      });
    }

    getOwnProfile(user).then((nextProfile) => {
      if (isMounted) {
        setProfile(nextProfile);
      }
    });

    refreshStreakState();
    window.addEventListener("yenth:streak-updated", refreshStreakState);

    return () => {
      isMounted = false;
      window.removeEventListener("yenth:streak-updated", refreshStreakState);
    };
  }, [user]);

  async function handleLogout() {
    await supabase?.auth.signOut();
    setUser(null);
    setProfile(null);
    router.replace("/");
    router.refresh();
  }

  return (
    <header className={`siteHeader ${compact ? "siteHeaderCompact" : ""}`}>
      <div className="siteHeaderInner">
        <div className="siteHeaderTop">
          <Link className="siteBrand" href="/">
            <span>Y</span>
            YENTH
          </Link>

          <div className="siteHeaderActions">
            {user ? (
              <>
                <Link className="siteLoginLink siteUserLink" href="/profile">
                  {userLabel}
                </Link>
                <span
                  className={`siteStreakBadge ${
                    streakMilestone?.className || ""
                  } ${didStudyToday ? "activeToday" : "inactiveToday"}`}
                  title={didStudyToday ? "Đã học hôm nay" : "Chưa học hôm nay"}
                >
                  <span aria-hidden="true">
                    {didStudyToday ? streakMilestone?.icon || "🔥" : "◐"}
                  </span>
                  {streakDays} ngày
                </span>
                {isManager ? (
                  <Link className="siteLoginLink" href="/manager">
                    Manager
                  </Link>
                ) : null}
                <button
                  className="siteLoginLink"
                  type="button"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link className="siteLoginLink" href="/login">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

        <nav className="siteNav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
