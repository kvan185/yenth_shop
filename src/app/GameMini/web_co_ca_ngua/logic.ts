// @ts-nocheck
export function initLogic(options = {}) {
  const boardEl = document.getElementById("board");
  const playersEl = document.getElementById("players");
  const logEl = document.getElementById("log");
  const setup = document.getElementById("setup");
  const controls = document.getElementById("controls");
  const turnTitle = document.getElementById("turnTitle");
  const hint = document.getElementById("hint");
  const diceEl = document.getElementById("dice");
  const rollBtn = document.getElementById("rollBtn");
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  const modalTitle = document.getElementById("modalTitle");
  const playerCountSelect = document.getElementById("playerCount");

  const colors = ["red", "blue", "green", "yellow"];
  const names = { red: "Đỏ", blue: "Xanh Dương", green: "Xanh Lá", yellow: "Vàng" };
  const diceFaces = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  const startIndex = { red: 0, blue: 14, green: 28, yellow: 42 };
  let path = [], finishCells = {}, homeSlots = {};
  let players = [], current = 0, rolled = false, dice = 0, legalPieces = [], gameOver = false, logs = [];
  let applyingRemoteState = false;

  function makePath() {
    const pts = [], cx = 50, cy = 50, rx = 39, ry = 39;
    for (let i = 0; i < 56; i++) {
      const a = (-135 + i * 360 / 56) * Math.PI / 180;
      pts.push({ x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) });
    }
    path = pts;
    finishCells = { red: line(50,15,50,35,6), blue: line(85,50,65,50,6), green: line(50,85,50,65,6), yellow: line(15,50,35,50,6) };
    homeSlots = { red:[[15,15],[25,15],[15,25],[25,25]], blue:[[75,15],[85,15],[75,25],[85,25]], green:[[75,75],[85,75],[75,85],[85,85]], yellow:[[15,75],[25,75],[15,85],[25,85]] };
  }
  function line(x1,y1,x2,y2,n) { return Array.from({length:n}, (_,i) => { const t=i/(n-1); return {x:x1+(x2-x1)*t,y:y1+(y2-y1)*t}; }); }

  function startGame(shouldNotify = true) {
    const n = Number(playerCountSelect.value);
    players = colors.slice(0,n).map(color => ({ color, pieces: Array.from({length:4}, (_,i) => ({ id:i, state:"home", steps:-1, finish:-1 })) }));
    current = 0; rolled = false; dice = 0; legalPieces = []; gameOver = false; logs = [];
    setup.classList.add("hidden"); controls.classList.remove("hidden"); modal.classList.add("hidden");
    addLog("Ván mới bắt đầu. Đỏ đi trước.");
    render(); if (shouldNotify) notifyStateChange();
  }

  function resetToSetup(shouldNotify = true) { setup.classList.remove("hidden"); controls.classList.add("hidden"); players = []; logs = []; current = 0; rolled = false; dice = 0; legalPieces = []; gameOver = false; render(); if (shouldNotify) notifyStateChange(); }

  function render() {
    boardEl.innerHTML = ""; drawStaticBoard(); drawPieces(); renderPlayers(); renderLog();
    const player = players[current];
    turnTitle.textContent = player ? names[player.color] : "Chưa bắt đầu";
    rollBtn.disabled = rolled || gameOver || !players.length || !canActOnTurn(false);
    if (!players.length) hint.textContent = "Chọn số người chơi rồi bắt đầu.";
    else if (!canActOnTurn(false)) hint.textContent = `Đang chờ ${names[player.color]} thao tác.`;
    else if (rolled) hint.textContent = legalPieces.length ? "Chọn quân sáng viền trắng để đi." : "Không có quân đi được. Bấm bỏ lượt.";
    else hint.textContent = "Gieo xúc xắc để đi.";
  }

  function drawStaticBoard() {
    colors.forEach(color => {
      const h = document.createElement("div"); h.className = `home ${color}`;
      homeSlots[color].forEach(() => { const s = document.createElement("div"); s.className = "home-slot"; h.appendChild(s); });
      boardEl.appendChild(h);
    });
    const center = document.createElement("div"); center.className = "center"; center.textContent = "CÁ NGỰA"; boardEl.appendChild(center);
    path.forEach((p,i) => { const c = document.createElement("button"); c.type="button"; c.className = "path-cell"; if (Object.values(startIndex).includes(i)) c.classList.add("safe"); c.style.left=p.x+"%"; c.style.top=p.y+"%"; boardEl.appendChild(c); });
    Object.entries(finishCells).forEach(([color,cells]) => cells.forEach((p,i) => { const c = document.createElement("button"); c.type="button"; c.className = `finish-cell ${color}`; c.style.left=p.x+"%"; c.style.top=p.y+"%"; boardEl.appendChild(c); }));
  }

  function drawPieces() {
    players.forEach((pl,pi) => pl.pieces.forEach(piece => {
      const pos = getPiecePos(pl.color, piece);
      const el = document.createElement("button"); el.type="button"; el.className = `piece ${pl.color}`; el.textContent = piece.id + 1;
      el.style.position="absolute"; el.style.left=pos.x+"%"; el.style.top=pos.y+"%"; el.style.transform="translate(-50%,-50%)";
      if (pi === current && canActOnTurn(false)) el.classList.add("to-move");
      if (legalPieces.some(lp => lp.pi === pi && lp.id === piece.id)) el.classList.add("legal-piece");
      el.addEventListener("click", () => clickPiece(pi, piece.id)); boardEl.appendChild(el);
    }));
  }

  function getPiecePos(color,piece) {
    if (piece.state === "home") return homeSlots[color][piece.id];
    if (piece.state === "finished") { const base = finishCells[color][5]; return { x: base.x + (piece.id - 1.5) * 2.2, y: base.y }; }
    if (piece.state === "finish") return finishCells[color][piece.finish];
    return path[(startIndex[color] + piece.steps) % 56];
  }

  function roll() {
    if (!canActOnTurn(true) || rolled || gameOver || !players.length) { render(); return; }
    dice = 1 + Math.floor(Math.random() * 6); diceEl.textContent = diceFaces[dice]; rolled = true; computeLegal();
    addLog(`${names[players[current].color]} gieo ${dice}.${legalPieces.length ? " Chọn quân để đi." : " Không có quân đi được."}`);
    render(); notifyStateChange();
  }

  function computeLegal() { legalPieces = []; const pl = players[current]; pl.pieces.forEach(pc => { if (canMove(pl.color, pc, dice)) legalPieces.push({ pi: current, id: pc.id }); }); }
  function canMove(color,piece,d) { if (piece.state === "finished") return false; if (piece.state === "home") return d === 6; if (piece.state === "finish") return piece.finish + d <= 5 && !occupiedFinish(color, piece.finish + d); const newSteps = piece.steps + d; if (newSteps < 56) return true; const f = newSteps - 56; return f >= 0 && f <= 5 && !occupiedFinish(color, f); }
  function clickPiece(pi,id) { if (!canActOnTurn(true) || !rolled || pi !== current) { render(); return; } if (!legalPieces.find(x => x.pi === pi && x.id === id)) return; movePiece(id); }

  function movePiece(id) {
    const pl = players[current], pc = pl.pieces[id];
    if (pc.state === "home") { pc.state="path"; pc.steps=0; kickAtPath(startIndex[pl.color], pl.color); addLog(`${names[pl.color]} xuất quân ${id+1}.`); }
    else if (pc.state === "path") { const ns=pc.steps+dice; if (ns < 56) { pc.steps=ns; kickAtPath((startIndex[pl.color]+pc.steps)%56, pl.color); addLog(`${names[pl.color]} đi quân ${id+1} ${dice} bước.`); } else { pc.state="finish"; pc.finish=ns-56; addLog(`${names[pl.color]} đưa quân ${id+1} vào chuồng bậc ${pc.finish+1}.`); } }
    else if (pc.state === "finish") { pc.finish += dice; addLog(`${names[pl.color]} leo chuồng quân ${id+1} lên bậc ${pc.finish+1}.`); }
    if (pc.state === "finish" && pc.finish === 5) { pc.state="finished"; addLog(`${names[pl.color]} đã về đích quân ${id+1}.`); }
    if (pl.pieces.every(p => p.state === "finished")) { gameOver = true; modalTitle.textContent = "Kết thúc"; modalText.textContent = `${names[pl.color]} thắng vì đã đưa đủ 4 quân về đích!`; modal.classList.remove("hidden"); }
    rolled = false; legalPieces = [];
    if (!gameOver && dice !== 6) nextTurn(); else if (!gameOver) addLog(`${names[pl.color]} gieo được 6 nên thêm lượt.`);
    render(); notifyStateChange();
  }

  function kickAtPath(pathIndex,color) { players.forEach(pl => { if (pl.color === color) return; pl.pieces.forEach(pc => { if (pc.state === "path" && (startIndex[pl.color] + pc.steps) % 56 === pathIndex) { pc.state="home"; pc.steps=-1; pc.finish=-1; addLog(`${names[color]} đá quân ${pc.id+1} của ${names[pl.color]} về nhà.`); } }); }); }
  function occupiedFinish(color,index) { const pl = players.find(p => p.color === color); return pl?.pieces.some(p => p.state === "finish" && p.finish === index); }
  function nextTurn() { current = (current + 1) % players.length; }
  function endTurn() { if (!players.length || gameOver || !canActOnTurn(true)) { render(); return; } rolled = false; legalPieces = []; addLog(`${names[players[current].color]} bỏ lượt.`); nextTurn(); render(); notifyStateChange(); }
  function renderPlayers() { playersEl.innerHTML=""; players.forEach((p,i) => { const done=p.pieces.filter(x => x.state === "finished").length; const div=document.createElement("div"); div.className=`player ${i===current ? "active" : ""}`; div.innerHTML=`<span class="dot ${p.color}"></span><div><b>${names[p.color]}</b><br><span>${done}/4 quân về đích</span></div>`; playersEl.appendChild(div); }); }
  function addLog(t) { logs.unshift(t); logs = logs.slice(0, 80); }
  function renderLog() { logEl.innerHTML=""; logs.forEach(t => { const d=document.createElement("div"); d.textContent=t; logEl.appendChild(d); }); }

  function isOnlineMode() { return options.isOnline?.() === true; }
  function playerColor() { return options.getPlayerColor?.() || null; }
  function canActOnTurn(showHint) { if (!isOnlineMode()) return true; if (!players.length) return true; const color = playerColor(); if (!color) { if(showHint) addLog("Bạn đang xem ván này."); return false; } if (players[current]?.color !== color) return false; return true; }
  function snapshot() { return { players: JSON.parse(JSON.stringify(players)), current, rolled, dice, legalPieces, gameOver, logs: logs.slice(), playerCount: Number(playerCountSelect.value), modalText: modalText.textContent || "" }; }
  function loadState(state) { if (!state) return; applyingRemoteState = true; players = JSON.parse(JSON.stringify(state.players || [])); current = state.current || 0; rolled = Boolean(state.rolled); dice = state.dice || 0; legalPieces = state.legalPieces || []; gameOver = Boolean(state.gameOver); logs = state.logs || []; playerCountSelect.value = String(state.playerCount || players.length || 4); diceEl.textContent = dice ? diceFaces[dice] : "🎲"; if (players.length) { setup.classList.add("hidden"); controls.classList.remove("hidden"); } else { setup.classList.remove("hidden"); controls.classList.add("hidden"); } if (state.modalText) { modalText.textContent = state.modalText; modal.classList.toggle("hidden", !gameOver); } render(); applyingRemoteState = false; }
  function notifyStateChange() { if (!applyingRemoteState) options.onStateChange?.(snapshot()); }

  const startBtn=document.getElementById("startBtn"), newBtn=document.getElementById("newBtn"), closeBtn=document.getElementById("closeModal"), endBtn=document.getElementById("endBtn");
  const onStart=()=>startGame(); const onRoll=()=>roll(); const onEnd=()=>endTurn(); const onNew=()=>resetToSetup(); const onClose=()=>modal.classList.add("hidden");
  startBtn.addEventListener("click", onStart); rollBtn.addEventListener("click", onRoll); endBtn.addEventListener("click", onEnd); newBtn.addEventListener("click", onNew); closeBtn.addEventListener("click", onClose);
  makePath(); render();
  return { cleanup(){startBtn.removeEventListener("click",onStart); rollBtn.removeEventListener("click",onRoll); endBtn.removeEventListener("click",onEnd); newBtn.removeEventListener("click",onNew); closeBtn.removeEventListener("click",onClose);}, getState:snapshot, loadState, newGame:startGame };
}
