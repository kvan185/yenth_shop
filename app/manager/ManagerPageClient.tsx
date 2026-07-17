"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ManagerTab = "overview" | "users" | "progress" | "events" | "setup";

type ResourceStatus = "ready" | "blocked" | "missing" | "checking";

type ManagerResource = {
  error?: string;
  name: string;
  rows: number;
  status: ResourceStatus;
};

type ManagerProfile = {
  created_at?: string;
  display_name?: string | null;
  email?: string | null;
  id: string;
  role?: string | null;
  username?: string | null;
};

type ManagerProgress = {
  id: number;
  level?: string | null;
  status?: string | null;
  updated_at?: string;
  user_id?: string;
  word_key?: string;
};

type ManagerAttempt = {
  created_at?: string;
  id: number;
  level?: string | null;
  score?: number | null;
  skill?: string | null;
  total?: number | null;
  user_id?: string;
};

type ManagerEvent = {
  created_at?: string;
  event_type?: string | null;
  id: number;
  payload?: Record<string, unknown> | null;
  user_id?: string;
};

type ManagerOverview = {
  adminConfigured?: boolean;
  error?: string;
  eventsByType?: Record<string, number>;
  managerUser?: string;
  profiles?: ManagerProfile[];
  progressByLevel?: Record<string, { correct: number; wrong: number }>;
  recentAttempts?: ManagerAttempt[];
  recentEvents?: ManagerEvent[];
  recentProgress?: ManagerProgress[];
  resources?: ManagerResource[];
};

type EventsLayer = "completed" | "studying" | "wrong" | "time";

type AdvancedSettings = {
  accentColor: string;
  answerSoundEnabled: boolean;
  answerSoundVolume: number;
};

const tabs: Array<{ id: ManagerTab; label: string }> = [
  { id: "overview", label: "Tổng quan" },
  { id: "users", label: "Người dùng" },
  { id: "progress", label: "Tiến độ" },
  { id: "events", label: "Sự kiện" },
  { id: "setup", label: "Setup" },
];
const vocabularyLevels = ["A1", "A2", "B1", "B2", "C1"];
const advancedSettingsStorageKey = "yenth:advanced-settings";
const defaultAdvancedSettings: AdvancedSettings = {
  accentColor: "#0c7466",
  answerSoundEnabled: true,
  answerSoundVolume: 70,
};
const colorPresets = [
  { label: "Xanh lá", value: "#0c7466" },
  { label: "Xanh dương", value: "#2563eb" },
  { label: "Tím", value: "#7c3aed" },
  { label: "Cam", value: "#c2410c" },
  { label: "Hồng", value: "#be185d" },
];

const setupSql = `# Manager cần service_role key ở env server, không phải anon key.
# Lấy key tại Supabase Dashboard > Project Settings > API > service_role.
# Sau đó thêm vào .env.local:

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Restart dev server sau khi đổi .env.local:
npm run dev

# Các bảng Manager đang đọc:
# public.profiles
# public.vocabulary_progress
# public.quiz_attempts
# public.learning_events`;

