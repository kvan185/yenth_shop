import { NextResponse } from "next/server";
import { managerSessionCookieName } from "../../../../lib/managerAuth";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(managerSessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
