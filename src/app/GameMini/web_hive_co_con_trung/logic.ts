// @ts-nocheck
export function initLogic() {
  const boardEl=document.getElementById("board");
const statusEl=document.getElementById("status");
const hintEl=document.getElementById("hint");
const whiteHandEl=document.getElementById("whiteHand");
const blackHandEl=document.getElementById("blackHand");
const selectedInfo=document.getElementById("selectedInfo");
const moveListEl=document.getElementById("moveList");
const modal=document.getElementById("modal");
const modalText=document.getElementById("modalText");

const bugs={
  Q:{name:"Ong", icon:"🐝", count:1},
  A:{name:"Kiến", icon:"🐜", count:3},
  B:{name:"Bọ", icon:"🪲", count:2},
  G:{name:"Châu chấu", icon:"🦗", count:3},
  S:{name:"Nhện", icon:"🕷️", count:2}
};

const dirs=[[1,0],[-1,0],[0,1],[0,-1],[1,-1],[-1,1]];
let stacks, hands, turn, selected, legalCells, history, moveNo, gameOver;

function newGame(){
  stacks=new Map();
  hands={
    w:{Q:1,A:3,B:2,G:3,S:2},
    b:{Q:1,A:3,B:2,G:3,S:2}
  };
  turn="w"; selected=null; legalCells=[]; history=[]; moveNo={w:0,b:0}; gameOver=false;
  modal.classList.add("hidden");
  render();
}

function key(q,r){return `${q},${r}`}
function parseKey(k){const [q,r]=k.split(",").map(Number);return {q,r}}
function topAt(q,r){
  const s=stacks.get(key(q,r));
  return s&&s.length?s[s.length-1]:null;
}
function occupied(q,r){return !!topAt(q,r)}
function neighbors(q,r){return dirs.map(([dq,dr])=>({q:q+dq,r:r+dr}))}
function sideName(s){return s==="w"?"Trắng":"Đen"}
function opposite(s){return s==="w"?"b":"w"}

function render(){
  renderHands();
  renderBoard();
  renderMoves();

  if(!gameOver){
    statusEl.textContent=`Lượt ${sideName(turn)}`;
    hintEl.textContent=selected? "Chọn ô sáng để đặt/di chuyển." : "Chọn quân trong kho hoặc quân trên bàn.";
  }

  selectedInfo.textContent=selected
    ? selected.kind==="hand"
      ? `${sideName(turn)} đặt ${bugs[selected.bug].name}`
      : `${bugs[selected.piece.bug].name} ${sideName(selected.piece.side)}`
    : "Chưa chọn";
}

function renderHands(){
  whiteHandEl.innerHTML="";
  blackHandEl.innerHTML="";
  renderHand("w",whiteHandEl);
  renderHand("b",blackHandEl);
}

function renderHand(side,el){
  Object.keys(bugs).forEach(b=>{
    const btn=document.createElement("button");
    btn.className="hand-piece";
    if(selected?.kind==="hand"&&selected.bug===b&&turn===side) btn.classList.add("selected");
    if(side!==turn||hands[side][b]<=0) btn.classList.add("disabled");
    btn.innerHTML=`<span class="bug-icon">${bugs[b].icon}</span><span>${bugs[b].name}</span><span class="bug-count">x${hands[side][b]}</span>`;
    btn.onclick=()=>selectHand(side,b);
    el.appendChild(btn);
  });
}

function selectHand(side,bug){
  if(gameOver||side!==turn||hands[side][bug]<=0)return;
  if(moveNo[side]>=3 && hands[side].Q>0 && bug!=="Q"){
    hintEl.textContent="Luật Hive: lượt thứ 4 của mỗi bên bắt buộc phải đặt Ong chúa.";
    return;
  }
  selected={kind:"hand",bug};
  legalCells=getPlacementCells(side);
  render();
}

function renderBoard(){
  boardEl.innerHTML="";
  const coords=getDisplayCoords();
  coords.forEach(({q,r,empty})=>{
    const pos=axialToPixel(q,r);
    const cell=document.createElement("div");
    cell.className=`hex-cell ${empty?"empty":""}`;
    if(legalCells.some(c=>c.q===q&&c.r===r)) cell.classList.add("legal");
    cell.style.left=pos.x+"px";
    cell.style.top=pos.y+"px";

    const stack=stacks.get(key(q,r));
    if(stack&&stack.length){
      const t=stack[stack.length-1];
      const tile=document.createElement("div");
      tile.className=`tile ${t.side==="w"?"white":"black"}`;
      tile.innerHTML=`<span class="icon">${bugs[t.bug].icon}</span><span class="name">${bugs[t.bug].name}</span>${stack.length>1?`<span class="stack">${stack.length}</span>`:""}`;
      cell.appendChild(tile);
      cell.onclick=()=>selectBoard(q,r);
    }else{
      cell.onclick=()=>playTo(q,r);
    }
    boardEl.appendChild(cell);
  });
}

function axialToPixel(q,r){
  const size=42;
  const x=boardEl.clientWidth/2 + size*Math.sqrt(3)*(q + r/2);
  const y=boardEl.clientHeight/2 + size*1.5*r;
  return {x,y};
}

function getDisplayCoords(){
  const occ=[...stacks.keys()].map(parseKey);
  const set=new Set();
  if(!occ.length){
    set.add(key(0,0));
  }else{
    occ.forEach(({q,r})=>{
      set.add(key(q,r));
      neighbors(q,r).forEach(n=>set.add(key(n.q,n.r)));
    });
  }
  return [...set].map(k=>{
    const p=parseKey(k);
    return {...p, empty:!occupied(p.q,p.r)};
  });
}

function getPlacementCells(side){
  if(stacks.size===0) return [{q:0,r:0}];

  const cells=[];
  const candidates=new Set();
  for(const k of stacks.keys()){
    const {q,r}=parseKey(k);
    neighbors(q,r).forEach(n=>candidates.add(key(n.q,n.r)));
  }

  for(const k of candidates){
    const {q,r}=parseKey(k);
    if(occupied(q,r))continue;

    const ns=neighbors(q,r).filter(n=>occupied(n.q,n.r));
    if(!ns.length)continue;

    // Lượt đặt đầu của Đen được chạm Trắng
    if(stacks.size===1){
      cells.push({q,r});
      continue;
    }

    const touchesEnemy=ns.some(n=>topAt(n.q,n.r).side!==side);
    const touchesOwn=ns.some(n=>topAt(n.q,n.r).side===side);
    if(touchesOwn&&!touchesEnemy) cells.push({q,r});
  }
  return cells;
}

function selectBoard(q,r){
  if(gameOver)return;
  const stack=stacks.get(key(q,r));
  if(!stack||!stack.length)return;
  const top=stack[stack.length-1];
  if(top.side!==turn){
    hintEl.textContent="Bạn chỉ được chọn quân của mình.";
    return;
  }
  if(hands[turn].Q>0){
    hintEl.textContent="Bạn phải đặt Ong chúa trước khi được di chuyển quân.";
    return;
  }
  selected={kind:"board",from:{q,r},piece:top};
  legalCells=getMoveCells(q,r,top);
  render();
}

function playTo(q,r){
  if(!selected)return;
  if(!legalCells.some(c=>c.q===q&&c.r===r))return;

  saveHistory();

  if(selected.kind==="hand"){
    const p={side:turn,bug:selected.bug,id:Date.now()+Math.random()};
    stacks.set(key(q,r),[p]);
    hands[turn][selected.bug]--;
    moveNo[turn]++;
    addNotation(`${sideName(turn)} đặt ${bugs[selected.bug].name} tại ${coord(q,r)}`);
  }else{
    const fromK=key(selected.from.q,selected.from.r);
    const arr=stacks.get(fromK);
    const p=arr.pop();
    if(!arr.length)stacks.delete(fromK);

    const toK=key(q,r);
    if(!stacks.has(toK))stacks.set(toK,[]);
    stacks.get(toK).push(p);
    addNotation(`${sideName(turn)} đi ${bugs[p.bug].name} ${coord(selected.from.q,selected.from.r)}-${coord(q,r)}`);
  }

  selected=null; legalCells=[];
  checkWin();
  if(!gameOver) turn=opposite(turn);
  render();
}

function saveHistory(){
  history.push({
    stacks:serializeStacks(),
    hands:JSON.parse(JSON.stringify(hands)),
    turn,
    moveNo:{...moveNo},
    notation:null
  });
}

function addNotation(t){
  history[history.length-1].notation=t;
}

function serializeStacks(){
  return [...stacks.entries()].map(([k,v])=>[k,v.map(p=>({...p}))]);
}

function restoreStacks(data){
  stacks=new Map(data.map(([k,v])=>[k,v.map(p=>({...p}))]));
}

function getMoveCells(q,r,piece){
  if(!canRemove(q,r))return [];

  const temp=cloneStacks();
  removeTop(temp,q,r);

  if(piece.bug==="Q"||piece.bug==="B") return oneStepMoves(temp,q,r,piece.bug==="B");
  if(piece.bug==="G") return grasshopperMoves(temp,q,r);
  if(piece.bug==="A") return antMoves(temp,q,r);
  if(piece.bug==="S") return spiderMoves(temp,q,r);
  return [];
}

function cloneStacks(){
  return new Map([...stacks.entries()].map(([k,v])=>[k,v.map(p=>({...p}))]));
}

function removeTop(map,q,r){
  const k=key(q,r), a=map.get(k);
  if(!a)return;
  a.pop();
  if(!a.length)map.delete(k);
}

function occMap(map,q,r){
  const s=map.get(key(q,r));
  return s&&s.length;
}

function canRemove(q,r){
  const temp=cloneStacks();
  removeTop(temp,q,r);
  if(temp.size<=1)return true;
  return isConnected(temp);
}

function isConnected(map){
  const keys=[...map.keys()];
  if(!keys.length)return true;
  const seen=new Set([keys[0]]);
  const stack=[parseKey(keys[0])];
  while(stack.length){
    const p=stack.pop();
    neighbors(p.q,p.r).forEach(n=>{
      const k=key(n.q,n.r);
      if(map.has(k)&&!seen.has(k)){
        seen.add(k); stack.push(n);
      }
    });
  }
  return seen.size===keys.length;
}

function oneStepMoves(map,q,r,canClimb){
  const moves=[];
  neighbors(q,r).forEach(n=>{
    if(!canClimb && occMap(map,n.q,n.r))return;
    if(canSlide(map,{q,r},n) || canClimb) moves.push(n);
  });
  return moves.filter(n=>keepsHiveTouch(map,n.q,n.r));
}

function canSlide(map,from,to){
  if(occMap(map,to.q,to.r))return false;
  const common=neighbors(from.q,from.r).filter(a=>neighbors(to.q,to.r).some(b=>a.q===b.q&&a.r===b.r));
  const blocked=common.filter(c=>occMap(map,c.q,c.r)).length;
  return blocked<2;
}

function keepsHiveTouch(map,q,r){
  return neighbors(q,r).some(n=>occMap(map,n.q,n.r));
}

function grasshopperMoves(map,q,r){
  const moves=[];
  dirs.forEach(([dq,dr])=>{
    let cq=q+dq, cr=r+dr;
    if(!occMap(map,cq,cr))return;
    while(occMap(map,cq,cr)){cq+=dq;cr+=dr;}
    moves.push({q:cq,r:cr});
  });
  return moves;
}

function antMoves(map,q,r){
  const results=new Map();
  const queue=[{q,r}];
  const seen=new Set([key(q,r)]);
  while(queue.length){
    const cur=queue.shift();
    neighbors(cur.q,cur.r).forEach(n=>{
      const k=key(n.q,n.r);
      if(seen.has(k)||occMap(map,n.q,n.r))return;
      if(!keepsHiveTouch(map,n.q,n.r))return;
      if(!canSlide(map,cur,n))return;
      seen.add(k);
      results.set(k,n);
      queue.push(n);
    });
  }
  results.delete(key(q,r));
  return [...results.values()];
}

function spiderMoves(map,q,r){
  const out=new Map();
  function dfs(cur,depth,visited){
    if(depth===3){
      out.set(key(cur.q,cur.r),cur);
      return;
    }
    neighbors(cur.q,cur.r).forEach(n=>{
      const k=key(n.q,n.r);
      if(visited.has(k)||occMap(map,n.q,n.r))return;
      if(!keepsHiveTouch(map,n.q,n.r))return;
      if(!canSlide(map,cur,n))return;
      const nv=new Set(visited); nv.add(k);
      dfs(n,depth+1,nv);
    });
  }
  dfs({q,r},0,new Set([key(q,r)]));
  out.delete(key(q,r));
  return [...out.values()];
}

function checkWin(){
  const wq=findQueen("w"), bq=findQueen("b");
  const wSur=wq && neighbors(wq.q,wq.r).every(n=>occupied(n.q,n.r));
  const bSur=bq && neighbors(bq.q,bq.r).every(n=>occupied(n.q,n.r));

  if(wSur&&bSur){
    endGame("Hai Ong chúa đều bị vây kín. Ván đấu hòa.");
  }else if(wSur){
    endGame("Đen thắng! Ong chúa Trắng đã bị vây kín.");
  }else if(bSur){
    endGame("Trắng thắng! Ong chúa Đen đã bị vây kín.");
  }
}

function findQueen(side){
  for(const [k,stack] of stacks.entries()){
    if(stack.some(p=>p.side===side&&p.bug==="Q")) return parseKey(k);
  }
  return null;
}

function endGame(text){
  gameOver=true;
  statusEl.textContent="Kết thúc";
  hintEl.textContent=text;
  modalText.textContent=text;
  modal.classList.remove("hidden");
}

function undo(){
  const h=history.pop();
  if(!h)return;
  restoreStacks(h.stacks);
  hands=JSON.parse(JSON.stringify(h.hands));
  turn=h.turn;
  moveNo={...h.moveNo};
  selected=null; legalCells=[]; gameOver=false;
  modal.classList.add("hidden");
  render();
}

function renderMoves(){
  moveListEl.innerHTML="";
  history.forEach(h=>{
    if(!h.notation)return;
    const li=document.createElement("li");
    li.textContent=h.notation;
    moveListEl.appendChild(li);
  });
}

function coord(q,r){return `(${q},${r})`}

document.getElementById("newBtn").onclick=newGame;
document.getElementById("undoBtn").onclick=undo;
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");

newGame();

}
