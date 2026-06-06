"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { initLogic } from "./logic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const ROOM_TABLE = "xiangqi_rooms";

type GameApi = {
  cleanup: () => void;
  getState: () => unknown;
  loadState: (state: unknown) => void;
  newGame: (shouldNotify?: boolean) => void;
};

const markup = `
<main class="xiangqi-shell">
  <section class="side-panel">
    <div class="brand-block">
      <div class="logo">帥</div>
      <div>
        <h1>Cờ Tướng đôi</h1>
        <p>Chơi 1 máy hoặc tạo phòng online</p>
      </div>
    </div>

    <div class="card accent-card">
      <p class="label">Trạng thái</p>
      <h2 id="status">Lượt Đỏ</h2>
      <p id="hint">Chọn hoặc kéo quân đỏ để đi.</p>
    </div>

    <div class="card online-card">
      <p class="label">Chơi online</p>
      <p id="onlineStatus" class="online-status">Mặc định chơi 1 máy. Tạo phòng để mời người khác.</p>
      <div class="room-actions">
        <button id="createRoomBtn" class="btn primary" type="button">Tạo phòng</button>
        <button id="copyRoomBtn" class="btn" type="button" disabled>Copy link</button>
      </div>
      <div class="join-row">
        <input id="roomInput" class="room-input" placeholder="Nhập mã hoặc link phòng" />
        <button id="joinRoomBtn" class="small-btn" type="button">Vào</button>
      </div>
    </div>

    <div class="captured-grid">
      <div class="card">
        <p class="label">Đỏ đã ăn</p>
        <div id="redCaptured" class="captured"></div>
      </div>
      <div class="card">
        <p class="label">Đen đã ăn</p>
        <div id="blackCaptured" class="captured"></div>
      </div>
    </div>

    <button id="newGame" class="btn primary" type="button">Ván mới</button>
    <button id="undo" class="btn" type="button">Hoàn tác</button>
    <button id="flip" class="btn" type="button">Lật bàn cờ</button>
  </section>

  <section class="board-section">
    <div class="board-frame">
      <div id="board" class="board" aria-label="Bàn cờ tướng 2 người"></div>
    </div>
  </section>

  <section class="side-panel moves-panel">
    <div class="card timer">
      <div class="timer-row black-clock">
        <p class="label">Đen</p>
        <h2 id="blackTimer">15:00</h2>
      </div>
      <div class="timer-row red-clock">
        <p class="label">Đỏ</p>
        <h2 id="redTimer">15:00</h2>
      </div>
    </div>

    <div class="card moves-card">
      <p class="label">Biên bản</p>
      <ol id="moveList"></ol>
    </div>

    <div class="card rules">
      <p class="label">Đã hỗ trợ</p>
      <ul>
        <li>Đi đúng luật cơ bản từng quân</li>
        <li>Kéo thả hoặc click để đi</li>
        <li>Tướng không được đối mặt</li>
        <li>Báo chiếu, chiếu hết, hòa</li>
        <li>Phòng online cho 2 laptop</li>
      </ul>
    </div>
  </section>
</main>`;

