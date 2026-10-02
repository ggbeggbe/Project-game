const factions={player:{name:'청룡 연합',color:'#4ca3ff'},red:{name:'적월 동맹',color:'#e65b54'},gold:{name:'황금 연방',color:'#e3b84d'},green:{name:'녹해 연맹',color:'#5fbd78'}};
const cities=[
{id:'seoul',name:'서울',x:81,y:36,owner:'player',pop:980,gold:620,food:850,farm:58,commerce:72,order:82,troops:180,training:65},
{id:'tokyo',name:'도쿄',x:88,y:39,owner:'player',pop:1100,gold:700,food:720,farm:45,commerce:84,order:86,troops:150,training:72},
{id:'beijing',name:'베이징',x:76,y:34,owner:'red',pop:1250,gold:680,food:940,farm:71,commerce:68,order:75,troops:240,training:70},
{id:'singapore',name:'싱가포르',x:75,y:58,owner:'gold',pop:620,gold:900,food:500,farm:30,commerce:95,order:88,troops:120,training:75},
{id:'delhi',name:'델리',x:64,y:44,owner:'gold',pop:1450,gold:540,food:980,farm:76,commerce:62,order:68,troops:230,training:58},
{id:'dubai',name:'두바이',x:57,y:47,owner:'gold',pop:480,gold:980,food:350,farm:18,commerce:92,order:84,troops:100,training:72},
{id:'istanbul',name:'이스탄불',x:51,y:34,owner:'red',pop:720,gold:650,food:610,farm:52,commerce:78,order:74,troops:170,training:68},
{id:'paris',name:'파리',x:43,y:29,owner:'green',pop:650,gold:760,food:600,farm:55,commerce:85,order:80,troops:140,training:70},
{id:'london',name:'런던',x:40,y:24,owner:'green',pop:710,gold:820,food:550,farm:43,commerce:90,order:81,troops:155,training:74},
{id:'cairo',name:'카이로',x:51,y:48,owner:'red',pop:810,gold:480,food:700,farm:64,commerce:58,order:67,troops:190,training:61},
{id:'newyork',name:'뉴욕',x:25,y:31,owner:'green',pop:900,gold:940,food:560,farm:38,commerce:96,order:78,troops:160,training:76},
{id:'losangeles',name:'LA',x:12,y:38,owner:'green',pop:680,gold:850,food:600,farm:44,commerce:88,order:76,troops:135,training:69},
{id:'mexico',name:'멕시코시티',x:18,y:50,owner:'red',pop:880,gold:490,food:780,farm:70,commerce:55,order:64,troops:180,training:57},
{id:'saopaulo',name:'상파울루',x:31,y:70,owner:'red',pop:1050,gold:620,food:900,farm:73,commerce:67,order:65,troops:200,training:60},
{id:'capetown',name:'케이프타운',x:50,y:76,owner:'gold',pop:410,gold:510,food:560,farm:58,commerce:65,order:76,troops:90,training:66},
{id:'sydney',name:'시드니',x:89,y:75,owner:'player',pop:530,gold:690,food:660,farm:60,commerce:79,order:88,troops:110,training:78}
];
let year=2026,month=1,selected=cities[0],actions=3;
const map=document.querySelector('#worldMap'), info=document.querySelector('#cityInfo'), nameEl=document.querySelector('#cityName'),log=document.querySelector('#log'),date=document.querySelector('#date');
function renderMap(){map.innerHTML='';cities.forEach(c=>{const b=document.createElement('button');b.className='city'+(c===selected?' selected':'');b.style.left=c.x+'%';b.style.top=c.y+'%';b.style.background=factions[c.owner].color;b.innerHTML=`<span>${c.name}</span>`;b.onclick=()=>{selected=c;render()};map.appendChild(b)})}
function renderInfo(){nameEl.textContent=`${selected.name} · ${factions[selected.owner].name}`;info.innerHTML=[['인구',selected.pop+'만'],['금',selected.gold],['군량',selected.food],['농업',selected.farm],['상업',selected.commerce],['치안',selected.order],['병력',selected.troops+'천'],['훈련',selected.training],['행동력',actions]].map(x=>`<div class="stat"><span>${x[0]}</span><b>${x[1]}</b></div>`).join('')}
function render(){date.textContent=`${year}년 ${month}월`;renderMap();renderInfo()}
function command(cmd){if(selected.owner!=='player'){log.textContent='다른 세력의 도시에는 명령할 수 없습니다.';return}if(actions<=0){log.textContent='이번 달 행동력을 모두 사용했습니다.';return}const effects={develop:()=>{selected.farm=Math.min(100,selected.farm+5);selected.food+=80;return'농업 개발로 생산력이 상승했습니다.'},commerce:()=>{selected.commerce=Math.min(100,selected.commerce+5);selected.gold+=100;return'상업 투자를 실시했습니다.'},recruit:()=>{if(selected.gold<100)return'금이 부족합니다.';selected.gold-=100;selected.troops+=30;return'신규 병력을 징병했습니다.'},train:()=>{selected.training=Math.min(100,selected.training+7);return'부대 훈련도가 상승했습니다.'},move:()=> '출진 시스템은 다음 구현 단계에서 연결됩니다.',diplomacy:()=> '외교 사절을 준비했습니다. 외교 시스템은 확장 예정입니다.'};const before=JSON.stringify(selected);const msg=effects[cmd]?.();if(msg?.includes('부족')){Object.assign(selected,JSON.parse(before));log.textContent=msg;return}actions--;log.textContent=`${selected.name}: ${msg}`;render()}
document.querySelectorAll('[data-command]').forEach(b=>b.onclick=()=>command(b.dataset.command));
document.querySelector('#endTurn').onclick=()=>{cities.forEach(c=>{c.gold+=Math.round(c.commerce*1.2);c.food+=Math.round(c.farm*1.5);if(c.owner!=='player'){c.troops+=Math.floor(Math.random()*12);c.training=Math.min(100,c.training+1)}});month++;if(month>12){month=1;year++}actions=3;log.textContent='새로운 달입니다. 각 세력이 내정과 군비를 진행했습니다.';render()};render();