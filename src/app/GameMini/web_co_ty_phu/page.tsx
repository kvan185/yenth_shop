"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function WebCoTyPhu() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-web_co_ty_phu';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `*{box-sizing:border-box}
:root{
  --bg:#152018;--panel:#213326;--card:#2b4632;--text:#fff8e8;--muted:#c7d4c1;
  --gold:#f3c567;--green:#48a860;--red:#db4c4c;--blue:#4e8fe8;--purple:#9a62d9;
}
body{
  margin:0;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:var(--text);
  background:radial-gradient(circle at top,#335c38 0,#18251b 45%,#090f0b 100%);
}
.app{min-height:100vh;display:grid;grid-template-columns:290px minmax(520px,780px) 310px;gap:22px;align-items:center;justify-content:center;padding:22px}
.panel{background:rgba(33,51,38,.96);border-radius:22px;padding:20px;box-shadow:0 22px 70px rgba(0,0,0,.35)}
.brand{display:flex;gap:14px;align-items:center;margin-bottom:20px}
.logo{width:58px;height:58px;border-radius:18px;display:grid;place-items:center;background:linear-gradient(145deg,#ffe69a,#d99d22);color:#17351d;font-size:40px;font-weight:900}
h1,h2,p{margin:0}.brand h1{font-size:30px}.brand p,.label,label,.rules li{color:var(--muted)}
.label{font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.card{background:rgba(43,70,50,.98);border-radius:16px;padding:16px;margin-bottom:14px}
select{width:100%;padding:12px;border:0;border-radius:12px;margin:8px 0 10px;background:#f8e5b5;color:#162a19;font-weight:800}
.btn{width:100%;border:0;border-radius:14px;padding:14px 16px;margin-top:10px;background:#4f704e;color:white;font-size:16px;font-weight:900;cursor:pointer;transition:.15s}
.btn:hover{transform:translateY(-1px);filter:brightness(1.12)}.primary{background:linear-gradient(180deg,#68c06d,#378d43)}
.hidden{display:none!important}
.dice{font-size:36px;text-align:center;margin:14px 0;padding:12px;border-radius:14px;background:#1b2d20}
.board-wrap{display:grid;place-items:center}
.board{width:min(92vw,760px);aspect-ratio:1/1;display:grid;grid-template-columns:repeat(11,1fr);grid-template-rows:repeat(11,1fr);gap:3px;background:#152018;border:12px solid #0e160f;border-radius:20px;box-shadow:0 28px 90px rgba(0,0,0,.45);padding:6px}
.tile{position:relative;background:#f7e1a6;color:#17351d;border-radius:9px;padding:5px;overflow:hidden;border:2px solid rgba(0,0,0,.16);display:flex;flex-direction:column;justify-content:space-between;font-size:11px;font-weight:800}
.tile.center{grid-column:2/11;grid-row:2/11;background:linear-gradient(145deg,#25482c,#17351d);color:#ffeaa8;display:grid;place-items:center;text-align:center;font-size:42px;line-height:1.15;border:0}
.strip{height:9px;border-radius:8px;margin:-2px -2px 3px}
.tile-name{line-height:1.1}.tile-price{font-size:10px;opacity:.78}.tokens{display:flex;flex-wrap:wrap;gap:2px;min-height:14px}
.token{width:15px;height:15px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4)}
.p0{background:#e53935}.p1{background:#1e88e5}.p2{background:#43a047}.p3{background:#8e24aa}
.owner{position:absolute;right:3px;top:3px;width:13px;height:13px;border-radius:50%;border:1px solid #fff}
.player{display:grid;grid-template-columns:18px 1fr;gap:10px;padding:10px;border-radius:12px;background:#203523;margin-bottom:8px}
.player.bankrupt{opacity:.45;text-decoration:line-through}.money{font-weight:900;color:#ffe38e}.props{font-size:12px;color:var(--muted);margin-top:4px}
.log{max-height:260px;overflow:auto;display:flex;flex-direction:column;gap:8px}
.log div{background:#203523;border-radius:10px;padding:9px;color:#e5efd7;font-size:14px;line-height:1.35}
.rules ul{margin:0;padding-left:20px;line-height:1.7}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:grid;place-items:center;z-index:20}
.modal-card{background:#213326;border-radius:20px;padding:24px;width:min(430px,92vw);text-align:center}
.modal-card p{color:var(--muted);line-height:1.6;margin-top:10px}
@media(max-width:1180px){.app{grid-template-columns:1fr}.panel,.board-wrap{width:min(800px,100%);margin:0 auto}.board{width:min(96vw,760px)}}
`;
      document.head.appendChild(style);
    }

    // Run logic once
    if (!initialized.current) {
      initialized.current = true;
      try {
        initLogic();
      } catch(err) {
        console.error("Error running logic for web_co_ty_phu:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="web_co_ty_phu-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/GameMini" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: `<main class="app">
    <section class="left panel">
      <div class="brand">
        <div class="logo">₫</div>
        <div>
          <h1>Cờ Tỷ Phú</h1>
          <p>2–4 người chơi cùng máy</p>
        </div>
      </div>

      <div id="setup" class="card">
        <p class="label">Thiết lập</p>
        <label>Số người chơi</label>
        <select id="playerCount">
          <option value="2">2 người</option>
          <option value="3">3 người</option>
          <option value="4" selected>4 người</option>
        </select>
        <button id="startBtn" class="btn primary">Bắt đầu ván</button>
      </div>

      <div id="gameControls" class="card hidden">
        <p class="label">Lượt hiện tại</p>
        <h2 id="turnTitle">Người chơi 1</h2>
        <p id="turnInfo">Bấm gieo xúc xắc.</p>
        <div class="dice" id="dice">🎲 🎲</div>
        <button id="rollBtn" class="btn primary">Gieo xúc xắc</button>
        <button id="buyBtn" class="btn hidden">Mua ô này</button>
        <button id="endBtn" class="btn">Kết thúc lượt</button>
      </div>

      <button id="newBtn" class="btn">Ván mới</button>
    </section>

    <section class="board-wrap">
      <div id="board" class="board"></div>
    </section>

    <section class="right panel">
      <div class="card">
        <p class="label">Người chơi</p>
        <div id="players"></div>
      </div>

      <div class="card log-card">
        <p class="label">Nhật ký</p>
        <div id="log" class="log"></div>
      </div>

      <div class="card rules">
        <p class="label">Luật nhanh</p>
        <ul>
          <li>Qua ô Xuất phát nhận 2.000₫</li>
          <li>Đất chưa ai mua có thể mua</li>
          <li>Đứng vào đất người khác phải trả thuê</li>
          <li>Hết tiền sẽ phá sản</li>
          <li>Còn 1 người là thắng</li>
        </ul>
      </div>
    </section>
  </main>

  <div id="modal" class="modal hidden">
    <div class="modal-card">
      <h2 id="modalTitle"></h2>
      <p id="modalText"></p>
      <button id="modalClose" class="btn primary">Đóng</button>
    </div>
  </div>` }} />
    </div>
  );
}
