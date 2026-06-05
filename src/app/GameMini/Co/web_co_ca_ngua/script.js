const boardEl=document.getElementById("board");
const playersEl=document.getElementById("players");
const logEl=document.getElementById("log");
const setup=document.getElementById("setup");
const controls=document.getElementById("controls");
const turnTitle=document.getElementById("turnTitle");
const hint=document.getElementById("hint");
const diceEl=document.getElementById("dice");
const rollBtn=document.getElementById("rollBtn");
const modal=document.getElementById("modal");
const modalText=document.getElementById("modalText");

const colors=["red","blue","green","yellow"];
const names={red:"Đỏ",blue:"Xanh Dương",green:"Xanh Lá",yellow:"Vàng"};
const startIndex={red:0,blue:14,green:28,yellow:42};
const finishEntry={red:55,blue:13,green:27,yellow:41};

let path=[], finishCells={}, homeSlots={};
let players=[], current=0, rolled=false, dice=0, legalPieces=[], gameOver=false;

function makePath(){
  const pts=[];
  const cx=50, cy=50, rx=39, ry=39;
  for(let i=0;i<56;i++){
    const a=(-135 + i*360/56)*Math.PI/180;
    pts.push({x:cx+rx*Math.cos(a),y:cy+ry*Math.sin(a)});
  }
  path=pts;

  finishCells={
    red: line(50,15,50,35,6),
    blue: line(85,50,65,50,6),
    green: line(50,85,50,65,6),
    yellow: line(15,50,35,50,6)
  };

  homeSlots={
    red:[[15,15],[25,15],[15,25],[25,25]],
    blue:[[75,15],[85,15],[75,25],[85,25]],
    green:[[75,75],[85,75],[75,85],[85,85]],
    yellow:[[15,75],[25,75],[15,85],[25,85]]
  };
}

function line(x1,y1,x2,y2,n){
  const arr=[];
  for(let i=0;i<n;i++){
    const t=i/(n-1);
    arr.push({x:x1+(x2-x1)*t,y:y1+(y2-y1)*t});
  }
  return arr;
}

function startGame(){
  const n=Number(document.getElementById("playerCount").value);
  players=colors.slice(0,n).map(color=>({
    color,
    pieces:Array.from({length:4},(_,i)=>({id:i,state:"home",steps:-1,finish:-1}))
  }));
  current=0; rolled=false; dice=0; legalPieces=[]; gameOver=false;
  setup.classList.add("hidden"); controls.classList.remove("hidden");
  logEl.innerHTML="";
  addLog("Ván mới bắt đầu. Đỏ đi trước.");
  render();
}

function render(){
  boardEl.innerHTML="";
  drawStaticBoard();
  drawPieces();
  renderPlayers();
  turnTitle.textContent=names[players[current]?.color] || "Chưa bắt đầu";
  rollBtn.disabled=rolled || gameOver || !players.length;
}

function drawStaticBoard(){
  ["red","blue","green","yellow"].forEach(color=>{
    const h=document.createElement("div");
    h.className=`home ${color}`;
    homeSlots[color].forEach(()=>{const s=document.createElement("div");s.className="home-slot";h.appendChild(s)});
    boardEl.appendChild(h);
  });

  const center=document.createElement("div");
  center.className="center"; center.textContent="CÁ NGỰA";
  boardEl.appendChild(center);

  path.forEach((p,i)=>{
    const c=document.createElement("div");
    c.className="path-cell";
    if(Object.values(startIndex).includes(i)) c.classList.add("safe");
    c.style.left=p.x+"%"; c.style.top=p.y+"%";
    c.dataset.kind="path"; c.dataset.index=i;
    if(isLegalCell("path",i)) c.classList.add("legal");
    c.onclick=()=>clickPath(i);
    boardEl.appendChild(c);
  });

  Object.entries(finishCells).forEach(([color,cells])=>{
    cells.forEach((p,i)=>{
      const c=document.createElement("div");
      c.className=`finish-cell ${color}`;
      c.style.left=p.x+"%"; c.style.top=p.y+"%";
      if(isLegalCell("finish",i,color)) c.classList.add("legal");
      c.onclick=()=>clickFinish(color,i);
      boardEl.appendChild(c);
    });
  });
}

function drawPieces(){
  players.forEach((pl,pi)=>{
    pl.pieces.forEach(piece=>{
      const pos=getPiecePos(pl.color,piece);
      const el=document.createElement("div");
      el.className=`piece ${pl.color}`;
      el.textContent=piece.id+1;
      el.style.position="absolute";
      el.style.left=pos.x+"%"; el.style.top=pos.y+"%";
      el.style.transform="translate(-50%,-50%)";
      el.style.cursor="pointer";
      el.onclick=()=>clickPiece(pi,piece.id);
      if(legalPieces.some(lp=>lp.pi===pi&&lp.id===piece.id)) el.style.outline="5px solid white";
      boardEl.appendChild(el);
    });
  });
}

function getPiecePos(color,piece){
  if(piece.state==="home") return homeSlots[color][piece.id];
  if(piece.state==="finished"){
    const base=finishCells[color][5];
    return {x:base.x+(piece.id-1.5)*2.2,y:base.y};
  }
  if(piece.state==="finish") return finishCells[color][piece.finish];
  return path[(startIndex[color]+piece.steps)%56];
}

