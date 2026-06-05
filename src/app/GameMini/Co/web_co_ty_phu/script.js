const tiles = [
  {name:"Xuất phát", type:"start"},
  {name:"Bến Tre", price:600, rent:80, color:"#8bc34a"},
  {name:"Cơ hội", type:"chance"},
  {name:"Cần Thơ", price:700, rent:90, color:"#8bc34a"},
  {name:"Thuế đường", type:"tax", amount:250},
  {name:"Ga Sài Gòn", price:1000, rent:140, color:"#607d8b"},
  {name:"Đà Lạt", price:900, rent:120, color:"#03a9f4"},
  {name:"Khí vận", type:"luck"},
  {name:"Nha Trang", price:950, rent:130, color:"#03a9f4"},
  {name:"Đà Nẵng", price:1100, rent:150, color:"#03a9f4"},
  {name:"Thăm tù", type:"visit"},
  {name:"Huế", price:1200, rent:170, color:"#ff9800"},
  {name:"Điện lực", price:1300, rent:180, color:"#795548"},
  {name:"Hội An", price:1250, rent:175, color:"#ff9800"},
  {name:"Quảng Ninh", price:1350, rent:190, color:"#ff9800"},
  {name:"Phí dịch vụ", type:"tax", amount:300},
  {name:"Hải Phòng", price:1450, rent:210, color:"#e91e63"},
  {name:"Cơ hội", type:"chance"},
  {name:"Hạ Long", price:1500, rent:220, color:"#e91e63"},
  {name:"Hà Nội", price:1700, rent:260, color:"#e91e63"},
  {name:"Bãi đỗ xe", type:"free"},
  {name:"Phú Quốc", price:1750, rent:280, color:"#9c27b0"},
  {name:"Khí vận", type:"luck"},
  {name:"Vũng Tàu", price:1800, rent:300, color:"#9c27b0"},
  {name:"TP.HCM", price:2000, rent:350, color:"#9c27b0"},
  {name:"Sân bay", price:2100, rent:380, color:"#607d8b"},
  {name:"Thủ Đức", price:2200, rent:420, color:"#f44336"},
  {name:"Biên Hòa", price:2250, rent:430, color:"#f44336"},
  {name:"Vào tù", type:"gotojail"},
  {name:"Bình Dương", price:2400, rent:470, color:"#f44336"},
  {name:"Cơ hội", type:"chance"},
  {name:"Đồng Nai", price:2500, rent:500, color:"#3f51b5"},
  {name:"Thuế tài sản", type:"tax", amount:500},
  {name:"Long An", price:2600, rent:540, color:"#3f51b5"},
  {name:"Cảng biển", price:2800, rent:600, color:"#607d8b"},
  {name:"Khí vận", type:"luck"},
  {name:"Khu Công Nghệ", price:3000, rent:700, color:"#111"},
  {name:"Đại lộ Vàng", price:3300, rent:850, color:"#111"},
  {name:"Siêu đô thị", price:3600, rent:1000, color:"#111"},
  {name:"Thành phố Mơ", price:4000, rent:1200, color:"#111"}
];

const boardEl=document.getElementById("board"), playersEl=document.getElementById("players"), logEl=document.getElementById("log");
const setup=document.getElementById("setup"), controls=document.getElementById("gameControls");
const turnTitle=document.getElementById("turnTitle"), turnInfo=document.getElementById("turnInfo"), diceEl=document.getElementById("dice");
const rollBtn=document.getElementById("rollBtn"), buyBtn=document.getElementById("buyBtn"), endBtn=document.getElementById("endBtn");
const modal=document.getElementById("modal"), modalTitle=document.getElementById("modalTitle"), modalText=document.getElementById("modalText");

let players=[], current=0, rolled=false, lastDice=[0,0], gameStarted=false;
const colors=["p0","p1","p2","p3"];

function startGame(){
  const n=Number(document.getElementById("playerCount").value);
  players=Array.from({length:n},(_,i)=>({name:`Người chơi ${i+1}`, money:15000, pos:0, props:[], jail:0, bankrupt:false}));
  current=0; rolled=false; gameStarted=true;
  setup.classList.add("hidden"); controls.classList.remove("hidden");
  logEl.innerHTML=""; addLog("Ván mới bắt đầu. Người chơi 1 đi trước.");
  render();
}

