// @ts-nocheck
export function initLogic(options = {}) {
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
let dragState = null;
let suppressClick = false;
let invalidHint = "";
let applyingRemoteState = false;

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

function newGame(shouldNotify = true) {
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
  invalidHint = "";
  startTimer();
  render();
  if (shouldNotify) notifyStateChange();
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
        if (colorOf(piece) === turn) square.classList.add("to-move");
        const pieceEl = document.createElement("div");
        pieceEl.className = `piece ${colorOf(piece) === "w" ? "white-piece" : "black-piece"}`;
        pieceEl.textContent = PIECES[piece];
        square.appendChild(pieceEl);
      }

      square.addEventListener("click", () => onSquareClick(r, c));
      square.addEventListener("pointerdown", event => onPointerDown(event, r, c));
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
      hintText.textContent = invalidHint || (selected ? "Thả vào ô sáng dấu hoặc click ô hợp lệ để đi." : `Đến lượt ${turnName(turn)}. Chỉ quân ${turnName(turn).toLowerCase()} đang phát sáng mới đi được.`);
    }
  }
}

function onSquareClick(r, c) {
  if (suppressClick) {
    suppressClick = false;
    return;
  }
  if (gameOver || pendingPromotion) return;

  const piece = board[r][c];

  if (!canActOnTurn()) {
    render();
    return;
  }

  if (selected) {
    const move = legalTargets.find(m => m.to.r === r && m.to.c === c);
    if (move) {
      makeMove(move);
      return;
    }
  }

  if (piece && canUsePiece(piece)) {
    invalidHint = "";
    selected = { r, c };
    legalTargets = getLegalMovesForPiece(r, c);
  } else {
    selected = null;
    legalTargets = [];
    if (piece) {
      invalidHint = invalidPieceHint(piece);
    } else {
      invalidHint = "";
    }
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
  notifyStateChange();
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
  notifyStateChange();
}

function opposite(color) {
  return color === "w" ? "b" : "w";
}

function turnName(color) {
  return color === "w" ? "Trắng" : "Đen";
}

function isOnlineMode() {
  return options.isOnline?.() === true;
}

function playerColor() {
  return options.getPlayerColor?.() || null;
}

function canActOnTurn() {
  if (!isOnlineMode()) return true;
  const color = playerColor();
  if (!color) {
    invalidHint = "Bạn đang xem ván này. Chỉ Trắng và Đen được đi quân.";
    return false;
  }
  if (color !== turn) {
    invalidHint = `Bạn cầm quân ${turnName(color)}. Đang chờ ${turnName(turn)} đi.`;
    return false;
  }
  return true;
}

function canUsePiece(piece) {
  if (!piece || colorOf(piece) !== turn) return false;
  if (!isOnlineMode()) return true;
  return playerColor() === colorOf(piece);
}

function invalidPieceHint(piece) {
  if (isOnlineMode() && playerColor() && colorOf(piece) !== playerColor()) {
    return `Bạn cầm quân ${turnName(playerColor())}, không thể đi quân ${turnName(colorOf(piece))}.`;
  }
  return `Chưa tới lượt ${turnName(colorOf(piece))}. Hiện tại là lượt ${turnName(turn)}.`;
}

function snapshotState() {
  return {
    board: cloneBoard(board),
    turn,
    selected: null,
    legalTargets: [],
    moveHistory: moveHistory.map(item => ({
      ...item,
      board: cloneBoard(item.board),
      capturedByWhite: item.capturedByWhite.slice(),
      capturedByBlack: item.capturedByBlack.slice(),
      castlingRights: { ...item.castlingRights },
      timers: { ...item.timers },
      enPassantTarget: item.enPassantTarget ? { ...item.enPassantTarget } : null,
    })),
    lastMove: lastMove ? { from: { ...lastMove.from }, to: { ...lastMove.to } } : null,
    capturedByWhite: capturedByWhite.slice(),
    capturedByBlack: capturedByBlack.slice(),
    enPassantTarget: enPassantTarget ? { ...enPassantTarget } : null,
    castlingRights: { ...castlingRights },
    timers: { ...timers },
    gameOver,
  };
}

function loadState(state) {
  if (!state?.board || !state?.turn) return;
  applyingRemoteState = true;
  board = cloneBoard(state.board);
  turn = state.turn;
  selected = null;
  legalTargets = [];
  moveHistory = Array.isArray(state.moveHistory) ? state.moveHistory : [];
  lastMove = state.lastMove || null;
  capturedByWhite = Array.isArray(state.capturedByWhite) ? state.capturedByWhite.slice() : [];
  capturedByBlack = Array.isArray(state.capturedByBlack) ? state.capturedByBlack.slice() : [];
  enPassantTarget = state.enPassantTarget || null;
  castlingRights = state.castlingRights || { wK: true, wQ: true, bK: true, bQ: true };
  timers = state.timers || { w: 600, b: 600 };
  gameOver = Boolean(state.gameOver);
  pendingPromotion = null;
  invalidHint = "";
  promotionModal.classList.add("hidden");
  startTimer();
  render();
  applyingRemoteState = false;
}

function notifyStateChange() {
  if (applyingRemoteState) return;
  options.onStateChange?.(snapshotState());
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

const newGameBtn = document.getElementById("newGameBtn");
const undoBtn = document.getElementById("undoBtn");
const flipBtn = document.getElementById("flipBtn");
const onNewGame = () => newGame();
const onUndo = () => undo();
const onFlip = () => {
  flipped = !flipped;
  render();
};
newGameBtn.addEventListener("click", onNewGame);
undoBtn.addEventListener("click", onUndo);
flipBtn.addEventListener("click", onFlip);

function onPointerDown(event, r, c) {
  if (gameOver || pendingPromotion || event.button > 0) return;
  const piece = board[r][c];
  if (!piece) return;
  if (!canActOnTurn()) {
    selected = null;
    legalTargets = [];
    render();
    return;
  }
  if (!canUsePiece(piece)) {
    invalidHint = invalidPieceHint(piece);
    selected = null;
    legalTargets = [];
    render();
    return;
  }

  event.preventDefault();
  invalidHint = "";
  selected = { r, c };
  legalTargets = getLegalMovesForPiece(r, c);
  render();

  const ghost = document.createElement("div");
  ghost.className = `drag-ghost ${colorOf(piece) === "w" ? "white-piece" : "black-piece"}`;
  ghost.textContent = PIECES[piece];
  document.body.appendChild(ghost);
  dragState = { from: { r, c }, ghost, moved: false };
  moveGhost(event.clientX, event.clientY);
  markDragOrigin(r, c);

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp, { once: true });
  window.addEventListener("pointercancel", cancelDrag, { once: true });
}

function onPointerMove(event) {
  if (!dragState) return;
  dragState.moved = true;
  moveGhost(event.clientX, event.clientY);
}

function onPointerUp(event) {
  if (!dragState) return;
  const target = squareFromPoint(event.clientX, event.clientY);
  const move = target && legalTargets.find(m => m.to.r === target.r && m.to.c === target.c);
  const moved = dragState.moved;
  cleanupDrag();
  if (move) makeMove(move);
  else render();
  suppressClick = moved;
}

function cancelDrag() {
  cleanupDrag();
  render();
}

function cleanupDrag() {
  if (dragState?.ghost) dragState.ghost.remove();
  dragState = null;
  window.removeEventListener("pointermove", onPointerMove);
}

function moveGhost(x, y) {
  if (!dragState?.ghost) return;
  dragState.ghost.style.left = `${x}px`;
  dragState.ghost.style.top = `${y}px`;
}

function markDragOrigin(r, c) {
  boardEl.querySelector(`.square[data-r="${r}"][data-c="${c}"]`)?.classList.add("drag-origin");
}

function squareFromPoint(x, y) {
  const el = document.elementFromPoint(x, y)?.closest?.(".square");
  if (!el || !boardEl.contains(el)) return null;
  return { r: Number(el.dataset.r), c: Number(el.dataset.c) };
}
flipped = false;
newGame(false);

return {
  cleanup() {
  clearInterval(timerInterval);
  cleanupDrag();
  newGameBtn.removeEventListener("click", onNewGame);
  undoBtn.removeEventListener("click", onUndo);
  flipBtn.removeEventListener("click", onFlip);
  },
  getState: snapshotState,
  loadState,
  newGame,
};

}


