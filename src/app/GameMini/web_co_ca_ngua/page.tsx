"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function WebCoCaNgua() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-web_co_ca_ngua';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `*{box-sizing:border-box}
:root{
  --bg:#151b25;--panel:#202a3a;--card:#2b3850;--text:#fff8e8;--muted:#c7d1e1;
  --red:#e44848;--blue:#3180e8;--green:#45a852;--yellow:#f1c84b;--path:#f5ddb0;
}
body{
  margin:0;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:var(--text);
  background:radial-gradient(circle at top,#384e74 0,#182030 48%,#070a10 100%);
}
.app{
  min-height:100vh;display:grid;grid-template-columns:280px minmax(460px,720px) 310px;
  gap:22px;align-items:center;justify-content:center;padding:22px;
}
.panel{background:rgba(32,42,58,.96);border-radius:22px;padding:20px;box-shadow:0 22px 70px rgba(0,0,0,.36)}
.brand{display:flex;gap:14px;align-items:center;margin-bottom:22px}
.logo{width:58px;height:58px;border-radius:18px;display:grid;place-items:center;background:linear-gradient(145deg,#fff0a8,#e49c2a);color:#1b2533;font-size:40px;font-weight:900}
h1,h2,p{margin:0}.brand h1{font-size:30px}.brand p,.label,label,#hint,.rules li{color:var(--muted)}
.label{font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.card{background:rgba(43,56,80,.98);border-radius:16px;padding:16px;margin-bottom:14px}
.card h2{font-size:26px;margin-bottom:8px}
select{width:100%;padding:12px;border:0;border-radius:12px;margin:8px 0 10px;background:#f7e4b6;color:#142033;font-weight:900}
.btn{
  width:100%;border:0;border-radius:14px;padding:14px 16px;margin-top:10px;background:#4b5d7c;color:white;
  font-size:16px;font-weight:900;cursor:pointer;transition:.15s;
}
.btn:hover{transform:translateY(-1px);filter:brightness(1.12)}.primary{background:linear-gradient(180deg,#65b95d,#3d8e43)}
.hidden{display:none!important}
.dice{text-align:center;font-size:54px;margin:14px 0;padding:10px;background:#172033;border-radius:16px}
.board-wrap{display:grid;place-items:center}
.board{
  position:relative;width:min(90vw,690px);aspect-ratio:1/1;background:#f5ddb0;border:14px solid #152033;
  border-radius:28px;box-shadow:0 28px 90px rgba(0,0,0,.45);overflow:hidden;
}
.center{
  position:absolute;left:37%;top:37%;width:26%;height:26%;background:linear-gradient(145deg,#fff4c7,#d7a84e);
  clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);display:grid;place-items:center;text-align:center;
  color:#172033;font-weight:900;font-size:clamp(18px,4vw,34px);z-index:1;
}
.home{
  position:absolute;width:30%;height:30%;border-radius:24px;display:grid;grid-template-columns:1fr 1fr;gap:12%;padding:5%;
  border:5px solid rgba(255,255,255,.72);box-shadow:inset 0 0 0 4px rgba(0,0,0,.12);
}
.home.red{left:3%;top:3%;background:rgba(228,72,72,.82)}
.home.blue{right:3%;top:3%;background:rgba(49,128,232,.82)}
.home.green{right:3%;bottom:3%;background:rgba(69,168,82,.82)}
.home.yellow{left:3%;bottom:3%;background:rgba(241,200,75,.88)}
.home-slot{border-radius:50%;background:rgba(255,255,255,.55);display:grid;place-items:center;border:3px solid rgba(0,0,0,.18)}
.path-cell,.finish-cell{
  position:absolute;width:6.3%;height:6.3%;border-radius:50%;background:var(--path);border:2px solid rgba(0,0,0,.25);
  display:grid;place-items:center;transform:translate(-50%,-50%);cursor:pointer;z-index:3;
}
.path-cell.safe{box-shadow:0 0 0 4px rgba(255,255,255,.65)}
.finish-cell.red{background:#ffb0b0}.finish-cell.blue{background:#aecdff}.finish-cell.green{background:#b8efbc}.finish-cell.yellow{background:#ffe994}
.path-cell.legal,.finish-cell.legal{outline:5px solid rgba(255,255,255,.9)}
.piece{
  width:75%;height:75%;border-radius:50%;border:3px solid white;box-shadow:0 5px 9px rgba(0,0,0,.42);
  display:grid;place-items:center;font-size:clamp(13px,2.2vw,20px);font-weight:900;color:white;z-index:5;
}
.piece.red{background:var(--red)}.piece.blue{background:var(--blue)}.piece.green{background:var(--green);}.piece.yellow{background:#d8a900;color:#222}
.player{display:grid;grid-template-columns:18px 1fr;gap:10px;padding:10px;background:#1b2536;border-radius:12px;margin-bottom:8px}
.player.active{outline:3px solid #fff}.dot{width:18px;height:18px;border-radius:50%;border:2px solid #fff}
.log{max-height:260px;overflow:auto;display:flex;flex-direction:column;gap:8px}
.log div{background:#1b2536;border-radius:10px;padding:9px;font-size:14px;line-height:1.35}
.rules ul{margin:0;padding-left:20px;line-height:1.7}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:grid;place-items:center;z-index:30}
.modal.hidden{display:none}
.modal-card{width:min(420px,92vw);background:var(--panel);border-radius:20px;padding:24px;text-align:center}
.modal-card p{color:var(--muted);line-height:1.6;margin-top:10px}
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
        console.error("Error running logic for web_co_ca_ngua:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="web_co_ca_ngua-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/GameMini" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: `<main class="app">
    <aside class="panel">
      <div class="brand">
        <div class="logo">♞</div>
        <div>
          <h1>Cờ Cá Ngựa</h1>
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
        <button id="startBtn" class="btn primary">Bắt đầu</button>
      </div>

      <div id="controls" class="card hidden">
        <p class="label">Lượt hiện tại</p>
        <h2 id="turnTitle">Đỏ</h2>
        <p id="hint">Gieo xúc xắc để đi.</p>
        <div id="dice" class="dice">🎲</div>
        <button id="rollBtn" class="btn primary">Gieo xúc xắc</button>
        <button id="endBtn" class="btn">Bỏ lượt</button>
      </div>

      <button id="newBtn" class="btn">Ván mới</button>
    </aside>

    <section class="board-wrap">
      <div id="board" class="board"></div>
    </section>

    <aside class="panel">
      <div class="card">
        <p class="label">Người chơi</p>
        <div id="players"></div>
      </div>

      <div class="card">
        <p class="label">Nhật ký</p>
        <div id="log" class="log"></div>
      </div>

      <div class="card rules">
        <p class="label">Luật trong bản này</p>
        <ul>
          <li>Gieo 6 mới được xuất quân</li>
          <li>Gieo 6 được thêm lượt</li>
          <li>Đứng vào ô có quân đối thủ sẽ đá về nhà</li>
          <li>Mỗi người có 4 quân</li>
          <li>Đưa đủ 4 quân về đích là thắng</li>
        </ul>
      </div>
    </aside>
  </main>

  <div id="modal" class="modal hidden">
    <div class="modal-card">
      <h2 id="modalTitle">Kết thúc</h2>
      <p id="modalText"></p>
      <button id="closeModal" class="btn primary">Đóng</button>
    </div>
  </div>` }} />
    </div>
  );
}
