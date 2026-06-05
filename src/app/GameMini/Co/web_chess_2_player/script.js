const PIECES = {
  wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙",
  bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟"
};

const boardEl = document.getElementById("board");
const statusText = document.getElementById("statusText");
const hintText = document.getElementById("hintText");
const moveList = document.getElementById("moveList");
const whiteCapturedEl = document.getElementById("whiteCaptured");
const blackCapturedEl = document.getElementById("blackCaptured");
const whiteTimerEl = document.getElementById("whiteTimer");
const blackTimerEl = document.getElementById("blackTimer");
const promotionModal = document.getElementById("promotionModal");

let board, turn, selected, legalTargets, moveHistory, lastMove, flipped;
let capturedByWhite, capturedByBlack, enPassantTarget, castlingRights;
let pendingPromotion = null;
let timers = { w: 600, b: 600 };
let timerInterval = null;
let gameOver = false;

function initialBoard() {
  return [
    ["br","bn","bb","bq","bk","bb","bn","br"],
    ["bp","bp","bp","bp","bp","bp","bp","bp"],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ["wp","wp","wp","wp","wp","wp","wp","wp"],
    ["wr","wn","wb","wq","wk","wb","wn","wr"]
  ];
}

function newGame() {
  board = initialBoard();
  turn = "w";
  selected = null;
  legalTargets = [];
  moveHistory = [];
  lastMove = null;
  capturedByWhite = [];
  capturedByBlack = [];
  enPassantTarget = null;
  castlingRights = { wK: true, wQ: true, bK: true, bQ: true };
  pendingPromotion = null;
  timers = { w: 600, b: 600 };
  gameOver = false;
  startTimer();
  render();
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (gameOver || pendingPromotion) return;
    timers[turn]--;
    if (timers[turn] <= 0) {
      timers[turn] = 0;
      gameOver = true;
      statusText.textContent = `${turn === "w" ? "Trắng" : "Đen"} hết giờ`;
      hintText.textContent = `${turn === "w" ? "Đen" : "Trắng"} thắng!`;
      clearInterval(timerInterval);
    }
    updateTimers();
  }, 1000);
}

function updateTimers() {
  whiteTimerEl.textContent = formatTime(timers.w);
  blackTimerEl.textContent = formatTime(timers.b);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function colorOf(piece) {
  return piece ? piece[0] : null;
}

function typeOf(piece) {
  return piece ? piece[1] : null;
}

function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function cloneBoard(b) {
  return b.map(row => row.slice());
}

function render() {
  boardEl.innerHTML = "";
  updateTimers();
  updateCaptured();
  renderMoves();

  const checkSquare = findKing(turn);
  const kingInCheck = checkSquare && isSquareAttacked(checkSquare.r, checkSquare.c, opposite(turn), board);

  for (let displayR = 0; displayR < 8; displayR++) {
    for (let displayC = 0; displayC < 8; displayC++) {
      const r = flipped ? 7 - displayR : displayR;
      const c = flipped ? 7 - displayC : displayC;

      const square = document.createElement("div");
      square.className = `square ${(r + c) % 2 === 0 ? "light" : "dark"}`;
      square.dataset.r = r;
      square.dataset.c = c;

      if (selected && selected.r === r && selected.c === c) square.classList.add("selected");
      if (lastMove && ((lastMove.from.r === r && lastMove.from.c === c) || (lastMove.to.r === r && lastMove.to.c === c))) {
        square.classList.add("last-move");
      }
      if (kingInCheck && checkSquare.r === r && checkSquare.c === c) square.classList.add("in-check");

      const target = legalTargets.find(m => m.to.r === r && m.to.c === c);
      if (target) square.classList.add(board[r][c] || target.enPassant ? "capture" : "legal");

      const piece = board[r][c];
      if (piece) {
        const pieceEl = document.createElement("div");
        pieceEl.className = `piece ${colorOf(piece) === "w" ? "white-piece" : "black-piece"}`;
        pieceEl.textContent = PIECES[piece];
        square.appendChild(pieceEl);
      }

      square.addEventListener("click", () => onSquareClick(r, c));
      boardEl.appendChild(square);
    }
  }

  if (!gameOver) {
    const legal = getAllLegalMoves(turn);
    const inCheck = isKingInCheck(turn, board);
    if (legal.length === 0 && inCheck) {
      gameOver = true;
      statusText.textContent = "Chiếu hết";
      hintText.textContent = `${turn === "w" ? "Đen" : "Trắng"} thắng!`;
      clearInterval(timerInterval);
    } else if (legal.length === 0) {
      gameOver = true;
      statusText.textContent = "Hòa bí";
      hintText.textContent = "Không bên nào thắng.";
      clearInterval(timerInterval);
    } else {
      statusText.textContent = inCheck ? `${turnName(turn)} đang bị chiếu` : `Lượt ${turnName(turn)}`;
      hintText.textContent = selected ? "Chọn ô hợp lệ để đi." : "Chọn quân để đi.";
    }
  }
}

function onSquareClick(r, c) {
  if (gameOver || pendingPromotion) return;

  const piece = board[r][c];

  if (selected) {
    const move = legalTargets.find(m => m.to.r === r && m.to.c === c);
    if (move) {
      makeMove(move);
      return;
    }
  }

  if (piece && colorOf(piece) === turn) {
    selected = { r, c };
    legalTargets = getLegalMovesForPiece(r, c);
  } else {
    selected = null;
    legalTargets = [];
  }
  render();
}

function getLegalMovesForPiece(r, c) {
  const pseudo = getPseudoMoves(r, c, board);
  return pseudo.filter(m => {
    const test = cloneBoard(board);
    applyMoveToBoard(test, m, false);
    return !isKingInCheck(turn, test);
  });
}

function getAllLegalMoves(color) {
  const moves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (colorOf(board[r][c]) === color) {
        const pseudo = getPseudoMoves(r, c, board);
        for (const m of pseudo) {
          const test = cloneBoard(board);
          applyMoveToBoard(test, m, false);
          if (!isKingInCheck(color, test)) moves.push(m);
        }
      }
    }
  }
  return moves;
}

