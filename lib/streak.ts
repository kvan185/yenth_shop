import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type LearningEventRow = {
  created_at?: string;
  payload?: {
    date?: string;
  } | null;
};

function getLocalDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(date);
}

function addDays(dateKey: string, days: number) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function calculateStreakDays(dateKeys: string[], today = getLocalDateKey()) {
  const uniqueDates = new Set(dateKeys.filter(Boolean));
  let cursor = uniqueDates.has(today) ? today : addDays(today, -1);
  let streak = 0;

  while (uniqueDates.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

export async function getDailyStreak(user: User | null | undefined) {
  if (!supabase || !user) {
    return 0;
  }

  const today = getLocalDateKey();

  const { data } = await supabase
    .from("learning_events")
    .select("created_at, payload")
    .eq("user_id", user.id)
    .eq("event_type", "daily_streak")
    .order("created_at", { ascending: false });

  const dateKeys = ((data || []) as LearningEventRow[]).map((event) => {
    if (event.payload?.date) {
      return event.payload.date;
    }

    return event.created_at ? getLocalDateKey(new Date(event.created_at)) : "";
  });

  return calculateStreakDays(dateKeys, today);
}

export async function recordDailyStreak(user: User | null | undefined) {
  if (!supabase || !user) {
    return 0;
  }

  const today = getLocalDateKey();

  const { data: existingEvent } = await supabase
    .from("learning_events")
    .select("id")
    .eq("user_id", user.id)
    .eq("event_type", "daily_streak")
    .eq("payload->>date", today)
    .maybeSingle();

  if (!existingEvent) {
    await supabase.from("learning_events").insert({
      event_type: "daily_streak",
      payload: { date: today },
      user_id: user.id,
    });
  }

  return getDailyStreak(user);
}
