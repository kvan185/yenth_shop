const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const hintEl = document.getElementById("hint");
const redCapEl = document.getElementById("redCaptured");
const blackCapEl = document.getElementById("blackCaptured");
const moveListEl = document.getElementById("moveList");
const redTimerEl = document.getElementById("redTimer");
const blackTimerEl = document.getElementById("blackTimer");

const names = {
  rK: "帥", rA: "仕", rE: "相", rH: "傌", rR: "俥", rC: "炮", rP: "兵",
  bK: "將", bA: "士", bE: "象", bH: "馬", bR: "車", bC: "砲", bP: "卒"
};

let board, turn, selected, legalMoves, capturedRed, capturedBlack, history, flipped, lastMove;
let timers = { r: 900, b: 900 };
let timer = null;
let gameOver = false;

function initBoard() {
  const b = Array.from({ length: 10 }, () => Array(9).fill(null));
  b[0] = ["bR","bH","bE","bA","bK","bA","bE","bH","bR"];
  b[2][1] = "bC"; b[2][7] = "bC";
  [0,2,4,6,8].forEach(c => b[3][c] = "bP");

  b[9] = ["rR","rH","rE","rA","rK","rA","rE","rH","rR"];
  b[7][1] = "rC"; b[7][7] = "rC";
  [0,2,4,6,8].forEach(c => b[6][c] = "rP");
  return b;
}

function newGame() {
  board = initBoard();
  turn = "r";
  selected = null;
  legalMoves = [];
  capturedRed = [];
  capturedBlack = [];
  history = [];
  flipped = false;
  lastMove = null;
  timers = { r: 900, b: 900 };
  gameOver = false;
  startTimer();
  render();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (gameOver) return;
    timers[turn]--;
    if (timers[turn] <= 0) {
      timers[turn] = 0;
      gameOver = true;
      statusEl.textContent = `${sideName(turn)} hết giờ`;
      hintEl.textContent = `${sideName(opposite(turn))} thắng!`;
      clearInterval(timer);
    }
    updateTimers();
  }, 1000);
}