function getPseudoMoves(r, c, b) {
  const piece = b[r][c];
  if (!piece) return [];
  const color = colorOf(piece);
  const type = typeOf(piece);
  const enemy = opposite(color);
  const moves = [];

  const add = (rr, cc, extra = {}) => {
    if (!inBounds(rr, cc)) return;
    if (!b[rr][cc] || colorOf(b[rr][cc]) !== color) {
      moves.push({ from: { r, c }, to: { r: rr, c: cc }, ...extra });
    }
  };

  if (type === "p") {
    const dir = color === "w" ? -1 : 1;
    const startRow = color === "w" ? 6 : 1;
    const promoteRow = color === "w" ? 0 : 7;

    if (inBounds(r + dir, c) && !b[r + dir][c]) {
      add(r + dir, c, { promotion: r + dir === promoteRow });
      if (r === startRow && !b[r + 2 * dir][c]) {
        add(r + 2 * dir, c, { doublePawn: true });
      }
    }

    for (const dc of [-1, 1]) {
      const rr = r + dir, cc = c + dc;
      if (inBounds(rr, cc) && b[rr][cc] && colorOf(b[rr][cc]) === enemy) {
        add(rr, cc, { promotion: rr === promoteRow });
      }
      if (enPassantTarget && enPassantTarget.r === rr && enPassantTarget.c === cc) {
        add(rr, cc, { enPassant: true });
      }
    }
  }

  if (type === "n") {
    [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
      .forEach(([dr, dc]) => add(r + dr, c + dc));
  }

  if (type === "b" || type === "r" || type === "q") {
    const dirs = [];
    if (type === "b" || type === "q") dirs.push([-1,-1],[-1,1],[1,-1],[1,1]);
    if (type === "r" || type === "q") dirs.push([-1,0],[1,0],[0,-1],[0,1]);

    for (const [dr, dc] of dirs) {
      let rr = r + dr, cc = c + dc;
      while (inBounds(rr, cc)) {
        if (!b[rr][cc]) {
          add(rr, cc);
        } else {
          if (colorOf(b[rr][cc]) !== color) add(rr, cc);
          break;
        }
        rr += dr;
        cc += dc;
      }
    }
  }

  if (type === "k") {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr || dc) add(r + dr, c + dc);
      }
    }

    if (!isKingInCheck(color, b)) {
      const row = color === "w" ? 7 : 0;
      if (r === row && c === 4) {
        if (castlingRights[color + "K"] && !b[row][5] && !b[row][6] &&
            !isSquareAttacked(row, 5, enemy, b) && !isSquareAttacked(row, 6, enemy, b)) {
          moves.push({ from: { r, c }, to: { r: row, c: 6 }, castle: "K" });
        }
        if (castlingRights[color + "Q"] && !b[row][1] && !b[row][2] && !b[row][3] &&
            !isSquareAttacked(row, 3, enemy, b) && !isSquareAttacked(row, 2, enemy, b)) {
          moves.push({ from: { r, c }, to: { r: row, c: 2 }, castle: "Q" });
        }
      }
    }
  }

  return moves;
}

