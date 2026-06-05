const $=id=>document.getElementById(id);
const state=JSON.parse(localStorage.petGame||'null')||{name:'Bông',pet:'🐶',level:1,xp:0,hunger:75,happy:75,energy:75,coins:50,last:Date.now()};
function save(){localStorage.petGame=JSON.stringify(state)}
function clamp(v){return Math.max(0,Math.min(100,v))}
function gainXP(n){state.xp+=n; while(state.xp>=100){state.xp-=100;state.level++;state.coins+=25;msg('Level up! Nhận 25 xu 🎉')}}
function msg(t){$('message').textContent=t}
function update(){
 const hours=(Date.now()-state.last)/36e5; if(hours>.01){state.hunger=clamp(state.hunger-hours*4);state.happy=clamp(state.happy-hours*3);state.energy=clamp(state.energy-hours*2);state.last=Date.now()}
 $('pet').textContent=state.pet;$('petName').value=state.name;$('level').textContent=state.level;$('xp').textContent=Math.floor(state.xp);$('coins').textContent=state.coins;
 [['hunger',state.hunger],['happy',state.happy],['energy',state.energy]].forEach(([k,v])=>{$(k+'Bar').style.width=v+'%';$(k+'Text').textContent=Math.round(v)})
 $('xpBar').style.width=state.xp+'%';
 let mood='Đang vui vẻ'; if(state.hunger<25)mood='Đang đói'; else if(state.energy<25)mood='Buồn ngủ'; else if(state.happy<25)mood='Cần được chơi'; else if(state.level>=5)mood='Siêu thú cưng'; $('petMood').textContent=mood;
 save();
}
document.querySelectorAll('.action').forEach(btn=>btn.onclick=()=>{const a=btn.dataset.act;if(a==='feed'){if(state.coins<5)return msg('Không đủ xu để mua đồ ăn!');state.coins-=5;state.hunger=clamp(state.hunger+22);gainXP(8);msg('Ăn ngon quá!')}if(a==='play'){if(state.energy<10)return msg('Thú cưng mệt rồi, hãy cho ngủ.');state.happy=clamp(state.happy+18);state.energy=clamp(state.energy-12);state.hunger=clamp(state.hunger-8);gainXP(15);msg('Chơi vui quá!')}if(a==='sleep'){state.energy=clamp(state.energy+30);state.hunger=clamp(state.hunger-6);gainXP(5);msg('Ngủ một giấc thật ngon.')}if(a==='clean'){state.happy=clamp(state.happy+12);gainXP(6);msg('Sạch sẽ thơm tho!')}update()});
document.querySelectorAll('[data-pet]').forEach(b=>b.onclick=()=>{state.pet=b.dataset.pet;gainXP(3);msg('Đã đổi thú cưng!');update()});
$('petName').oninput=e=>{state.name=e.target.value||'Bông';save()};$('resetBtn').onclick=()=>{if(confirm('Xoá toàn bộ tiến trình?')){localStorage.removeItem('petGame');location.reload()}};
function moveStar(){const box=$('gameBox'),s=$('star');s.style.left=Math.random()*(box.clientWidth-50)+'px';s.style.top=Math.random()*(box.clientHeight-50)+'px'}
$('star').onclick=()=>{state.coins+=3;state.happy=clamp(state.happy+4);gainXP(5);msg('+3 xu, +5 XP ⭐');moveStar();update()};setInterval(moveStar,1800);setInterval(update,10000);update();
