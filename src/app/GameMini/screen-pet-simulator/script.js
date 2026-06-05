const pet = document.getElementById('pet');
const room = document.getElementById('room');
const msg = document.getElementById('message');
const layer = document.getElementById('itemLayer');
let theme = 'day';
let state = { hunger: 58, happy: 82, energy: 70, clean: 90, asleep: false };
const texts = {
  feed: 'Ngon quá! Mochi no bụng rồi 🍖', play: 'Vui quá! Chơi tiếp đi 🎾',
  bath: 'Sạch thơm long lanh 🫧', sleep: 'Zzz... Mochi đang ngủ 😴', dance: 'Mochi đang quẩy 🎵'
};
function clamp(v){ return Math.max(0, Math.min(100, Math.round(v))); }
function updateBars(){
  ['hunger','happy','energy','clean'].forEach(k=>{
    document.getElementById(k+'Bar').style.width = state[k] + '%';
    document.getElementById(k+'Text').textContent = state[k] + '%';
  });
  if(state.hunger < 25) say('Mochi đói rồi... cho ăn đi 🥺');
  else if(state.happy < 25) say('Mochi hơi buồn, chơi với mình đi!');
  else if(state.energy < 20) say('Mochi buồn ngủ quá...');
  else if(state.clean < 20) say('Mochi cần tắm rồi 🫧');
}
function say(t){ msg.textContent = t; }
function spawn(kind, x, y){
  const el = document.createElement('div');
  el.className = kind;
  el.style.left = x + 'px'; el.style.top = y + 'px';
  el.textContent = kind === 'food' ? '🍖' : kind === 'ball' ? '🎾' : kind === 'spark' ? '✨' : '';
  layer.appendChild(el);
  setTimeout(()=>el.remove(), 1800);
}
function petCenter(){ return { x: pet.offsetLeft + 70, y: pet.offsetTop + 45 }; }
function action(a){
  const c = petCenter();
  state.asleep = false; pet.classList.remove('sleeping');
  if(a==='feed'){ state.hunger += 25; state.energy += 5; spawn('food',c.x,c.y-70); }
  if(a==='play'){ state.happy += 25; state.energy -= 15; state.clean -= 8; spawn('ball',c.x+45,c.y-50); }
  if(a==='bath'){ state.clean += 35; for(let i=0;i<9;i++) spawn('bubble',c.x-50+Math.random()*120,c.y+Math.random()*70); }
  if(a==='sleep'){ state.energy += 30; state.asleep = true; pet.classList.add('sleeping'); }
  if(a==='dance'){ state.happy += 12; state.energy -= 7; pet.classList.add('dance'); for(let i=0;i<6;i++) spawn('spark',c.x-40+Math.random()*90,c.y-20+Math.random()*50); setTimeout(()=>pet.classList.remove('dance'),1600); }
  Object.keys(state).forEach(k=>{ if(k!=='asleep') state[k]=clamp(state[k]); });
  say(texts[a]); updateBars();
}
document.querySelectorAll('[data-action]').forEach(btn=>btn.onclick=()=>action(btn.dataset.action));
document.getElementById('themeBtn').onclick = () => {
  theme = theme === 'day' ? 'night' : 'day'; room.className = 'room ' + theme;
  say(theme === 'day' ? 'Trời sáng rồi ☀️' : 'Đêm xuống rồi 🌙');
};
setInterval(()=>{
  if(!state.asleep){
    const max = room.clientWidth - 190;
    pet.style.left = Math.max(20, Math.random()*max) + 'px';
    pet.style.transform = Math.random() > .5 ? 'scaleX(1)' : 'scaleX(-1)';
  }
}, 2600);
setInterval(()=>{
  state.hunger -= 3; state.happy -= 2; state.clean -= 1;
  state.energy += state.asleep ? 6 : -2;
  if(state.energy >= 95 && state.asleep){ state.asleep=false; pet.classList.remove('sleeping'); say('Mochi thức dậy rồi!'); }
  ['hunger','happy','energy','clean'].forEach(k=>state[k]=clamp(state[k]));
  updateBars();
}, 3500);
updateBars();