function makeMove(move) {
  const movingPiece = board[move.from.r][move.from.c];
  const targetPiece = move.enPassant
    ? board[move.from.r][move.to.c]
    : board[move.to.r][move.to.c];

  const snapshot = {
    board: cloneBoard(board),
    turn,
    lastMove,
    capturedByWhite: capturedByWhite.slice(),
    capturedByBlack: capturedByBlack.slice(),
    enPassantTarget: enPassantTarget ? { ...enPassantTarget } : null,
    castlingRights: { ...castlingRights },
    timers: { ...timers },
    notation: ""
  };

  if (targetPiece) {
    if (turn === "w") capturedByWhite.push(targetPiece);
    else capturedByBlack.push(targetPiece);
  }

  applyMoveToBoard(board, move, true);
  updateCastlingRights(movingPiece, move);

  if (move.doublePawn) {
    enPassantTarget = {
      r: (move.from.r + move.to.r) / 2,
      c: move.from.c
    };
  } else {
    enPassantTarget = null;
  }

  lastMove = { from: move.from, to: move.to };
  const notationBase = makeNotation(movingPiece, move, targetPiece);

  selected = null;
  legalTargets = [];

  if (move.promotion) {
    pendingPromotion = { move, color: turn, snapshot, notationBase };
    promotionModal.classList.remove("hidden");
    render();
    return;
  }

  finishMove(snapshot, notationBase);
}

function finishMove(snapshot, notationBase) {
  turn = opposite(turn);
  const suffix = isKingInCheck(turn, board) ? "+" : "";
  snapshot.notation = notationBase + suffix;
  moveHistory.push(snapshot);
  render();
}

function applyMoveToBoard(b, move, realMove) {
  const piece = b[move.from.r][move.from.c];
  b[move.from.r][move.from.c] = null;

  if (move.enPassant) {
    b[move.from.r][move.to.c] = null;
  }

  if (move.castle) {
    const row = move.from.r;
    if (move.castle === "K") {
      b[row][5] = b[row][7];
      b[row][7] = null;
    } else {
      b[row][3] = b[row][0];
      b[row][0] = null;
    }
  }

  b[move.to.r][move.to.c] = piece;
}

function updateCastlingRights(piece, move) {
  const color = colorOf(piece);
  const type = typeOf(piece);

  if (type === "k") {
    castlingRights[color + "K"] = false;
    castlingRights[color + "Q"] = false;
  }

  if (type === "r") {
    if (move.from.r === 7 && move.from.c === 0) castlingRights.wQ = false;
    if (move.from.r === 7 && move.from.c === 7) castlingRights.wK = false;
    if (move.from.r === 0 && move.from.c === 0) castlingRights.bQ = false;
    if (move.from.r === 0 && move.from.c === 7) castlingRights.bK = false;
  }

  if (move.to.r === 7 && move.to.c === 0) castlingRights.wQ = false;
  if (move.to.r === 7 && move.to.c === 7) castlingRights.wK = false;
  if (move.to.r === 0 && move.to.c === 0) castlingRights.bQ = false;
  if (move.to.r === 0 && move.to.c === 7) castlingRights.bK = false;
}

function promote(pieceType) {
  if (!pendingPromotion) return;
  const { move, color, snapshot, notationBase } = pendingPromotion;
  board[move.to.r][move.to.c] = color + pieceType;
  pendingPromotion = null;
  promotionModal.classList.add("hidden");
  finishMove(snapshot, notationBase + "=" + pieceType.toUpperCase());
}

