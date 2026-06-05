"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function WebCoVay2Nguoi() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-web_co_vay_2_nguoi';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `* {
  box-sizing: border-box;
}

:root {
  --bg: #1f1710;
  --panel: #312214;
  --card: #412c18;
  --board: #d7a45f;
  --line: #4e2c12;
  --text: #fff4df;
  --muted: #dfc7a2;
  --green: #5e8f3d;
  --danger: #a33124;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(255, 210, 140, 0.18), transparent 30%),
    linear-gradient(135deg, #150e09, #2a1a0e 60%, #100905);
  color: var(--text);
  font-family: Arial, Helvetica, sans-serif;
}

.app {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px minmax(360px, 760px) 300px;
  gap: 22px;
  align-items: center;
  justify-content: center;
  padding: 22px;
}

.panel {
  background: rgba(49, 34, 20, 0.96);
  border-radius: 22px;
  padding: 20px;
  box-shadow: 0 20px 65px rgba(0,0,0,0.34);
}

.brand {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 22px;
}

.logo {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #f0c780, #a66b32);
  color: #111;
  font-size: 42px;
  box-shadow: inset 0 0 0 3px rgba(255,255,255,0.2);
}

h1, h2, p {
  margin: 0;
}

.brand h1 {
  font-size: 32px;
}

.brand p,
.label,
#hint,
.rules li {
  color: var(--muted);
}

.label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.card {
  background: rgba(65, 44, 24, 0.98);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 14px;
}

.card h2 {
  font-size: 26px;
  margin-bottom: 8px;
}

.score-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.score h2 {
  font-size: 42px;
}

.controls {
  margin-bottom: 14px;
}

.btn {
  width: 100%;
  border: 0;
  border-radius: 14px;
  padding: 14px 16px;
  margin-top: 10px;
  background: #6a4828;
  color: white;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
  transition: 0.15s;
}

.btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.12);
}

.primary {
  background: linear-gradient(180deg, #75a84e, #4f7e32);
}

select {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 0;
  background: #efd3a2;
  color: #2c1809;
  font-size: 16px;
  font-weight: 700;
}

.board-wrap {
  display: grid;
  place-items: center;
}

.board {
  position: relative;
  width: min(88vw, 740px);
  aspect-ratio: 1 / 1;
  background:
    radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 25%),
    linear-gradient(135deg, #e0b16b, var(--board));
  border: 16px solid #5b3417;
  border-radius: 18px;
  box-shadow: 0 28px 90px rgba(0,0,0,0.42), inset 0 0 0 4px rgba(255,255,255,0.18);
  overflow: hidden;
}

.line {
  position: absolute;
  background: var(--line);
  opacity: 0.9;
}

.h-line {
  height: 2px;
}

.v-line {
  width: 2px;
}

.star {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--line);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.point {
  position: absolute;
  transform: translate(-50%, -50%);
  width: clamp(22px, 3.1vw, 34px);
  height: clamp(22px, 3.1vw, 34px);
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  z-index: 3;
}

.point:hover {
  background: rgba(255,255,255,0.18);
}

.stone {
  width: clamp(20px, 3vw, 33px);
  height: clamp(20px, 3vw, 33px);
  border-radius: 50%;
  box-shadow: 0 4px 9px rgba(0,0,0,0.4);
}

.stone.black {
  background: radial-gradient(circle at 35% 28%, #555, #111 60%, #000);
}

.stone.white {
  background: radial-gradient(circle at 35% 28%, #fff, #e8e8e8 60%, #bcbcbc);
  border: 1px solid rgba(0,0,0,0.25);
}

.point.last::after {
  content: "";
  width: 9px;
  height: 9px;
  background: #d62828;
  border-radius: 50%;
  position: absolute;
}

.moves {
  max-height: 440px;
  overflow: auto;
  padding-left: 22px;
  line-height: 1.9;
  margin: 0;
}

.rules ul {
  margin: 0;
  padding-left: 20px;
  line-height: 1.7;
}

.modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.65);
  z-index: 10;
}

.modal.hidden {
  display: none;
}

.modal-card {
  width: min(420px, 92vw);
  background: var(--panel);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
}

.modal-card p {
  color: var(--muted);
  line-height: 1.6;
  margin-top: 10px;
}

@media (max-width: 1180px) {
  .app {
    grid-template-columns: 1fr;
  }

  .panel,
  .board-wrap {
    width: min(780px, 100%);
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
        console.error("Error running logic for web_co_vay_2_nguoi:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="web_co_vay_2_nguoi-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/GameMini" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: `<main class="app">
    <aside class="panel">
      <div class="brand">
        <div class="logo">●</div>
        <div>
          <h1>Cờ Vây</h1>
          <p>2 người chơi cùng máy</p>
        </div>
      </div>

      <div class="card">
        <p class="label">Trạng thái</p>
        <h2 id="status">Lượt Đen</h2>
        <p id="hint">Bấm vào giao điểm để đặt quân.</p>
      </div>

      <div class="score-grid">
        <div class="card score">
          <p class="label">Đen ăn</p>
          <h2 id="blackScore">0</h2>
        </div>
        <div class="card score">
          <p class="label">Trắng ăn</p>
          <h2 id="whiteScore">0</h2>
        </div>
      </div>

      <div class="controls">
        <button id="passBtn" class="btn primary">Bỏ lượt</button>
        <button id="undoBtn" class="btn">Hoàn tác</button>
        <button id="newBtn" class="btn">Ván mới</button>
      </div>

      <div class="card">
        <p class="label">Kích thước bàn</p>
        <select id="boardSize">
          <option value="19" selected>19 x 19</option>
          <option value="13">13 x 13</option>
          <option value="9">9 x 9</option>
        </select>
      </div>
    </aside>

    <section class="board-wrap">
      <div id="board" class="board"></div>
    </section>

    <aside class="panel">
      <div class="card">
        <p class="label">Biên bản</p>
        <ol id="moveList" class="moves"></ol>
      </div>

      <div class="card rules">
        <p class="label">Luật có trong bản này</p>
        <ul>
          <li>Đen đi trước</li>
          <li>Đặt quân trên giao điểm</li>
          <li>Ăn quân khi nhóm hết khí</li>
          <li>Không được tự sát</li>
          <li>Không lặp lại bàn cờ ngay lập tức</li>
          <li>Hai bên bỏ lượt liên tiếp thì kết thúc</li>
        </ul>
      </div>
    </aside>
  </main>

  <div id="endModal" class="modal hidden">
    <div class="modal-card">
      <h2>Kết thúc ván</h2>
      <p id="endText"></p>
      <button id="closeEnd" class="btn primary">Đóng</button>
    </div>
  </div>` }} />
    </div>
  );
}
