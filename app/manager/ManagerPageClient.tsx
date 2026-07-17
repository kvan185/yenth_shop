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
  avatar_url?: string | null;
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

const tabs: Array<{ id: ManagerTab; label: string }> = [
  { id: "overview", label: "Tổng quan" },
  { id: "users", label: "Người dùng" },
  { id: "progress", label: "Tiến độ" },
  { id: "events", label: "Sự kiện" },
  { id: "setup", label: "Setup" },
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
  };

  if (!eventType) {
    return "Sự kiện";
  }

  return labels[eventType] || eventType.replaceAll("_", " ");
}

function formatEventPayload(payload: Record<string, unknown> | null | undefined) {
  if (!payload || Object.keys(payload).length === 0) {
    return "Không có chi tiết";
  }

  const readable = Object.entries(payload)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" · ");

  return readable || "Không có chi tiết";
}

type ManagerPageClientProps = {
  managerUser: string;
};

export default function ManagerPageClient({
  managerUser,
}: ManagerPageClientProps) {
  const [activeTab, setActiveTab] = useState<ManagerTab>("overview");
  const [data, setData] = useState<ManagerOverview>({});
  const [editingProfileId, setEditingProfileId] = useState("");
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
        ? "Xem tài khoản đã đăng ký, đặt username và phân quyền student/manager."
        : activeTab === "progress"
          ? "Theo dõi từ nào học viên đã trả lời đúng hoặc sai để biết ai cần ôn thêm."
          : activeTab === "events"
            ? "Xem hoạt động gần đây như streak, hoàn thành bài và lịch sử quiz."
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

  async function saveProfile(profile: ManagerProfile) {
    setEditingProfileId(profile.id);
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
      setEditingProfileId("");
      return;
    }

    setMessage("Đã cập nhật profile.");
    setEditingProfileId("");
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
              <p>
                {activeTabDescription}
              </p>
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
                {profiles.map((profile) => (
                  <div className="managerTableRow users" key={profile.id}>
                    <input
                      value={profile.email || ""}
                      disabled
                      aria-label="Email"
                    />
                    <input
                      value={profile.username || ""}
                      aria-label="Username"
                      onChange={(event) =>
                        updateProfileDraft(profile.id, {
                          username: event.target.value,
                        })
                      }
                    />
                    <select
                      value={profile.role || "student"}
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
                      disabled={editingProfileId === profile.id}
                      type="button"
                      onClick={() => saveProfile(profile)}
                    >
                      {editingProfileId === profile.id ? "Đang lưu" : "Lưu"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeTab === "progress" ? (
            <>
              <section className="managerStatsGrid">
                <div>
                  <span>Dòng tiến độ</span>
                  <strong>{recentProgress.length.toLocaleString("vi-VN")}</strong>
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
                <div>
                  <span>Level có dữ liệu</span>
                  <strong>
                    {Object.keys(progressByLevel).length.toLocaleString(
                      "vi-VN",
                    )}
                  </strong>
                </div>
              </section>

              <section className="managerTwoColumn">
                <article className="managerPanel">
                  <h3>Theo level</h3>
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
                  <h3>Cách đọc</h3>
                  <div className="managerEventList">
                    <div>
                      <strong>Đúng</strong>
                      <span>Học viên đã chọn đúng nghĩa của từ.</span>
                    </div>
                    <div>
                      <strong>Sai cần ôn</strong>
                      <span>Từ này nằm trong danh sách cần luyện lại.</span>
                    </div>
                  </div>
                </article>
              </section>

              <section className="managerPanel">
                <h3>Tiến độ từ vựng gần đây</h3>
                <div className="managerTable">
                  <div className="managerTableHead progress">
                    <span>Người học</span>
                    <span>Level</span>
                    <span>Kết quả</span>
                    <span>Từ</span>
                    <span>Cập nhật</span>
                  </div>
                  {recentProgress.map((row) => {
                    const profile = row.user_id
                      ? profilesById.get(row.user_id)
                      : null;
                    return (
                      <div className="managerTableRow progress" key={row.id}>
                        <span>
                          {profile?.email ||
                            profile?.username ||
                            row.user_id ||
                            "—"}
                        </span>
                        <strong>{row.level || "—"}</strong>
                        <span
                          className={`managerStatusText ${row.status === "correct" ? "correct" : "wrong"}`}
                        >
                          {getProgressStatusLabel(row.status)}
                        </span>
                        <span title={row.word_key || undefined}>
                          {getWordFromProgressKey(row.word_key)}
                        </span>
                        <span>{formatDate(row.updated_at)}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          ) : null}

          {activeTab === "events" ? (
            <>
              <section className="managerStatsGrid">
                <div>
                  <span>Sự kiện gần đây</span>
                  <strong>{recentEvents.length.toLocaleString("vi-VN")}</strong>
                </div>
                <div>
                  <span>Lượt quiz</span>
                  <strong>
                    {recentAttempts.length.toLocaleString("vi-VN")}
                  </strong>
                </div>
                <div>
                  <span>Loại sự kiện</span>
                  <strong>
                    {Object.keys(eventsByType).length.toLocaleString("vi-VN")}
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

              <section className="managerTwoColumn">
                <article className="managerPanel">
                  <h3>Nhóm sự kiện</h3>
                  <div className="managerLevelList">
                    {Object.entries(eventsByType).map(([eventType, count]) => (
                      <div key={eventType}>
                        <strong>{getEventLabel(eventType)}</strong>
                        <span>{count.toLocaleString("vi-VN")} lần</span>
                        <span>{eventType}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className="managerPanel">
                  <h3>Cách dùng</h3>
                  <div className="managerEventList">
                    <div>
                      <strong>Sự kiện</strong>
                      <span>Ghi lại hành động học: streak, mục tiêu ngày, hoàn thành level.</span>
                    </div>
                    <div>
                      <strong>Quiz</strong>
                      <span>Cho biết bài kiểm tra nào vừa làm và điểm đạt được.</span>
                    </div>
                  </div>
                </article>
              </section>

              <section className="managerTwoColumn">
                <article className="managerPanel">
                  <h3>Hoạt động gần đây</h3>
                  <div className="managerEventList">
                    {recentEvents.map((event) => {
                      const profile = event.user_id
                        ? profilesById.get(event.user_id)
                        : null;
                      return (
                        <div key={event.id}>
                          <strong>{getEventLabel(event.event_type)}</strong>
                          <span>
                            {profile?.email ||
                              profile?.username ||
                              event.user_id ||
                              "Không rõ user"}
                          </span>
                          <small>{formatDate(event.created_at)}</small>
                          <small>{formatEventPayload(event.payload)}</small>
                        </div>
                      );
                    })}
                  </div>
                </article>
                <article className="managerPanel">
                  <h3>Lịch sử quiz</h3>
                  <div className="managerEventList">
                    {recentAttempts.map((attempt) => {
                      const profile = attempt.user_id
                        ? profilesById.get(attempt.user_id)
                        : null;
                      return (
                        <div key={attempt.id}>
                          <strong>{attempt.skill || "Quiz"}</strong>
                          <span>
                            {profile?.email ||
                              profile?.username ||
                              attempt.user_id ||
                              "Không rõ user"}
                          </span>
                          <small>
                            {attempt.level || "Tất cả level"} · Điểm{" "}
                            {attempt.score || 0}/{attempt.total || 0}
                          </small>
                          <small>{formatDate(attempt.created_at)}</small>
                        </div>
                      );
                    })}
                  </div>
                </article>
              </section>
            </>
          ) : null}

          {activeTab === "setup" ? (
            <section className="managerPanel managerSqlPanel">
              <div>
                <h3>Cấu hình Manager</h3>
                <p>
                  Manager cần key server để đọc Auth users, profiles, tiến độ
                  và sự kiện. Key này chỉ đặt trong Vercel/server.
                </p>
              </div>
              <div className="managerSetupSteps">
                <div>
                  <strong>1. Lấy key trong Supabase</strong>
                  <span>
                    Project Settings → API Keys → copy{" "}
                    <code>Secret key</code> hoặc legacy{" "}
                    <code>service_role</code>.
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
