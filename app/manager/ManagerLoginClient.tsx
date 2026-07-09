"use client";

import { useState } from "react";

type ManagerLoginClientProps = {
  authConfigured: boolean;
};

export default function ManagerLoginClient({ authConfigured }: ManagerLoginClientProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    setMessage("");

    const response = await fetch("/api/manager/login", {
      body: JSON.stringify({ password, username }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string };

    if (!response.ok) {
      setMessage(payload.error || "Không đăng nhập được manager.");
      setIsLoading(false);
      return;
    }

    window.location.reload();
  }

  return (
    <main className="managerPage managerLoginPage">
      <section className="managerLoginCard" aria-label="Đăng nhập quản trị">
        <p className="homeEyebrow">Manager</p>
        <h1>Chỉ admin mới được mở khu quản lý.</h1>
        <p>Đăng nhập bằng tài khoản quản trị để kiểm tra và quản lý tài nguyên Supabase.</p>

        {!authConfigured ? (
          <div className="managerMessage">
            Chưa cấu hình manager auth. Thêm MANAGER_ADMIN_USERNAME=admin và
            MANAGER_ADMIN_PASSWORD=Khanhvan12@@ trong env local/Vercel rồi restart app.
          </div>
        ) : null}

        <label>
          <span>Tài khoản admin</span>
          <input
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="admin"
          />
        </label>

        <label>
          <span>Mật khẩu</span>
          <input
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Nhập mật khẩu quản trị"
          />
        </label>

        <button
          className="primaryButton"
          disabled={!authConfigured || isLoading || !username || !password}
          type="button"
          onClick={handleLogin}
        >
          {isLoading ? "Đang kiểm tra..." : "Mở Manager"}
        </button>

        {message ? <p className="managerMessage">{message}</p> : null}
      </section>
    </main>
  );
}