function roll(){
  dice=1+Math.floor(Math.random()*6);
  diceEl.textContent=["","⚀","⚁","⚂","⚃","⚄","⚅"][dice];
  rolled=true;
  computeLegal();
  if(!legalPieces.length){
    addLog(`${names[players[current].color]} gieo ${dice} nhưng không có quân đi được.`);
    hint.textContent="Không có nước đi. Bấm bỏ lượt.";
  }else{
    addLog(`${names[players[current].color]} gieo ${dice}. Chọn quân để đi.`);
    hint.textContent="Chọn quân sáng viền trắng để đi.";
  }
  render();
}

function computeLegal(){
  legalPieces=[];
  const pl=players[current];
  pl.pieces.forEach(pc=>{
    if(canMove(pl.color,pc,dice)) legalPieces.push({pi:current,id:pc.id});
  });
}

function canMove(color,piece,d){
  if(piece.state==="finished") return false;
  if(piece.state==="home") return d===6;
  if(piece.state==="finish") return piece.finish+d<=5 && !occupiedFinish(color,piece.finish+d);
  const newSteps=piece.steps+d;
  if(newSteps<56) return true;
  const f=newSteps-56;
  return f>=0 && f<=5 && !occupiedFinish(color,f);
}

function clickPiece(pi,id){
  if(!rolled||pi!==current)return;
  const legal=legalPieces.find(x=>x.pi===pi&&x.id===id);
  if(!legal)return;
  movePiece(id);
}

function clickPath(i){}
function clickFinish(color,i){}

function movePiece(id){
  const pl=players[current], pc=pl.pieces[id];
  let oldState=pc.state;
  if(pc.state==="home"){
    pc.state="path"; pc.steps=0;
    kickAtPath((startIndex[pl.color])%56, pl.color);
    addLog(`${names[pl.color]} xuất quân ${id+1}.`);
  }else if(pc.state==="path"){
    const newSteps=pc.steps+dice;
    if(newSteps<56){
      pc.steps=newSteps;
      const idx=(startIndex[pl.color]+pc.steps)%56;
      kickAtPath(idx,pl.color);
      addLog(`${names[pl.color]} đi quân ${id+1} ${dice} bước.`);
    }else{
      pc.state="finish";
      pc.finish=newSteps-56;
      addLog(`${names[pl.color]} đưa quân ${id+1} vào chuồng bậc ${pc.finish+1}.`);
    }
  }else if(pc.state==="finish"){
    pc.finish+=dice;
    addLog(`${names[pl.color]} leo chuồng quân ${id+1} lên bậc ${pc.finish+1}.`);
  }

  if(pc.state==="finish"&&pc.finish===5){
    pc.state="finished";
    addLog(`${names[pl.color]} đã về đích quân ${id+1}.`);
  }

  if(pl.pieces.every(p=>p.state==="finished")){
    gameOver=true;
    modalText.textContent=`${names[pl.color]} thắng vì đã đưa đủ 4 quân về đích!`;
    modal.classList.remove("hidden");
  }

  rolled=false; legalPieces=[];
  if(!gameOver && dice!==6) nextTurn();
  else if(!gameOver) addLog(`${names[pl.color]} gieo được 6 nên được thêm lượt.`);
  render();
}

function kickAtPath(pathIndex,color){
  players.forEach(pl=>{
    if(pl.color===color)return;
    pl.pieces.forEach(pc=>{
      if(pc.state==="path" && (startIndex[pl.color]+pc.steps)%56===pathIndex){
        pc.state="home"; pc.steps=-1; pc.finish=-1;
        addLog(`${names[color]} đá quân ${pc.id+1} của ${names[pl.color]} về nhà.`);
      }
    });
  });
}

function occupiedFinish(color,index){
  const pl=players.find(p=>p.color===color);
  return pl.pieces.some(p=>p.state==="finish"&&p.finish===index);
}

function nextTurn(){
  current=(current+1)%players.length;
  hint.textContent="Gieo xúc xắc để đi.";
}

function endTurn(){
  if(!rolled){ nextTurn(); render(); return; }
  rolled=false; legalPieces=[]; nextTurn(); render();
}

function isLegalCell(kind,index,color){
  return false;
}

function renderPlayers(){
  playersEl.innerHTML="";
  players.forEach((p,i)=>{
    const done=p.pieces.filter(x=>x.state==="finished").length;
    const div=document.createElement("div");
    div.className=`player ${i===current?"active":""}`;
    div.innerHTML=`<span class="dot" style="background:var(--${p.color})"></span><div><b>${names[p.color]}</b><br><span>${done}/4 quân về đích</span></div>`;
    playersEl.appendChild(div);
  });
}

function addLog(t){
  const d=document.createElement("div");
  d.textContent=t;
  logEl.prepend(d);
}

document.getElementById("startBtn").onclick=startGame;
document.getElementById("rollBtn").onclick=roll;
document.getElementById("endBtn").onclick=endTurn;
document.getElementById("newBtn").onclick=()=>{setup.classList.remove("hidden");controls.classList.add("hidden");players=[];logEl.innerHTML="";render();};
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");

makePath();
render();
