const boardEl=document.getElementById("board");
const statusEl=document.getElementById("status");
const hintEl=document.getElementById("hint");
const blueCapEl=document.getElementById("blueCaptured");
const redCapEl=document.getElementById("redCaptured");
const moveListEl=document.getElementById("moveList");
const modal=document.getElementById("modal");
const modalText=document.getElementById("modalText");

const animals={
  R:{name:"Chuột",icon:"🐭",rank:1},
  C:{name:"Mèo",icon:"🐱",rank:2},
  D:{name:"Chó",icon:"🐶",rank:3},
  W:{name:"Sói",icon:"🐺",rank:4},
  L:{name:"Báo",icon:"🐆",rank:5},
  T:{name:"Hổ",icon:"🐯",rank:6},
  I:{name:"Sư tử",icon:"🦁",rank:7},
  E:{name:"Voi",icon:"🐘",rank:8}
};

const waterCells=new Set(["3,1","3,2","4,1","4,2","5,1","5,2","3,4","3,5","4,4","4,5","5,4","5,5"]);
const dens={b:"8,3", r:"0,3"};
const traps={
  b:new Set(["8,2","7,3","8,4"]),
  r:new Set(["0,2","1,3","0,4"])
};

let board, turn, selected, legalMoves, history, flipped, lastMove, gameOver;
let capturedByBlue=[], capturedByRed=[];

function initBoard(){
  const b=Array.from({length:9},()=>Array(7).fill(null));
  // Đỏ phía trên
  place(b,0,0,"rI"); place(b,0,6,"rT"); place(b,1,1,"rD"); place(b,1,5,"rC");
  place(b,2,0,"rR"); place(b,2,2,"rL"); place(b,2,4,"rW"); place(b,2,6,"rE");
  // Xanh phía dưới
  place(b,8,6,"bI"); place(b,8,0,"bT"); place(b,7,5,"bD"); place(b,7,1,"bC");
  place(b,6,6,"bR"); place(b,6,4,"bL"); place(b,6,2,"bW"); place(b,6,0,"bE");
  return b;
}

function place(b,r,c,p){ b[r][c]={side:p[0],type:p[1]}; }
function key(r,c){return `${r},${c}`}
function inBounds(r,c){return r>=0&&r<9&&c>=0&&c<7}
function isWater(r,c){return waterCells.has(key(r,c))}
function isDen(r,c){return key(r,c)===dens.b||key(r,c)===dens.r}
function ownDen(side,r,c){return key(r,c)===dens[side]}
function enemyDen(side,r,c){return key(r,c)===dens[side==="b"?"r":"b"]}
function isTrapOf(side,r,c){return traps[side].has(key(r,c))}
function sideName(s){return s==="b"?"Xanh":"Đỏ"}
function opposite(s){return s==="b"?"r":"b"}

function newGame(){
  board=initBoard(); turn="b"; selected=null; legalMoves=[]; history=[]; flipped=false; lastMove=null; gameOver=false;
  capturedByBlue=[]; capturedByRed=[]; modal.classList.add("hidden");
  render();
}

function render(){
  boardEl.innerHTML="";
  updateCaptured();
  renderMoves();

  if(!gameOver){
    const all=getAllLegal(turn);
    if(all.length===0){
      endGame(`${sideName(opposite(turn))} thắng vì ${sideName(turn)} không còn nước đi.`);
    }else{
      statusEl.textContent=`Lượt ${sideName(turn)}`;
      hintEl.textContent=selected?"Chọn ô hợp lệ để đi.":"Chọn quân để đi.";
    }
  }

  for(let dr=0;dr<9;dr++){
    for(let dc=0;dc<7;dc++){
      const r=flipped?8-dr:dr, c=flipped?6-dc:dc;
      const cell=document.createElement("div");
      cell.className="cell";
      if(isWater(r,c)) cell.classList.add("water");
      if(isTrapOf("b",r,c)||isTrapOf("r",r,c)) cell.classList.add("trap");
      if(isDen(r,c)) cell.classList.add("den");
      if(selected&&selected.r===r&&selected.c===c) cell.classList.add("selected");
      if(lastMove&&((lastMove.from.r===r&&lastMove.from.c===c)||(lastMove.to.r===r&&lastMove.to.c===c))) cell.classList.add("last");
      const lm=legalMoves.find(m=>m.to.r===r&&m.to.c===c);
      if(lm) cell.classList.add(board[r][c]?"capture":"legal");

      const terrain=document.createElement("span");
      terrain.className="terrain";
      terrain.textContent=isWater(r,c)?"Sông":isDen(r,c)?"Hang":(isTrapOf("b",r,c)||isTrapOf("r",r,c))?"Bẫy":"";
      cell.appendChild(terrain);

      const p=board[r][c];
      if(p){
        const pe=document.createElement("div");
        pe.className=`piece ${p.side==="b"?"blue":"red"}`;
        pe.innerHTML=`${animals[p.type].icon}<span class="rank">${animals[p.type].rank}</span>`;
        cell.appendChild(pe);
      }
      cell.onclick=()=>clickCell(r,c);
      boardEl.appendChild(cell);
    }
  }
}

function clickCell(r,c){
  if(gameOver)return;
  const p=board[r][c];
  if(selected){
    const mv=legalMoves.find(m=>m.to.r===r&&m.to.c===c);
    if(mv){makeMove(mv);return;}
  }
  if(p&&p.side===turn){
    selected={r,c}; legalMoves=getLegalForPiece(r,c);
  }else{
    selected=null; legalMoves=[];
  }
  render();
}

