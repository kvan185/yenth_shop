"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function WebHiveCoConTrung() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-web_hive_co_con_trung';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `*{box-sizing:border-box}
:root{
  --bg:#141817;--panel:#202927;--card:#2b3835;--text:#fff8e8;--muted:#c6d1cc;
  --green:#66ad5a;--gold:#ffd46e;--hex:#d8b067;--hex2:#f1d28c;--black:#151515;--white:#f7f1df;
}
body{
  margin:0;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:var(--text);
  background:radial-gradient(circle at top,#3d564e 0,#17201e 45%,#070909 100%);
}
.app{
  min-height:100vh;display:grid;grid-template-columns:300px minmax(520px,900px) 320px;
  gap:22px;align-items:center;justify-content:center;padding:22px;
}
.panel{background:rgba(32,41,39,.96);border-radius:22px;padding:20px;box-shadow:0 22px 70px rgba(0,0,0,.36)}
.brand{display:flex;gap:14px;align-items:center;margin-bottom:22px}
.logo{
  width:58px;height:58px;border-radius:18px;display:grid;place-items:center;
  background:linear-gradient(145deg,#ffe39b,#b9862d);color:#1a211f;font-size:42px;font-weight:900;
}
h1,h2,p{margin:0}.brand h1{font-size:32px}.brand p,.label,#hint,.rules li{color:var(--muted)}
.label{font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.card{background:rgba(43,56,53,.98);border-radius:16px;padding:16px;margin-bottom:14px}
.card h2{font-size:24px;margin-bottom:8px}
.btn{
  width:100%;border:0;border-radius:14px;padding:14px 16px;margin-top:10px;
  background:#4c625c;color:white;font-size:16px;font-weight:900;cursor:pointer;transition:.15s;
}
.btn:hover{transform:translateY(-1px);filter:brightness(1.12)}.primary{background:linear-gradient(180deg,#72bd60,#438e3f)}
.hand{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.hand-piece{
  border:0;border-radius:14px;padding:10px 6px;background:#445852;color:white;cursor:pointer;font-weight:900;
  display:flex;flex-direction:column;align-items:center;gap:4px;transition:.15s;
}
.hand-piece:hover{transform:translateY(-1px);filter:brightness(1.12)}
.hand-piece.selected{outline:4px solid var(--gold)}
.hand-piece.disabled{opacity:.35;cursor:not-allowed}
.bug-icon{font-size:28px}.bug-count{font-size:12px;color:#ead7a2}
.board-wrap{display:grid;place-items:center}
.board{
  position:relative;width:min(94vw,880px);height:min(76vh,760px);min-height:560px;
  background:
    radial-gradient(circle at 50% 50%,rgba(255,255,255,.08),transparent 35%),
    linear-gradient(145deg,#26322f,#131918);
  border:14px solid #0d1210;border-radius:26px;box-shadow:0 28px 90px rgba(0,0,0,.48);
  overflow:hidden;
}
.hex-cell{
  position:absolute;width:74px;height:64px;transform:translate(-50%,-50%);
  clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);
  display:grid;place-items:center;cursor:pointer;z-index:2;
}
.hex-cell.empty{background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.15)}
.hex-cell.legal{background:rgba(255,212,110,.45);filter:drop-shadow(0 0 8px rgba(255,212,110,.7))}
.hex-cell.selected{filter:drop-shadow(0 0 9px white)}
.tile{
  width:72px;height:62px;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);
  display:grid;place-items:center;position:relative;
  background:linear-gradient(145deg,var(--hex2),var(--hex));color:#20150b;font-weight:900;
  box-shadow:0 8px 16px rgba(0,0,0,.45);
}
.tile.black{background:linear-gradient(145deg,#555,#161616);color:#fff}
.tile.white{background:linear-gradient(145deg,#fff,#e6d8b9);color:#111}
.tile .icon{font-size:31px;line-height:1}
.tile .name{position:absolute;bottom:6px;font-size:10px;background:rgba(0,0,0,.45);color:white;border-radius:8px;padding:1px 5px}
.tile .stack{position:absolute;top:5px;right:9px;font-size:12px;background:#d64545;color:white;border-radius:9px;padding:1px 5px}
.moves{max-height:300px;overflow:auto;margin:0;padding-left:22px;line-height:1.85}
.rules ul{margin:0;padding-left:20px;line-height:1.65}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:grid;place-items:center;z-index:20}
.modal.hidden{display:none}
.modal-card{width:min(430px,92vw);background:var(--panel);border-radius:20px;padding:24px;text-align:center}
.modal-card p{color:var(--muted);line-height:1.6;margin-top:10px}
@media(max-width:1180px){.app{grid-template-columns:1fr}.panel,.board-wrap{width:min(930px,100%);margin:0 auto}}
`;
      document.head.appendChild(style);
    }

    // Run logic once
    if (!initialized.current) {
      initialized.current = true;
      try {
        initLogic();
      } catch(err) {
        console.error("Error running logic for web_hive_co_con_trung:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="web_hive_co_con_trung-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/GameMini" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: `<main class="app">
    <aside class="panel">
      <div class="brand">
        <div class="logo">⬢</div>
        <div>
          <h1>Hive</h1>
          <p>Cờ Côn Trùng — không cần bàn</p>
        </div>
      </div>

      <div class="card">
        <p class="label">Trạng thái</p>
        <h2 id="status">Lượt Trắng</h2>
        <p id="hint">Chọn quân trong kho để đặt xuống.</p>
      </div>

      <div class="card">
        <p class="label">Kho Trắng</p>
        <div id="whiteHand" class="hand"></div>
      </div>

      <div class="card">
        <p class="label">Kho Đen</p>
        <div id="blackHand" class="hand"></div>
      </div>

      <button id="newBtn" class="btn primary">Ván mới</button>
      <button id="undoBtn" class="btn">Hoàn tác</button>
    </aside>

    <section class="board-wrap">
      <div id="board" class="board"></div>
    </section>

    <aside class="panel">
      <div class="card">
        <p class="label">Quân đang chọn</p>
        <h2 id="selectedInfo">Chưa chọn</h2>
      </div>

      <div class="card">
        <p class="label">Biên bản</p>
        <ol id="moveList" class="moves"></ol>
      </div>

      <div class="card rules">
        <p class="label">Luật trong bản này</p>
        <ul>
          <li>Không có bàn cố định, quân tạo thành tổ ong</li>
          <li>Ong chúa phải được đặt trước hoặc ở lượt thứ 4 của mỗi bên</li>
          <li>Tổ ong luôn phải liền khối</li>
          <li>Không đặt quân chạm quân đối phương, trừ nước đầu</li>
          <li>Ong đi 1 ô</li>
          <li>Kiến đi quanh tổ ong nhiều ô</li>
          <li>Bọ đi 1 ô và có thể leo lên quân khác</li>
          <li>Châu chấu nhảy qua hàng quân</li>
          <li>Nhện đi đúng 3 bước</li>
          <li>Vây kín Ong chúa đối phương là thắng</li>
        </ul>
      </div>
    </aside>
  </main>

  <div id="modal" class="modal hidden">
    <div class="modal-card">
      <h2>Kết thúc ván</h2>
      <p id="modalText"></p>
      <button id="closeModal" class="btn primary">Đóng</button>
    </div>
  </div>` }} />
    </div>
  );
}
