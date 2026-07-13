import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type LearningEventRow = {
  created_at?: string;
  payload?: {
    date?: string;
    level?: string;
    word_key?: string;
  } | null;
};

export const streakMilestones = [
  {
    className: "streak10",
    days: 10,
    icon: "🔥",
    label: "10 ngày",
    title: "Bắt lửa",
  },
  {
    className: "streak100",
    days: 100,
    icon: "🏆",
    label: "100 ngày",
    title: "Bền bỉ",
  },
  {
    className: "streak500",
    days: 500,
    icon: "👑",
    label: "500 ngày",
    title: "Huyền thoại",
  },
];

export function getCurrentStreakMilestone(days: number) {
  return (
    [...streakMilestones]
      .reverse()
      .find((milestone) => days >= milestone.days) || null
  );
}

export function getLocalDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(date);
}

function addDays(dateKey: string, days: number) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function calculateStreakDays(
  dateKeys: string[],
  today = getLocalDateKey(),
) {
  const uniqueDates = new Set(dateKeys.filter(Boolean));
  const yesterday = addDays(today, -1);

  if (!uniqueDates.has(today) && !uniqueDates.has(yesterday)) {
    return 0;
  }

  let cursor = uniqueDates.has(today) ? today : addDays(today, -1);
  let streak = 0;

  while (uniqueDates.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

function getEventDateKey(event: LearningEventRow) {
  if (event.payload?.date) {
    return event.payload.date;
  }

  return event.created_at ? getLocalDateKey(new Date(event.created_at)) : "";
}

export async function getDailyStreak(
  user: User | null | undefined,
  level?: string,
) {
  if (!supabase || !user) {
    return 0;
  }

  const today = getLocalDateKey();

  let query = supabase
    .from("learning_events")
    .select("created_at, payload")
    .eq("user_id", user.id)
    .eq("event_type", "daily_streak")
    .order("created_at", { ascending: false });

  if (level) {
    query = query.eq("payload->>level", level.toUpperCase());
  }

  const { data } = await query;
  const dateKeys = ((data || []) as LearningEventRow[]).map(getEventDateKey);

  return calculateStreakDays(dateKeys, today);
}

export async function getLevelStreaks(
  user: User | null | undefined,
  levels: string[],
) {
  const emptyStreaks = Object.fromEntries(levels.map((level) => [level, 0]));

  if (!supabase || !user) {
    return emptyStreaks;
  }

  const today = getLocalDateKey();
  const { data } = await supabase
    .from("learning_events")
    .select("created_at, payload")
    .eq("user_id", user.id)
    .eq("event_type", "daily_streak")
    .order("created_at", { ascending: false });

  const dateKeysByLevel = levels.reduce<Record<string, string[]>>(
    (result, level) => {
      result[level] = [];
      return result;
    },
    {},
  );

  ((data || []) as LearningEventRow[]).forEach((event) => {
    const eventLevel = event.payload?.level?.toUpperCase();

    if (!eventLevel || !dateKeysByLevel[eventLevel]) {
      return;
    }

    dateKeysByLevel[eventLevel].push(getEventDateKey(event));
  });

  return levels.reduce<Record<string, number>>((result, level) => {
    result[level] = calculateStreakDays(dateKeysByLevel[level] || [], today);
    return result;
  }, {});
}

export async function recordDailyStreak(
  user: User | null | undefined,
  level?: string,
) {
  if (!supabase || !user) {
    return 0;
  }

  const today = getLocalDateKey();
  const normalizedLevel = level?.toUpperCase();

  let query = supabase
    .from("learning_events")
    .select("id")
    .eq("user_id", user.id)
    .eq("event_type", "daily_streak")
    .eq("payload->>date", today);

  if (normalizedLevel) {
    query = query.eq("payload->>level", normalizedLevel);
  }

  const { data: existingEvent } = await query.maybeSingle();

  if (!existingEvent) {
    await supabase.from("learning_events").insert({
      event_type: "daily_streak",
      payload: normalizedLevel
        ? { date: today, level: normalizedLevel }
        : { date: today },
      user_id: user.id,
    });
  }

  return getDailyStreak(user, normalizedLevel);
}

export async function recordDailyCorrectWord(
  user: User | null | undefined,
  level: string,
  wordKey: string,
) {
  if (!supabase || !user || !wordKey) {
    return 0;
  }

  const today = getLocalDateKey();
  const normalizedLevel = level.toUpperCase();

  const { data: existingEvent } = await supabase
    .from("learning_events")
    .select("id")
    .eq("user_id", user.id)
    .eq("event_type", "daily_correct_word")
    .eq("payload->>date", today)
    .eq("payload->>level", normalizedLevel)
    .eq("payload->>word_key", wordKey)
    .maybeSingle();

  if (!existingEvent) {
    await supabase.from("learning_events").insert({
      event_type: "daily_correct_word",
      payload: {
        date: today,
        level: normalizedLevel,
        word_key: wordKey,
      },
      user_id: user.id,
    });
  }

  return getDailyCorrectWordCount(user, normalizedLevel);
}

export async function getDailyCorrectWordCount(
  user: User | null | undefined,
  level: string,
) {
  if (!supabase || !user) {
    return 0;
  }

  const today = getLocalDateKey();
  const { data } = await supabase
    .from("learning_events")
    .select("payload")
    .eq("user_id", user.id)
    .eq("event_type", "daily_correct_word")
    .eq("payload->>date", today)
    .eq("payload->>level", level.toUpperCase());

  const uniqueWordKeys = new Set(
    ((data || []) as LearningEventRow[])
      .map((event) => event.payload?.word_key)
      .filter(Boolean),
  );

  return uniqueWordKeys.size;
}