document.querySelectorAll(".promotion-options button").forEach(btn => {
  btn.addEventListener("click", () => promote(btn.dataset.piece));
});

function makeNotation(piece, move, captured) {
  const type = typeOf(piece);
  if (move.castle === "K") return "O-O";
  if (move.castle === "Q") return "O-O-O";
  const names = { p: "", n: "N", b: "B", r: "R", q: "Q", k: "K" };
  const fromFile = "abcdefgh"[move.from.c];
  const to = squareName(move.to.r, move.to.c);
  const captureMark = captured || move.enPassant ? "x" : "";
  return type === "p" && captureMark ? `${fromFile}x${to}` : `${names[type]}${captureMark}${to}`;
}

function squareName(r, c) {
  return "abcdefgh"[c] + (8 - r);
}

function renderMoves() {
  moveList.innerHTML = "";
  moveHistory.forEach((m, i) => {
    if (i % 2 === 0) {
      const li = document.createElement("li");
      li.textContent = m.notation;
      moveList.appendChild(li);
    } else {
      moveList.lastElementChild.textContent += `   ${m.notation}`;
    }
  });
}

function updateCaptured() {
  whiteCapturedEl.textContent = capturedByWhite.map(p => PIECES[p]).join(" ");
  blackCapturedEl.textContent = capturedByBlack.map(p => PIECES[p]).join(" ");
}

function undo() {
  const last = moveHistory.pop();
  if (!last) return;
  board = cloneBoard(last.board);
  turn = last.turn;
  lastMove = last.lastMove;
  capturedByWhite = last.capturedByWhite.slice();
  capturedByBlack = last.capturedByBlack.slice();
  enPassantTarget = last.enPassantTarget ? { ...last.enPassantTarget } : null;
  castlingRights = { ...last.castlingRights };
  timers = { ...last.timers };
  selected = null;
  legalTargets = [];
  gameOver = false;
  pendingPromotion = null;
  promotionModal.classList.add("hidden");
  startTimer();
  render();
}

function opposite(color) {
  return color === "w" ? "b" : "w";
}

function turnName(color) {
  return color === "w" ? "Trắng" : "Đen";
}

function findKing(color, b = board) {
  const king = color + "k";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (b[r][c] === king) return { r, c };
    }
  }
  return null;
}

function isKingInCheck(color, b) {
  const king = findKing(color, b);
  if (!king) return true;
  return isSquareAttacked(king.r, king.c, opposite(color), b);
}

function isSquareAttacked(r, c, byColor, b) {
  const pawnDir = byColor === "w" ? -1 : 1;
  for (const dc of [-1, 1]) {
    const rr = r - pawnDir, cc = c - dc;
    if (inBounds(rr, cc) && b[rr][cc] === byColor + "p") return true;
  }

  for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
    const rr = r + dr, cc = c + dc;
    if (inBounds(rr, cc) && b[rr][cc] === byColor + "n") return true;
  }

  for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
    let rr = r + dr, cc = c + dc;
    while (inBounds(rr, cc)) {
      const p = b[rr][cc];
      if (p) {
        if (colorOf(p) === byColor && ["b", "q"].includes(typeOf(p))) return true;
        break;
      }
      rr += dr;
      cc += dc;
    }
  }

  for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    let rr = r + dr, cc = c + dc;
    while (inBounds(rr, cc)) {
      const p = b[rr][cc];
      if (p) {
        if (colorOf(p) === byColor && ["r", "q"].includes(typeOf(p))) return true;
        break;
      }
      rr += dr;
      cc += dc;
    }
  }

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr || dc) {
        const rr = r + dr, cc = c + dc;
        if (inBounds(rr, cc) && b[rr][cc] === byColor + "k") return true;
      }
    }
  }

  return false;
}

document.getElementById("newGameBtn").addEventListener("click", newGame);
document.getElementById("undoBtn").addEventListener("click", undo);
document.getElementById("flipBtn").addEventListener("click", () => {
  flipped = !flipped;
  render();
});

flipped = false;
newGame();
