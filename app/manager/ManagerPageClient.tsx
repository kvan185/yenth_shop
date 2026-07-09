"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

type ResourceStatus = "checking" | "ready" | "missing" | "blocked";

type ResourceState = {
  description: string;
  error?: string;
  name: string;
  rows?: number;
  status: ResourceStatus;
};

const managedTables: Array<Pick<ResourceState, "description" | "name">> = [
  {
    name: "profiles",
    description: "Thông tin người học, tên hiển thị và ngày tạo tài khoản.",
  },
  {
    name: "vocabulary_progress",
    description: "Tiến độ đúng/sai theo từng từ và từng level.",
  },
  {
    name: "quiz_attempts",
    description: "Lịch sử làm bài kiểm tra, điểm và thời điểm hoàn thành.",
  },
  {
    name: "learning_events",
    description: "Nhật ký hành động học tập để tính streak, XP và thống kê.",
  },
];

const setupSql = `create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  username text unique,
  email text unique,
  role text default 'student',
  created_at timestamptz default now()
);

alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists username text unique;
alter table public.profiles add column if not exists email text unique;
alter table public.profiles add column if not exists role text default 'student';
alter table public.profiles add column if not exists created_at timestamptz default now();

create table if not exists public.vocabulary_progress (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  level text not null,
  word_key text not null,
  status text not null check (status in ('correct', 'wrong')),
  updated_at timestamptz default now(),
  unique (user_id, level, word_key)
);

create table if not exists public.quiz_attempts (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  skill text not null,
  level text,
  score integer default 0,
  total integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.learning_events (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  event_type text not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create unique index if not exists learning_events_daily_streak_unique
on public.learning_events (user_id, ((payload->>'date')))
where event_type = 'daily_streak';

alter table public.profiles enable row level security;
alter table public.vocabulary_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.learning_events enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "vocabulary_progress_own" on public.vocabulary_progress;
create policy "vocabulary_progress_own"
on public.vocabulary_progress for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "quiz_attempts_own" on public.quiz_attempts;
create policy "quiz_attempts_own"
on public.quiz_attempts for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "learning_events_own" on public.learning_events;
create policy "learning_events_own"
on public.learning_events for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);`;

function getStatusLabel(status: ResourceStatus) {
  if (status === "ready") {
    return "Sẵn sàng";
  }
  if (status === "missing") {
    return "Chưa tạo";
  }
  if (status === "blocked") {
    return "Bị chặn";
  }
  return "Đang kiểm tra";
}

type ManagerPageClientProps = {
  managerUser: string;
};

