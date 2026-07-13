"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { resolveLoginEmail, upsertOwnProfile } from "../../lib/profile";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";

type AuthMode = "signin" | "signup";

function getAuthRedirectUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(
    /\/$/,
    "",
  );
  const productionSiteUrl = "https://yenth.shop";
  const origin =
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost")
      ? window.location.origin
      : undefined;

  return `${configuredSiteUrl || origin || productionSiteUrl}/dashboard`;
}

export default function LoginPageClient() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  function getAuthErrorMessage(error: unknown) {
    if (error && typeof error === "object" && "message" in error) {
      const messageText = String((error as { message?: unknown }).message || "").trim();

      if (messageText && messageText !== "{}") {
        return messageText;
      }
    }

    return "Không đăng nhập được. Kiểm tra email/mật khẩu và chắc chắn bạn đã chạy SQL seed trong Supabase.";
  }

  async function handlePasswordAuth() {
    if (!supabase) {
      setMessage(
        "Supabase chưa được cấu hình. Vui lòng thêm biến môi trường để bật đăng nhập.",
      );
      return;
    }

    setIsLoading(true);
    setMessage("");

    const authEmail = mode === "signin" ? await resolveLoginEmail(identifier) : identifier.trim();

    const authRequest =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email: authEmail, password })
        : supabase.auth.signUp({
            email: authEmail,
            password,
            options: {
              emailRedirectTo: getAuthRedirectUrl(),
            },
          });

    const { data, error } = await authRequest;

    if (error) {
      setMessage(getAuthErrorMessage(error));
      setIsLoading(false);
      return;
    }

    if (mode === "signin") {
      if (data.user) {
        await upsertOwnProfile(data.user, { email: data.user.email });
      }
      setMessage("Đăng nhập thành công. Đang chuyển về trang chủ...");
      router.replace("/");
      router.refresh();
      return;
    }

    if (data.user) {
      await upsertOwnProfile(data.user, { email: data.user.email });
    }

    setMessage("Đã tạo tài khoản. Kiểm tra email nếu Supabase yêu cầu xác nhận.");
    setIsLoading(false);
  }

  async function handleMagicLink() {
    if (!supabase) {
      setMessage(
        "Supabase chưa được cấu hình. Vui lòng thêm biến môi trường để bật magic link.",
      );
      return;
    }

    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email: identifier.trim(),
      options: {
        emailRedirectTo: getAuthRedirectUrl(),
      },
    });

    if (error) {
      setMessage(getAuthErrorMessage(error));
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
          <p>
            {mode === "signin"
              ? "Tiếp tục học ngay nơi bạn dừng lại."
              : "Bắt đầu lưu tiến độ học của bạn."}
          </p>
        </div>

        <div
          className="loginSwitch"
          role="tablist"
          aria-label="Chọn chế độ đăng nhập"
        >
          <button
            className={mode === "signin" ? "active" : ""}
            type="button"
            onClick={() => setMode("signin")}
          >
            Đăng nhập
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            type="button"
            onClick={() => setMode("signup")}
          >
            Đăng ký
          </button>
        </div>

        <div className="loginForm">
          <label>
            <span>{mode === "signin" ? "Username hoặc email" : "Email"}</span>
            <input
              type={mode === "signin" ? "text" : "email"}
              autoComplete={mode === "signin" ? "username" : "email"}
              placeholder={mode === "signin" ? "khanhvan hoặc khanhvan@yenth.shop" : "van@yenth.vn"}
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />
          </label>

          <label>
            <span>Mật khẩu</span>
            <input
              type="password"
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
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
            disabled={isLoading || !isSupabaseConfigured || !identifier || !password}
            onClick={handlePasswordAuth}
          >
            {isLoading
              ? "Đang xử lý..."
              : mode === "signin"
                ? "Đăng nhập"
                : "Tạo tài khoản"}
          </button>

          <button
            className="loginSecondaryButton"
            type="button"
            disabled={isLoading || !isSupabaseConfigured || !identifier.includes("@")}
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
          {!isSupabaseConfigured ? (
            <p className="loginMessage">
              Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY
              nên đăng nhập đang tạm tắt.
            </p>
          ) : null}
        </div>

        <p className="loginTerms">
          Khi tiếp tục, bạn đồng ý với điều khoản học tập và chính sách bảo mật
          của YENTH.
        </p>
      </section>
    </main>
  );
}