const styles = `
* { box-sizing: border-box; }
body { margin: 0; }
.web_co_tuong_2_nguoi-wrapper {
  min-height: 100vh; color: #fff7e8; font-family: Arial, Helvetica, sans-serif;
  background:
    radial-gradient(circle at 18% 6%, rgba(255, 198, 112, 0.22), transparent 34%),
    radial-gradient(circle at 82% 16%, rgba(185, 55, 42, 0.18), transparent 32%),
    linear-gradient(135deg, #160b07, #2b160c 58%, #0f0705);
}
.back-link { position: absolute; top: 16px; left: 16px; z-index: 20; border: 1px solid rgba(255,255,255,0.18); border-radius: 8px; padding: 9px 12px; background: rgba(255,255,255,0.12); color: #fff; text-decoration: none; font-weight: 800; }
.xiangqi-shell { min-height: 100vh; display: grid; grid-template-columns: minmax(250px, 320px) minmax(380px, 700px) minmax(250px, 320px); gap: 18px; align-items: center; justify-content: center; padding: 60px 22px 22px; }
.side-panel { border: 1px solid rgba(255,255,255,0.13); border-radius: 8px; padding: 20px; background: rgba(45, 24, 14, 0.88); box-shadow: 0 24px 70px rgba(0,0,0,0.3); backdrop-filter: blur(18px); }
.brand-block { display: flex; gap: 14px; align-items: center; margin-bottom: 20px; }
.logo { width: 58px; height: 58px; display: grid; place-items: center; border-radius: 8px; background: linear-gradient(145deg, #f4c27a, #b97835); color: #bd1f1f; border: 3px solid #6b3415; font-size: 34px; font-weight: 900; font-family: "Times New Roman", serif; }
h1,h2,p { margin: 0; }
.brand-block h1 { font-size: 28px; line-height: 1.05; }
.brand-block p, .label, #hint { color: #d9c3a0; }
.label { margin-bottom: 8px; font-size: 13px; font-weight: 900; letter-spacing: 0; text-transform: uppercase; }
.card { margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; background: rgba(255,255,255,0.07); }
.accent-card { background: linear-gradient(145deg, rgba(189,31,31,0.22), rgba(255,255,255,0.07)); }
.card h2 { margin-bottom: 8px; font-size: 25px; }
.captured-grid { display: grid; grid-template-columns: 1fr; }
.captured { min-height: 42px; display: flex; flex-wrap: wrap; gap: 8px; }
.mini-piece { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: #f2c47d; border: 2px solid #703b18; font-family: "Times New Roman", serif; font-weight: 900; }
.mini-piece.red { color: #bd1f1f; } .mini-piece.black { color: #171717; }
.btn { width: 100%; margin-top: 10px; padding: 14px 16px; border: 0; border-radius: 8px; background: rgba(255,255,255,0.12); color: white; font-size: 16px; font-weight: 900; cursor: pointer; transition: 0.16s; }
.btn:hover, .small-btn:hover { transform: translateY(-1px); filter: brightness(1.12); }
.btn:disabled { cursor: not-allowed; opacity: 0.48; transform: none; filter: none; }
.primary { background: linear-gradient(180deg, #d94a38, #9c251b); }
.online-status { margin-bottom: 12px; color: #efd9b7; font-size: 14px; line-height: 1.45; }
.room-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.room-actions .btn { margin-top: 0; }
.join-row { display: grid; grid-template-columns: 1fr auto; gap: 10px; margin-top: 10px; }
.room-input { width: 100%; min-width: 0; border: 1px solid rgba(255,255,255,0.14); border-radius: 8px; padding: 10px 11px; background: rgba(0,0,0,0.18); color: #fff; outline: none; }
.room-input::placeholder { color: #c8ad86; }
.small-btn { border: 0; border-radius: 8px; padding: 8px 11px; background: rgba(255,255,255,0.12); color: #fff; cursor: pointer; font-weight: 900; }
.board-section { display: grid; place-items: center; }
.board-frame { padding: 12px; border-radius: 8px; background: rgba(11,7,5,0.55); box-shadow: 0 30px 90px rgba(0,0,0,0.4); }
.board { position: relative; width: min(90vw, 630px); aspect-ratio: 8 / 9; background: #d9a15c; border: 14px solid #5b2e14; border-radius: 8px; overflow: hidden; touch-action: none; box-shadow: inset 0 0 0 4px rgba(255,255,255,0.15); }
.board::before { content: "楚河        漢界"; position: absolute; left: 0; right: 0; top: 44.5%; height: 11%; display: flex; align-items: center; justify-content: center; letter-spacing: clamp(16px, 5vw, 42px); font-family: "Times New Roman", serif; font-size: clamp(24px, 5vw, 42px); color: rgba(90,46,20,0.5); pointer-events: none; }
.grid-line { position: absolute; background: #5a2e14; opacity: 0.9; }
.h-line { height: 2px; left: 6.25%; right: 6.25%; }
.v-line { width: 2px; top: 5.55%; bottom: 5.55%; }
.v-line.river-gap { background: linear-gradient(to bottom, #5a2e14 0 43.5%, transparent 43.5% 56.5%, #5a2e14 56.5% 100%); }
.diagonal { position: absolute; height: 2px; background: #5a2e14; transform-origin: left center; }
.point { position: absolute; width: clamp(54px, 7.6vw, 66px); height: clamp(54px, 7.6vw, 66px); transform: translate(-50%, -50%); border-radius: 50%; display: grid; place-items: center; cursor: pointer; z-index: 2; touch-action: none; }
.point.selected { outline: 5px solid rgba(255,222,89,0.72); }
.point.to-move .piece { filter: drop-shadow(0 0 10px rgba(255,222,89,0.62)); }
.point.drag-origin .piece { opacity: 0.18; }
.point.legal::after { content: ""; position: absolute; left: 50%; top: 50%; width: 18px; height: 18px; transform: translate(-50%, -50%); background: rgba(30,30,30,0.28); border-radius: 50%; }
.point.capture::after { content: ""; position: absolute; left: 50%; top: 50%; width: calc(100% - 8px); height: calc(100% - 8px); transform: translate(-50%, -50%); border: 5px solid rgba(30,30,30,0.32); border-radius: 50%; }
.point.last { background: rgba(255,222,89,0.24); }
.piece { width: clamp(38px,7vw,58px); height: clamp(38px,7vw,58px); border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 35% 25%, #ffe1a7, #efbd70 55%, #b66a2e); border: 4px solid #6c3413; box-shadow: 0 5px 10px rgba(0,0,0,0.28), inset 0 0 0 3px rgba(255,255,255,0.22); font-family: "Times New Roman", serif; font-size: clamp(24px,5vw,40px); font-weight: 900; z-index: 5; pointer-events: none; transition: transform 0.14s ease, filter 0.14s ease; }
.point:hover .piece { transform: translateY(-2px); }
.piece.red { color: #bd1f1f; } .piece.black { color: #171717; }
.drag-ghost { position: fixed; z-index: 9999; pointer-events: none; transform: translate(-50%, -50%) scale(1.08); filter: drop-shadow(0 20px 24px rgba(0,0,0,0.42)); }
.timer { display: grid; gap: 12px; }
.timer-row { border-radius: 8px; padding: 12px; background: rgba(255,255,255,0.06); }
.timer h2 { font-size: 36px; }
.moves-card { max-height: 360px; overflow: auto; }
#moveList { margin: 0; padding-left: 22px; line-height: 1.9; }
.rules ul { margin: 0; padding-left: 20px; line-height: 1.7; color: #efd9b7; }
@media (max-width: 1180px) { .xiangqi-shell { grid-template-columns: 1fr; align-items: start; } .side-panel, .board-section { width: min(700px, 100%); margin: 0 auto; } .board { width: calc(100vw - 72px); max-width: 630px; } }
@media (max-width: 620px) { .xiangqi-shell { padding: 58px 10px 16px; gap: 12px; } .side-panel { padding: 14px; } .brand-block h1 { font-size: 24px; } .board-frame { padding: 6px; } .board { width: calc(100vw - 32px); border-width: 8px; } .point { width: 46px; height: 46px; } .piece { width: 38px; height: 38px; font-size: 25px; border-width: 3px; } }
`;