function renderBoard(){
  boardEl.innerHTML="";
  const center=document.createElement("div");
  center.className="tile center";
  center.innerHTML="<div>CỜ<br>TỶ PHÚ<br><small style='font-size:18px'>VIỆT NAM</small></div>";
  boardEl.appendChild(center);

  for(let i=0;i<40;i++){
    const t=tiles[i], div=document.createElement("div");
    div.className="tile"; div.style.gridColumn=gridPos(i).col; div.style.gridRow=gridPos(i).row;
    if(t.color) div.innerHTML+=`<div class="strip" style="background:${t.color}"></div>`;
    const owner=ownerOf(i);
    div.innerHTML+=`<div class="tile-name">${t.name}</div><div class="tile-price">${t.price?format(t.price):specialText(t)}</div><div class="tokens"></div>`;
    if(owner!==-1) div.innerHTML+=`<div class="owner ${colors[owner]}"></div>`;
    const tok=div.querySelector(".tokens");
    players.forEach((p,idx)=>{ if(!p.bankrupt && p.pos===i){ const e=document.createElement("span"); e.className=`token ${colors[idx]}`; tok.appendChild(e); }});
    boardEl.appendChild(div);
  }
}

function gridPos(i){
  if(i<=10) return {col:String(11-i), row:"11"};
  if(i<=20) return {col:"1", row:String(21-i)};
  if(i<=30) return {col:String(i-19), row:"1"};
  return {col:"11", row:String(i-29)};
}

function specialText(t){
  if(t.type==="tax") return `Trả ${format(t.amount)}`;
  if(t.type==="chance") return "Rút thẻ";
  if(t.type==="luck") return "Rút thẻ";
  if(t.type==="gotojail") return "Đi tù";
  if(t.type==="start") return "+2.000₫";
  return "";
}

function renderPlayers(){
  playersEl.innerHTML="";
  players.forEach((p,i)=>{
    const div=document.createElement("div");
    div.className=`player ${p.bankrupt?"bankrupt":""}`;
    div.innerHTML=`<span class="token ${colors[i]}"></span><div><b>${p.name}</b><div class="money">${format(p.money)}</div><div class="props">Đất: ${p.props.length}${p.jail?` · Đang ở tù ${p.jail} lượt`:""}</div></div>`;
    playersEl.appendChild(div);
  });
}

function renderControls(){
  const p=players[current];
  turnTitle.textContent=p.name;
  rollBtn.disabled=rolled || p.bankrupt;
  buyBtn.classList.add("hidden");
  const tile=tiles[p.pos];
  if(rolled && tile.price && ownerOf(p.pos)===-1 && p.money>=tile.price) buyBtn.classList.remove("hidden");
  turnInfo.textContent=rolled?`Đang đứng ở ô: ${tile.name}`:"Bấm gieo xúc xắc.";
}

function render(){ renderBoard(); renderPlayers(); renderControls(); }

function roll(){
  const p=players[current];
  if(p.jail>0){
    p.jail--; addLog(`${p.name} mất lượt trong tù.`);
    rolled=true; render(); return;
  }
  const d1=1+Math.floor(Math.random()*6), d2=1+Math.floor(Math.random()*6);
  lastDice=[d1,d2]; diceEl.textContent=`${diceFace(d1)} ${diceFace(d2)}`;
  movePlayer(current,d1+d2);
  rolled=true; handleTile();
  render();
}

function diceFace(n){return ["","⚀","⚁","⚂","⚃","⚄","⚅"][n]}

function movePlayer(idx,steps){
  const p=players[idx], old=p.pos;
  p.pos=(p.pos+steps)%40;
  if(old+steps>=40){ p.money+=2000; addLog(`${p.name} đi qua Xuất phát và nhận 2.000₫.`); }
  addLog(`${p.name} gieo ${lastDice[0]} + ${lastDice[1]} = ${steps}, đến ô ${tiles[p.pos].name}.`);
}

