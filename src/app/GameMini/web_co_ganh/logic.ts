// @ts-nocheck
export function initLogic(options = {}) {
  const boardEl = document.getElementById("board");
  const statusEl = document.getElementById("status");
  const hintEl = document.getElementById("hint");
  const whiteCountEl = document.getElementById("whiteCount");
  const blackCountEl = document.getElementById("blackCount");
  const moveListEl = document.getElementById("moveList");
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");

  const N = 5;
  const pad = 12;
  const step = (100 - pad * 2) / (N - 1);
  const dirs8 = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
  const dirs4 = [[-1,0],[1,0],[0,-1],[0,1]];
  let board, turn, selected, legalMoves, history, flipped, lastMove, gameOver, invalidHint;
  let applyingRemoteState = false;

  function initialBoard() {
    return [["b","b","b","b","b"],["b",null,null,null,"b"],["b",null,null,null,"w"],["w",null,null,null,"w"],["w","w","w","w","w"]];
  }

  function newGame(shouldNotify = true) {
    board = initialBoard(); turn = "w"; selected = null; legalMoves = []; history = []; flipped = false; lastMove = null; gameOver = false; invalidHint = "";
    modal.classList.add("hidden"); render(); if (shouldNotify) notifyStateChange();
  }

  function canDiagonal(r, c) { return (r + c) % 2 === 0; }
  function neighbors(r, c) { const dirs = canDiagonal(r,c) ? dirs8 : dirs4; return dirs.map(([dr,dc]) => [r+dr,c+dc]).filter(([rr,cc]) => inBounds(rr,cc)); }
  function inBounds(r,c) { return r >= 0 && r < N && c >= 0 && c < N; }
  function opposite(x) { return x === "w" ? "b" : "w"; }
  function sideName(x) { return x === "w" ? "Trắng" : "Đen"; }

  function render() {
    boardEl.innerHTML = ""; drawLines(); updateCounts(); renderMoves();
    const wc = count("w"), bc = count("b");
    if (!gameOver) {
      if (wc === 0 || bc === 0) endGame(`${wc > 0 ? "Trắng" : "Đen"} thắng vì đã đổi hết quân đối thủ.`, false);
      else if (getAllMoves(turn).length === 0) endGame(`${sideName(opposite(turn))} thắng vì ${sideName(turn)} không còn nước đi.`, false);
      else { statusEl.textContent = `Lượt ${sideName(turn)}`; hintEl.textContent = invalidHint || (selected ? "Chọn điểm trống đang sáng để đi." : `Chọn quân ${sideName(turn).toLowerCase()} đang phát sáng.`); }
    }

    for (let dr = 0; dr < N; dr++) for (let dc = 0; dc < N; dc++) {
      const r = flipped ? N - 1 - dr : dr, c = flipped ? N - 1 - dc : dc;
      const p = document.createElement("button"); p.type = "button"; p.className = "point"; p.style.left = `${pad + dc * step}%`; p.style.top = `${pad + dr * step}%`; p.dataset.r = r; p.dataset.c = c;
      if (selected && selected.r === r && selected.c === c) p.classList.add("selected");
      if (lastMove && ((lastMove.from.r === r && lastMove.from.c === c) || (lastMove.to.r === r && lastMove.to.c === c))) p.classList.add("last");
      if (legalMoves.some(m => m.to.r === r && m.to.c === c)) p.classList.add("legal");
      const piece = board[r][c];
      if (piece) { if (piece === turn) p.classList.add("to-move"); const el = document.createElement("div"); el.className = `piece ${piece}`; p.appendChild(el); }
      p.addEventListener("click", () => clickPoint(r, c)); boardEl.appendChild(p);
    }
  }

  function drawLines() {
    const lines = [];
    for (let r=0;r<N;r++) for (let c=0;c<N-1;c++) lines.push([[r,c],[r,c+1]]);
    for (let c=0;c<N;c++) for (let r=0;r<N-1;r++) lines.push([[r,c],[r+1,c]]);
    for (let r=0;r<N-1;r++) for (let c=0;c<N-1;c++) if ((r+c)%2===0) { lines.push([[r,c],[r+1,c+1]]); lines.push([[r+1,c],[r,c+1]]); }
    lines.forEach(([a,b]) => addLine(a,b));
  }
  function addLine(a,b) { const [r1,c1]=a,[r2,c2]=b; const x1=pad+c1*step,y1=pad+r1*step,x2=pad+c2*step,y2=pad+r2*step; const dx=x2-x1,dy=y2-y1; const l=document.createElement("div"); l.className="line"; l.style.left=`${x1}%`; l.style.top=`${y1}%`; l.style.width=`${Math.sqrt(dx*dx+dy*dy)}%`; l.style.transform=`rotate(${Math.atan2(dy,dx)*180/Math.PI}deg)`; boardEl.appendChild(l); }

  function clickPoint(r,c) {
    if (gameOver) return;
    if (!canActOnTurn(true)) { render(); return; }
    if (selected) { const mv = legalMoves.find(m => m.to.r === r && m.to.c === c); if (mv) { makeMove(mv); return; } }
    if (canUsePiece(board[r][c])) { invalidHint = ""; selected = {r,c}; legalMoves = getMovesForPiece(r,c); }
    else { selected = null; legalMoves = []; invalidHint = board[r][c] ? invalidPieceHint(board[r][c]) : "Chọn một quân của bạn trước."; }
    render();
  }

  function getMovesForPiece(r,c) { if (board[r][c] !== turn) return []; return neighbors(r,c).filter(([rr,cc]) => !board[rr][cc]).map(([rr,cc]) => ({ from:{r,c}, to:{r:rr,c:cc} })); }
  function getAllMoves(side) { const arr=[]; for(let r=0;r<N;r++) for(let c=0;c<N;c++) if(board[r][c]===side) neighbors(r,c).forEach(([rr,cc]) => { if(!board[rr][cc]) arr.push({from:{r,c},to:{r:rr,c:cc}}); }); return arr; }

  function makeMove(m) {
    const snapshot = { ...makeSnapshot(), notation: "" };
    board[m.to.r][m.to.c] = board[m.from.r][m.from.c]; board[m.from.r][m.from.c] = null;
    const flippedPieces = [...applyGanh(m.to.r,m.to.c,turn), ...applyVay(turn)];
    snapshot.notation = `${sideName(turn)} ${pos(m.from)}-${pos(m.to)}${flippedPieces.length ? ` đổi ${flippedPieces.length} quân` : ""}`;
    history.push(snapshot); lastMove = { from:m.from, to:m.to }; selected = null; legalMoves = []; turn = opposite(turn); invalidHint = ""; render(); notifyStateChange();
  }

  function applyGanh(r,c,side) { const enemy=opposite(side), changed=[]; const pairs=[[[0,1],[0,-1]],[[1,0],[-1,0]],[[1,1],[-1,-1]],[[1,-1],[-1,1]]]; for(const [[a,b],[x,y]] of pairs){const r1=r+a,c1=c+b,r2=r+x,c2=c+y; if(!inBounds(r1,c1)||!inBounds(r2,c2)) continue; if(board[r1][c1]===enemy && board[r2][c2]===enemy){board[r1][c1]=side; board[r2][c2]=side; changed.push([r1,c1],[r2,c2]);}} return changed; }
  function applyVay(side) { const enemy=opposite(side), visited=new Set(), changed=[]; for(let r=0;r<N;r++) for(let c=0;c<N;c++) if(board[r][c]===enemy && !visited.has(`${r},${c}`)){const group=[], stack=[[r,c]]; visited.add(`${r},${c}`); let hasMove=false; while(stack.length){const [cr,cc]=stack.pop(); group.push([cr,cc]); for(const [nr,nc] of neighbors(cr,cc)){ if(!board[nr][nc]) hasMove=true; if(board[nr][nc]===enemy && !visited.has(`${nr},${nc}`)){visited.add(`${nr},${nc}`); stack.push([nr,nc]);}}} if(!hasMove) group.forEach(([gr,gc]) => { board[gr][gc]=side; changed.push([gr,gc]); }); } return changed; }

  function updateCounts() { whiteCountEl.textContent = count("w"); blackCountEl.textContent = count("b"); }
  function count(side) { let n=0; for(let r=0;r<N;r++) for(let c=0;c<N;c++) if(board[r][c]===side) n++; return n; }
  function renderMoves() { moveListEl.innerHTML=""; history.forEach(h => { const li=document.createElement("li"); li.textContent=h.notation; moveListEl.appendChild(li); }); moveListEl.scrollTop = moveListEl.scrollHeight; }
  function undo(shouldNotify = true) { const h=history.pop(); if(!h) return; loadState(h); gameOver=false; modal.classList.add("hidden"); render(); if (shouldNotify) notifyStateChange(); }
  function clone(b) { return b.map(row => row.slice()); }
  function pos(p) { return `${String.fromCharCode(65+p.c)}${N-p.r}`; }
  function endGame(text, shouldNotify = true) { gameOver=true; statusEl.textContent="Kết thúc"; hintEl.textContent=text; modalText.textContent=text; modal.classList.remove("hidden"); if (shouldNotify) notifyStateChange(); }

  function isOnlineMode() { return options.isOnline?.() === true; }
  function playerColor() { return options.getPlayerColor?.() || null; }
  function canActOnTurn(showHint) { if(!isOnlineMode()) return true; const color=playerColor(); if(!color){ if(showHint) invalidHint="Bạn đang xem ván này. Chỉ hai người chơi được đi quân."; return false; } if(color!==turn){ if(showHint) invalidHint=`Bạn cầm quân ${sideName(color)}. Đang chờ ${sideName(turn)} đi.`; return false; } return true; }
  function canUsePiece(piece) { return piece && piece === turn && (!isOnlineMode() || playerColor() === piece); }
  function invalidPieceHint(piece) { if(isOnlineMode() && playerColor() && piece !== playerColor()) return `Bạn cầm quân ${sideName(playerColor())}, không thể đi quân ${sideName(piece)}.`; return `Chưa tới lượt ${sideName(piece)}. Hiện tại là lượt ${sideName(turn)}.`; }
  function makeSnapshot() { return { board: clone(board), turn, selected: null, legalMoves: [], history: history.map(h => ({...h, board: clone(h.board)})), flipped, lastMove, gameOver }; }
  function loadState(state) { if(!state?.board) return; applyingRemoteState=true; board=clone(state.board); turn=state.turn||"w"; selected=null; legalMoves=[]; history=Array.isArray(state.history)?state.history:[]; flipped=Boolean(state.flipped); lastMove=state.lastMove||null; gameOver=Boolean(state.gameOver); invalidHint=""; render(); applyingRemoteState=false; }
  function notifyStateChange() { if(!applyingRemoteState) options.onStateChange?.(makeSnapshot()); }

  const newBtn=document.getElementById("newBtn"), undoBtn=document.getElementById("undoBtn"), flipBtn=document.getElementById("flipBtn"), closeBtn=document.getElementById("closeModal");
  const onNew=()=>newGame(); const onUndo=()=>undo(); const onFlip=()=>{flipped=!flipped; render(); notifyStateChange();}; const onClose=()=>modal.classList.add("hidden");
  newBtn.addEventListener("click", onNew); undoBtn.addEventListener("click", onUndo); flipBtn.addEventListener("click", onFlip); closeBtn.addEventListener("click", onClose);
  newGame(false);
  return { cleanup(){newBtn.removeEventListener("click",onNew); undoBtn.removeEventListener("click",onUndo); flipBtn.removeEventListener("click",onFlip); closeBtn.removeEventListener("click",onClose);}, getState: makeSnapshot, loadState, newGame };
}
