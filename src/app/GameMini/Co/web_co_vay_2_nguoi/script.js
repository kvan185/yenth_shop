const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const hintEl = document.getElementById("hint");
const blackScoreEl = document.getElementById("blackScore");
const whiteScoreEl = document.getElementById("whiteScore");
const moveListEl = document.getElementById("moveList");
const boardSizeSelect = document.getElementById("boardSize");
const endModal = document.getElementById("endModal");
const endText = document.getElementById("endText");

let size = 19;
let board = [];
let turn = "b";
let blackCaptures = 0;
let whiteCaptures = 0;
let history = [];
let lastMove = null;
let passCount = 0;
let previousHash = "";

function newGame() {
  size = Number(boardSizeSelect.value);
  board = Array.from({ length: size }, () => Array(size).fill(null));
  turn = "b";
  blackCaptures = 0;
  whiteCaptures = 0;
  history = [];
  lastMove = null;
  passCount = 0;
  previousHash = hashBoard(board);
  endModal.classList.add("hidden");
  render();
}

function render() {
  boardEl.innerHTML = "";
  drawGrid();

  statusEl.textContent = `Lượt ${turn === "b" ? "Đen" : "Trắng"}`;
  hintEl.textContent = "Bấm vào giao điểm để đặt quân.";
  blackScoreEl.textContent = blackCaptures;
  whiteScoreEl.textContent = whiteCaptures;
  renderMoves();

  const pad = 7;
  const step = (100 - pad * 2) / (size - 1);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const pt = document.createElement("div");
      pt.className = "point";
      pt.style.left = `${pad + c * step}%`;
      pt.style.top = `${pad + r * step}%`;

      if (lastMove && lastMove.r === r && lastMove.c === c) {
        pt.classList.add("last");
      }

      const stone = board[r][c];
      if (stone) {
        const s = document.createElement("div");
        s.className = `stone ${stone === "b" ? "black" : "white"}`;
        pt.appendChild(s);
      }

      pt.addEventListener("click", () => playMove(r, c));
      boardEl.appendChild(pt);
    }
  }
}

