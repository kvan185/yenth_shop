const boardEl=document.getElementById("board");
const statusEl=document.getElementById("status");
const hintEl=document.getElementById("hint");
const blackScoreEl=document.getElementById("blackScore");
const whiteScoreEl=document.getElementById("whiteScore");
const moveListEl=document.getElementById("moveList");
const modal=document.getElementById("winnerModal");
const winnerText=document.getElementById("winnerText");

let board, turn, selected, legalMoves, history, flipped, lastMove;
let blackCaptured=0, whiteCaptured=0;
let forcedPiece=null;
let gameOver=false;

function initBoard(){
  const b=Array.from({length:8},()=>Array(8).fill(null));
  for(let r=0;r<3;r++) for(let c=0;c<8;c++) if((r+c)%2===1) b[r][c]={color:"b",king:false};
  for(let r=5;r<8;r++) for(let c=0;c<8;c++) if((r+c)%2===1) b[r][c]={color:"w",king:false};
  return b;
}

function newGame(){
  board=initBoard(); turn="b"; selected=null; legalMoves=[]; history=[]; flipped=false; lastMove=null;
  blackCaptured=0; whiteCaptured=0; forcedPiece=null; gameOver=false; modal.classList.add("hidden");
  render();
}

function render(){
  boardEl.innerHTML="";
  blackScoreEl.textContent=blackCaptured;
  whiteScoreEl.textContent=whiteCaptured;
  renderMoves();

  if(!gameOver){
    const all=getAllLegal(turn);
    if(all.length===0){
      gameOver=true;
      const winner=turn==="b"?"Trắng":"Đen";
      statusEl.textContent="Kết thúc";
      hintEl.textContent=`${winner} thắng!`;
      showWinner(`${winner} thắng vì đối thủ không còn nước đi.`);
    }else{
      statusEl.textContent=`Lượt ${turn==="b"?"Đen":"Trắng"}`;
      hintEl.textContent=forcedPiece?"Bạn phải ăn tiếp bằng quân vừa ăn.":"Chọn quân để đi.";
    }
  }

  for(let dr=0;dr<8;dr++){
    for(let dc=0;dc<8;dc++){
      const r=flipped?7-dr:dr, c=flipped?7-dc:dc;
      const sq=document.createElement("div");
      sq.className=`square ${(r+c)%2===0?"light":"dark"}`;
      if(selected&&selected.r===r&&selected.c===c) sq.classList.add("selected");
      if(lastMove&&((lastMove.from.r===r&&lastMove.from.c===c)||(lastMove.to.r===r&&lastMove.to.c===c))) sq.classList.add("last");
      const lm=legalMoves.find(m=>m.to.r===r&&m.to.c===c);
      if(lm) sq.classList.add(lm.capture?"capture":"legal");

      const p=board[r][c];
      if(p){
        const pe=document.createElement("div");
        pe.className=`piece ${p.color==="b"?"black":"white"} ${p.king?"king":""}`;
        pe.textContent=p.king?"♛":"";
        sq.appendChild(pe);
      }

      sq.onclick=()=>clickSquare(r,c);
      boardEl.appendChild(sq);
    }
  }
}

function clickSquare(r,c){
  if(gameOver) return;
  const p=board[r][c];

  if(selected){
    const mv=legalMoves.find(m=>m.to.r===r&&m.to.c===c);
    if(mv){ makeMove(mv); return; }
  }

  if(p&&p.color===turn){
    if(forcedPiece&&(forcedPiece.r!==r||forcedPiece.c!==c)){
      hintEl.textContent="Bạn phải ăn tiếp bằng quân vừa nhảy.";
      return;
    }
    const moves=getLegalForPiece(r,c);
    if(moves.length){
      selected={r,c}; legalMoves=moves;
    }else{
      selected=null; legalMoves=[];
    }
  }else{
    selected=null; legalMoves=[];
  }
  render();
}

function getLegalForPiece(r,c){
  const all=getAllLegal(turn);
  const captures=all.filter(m=>m.capture);
  const source=(captures.length?captures:all).filter(m=>m.from.r===r&&m.from.c===c);
  if(forcedPiece) return source.filter(m=>m.capture&&m.from.r===forcedPiece.r&&m.from.c===forcedPiece.c);
  return source;
}

