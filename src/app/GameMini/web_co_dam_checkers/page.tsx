"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function WebCoDamCheckers() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-web_co_dam_checkers';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `*{box-sizing:border-box}
:root{
  --bg:#181818;--panel:#252525;--card:#303030;--text:#f7f7f7;--muted:#bdbdbd;
  --light:#e9d5a7;--dark:#7b4b2a;--red:#d94b4b;--black:#141414;--green:#5ba84d;--gold:#ffd36b;
}
body{
  margin:0;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:var(--text);
  background:radial-gradient(circle at top,#4a3427 0,#1e1e1e 45%,#080808 100%);
}
.app{
  min-height:100vh;display:grid;grid-template-columns:280px minmax(360px,720px) 300px;
  gap:22px;align-items:center;justify-content:center;padding:22px;
}
.panel{background:rgba(37,37,37,.96);border-radius:22px;padding:20px;box-shadow:0 22px 70px rgba(0,0,0,.38)}
.brand{display:flex;gap:14px;align-items:center;margin-bottom:22px}
.logo{
  width:58px;height:58px;border-radius:18px;display:grid;place-items:center;
  background:linear-gradient(145deg,#ffe2a1,#9b6636);color:#1b1b1b;font-size:42px;font-weight:900;
}
h1,h2,p{margin:0}.brand h1{font-size:32px}.brand p,.label,#hint,.rules li{color:var(--muted)}
.label{font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.card{background:rgba(48,48,48,.98);border-radius:16px;padding:16px;margin-bottom:14px}
.card h2{font-size:26px;margin-bottom:8px}
.score-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.score h2{font-size:42px}
.btn{
  width:100%;border:0;border-radius:14px;padding:14px 16px;margin-top:10px;
  background:#4b4b4b;color:white;font-size:16px;font-weight:900;cursor:pointer;transition:.15s;
}
.btn:hover{transform:translateY(-1px);filter:brightness(1.12)}.primary{background:linear-gradient(180deg,#74b75c,#448d39)}
.board-wrap{display:grid;place-items:center}
.board{
  width:min(88vw,700px);aspect-ratio:1/1;display:grid;grid-template-columns:repeat(8,1fr);grid-template-rows:repeat(8,1fr);
  border:14px solid #21150e;border-radius:18px;overflow:hidden;box-shadow:0 28px 90px rgba(0,0,0,.48);
}
.square{position:relative;display:grid;place-items:center;cursor:pointer;user-select:none}
.square.light{background:var(--light)}.square.dark{background:var(--dark)}
.square.selected{box-shadow:inset 0 0 0 1000px rgba(255,255,0,.32)}
.square.legal::after{
  content:"";width:24%;height:24%;border-radius:50%;background:rgba(0,0,0,.3);position:absolute;
}
.square.capture::after{
  content:"";width:70%;height:70%;border-radius:50%;border:6px solid rgba(0,0,0,.28);position:absolute;
}
.square.last{box-shadow:inset 0 0 0 1000px rgba(255,255,255,.15)}
.piece{
  width:72%;height:72%;border-radius:50%;z-index:3;display:grid;place-items:center;
  box-shadow:0 7px 12px rgba(0,0,0,.42), inset 0 4px 8px rgba(255,255,255,.25);
  border:4px solid rgba(255,255,255,.25);font-size:clamp(18px,4vw,36px);font-weight:900;
}
.piece.black{background:radial-gradient(circle at 35% 25%,#555,#111 58%,#000);color:var(--gold)}
.piece.white{background:radial-gradient(circle at 35% 25%,#fff,#ddd 58%,#aaa);color:#9a1111;border-color:rgba(0,0,0,.2)}
.king{font-size:clamp(22px,4vw,40px)}
.moves{max-height:430px;overflow:auto;margin:0;padding-left:22px;line-height:1.9}
.rules ul{margin:0;padding-left:20px;line-height:1.7}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:grid;place-items:center;z-index:20}
.modal.hidden{display:none}
.modal-card{width:min(420px,92vw);background:var(--panel);border-radius:20px;padding:24px;text-align:center}
.modal-card p{color:var(--muted);margin-top:10px;line-height:1.6}
@media(max-width:1120px){.app{grid-template-columns:1fr}.panel,.board-wrap{width:min(740px,100%);margin:0 auto}}
`;
      document.head.appendChild(style);
    }

    // Run logic once
    if (!initialized.current) {
      initialized.current = true;
      try {
        initLogic();
      } catch(err) {
        console.error("Error running logic for web_co_dam_checkers:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="web_co_dam_checkers-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/GameMini" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: `<main class="app">
    <aside class="panel">
      <div class="brand">
        <div class="logo">⛂</div>
        <div>
          <h1>Cờ Đam</h1>
          <p>Checkers 2 người</p>
        </div>
      </div>

      <div class="card">
        <p class="label">Trạng thái</p>
        <h2 id="status">Lượt Đen</h2>
        <p id="hint">Chọn quân để đi.</p>
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

      <button id="newBtn" class="btn primary">Ván mới</button>
      <button id="undoBtn" class="btn">Hoàn tác</button>
      <button id="flipBtn" class="btn">Lật bàn</button>
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
          <li>Bàn 8x8, mỗi bên 12 quân</li>
          <li>Đen đi trước</li>
          <li>Quân thường đi chéo 1 ô về phía trước</li>
          <li>Bắt quân bằng cách nhảy chéo qua quân đối phương</li>
          <li>Có thể ăn liên tiếp</li>
          <li>Đến cuối bàn sẽ phong vua</li>
          <li>Vua đi và ăn chéo cả hai hướng</li>
        </ul>
      </div>
    </aside>
  </main>

  <div id="winnerModal" class="modal hidden">
    <div class="modal-card">
      <h2 id="winnerTitle">Kết thúc</h2>
      <p id="winnerText"></p>
      <button id="closeModal" class="btn primary">Đóng</button>
    </div>
  </div>` }} />
    </div>
  );
}