function getAllLegal(side){
  let moves=[];
  for(let r=0;r<9;r++)for(let c=0;c<7;c++){
    if(board[r][c]?.side===side)moves.push(...getLegalForPiece(r,c));
  }
  return moves;
}

function getLegalForPiece(r,c){
  const p=board[r][c]; if(!p)return [];
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
  const moves=[];
  for(const [dr,dc] of dirs){
    let nr=r+dr,nc=c+dc;
    if(!inBounds(nr,nc))continue;
    if(ownDen(p.side,nr,nc))continue;

    if((p.type==="I"||p.type==="T")&&isWater(nr,nc)){
      const jump=jumpAcrossWater(r,c,dr,dc,p.side);
      if(jump && canEnter(p,jump.r,jump.c)) moves.push({from:{r,c},to:jump});
      continue;
    }

    if(isWater(nr,nc)&&p.type!=="R")continue;
    if(canEnter(p,nr,nc))moves.push({from:{r,c},to:{r:nr,c:nc}});
  }
  return moves;
}

function jumpAcrossWater(r,c,dr,dc,side){
  let nr=r+dr,nc=c+dc;
  while(inBounds(nr,nc)&&isWater(nr,nc)){
    if(board[nr][nc]?.type==="R")return null;
    nr+=dr; nc+=dc;
  }
  if(!inBounds(nr,nc))return null;
  return {r:nr,c:nc};
}

function canEnter(piece,r,c){
  const target=board[r][c];
  if(!target)return true;
  if(target.side===piece.side)return false;
  return canCapture(piece,target,r,c);
}

function effectiveRank(piece,r,c){
  const enemy=opposite(piece.side);
  if(isTrapOf(enemy,r,c)) return 0;
  return animals[piece.type].rank;
}

function canCapture(attacker,defender,r,c){
  // Chuột dưới sông không ăn quân trên cạn; chuột trên cạn không ăn chuột dưới sông
  const attackerInWater=isWater(selected?.r ?? -1, selected?.c ?? -1);
  const defenderInWater=isWater(r,c);
  if(attacker.type==="R"&&attackerInWater!==defenderInWater)return false;

  if(attacker.type==="R"&&defender.type==="E")return true;
  if(attacker.type==="E"&&defender.type==="R")return false;
  return animals[attacker.type].rank>=effectiveRank(defender,r,c);
}

function makeMove(m){
  const moving=board[m.from.r][m.from.c], target=board[m.to.r][m.to.c];
  history.push({
    board:cloneBoard(board),turn,selected,legalMoves:[...legalMoves],lastMove:lastMove?JSON.parse(JSON.stringify(lastMove)):null,
    capturedByBlue:[...capturedByBlue],capturedByRed:[...capturedByRed],notation:notation(m,moving,target)
  });

  if(target){
    if(turn==="b")capturedByBlue.push(target); else capturedByRed.push(target);
  }
  board[m.to.r][m.to.c]=moving;
  board[m.from.r][m.from.c]=null;
  lastMove={from:m.from,to:m.to};
  selected=null; legalMoves=[];

  if(enemyDen(moving.side,m.to.r,m.to.c)){
    endGame(`${sideName(moving.side)} thắng vì đã vào hang đối phương.`);
    render();
    return;
  }
  if(countPieces(opposite(turn))===0){
    endGame(`${sideName(turn)} thắng vì đã ăn hết quân đối phương.`);
    render();
    return;
  }
  turn=opposite(turn);
  render();
}

function countPieces(side){
  let n=0; for(let r=0;r<9;r++)for(let c=0;c<7;c++)if(board[r][c]?.side===side)n++;
  return n;
}

function notation(m,p,t){
  return `${sideName(p.side)} ${animals[p.type].name} ${pos(m.from)}${t?"x":"-"}${pos(m.to)}`;
}

function pos(p){return `${String.fromCharCode(65+p.c)}${9-p.r}`}

function cloneBoard(b){
  return b.map(row=>row.map(p=>p?{...p}:null));
}

function updateCaptured(){
  blueCapEl.innerHTML=""; redCapEl.innerHTML="";
  capturedByBlue.forEach(p=>blueCapEl.appendChild(mini(p)));
  capturedByRed.forEach(p=>redCapEl.appendChild(mini(p)));
}

function mini(p){
  const el=document.createElement("div");
  el.className="mini";
  el.textContent=animals[p.type].icon;
  return el;
}

function renderMoves(){
  moveListEl.innerHTML="";
  history.forEach(h=>{
    const li=document.createElement("li");
    li.textContent=h.notation;
    moveListEl.appendChild(li);
  });
}

function undo(){
  const h=history.pop();
  if(!h)return;
  board=cloneBoard(h.board); turn=h.turn; selected=null; legalMoves=[]; lastMove=h.lastMove;
  capturedByBlue=[...h.capturedByBlue]; capturedByRed=[...h.capturedByRed]; gameOver=false; modal.classList.add("hidden");
  render();
}

function endGame(text){
  gameOver=true;
  statusEl.textContent="Kết thúc";
  hintEl.textContent=text;
  modalText.textContent=text;
  modal.classList.remove("hidden");
}

document.getElementById("newBtn").onclick=newGame;
document.getElementById("undoBtn").onclick=undo;
document.getElementById("flipBtn").onclick=()=>{flipped=!flipped;render()};
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");

newGame();
