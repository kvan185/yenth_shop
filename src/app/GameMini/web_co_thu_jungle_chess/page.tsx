"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { initLogic } from './logic';

export default function WebCoThuJungleChess() {
  const initialized = useRef(false);

  useEffect(() => {
    // Inject CSS
    const styleId = 'style-web_co_thu_jungle_chess';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `*{box-sizing:border-box}
:root{
  --bg:#102018;--panel:#1d3527;--card:#294634;--text:#fff9e9;--muted:#c8d8c2;
  --grass:#93bd62;--grass2:#78a94a;--water:#4ca3c7;--trap:#d5a447;--den:#5a3a25;
  --blue:#2875d9;--red:#d33d36;--gold:#ffd46b;
}
body{
  margin:0;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:var(--text);
  background:radial-gradient(circle at top,#345d3e 0,#13241a 48%,#060c08 100%);
}
.app{
  min-height:100vh;display:grid;grid-template-columns:280px minmax(360px,620px) 310px;
  gap:22px;align-items:center;justify-content:center;padding:22px;
}
.panel{background:rgba(29,53,39,.96);border-radius:22px;padding:20px;box-shadow:0 22px 70px rgba(0,0,0,.35)}
.brand{display:flex;gap:14px;align-items:center;margin-bottom:22px}
.logo{width:58px;height:58px;border-radius:18px;display:grid;place-items:center;background:linear-gradient(145deg,#ffe08d,#7daa3f);font-size:38px}
h1,h2,p{margin:0}.brand h1{font-size:32px}.brand p,.label,#hint,.rules li{color:var(--muted)}
.label{font-size:13px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.card{background:rgba(41,70,52,.98);border-radius:16px;padding:16px;margin-bottom:14px}
.card h2{font-size:26px;margin-bottom:8px}
.btn{
  width:100%;border:0;border-radius:14px;padding:14px 16px;margin-top:10px;
  background:#526d47;color:white;font-size:16px;font-weight:900;cursor:pointer;transition:.15s;
}
.btn:hover{transform:translateY(-1px);filter:brightness(1.12)}.primary{background:linear-gradient(180deg,#69b95a,#3f8d3d)}
.captured{display:flex;flex-wrap:wrap;gap:8px;min-height:42px}
.mini{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:#f5d58a;border:2px solid #63421c;font-size:21px}
.board-wrap{display:grid;place-items:center}
.board{
  width:min(88vw,560px);aspect-ratio:7/9;display:grid;grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(9,1fr);
  gap:4px;background:#18311f;border:12px solid #0d1b11;border-radius:20px;padding:6px;box-shadow:0 28px 90px rgba(0,0,0,.45);
}
.cell{
  position:relative;border-radius:12px;background:linear-gradient(145deg,var(--grass),var(--grass2));
  display:grid;place-items:center;cursor:pointer;overflow:hidden;border:2px solid rgba(0,0,0,.15);
}
.cell.water{background:linear-gradient(145deg,#62c5ed,var(--water))}
.cell.trap{background:linear-gradient(145deg,#ffd97a,var(--trap))}
.cell.den{background:linear-gradient(145deg,#7d5230,var(--den))}
.cell.selected{outline:5px solid rgba(255,255,0,.72)}
.cell.legal::after{content:"";width:22%;height:22%;border-radius:50%;background:rgba(0,0,0,.32);position:absolute}
.cell.capture::after{content:"";width:70%;height:70%;border-radius:50%;border:6px solid rgba(0,0,0,.3);position:absolute}
.cell.last{box-shadow:inset 0 0 0 1000px rgba(255,255,255,.16)}
.terrain{position:absolute;left:4px;top:3px;font-size:12px;font-weight:900;color:rgba(0,0,0,.45);z-index:1}
.piece{
  width:78%;height:78%;border-radius:50%;display:grid;place-items:center;z-index:4;
  background:radial-gradient(circle at 35% 25%,#ffe9ac,#d99a42 60%,#8c5821);
  border:4px solid rgba(80,45,15,.75);box-shadow:0 7px 12px rgba(0,0,0,.38), inset 0 3px 7px rgba(255,255,255,.32);
  font-size:clamp(24px,6vw,42px);
}
.piece.blue{box-shadow:0 0 0 4px var(--blue),0 7px 12px rgba(0,0,0,.38);background:radial-gradient(circle at 35% 25%,#d7ecff,#6ca8ee 60%,#2563b5)}
.piece.red{box-shadow:0 0 0 4px var(--red),0 7px 12px rgba(0,0,0,.38);background:radial-gradient(circle at 35% 25%,#ffe2df,#ee8078 60%,#b52f2a)}
.rank{
  position:absolute;right:5px;bottom:3px;background:rgba(0,0,0,.55);color:white;border-radius:8px;padding:1px 5px;font-size:12px;font-weight:900;z-index:6;
}
.moves{max-height:430px;overflow:auto;margin:0;padding-left:22px;line-height:1.9}
.rules ul{margin:0;padding-left:20px;line-height:1.7}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.65);display:grid;place-items:center;z-index:20}
.modal.hidden{display:none}
.modal-card{width:min(420px,92vw);background:var(--panel);border-radius:20px;padding:24px;text-align:center}
.modal-card p{color:var(--muted);line-height:1.6;margin-top:10px}
@media(max-width:1120px){.app{grid-template-columns:1fr}.panel,.board-wrap{width:min(650px,100%);margin:0 auto}}
`;
      document.head.appendChild(style);
    }

    // Run logic once
    if (!initialized.current) {
      initialized.current = true;
      try {
        initLogic();
      } catch(err) {
        console.error("Error running logic for web_co_thu_jungle_chess:", err);
      }
    }

    return () => {
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="web_co_thu_jungle_chess-wrapper" style={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>
      <Link href="/GameMini" style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: '#000', color: '#fff', padding: '5px 10px', textDecoration: 'none', borderRadius: '5px' }}>
        &larr; Về trang chủ
      </Link>
      <div dangerouslySetInnerHTML={{ __html: `<main class="app">
    <aside class="panel">
      <div class="brand">
        <div class="logo">🐯</div>
        <div>
          <h1>Cờ Thú</h1>
          <p>Jungle Chess 2 người</p>
        </div>
      </div>

      <div class="card">
        <p class="label">Trạng thái</p>
        <h2 id="status">Lượt Xanh</h2>
        <p id="hint">Chọn quân để đi.</p>
      </div>

      <div class="card">
        <p class="label">Quân Xanh đã ăn</p>
        <div id="blueCaptured" class="captured"></div>
      </div>

      <div class="card">
        <p class="label">Quân Đỏ đã ăn</p>
        <div id="redCaptured" class="captured"></div>
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
        <p class="label">Luật có trong bản này</p>
        <ul>
          <li>Quân mạnh ăn quân yếu hoặc bằng cấp</li>
          <li>Chuột ăn được Voi</li>
          <li>Voi không ăn được Chuột</li>
          <li>Chuột được xuống sông</li>
          <li>Sư tử/Hổ nhảy qua sông nếu không bị Chuột chặn</li>
          <li>Vào bẫy đối phương sẽ bị hạ cấp</li>
          <li>Vào hang đối phương là thắng</li>
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
