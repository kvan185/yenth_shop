"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function WebCoTuong2Nguoi() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-web_co_tuong_2_nguoi';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `* {
  box-sizing: border-box;
}

:root {
  --bg: #22130c;
  --panel: #321b10;
  --card: #442515;
  --wood: #d9a15c;
  --line: #5a2e14;
  --red: #bd1f1f;
  --black: #171717;
  --text: #fff7e8;
  --muted: #d9c3a0;
  --green: #4f8f3a;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(255, 190, 100, 0.2), transparent 30%),
    linear-gradient(135deg, #1a0e08, #2b160c 60%, #120907);
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text);
}

.app {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 290px minmax(360px, 690px) 300px;
  gap: 22px;
  align-items: center;
  justify-content: center;
  padding: 22px;
}

.side-panel {
  background: rgba(50, 27, 16, 0.96);
  border-radius: 22px;
  padding: 20px;
  box-shadow: 0 22px 60px rgba(0,0,0,0.35);
}

.brand {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(145deg, #f4c27a, #b97835);
  color: var(--red);
  border: 3px solid #6b3415;
  font-size: 34px;
  font-weight: 900;
  font-family: "Times New Roman", serif;
}

h1, h2, p {
  margin: 0;
}

.brand h1 {
  font-size: 30px;
}

.brand p,
.label,
#hint {
  color: var(--muted);
}

.label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.card {
  background: rgba(68, 37, 21, 0.95);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 14px;
}

.card h2 {
  font-size: 25px;
  margin-bottom: 8px;
}

.captured {
  min-height: 42px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mini-piece {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #f2c47d;
  border: 2px solid #703b18;
  font-family: "Times New Roman", serif;
  font-weight: 900;
}

.mini-piece.red {
  color: var(--red);
}

.mini-piece.black {
  color: var(--black);
}

.btn {
  width: 100%;
  padding: 14px 16px;
  border: 0;
  border-radius: 14px;
  margin-top: 10px;
  background: #694021;
  color: white;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.15s;
}

.btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.12);
}

.primary {
  background: linear-gradient(180deg, #d14736, #98221a);
}

.board-section {
  display: grid;
  place-items: center;
}

.board {
  position: relative;
  width: min(90vw, 630px);
  aspect-ratio: 8 / 9;
  background: #d9a15c;
  border: 14px solid #5b2e14;
  border-radius: 14px;
  box-shadow: 0 28px 80px rgba(0,0,0,0.42), inset 0 0 0 4px rgba(255,255,255,0.15);
  overflow: hidden;
}

.board::before {
  content: "楚河        漢界";
  position: absolute;
  left: 0;
  right: 0;
  top: 44.5%;
  height: 11%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: clamp(16px, 5vw, 42px);
  font-family: "Times New Roman", serif;
  font-size: clamp(24px, 5vw, 42px);
  color: rgba(90, 46, 20, 0.5);
  pointer-events: none;
}

.grid-line {
  position: absolute;
  background: var(--line);
  opacity: 0.9;
}

.h-line {
  height: 2px;
  left: 6.25%;
  right: 6.25%;
}

.v-line {
  width: 2px;
  top: 5.55%;
  bottom: 5.55%;
}

.v-line.river-gap {
  background: linear-gradient(to bottom, var(--line) 0 43.5%, transparent 43.5% 56.5%, var(--line) 56.5% 100%);
}

.diagonal {
  position: absolute;
  height: 2px;
  background: var(--line);
  transform-origin: left center;
}

.point {
  position: absolute;
  width: 42px;
  height: 42px;
  margin-left: -21px;
  margin-top: -21px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  z-index: 2;
}

.point.selected {
  outline: 5px solid rgba(255, 255, 0, 0.7);
}

.point.legal::after {
  content: "";
  width: 18px;
  height: 18px;
  background: rgba(30, 30, 30, 0.28);
  border-radius: 50%;
}

.point.capture::after {
  content: "";
  position: absolute;
  width: 52px;
  height: 52px;
  border: 5px solid rgba(30, 30, 30, 0.32);
  border-radius: 50%;
}

.point.last {
  background: rgba(255, 255, 0, 0.22);
}

.piece {
  width: clamp(38px, 7vw, 58px);
  height: clamp(38px, 7vw, 58px);
  border-radius: 50%;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 35% 25%, #ffe1a7, #efbd70 55%, #b66a2e);
  border: 4px solid #6c3413;
  box-shadow: 0 5px 10px rgba(0,0,0,0.28), inset 0 0 0 3px rgba(255,255,255,0.22);
  font-family: "Times New Roman", serif;
  font-size: clamp(24px, 5vw, 40px);
  font-weight: 900;
  z-index: 5;
}

.piece.red {
  color: var(--red);
}

.piece.black {
  color: var(--black);
}

.timer {
  display: grid;
  gap: 14px;
}

.timer h2 {
  font-size: 36px;
}

.moves-card {
  max-height: 360px;
  overflow: auto;
}

#moveList {
  margin: 0;
  padding-left: 22px;
  line-height: 1.9;
}

.rules ul {
  margin: 0;
  padding-left: 20px;
  line-height: 1.7;
  color: #efd9b7;
}

@media (max-width: 1180px) {
  .app {
    grid-template-columns: 1fr;
  }

  .side-panel,
  .board-section {
    width: min(700px, 100%);
    margin: 0 auto;
  }
}
`;
      document.head.appendChild(style);
    }

    // Run logic once
    if (!initialized.current) {
      initialized.current = true;
      try {
        initLogic();
      } catch(err) {
        console.error("Error running logic for web_co_tuong_2_nguoi:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="web_co_tuong_2_nguoi-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/GameMini" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: `<main class="app">
    <section class="side-panel">
      <div class="brand">
        <div class="logo">帥</div>
        <div>
          <h1>Cờ Tướng</h1>
          <p>2 người chơi cùng máy</p>
        </div>
      </div>

      <div class="card">
        <p class="label">Trạng thái</p>
        <h2 id="status">Lượt Đỏ</h2>
        <p id="hint">Chọn quân đỏ để đi.</p>
      </div>

      <div class="card">
        <p class="label">Quân đỏ đã ăn</p>
        <div id="redCaptured" class="captured"></div>
      </div>

      <div class="card">
        <p class="label">Quân đen đã ăn</p>
        <div id="blackCaptured" class="captured"></div>
      </div>

      <button id="newGame" class="btn primary">Ván mới</button>
      <button id="undo" class="btn">Hoàn tác</button>
      <button id="flip" class="btn">Lật bàn cờ</button>
    </section>

    <section class="board-section">
      <div id="board" class="board"></div>
    </section>

    <section class="side-panel moves-panel">
      <div class="card timer">
        <div>
          <p class="label">Đen</p>
          <h2 id="blackTimer">15:00</h2>
        </div>
        <div>
          <p class="label">Đỏ</p>
          <h2 id="redTimer">15:00</h2>
        </div>
      </div>

      <div class="card moves-card">
        <p class="label">Biên bản</p>
        <ol id="moveList"></ol>
      </div>

      <div class="card rules">
        <p class="label">Tính năng</p>
        <ul>
          <li>Đi đúng luật cơ bản từng quân</li>
          <li>Tướng không được đối mặt</li>
          <li>Báo chiếu và chiếu hết</li>
          <li>Đồng hồ 15 phút</li>
          <li>Hoàn tác nước đi</li>
        </ul>
      </div>
    </section>
  </main>` }} />
    </div>
  );
}
