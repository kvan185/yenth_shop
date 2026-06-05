// @ts-nocheck
export function initLogic() {
  const boardEl=document.getElementById("board");
const statusEl=document.getElementById("status");
const hintEl=document.getElementById("hint");
const score1El=document.getElementById("score1");
const score2El=document.getElementById("score2");
const moveListEl=document.getElementById("moveList");

const dirModal=document.getElementById("dirModal");
const endModal=document.getElementById("endModal");
const endText=document.getElementById("endText");

let cells, turn, scores, history, selectedIndex, gameOver;

function initGame(){
  cells=[
    {type:"quan",seeds:0,quan:true}, //0
    {type:"dan",seeds:5},
    {type:"dan",seeds:5},
    {type:"dan",seeds:5},
    {type:"dan",seeds:5},
    {type:"dan",seeds:5},
    {type:"quan",seeds:0,quan:true}, //6
    {type:"dan",seeds:5},
    {type:"dan",seeds:5},
    {type:"dan",seeds:5},
    {type:"dan",seeds:5},
    {type:"dan",seeds:5}
  ];

  turn=1;
  scores={1:0,2:0};
  history=[];
  selectedIndex=null;
  gameOver=false;
  endModal.classList.add("hidden");
  render();
}

function render(){
  boardEl.innerHTML="";
  renderCells();
  renderMoves();

  score1El.textContent=scores[1];
  score2El.textContent=scores[2];

  if(!gameOver){
    statusEl.textContent=`Lượt Người chơi ${turn}`;
    hintEl.textContent="Chọn ô bên mình để rải quân.";
  }

  if(isGameEnd()){
    finishGame();
  }
}

function renderCells(){
  createCell(0,"qLeft");
  createCell(6,"qRight");

  for(let i=1;i<=5;i++){
    createCell(i,null,true);
  }

  for(let i=7;i<=11;i++){
    createCell(i,null,false);
  }
}

function createCell(index,id=null,top=true){
  const c=document.createElement("div");
  c.className=`cell ${cells[index].type}`;

  if(id)c.id=id;

  if(cells[index].type==="quan"){
    c.style.left=index===0?"1%":"85%";
    c.style.top="11%";
  }else{
    const pos=(index<=5)?index-1:index-7;
    const left=15+pos*14;

    c.style.left=`${left}%`;
    c.classList.add(top?"top-row":"bot-row");
  }

  if(selectedIndex===index)c.classList.add("active");

  const title=document.createElement("div");
  title.className="cell-title";
  title.textContent=cells[index].type==="quan"?"QUAN":"DÂN";
  c.appendChild(title);

  const wrap=document.createElement("div");
  wrap.className="seed-wrap";

  if(cells[index].quan){
    const q=document.createElement("div");
    q.className="quan-seed";
    wrap.appendChild(q);
  }

  for(let i=0;i<cells[index].seeds;i++){
    const s=document.createElement("div");
    s.className="seed";
    wrap.appendChild(s);
  }

  c.appendChild(wrap);

  const count=document.createElement("div");
  count.className="count";
  count.textContent=cells[index].seeds + (cells[index].quan? " + Quan":"");
  c.appendChild(count);

  c.onclick=()=>selectCell(index);

  boardEl.appendChild(c);
}

function sideCells(player){
  return player===1?[7,8,9,10,11]:[1,2,3,4,5];
}

function selectCell(index){
  if(gameOver)return;

  if(!sideCells(turn).includes(index)){
    hintEl.textContent="Bạn chỉ được chọn ô bên mình.";
    return;
  }

  if(cells[index].seeds===0){
    hintEl.textContent="Ô này không còn quân.";
    return;
  }

  selectedIndex=index;
  render();
  dirModal.classList.remove("hidden");
}

document.getElementById("leftBtn").onclick=()=>play(-1);
document.getElementById("rightBtn").onclick=()=>play(1);

function play(dir){
  dirModal.classList.add("hidden");

  const snapshot={
    cells:JSON.parse(JSON.stringify(cells)),
    turn,
    scores:{...scores},
    notation:`Người ${turn} chọn ô ${selectedIndex}`
  };

  history.push(snapshot);

  let pos=selectedIndex;
  let seeds=cells[pos].seeds;
  cells[pos].seeds=0;

  while(seeds>0){
    pos=next(pos,dir);
    cells[pos].seeds++;
    seeds--;
  }

  while(true){
    let nextPos=next(pos,dir);

    if(cells[nextPos].seeds>0){
      seeds=cells[nextPos].seeds;
      cells[nextPos].seeds=0;
      pos=nextPos;

      while(seeds>0){
        pos=next(pos,dir);
        cells[pos].seeds++;
        seeds--;
      }
    }else{
      let eatPos=next(nextPos,dir);

      if(cells[eatPos].seeds>0 || cells[eatPos].quan){
        const gained=cells[eatPos].seeds + (cells[eatPos].quan?10:0);
        scores[turn]+=gained;

        cells[eatPos].seeds=0;
        cells[eatPos].quan=false;

        pos=eatPos;
      }else{
        break;
      }
    }
  }

  refillIfNeeded();

  selectedIndex=null;
  turn=turn===1?2:1;
  render();
}

function refillIfNeeded(){
  [1,2].forEach(player=>{
    const arr=sideCells(player);
    const total=arr.reduce((a,b)=>a+cells[b].seeds,0);

    if(total===0){
      if(scores[player]>=5){
        scores[player]-=5;
        arr.forEach(i=>cells[i].seeds=1);
      }
    }
  });
}

function next(i,d){
  return (i+d+12)%12;
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

  cells=JSON.parse(JSON.stringify(h.cells));
  turn=h.turn;
  scores={...h.scores};
  selectedIndex=null;
  gameOver=false;
  endModal.classList.add("hidden");
  render();
}

function isGameEnd(){
  return !cells[0].quan && !cells[6].quan;
}

function finishGame(){
  if(gameOver)return;

  gameOver=true;

  sideCells(1).forEach(i=>{
    scores[1]+=cells[i].seeds;
    cells[i].seeds=0;
  });

  sideCells(2).forEach(i=>{
    scores[2]+=cells[i].seeds;
    cells[i].seeds=0;
  });

  let text="";
  if(scores[1]>scores[2]){
    text=`Người chơi 1 thắng với ${scores[1]} điểm. Người chơi 2 có ${scores[2]} điểm.`;
  }else if(scores[2]>scores[1]){
    text=`Người chơi 2 thắng với ${scores[2]} điểm. Người chơi 1 có ${scores[1]} điểm.`;
  }else{
    text=`Hai người hòa nhau với ${scores[1]} điểm.`;
  }

  statusEl.textContent="Kết thúc";
  hintEl.textContent=text;

  endText.textContent=text;
  endModal.classList.remove("hidden");
}

document.getElementById("newBtn").onclick=initGame;
document.getElementById("undoBtn").onclick=undo;
document.getElementById("closeEnd").onclick=()=>endModal.classList.add("hidden");

initGame();

}