function updateTimers() {
  redTimerEl.textContent = formatTime(timers.r);
  blackTimerEl.textContent = formatTime(timers.b);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function colorOf(p) { return p ? p[0] : null; }
function typeOf(p) { return p ? p[1] : null; }
function opposite(c) { return c === "r" ? "b" : "r"; }
function sideName(c) { return c === "r" ? "Đỏ" : "Đen"; }
function inBounds(r,c) { return r >= 0 && r < 10 && c >= 0 && c < 9; }
function clone(b) { return b.map(row => row.slice()); }

function render() {
  boardEl.innerHTML = "";
  drawGrid();
  updateTimers();
  updateCaptured();
  renderMoves();

  const allLegal = getAllLegal(turn);
  const inCheck = isInCheck(turn, board);

  if (!gameOver) {
    if (allLegal.length === 0 && inCheck) {
      gameOver = true;
      statusEl.textContent = "Chiếu hết";
      hintEl.textContent = `${sideName(opposite(turn))} thắng!`;
      clearInterval(timer);
    } else if (allLegal.length === 0) {
      gameOver = true;
      statusEl.textContent = "Hòa";
      hintEl.textContent = "Không còn nước đi hợp lệ.";
      clearInterval(timer);
    } else {
      statusEl.textContent = inCheck ? `${sideName(turn)} đang bị chiếu` : `Lượt ${sideName(turn)}`;
      hintEl.textContent = selected ? "Chọn điểm hợp lệ để đi." : `Chọn quân ${sideName(turn).toLowerCase()} để đi.`;
    }
  }

  for (let dr = 0; dr < 10; dr++) {
    for (let dc = 0; dc < 9; dc++) {
      const r = flipped ? 9 - dr : dr;
      const c = flipped ? 8 - dc : dc;
      const pt = document.createElement("div");
      pt.className = "point";
      pt.style.left = `${6.25 + dc * 10.9375}%`;
      pt.style.top = `${5.55 + dr * 9.875}%`;
      pt.dataset.r = r;
      pt.dataset.c = c;

      if (selected && selected.r === r && selected.c === c) pt.classList.add("selected");
      if (lastMove && ((lastMove.from.r === r && lastMove.from.c === c) || (lastMove.to.r === r && lastMove.to.c === c))) pt.classList.add("last");

      const lm = legalMoves.find(m => m.to.r === r && m.to.c === c);
      if (lm) pt.classList.add(board[r][c] ? "capture" : "legal");

      const piece = board[r][c];
      if (piece) {
        const p = document.createElement("div");
        p.className = `piece ${colorOf(piece) === "r" ? "red" : "black"}`;
        p.textContent = names[piece];
        pt.appendChild(p);
      }

      pt.addEventListener("click", () => clickPoint(r,c));
      boardEl.appendChild(pt);
    }
  }
}

function drawGrid() {
  for (let r = 0; r < 10; r++) {
    const line = document.createElement("div");
    line.className = "grid-line h-line";
    line.style.top = `${5.55 + r * 9.875}%`;
    boardEl.appendChild(line);
  }

  for (let c = 0; c < 9; c++) {
    const line = document.createElement("div");
    line.className = `grid-line v-line ${c > 0 && c < 8 ? "river-gap" : ""}`;
    line.style.left = `${6.25 + c * 10.9375}%`;
    boardEl.appendChild(line);
  }

  addDiagonal(0,3,2,5);
  addDiagonal(0,5,2,3);
  addDiagonal(7,3,9,5);
  addDiagonal(7,5,9,3);
}

function addDiagonal(r1,c1,r2,c2) {
  const x1 = 6.25 + c1 * 10.9375;
  const y1 = 5.55 + r1 * 9.875;
  const x2 = 6.25 + c2 * 10.9375;
  const y2 = 5.55 + r2 * 9.875;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx*dx + dy*dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const d = document.createElement("div");
  d.className = "diagonal";
  d.style.left = `${x1}%`;
  d.style.top = `${y1}%`;
  d.style.width = `${len}%`;
  d.style.transform = `rotate(${angle}deg)`;
  boardEl.appendChild(d);
}

function clickPoint(r,c) {
  if (gameOver) return;
  const piece = board[r][c];

  if (selected) {
    const move = legalMoves.find(m => m.to.r === r && m.to.c === c);
    if (move) {
      makeMove(move);
      return;
    }
  }

  if (piece && colorOf(piece) === turn) {
    selected = {r,c};
    legalMoves = getLegalForPiece(r,c);
  } else {
    selected = null;
    legalMoves = [];
  }
  render();
}

function getLegalForPiece(r,c) {
  return getPseudo(r,c,board).filter(m => {
    const test = clone(board);
    apply(test,m);
    return !isInCheck(turn,test) && !kingsFacing(test);
  });
}

function getAllLegal(color) {
  const moves = [];
  for (let r=0;r<10;r++) {
    for (let c=0;c<9;c++) {
      if (colorOf(board[r][c]) === color) {
        for (const m of getPseudo(r,c,board)) {
          const test = clone(board);
          apply(test,m);
          if (!isInCheck(color,test) && !kingsFacing(test)) moves.push(m);
        }
      }
    }
  }
  return moves;
}

function getPseudo(r,c,b) {
  const piece = b[r][c];
  if (!piece) return [];
  const color = colorOf(piece), type = typeOf(piece);
  const moves = [];

  const add = (rr,cc) => {
    if (!inBounds(rr,cc)) return;
    if (!b[rr][cc] || colorOf(b[rr][cc]) !== color) {
      moves.push({from:{r,c}, to:{r:rr,c:cc}});
    }
  };

  if (type === "K") {
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc]) => {
      const rr = r+dr, cc = c+dc;
      if (inPalace(rr,cc,color)) add(rr,cc);
    });
  }

  if (type === "A") {
    [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc]) => {
      const rr = r+dr, cc = c+dc;
      if (inPalace(rr,cc,color)) add(rr,cc);
    });
  }

  if (type === "E") {
    [[2,2],[2,-2],[-2,2],[-2,-2]].forEach(([dr,dc]) => {
      const rr = r+dr, cc = c+dc;
      const eyeR = r + dr/2, eyeC = c + dc/2;
      const ownSide = color === "r" ? rr >= 5 : rr <= 4;
      if (inBounds(rr,cc) && ownSide && !b[eyeR][eyeC]) add(rr,cc);
    });
  }

  if (type === "H") {
    const steps = [
      [-2,-1,-1,0],[-2,1,-1,0],[2,-1,1,0],[2,1,1,0],
      [-1,-2,0,-1],[1,-2,0,-1],[-1,2,0,1],[1,2,0,1]
    ];
    steps.forEach(([dr,dc,lr,lc]) => {
      if (!b[r+lr]?.[c+lc]) add(r+dr,c+dc);
    });
  }

  if (type === "R" || type === "C") {
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc]) => {
      let rr = r+dr, cc = c+dc, jumped = false;
      while (inBounds(rr,cc)) {
        if (type === "R") {
          if (!b[rr][cc]) add(rr,cc);
          else {
            if (colorOf(b[rr][cc]) !== color) add(rr,cc);
            break;
          }
        } else {
          if (!jumped) {
            if (!b[rr][cc]) add(rr,cc);
            else jumped = true;
          } else {
            if (b[rr][cc]) {
              if (colorOf(b[rr][cc]) !== color) add(rr,cc);
              break;
            }
          }
        }
        rr += dr; cc += dc;
      }
    });
  }

  if (type === "P") {
    const forward = color === "r" ? -1 : 1;
    add(r+forward,c);
    const crossed = color === "r" ? r <= 4 : r >= 5;
    if (crossed) {
      add(r,c-1);
      add(r,c+1);
    }
  }

  return moves;
}