export default function ManagerPageClient({
  managerUser,
}: ManagerPageClientProps) {
  const [user, setUser] = useState<User | null>(null);
  const [resources, setResources] = useState<ResourceState[]>(
    managedTables.map((item) => ({ ...item, status: "checking" })),
  );
  const [message, setMessage] = useState("");

  const readyCount = useMemo(
    () => resources.filter((resource) => resource.status === "ready").length,
    [resources],
  );

  useEffect(() => {
    if (!supabase) {
      setResources(
        managedTables.map((item) => ({
          ...item,
          status: "blocked",
          error: "Supabase chưa cấu hình.",
        })),
      );
      return;
    }

    let isMounted = true;

    async function loadManagerState() {
      const { data: userData } = await supabase.auth.getUser();
      if (!isMounted) {
        return;
      }
      setUser(userData.user);

      const nextResources = await Promise.all(
        managedTables.map(async (table) => {
          const { count, error } = await supabase
            .from(table.name)
            .select("*", { count: "exact", head: true });

          if (!error) {
            return {
              ...table,
              rows: count || 0,
              status: "ready" as const,
            };
          }

          const messageText = error.message || "";
          const status: ResourceStatus =
            messageText.toLowerCase().includes("does not exist") ||
            messageText.toLowerCase().includes("could not find")
              ? "missing"
              : "blocked";

          return {
            ...table,
            error: messageText,
            status,
          };
        }),
      );

      if (isMounted) {
        setResources(nextResources);
      }
    }

    void loadManagerState();

    return () => {
      isMounted = false;
    };
  }, []);

  async function refreshResources() {
    if (!supabase) {
      setMessage("Supabase chưa được cấu hình.");
      return;
    }

    setMessage("Đang kiểm tra lại tài nguyên...");
    setResources(
      managedTables.map((item) => ({ ...item, status: "checking" })),
    );

    const nextResources = await Promise.all(
      managedTables.map(async (table) => {
        const { count, error } = await supabase
          .from(table.name)
          .select("*", { count: "exact", head: true });

        if (!error) {
          return { ...table, rows: count || 0, status: "ready" as const };
        }

        return {
          ...table,
          error: error.message,
          status: error.message.toLowerCase().includes("does not exist")
            ? ("missing" as const)
            : ("blocked" as const),
        };
      }),
    );

    setResources(nextResources);
    setMessage("Đã cập nhật trạng thái.");
  }

  function copySql() {
    navigator.clipboard
      .writeText(setupSql)
      .then(() =>
        setMessage(
          "Đã copy SQL tạo bảng. Dán vào Supabase SQL Editor để chạy.",
        ),
      )
      .catch(() =>
        setMessage(
          "Không copy được tự động. Bạn có thể chọn và copy thủ công.",
        ),
      );
  }

  async function logoutManager() {
    await fetch("/api/manager/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <main className="managerPage">
      <section className="managerHero">
        <div>
          <p className="homeEyebrow">Manager</p>
          <h1>Quản lý tài nguyên Supabase cho YENTH.</h1>
          <p>
            Kiểm tra kết nối, trạng thái bảng dữ liệu và chuẩn bị các tài nguyên
            cần có để đồng bộ tiến độ học tập online.
          </p>
        </div>

        <div className="managerSummary">
          <div>
            <span>Kết nối</span>
            <strong>
              {isSupabaseConfigured ? "Đã cấu hình" : "Thiếu env"}
            </strong>
          </div>
          <div>
            <span>Bảng sẵn sàng</span>
            <strong>
              {readyCount}/{resources.length}
            </strong>
          </div>
          <div>
            <span>Admin</span>
            <strong>{managerUser}</strong>
          </div>
          <div>
            <span>Supabase user</span>
            <strong>{user?.email || "Chưa đăng nhập"}</strong>
          </div>
        </div>
      </section>

      <section className="managerToolbar">
        <button
          className="primaryButton"
          type="button"
          onClick={refreshResources}
        >
          Kiểm tra lại
        </button>
        <button className="secondaryButton" type="button" onClick={copySql}>
          Copy SQL tạo bảng
        </button>
        <Link className="secondaryButton" href="/login">
          Đăng nhập
        </Link>
        <button
          className="secondaryButton"
          type="button"
          onClick={logoutManager}
        >
          Thoát Manager
        </button>
      </section>

      {message ? <p className="managerMessage">{message}</p> : null}

      <section className="managerGrid">
        {resources.map((resource) => (
          <article
            className={`managerResourceCard ${resource.status}`}
            key={resource.name}
          >
            <div>
              <span>{getStatusLabel(resource.status)}</span>
              <h2>{resource.name}</h2>
            </div>
            <p>{resource.description}</p>
            <strong>{resource.rows ?? 0} dòng</strong>
            {resource.error ? <small>{resource.error}</small> : null}
          </article>
        ))}
      </section>

      <section className="managerSqlPanel">
        <div>
          <p className="homeEyebrow">SQL setup</p>
          <h2>Tạo bảng cơ bản trong Supabase</h2>
          <p>
            Vào Supabase Dashboard → SQL Editor → New query, dán đoạn này và
            chạy. Sau đó quay lại trang này bấm “Kiểm tra lại”.
          </p>
        </div>
        <pre>
          <code>{setupSql}</code>
        </pre>
      </section>
    </main>
  );
}
