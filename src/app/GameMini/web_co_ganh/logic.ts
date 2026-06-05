// @ts-nocheck
export function initLogic() {
  const boardEl=document.getElementById("board");
const statusEl=document.getElementById("status");
const hintEl=document.getElementById("hint");
const whiteCountEl=document.getElementById("whiteCount");
const blackCountEl=document.getElementById("blackCount");
const moveListEl=document.getElementById("moveList");
const modal=document.getElementById("modal");
const modalText=document.getElementById("modalText");

const N=5;
const pad=12;
const step=(100-pad*2)/(N-1);
const dirs8=[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
const dirs4=[[-1,0],[1,0],[0,-1],[0,1]];

let board, turn, selected, legalMoves, history, flipped, lastMove, gameOver;

function initialBoard(){
  return [
    ["b","b","b","b","b"],
    ["b",null,null,null,"b"],
    ["b",null,null,null,"w"],
    ["w",null,null,null,"w"],
    ["w","w","w","w","w"]
  ];
}

function newGame(){
  board=initialBoard();
  turn="w"; selected=null; legalMoves=[]; history=[]; flipped=false; lastMove=null; gameOver=false;
  modal.classList.add("hidden");
  render();
}

function canDiagonal(r,c){
  return (r+c)%2===0;
}

function neighbors(r,c){
  const dirs=canDiagonal(r,c)?dirs8:dirs4;
  return dirs.map(([dr,dc])=>[r+dr,c+dc]).filter(([rr,cc])=>inBounds(rr,cc));
}

function inBounds(r,c){return r>=0&&r<N&&c>=0&&c<N}
function opposite(x){return x==="w"?"b":"w"}
function sideName(x){return x==="w"?"Trắng":"Đen"}

function render(){
  boardEl.innerHTML="";
  drawLines();
  updateCounts();
  renderMoves();

  const wc=count("w"), bc=count("b");
  if(!gameOver){
    if(wc===0||bc===0){
      endGame(`${wc>0?"Trắng":"Đen"} thắng vì đã đổi hết quân đối thủ.`);
    }else if(getAllMoves(turn).length===0){
      endGame(`${sideName(opposite(turn))} thắng vì ${sideName(turn)} không còn nước đi.`);
    }else{
      statusEl.textContent=`Lượt ${sideName(turn)}`;
      hintEl.textContent=selected?"Chọn điểm trống hợp lệ để đi.":"Chọn quân để đi theo đường nối.";
    }
  }

  for(let dr=0;dr<N;dr++){
    for(let dc=0;dc<N;dc++){
      const r=flipped?N-1-dr:dr, c=flipped?N-1-dc:dc;
      const p=document.createElement("div");
      p.className="point";
      p.style.left=`${pad+dc*step}%`;
      p.style.top=`${pad+dr*step}%`;

      if(selected&&selected.r===r&&selected.c===c) p.classList.add("selected");
      if(lastMove&&((lastMove.from.r===r&&lastMove.from.c===c)||(lastMove.to.r===r&&lastMove.to.c===c))) p.classList.add("last");
      if(legalMoves.some(m=>m.to.r===r&&m.to.c===c)) p.classList.add("legal");

      const piece=board[r][c];
      if(piece){
        const el=document.createElement("div");
        el.className=`piece ${piece}`;
        p.appendChild(el);
      }

      p.onclick=()=>clickPoint(r,c);
      boardEl.appendChild(p);
    }
  }
}

function drawLines(){
  const lines=[];
  // ngang + dọc
  for(let r=0;r<N;r++) for(let c=0;c<N-1;c++) lines.push([[r,c],[r,c+1]]);
  for(let c=0;c<N;c++) for(let r=0;r<N-1;r++) lines.push([[r,c],[r+1,c]]);
  // chéo trên các ô có giao điểm chéo
  for(let r=0;r<N-1;r++){
    for(let c=0;c<N-1;c++){
      if((r+c)%2===0){
        lines.push([[r,c],[r+1,c+1]]);
        lines.push([[r+1,c],[r,c+1]]);
      }
    }
  }
  lines.forEach(([a,b])=>addLine(a,b));
}

function addLine(a,b){
  const [r1,c1]=a,[r2,c2]=b;
  const x1=pad+c1*step,y1=pad+r1*step,x2=pad+c2*step,y2=pad+r2*step;
  const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy),ang=Math.atan2(dy,dx)*180/Math.PI;
  const l=document.createElement("div");
  l.className="line";
  l.style.left=`${x1}%`; l.style.top=`${y1}%`; l.style.width=`${len}%`; l.style.transform=`rotate(${ang}deg)`;
  boardEl.appendChild(l);
}

function clickPoint(r,c){
  if(gameOver)return;
  if(selected){
    const mv=legalMoves.find(m=>m.to.r===r&&m.to.c===c);
    if(mv){makeMove(mv);return;}
  }
  if(board[r][c]===turn){
    selected={r,c};
    legalMoves=getMovesForPiece(r,c);
  }else{
    selected=null; legalMoves=[];
  }
  render();
}

function getMovesForPiece(r,c){
  if(board[r][c]!==turn)return[];
  return neighbors(r,c).filter(([rr,cc])=>!board[rr][cc]).map(([rr,cc])=>({from:{r,c},to:{r:rr,c:cc}}));
}

function getAllMoves(side){
  let arr=[];
  for(let r=0;r<N;r++)for(let c=0;c<N;c++){
    if(board[r][c]===side){
      neighbors(r,c).forEach(([rr,cc])=>{
        if(!board[rr][cc])arr.push({from:{r,c},to:{r:rr,c:cc}});
      });
    }
  }
  return arr;
}

function makeMove(m){
  const snapshot={
    board:clone(board),turn,selected,legalMoves:[...legalMoves],lastMove:lastMove?JSON.parse(JSON.stringify(lastMove)):null,
    notation:""
  };

  board[m.to.r][m.to.c]=board[m.from.r][m.from.c];
  board[m.from.r][m.from.c]=null;

  const flippedPieces=[];
  flippedPieces.push(...applyGanh(m.to.r,m.to.c,turn));
  flippedPieces.push(...applyVay(turn));

  snapshot.notation=`${sideName(turn)} ${pos(m.from)}-${pos(m.to)}${flippedPieces.length?` đổi ${flippedPieces.length} quân`:""}`;
  history.push(snapshot);

  lastMove={from:m.from,to:m.to};
  selected=null; legalMoves=[];
  turn=opposite(turn);
  render();
}

function applyGanh(r,c,side){
  const enemy=opposite(side);
  const changed=[];
  const pairs=[[[0,1],[0,-1]],[[1,0],[-1,0]],[[1,1],[-1,-1]],[[1,-1],[-1,1]]];

  for(const [[a,b],[x,y]] of pairs){
    const r1=r+a,c1=c+b,r2=r+x,c2=c+y;
    if(!inBounds(r1,c1)||!inBounds(r2,c2))continue;
    if(board[r1][c1]===enemy && board[r2][c2]===enemy){
      board[r1][c1]=side; board[r2][c2]=side;
      changed.push([r1,c1],[r2,c2]);
    }
  }
  return changed;
}

function applyVay(side){
  const enemy=opposite(side);
  const visited=new Set();
  const changed=[];

  for(let r=0;r<N;r++)for(let c=0;c<N;c++){
    if(board[r][c]===enemy && !visited.has(`${r},${c}`)){
      const group=[];
      const stack=[[r,c]];
      visited.add(`${r},${c}`);
      let hasMove=false;

      while(stack.length){
        const [cr,cc]=stack.pop();
        group.push([cr,cc]);
        for(const [nr,nc] of neighbors(cr,cc)){
          if(!board[nr][nc]) hasMove=true;
          if(board[nr][nc]===enemy && !visited.has(`${nr},${nc}`)){
            visited.add(`${nr},${nc}`);
            stack.push([nr,nc]);
          }
        }
      }

      if(!hasMove){
        group.forEach(([gr,gc])=>{
          board[gr][gc]=side;
          changed.push([gr,gc]);
        });
      }
    }
  }

  return changed;
}

function updateCounts(){
  whiteCountEl.textContent=count("w");
  blackCountEl.textContent=count("b");
}

function count(side){
  let n=0;
  for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(board[r][c]===side)n++;
  return n;
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
  board=clone(h.board);
  turn=h.turn;
  selected=null;
  legalMoves=[];
  lastMove=h.lastMove;
  gameOver=false;
  modal.classList.add("hidden");
  render();
}

function clone(b){return b.map(row=>row.slice())}
function pos(p){return `${String.fromCharCode(65+p.c)}${N-p.r}`}

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

}
