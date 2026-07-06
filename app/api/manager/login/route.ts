import { NextResponse } from "next/server";
import {
  createManagerSessionToken,
  isManagerAuthConfigured,
  isValidManagerCredential,
  managerSessionCookieName,
} from "../../../../lib/managerAuth";

export async function POST(request: Request) {
  if (!isManagerAuthConfigured()) {
    return NextResponse.json(
      { error: "Manager auth chưa cấu hình. Thiếu MANAGER_ADMIN_USERNAME hoặc MANAGER_ADMIN_PASSWORD." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | {
        password?: string;
        username?: string;
      }
    | null;
  const username = String(body?.username || "").trim();
  const password = String(body?.password || "");

  if (!isValidManagerCredential(username, password)) {
    return NextResponse.json({ error: "Sai tài khoản hoặc mật khẩu quản trị." }, { status: 401 });
  }

  const token = createManagerSessionToken(username);
  const response = NextResponse.json({ ok: true });

  response.cookies.set(managerSessionCookieName, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
