import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type UserProfile = {
  avatar_url?: string | null;
  display_name?: string | null;
  email?: string | null;
  role?: string | null;
  username?: string | null;
};

export function getUserDisplayName(user: User | null | undefined, profile?: UserProfile | null) {
  const profileName = profile?.display_name?.trim();
  const metadataName = user?.user_metadata?.display_name;

  if (profileName) {
    return profileName;
  }

  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }

  return user?.email?.split("@")[0] || "Người học YENTH";
}

export async function getOwnProfile(user: User | null | undefined) {
  if (!supabase || !user) {
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select("display_name, username, email, role, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  return (data as UserProfile | null) || null;
}

export async function upsertOwnProfile(user: User, profile: UserProfile = {}) {
  if (!supabase) {
    return;
  }

  await supabase.from("profiles").upsert(
    {
      avatar_url: profile.avatar_url ?? user.user_metadata?.avatar_url ?? null,
      display_name: profile.display_name ?? user.user_metadata?.display_name ?? null,
      email: profile.email ?? user.email ?? null,
      id: user.id,
      username: profile.username ?? user.email?.split("@")[0] ?? null,
    },
    { onConflict: "id" },
  );
}

export async function resolveLoginEmail(identifier: string) {
  const normalized = identifier.trim();

  if (!supabase || normalized.includes("@")) {
    return normalized;
  }

  const { data, error } = await supabase.rpc("resolve_login_email", {
    search_username: normalized,
  });

  if (error || !data) {
    return normalized;
  }

  return String(data);
}