function handleTile(){
  const p=players[current], t=tiles[p.pos], owner=ownerOf(p.pos);
  if(t.type==="tax"){ payBank(current,t.amount,`trả ${format(t.amount)} tại ô ${t.name}`); }
  else if(t.type==="gotojail"){ p.pos=10; p.jail=2; addLog(`${p.name} bị đưa vào tù 2 lượt.`); }
  else if(t.type==="chance" || t.type==="luck"){ drawCard(t.type); }
  else if(t.price && owner!==-1 && owner!==current){ payPlayer(current,owner,t.rent,`trả tiền thuê ${tiles[p.pos].name}`); }
}

function buy(){
  const p=players[current], t=tiles[p.pos];
  if(!t.price || ownerOf(p.pos)!==-1 || p.money<t.price) return;
  p.money-=t.price; p.props.push(p.pos);
  addLog(`${p.name} mua ${t.name} với giá ${format(t.price)}.`);
  render();
}

function endTurn(){
  if(!rolled){ addLog("Bạn cần gieo xúc xắc trước khi kết thúc lượt."); return; }
  rolled=false; buyBtn.classList.add("hidden");
  nextPlayer();
  render();
}

function nextPlayer(){
  const alive=players.filter(p=>!p.bankrupt);
  if(alive.length<=1){ showModal("Kết thúc ván", `${alive[0].name} chiến thắng!`); return; }
  do{ current=(current+1)%players.length; }while(players[current].bankrupt);
}

function ownerOf(tileIndex){ return players.findIndex(p=>p.props.includes(tileIndex)); }

function payBank(i,amount,reason){
  const p=players[i]; p.money-=amount; addLog(`${p.name} ${reason}.`);
  checkBankrupt(i);
}

function payPlayer(from,to,amount,reason){
  const a=players[from], b=players[to];
  a.money-=amount; b.money+=amount;
  addLog(`${a.name} ${reason} cho ${b.name}: ${format(amount)}.`);
  checkBankrupt(from);
}

function checkBankrupt(i){
  const p=players[i];
  if(p.money<0){
    p.bankrupt=true;
    p.props=[];
    addLog(`${p.name} phá sản! Tất cả tài sản được trả về ngân hàng.`);
    const alive=players.filter(x=>!x.bankrupt);
    if(alive.length===1) showModal("Chiến thắng", `${alive[0].name} là tỷ phú cuối cùng!`);
  }
}

function drawCard(type){
  const cards=[
    {text:"Bạn trúng thưởng 1.000₫.", fn:p=>p.money+=1000},
    {text:"Sửa nhà mất 700₫.", fn:p=>p.money-=700},
    {text:"Đi thẳng tới Xuất phát và nhận 2.000₫.", fn:p=>{p.pos=0;p.money+=2000}},
    {text:"Bị phạt giao thông 400₫.", fn:p=>p.money-=400},
    {text:"Được hoàn thuế 600₫.", fn:p=>p.money+=600},
    {text:"Đi tù ngay lập tức.", fn:p=>{p.pos=10;p.jail=2}},
    {text:"Di chuyển tiến 3 ô.", fn:p=>{p.pos=(p.pos+3)%40}},
    {text:"Mừng khai trương, nhận 800₫.", fn:p=>p.money+=800}
  ];
  const card=cards[Math.floor(Math.random()*cards.length)], p=players[current];
  card.fn(p); addLog(`${p.name} rút thẻ: ${card.text}`);
  checkBankrupt(current);
  const t=tiles[p.pos], owner=ownerOf(p.pos);
  if(t.price && owner!==-1 && owner!==current) payPlayer(current,owner,t.rent,`trả tiền thuê ${t.name}`);
}

function addLog(text){
  const div=document.createElement("div"); div.textContent=text; logEl.prepend(div);
}

function format(n){ return n.toLocaleString("vi-VN")+"₫"; }

function showModal(title,text){
  modalTitle.textContent=title; modalText.textContent=text; modal.classList.remove("hidden");
}

document.getElementById("startBtn").onclick=startGame;
document.getElementById("rollBtn").onclick=roll;
document.getElementById("buyBtn").onclick=buy;
document.getElementById("endBtn").onclick=endTurn;
document.getElementById("newBtn").onclick=()=>{setup.classList.remove("hidden");controls.classList.add("hidden");players=[];renderBoard();playersEl.innerHTML="";logEl.innerHTML="";};
document.getElementById("modalClose").onclick=()=>modal.classList.add("hidden");

renderBoard();
