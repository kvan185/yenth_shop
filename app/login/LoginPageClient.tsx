"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

type AuthMode = "signin" | "signup";

export default function LoginPageClient() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handlePasswordAuth() {
    setIsLoading(true);
    setMessage("");

    const authRequest =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error } = await authRequest;

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setMessage(mode === "signin" ? "Đăng nhập thành công." : "Đã tạo tài khoản. Kiểm tra email nếu Supabase yêu cầu xác nhận.");
    setIsLoading(false);
  }

  async function handleMagicLink() {
    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
      },
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setMessage("Đã gửi link đăng nhập vào email của bạn.");
    setIsLoading(false);
  }

  return (
    <main className="loginPage">
      <section className="loginHeroPanel">
        <Link className="loginBrand" href="/">
          YENTH
        </Link>
        <p className="loginEyebrow">Học đều hơn, nhớ lâu hơn</p>
        <h1>Đăng nhập để giữ streak, XP và lộ trình học của bạn.</h1>
        <p>
          Đồng bộ tiến độ từ vựng, bài quiz, flashcard và các mục tiêu TOEIC,
          IELTS, VSTEP trên mọi thiết bị.
        </p>

        <div className="loginPreviewCard">
          <div>
            <span>Today Progress</span>
            <strong>+25 XP</strong>
          </div>
          <div className="loginProgressLine">
            <span style={{ width: "78%" }} />
          </div>
          <ul>
            <li>🔥 14 ngày streak</li>
            <li>⭐ 1250 XP đã tích lũy</li>
            <li>🏆 6 huy hiệu đã mở khóa</li>
          </ul>
        </div>
      </section>

      <section className="loginCard" aria-label="Đăng nhập tài khoản">
        <div className="loginCardHead">
          <p className="loginEyebrow">Account</p>
          <h2>{mode === "signin" ? "Đăng nhập" : "Tạo tài khoản"}</h2>
          <p>{mode === "signin" ? "Tiếp tục học ngay nơi bạn dừng lại." : "Bắt đầu lưu tiến độ học của bạn."}</p>
        </div>

        <div className="loginSwitch" role="tablist" aria-label="Chọn chế độ đăng nhập">
          <button className={mode === "signin" ? "active" : ""} type="button" onClick={() => setMode("signin")}>
            Đăng nhập
          </button>
          <button className={mode === "signup" ? "active" : ""} type="button" onClick={() => setMode("signup")}>
            Đăng ký
          </button>
        </div>

        <div className="loginForm">
          <label>
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="van@yenth.vn"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            <span>Mật khẩu</span>
            <input
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <div className="loginMetaRow">
            <label className="loginRemember">
              <input type="checkbox" defaultChecked />
              <span>Ghi nhớ</span>
            </label>
            <Link href="/profile">Quên mật khẩu?</Link>
          </div>

          <button
            className="loginPrimaryButton"
            type="button"
            disabled={isLoading || !email || !password}
            onClick={handlePasswordAuth}
          >
            {isLoading ? "Đang xử lý..." : mode === "signin" ? "Đăng nhập" : "Tạo tài khoản"}
          </button>

          <button
            className="loginSecondaryButton"
            type="button"
            disabled={isLoading || !email}
            onClick={handleMagicLink}
          >
            Gửi magic link
          </button>

          <div className="loginDivider">
            <span>hoặc tiếp tục với</span>
          </div>

          <div className="loginSocialGrid">
            <button type="button" disabled>
              Google
            </button>
            <button type="button" disabled>
              Facebook
            </button>
          </div>

          {message ? <p className="loginMessage">{message}</p> : null}
        </div>

        <p className="loginTerms">
          Khi tiếp tục, bạn đồng ý với điều khoản học tập và chính sách bảo mật của YENTH.
        </p>
      </section>
    </main>
  );
}
