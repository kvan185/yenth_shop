import { NextResponse } from "next/server";

const defaultModel = "gpt-4o-mini-tts";
const defaultVoice = "marin";
const maxTextLength = 900;

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Thiếu OPENAI_API_KEY để tạo audio chất lượng cao." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | {
        text?: string;
      }
    | null;
  const text = String(body?.text || "").trim();

  if (!text) {
    return NextResponse.json({ error: "Thiếu nội dung cần đọc." }, { status: 400 });
  }

  if (text.length > maxTextLength) {
    return NextResponse.json(
      { error: `Nội dung đọc tối đa ${maxTextLength} ký tự.` },
      { status: 400 },
    );
  }

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    body: JSON.stringify({
      input: text,
      instructions:
        "Speak clearly in natural English with a calm learner-friendly tone.",
      model: process.env.OPENAI_TTS_MODEL || defaultModel,
      voice: process.env.OPENAI_TTS_VOICE || defaultVoice,
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return NextResponse.json(
      { error: "Không tạo được audio chất lượng cao.", detail },
      { status: response.status },
    );
  }

  const audio = await response.arrayBuffer();

  return new Response(audio, {
    headers: {
      "Cache-Control": "private, max-age=86400",
      "Content-Type": response.headers.get("content-type") || "audio/mpeg",
    },
  });
}
