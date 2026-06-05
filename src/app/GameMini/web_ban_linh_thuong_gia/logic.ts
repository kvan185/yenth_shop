// @ts-nocheck
export function initLogic() {
  const colors=["white","blue","green","red","black"];
const colorName={white:"Trắng",blue:"Lam",green:"Lục",red:"Đỏ",black:"Đen",wild:"Vàng"};
const cls={white:"t-white",blue:"t-blue",green:"t-green",red:"t-red",black:"t-black",wild:"t-wild"};

const setup=document.getElementById("setup");
const controls=document.getElementById("controls");
const bankEl=document.getElementById("bankTokens");
const noblesEl=document.getElementById("nobles");
const marketEl=document.getElementById("market");
const playersEl=document.getElementById("players");
const logEl=document.getElementById("log");
const turnTitle=document.getElementById("turnTitle");
const hint=document.getElementById("hint");
const modal=document.getElementById("modal");
const modalTitle=document.getElementById("modalTitle");
const modalText=document.getElementById("modalText");

let players=[], current=0, bank, decks, market, nobles, selectedTokens={}, gameStarted=false, finalRound=false, finalStart=-1, gameOver=false;

function makeDeck(level){
  const arr=[];
  const count=level===1?28:level===2?22:16;
  for(let i=0;i<count;i++){
    const bonus=colors[i%5];
    const points=level===1?(i%9===0?1:0):level===2?(i%4===0?2:1):2+(i%4);
    const cost={white:0,blue:0,green:0,red:0,black:0};
    const base=level+1;
    for(let k=0;k<5;k++){
      const val=(i+k*2+level)%4;
      cost[colors[k]]=val===0?0:val+base-1;
    }
    cost[bonus]=Math.max(0,cost[bonus]-1);
    arr.push({id:`${level}-${i}`,level,bonus,points,cost});
  }
  return shuffle(arr);
}

function makeNobles(){
  const list=[];
  for(let i=0;i<10;i++){
    const cost={white:0,blue:0,green:0,red:0,black:0};
    const a=colors[i%5], b=colors[(i+2)%5], c=colors[(i+3)%5];
    cost[a]=3; cost[b]=3; cost[c]=3;
    list.push({id:"n"+i,points:3,cost});
  }
  return shuffle(list).slice(0,players.length+1);
}

function startGame(){
  const n=Number(document.getElementById("playerCount").value);
  const tokenCount=n===2?4:n===3?5:7;
  bank={white:tokenCount,blue:tokenCount,green:tokenCount,red:tokenCount,black:tokenCount,wild:5};
  players=Array.from({length:n},(_,i)=>({
    name:`Người chơi ${i+1}`, score:0,
    tokens:{white:0,blue:0,green:0,red:0,black:0,wild:0},
    bonuses:{white:0,blue:0,green:0,red:0,black:0},
    cards:[], reserved:[], nobles:[]
  }));
  decks={1:makeDeck(1),2:makeDeck(2),3:makeDeck(3)};
  market={1:[],2:[],3:[]};
  for(let l=1;l<=3;l++) for(let i=0;i<4;i++) drawToMarket(l);
  nobles=makeNobles();
  current=0; selectedTokens={}; gameStarted=true; finalRound=false; finalStart=-1; gameOver=false;
  setup.classList.add("hidden"); controls.classList.remove("hidden");
  logEl.innerHTML="";
  addLog("Ván mới bắt đầu. Ai đạt 15 điểm sẽ kích hoạt vòng cuối.");
  render();
}

function render(){
  renderBank();
  renderNobles();
  renderMarket();
  renderPlayers();
  turnTitle.textContent=players[current]?.name || "Chưa bắt đầu";
}

function renderBank(){
  bankEl.innerHTML="";
  [...colors,"wild"].forEach(c=>{
    const t=document.createElement("div");
    t.className=`token ${cls[c]}`;
    if(selectedTokens[c]) t.classList.add("selected");
    t.textContent=bank[c];
    t.title=colorName[c];
    t.onclick=()=>selectToken(c);
    bankEl.appendChild(t);
  });
}

function selectToken(c){
  if(!gameStarted||gameOver||c==="wild")return;
  selectedTokens[c]=(selectedTokens[c]||0)+1;
  if(selectedTokens[c]>bank[c]) selectedTokens[c]=0;
  validateTokenSelection();
  renderBank();
}

function validateTokenSelection(){
  const vals=Object.entries(selectedTokens).filter(([c,n])=>n>0);
  const total=vals.reduce((s,[c,n])=>s+n,0);
  if(total>3) selectedTokens={};
  if(vals.some(([c,n])=>n>2)) selectedTokens={};
}

function takeTokens(){
  const vals=Object.entries(selectedTokens).filter(([c,n])=>n>0);
  const total=vals.reduce((s,[c,n])=>s+n,0);
  if(!vals.length){show("Chưa chọn đá","Hãy chọn đá quý trước.");return;}
  if(vals.length===1){
    const [c,n]=vals[0];
    if(n!==2||bank[c]<4){show("Không hợp lệ","Chỉ được lấy 2 đá cùng màu nếu ngân hàng còn ít nhất 4 viên màu đó.");return;}
  }else{
    if(total>3||vals.some(([c,n])=>n!==1)){show("Không hợp lệ","Chỉ được lấy tối đa 3 đá khác màu.");return;}
  }
  const p=players[current];
  if(totalTokens(p)+total>10){show("Quá giới hạn","Mỗi người chỉ được giữ tối đa 10 đá.");return;}
  vals.forEach(([c,n])=>{bank[c]-=n;p.tokens[c]+=n;});
  addLog(`${p.name} lấy ${vals.map(([c,n])=>`${n} ${colorName[c]}`).join(", ")}.`);
  selectedTokens={};
  endTurn();
}

function renderNobles(){
  noblesEl.innerHTML="";
  nobles.forEach(n=>{
    const d=document.createElement("div");
    d.className="noble";
    d.innerHTML=`<div class="pts">${n.points} điểm</div><div>Thương hội</div><div class="cost">${costHtml(n.cost)}</div>`;
    noblesEl.appendChild(d);
  });
}

function renderMarket(){
  marketEl.innerHTML="";
  [3,2,1].forEach(level=>{
    const row=document.createElement("div");
    row.className="row";
    const deck=document.createElement("div");
    deck.className="deck";
    deck.innerHTML=`Cấp ${level}<br><small>${decks[level].length}</small>`;
    row.appendChild(deck);

    market[level].forEach(card=>row.appendChild(cardEl(card,false)));
    marketEl.appendChild(row);
  });
}

function cardEl(card,reserved){
  const d=document.createElement("div");
  d.className=`dev-card ${card.bonus}`;
  d.innerHTML=`
    <div class="dev-head"><span class="points">${card.points}</span><span class="gem ${cls[card.bonus]}"></span></div>
    <div><b>Cấp ${card.level}</b><div class="cost">${costHtml(card.cost)}</div></div>
    <div class="actions">
      <button class="small-btn buy">Mua</button>
      ${reserved?"":'<button class="small-btn reserve">Giữ</button>'}
    </div>`;
  d.querySelector(".buy").onclick=(e)=>{e.stopPropagation();buyCard(card,reserved);};
  if(!reserved)d.querySelector(".reserve").onclick=(e)=>{e.stopPropagation();reserveCard(card);};
  return d;
}

function costHtml(cost){
  return colors.filter(c=>cost[c]>0).map(c=>`<span class="${cls[c]}">${colorName[c]} ${cost[c]}</span>`).join("");
}

function renderPlayers(){
  playersEl.innerHTML="";
  players.forEach((p,i)=>{
    const d=document.createElement("div");
    d.className=`player ${i===current?"active":""}`;
    d.innerHTML=`
      <h3>${p.name}</h3>
      <div class="score">${p.score} điểm</div>
      <div class="mini-row">${[...colors,"wild"].map(c=>`<span class="badge">${colorName[c]}: ${p.tokens[c]}</span>`).join("")}</div>
      <div class="mini-row">${colors.map(c=>`<span class="badge">${colorName[c]} thưởng: ${p.bonuses[c]}</span>`).join("")}</div>
      <div class="mini-row"><span class="badge">Thẻ giữ: ${p.reserved.length}/3</span><span class="badge">Thương hội: ${p.nobles.length}</span></div>
      <div class="reserved"></div>`;
    const res=d.querySelector(".reserved");
    if(p.reserved.length){
      const label=document.createElement("p"); label.className="label"; label.style.marginTop="8px"; label.textContent="Thẻ đang giữ";
      res.appendChild(label);
      p.reserved.forEach(card=>res.appendChild(cardEl(card,true)));
    }
    playersEl.appendChild(d);
  });
}

function buyCard(card,reserved){
  const p=players[current];
  if(reserved && !p.reserved.some(c=>c.id===card.id))return;
  if(!canAfford(p,card)){show("Chưa đủ tài nguyên","Bạn chưa đủ đá hoặc thưởng để mua thẻ này.");return;}

  payCost(p,card);
  p.cards.push(card); p.bonuses[card.bonus]++; p.score+=card.points;

  if(reserved){
    p.reserved=p.reserved.filter(c=>c.id!==card.id);
  }else{
    market[card.level]=market[card.level].filter(c=>c.id!==card.id);
    drawToMarket(card.level);
  }

  addLog(`${p.name} mua thẻ ${colorName[card.bonus]} cấp ${card.level}, nhận ${card.points} điểm.`);
  checkNobles(p);
  if(p.score>=15 && !finalRound){
    finalRound=true; finalStart=current;
    addLog(`${p.name} đạt 15 điểm. Bắt đầu vòng cuối!`);
  }
  endTurn();
}

function reserveCard(card){
  const p=players[current];
  if(p.reserved.length>=3){show("Không thể giữ thêm","Mỗi người chỉ được giữ tối đa 3 thẻ.");return;}
  p.reserved.push(card);
  market[card.level]=market[card.level].filter(c=>c.id!==card.id);
  drawToMarket(card.level);
  if(bank.wild>0){bank.wild--;p.tokens.wild++;}
  addLog(`${p.name} giữ một thẻ cấp ${card.level}${bank.wild>=0?" và nhận vàng nếu còn.":""}`);
  endTurn();
}

function canAfford(p,card){
  let needWild=0;
  for(const c of colors){
    const need=Math.max(0,card.cost[c]-p.bonuses[c]-p.tokens[c]);
    needWild+=need;
  }
  return p.tokens.wild>=needWild;
}

function payCost(p,card){
  let wildNeed=0;
  for(const c of colors){
    const cost=Math.max(0,card.cost[c]-p.bonuses[c]);
    const pay=Math.min(cost,p.tokens[c]);
    p.tokens[c]-=pay; bank[c]+=pay;
    wildNeed+=cost-pay;
  }
  p.tokens.wild-=wildNeed; bank.wild+=wildNeed;
}

function checkNobles(p){
  const gained=[];
  nobles.forEach(n=>{
    if(colors.every(c=>p.bonuses[c]>=n.cost[c])) gained.push(n);
  });
  if(gained.length){
    const n=gained[0];
    p.nobles.push(n); p.score+=n.points;
    nobles=nobles.filter(x=>x.id!==n.id);
    addLog(`${p.name} được Thương hội ghé thăm và nhận ${n.points} điểm.`);
  }
}

function drawToMarket(level){
  if(decks[level].length && market[level].length<4) market[level].push(decks[level].pop());
}

function endTurn(){
  selectedTokens={};
  if(gameOver)return;
  current=(current+1)%players.length;
  if(finalRound && current===finalStart){
    finishGame();
    return;
  }
  render();
}

function finishGame(){
  gameOver=true;
  const max=Math.max(...players.map(p=>p.score));
  const winners=players.filter(p=>p.score===max);
  let text=winners.length===1?`${winners[0].name} thắng với ${max} điểm!`:`Hòa giữa ${winners.map(p=>p.name).join(", ")} với ${max} điểm.`;
  show("Kết thúc ván",text);
  addLog(text);
}

function totalTokens(p){
  return Object.values(p.tokens).reduce((a,b)=>a+b,0);
}

function addLog(t){
  const d=document.createElement("div");
  d.textContent=t;
  logEl.prepend(d);
}

function show(title,text){
  modalTitle.textContent=title;
  modalText.textContent=text;
  modal.classList.remove("hidden");
}

function shuffle(a){
  const arr=[...a];
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

document.getElementById("startBtn").onclick=startGame;
document.getElementById("takeBtn").onclick=takeTokens;
document.getElementById("clearBtn").onclick=()=>{selectedTokens={};renderBank();};
document.getElementById("endBtn").onclick=endTurn;
document.getElementById("newBtn").onclick=()=>location.reload();
document.getElementById("modalClose").onclick=()=>modal.classList.add("hidden");

}