export default function WebCoTuong2Nguoi() {
  const initialized = useRef(false);
  const gameApiRef = useRef<GameApi | null>(null);
  const roomRef = useRef("");
  const playerColorRef = useRef<"r" | "b" | null>(null);
  const clientIdRef = useRef("");
  const lastRemoteStampRef = useRef("");
  const pushingRef = useRef(false);
  const pollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const styleId = "style-web_co_tuong_2_nguoi";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = styles;
      document.head.appendChild(style);
    }

    const onlineStatus = document.getElementById("onlineStatus");
    const createRoomBtn = document.getElementById("createRoomBtn") as HTMLButtonElement | null;
    const copyRoomBtn = document.getElementById("copyRoomBtn") as HTMLButtonElement | null;
    const joinRoomBtn = document.getElementById("joinRoomBtn") as HTMLButtonElement | null;
    const roomInput = document.getElementById("roomInput") as HTMLInputElement | null;
    const setOnlineStatus = (message: string) => { if (onlineStatus) onlineStatus.textContent = message; };

    const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
    const headers = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json" };
    const apiUrl = (query = "") => `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${ROOM_TABLE}${query}`;
    const roomLink = (roomId: string) => `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    const normalizeRoomId = (value: string) => { try { const url = new URL(value); return url.searchParams.get("room") || value.trim(); } catch { return value.trim(); } };
    const getClientId = () => { const key = "web_co_tuong_2_nguoi_client_id"; const existing = window.localStorage.getItem(key); if (existing) return existing; const id = crypto.randomUUID(); window.localStorage.setItem(key, id); return id; };

    const fetchRoom = async (roomId: string) => {
      const res = await fetch(apiUrl(`?id=eq.${encodeURIComponent(roomId)}&select=*`), { headers, cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data?.[0] || null;
    };
    const patchRoom = async (roomId: string, payload: Record<string, unknown>) => {
      const res = await fetch(apiUrl(`?id=eq.${encodeURIComponent(roomId)}`), { method: "PATCH", headers: { ...headers, Prefer: "return=representation" }, body: JSON.stringify({ ...payload, updated_at: new Date().toISOString() }) });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data?.[0] || null;
    };
    const pushState = async (state: unknown) => {
      if (!roomRef.current || !supabaseReady || pushingRef.current) return;
      pushingRef.current = true;
      try { const row = await patchRoom(roomRef.current, { state }); if (row?.updated_at) lastRemoteStampRef.current = row.updated_at; }
      catch (error) { setOnlineStatus(`Không đẩy được nước đi: ${String(error).slice(0, 120)}`); }
      finally { pushingRef.current = false; }
    };
    const stopPolling = () => { if (pollTimerRef.current) window.clearInterval(pollTimerRef.current); pollTimerRef.current = null; };
    const startPolling = (roomId: string) => {
      stopPolling();
      pollTimerRef.current = window.setInterval(async () => {
        try { const room = await fetchRoom(roomId); if (!room) return; if (room.updated_at && room.updated_at !== lastRemoteStampRef.current) { lastRemoteStampRef.current = room.updated_at; gameApiRef.current?.loadState(room.state); } }
        catch (error) { setOnlineStatus(`Mất kết nối phòng: ${String(error).slice(0, 100)}`); }
      }, 1200);
    };
    const enterRoom = async (roomId: string) => {
      if (!supabaseReady) { setOnlineStatus("Chưa cấu hình Supabase env nên hiện chỉ chơi được 1 máy."); return; }
      const room = await fetchRoom(roomId);
      if (!room) { setOnlineStatus("Không tìm thấy phòng này."); return; }
      const updates: Record<string, unknown> = {};
      if (room.red_id === clientIdRef.current) playerColorRef.current = "r";
      else if (room.black_id === clientIdRef.current) playerColorRef.current = "b";
      else if (!room.black_id) { playerColorRef.current = "b"; updates.black_id = clientIdRef.current; }
      else playerColorRef.current = null;
      const nextRoom = Object.keys(updates).length ? await patchRoom(roomId, updates) : room;
      roomRef.current = roomId; lastRemoteStampRef.current = nextRoom?.updated_at || ""; gameApiRef.current?.loadState(nextRoom?.state || room.state);
      if (copyRoomBtn) copyRoomBtn.disabled = false; if (roomInput) roomInput.value = roomId;
      window.history.replaceState(null, "", `${window.location.pathname}?room=${roomId}`); startPolling(roomId);
      const role = playerColorRef.current ? `Bạn cầm quân ${playerColorRef.current === "r" ? "Đỏ" : "Đen"}` : "Bạn đang xem ván";
      setOnlineStatus(`Phòng ${roomId}. ${role}. Link đã sẵn sàng để copy.`);
    };
    const createRoom = async () => {
      if (!supabaseReady) { setOnlineStatus("Cần NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY để tạo phòng online."); return; }
      const roomId = Math.random().toString(36).slice(2, 8).toUpperCase();
      const res = await fetch(apiUrl(), { method: "POST", headers: { ...headers, Prefer: "return=representation" }, body: JSON.stringify({ id: roomId, state: gameApiRef.current?.getState(), red_id: clientIdRef.current, black_id: null, updated_at: new Date().toISOString() }) });
      if (!res.ok) { setOnlineStatus(`Không tạo được phòng: ${(await res.text()).slice(0, 120)}`); return; }
      roomRef.current = roomId; playerColorRef.current = "r"; const data = await res.json(); lastRemoteStampRef.current = data?.[0]?.updated_at || "";
      if (copyRoomBtn) copyRoomBtn.disabled = false; if (roomInput) roomInput.value = roomId;
      window.history.replaceState(null, "", `${window.location.pathname}?room=${roomId}`); startPolling(roomId);
      setOnlineStatus(`Đã tạo phòng ${roomId}. Bạn cầm quân Đỏ, gửi link cho người thứ hai.`);
    };
    const copyRoom = async () => { if (!roomRef.current) return; await navigator.clipboard.writeText(roomLink(roomRef.current)); setOnlineStatus(`Đã copy link phòng ${roomRef.current}.`); };

    if (!initialized.current) {
      initialized.current = true;
      clientIdRef.current = getClientId();
      gameApiRef.current = initLogic({ isOnline: () => Boolean(roomRef.current), getPlayerColor: () => playerColorRef.current, onStateChange: pushState });
    }
    const onCreateRoom = () => void createRoom();
    const onCopyRoom = () => void copyRoom();
    const onJoinRoom = () => { const roomId = normalizeRoomId(roomInput?.value || ""); if (roomId) void enterRoom(roomId); };
    createRoomBtn?.addEventListener("click", onCreateRoom); copyRoomBtn?.addEventListener("click", onCopyRoom); joinRoomBtn?.addEventListener("click", onJoinRoom);
    const urlRoom = new URLSearchParams(window.location.search).get("room"); if (urlRoom) { if (roomInput) roomInput.value = urlRoom; void enterRoom(urlRoom); }

    return () => { stopPolling(); gameApiRef.current?.cleanup?.(); createRoomBtn?.removeEventListener("click", onCreateRoom); copyRoomBtn?.removeEventListener("click", onCopyRoom); joinRoomBtn?.removeEventListener("click", onJoinRoom); document.getElementById(styleId)?.remove(); };
  }, []);

  return (
    <div className="web_co_tuong_2_nguoi-wrapper">
      <Link href="/GameMini" className="back-link">← GameMini</Link>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </div>
  );
}
