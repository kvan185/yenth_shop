"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { initLogic } from "./logic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const CHESS_ROOM_TABLE = "chess_rooms";

type ChessGameApi = {
  cleanup: () => void;
  getState: () => unknown;
  loadState: (state: unknown) => void;
  newGame: (shouldNotify?: boolean) => void;
};

const chessMarkup = `
<main class="chess-shell">
  <aside class="panel left-panel">
    <div class="brand-block">
      <div class="logo">♞</div>
      <div>
        <h1>Cờ vua đôi</h1>
        <p>2 người chơi trên cùng thiết bị</p>
      </div>
    </div>

    <div class="status-card accent-card">
      <p class="label">Trạng thái</p>
      <h2 id="statusText">Lượt Trắng</h2>
      <p id="hintText">Chọn hoặc kéo một quân để đi.</p>
    </div>

    <div class="online-card">
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
      <div class="captured">
        <p class="label">Trắng đã ăn</p>
        <div id="whiteCaptured" class="captured-list"></div>
      </div>
      <div class="captured">
        <p class="label">Đen đã ăn</p>
        <div id="blackCaptured" class="captured-list"></div>
      </div>
    </div>

    <button id="newGameBtn" class="btn primary">Ván mới</button>
    <button id="flipBtn" class="btn">Lật bàn cờ</button>
  </aside>

  <section class="board-wrap">
    <div class="board-frame">
      <div class="coordinates files top"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span></div>
      <div class="board-area">
        <div class="coordinates ranks"><span>8</span><span>7</span><span>6</span><span>5</span><span>4</span><span>3</span><span>2</span><span>1</span></div>
        <div id="board" class="board" aria-label="Bàn cờ vua 2 người"></div>
      </div>
      <div class="coordinates files"><span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span></div>
    </div>
  </section>

  <aside class="panel right-panel">
    <div class="timer-card">
      <div class="timer-row black-clock">
        <p class="label">Đen</p>
        <h2 id="blackTimer">10:00</h2>
      </div>
      <div class="timer-row white-clock">
        <p class="label">Trắng</p>
        <h2 id="whiteTimer">10:00</h2>
      </div>
    </div>

    <div class="moves">
      <div class="moves-head">
        <p class="label">Biên bản nước đi</p>
        <button id="undoBtn" class="small-btn">Hoàn tác</button>
      </div>
      <ol id="moveList"></ol>
    </div>

    <div class="rules">
      <p class="label">Đã hỗ trợ</p>
      <ul>
        <li>Đi đúng luật từng quân</li>
        <li>Kéo thả hoặc click để đi</li>
        <li>Nhập thành, phong cấp</li>
        <li>Bắt tốt qua đường</li>
        <li>Chiếu, chiếu hết, hòa bí</li>
        <li>Đồng hồ 10 phút</li>
      </ul>
    </div>
  </aside>
</main>

<div id="promotionModal" class="modal hidden">
  <div class="modal-card">
    <h2>Phong cấp tốt</h2>
    <p>Chọn quân muốn phong:</p>
    <div class="promotion-options">
      <button data-piece="q">♕</button>
      <button data-piece="r">♖</button>
      <button data-piece="b">♗</button>
      <button data-piece="n">♘</button>
    </div>
  </div>
</div>`;

