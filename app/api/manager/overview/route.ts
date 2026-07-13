import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  managerSessionCookieName,
  verifyManagerSessionToken,
} from "../../../../lib/managerAuth";
import {
  isSupabaseAdminConfigured,
  supabaseAdmin,
} from "../../../../lib/supabaseAdmin";

const managedTables = [
  "profiles",
  "vocabulary_progress",
  "quiz_attempts",
  "learning_events",
] as const;

async function requireManagerSession() {
  const cookieStore = await cookies();
  return verifyManagerSessionToken(
    cookieStore.get(managerSessionCookieName)?.value,
  );
}

export async function GET() {
  const session = await requireManagerSession();

  if (!session) {
    return NextResponse.json(
      { error: "Chưa đăng nhập Manager." },
      { status: 401 },
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json({
      adminConfigured: isSupabaseAdminConfigured,
      error:
        "Thiếu SUPABASE_SERVICE_ROLE_KEY nên Manager chưa thể quản lý toàn bộ dữ liệu.",
      resources: managedTables.map((name) => ({
        name,
        rows: 0,
        status: "blocked",
      })),
    });
  }

  const resources = await Promise.all(
    managedTables.map(async (name) => {
      const { count, error } = await supabaseAdmin.from(name).select("*", {
        count: "exact",
        head: true,
      });

      return {
        error: error?.message,
        name,
        rows: count || 0,
        status: error ? "blocked" : "ready",
      };
    }),
  );

  const [
    { data: profiles },
    { data: recentProgress },
    { data: recentAttempts },
    { data: recentEvents },
    { data: progressRows },
    { data: eventRows },
  ] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select("id, email, username, display_name, avatar_url, role, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("vocabulary_progress")
      .select("id, user_id, level, word_key, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(80),
    supabaseAdmin
      .from("quiz_attempts")
      .select("id, user_id, skill, level, score, total, created_at")
      .order("created_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("learning_events")
      .select("id, user_id, event_type, payload, created_at")
      .order("created_at", { ascending: false })
      .limit(80),
    supabaseAdmin.from("vocabulary_progress").select("level, status"),
    supabaseAdmin.from("learning_events").select("event_type"),
  ]);

  const progressByLevel = (progressRows || []).reduce<
    Record<string, { correct: number; wrong: number }>
  >((result, row) => {
    const level = String(row.level || "UNKNOWN").toUpperCase();
    result[level] ||= { correct: 0, wrong: 0 };
    if (row.status === "correct") {
      result[level].correct += 1;
    } else if (row.status === "wrong") {
      result[level].wrong += 1;
    }
    return result;
  }, {});

  const eventsByType = (eventRows || []).reduce<Record<string, number>>(
    (result, row) => {
      const eventType = String(row.event_type || "unknown");
      result[eventType] = (result[eventType] || 0) + 1;
      return result;
    },
    {},
  );

  return NextResponse.json({
    adminConfigured: true,
    eventsByType,
    managerUser: session.username,
    profiles: profiles || [],
    progressByLevel,
    recentAttempts: recentAttempts || [],
    recentEvents: recentEvents || [],
    recentProgress: recentProgress || [],
    resources,
  });
}

export async function PATCH(request: Request) {
  const session = await requireManagerSession();

  if (!session) {
    return NextResponse.json(
      { error: "Chưa đăng nhập Manager." },
      { status: 401 },
    );
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error: "Thiếu SUPABASE_SERVICE_ROLE_KEY nên chưa thể cập nhật dữ liệu.",
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    avatar_url?: string | null;
    display_name?: string | null;
    id?: string;
    role?: string;
    username?: string | null;
  } | null;

  if (!body?.id) {
    return NextResponse.json({ error: "Thiếu profile id." }, { status: 400 });
  }

  const nextRole = String(body.role || "student").trim();
  if (!["student", "manager"].includes(nextRole)) {
    return NextResponse.json({ error: "Role không hợp lệ." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("profiles")
    .update({
      avatar_url: body.avatar_url || null,
      display_name: body.display_name || null,
      role: nextRole,
      username: body.username || null,
    })
    .eq("id", body.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