function getAllLegal(color){
  let moves=[];
  for(let r=0;r<8;r++) for(let c=0;c<8;c++){
    if(board[r][c]?.color===color) moves.push(...getPseudo(r,c));
  }
  const captures=moves.filter(m=>m.capture);
  return captures.length?captures:moves;
}

function getPseudo(r,c){
  const p=board[r][c]; if(!p) return [];
  const dirs=[];
  if(p.king||p.color==="b") dirs.push([1,-1],[1,1]);
  if(p.king||p.color==="w") dirs.push([-1,-1],[-1,1]);

  const moves=[];
  for(const [dr,dc] of dirs){
    const r1=r+dr,c1=c+dc,r2=r+dr*2,c2=c+dc*2;
    if(inBounds(r1,c1)&&!board[r1][c1]) moves.push({from:{r,c},to:{r:r1,c:c1}});
    if(inBounds(r2,c2)&&board[r1]?.[c1]&&board[r1][c1].color!==p.color&&!board[r2][c2]){
      moves.push({from:{r,c},to:{r:r2,c:c2},capture:{r:r1,c:c1}});
    }
  }
  return moves;
}

function makeMove(m){
  const snapshot={
    board:cloneBoard(board),turn,selected,legalMoves:[...legalMoves],blackCaptured,whiteCaptured,
    forcedPiece:forcedPiece?{...forcedPiece}:null,lastMove:lastMove?JSON.parse(JSON.stringify(lastMove)):null,
    notation:notation(m)
  };
  history.push(snapshot);

  const p=board[m.from.r][m.from.c];
  board[m.from.r][m.from.c]=null;
  board[m.to.r][m.to.c]=p;
  if(m.capture){
    const eaten=board[m.capture.r][m.capture.c];
    board[m.capture.r][m.capture.c]=null;
    if(turn==="b") blackCaptured++; else whiteCaptured++;
  }

  if((p.color==="b"&&m.to.r===7)||(p.color==="w"&&m.to.r===0)) p.king=true;

  lastMove={from:m.from,to:m.to};
  selected=null; legalMoves=[];

  if(m.capture){
    const nextCaptures=getPseudo(m.to.r,m.to.c).filter(x=>x.capture);
    if(nextCaptures.length){
      forcedPiece={r:m.to.r,c:m.to.c};
      selected={r:m.to.r,c:m.to.c};
      legalMoves=nextCaptures;
      render();
      return;
    }
  }

  forcedPiece=null;
  turn=turn==="b"?"w":"b";
  render();
}

function notation(m){
  const side=turn==="b"?"Đen":"Trắng";
  const sep=m.capture?"x":"-";
  return `${side} ${coord(m.from)}${sep}${coord(m.to)}`;
}

function coord(p){
  return "abcdefgh"[p.c]+(8-p.r);
}

function cloneBoard(b){
  return b.map(row=>row.map(p=>p?{...p}:null));
}

function inBounds(r,c){return r>=0&&r<8&&c>=0&&c<8}

function renderMoves(){
  moveListEl.innerHTML="";
  history.forEach((h,i)=>{
    const li=document.createElement("li");
    li.textContent=h.notation;
    moveListEl.appendChild(li);
  });
}

function undo(){
  const h=history.pop();
  if(!h) return;
  board=cloneBoard(h.board); turn=h.turn; blackCaptured=h.blackCaptured; whiteCaptured=h.whiteCaptured;
  forcedPiece=h.forcedPiece; lastMove=h.lastMove; selected=null; legalMoves=[]; gameOver=false; modal.classList.add("hidden");
  render();
}

function showWinner(text){
  winnerText.textContent=text;
  modal.classList.remove("hidden");
}

document.getElementById("newBtn").onclick=newGame;
document.getElementById("undoBtn").onclick=undo;
document.getElementById("flipBtn").onclick=()=>{flipped=!flipped;render()};
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");

newGame();
