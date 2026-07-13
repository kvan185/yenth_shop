import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { levelConfig, type LevelId } from "./vocabulary";

export type CompletedLevel = {
  completedAt: string;
  level: LevelId;
  totalWords?: number;
};

type CompletionEventRow = {
  created_at: string;
  payload?: {
    level?: string;
    total_words?: number;
  } | null;
};

type StoredVocabularyProgress = {
  completedAt?: string;
  correctKeys?: string[];
  totalWords?: number;
};

const vocabularyProgressKeyPattern =
  /^yenth:vocabulary:.+:(a1|a2|b1|b2|c1):progress$/;

function mergeCompletedLevels(levels: CompletedLevel[]) {
  const result = new Map<LevelId, CompletedLevel>();

  levels.forEach((item) => {
    const existing = result.get(item.level);

    if (
      !existing ||
      new Date(item.completedAt).getTime() >
        new Date(existing.completedAt).getTime()
    ) {
      result.set(item.level, item);
    }
  });

  return Array.from(result.values()).sort(
    (first, second) =>
      new Date(second.completedAt).getTime() -
      new Date(first.completedAt).getTime(),
  );
}

export function getLocalCompletedLevels() {
  if (typeof window === "undefined") {
    return [] as CompletedLevel[];
  }

  const levels: CompletedLevel[] = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    const match = key?.match(vocabularyProgressKeyPattern);

    if (!key || !match) {
      continue;
    }

    const level = match[1].toUpperCase() as LevelId;
    const config = levelConfig.find((item) => item.id === level);

    if (!config) {
      continue;
    }

    try {
      const parsed = JSON.parse(
        window.localStorage.getItem(key) || "{}",
      ) as StoredVocabularyProgress;
      const correctCount = parsed.correctKeys?.length || 0;
      const totalWords = parsed.totalWords || config.words;
      const isCompleted =
        Boolean(parsed.completedAt) || correctCount >= config.words;

      if (!isCompleted) {
        continue;
      }

      const completedAt = parsed.completedAt || new Date().toISOString();

      if (!parsed.completedAt) {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            ...parsed,
            completedAt,
            totalWords,
          }),
        );
      }

      levels.push({
        completedAt,
        level,
        totalWords,
      });
    } catch {
      // Ignore invalid local progress entries.
    }
  }

  return mergeCompletedLevels(levels);
}

export async function recordLevelCompletion(
  user: User | null | undefined,
  level: LevelId,
  totalWords: number,
) {
  if (!supabase || !user) {
    return;
  }

  const { data: existingEvent } = await supabase
    .from("learning_events")
    .select("id")
    .eq("user_id", user.id)
    .eq("event_type", "level_completed")
    .eq("payload->>level", level)
    .maybeSingle();

  if (existingEvent) {
    return;
  }

  await supabase.from("learning_events").insert({
    event_type: "level_completed",
    payload: {
      level,
      total_words: totalWords,
    },
    user_id: user.id,
  });
}

export async function getCompletedLevels(user: User | null | undefined) {
  const localCompletedLevels = getLocalCompletedLevels();

  if (!supabase || !user) {
    return localCompletedLevels;
  }

  const { data } = await supabase
    .from("learning_events")
    .select("created_at, payload")
    .eq("user_id", user.id)
    .eq("event_type", "level_completed")
    .order("created_at", { ascending: false });

  const remoteCompletedLevels = ((data || []) as CompletionEventRow[])
    .map((event): CompletedLevel | null => {
      const level = event.payload?.level?.toUpperCase() as LevelId | undefined;

      if (!level) {
        return null;
      }

      return {
        completedAt: event.created_at,
        level,
        totalWords: event.payload?.total_words,
      };
    })
    .filter((event): event is CompletedLevel => Boolean(event));

  return mergeCompletedLevels([
    ...remoteCompletedLevels,
    ...localCompletedLevels,
  ]);
}
