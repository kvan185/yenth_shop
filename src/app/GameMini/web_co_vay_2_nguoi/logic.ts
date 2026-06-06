// @ts-nocheck
export function initLogic(options = {}) {
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
  let invalidHint = "";
  let applyingRemoteState = false;

  function newGame(shouldNotify = true) {
    size = Number(boardSizeSelect.value);
    board = Array.from({ length: size }, () => Array(size).fill(null));
    turn = "b";
    blackCaptures = 0;
    whiteCaptures = 0;
    history = [];
    lastMove = null;
    passCount = 0;
    previousHash = hashBoard(board);
    invalidHint = "";
    endModal.classList.add("hidden");
    render();
    if (shouldNotify) notifyStateChange();
  }

  function render() {
    boardEl.innerHTML = "";
    drawGrid();
    statusEl.textContent = `Lượt ${sideName(turn)}`;
    hintEl.textContent = invalidHint || (canActOnTurn(false) ? `Chạm giao điểm để đặt quân ${sideName(turn).toLowerCase()}.` : `Đang chờ ${sideName(turn)} đi.`);
    blackScoreEl.textContent = blackCaptures;
    whiteScoreEl.textContent = whiteCaptures;
    renderMoves();

    const pad = 7;
    const step = (100 - pad * 2) / (size - 1);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const pt = document.createElement("button");
        pt.type = "button";
        pt.className = "point";
        pt.style.left = `${pad + c * step}%`;
        pt.style.top = `${pad + r * step}%`;
        pt.dataset.r = r;
        pt.dataset.c = c;
        pt.setAttribute("aria-label", `${coord(r, c)} ${board[r][c] ? sideName(board[r][c]) : "trống"}`);

        if (lastMove && lastMove.r === r && lastMove.c === c) pt.classList.add("last");
        if (!board[r][c] && canActOnTurn(false)) pt.classList.add(turn === "b" ? "preview-black" : "preview-white");

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
    if (!canActOnTurn(true)) { render(); return; }
    if (board[r][c]) { invalidHint = "Giao điểm này đã có quân."; render(); return; }

    const snapshot = makeSnapshot();
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
    if (countLiberties(test, ownGroup) === 0) { invalidHint = "Không được tự sát."; render(); return; }
    const newHash = hashBoard(test);
    if (newHash === previousHash) { invalidHint = "Không được lặp lại bàn cờ ngay lập tức."; render(); return; }

    history.push({ ...snapshot, notation: `${sideName(turn)} ${coord(r, c)}${captured ? ` ăn ${captured}` : ""}` });
    board = test;
    if (turn === "b") blackCaptures += captured;
    else whiteCaptures += captured;
    previousHash = hashBoard(snapshot.board);
    lastMove = { r, c };
    passCount = 0;
    turn = enemy;
    invalidHint = "";
    render();
    notifyStateChange();
  }

  function passTurn() {
    if (!canActOnTurn(true)) { render(); return; }
    history.push({ ...makeSnapshot(), notation: `${sideName(turn)} bỏ lượt` });
    passCount++;
    if (passCount >= 2) {
      endText.textContent = `Hai bên đã bỏ lượt liên tiếp. Điểm ăn quân: Đen ${blackCaptures} - Trắng ${whiteCaptures}. Bạn có thể tự đếm đất để quyết định người thắng.`;
      endModal.classList.remove("hidden");
      notifyStateChange();
      return;
    }
    turn = opposite(turn);
    invalidHint = "";
    render();
    notifyStateChange();
  }

  function undo(shouldNotify = true) {
    const h = history.pop();
    if (!h) return;
    loadSnapshot(h);
    endModal.classList.add("hidden");
    render();
    if (shouldNotify) notifyStateChange();
  }

  function neighbors(r, c) { return [[r-1,c],[r+1,c],[r,c-1],[r,c+1]].filter(([rr, cc]) => rr >= 0 && rr < size && cc >= 0 && cc < size); }
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
        if (!seen.has(key) && b[nr][nc] === color) { seen.add(key); stack.push([nr, nc]); }
      }
    }
    return group;
  }
  function countLiberties(b, group) {
    const libs = new Set();
    group.forEach(([r, c]) => neighbors(r, c).forEach(([nr, nc]) => { if (!b[nr][nc]) libs.add(`${nr},${nc}`); }));
    return libs.size;
  }
  function cloneBoard(b) { return b.map(row => row.slice()); }
  function opposite(color) { return color === "b" ? "w" : "b"; }
  function sideName(color) { return color === "b" ? "Đen" : "Trắng"; }
  function hashBoard(b) { return b.map(row => row.map(x => x || ".").join("")).join("/"); }
  function coord(r, c) { return `${"ABCDEFGHJKLMNOPQRST"[c]}${size - r}`; }

  function renderMoves() {
    moveListEl.innerHTML = "";
    history.forEach(h => { const li = document.createElement("li"); li.textContent = h.notation; moveListEl.appendChild(li); });
    moveListEl.scrollTop = moveListEl.scrollHeight;
  }

  function isOnlineMode() { return options.isOnline?.() === true; }
  function playerColor() { return options.getPlayerColor?.() || null; }
  function canActOnTurn(showHint) {
    if (!isOnlineMode()) return true;
    const color = playerColor();
    if (!color) { if (showHint) invalidHint = "Bạn đang xem ván này. Chỉ hai người chơi được đặt quân."; return false; }
    if (color !== turn) { if (showHint) invalidHint = `Bạn cầm quân ${sideName(color)}. Đang chờ ${sideName(turn)} đi.`; return false; }
    return true;
  }

  function makeSnapshot() { return { board: cloneBoard(board), size, turn, blackCaptures, whiteCaptures, history: history.map(h => ({ ...h, board: cloneBoard(h.board) })), lastMove, passCount, previousHash }; }
  function loadSnapshot(state) {
    board = cloneBoard(state.board);
    size = state.size || board.length || 19;
    boardSizeSelect.value = String(size);
    turn = state.turn || "b";
    blackCaptures = state.blackCaptures || 0;
    whiteCaptures = state.whiteCaptures || 0;
    history = Array.isArray(state.history) ? state.history : [];
    lastMove = state.lastMove || null;
    passCount = state.passCount || 0;
    previousHash = state.previousHash || hashBoard(board);
    invalidHint = "";
  }
  function loadState(state) { if (!state?.board) return; applyingRemoteState = true; loadSnapshot(state); render(); applyingRemoteState = false; }
  function notifyStateChange() { if (!applyingRemoteState) options.onStateChange?.(makeSnapshot()); }

  const newBtn = document.getElementById("newBtn");
  const undoBtn = document.getElementById("undoBtn");
  const passBtn = document.getElementById("passBtn");
  const closeEndBtn = document.getElementById("closeEnd");
  const onNew = () => newGame();
  const onUndo = () => undo();
  const onPass = () => passTurn();
  const onClose = () => endModal.classList.add("hidden");
  newBtn.addEventListener("click", onNew);
  undoBtn.addEventListener("click", onUndo);
  passBtn.addEventListener("click", onPass);
  closeEndBtn.addEventListener("click", onClose);
  boardSizeSelect.addEventListener("change", onNew);

  newGame(false);
  return {
    cleanup() { newBtn.removeEventListener("click", onNew); undoBtn.removeEventListener("click", onUndo); passBtn.removeEventListener("click", onPass); closeEndBtn.removeEventListener("click", onClose); boardSizeSelect.removeEventListener("change", onNew); },
    getState: makeSnapshot,
    loadState,
    newGame,
  };
}