const chessStyles = `
* { box-sizing: border-box; }
body { margin: 0; }
.web_chess_2_player-wrapper {
  min-height: 100vh;
  color: #f6f4ec;
  font-family: Arial, Helvetica, sans-serif;
  background:
    radial-gradient(circle at 18% 8%, rgba(243, 201, 105, 0.24), transparent 32%),
    radial-gradient(circle at 82% 18%, rgba(104, 185, 132, 0.22), transparent 34%),
    linear-gradient(135deg, #101416 0%, #182024 46%, #0c0f10 100%);
}
.back-link {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 20;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  padding: 9px 12px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
}
.chess-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(240px, 310px) minmax(360px, 760px) minmax(250px, 320px);
  gap: 18px;
  padding: 60px 22px 22px;
  align-items: center;
  justify-content: center;
}
.panel {
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 8px;
  padding: 20px;
  background: rgba(24, 29, 33, 0.88);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
}
.brand-block { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
.logo {
  width: 54px; height: 54px; display: grid; place-items: center; border-radius: 8px;
  background: linear-gradient(145deg, #f3c969, #946a22); color: #16130c; font-size: 34px;
}
h1, h2, p { margin: 0; }
.brand-block h1 { font-size: 28px; line-height: 1.05; }
.brand-block p, .label, #hintText { color: #aeb7bc; }
.label { margin-bottom: 8px; font-size: 13px; font-weight: 800; letter-spacing: 0; text-transform: uppercase; }
.status-card, .timer-card, .captured, .moves, .rules, .online-card {
  margin-bottom: 14px; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px;
  padding: 16px; background: rgba(255, 255, 255, 0.07);
}
.accent-card { background: linear-gradient(145deg, rgba(104, 185, 132, 0.2), rgba(255, 255, 255, 0.07)); }
.status-card h2 { margin-bottom: 8px; font-size: 25px; }
.captured-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
.captured-list { min-height: 32px; color: #f1eadc; font-size: 26px; letter-spacing: 2px; }
.btn {
  width: 100%; margin-top: 10px; border: 0; border-radius: 8px; padding: 14px 16px; cursor: pointer;
  background: rgba(255, 255, 255, 0.12); color: white; font-size: 16px; font-weight: 800; transition: 0.16s;
}
.btn:hover, .small-btn:hover, .promotion-options button:hover { filter: brightness(1.12); transform: translateY(-1px); }
.btn:disabled { cursor: not-allowed; opacity: 0.48; transform: none; filter: none; }
.primary { background: linear-gradient(180deg, #77c997, #397c55); }
.online-status { margin-bottom: 12px; color: #d9dedc; font-size: 14px; line-height: 1.45; }
.room-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.room-actions .btn { margin-top: 0; }
.join-row { display: grid; grid-template-columns: 1fr auto; gap: 10px; margin-top: 10px; }
.room-input {
  width: 100%; min-width: 0; border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 8px;
  padding: 10px 11px; background: rgba(0, 0, 0, 0.18); color: #fff; outline: none;
}
.room-input::placeholder { color: #9ea9ad; }
.board-wrap { width: min(100%, 760px); }
.board-frame { padding: 12px; border-radius: 8px; background: rgba(9, 11, 12, 0.62); box-shadow: 0 30px 90px rgba(0, 0, 0, 0.38); }
.board-area { display: grid; grid-template-columns: 28px 1fr; gap: 8px; }
.board {
  width: min(72vw, 720px); aspect-ratio: 1 / 1; display: grid; grid-template-columns: repeat(8, 1fr); grid-template-rows: repeat(8, 1fr);
  overflow: hidden; border: 8px solid rgba(10, 12, 13, 0.94); border-radius: 8px; touch-action: none;
}
.square { position: relative; display: grid; place-items: center; user-select: none; cursor: pointer; touch-action: none; }
.square.light { background: #e8d8b8; }
.square.dark { background: #5b7d68; }
.square.selected { background: #f7d66b !important; }
.square.to-move .piece { filter: drop-shadow(0 0 10px rgba(243, 201, 105, 0.58)); }
.square.drag-origin .piece { opacity: 0.18; }
.square.last-move { box-shadow: inset 0 0 0 1000px rgba(255, 222, 89, 0.26); }
.square.in-check { box-shadow: inset 0 0 0 1000px rgba(240, 120, 120, 0.5); }
.square.legal::after { content: ""; position: absolute; width: 28%; height: 28%; border-radius: 50%; background: rgba(17, 20, 22, 0.3); }
.square.capture::after { content: ""; position: absolute; width: 72%; height: 72%; border-radius: 50%; border: 6px solid rgba(17, 20, 22, 0.3); }
.piece {
  z-index: 2; font-size: clamp(34px, 7vw, 64px); line-height: 1; pointer-events: none; cursor: grab;
  text-shadow: 0 2px 1px rgba(0, 0, 0, 0.18); transition: transform 0.14s ease, filter 0.14s ease;
}
.square:hover .piece { transform: translateY(-2px); filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.22)); }
.white-piece { color: #fff; -webkit-text-stroke: 1px rgba(0, 0, 0, 0.4); }
.black-piece { color: #111; -webkit-text-stroke: 1px rgba(255, 255, 255, 0.18); }
.drag-ghost { position: fixed; z-index: 9999; pointer-events: none; transform: translate(-50%, -50%) scale(1.08); font-size: clamp(42px, 8vw, 72px); line-height: 1; filter: drop-shadow(0 20px 24px rgba(0, 0, 0, 0.42)); }
.coordinates { color: #f6f4ec; opacity: 0.78; font-weight: 800; }
.files { display: grid; grid-template-columns: repeat(8, 1fr); margin: 8px 0; padding-left: 36px; text-align: center; }
.ranks { display: grid; grid-template-rows: repeat(8, 1fr); align-items: center; text-align: center; }
.timer-card { display: grid; gap: 12px; }
.timer-row { border-radius: 8px; padding: 12px; background: rgba(255, 255, 255, 0.06); }
.timer-card h2 { font-size: 38px; }
.moves { max-height: 360px; overflow: auto; }
.moves-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.small-btn { border: 0; border-radius: 8px; padding: 8px 11px; background: rgba(255, 255, 255, 0.12); color: #fff; cursor: pointer; font-weight: 800; }
#moveList { margin: 0; padding-left: 24px; line-height: 1.9; }
.rules ul { margin: 0; padding-left: 20px; color: #d9dedc; line-height: 1.7; }
.modal { position: fixed; inset: 0; z-index: 30; display: grid; place-items: center; background: rgba(0, 0, 0, 0.65); }
.modal.hidden { display: none; }
.modal-card { width: min(420px, 92vw); border: 1px solid rgba(255, 255, 255, 0.13); border-radius: 8px; padding: 24px; background: #181d21; text-align: center; }
.promotion-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 18px; }
.promotion-options button { border: 0; border-radius: 8px; padding: 12px; background: #e8d8b8; font-size: 42px; cursor: pointer; }
@media (max-width: 1120px) {
  .chess-shell { grid-template-columns: 1fr; align-items: start; }
  .left-panel, .right-panel, .board-wrap { width: min(760px, 100%); margin: 0 auto; }
  .board { width: calc(100vw - 92px); max-width: 720px; }
}
@media (max-width: 620px) {
  .chess-shell { padding: 58px 10px 16px; gap: 12px; }
  .panel { padding: 14px; }
  .brand-block h1 { font-size: 24px; }
  .board-frame { padding: 6px; }
  .board-area { grid-template-columns: 18px 1fr; gap: 5px; }
  .board { width: calc(100vw - 48px); border-width: 5px; }
  .files { padding-left: 23px; }
  .piece { font-size: clamp(28px, 10vw, 46px); }
}
`;