function formatDate(value: string | undefined) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatDuration(totalMs: number) {
  if (!totalMs || totalMs <= 0) {
    return "Chưa đủ dữ liệu";
  }

  const totalMinutes = Math.max(1, Math.round(totalMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} giờ ${minutes} phút`;
  }

  return `${minutes} phút`;
}

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

function getProgressStatusLabel(status: string | null | undefined) {
  if (status === "correct") {
    return "Đúng";
  }

  if (status === "wrong") {
    return "Sai cần ôn";
  }

  return status || "Chưa rõ";
}

function getWordFromProgressKey(wordKey: string | null | undefined) {
  if (!wordKey) {
    return "—";
  }

  return wordKey.split("::")[0] || wordKey;
}

function getEventLabel(eventType: string | null | undefined) {
  const labels: Record<string, string> = {
    daily_correct_word: "Từ đúng hôm nay",
    daily_goal_completed: "Hoàn thành mục tiêu ngày",
    daily_streak: "Cập nhật streak",
    level_completed: "Hoàn thành level",
    tip_requested: "Xin tip",
  };

  if (!eventType) {
    return "Sự kiện";
  }

  return labels[eventType] || eventType.replaceAll("_", " ");
}

function formatEventPayload(
  payload: Record<string, unknown> | null | undefined,
) {
  if (!payload || Object.keys(payload).length === 0) {
    return "Không có chi tiết";
  }

  const readable = Object.entries(payload)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" · ");

  return readable || "Không có chi tiết";
}

function getEventPayloadLevel(event: ManagerEvent) {
  const level = event.payload?.level;

  return typeof level === "string" ? level.toUpperCase() : "";
}

function getProfileLabel(profile: ManagerProfile | undefined) {
  return profile?.email || profile?.username || profile?.id || "Không rõ user";
}

type ManagerPageClientProps = {
  managerUser: string;
};

export default function ManagerPageClient({
  managerUser,
}: ManagerPageClientProps) {
  const [activeTab, setActiveTab] = useState<ManagerTab>("overview");
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettings>(
    defaultAdvancedSettings,
  );
  const [data, setData] = useState<ManagerOverview>({});
  const [editingProfileId, setEditingProfileId] = useState("");
  const [savingProfileId, setSavingProfileId] = useState("");
  const [selectedEventsLayer, setSelectedEventsLayer] =
    useState<EventsLayer>("completed");
  const [selectedEventsUserId, setSelectedEventsUserId] = useState("");
  const [selectedProgressUserId, setSelectedProgressUserId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const resources = data.resources || [];
  const profiles = data.profiles || [];
  const recentProgress = data.recentProgress || [];
  const recentAttempts = data.recentAttempts || [];
  const recentEvents = data.recentEvents || [];
  const progressByLevel = data.progressByLevel || {};
  const eventsByType = data.eventsByType || {};
  const profilesById = useMemo(
    () => new Map(profiles.map((profile) => [profile.id, profile])),
    [profiles],
  );
  const selectedProgressUser =
    profilesById.get(selectedProgressUserId) || profiles[0];
  const selectedEventsUser =
    profilesById.get(selectedEventsUserId) || profiles[0];
  const selectedProgressRows = selectedProgressUser
    ? recentProgress.filter((row) => row.user_id === selectedProgressUser.id)
    : [];
  const selectedEventRows = selectedEventsUser
    ? recentEvents.filter((event) => event.user_id === selectedEventsUser.id)
    : [];
  const selectedAttemptRows = selectedEventsUser
    ? recentAttempts.filter(
        (attempt) => attempt.user_id === selectedEventsUser.id,
      )
    : [];
  const progressUserRows = profiles.map((profile) => {
    const rows = recentProgress.filter((row) => row.user_id === profile.id);
    const completedEvents = recentEvents.filter(
      (event) =>
        event.user_id === profile.id && event.event_type === "level_completed",
    );
    const completedLevels = new Set(
      completedEvents.map(getEventPayloadLevel).filter(Boolean),
    );
    const startedLevels = new Set(
      rows.map((row) => String(row.level || "").toUpperCase()).filter(Boolean),
    );
    const inProgressLevels = Array.from(startedLevels).filter(
      (level) => !completedLevels.has(level),
    );
    const wrongByLevel = rows.reduce<Record<string, number>>((result, row) => {
      const level = String(row.level || "UNKNOWN").toUpperCase();
      if (row.status === "wrong") {
        result[level] = (result[level] || 0) + 1;
      }
      return result;
    }, {});
    const maxWrongCount = Math.max(0, ...Object.values(wrongByLevel));
    const lastUpdated = rows
      .map((row) => row.updated_at)
      .filter((value): value is string => Boolean(value))
      .sort(
        (first, second) =>
          new Date(second).getTime() - new Date(first).getTime(),
      )[0];
    const firstUpdated = rows
      .map((row) => row.updated_at)
      .filter((value): value is string => Boolean(value))
      .sort(
        (first, second) =>
          new Date(first).getTime() - new Date(second).getTime(),
      )[0];
    const studyMs =
      firstUpdated && lastUpdated
        ? new Date(lastUpdated).getTime() - new Date(firstUpdated).getTime()
        : 0;

    return {
      completedCount: completedLevels.size,
      firstUpdated,
      inProgressCount: inProgressLevels.length,
      lastUpdated,
      maxWrongCount,
      profile,
      rows,
      studyMs,
      wrongByLevel,
    };
  });
  const selectedProgressSummary = selectedProgressUser
    ? progressUserRows.find(
        (item) => item.profile.id === selectedProgressUser.id,
      )
    : undefined;
  const selectedCompletedLevels = new Map(
    recentEvents
      .filter(
        (event) =>
          event.user_id === selectedProgressUser?.id &&
          event.event_type === "level_completed",
      )
      .map((event) => [getEventPayloadLevel(event), event.created_at]),
  );
  const selectedProgressLevelSummaries = vocabularyLevels
    .map((level) => {
      const rows = selectedProgressRows.filter(
        (row) => String(row.level || "").toUpperCase() === level,
      );
      const correct = rows.filter((row) => row.status === "correct").length;
      const wrong = rows.filter((row) => row.status === "wrong").length;
      const timestamps = rows
        .map((row) => row.updated_at)
        .filter((value): value is string => Boolean(value))
        .sort(
          (first, second) =>
            new Date(first).getTime() - new Date(second).getTime(),
        );
      const completedAt = selectedCompletedLevels.get(level);
      const hasStarted = rows.length > 0 || Boolean(completedAt);
      const studyMs =
        timestamps[0] && timestamps[timestamps.length - 1]
          ? new Date(timestamps[timestamps.length - 1]).getTime() -
            new Date(timestamps[0]).getTime()
          : 0;

      return {
        completedAt,
        correct,
        hasStarted,
        lastUpdated: timestamps[timestamps.length - 1],
        level,
        status: completedAt
          ? "Đã học xong"
          : hasStarted
            ? "Chưa học xong"
            : "Chưa học",
        studyMs,
        wrong,
      };
    })
    .filter((item) => item.hasStarted);
  const eventUserRows = profiles.map((profile) => {
    const events = recentEvents.filter((event) => event.user_id === profile.id);
    const attempts = recentAttempts.filter(
      (attempt) => attempt.user_id === profile.id,
    );
    const lastUpdated = [...events, ...attempts]
      .map((item) => item.created_at)
      .filter((value): value is string => Boolean(value))
      .sort(
        (first, second) =>
          new Date(second).getTime() - new Date(first).getTime(),
      )[0];

    return { attempts, events, lastUpdated, profile };
  });
  const selectedEventsProgressRows = selectedEventsUser
    ? recentProgress.filter((row) => row.user_id === selectedEventsUser.id)
    : [];
  const selectedEventsCompletedLevels = new Map(
    selectedEventRows
      .filter((event) => event.event_type === "level_completed")
      .map((event) => [getEventPayloadLevel(event), event.created_at]),
  );
  const selectedEventsStartedLevels = new Set(
    selectedEventsProgressRows
      .map((row) => String(row.level || "").toUpperCase())
      .filter(Boolean),
  );
  const selectedEventsCompletedItems = Array.from(
    selectedEventsCompletedLevels.entries(),
  ).map(([level, completedAt]) => ({ completedAt, level }));
  const selectedEventsStudyingItems = Array.from(selectedEventsStartedLevels)
    .filter((level) => !selectedEventsCompletedLevels.has(level))
    .map((level) => {
      const rows = selectedEventsProgressRows.filter(
        (row) => String(row.level || "").toUpperCase() === level,
      );
      const correct = rows.filter((row) => row.status === "correct").length;
      const wrong = rows.filter((row) => row.status === "wrong").length;
      const lastUpdated = rows
        .map((row) => row.updated_at)
        .filter((value): value is string => Boolean(value))
        .sort(
          (first, second) =>
            new Date(second).getTime() - new Date(first).getTime(),
        )[0];

      return { correct, lastUpdated, level, wrong };
    });
  const selectedEventsWrongRows = selectedEventsProgressRows.filter(
    (row) => row.status === "wrong",
  );
  const selectedEventsTipRows = selectedEventRows.filter(
    (event) => event.event_type === "tip_requested",
  );
  const selectedEventsStudyTimestamps = selectedEventsProgressRows
    .map((row) => row.updated_at)
    .filter((value): value is string => Boolean(value))
    .sort(
      (first, second) => new Date(first).getTime() - new Date(second).getTime(),
    );
  const selectedEventsStudyMs =
    selectedEventsStudyTimestamps[0] &&
    selectedEventsStudyTimestamps[selectedEventsStudyTimestamps.length - 1]
      ? new Date(
          selectedEventsStudyTimestamps[
            selectedEventsStudyTimestamps.length - 1
          ],
        ).getTime() - new Date(selectedEventsStudyTimestamps[0]).getTime()
      : 0;
  const eventLayerItems: Array<{
    count: number;
    id: EventsLayer;
    label: string;
  }> = [
    {
      count: selectedEventsCompletedItems.length,
      id: "completed",
      label: "Bài đã hoàn thành",
    },
    {
      count: selectedEventsStudyingItems.length,
      id: "studying",
      label: "Đang học",
    },
    {
      count: selectedEventsWrongRows.length,
      id: "wrong",
      label: "Từ sai",
    },
    {
      count: selectedEventsProgressRows.length,
      id: "time",
      label: "Thời gian học",
    },
  ];

  const readyCount = resources.filter(
    (resource) => resource.status === "ready",
  ).length;
  const totalProgressRows = Object.values(progressByLevel).reduce(
    (total, item) => total + item.correct + item.wrong,
    0,
  );
  const managerStats = useMemo(
    () => [
      { label: "Users", value: profiles.length.toLocaleString("vi-VN") },
      { label: "Tables", value: `${readyCount}/${resources.length || 4}` },
      { label: "Progress", value: totalProgressRows.toLocaleString("vi-VN") },
      {
        label: "Events",
        value: Object.values(eventsByType)
          .reduce((total, count) => total + count, 0)
          .toLocaleString("vi-VN"),
      },
    ],
    [
      eventsByType,
      profiles.length,
      readyCount,
      resources.length,
      totalProgressRows,
    ],
  );
  const activeTabDescription =
    data.adminConfigured === false
      ? "Thiếu SUPABASE_SERVICE_ROLE_KEY nên chưa thể đọc toàn bộ dữ liệu."
      : activeTab === "users"
        ? "Xem tài khoản đã đăng ký. Bấm Chỉnh sửa trước khi đổi username hoặc role."
        : activeTab === "progress"
          ? "Chọn một học viên để xem bài đã học, bài còn dở, số từ sai nhiều nhất và thời gian học."
          : activeTab === "events"
            ? "Chọn một học viên để xem hoạt động học, streak và lịch sử quiz."
            : activeTab === "setup"
              ? "Cấu hình key server để Manager đọc được dữ liệu quản trị."
              : "Tóm tắt số người dùng, bảng dữ liệu, tiến độ học và sự kiện hệ thống.";

  async function loadOverview() {
    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/manager/overview", {
      cache: "no-store",
    });
    const payload = (await response
      .json()
      .catch(() => ({}))) as ManagerOverview;

    setData(payload);
    setIsLoading(false);

    if (!response.ok || payload.error) {
      setMessage(payload.error || "Không tải được dữ liệu Manager.");
    }
  }

  useEffect(() => {
    void loadOverview();
  }, []);

  useEffect(() => {
    try {
      const parsed = JSON.parse(
        window.localStorage.getItem(advancedSettingsStorageKey) || "{}",
      ) as Partial<AdvancedSettings>;

      setAdvancedSettings({
        accentColor:
          typeof parsed.accentColor === "string"
            ? parsed.accentColor
            : defaultAdvancedSettings.accentColor,
        answerSoundEnabled:
          typeof parsed.answerSoundEnabled === "boolean"
            ? parsed.answerSoundEnabled
            : defaultAdvancedSettings.answerSoundEnabled,
        answerSoundVolume:
          typeof parsed.answerSoundVolume === "number"
            ? Math.min(100, Math.max(0, parsed.answerSoundVolume))
            : defaultAdvancedSettings.answerSoundVolume,
      });
    } catch {
      setAdvancedSettings(defaultAdvancedSettings);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      advancedSettingsStorageKey,
      JSON.stringify(advancedSettings),
    );
    document.documentElement.style.setProperty(
      "--primary",
      advancedSettings.accentColor,
    );
    document.documentElement.style.setProperty(
      "--primary-dark",
      advancedSettings.accentColor,
    );
  }, [advancedSettings]);

  async function saveProfile(profile: ManagerProfile) {
    setSavingProfileId(profile.id);
    setMessage("");

    const response = await fetch("/api/manager/overview", {
      body: JSON.stringify(profile),
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
    });
    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };

    if (!response.ok) {
      setMessage(payload.error || "Không cập nhật được profile.");
      setSavingProfileId("");
      return;
    }

    setMessage("Đã cập nhật profile.");
    setEditingProfileId("");
    setSavingProfileId("");
    await loadOverview();
  }

  function updateProfileDraft(
    profileId: string,
    patch: Partial<ManagerProfile>,
  ) {
    setData((previous) => ({
      ...previous,
      profiles: (previous.profiles || []).map((profile) =>
        profile.id === profileId ? { ...profile, ...patch } : profile,
      ),
    }));
  }

  function updateAdvancedSettings(patch: Partial<AdvancedSettings>) {
    setAdvancedSettings((previous) => ({ ...previous, ...patch }));
  }

  function copySql() {
    navigator.clipboard
      .writeText(setupSql)
      .then(() => setMessage("Đã copy ghi chú setup."))
      .catch(() => setMessage("Không copy được tự động."));
  }

  async function logoutManager() {
    await fetch("/api/manager/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <main className="managerPage">
      <section className="managerShell">
        <aside className="managerSidebar">
          <div>
            <p className="homeEyebrow">Manager</p>
            <h1>YENTH Admin</h1>
            <span>{managerUser}</span>
          </div>

          <nav className="managerNav" aria-label="Manager sections">
            {tabs.map((tab) => (
              <button
                className={activeTab === tab.id ? "active" : ""}
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="managerSidebarActions">
            <button
              className="primaryButton"
              type="button"
              onClick={loadOverview}
            >
              Làm mới
            </button>
            <Link className="secondaryButton" href="/login">
              Đăng nhập user
            </Link>
            <button
              className="secondaryButton"
              type="button"
              onClick={logoutManager}
            >
              Thoát
            </button>
          </div>
        </aside>

        <section className="managerMain">
          <section className="managerTopbar">
            <div>
              <p className="homeEyebrow">Quản lý toàn bộ</p>
              <h2>
                {activeTab === "overview"
                  ? "Tổng quan hệ thống"
                  : tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <p>{activeTabDescription}</p>
            </div>
            <div className="managerStatePill">
              {isLoading ? "Đang tải" : "Sẵn sàng"}
            </div>
          </section>

          {message ? <p className="managerMessage">{message}</p> : null}

          {activeTab === "overview" ? (
            <>
              <section className="managerStatsGrid">
                {managerStats.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </section>

              <section className="managerResourceGrid">
                {resources.map((resource) => (
                  <article
                    className={`managerResourceCard ${resource.status}`}
                    key={resource.name}
                  >
                    <span>{getStatusLabel(resource.status)}</span>
                    <h3>{resource.name}</h3>
                    <strong>
                      {resource.rows.toLocaleString("vi-VN")} dòng
                    </strong>
                    {resource.error ? <small>{resource.error}</small> : null}
                  </article>
                ))}
              </section>

              <section className="managerTwoColumn">
                <article className="managerPanel">
                  <h3>Progress theo level</h3>
                  <div className="managerLevelList">
                    {Object.entries(progressByLevel).map(([level, row]) => (
                      <div key={level}>
                        <strong>{level}</strong>
                        <span>Đúng {row.correct.toLocaleString("vi-VN")}</span>
                        <span>Sai {row.wrong.toLocaleString("vi-VN")}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="managerPanel">
                  <h3>Learning events</h3>
                  <div className="managerLevelList">
                    {Object.entries(eventsByType).map(([eventType, count]) => (
                      <div key={eventType}>
                        <strong>{eventType}</strong>
                        <span>{count.toLocaleString("vi-VN")} events</span>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
            </>
          ) : null}

          {activeTab === "users" ? (
            <section className="managerPanel">
              <h3>Người dùng</h3>
              <div className="managerTable">
                <div className="managerTableHead users">
                  <span>Email</span>
                  <span>Username</span>
                  <span>Role</span>
                  <span>Ngày tạo</span>
                  <span></span>
                </div>
                {profiles.map((profile) => {
                  const isEditing = editingProfileId === profile.id;
                  const isSaving = savingProfileId === profile.id;

                  return (
                    <div className="managerTableRow users" key={profile.id}>
                      <input
                        value={profile.email || ""}
                        disabled
                        aria-label="Email"
                      />
                      <input
                        value={profile.username || ""}
                        disabled={!isEditing || isSaving}
                        aria-label="Username"
                        onChange={(event) =>
                          updateProfileDraft(profile.id, {
                            username: event.target.value,
                          })
                        }
                      />
                      <select
                        value={profile.role || "student"}
                        disabled={!isEditing || isSaving}
                        aria-label="Role"
                        onChange={(event) =>
                          updateProfileDraft(profile.id, {
                            role: event.target.value,
                          })
                        }
                      >
                        <option value="student">student</option>
                        <option value="manager">manager</option>
                      </select>
                      <span>{formatDate(profile.created_at)}</span>
                      <button
                        className="secondaryButton"
                        disabled={isSaving}
                        type="button"
                        onClick={() =>
                          isEditing
                            ? saveProfile(profile)
                            : setEditingProfileId(profile.id)
                        }
                      >
                        {isSaving
                          ? "Đang lưu"
                          : isEditing
                            ? "Lưu"
                            : "Chỉnh sửa"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {activeTab === "progress" ? (
            <>
              <section className="managerStatsGrid">
                <div>
                  <span>Học viên</span>
                  <strong>{profiles.length.toLocaleString("vi-VN")}</strong>
                </div>
                <div>
                  <span>Tổng dòng tiến độ</span>
                  <strong>
                    {recentProgress.length.toLocaleString("vi-VN")}
                  </strong>
                </div>
                <div>
                  <span>Đã đúng</span>
                  <strong>
                    {recentProgress
                      .filter((row) => row.status === "correct")
                      .length.toLocaleString("vi-VN")}
                  </strong>
                </div>
                <div>
                  <span>Cần ôn</span>
                  <strong>
                    {recentProgress
                      .filter((row) => row.status === "wrong")
                      .length.toLocaleString("vi-VN")}
                  </strong>
                </div>
              </section>

              <section className="managerProgressLayout">
                <article className="managerPanel managerProgressUsers">
                  <h3>Học viên</h3>
                  <div className="managerProgressUserList">
                    {progressUserRows.map(
                      ({
                        completedCount,
                        inProgressCount,
                        lastUpdated,
                        maxWrongCount,
                        profile,
                        rows,
                        studyMs,
                      }) => (
                        <button
                          className={
                            selectedProgressUser?.id === profile.id
                              ? "active"
                              : ""
                          }
                          key={profile.id}
                          type="button"
                          onClick={() => setSelectedProgressUserId(profile.id)}
                        >
                          <span className="managerProgressAvatar">
                            {(profile.email || profile.username || "?")
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                          <span>
                            <strong>{getProfileLabel(profile)}</strong>
                            <small>
                              {rows.length.toLocaleString("vi-VN")} dòng · cập
                              nhật {formatDate(lastUpdated)}
                            </small>
                          </span>
                          <span className="managerProgressMiniStats">
                            <b>{completedCount.toLocaleString("vi-VN")}</b>xong
                            <b>{inProgressCount.toLocaleString("vi-VN")}</b>dở
                            <b>{maxWrongCount.toLocaleString("vi-VN")}</b>sai
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                </article>

                <article className="managerPanel managerProgressDetail">
                  <div className="managerProgressHeader">
                    <div>
                      <h3>{getProfileLabel(selectedProgressUser)}</h3>
                      <span>
                        Thời gian học ước tính{" "}
                        {formatDuration(selectedProgressSummary?.studyMs || 0)}
                      </span>
                    </div>
                  </div>
                  {selectedProgressSummary ? (
                    <section className="managerProgressSummary">
                      <div>
                        <span>Bài đã học xong</span>
                        <strong>
                          {selectedProgressSummary.completedCount.toLocaleString(
                            "vi-VN",
                          )}
                        </strong>
                      </div>
                      <div>
                        <span>Bài chưa học xong</span>
                        <strong>
                          {selectedProgressSummary.inProgressCount.toLocaleString(
                            "vi-VN",
                          )}
                        </strong>
                      </div>
                      <div>
                        <span>Sai nhiều nhất</span>
                        <strong>
                          {selectedProgressSummary.maxWrongCount.toLocaleString(
                            "vi-VN",
                          )}
                        </strong>
                      </div>
                      <div>
                        <span>Dòng tiến độ</span>
                        <strong>
                          {selectedProgressSummary.rows.length.toLocaleString(
                            "vi-VN",
                          )}
                        </strong>
                      </div>
                    </section>
                  ) : null}
                  <div className="managerProgressLevelList">
                    {selectedProgressLevelSummaries.map((item) => (
                      <div key={item.level}>
                        <span className="managerProgressLevelBadge">
                          {item.level}
                        </span>
                        <span>
                          <strong>{item.status}</strong>
                          <small>
                            Đúng {item.correct.toLocaleString("vi-VN")} · Sai{" "}
                            {item.wrong.toLocaleString("vi-VN")}
                          </small>
                        </span>
                        <span>
                          <strong>{formatDuration(item.studyMs)}</strong>
                          <small>
                            {item.completedAt
                              ? `Xong ${formatDate(item.completedAt)}`
                              : `Cập nhật ${formatDate(item.lastUpdated)}`}
                          </small>
                        </span>
                      </div>
                    ))}
                    {selectedProgressLevelSummaries.length === 0 ? (
                      <p className="managerEmptyText">
                        Học viên này chưa có tiến độ từ vựng.
                      </p>
                    ) : null}
                  </div>
                </article>
              </section>
            </>
          ) : null}

          {activeTab === "events" ? (
            <>
              <section className="managerStatsGrid">
                <div>
                  <span>Học viên</span>
                  <strong>{profiles.length.toLocaleString("vi-VN")}</strong>
                </div>
                <div>
                  <span>Sự kiện</span>
                  <strong>{recentEvents.length.toLocaleString("vi-VN")}</strong>
                </div>
                <div>
                  <span>Lượt quiz</span>
                  <strong>
                    {recentAttempts.length.toLocaleString("vi-VN")}
                  </strong>
                </div>
                <div>
                  <span>Tổng hoạt động</span>
                  <strong>
                    {(
                      recentEvents.length + recentAttempts.length
                    ).toLocaleString("vi-VN")}
                  </strong>
                </div>
              </section>

              <section className="managerSplitPanel">
                <article className="managerPanel">
                  <h3>Danh sách học viên</h3>
                  <div className="managerUserList">
                    {eventUserRows.map(
                      ({ attempts, events, lastUpdated, profile }) => (
                        <button
                          className={
                            selectedEventsUser?.id === profile.id
                              ? "active"
                              : ""
                          }
                          key={profile.id}
                          type="button"
                          onClick={() => {
                            setSelectedEventsUserId(profile.id);
                            setSelectedEventsLayer("completed");
                          }}
                        >
                          <strong>{getProfileLabel(profile)}</strong>
                          <span>
                            {events.length.toLocaleString("vi-VN")} sự kiện ·{" "}
                            {attempts.length.toLocaleString("vi-VN")} quiz
                          </span>
                          <small>{formatDate(lastUpdated)}</small>
                        </button>
                      ),
                    )}
                  </div>
                </article>

                <article className="managerPanel">
                  <h3>Thông tin</h3>
                  <div className="managerUserList">
                    {eventLayerItems.map((item) => (
                      <button
                        className={
                          selectedEventsLayer === item.id ? "active" : ""
                        }
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedEventsLayer(item.id)}
                      >
                        <strong>{item.label}</strong>
                        <span>{item.count.toLocaleString("vi-VN")} mục</span>
                      </button>
                    ))}
                    <div className="managerInfoCard">
                      <strong>Số lần xin tip</strong>
                      <span>
                        {selectedEventsTipRows.length.toLocaleString("vi-VN")}{" "}
                        lần
                      </span>
                    </div>
                  </div>
                </article>

                <article className="managerPanel">
                  <h3>Chi tiết của {getProfileLabel(selectedEventsUser)}</h3>
                  {selectedEventsLayer === "completed" ? (
                    <div className="managerEventList">
                      {selectedEventsCompletedItems.map((item) => (
                        <div key={item.level}>
                          <strong>{item.level}</strong>
                          <span>Đã hoàn thành</span>
                          <small>{formatDate(item.completedAt)}</small>
                        </div>
                      ))}
                      {selectedEventsCompletedItems.length === 0 ? (
                        <p className="managerEmptyText">
                          Học viên này chưa hoàn thành bài học nào.
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {selectedEventsLayer === "studying" ? (
                    <div className="managerEventList">
                      {selectedEventsStudyingItems.map((item) => (
                        <div key={item.level}>
                          <strong>{item.level}</strong>
                          <span>
                            Đúng {item.correct.toLocaleString("vi-VN")} · Sai{" "}
                            {item.wrong.toLocaleString("vi-VN")}
                          </span>
                          <small>Cập nhật {formatDate(item.lastUpdated)}</small>
                        </div>
                      ))}
                      {selectedEventsStudyingItems.length === 0 ? (
                        <p className="managerEmptyText">
                          Học viên này không có bài đang học dở.
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {selectedEventsLayer === "wrong" ? (
                    <div className="managerEventList">
                      {selectedEventsWrongRows.map((row) => (
                        <div key={row.id}>
                          <strong>
                            {getWordFromProgressKey(row.word_key)}
                          </strong>
                          <span>{row.level || "—"}</span>
                          <small>{formatDate(row.updated_at)}</small>
                        </div>
                      ))}
                      {selectedEventsWrongRows.length === 0 ? (
                        <p className="managerEmptyText">
                          Học viên này chưa có từ sai.
                        </p>
                      ) : null}
                    </div>
                  ) : null}

                  {selectedEventsLayer === "time" ? (
                    <div className="managerEventList">
                      <div>
                        <strong>Thời gian học ước tính</strong>
                        <span>{formatDuration(selectedEventsStudyMs)}</span>
                        <small>
                          Dựa trên lần cập nhật tiến độ đầu tiên và cuối cùng.
                        </small>
                      </div>
                      <div>
                        <strong>Số lần xin tip</strong>
                        <span>
                          {selectedEventsTipRows.length.toLocaleString("vi-VN")}{" "}
                          lần
                        </span>
                      </div>
                      <div>
                        <strong>Lượt quiz</strong>
                        <span>
                          {selectedAttemptRows.length.toLocaleString("vi-VN")}{" "}
                          lượt
                        </span>
                      </div>
                    </div>
                  ) : null}
                </article>
              </section>
            </>
          ) : null}

          {activeTab === "setup" ? (
            <section className="managerPanel managerSqlPanel">
              <div>
                <h3>Cấu hình Manager</h3>
                <p>
                  Manager cần key server để đọc Auth users, profiles, tiến độ và
                  sự kiện. Key này chỉ đặt trong Vercel/server.
                </p>
              </div>
              <div className="managerSetupSteps">
                <div>
                  <strong>1. Lấy key trong Supabase</strong>
                  <span>
                    Project Settings → API Keys → copy <code>Secret key</code>{" "}
                    hoặc legacy <code>service_role</code>.
                  </span>
                </div>
                <div>
                  <strong>2. Thêm vào Vercel</strong>
                  <span>
                    Project → Settings → Environment Variables → tạo{" "}
                    <code>SUPABASE_SERVICE_ROLE_KEY</code> cho Production.
                  </span>
                </div>
                <div>
                  <strong>3. Redeploy</strong>
                  <span>
                    Vào Deployments → Redeploy để deployment mới nhận env vừa
                    thêm.
                  </span>
                </div>
                <div>
                  <strong>4. Chạy local nếu cần</strong>
                  <span>
                    Thêm cùng biến vào <code>.env.local</code>, rồi restart{" "}
                    <code>npm run dev</code>.
                  </span>
                </div>
              </div>
              <section className="managerAdvancedSettings">
                <div>
                  <h3>Cài đặt nâng cao</h3>
                  <p>
                    Các lựa chọn này lưu trên trình duyệt hiện tại và áp dụng
                    ngay cho giao diện quản trị, âm thanh đúng/sai.
                  </p>
                </div>
                <label className="managerToggleRow">
                  <span>Âm thanh đúng/sai</span>
                  <input
                    checked={advancedSettings.answerSoundEnabled}
                    type="checkbox"
                    onChange={(event) =>
                      updateAdvancedSettings({
                        answerSoundEnabled: event.target.checked,
                      })
                    }
                  />
                </label>
                <label className="managerRangeRow">
                  <span>Âm lượng {advancedSettings.answerSoundVolume}%</span>
                  <input
                    max="100"
                    min="0"
                    step="5"
                    type="range"
                    value={advancedSettings.answerSoundVolume}
                    onChange={(event) =>
                      updateAdvancedSettings({
                        answerSoundVolume: Number(event.target.value),
                      })
                    }
                  />
                </label>
                <div className="managerColorGrid">
                  <span>Màu chủ đạo</span>
                  <div>
                    {colorPresets.map((preset) => (
                      <button
                        aria-label={`Chọn màu ${preset.label}`}
                        className={
                          advancedSettings.accentColor === preset.value
                            ? "active"
                            : ""
                        }
                        key={preset.value}
                        style={{ background: preset.value }}
                        title={preset.label}
                        type="button"
                        onClick={() =>
                          updateAdvancedSettings({
                            accentColor: preset.value,
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
                <button
                  className="secondaryButton"
                  type="button"
                  onClick={() => setAdvancedSettings(defaultAdvancedSettings)}
                >
                  Khôi phục mặc định
                </button>
              </section>
              <button
                className="secondaryButton"
                type="button"
                onClick={copySql}
              >
                Copy mẫu env
              </button>
              <pre>
                <code>{setupSql}</code>
              </pre>
            </section>
          ) : null}
        </section>
      </section>
    </main>
  );
}