function inPalace(r,c,color) {
  if (c < 3 || c > 5) return false;
  return color === "r" ? r >= 7 && r <= 9 : r >= 0 && r <= 2;
}

function apply(b,m) {
  b[m.to.r][m.to.c] = b[m.from.r][m.from.c];
  b[m.from.r][m.from.c] = null;
}

function makeMove(m) {
  const moving = board[m.from.r][m.from.c];
  const target = board[m.to.r][m.to.c];

  history.push({
    board: clone(board),
    turn,
    capturedRed: capturedRed.slice(),
    capturedBlack: capturedBlack.slice(),
    timers: {...timers},
    lastMove,
    notation: notation(moving,m,target)
  });

  if (target) {
    if (turn === "r") capturedRed.push(target);
    else capturedBlack.push(target);
  }

  apply(board,m);
  lastMove = {from:m.from, to:m.to};
  selected = null;
  legalMoves = [];
  turn = opposite(turn);
  render();
}

function notation(piece,m,target) {
  return `${names[piece]} ${pos(m.from)}${target ? "x" : "-"}${pos(m.to)}`;
}

function pos(p) {
  return `${"abcdefghi"[p.c]}${10-p.r}`;
}

function findKing(color,b) {
  for (let r=0;r<10;r++) for (let c=0;c<9;c++) {
    if (b[r][c] === color + "K") return {r,c};
  }
  return null;
}

function isInCheck(color,b) {
  const king = findKing(color,b);
  if (!king) return true;
  const enemy = opposite(color);
  for (let r=0;r<10;r++) {
    for (let c=0;c<9;c++) {
      if (colorOf(b[r][c]) === enemy) {
        const pseudo = getPseudoNoKingSafety(r,c,b);
        if (pseudo.some(m => m.to.r === king.r && m.to.c === king.c)) return true;
      }
    }
  }
  return kingsFacing(b);
}

function getPseudoNoKingSafety(r,c,b) {
  return getPseudo(r,c,b);
}

function kingsFacing(b) {
  const rk = findKing("r",b);
  const bk = findKing("b",b);
  if (!rk || !bk || rk.c !== bk.c) return false;
  const c = rk.c;
  const start = Math.min(rk.r,bk.r) + 1;
  const end = Math.max(rk.r,bk.r);
  for (let r=start;r<end;r++) if (b[r][c]) return false;
  return true;
}

function updateCaptured() {
  redCapEl.innerHTML = "";
  blackCapEl.innerHTML = "";
  capturedRed.forEach(p => redCapEl.appendChild(mini(p)));
  capturedBlack.forEach(p => blackCapEl.appendChild(mini(p)));
}

function mini(p) {
  const el = document.createElement("div");
  el.className = `mini-piece ${colorOf(p) === "r" ? "red" : "black"}`;
  el.textContent = names[p];
  return el;
}

function renderMoves() {
  moveListEl.innerHTML = "";
  history.forEach((h,i) => {
    if (i % 2 === 0) {
      const li = document.createElement("li");
      li.textContent = h.notation;
      moveListEl.appendChild(li);
    } else {
      moveListEl.lastElementChild.textContent += "   " + h.notation;
    }
  });
}

function undo() {
  const h = history.pop();
  if (!h) return;
  board = clone(h.board);
  turn = h.turn;
  capturedRed = h.capturedRed.slice();
  capturedBlack = h.capturedBlack.slice();
  timers = {...h.timers};
  lastMove = h.lastMove;
  selected = null;
  legalMoves = [];
  gameOver = false;
  startTimer();
  render();
}

document.getElementById("newGame").addEventListener("click", newGame);
document.getElementById("undo").addEventListener("click", undo);
document.getElementById("flip").addEventListener("click", () => {
  flipped = !flipped;
  render();
});

newGame();
