"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function WebOAnQuan() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-web_o_an_quan';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `*{box-sizing:border-box}
:root{
  --bg:#1b1510;--panel:#2f2318;--card:#423122;--text:#fff5e2;--muted:#d9c5a5;
  --wood:#d29b58;--line:#5b3717;--green:#67a84f;--gold:#ffd978;
}
body{
  margin:0;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:var(--text);
  background:radial-gradient(circle at top,#654126 0,#24170f 48%,#0a0604 100%);
}
.app{
  min-height:100vh;display:grid;grid-template-columns:280px minmax(460px,900px) 300px;
  gap:22px;align-items:center;justify-content:center;padding:22px;
}
.panel{
  background:rgba(47,35,24,.96);border-radius:22px;padding:20px;
  box-shadow:0 22px 70px rgba(0,0,0,.36);
}
.brand{display:flex;gap:14px;align-items:center;margin-bottom:22px}
.logo{
  width:58px;height:58px;border-radius:18px;display:grid;place-items:center;
  background:linear-gradient(145deg,#ffe5a8,#ad7232);
  color:#24150a;font-size:36px;font-weight:900;
}
h1,h2,p{margin:0}
.brand h1{font-size:30px}
.brand p,.label,#hint,.rules li{color:var(--muted)}
.label{font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.card{
  background:rgba(66,49,34,.98);border-radius:16px;padding:16px;margin-bottom:14px;
}
.card h2{font-size:26px;margin-bottom:8px}
.score-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.score h2{font-size:42px}
.btn{
  width:100%;border:0;border-radius:14px;padding:14px 16px;margin-top:10px;
  background:#6c4d32;color:white;font-size:16px;font-weight:900;cursor:pointer;transition:.15s;
}
.btn:hover{transform:translateY(-1px);filter:brightness(1.12)}
.primary{background:linear-gradient(180deg,#76b85d,#448e3f)}
.board-wrap{display:grid;place-items:center}
.board{
  width:min(94vw,880px);
  aspect-ratio:16/7;
  position:relative;
  background:linear-gradient(145deg,#e2b26f,var(--wood));
  border:16px solid #4b2b12;
  border-radius:28px;
  box-shadow:0 28px 90px rgba(0,0,0,.46), inset 0 0 0 5px rgba(255,255,255,.16);
  overflow:hidden;
}
.cell{
  position:absolute;
  border:4px solid rgba(91,55,23,.85);
  border-radius:22px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition:.12s;
}
.cell:hover{filter:brightness(1.06)}
.cell.active{outline:6px solid rgba(255,255,255,.8)}
.cell.quan{
  width:14%;
  height:78%;
  top:11%;
  background:rgba(255,232,177,.28);
}
.cell.dan{
  width:14%;
  height:32%;
  background:rgba(255,255,255,.08);
}
#qLeft{left:1%}
#qRight{right:1%}
.top-row{top:8%}
.bot-row{bottom:8%}
.seed-wrap{
  display:flex;
  flex-wrap:wrap;
  gap:5px;
  justify-content:center;
  align-items:center;
  max-width:88%;
}
.seed{
  width:13px;
  height:13px;
  border-radius:50%;
  background:#f7ead2;
  box-shadow:0 2px 4px rgba(0,0,0,.35);
}
.quan-seed{
  width:22px;
  height:22px;
  border-radius:50%;
  background:radial-gradient(circle at 35% 25%,#fff4c2,#d2a03b 65%,#8b5b19);
  border:2px solid rgba(0,0,0,.25);
}
.cell-title{
  font-size:14px;
  font-weight:900;
  color:#4d2c10;
  margin-bottom:6px;
}
.count{
  margin-top:6px;
  font-size:18px;
  font-weight:900;
  color:#4d2c10;
}
.moves{
  max-height:430px;
  overflow:auto;
  margin:0;
  padding-left:22px;
  line-height:1.9;
}
.rules ul{
  margin:0;
  padding-left:20px;
  line-height:1.7;
}
.modal{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.65);
  display:grid;
  place-items:center;
  z-index:20;
}
.hidden{display:none}
.modal-card{
  width:min(420px,92vw);
  background:var(--panel);
  border-radius:20px;
  padding:24px;
  text-align:center;
}
.modal-card p{
  color:var(--muted);
  line-height:1.6;
  margin-top:10px;
}
.dir-buttons{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  margin-top:16px;
}
@media(max-width:1180px){
  .app{grid-template-columns:1fr}
  .panel,.board-wrap{width:min(900px,100%);margin:0 auto}
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
        console.error("Error running logic for web_o_an_quan:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="web_o_an_quan-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/GameMini" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: `<main class="app">
    <aside class="panel">
      <div class="brand">
        <div class="logo">◉</div>
        <div>
          <h1>Ô Ăn Quan</h1>
          <p>2 người chơi cùng máy</p>
        </div>
      </div>

      <div class="card">
        <p class="label">Trạng thái</p>
        <h2 id="status">Lượt Người chơi 1</h2>
        <p id="hint">Chọn ô bên mình để rải quân.</p>
      </div>

      <div class="score-grid">
        <div class="card score">
          <p class="label">Người chơi 1</p>
          <h2 id="score1">0</h2>
        </div>
        <div class="card score">
          <p class="label">Người chơi 2</p>
          <h2 id="score2">0</h2>
        </div>
      </div>

      <button id="newBtn" class="btn primary">Ván mới</button>
      <button id="undoBtn" class="btn">Hoàn tác</button>
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
        <p class="label">Luật trong bản này</p>
        <ul>
          <li>5 ô dân mỗi bên và 2 ô quan</li>
          <li>Rải quân theo chiều chọn</li>
          <li>Ăn quân khi gặp ô trống rồi tới ô có quân</li>
          <li>Quan tính 10 điểm</li>
          <li>Hết quân bên mình sẽ vay quân</li>
          <li>Hết quan thì kết thúc ván</li>
        </ul>
      </div>
    </aside>
  </main>

  <div id="dirModal" class="modal hidden">
    <div class="modal-card">
      <h2>Chọn hướng rải</h2>
      <div class="dir-buttons">
        <button id="leftBtn" class="btn">← Trái</button>
        <button id="rightBtn" class="btn primary">Phải →</button>
      </div>
    </div>
  </div>

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