export default function WebChess2Player() {
  const initialized = useRef(false);
  const gameApiRef = useRef<ChessGameApi | null>(null);
  const roomRef = useRef("");
  const playerColorRef = useRef<"w" | "b" | null>(null);
  const clientIdRef = useRef("");
  const lastRemoteStampRef = useRef("");
  const pushingRef = useRef(false);
  const pollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const styleId = "style-web_chess_2_player";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = chessStyles;
      document.head.appendChild(style);
    }

    const onlineStatus = document.getElementById("onlineStatus");
    const createRoomBtn = document.getElementById("createRoomBtn") as HTMLButtonElement | null;
    const copyRoomBtn = document.getElementById("copyRoomBtn") as HTMLButtonElement | null;
    const joinRoomBtn = document.getElementById("joinRoomBtn") as HTMLButtonElement | null;
    const roomInput = document.getElementById("roomInput") as HTMLInputElement | null;

    const setOnlineStatus = (message: string) => {
      if (onlineStatus) onlineStatus.textContent = message;
    };

    const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
    const headers = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    };

    const apiUrl = (query = "") => `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${CHESS_ROOM_TABLE}${query}`;
    const roomLink = (roomId: string) => `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    const normalizeRoomId = (value: string) => {
      try {
        const url = new URL(value);
        return url.searchParams.get("room") || value.trim();
      } catch {
        return value.trim();
      }
    };

    const getClientId = () => {
      const key = "web_chess_2_player_client_id";
      const existing = window.localStorage.getItem(key);
      if (existing) return existing;
      const id = crypto.randomUUID();
      window.localStorage.setItem(key, id);
      return id;
    };

    const fetchRoom = async (roomId: string) => {
      const res = await fetch(apiUrl(`?id=eq.${encodeURIComponent(roomId)}&select=*`), { headers, cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data?.[0] || null;
    };

    const patchRoom = async (roomId: string, payload: Record<string, unknown>) => {
      const res = await fetch(apiUrl(`?id=eq.${encodeURIComponent(roomId)}`), {
        method: "PATCH",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({ ...payload, updated_at: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data?.[0] || null;
    };

    const pushState = async (state: unknown) => {
      if (!roomRef.current || !supabaseReady || pushingRef.current) return;
      pushingRef.current = true;
      try {
        const row = await patchRoom(roomRef.current, { state });
        if (row?.updated_at) lastRemoteStampRef.current = row.updated_at;
      } catch (error) {
        setOnlineStatus(`Không đẩy được nước đi: ${String(error).slice(0, 120)}`);
      } finally {
        pushingRef.current = false;
      }
    };

    const stopPolling = () => {
      if (pollTimerRef.current) window.clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    };

    const startPolling = (roomId: string) => {
      stopPolling();
      pollTimerRef.current = window.setInterval(async () => {
        try {
          const room = await fetchRoom(roomId);
          if (!room) return;
          if (room.updated_at && room.updated_at !== lastRemoteStampRef.current) {
            lastRemoteStampRef.current = room.updated_at;
            gameApiRef.current?.loadState(room.state);
          }
        } catch (error) {
          setOnlineStatus(`Mất kết nối phòng: ${String(error).slice(0, 100)}`);
        }
      }, 1200);
    };

    const enterRoom = async (roomId: string) => {
      if (!supabaseReady) {
        setOnlineStatus("Chưa cấu hình Supabase env nên hiện chỉ chơi được 1 máy.");
        return;
      }

      const room = await fetchRoom(roomId);
      if (!room) {
        setOnlineStatus("Không tìm thấy phòng này.");
        return;
      }

      const updates: Record<string, unknown> = {};
      if (room.white_id === clientIdRef.current) playerColorRef.current = "w";
      else if (room.black_id === clientIdRef.current) playerColorRef.current = "b";
      else if (!room.black_id) {
        playerColorRef.current = "b";
        updates.black_id = clientIdRef.current;
      } else {
        playerColorRef.current = null;
      }

      const nextRoom = Object.keys(updates).length ? await patchRoom(roomId, updates) : room;
      roomRef.current = roomId;
      lastRemoteStampRef.current = nextRoom?.updated_at || "";
      gameApiRef.current?.loadState(nextRoom?.state || room.state);
      if (copyRoomBtn) copyRoomBtn.disabled = false;
      if (roomInput) roomInput.value = roomId;
      window.history.replaceState(null, "", `${window.location.pathname}?room=${roomId}`);
      startPolling(roomId);

      const role = playerColorRef.current ? `Bạn cầm quân ${playerColorRef.current === "w" ? "Trắng" : "Đen"}` : "Bạn đang xem ván";
      setOnlineStatus(`Phòng ${roomId}. ${role}. Link đã sẵn sàng để copy.`);
    };

    const createRoom = async () => {
      if (!supabaseReady) {
        setOnlineStatus("Cần NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY để tạo phòng online.");
        return;
      }

      const roomId = Math.random().toString(36).slice(2, 8).toUpperCase();
      const state = gameApiRef.current?.getState();
      const res = await fetch(apiUrl(), {
        method: "POST",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify({
          id: roomId,
          state,
          white_id: clientIdRef.current,
          black_id: null,
          updated_at: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        setOnlineStatus(`Không tạo được phòng: ${(await res.text()).slice(0, 120)}`);
        return;
      }

      roomRef.current = roomId;
      playerColorRef.current = "w";
      const data = await res.json();
      lastRemoteStampRef.current = data?.[0]?.updated_at || "";
      if (copyRoomBtn) copyRoomBtn.disabled = false;
      if (roomInput) roomInput.value = roomId;
      window.history.replaceState(null, "", `${window.location.pathname}?room=${roomId}`);
      startPolling(roomId);
      setOnlineStatus(`Đã tạo phòng ${roomId}. Bạn cầm quân Trắng, gửi link cho người thứ hai.`);
    };

    const copyRoom = async () => {
      if (!roomRef.current) return;
      await navigator.clipboard.writeText(roomLink(roomRef.current));
      setOnlineStatus(`Đã copy link phòng ${roomRef.current}.`);
    };

    if (!initialized.current) {
      initialized.current = true;
      clientIdRef.current = getClientId();
      gameApiRef.current = initLogic({
        isOnline: () => Boolean(roomRef.current),
        getPlayerColor: () => playerColorRef.current,
        onStateChange: pushState,
      });
    }

    const onCreateRoom = () => void createRoom();
    const onCopyRoom = () => void copyRoom();
    const onJoinRoom = () => {
      const roomId = normalizeRoomId(roomInput?.value || "");
      if (roomId) void enterRoom(roomId);
    };

    createRoomBtn?.addEventListener("click", onCreateRoom);
    copyRoomBtn?.addEventListener("click", onCopyRoom);
    joinRoomBtn?.addEventListener("click", onJoinRoom);

    const urlRoom = new URLSearchParams(window.location.search).get("room");
    if (urlRoom) {
      if (roomInput) roomInput.value = urlRoom;
      void enterRoom(urlRoom);
    }

    return () => {
      stopPolling();
      gameApiRef.current?.cleanup?.();
      createRoomBtn?.removeEventListener("click", onCreateRoom);
      copyRoomBtn?.removeEventListener("click", onCopyRoom);
      joinRoomBtn?.removeEventListener("click", onJoinRoom);
      document.getElementById(styleId)?.remove();
    };
  }, []);

  return (
    <div className="web_chess_2_player-wrapper">
      <Link href="/GameMini" className="back-link">← GameMini</Link>
      <div dangerouslySetInnerHTML={{ __html: chessMarkup }} />
    </div>
  );
}