function drawGrid() {
  const pad = 7;
  const step = (100 - pad * 2) / (size - 1);

  for (let i = 0; i < size; i++) {
    const h = document.createElement("div");
    h.className = "line h-line";
    h.style.left = `${pad}%`;
    h.style.right = `${pad}%`;
    h.style.top = `${pad + i * step}%`;
    boardEl.appendChild(h);

    const v = document.createElement("div");
    v.className = "line v-line";
    v.style.top = `${pad}%`;
    v.style.bottom = `${pad}%`;
    v.style.left = `${pad + i * step}%`;
    boardEl.appendChild(v);
  }

  getStarPoints(size).forEach(([r, c]) => {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${pad + c * step}%`;
    star.style.top = `${pad + r * step}%`;
    boardEl.appendChild(star);
  });
}

function getStarPoints(n) {
  if (n === 19) return [[3,3],[3,9],[3,15],[9,3],[9,9],[9,15],[15,3],[15,9],[15,15]];
  if (n === 13) return [[3,3],[3,9],[6,6],[9,3],[9,9]];
  return [[2,2],[2,6],[4,4],[6,2],[6,6]];
}

function playMove(r, c) {
  if (board[r][c]) {
    hintEl.textContent = "Điểm này đã có quân.";
    return;
  }

  const snapshot = {
    board: cloneBoard(board),
    turn,
    blackCaptures,
    whiteCaptures,
    lastMove,
    passCount,
    previousHash
  };

  const test = cloneBoard(board);
  test[r][c] = turn;

  const enemy = opposite(turn);
  let captured = 0;
  for (const [nr, nc] of neighbors(r, c)) {
    if (test[nr][nc] === enemy) {
      const group = getGroup(test, nr, nc);
      if (countLiberties(test, group) === 0) {
        captured += group.length;
        group.forEach(([gr, gc]) => test[gr][gc] = null);
      }
    }
  }

  const ownGroup = getGroup(test, r, c);
  if (countLiberties(test, ownGroup) === 0) {
    hintEl.textContent = "Không được tự sát.";
    return;
  }

  const newHash = hashBoard(test);
  if (newHash === previousHash) {
    hintEl.textContent = "Không được lặp lại bàn cờ ngay lập tức.";
    return;
  }

  history.push({
    ...snapshot,
    notation: `${turn === "b" ? "Đen" : "Trắng"} ${coord(r, c)}${captured ? " ăn " + captured : ""}`
  });

  board = test;
  if (turn === "b") blackCaptures += captured;
  else whiteCaptures += captured;

  previousHash = hashBoard(snapshot.board);
  lastMove = { r, c };
  passCount = 0;
  turn = enemy;
  render();
}

function passTurn() {
  history.push({
    board: cloneBoard(board),
    turn,
    blackCaptures,
    whiteCaptures,
    lastMove,
    passCount,
    previousHash,
    notation: `${turn === "b" ? "Đen" : "Trắng"} bỏ lượt`
  });

  passCount++;
  if (passCount >= 2) {
    endText.textContent = `Hai bên đã bỏ lượt liên tiếp. Điểm ăn quân: Đen ${blackCaptures} - Trắng ${whiteCaptures}. Bạn có thể tự đếm đất để quyết định người thắng.`;
    endModal.classList.remove("hidden");
    return;
  }

  turn = opposite(turn);
  render();
}

function undo() {
  const h = history.pop();
  if (!h) return;

  board = cloneBoard(h.board);
  turn = h.turn;
  blackCaptures = h.blackCaptures;
  whiteCaptures = h.whiteCaptures;
  lastMove = h.lastMove;
  passCount = h.passCount;
  previousHash = h.previousHash;
  endModal.classList.add("hidden");
  render();
}

function neighbors(r, c) {
  return [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].filter(([rr, cc]) => rr >= 0 && rr < size && cc >= 0 && cc < size);
}

function getGroup(b, r, c) {
  const color = b[r][c];
  const stack = [[r, c]];
  const seen = new Set([`${r},${c}`]);
  const group = [];

  while (stack.length) {
    const [cr, cc] = stack.pop();
    group.push([cr, cc]);

    for (const [nr, nc] of neighbors(cr, cc)) {
      const key = `${nr},${nc}`;
      if (!seen.has(key) && b[nr][nc] === color) {
        seen.add(key);
        stack.push([nr, nc]);
      }
    }
  }

  return group;
}

function countLiberties(b, group) {
  const libs = new Set();
  group.forEach(([r, c]) => {
    for (const [nr, nc] of neighbors(r, c)) {
      if (!b[nr][nc]) libs.add(`${nr},${nc}`);
    }
  });
  return libs.size;
}

function cloneBoard(b) {
  return b.map(row => row.slice());
}

function opposite(color) {
  return color === "b" ? "w" : "b";
}

function hashBoard(b) {
  return b.map(row => row.map(x => x || ".").join("")).join("/");
}

function coord(r, c) {
  const letters = "ABCDEFGHJKLMNOPQRST"; // bỏ I theo ký hiệu cờ vây
  return `${letters[c]}${size - r}`;
}

function renderMoves() {
  moveListEl.innerHTML = "";
  history.forEach((h, i) => {
    const li = document.createElement("li");
    li.textContent = h.notation;
    moveListEl.appendChild(li);
  });
}

document.getElementById("newBtn").addEventListener("click", newGame);
document.getElementById("undoBtn").addEventListener("click", undo);
document.getElementById("passBtn").addEventListener("click", passTurn);
document.getElementById("closeEnd").addEventListener("click", () => endModal.classList.add("hidden"));
boardSizeSelect.addEventListener("change", newGame);

newGame();
