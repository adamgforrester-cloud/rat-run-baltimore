<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>Rat Run: Baltimore 2.0 — Stability Release</title>
<link rel="manifest" href="manifest.webmanifest">
<meta name="theme-color" content="#15121d">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Rat Run">
<link rel="apple-touch-icon" href="icons/icon-192.png">
<style>
:root{color-scheme:dark;--gold:#f2c14e;--red:#fa342d;--blue:#37a8ff}*{box-sizing:border-box}
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#070910;font-family:Inter,system-ui,Arial,sans-serif}
canvas{display:block;width:100vw;height:100vh;cursor:crosshair;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
#hud{position:fixed;inset:0;pointer-events:none;color:#fff;text-shadow:0 2px 5px #000}
.top{display:flex;justify-content:center;gap:7px;flex-wrap:wrap;padding:11px 8px;font-weight:900;letter-spacing:.035em}
.pill{background:rgba(7,9,15,.78);border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 11px;backdrop-filter:blur(7px)}
#effects{position:absolute;top:62px;left:50%;transform:translateX(-50%);display:flex;gap:8px}
.effect{display:none;border-radius:999px;padding:7px 12px;font-size:13px;font-weight:1000;background:rgba(7,9,15,.87);border:2px solid #fff}
#cheeseEffect{border-color:#ffd95b;color:#ffe986}#coffeeEffect{border-color:#c46cff;color:#f0caff}
#neighborhood{position:absolute;left:14px;top:68px;font-weight:1000;text-transform:uppercase;letter-spacing:.1em;font-size:12px}
#target{position:absolute;right:14px;top:68px;font-weight:1000;font-size:12px}
#message{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(93vw,720px);max-height:92vh;overflow:auto;text-align:center;background:linear-gradient(180deg,rgba(10,12,20,.97),rgba(4,6,11,.97));border:1px solid rgba(255,255,255,.2);border-radius:26px;padding:24px;box-shadow:0 22px 90px rgba(0,0,0,.72);pointer-events:auto}
#message h1{margin:0 0 8px;font-size:clamp(33px,7vw,68px);line-height:.92;text-transform:uppercase}
#message h2{margin:15px 0 7px;font-size:18px;letter-spacing:.12em;text-transform:uppercase}
#message p{margin:9px auto;max-width:590px;color:#dce1eb;line-height:1.42}
button{margin-top:10px;padding:13px 23px;border:0;border-radius:999px;font-size:17px;font-weight:1000;cursor:pointer;background:var(--gold);color:#17120a;box-shadow:0 7px 0 #9c6d10}
button:active{transform:translateY(4px);box-shadow:0 3px 0 #9c6d10}.tiny{font-size:12px;opacity:.74}
#mode{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);font-size:12px;white-space:nowrap}
#combo{position:absolute;left:50%;top:23%;transform:translateX(-50%);font-size:clamp(30px,6vw,62px);font-weight:1000;opacity:0;transition:opacity .15s}
#announcement{position:absolute;left:50%;top:35%;transform:translate(-50%,-50%) scale(.8);font-size:clamp(28px,7vw,72px);font-weight:1000;text-align:center;opacity:0;transition:.18s;line-height:.95}
#installBtn{display:none;position:absolute;right:14px;bottom:14px;pointer-events:auto;margin:0;padding:10px 15px;font-size:13px}
#audioControls{position:absolute;left:14px;bottom:14px;display:flex;gap:7px;pointer-events:auto}
.audioBtn{margin:0;padding:9px 11px;font-size:13px;box-shadow:none;border:1px solid rgba(255,255,255,.25);background:rgba(7,9,15,.84);color:#fff}
#policeAlert{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .25s;mix-blend-mode:screen;background:linear-gradient(90deg,rgba(255,0,0,.28),transparent 38%,transparent 62%,rgba(0,110,255,.3));animation:policeFlash .42s steps(1) infinite}
#policeAlert.active{opacity:1}
@keyframes policeFlash{0%,49%{filter:hue-rotate(0deg);transform:scaleX(1)}50%,100%{filter:hue-rotate(175deg);transform:scaleX(-1)}}
.domino{position:relative;margin:0 auto 13px;width:min(100%,560px);padding:13px 14px 12px;border:4px solid #6f1716;border-radius:11px;background:#230809;box-shadow:0 0 28px rgba(255,41,34,.35),inset 0 0 18px rgba(255,44,40,.18)}
.domino-title{font-family:Georgia,serif;font-style:italic;font-weight:900;letter-spacing:.05em;font-size:clamp(28px,7vw,57px);line-height:.88;color:#ff473e;text-shadow:0 0 4px #fff,0 0 10px #ff2d27,0 0 24px #ff2d27}
.domino-sub{margin-top:8px;font-size:12px;letter-spacing:.22em;font-weight:1000;color:#ffd8d4}
.scoreboard{max-width:455px;margin:12px auto;text-align:left;border-top:1px solid rgba(255,255,255,.18)}
.score-row{display:grid;grid-template-columns:35px 1fr auto;gap:9px;padding:7px 5px;border-bottom:1px solid rgba(255,255,255,.11)}
.score-row.you{background:rgba(242,193,78,.18);border-radius:8px;color:#ffe18a}
.nameInput{width:min(100%,330px);padding:12px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.28);background:#11141e;color:#fff;font-size:16px;font-weight:800;text-transform:uppercase;text-align:center}
.statusChip{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.09);font-size:12px}
#milestone{position:absolute;right:14px;top:112px;text-align:right;font-size:12px;font-weight:900;color:#ffe188}
@media(max-width:520px){#target{top:110px}#neighborhood{top:110px}#effects{top:65px}.top{padding-right:6px;padding-left:6px}.pill{padding:7px 9px;font-size:12px}#milestone{top:148px}}

#ghoulWarning{position:absolute;left:50%;top:27%;transform:translateX(-50%);font-size:clamp(20px,5vw,44px);font-weight:1000;color:#ff665d;opacity:0;text-align:center;text-shadow:0 0 18px #000,0 0 18px #ff2d27;transition:opacity .15s}
#ghoulWarning.active{opacity:1;animation:ghoulPulse .45s steps(2) infinite}
@keyframes ghoulPulse{50%{transform:translateX(-50%) scale(1.08)}}

#finalCountdown{
 position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.6);
 z-index:50;pointer-events:none;opacity:0;font-size:clamp(110px,28vw,280px);
 font-weight:1000;line-height:1;color:#fff;
 text-shadow:0 0 12px #000,0 0 34px #ff3c35,0 0 70px #ff3c35;
 transition:opacity .12s,transform .12s
}
#finalCountdown.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
#finalCountdown.danger{color:#ffe266;text-shadow:0 0 12px #000,0 0 35px #ff2f27,0 0 75px #ff2f27}

#personalBestFlash{
 position:absolute;left:50%;top:42%;transform:translate(-50%,-50%) scale(.8);
 z-index:55;pointer-events:none;opacity:0;text-align:center;
 font-size:clamp(30px,8vw,76px);font-weight:1000;color:#ffe36e;
 text-shadow:0 0 10px #000,0 0 30px #ff9f1c;transition:.2s
}
#personalBestFlash.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
#comboBarWrap{
 position:absolute;left:50%;top:105px;transform:translateX(-50%);
 width:min(48vw,300px);height:10px;border-radius:999px;overflow:hidden;
 background:rgba(5,7,12,.64);border:1px solid rgba(255,255,255,.2)
}
#comboBar{height:100%;width:0;background:linear-gradient(90deg,#f2c14e,#ff633f);transition:width .12s}

#riskMeter{position:absolute;left:14px;top:112px;font-size:12px;font-weight:1000}
#riskMeter.danger{color:#ff756d;border-color:#ff5148}
#rewardBanner{position:absolute;left:50%;top:30%;transform:translate(-50%,-50%) scale(.8);opacity:0;
 z-index:60;pointer-events:none;text-align:center;font-size:clamp(28px,7vw,70px);font-weight:1000;
 color:#ffe36e;text-shadow:0 0 12px #000,0 0 32px #ff9f1c;transition:.18s}
#rewardBanner.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
.weekTabs{display:flex;justify-content:center;gap:8px;margin:10px 0}
.weekTab{padding:7px 12px;border-radius:999px;background:rgba(255,255,255,.08);font-size:12px;font-weight:900}

#leaderStatus{
 display:inline-block;margin-top:8px;padding:7px 11px;border-radius:999px;
 font-size:12px;font-weight:1000;background:rgba(255,255,255,.08)
}
#leaderStatus.online{color:#9cffb2;border:1px solid #3c9f5d}
#leaderStatus.offline{color:#ffb4ad;border:1px solid #bd5147}
#leaderStatus.loading{color:#ffe38b;border:1px solid #a1842e}
#refreshScores{margin-left:8px;padding:8px 12px;font-size:12px;box-shadow:none;background:#202637;color:#fff;border:1px solid rgba(255,255,255,.22)}
#submitNotice{margin:9px auto 0;max-width:430px;font-size:13px;font-weight:800}

#stabilityBadge{position:absolute;right:14px;bottom:58px;font-size:11px;font-weight:1000;color:#b9ffca}
#debugPanel{display:none;position:absolute;left:12px;top:155px;max-width:330px;padding:9px 11px;border-radius:10px;background:rgba(0,0,0,.82);font:12px/1.35 monospace;color:#b9ffca;white-space:pre-wrap;z-index:90}
#debugPanel.show{display:block}
</style>
</head>
<body>
<canvas id="game"></canvas>
<div id="hud">
 <div id="policeAlert"></div>
 <div class="top">
  <div class="pill">TIME <span id="time">60</span></div>
  <div class="pill">SCORE <span id="score">0</span></div>
  <div class="pill">MISSES <span id="misses">0</span>/8</div>
  <div class="pill">BEST <span id="bestScore">0</span></div>
 </div>
 <div id="effects"><div id="cheeseEffect" class="effect">🧀 RAT FREEZE <span></span></div><div id="coffeeEffect" class="effect">☕ ×2 RUSH <span></span></div></div>
 <div id="neighborhood" class="pill">MOUNT VERNON</div>
 <div id="target" class="pill">TOP SCORE: <span id="topScore">0</span></div>
 <div id="milestone"></div><div id="riskMeter" class="pill">STABILITY: CORE GAME</div><div id="rewardBanner"></div>
 <div id="combo"></div><div id="announcement"></div><div id="ghoulWarning"></div><div id="finalCountdown"></div><div id="personalBestFlash"></div><div id="comboBarWrap"><div id="comboBar"></div></div>
 <div id="mode" class="pill">Tap rats & bonuses • Hold to place a trap</div><div id="stabilityBadge" class="pill">2.0 STABILITY MODE</div><div id="debugPanel"></div>
 <div id="audioControls"><button id="musicBtn" class="audioBtn">♫ MUSIC ON</button><button id="soundBtn" class="audioBtn">🔊 FX ON</button></div>
 <button id="installBtn">INSTALL APP</button>
 <div id="message"><h1>Rat Run:<br>Baltimore</h1><p>Loading the shared leaderboard…</p></div>
</div>
<script src="./leaderboard-config.js"></script>
<script>
(()=>{
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');
const scoreEl=document.getElementById('score'),timeEl=document.getElementById('time'),missesEl=document.getElementById('misses');
const message=document.getElementById('message'),comboEl=document.getElementById('combo'),debugPanel=document.getElementById('debugPanel');
let leaderboardOnline=false,lastLeaderboardError='';
const announcement=document.getElementById('announcement'),neighborhoodEl=document.getElementById('neighborhood');
const cheeseEffect=document.getElementById('cheeseEffect'),coffeeEffect=document.getElementById('coffeeEffect');
const bestScoreEl=document.getElementById('bestScore'),topScoreEl=document.getElementById('topScore'),targetEl=document.getElementById('target');
const policeAlert=document.getElementById('policeAlert'),milestoneEl=document.getElementById('milestone'),ghoulWarning=document.getElementById('ghoulWarning'),finalCountdown=document.getElementById('finalCountdown'),personalBestFlash=document.getElementById('personalBestFlash'),comboBar=document.getElementById('comboBar'),riskMeter=document.getElementById('riskMeter'),rewardBanner=document.getElementById('rewardBanner');
const musicBtn=document.getElementById('musicBtn'),soundBtn=document.getElementById('soundBtn');
const adamImg=new Image(),cheeseImg=new Image(),coffeeImg=new Image();
adamImg.src='./assets/adam-runner.png';cheeseImg.src='./assets/giant-cheese.svg';coffeeImg.src='./assets/coffee.svg';

let W=0,H=0,dpr=1,running=false,last=0,worldY=0,score=0,misses=0,elapsed=0,spawnTimer=0;
let rats=[],traps=[],particles=[],obstacles=[],decorations=[],adams=[],powerups=[],buildings=[],vehicles=[],pedestrians=[],pigeons=[];
let pointer={x:0,y:0,down:false,downAt:0,moved:false};
let difficulty=1,combo=0,comboTimer=0,timeLeft=30,adamTimer=8,powerTimer=6;
let freezeTimer=0,coffeeTimer=0,announcementTimer=0,currentNeighborhood='MOUNT VERNON',vehicleTimer=2,pedTimer=3,pigeonTimer=4;
let leaderboard=[],leaderScore=0,playerName='ADAM',recordAlerted=false,nearAlerted=false,milestonesHit=new Set(),sessionId='';
let audioCtx=null,musicOn=true,soundOn=true,musicTimer=null,musicStep=0;
const STABILITY_MODE=true;let lastSystem='boot',frameErrors=0;const debugEnabled=new URLSearchParams(location.search).has('debug');
let ghouls=[],ghoulTimer=10,lastCountdownNumber=null,floaters=[],screenShake=0,personalBestAnnounced=false,publicRisk=0,policeUnits=[],policeTimer=999,dogs=[],dogTimer=4,gators=[],gatorTimer=12,gatorAids=[],tripleTimer=0;
const rand=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const SUPABASE_URL='https://vaavrtkobsfqcessccfh.supabase.co';
const SUPABASE_KEY='sb_publishable_NizQeRBjoMpbgMTb5aM9NQ_UN8nZp0f';
const cleanName=n=>(n||'PLAYER').replace(/[^A-Z0-9 _-]/gi,'').trim().slice(0,12).toUpperCase()||'PLAYER';
let weeklyLeaderboard=[];
function localScores(){try{return JSON.parse(localStorage.getItem('ratRunScoresV14')||'[]')}catch(e){return[]}}
function storeLocal(scores){localStorage.setItem('ratRunScoresV14',JSON.stringify(scores.slice(0,25)))}
function normalizedScores(scores){
 return (Array.isArray(scores)?scores:[]).filter(s=>s&&Number.isFinite(Number(s.score)))
 .map(s=>({name:cleanName(s.name||s.player_name),score:Math.max(0,Math.floor(Number(s.score))),date:s.date||s.created_at||''}))
 .sort((a,b)=>b.score-a.score).slice(0,25)
}
function weekStartISO(){
 const d=new Date(),day=d.getUTCDay(),diff=(day+6)%7;
 d.setUTCDate(d.getUTCDate()-diff);d.setUTCHours(0,0,0,0);return d.toISOString()
}
async function supabaseGet(query){
 const r=await fetch(`${SUPABASE_URL}/rest/v1/rat_run_scores?${query}`,{
  headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,Accept:'application/json'}
 });
 if(!r.ok)throw new Error(await r.text());return r.json()
}
async function loadLeaderboard(){
 let all=[],weekly=[];
 try{
  all=normalizedScores(await supabaseGet('select=player_name,score,created_at&order=score.desc&limit=25'));
  weekly=normalizedScores(await supabaseGet(`select=player_name,score,created_at&created_at=gte.${encodeURIComponent(weekStartISO())}&order=score.desc&limit=25`));
  leaderboardOnline=true;lastLeaderboardError='';
 }catch(e){
  console.warn('Global leaderboard unavailable:',e);
  leaderboardOnline=false;lastLeaderboardError=String(e.message||e).slice(0,140);
  all=normalizedScores(localScores());weekly=all;
 }
 leaderboard=all;weeklyLeaderboard=weekly;leaderScore=all[0]?.score||0;
 topScoreEl.textContent=leaderScore;bestScoreEl.textContent=leaderScore;
 return all
}
async function submitScore(name,value){
 const entry={player_name:cleanName(name),score:Math.max(0,Math.floor(value)),session_id:sessionId};
 let scores=normalizedScores([...localScores(),{name:entry.player_name,score:entry.score,date:new Date().toISOString()}]);
 storeLocal(scores);
 try{
  const r=await fetch(`${SUPABASE_URL}/rest/v1/rat_run_scores`,{
   method:'POST',
   headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`,'Content-Type':'application/json',Prefer:'return=minimal'},
   body:JSON.stringify(entry)
  });
  if(!r.ok)throw new Error(await r.text());
  leaderboardOnline=true;lastLeaderboardError='';
  await loadLeaderboard();scores=leaderboard;
 }catch(e){
  leaderboardOnline=false;lastLeaderboardError=`Score not uploaded: ${String(e.message||e).slice(0,110)}`;
  console.warn('Score submission failed:',e);
 }
 return scores
}
function scoreTable(scores,highlight=''){
 if(!scores.length)return'<p class="tiny">No scores yet. Be the first Baltimore champion.</p>';
 return `<div class="scoreboard">${scores.slice(0,10).map((s,i)=>`<div class="score-row ${highlight&&s.name===highlight?'you':''}"><strong>${i+1}</strong><span>${s.name}</span><strong>${s.score.toLocaleString()}</strong></div>`).join('')}</div>`;
}
function dominoBoard(scores,subtitle='BALTIMORE’S BEST',highlight=''){
 const weekly=weeklyLeaderboard.length?weeklyLeaderboard:scores;
 return `<div class="domino"><div class="domino-title">DOMINO SUGARS</div><div class="domino-sub">${subtitle}</div></div>
 <div class="weekTabs"><span class="weekTab">THIS WEEK</span><span class="weekTab">ALL TIME</span></div>
 <h2>THIS WEEK</h2>${scoreTable(weekly,highlight)}
 <h2>ALL TIME</h2>${scoreTable(scores,highlight)}`;
}
function initAudio(){
 if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
 if(audioCtx.state==='suspended')audioCtx.resume();
}
function tone(freq=440,dur=.08,type='square',gain=.045,delay=0){
 if(!soundOn&&!['music'].includes(type))return;
 initAudio();const o=audioCtx.createOscillator(),g=audioCtx.createGain(),t=audioCtx.currentTime+delay;
 o.type=type==='music'?'triangle':type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
 o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+dur);
}
function sfx(kind){
 if(!soundOn)return;
 const map={
  rat:[[760,.05,'square'],[510,.07,'square']],
  miss:[[150,.13,'sawtooth']],
  cheese:[[392,.08,'triangle'],[523,.1,'triangle'],[659,.14,'triangle']],
  coffee:[[260,.07,'square'],[390,.07,'square'],[520,.12,'square']],
  adam:[[330,.08,'triangle'],[494,.08,'triangle'],[659,.08,'triangle'],[988,.18,'triangle']],
  horn:[[210,.16,'sawtooth'],[180,.14,'sawtooth']],
  pigeon:[[900,.035,'triangle'],[750,.04,'triangle']],
  milestone:[[520,.07,'square'],[660,.07,'square']],
  record:[[523,.1,'triangle'],[659,.1,'triangle'],[784,.1,'triangle'],[1047,.28,'triangle']],
  ghoul:[[120,.12,'sawtooth'],[95,.18,'square'],[70,.2,'sawtooth']],
  siren:[[660,.12,'square'],[420,.12,'square'],[660,.12,'square'],[420,.12,'square']],
  drink:[[280,.06,'triangle'],[220,.06,'triangle'],[180,.08,'triangle'],[330,.12,'triangle']],
  gator:[[95,.16,'sawtooth'],[75,.2,'square']]
 };
 (map[kind]||[]).forEach((a,i)=>tone(a[0],a[1],a[2],.045,i*.06));
}
function startMusic(){
 initAudio();stopMusic();musicStep=0;
 const notes=[130.81,164.81,196,220,196,164.81,146.83,174.61];
 musicTimer=setInterval(()=>{if(!musicOn||!running)return;const n=notes[musicStep++%notes.length];tone(n,.22,'music',.022);if(musicStep%2===0)tone(n*2,.09,'music',.012,.04)},260);
}
function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null}}
musicBtn.addEventListener('click',()=>{musicOn=!musicOn;musicBtn.textContent=musicOn?'♫ MUSIC ON':'♫ MUSIC OFF';if(musicOn&&running)startMusic();else stopMusic()});
soundBtn.addEventListener('click',()=>{soundOn=!soundOn;soundBtn.textContent=soundOn?'🔊 FX ON':'🔇 FX OFF'});

function leaderboardStatusMarkup(){
 const cls=leaderboardOnline?'online':'offline';
 const text=leaderboardOnline?'● GLOBAL LEADERBOARD ONLINE':'● OFFLINE — LOCAL SCORES ONLY';
 return `<div><span id="leaderStatus" class="${cls}">${text}</span><button id="refreshScores">REFRESH SCORES</button></div>
 <div id="submitNotice">${lastLeaderboardError?`Last error: ${lastLeaderboardError}`:''}</div>`;
}
function wireLeaderboardButtons(){
 const btn=document.getElementById('refreshScores');
 if(btn)btn.onclick=async()=>{
  const status=document.getElementById('leaderStatus');
  if(status){status.className='loading';status.textContent='● CHECKING SUPABASE…'}
  await loadLeaderboard();
  showOpening();
 };
}

function showOpening(){
 if(!Array.isArray(leaderboard))leaderboard=[];
 if(!Array.isArray(weeklyLeaderboard))weeklyLeaderboard=[];
 message.innerHTML=`${dominoBoard(leaderboard)}<h1>Rat Run:<br>Baltimore</h1><p>Thirty seconds of fast, stable Rat Run. Catch rats, place traps, grab coffee and cheese, catch Adam, chase combos, and compete on the shared DOMINO SUGARS leaderboard. Experimental enemies are temporarily paused while we harden the core game.</p><input id="playerName" class="nameInput" maxlength="12" value="${playerName}" aria-label="Player name"><br><button id="start">START RUN</button>${leaderboardStatusMarkup()}<p class="tiny">Version 2.0 • Music and sound begin after Start.</p>`;
 message.style.display='block';
 const inp=document.getElementById('playerName');inp.addEventListener('input',()=>playerName=cleanName(inp.value));
 document.getElementById('start').addEventListener('click',()=>{playerName=cleanName(inp.value);start()});wireLeaderboardButtons();
}


function resize(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
addEventListener('resize',resize);resize();

function roadBounds(y){const sway=Math.sin((worldY+y)*.00125)*W*.025;return{left:W*.17+sway,right:W*.83+sway}}
function neighborhoodForTime(t){return t<20?'MOUNT VERNON':t<40?'FELLS POINT':'INNER HARBOR'}
function announce(text,color='#fff'){announcement.textContent=text;announcement.style.color=color;announcement.style.opacity=1;announcement.style.transform='translate(-50%,-50%) scale(1)';announcementTimer=1.2}

function setSystem(name){
 lastSystem=name;
 if(debugEnabled){debugPanel.classList.add('show');debugPanel.textContent=`SYSTEM: ${name}\nSCORE: ${Math.floor(score)}\nRATS: ${rats.length}\nFRAMES RECOVERED: ${frameErrors}`}
}
function recoverFrame(error){
 frameErrors++;
 console.error('Rat Run recovered frame error in',lastSystem,error);
 if(debugEnabled){debugPanel.classList.add('show');debugPanel.textContent=`RECOVERED ERROR\nSYSTEM: ${lastSystem}\n${String(error?.message||error)}`}
 // Clear only transient arrays; never end the round.
 particles=[];powerups=powerups.filter(Boolean);rats=rats.filter(Boolean);adams=adams.filter(Boolean);traps=traps.filter(Boolean);
}

function reset(){
 rats=[];traps=[];particles=[];obstacles=[];decorations=[];adams=[];powerups=[];buildings=[];vehicles=[];pedestrians=[];pigeons=[];dogs=[];policeUnits=[];gators=[];gatorAids=[];ghouls=[];
 score=0;misses=0;elapsed=0;worldY=0;spawnTimer=.55;difficulty=1;combo=0;comboTimer=0;timeLeft=30;adamTimer=rand(7,11);powerTimer=rand(5,8);
 freezeTimer=0;coffeeTimer=0;announcementTimer=0;currentNeighborhood='MOUNT VERNON';vehicleTimer=2;pedTimer=3;pigeonTimer=4;
 recordAlerted=false;nearAlerted=false;milestonesHit=new Set();publicRisk=0;policeTimer=999;dogTimer=3;gatorTimer=8+Math.random()*8;tripleTimer=0;riskMeter.textContent='STABILITY: CORE GAME';riskMeter.classList.remove('danger');ghouls=[];ghoulTimer=2.5+Math.random()*2;lastCountdownNumber=null;floaters=[];screenShake=0;personalBestAnnounced=false;comboBar.style.width='0%';personalBestFlash.classList.remove('show');ghoulWarning.classList.remove('active');finalCountdown.classList.remove('show','danger');finalCountdown.textContent='';sessionId=(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random());policeAlert.classList.remove('active');milestoneEl.textContent='';
 scoreEl.textContent='0';missesEl.textContent='0';timeEl.textContent='30';neighborhoodEl.textContent=currentNeighborhood;
 cheeseEffect.style.display='none';coffeeEffect.style.display='none';
 for(let i=0;i<18;i++)addDecoration(-i*100);
 for(let i=0;i<7;i++)addObstacle(-i*230-300);
 for(let i=0;i<12;i++)addBuilding(-i*145);
}
function start(){initAudio();reset();running=true;message.style.display='none';last=performance.now();startMusic();requestAnimationFrame(loop)}

function addBuilding(y=-120){
 const palette=['#8e3f32','#a84f3c','#71372f','#b05b42','#62362f','#965039'];
 buildings.push({y,side:Math.random()<.5?-1:1,w:rand(78,128),h:rand(135,220),color:palette[Math.floor(rand(0,palette.length))],roof:Math.random()<.35,shop:Math.random()<.24,windows:Math.floor(rand(2,4)),sign:Math.random()<.18});
}
function addDecoration(y=-80){
 const types=['trash','stoop','hydrant','lamp','mural','busstop','streetSign'];
 decorations.push({y,side:Math.random()<.5?-1:1,type:types[Math.floor(rand(0,types.length))],offset:rand(18,72),size:rand(.78,1.23),variant:Math.floor(rand(0,4))});
}
function addObstacle(y=-120){
 const b=roadBounds(y);obstacles.push({x:rand(b.left+55,b.right-55),y,r:rand(24,40),type:Math.random()<.46?'cone':Math.random()<.73?'pothole':'cart'});
}
function spawnRat(){
 const y=rand(40,H*.38),b=roadBounds(y),fromLeft=Math.random()<.5,r=rand(14,20);
 rats.push({x:fromLeft?b.left+r+8:b.right-r-8,y,vx:0,vy:rand(25,55),r,wobble:rand(0,6.28),alive:true,tail:rand(15,25),targetX:fromLeft?b.right-r-8:b.left+r+8,fromLeft,turnRate:rand(2.2,4.2),speed:rand(185,280)+difficulty*12,curve:rand(-75,75),age:0});
}
function spawnAdam(){
 const y=rand(H*.19,H*.43),b=roadBounds(y),fromLeft=Math.random()<.5;
 adams.push({x:fromLeft?b.left-65:b.right+65,y,fromLeft,vx:(fromLeft?1:-1)*rand(235,310),vy:rand(18,48),age:0,w:105,h:145,alive:true,bob:rand(0,6.28)});
}
function spawnPowerup(){
 const type=Math.random()<.52?'cheese':'coffee',y=rand(H*.16,H*.36),b=roadBounds(y);
 powerups.push({type,x:rand(b.left+70,b.right-70),y,r:38,life:8,age:0,spin:rand(-.45,.45)});
 announce(type==='cheese'?'GIANT CHEESE!':'COFFEE DROP!',type==='cheese'?'#ffe15a':'#e5a4ff');
}


function rewardRoll(source){
 const roll=Math.random();
 let tier,points;
 if(source==='coffee'){
  if(roll<.68){tier='LOW';points=[40,60,75][Math.floor(rand(0,3))]}
  else if(roll<.93){tier='MEDIUM';points=[120,160,200][Math.floor(rand(0,3))]}
  else{tier='HIGH';points=[350,500][Math.floor(rand(0,2))]}
 }else{
  if(roll<.45){tier='LOW';points=[150,225,300][Math.floor(rand(0,3))]}
  else if(roll<.88){tier='MEDIUM';points=[400,500,650][Math.floor(rand(0,3))]}
  else{tier='HIGH';points=[900,1200][Math.floor(rand(0,2))]}
 }
 return {tier,points}
}
function showReward(source,reward){
 rewardBanner.textContent=`${source==='coffee'?'COFFEE':'GATOR-AID'} ${reward.tier}! +${reward.points}`;
 rewardBanner.classList.add('show');
 setTimeout(()=>rewardBanner.classList.remove('show'),1500);
 addFloater(W*.5,H*.38,`+${reward.points}`,reward.tier==='HIGH'?'#ffe36e':'#ffffff',reward.tier==='HIGH'?36:26);
 if(reward.tier==='HIGH'){screenShake=14;sfx('record')}else sfx('milestone');
}
function drinkBonus(source){
 sfx('drink');
 const reward=rewardRoll(source);
 score+=reward.points;
 if(source==='coffee'){coffeeTimer=Math.max(coffeeTimer,5)}
 else{tripleTimer=Math.max(tripleTimer,5)}
 showReward(source,reward);updateHUD();
}
function civilianStrike(kind,x,y){
 const penalty=kind==='dog'?30:kind==='pedestrian'?25:15;
 score=Math.max(0,score-penalty);publicRisk++;
 riskMeter.textContent=`PUBLIC RISK: ${Math.min(publicRisk,3)}/3`;
 riskMeter.classList.toggle('danger',publicRisk>=2);
 addFloater(x,y-30,`-${penalty} ${kind.toUpperCase()}`,'#ff766d',21);
 announce(kind==='dog'?'WATCH THE DOG!':kind==='pedestrian'?'CIVILIAN HIT!':'TRAFFIC HIT!','#ff766d');
 sfx('miss');updateHUD();
 if(publicRisk>=3&&policeUnits.length===0)dispatchPolice('PUBLIC RISK');
}
function flashPolice(text='POLICE DISPATCHED!'){
 policeAlert.classList.add('active');announce(text,'#8fd0ff');sfx('siren');
 setTimeout(()=>policeAlert.classList.remove('active'),1100);
}
function dispatchPolice(reason){
 policeUnits.push({x:W+55,y:clamp(H*.63,120,H-85),vx:-105,hp:8,r:36,drain:1.2,reason});
 flashPolice(reason==='PUBLIC RISK'?'PUBLIC RISK — POLICE DISPATCHED!':'CHAMPION ALERT!');
}
function spawnDog(){
 const y=rand(H*.18,H*.42),b=roadBounds(y),fromLeft=Math.random()<.5;
 dogs.push({x:fromLeft?b.left-35:b.right+35,y,vx:(fromLeft?1:-1)*rand(65,100),phase:rand(0,6.28),alive:true});
}
function spawnGator(){
 const y=clamp(H*.62,150,H-90);
 gators.push({x:W*.5,y,hp:6,r:46,age:0,bite:1.2});
 announce('SEWER GATOR! TAP 6×','#9dff8a');sfx('gator');screenShake=12;
}
function spawnGatorAid(x,y){gatorAids.push({x,y,r:35,life:6,age:0})}
function hitSpecialActors(x,y){
 for(let i=policeUnits.length-1;i>=0;i--){
  const p=policeUnits[i];if(Math.hypot(x-p.x,y-p.y)<58){
   p.hp--;score+=8;addFloater(p.x,p.y-45,'+8 POLICE HIT','#8fd0ff',19);
   if(p.hp<=0){score+=175;addFloater(p.x,p.y-65,'+175 CLEARED','#8fd0ff',25);policeUnits.splice(i,1);publicRisk=0;riskMeter.textContent='STABILITY: CORE GAME';riskMeter.classList.remove('danger')}
   updateHUD();return true
  }
 }
 for(let i=gators.length-1;i>=0;i--){
  const g=gators[i];if(Math.hypot(x-g.x,y-g.y)<68){
   g.hp--;score+=12;addFloater(g.x,g.y-50,'+12 GATOR HIT','#b9ff93',19);
   if(g.hp<=0){score+=250;spawnGatorAid(g.x,g.y);gators.splice(i,1);announce('GATOR DEFEATED — GRAB GATOR-AID!','#b9ff93')}
   updateHUD();return true
  }
 }
 for(let i=gatorAids.length-1;i>=0;i--){
  const a=gatorAids[i];if(Math.hypot(x-a.x,y-a.y)<55){gatorAids.splice(i,1);drinkBonus('gator');return true}
 }
 for(let i=dogs.length-1;i>=0;i--){
  const d=dogs[i];if(Math.hypot(x-d.x,y-d.y)<34){civilianStrike('dog',d.x,d.y);dogs.splice(i,1);return true}
 }
 return false
}

function spawnVehicle(){
 const type=Math.random()<.22?'bus':Math.random()<.48?'taxi':'car';
 const lane=Math.random()<.5?-1:1, y=-150;
 const b=roadBounds(H*.25), cx=(b.left+b.right)/2;
 const x=cx+lane*(type==='bus'?W*.13:W*.17);
 vehicles.push({
  type,x,y,w:type==='bus'?82:58,h:type==='bus'?145:96,
  vy:rand(185,245)+(coffeeTimer>0?35:0),lane,
  color:type==='taxi'?'#f0c73d':['#476a87','#8b3d45','#3e7659','#6b576f'][Math.floor(rand(0,4))],
  horn:rand(1.2,4),alive:true
 });
}
function spawnPedestrian(){
 const y=rand(H*.12,H*.36),b=roadBounds(y),side=Math.random()<.5?-1:1;
 pedestrians.push({
  x:side<0?b.left-rand(28,68):b.right+rand(28,68),y,side,
  vy:rand(35,70),phase:rand(0,6.28),shirt:['#e66b55','#54a7d8','#f1cb4e','#8359a8','#e8e8e8'][Math.floor(rand(0,5))],
  alive:true
 });
}
function spawnPigeons(){
 const y=rand(H*.16,H*.42),b=roadBounds(y),side=Math.random()<.5?-1:1,baseX=side<0?b.left-rand(8,52):b.right+rand(8,52);
 for(let i=0;i<Math.floor(rand(3,7));i++){
  pigeons.push({x:baseX+rand(-28,28),y:y+rand(-18,18),vx:0,vy:rand(18,40),phase:rand(0,6.28),flying:false,alive:true});
 }
}

function placeTrap(x,y){const b=roadBounds(y);if(x<b.left+25||x>b.right-25)return;traps.push({x,y,r:29,life:7,armed:.45});burst(x,y,'#f2c14e',8)}
function burst(x,y,color,count=10){for(let i=0;i<count;i++)particles.push({x,y,vx:rand(-150,150),vy:rand(-155,75),life:rand(.35,.8),color,size:rand(2,7)})}

function activatePowerup(p){
 if(p.type==='cheese'){freezeTimer=5;score+=100;addFloater(p.x,p.y-30,'CHEESE FREEZE!','#ffe15a',25);screenShake=7;sfx('cheese');announce('RATS FROZEN!','#ffe15a');burst(p.x,p.y,'#ffe15a',38)}
 else{adamTimer=Math.min(adamTimer,1.1);drinkBonus('coffee');announce('CAFFEINE RUSH!','#e5a4ff');burst(p.x,p.y,'#c46cff',38)}
 updateHUD();
}
function hitTest(x,y){
 setSystem('tap');
 for(let i=powerups.length-1;i>=0;i--){
  const p=powerups[i];
  if(p&&Math.hypot(x-p.x,y-p.y)<p.r+18){powerups.splice(i,1);activatePowerup(p);return}
 }
 for(let i=adams.length-1;i>=0;i--){
  const a=adams[i];
  if(a&&Math.abs(x-a.x)<a.w*.52&&Math.abs(y-a.y)<a.h*.52){
   adams.splice(i,1);const earned=500*(coffeeTimer>0?2:1);score+=earned;combo+=5;comboTimer=1.8;
   addFloater(a.x,a.y-40,`+${earned} ADAM!`,'#e8a8ff',30);screenShake=12;sfx('adam');burst(a.x,a.y,'#b72cff',34);updateHUD();return
  }
 }
 for(let i=rats.length-1;i>=0;i--){
  const r=rats[i];
  if(r&&Math.hypot(x-r.x,y-r.y)<r.r+13){
   rats.splice(i,1);const earned=(10+combo*2)*(coffeeTimer>0?2:1);score+=earned;combo++;comboTimer=1.2;
   addFloater(r.x,r.y-16,`+${earned}`,combo>=8?'#ffe36e':'#fff',combo>=8?27:20);
   if(combo===5)announce('5× COMBO!','#ffe36e');
   if(combo===10){announce('RAT MANIA!','#ff8a45');screenShake=8;sfx('milestone')}
   sfx('rat');burst(r.x,r.y,'#e9dfc5',combo>=10?20:12);updateHUD();return
  }
 }
 for(const o of obstacles){
  if(o&&Math.hypot(x-o.x,y-o.y)<o.r+10){score=Math.max(0,score-10);combo=0;addFloater(x,y,'-10','#ff766d',18);burst(x,y,'#e45858',10);updateHUD();return}
 }
 combo=0;comboEl.style.opacity=0;updateComboPolish();
}

function checkScoreEvents(){
 const whole=Math.floor(score),remaining=Math.max(0,leaderScore-whole);
 targetEl.innerHTML=leaderScore?`TO #1: <span>${remaining.toLocaleString()}</span>`:'SET THE FIRST RECORD';
 if(leaderScore>0&&whole>=leaderScore&&!recordAlerted){recordAlerted=true;policeAlert.classList.add('active');announce('NEW BALTIMORE CHAMPION!','#ffe36e');sfx('record');setTimeout(()=>policeAlert.classList.remove('active'),3800)}
 else if(leaderScore>0&&remaining<=Math.max(100,Math.floor(leaderScore*.1))&&!nearAlerted){nearAlerted=true;policeAlert.classList.add('active');announce('CHAMPION IN SIGHT!','#74c7ff');sfx('siren');setTimeout(()=>{if(!recordAlerted)policeAlert.classList.remove('active')},2600)}
 const steps=[100,250,500,1000,2000,3000,5000];
 for(const n of steps)if(whole>=n&&!milestonesHit.has(n)){milestonesHit.add(n);milestoneEl.textContent=`+ ${n.toLocaleString()} MILESTONE`;announce(`${n.toLocaleString()} POINTS!`,'#ffe36e');sfx('milestone');setTimeout(()=>{if(milestoneEl.textContent.includes(String(n)))milestoneEl.textContent=''},1400);break}
}

function spawnGhoul(){
 const fromLeft=Math.random()<.5;
 ghouls.push({
  x:fromLeft?35:W-35,
  y:clamp(H*.68,130,H-90),
  vx:fromLeft?85:-85,
  hp:5,
  r:34,
  eatCooldown:1,
  drainCooldown:2,
  dir:fromLeft?1:-1
 });
 ghoulWarning.textContent='STREET GHOUL — TAP IT 3×';
 ghoulWarning.classList.add('active');
 setTimeout(()=>ghoulWarning.classList.remove('active'),1200);
}

function updateGhouls(dt){
 ghoulTimer-=dt;

 if(ghoulTimer<=0&&ghouls.length===0){
  // Reset first so an error can never create a spawn loop.
  ghoulTimer=9;
  spawnGhoul();
 }

 for(let i=ghouls.length-1;i>=0;i--){
  const g=ghouls[i];
  if(!g){ghouls.splice(i,1);continue}

  g.eatCooldown-=dt;
  g.drainCooldown-=dt;

  let target=null;
  let best=Infinity;
  for(const r of rats){
   if(!r||r.alive===false)continue;
   const d=Math.hypot(r.x-g.x,r.y-g.y);
   if(d<best){best=d;target=r}
  }

  if(target){
   const dx=target.x-g.x;
   const dy=target.y-g.y;
   g.x+=clamp(dx,-90,90)*dt;
   g.y+=clamp(dy,-65,65)*dt;

   if(best<46&&g.eatCooldown<=0){
    const idx=rats.indexOf(target);
    if(idx>=0)rats.splice(idx,1);
    score=Math.max(0,score-15);
    addFloater(g.x,g.y-40,'-15','#ff6d63',24);
    ghoulWarning.textContent='GHOUL ATE A RAT! -15';
    ghoulWarning.classList.add('active');
    setTimeout(()=>ghoulWarning.classList.remove('active'),650);
    g.eatCooldown=1;
    updateHUD();
   }
  }else{
   g.x+=g.vx*dt;
  }

  g.y=clamp(g.y,120,H-75);

  if(g.drainCooldown<=0){
   score=Math.max(0,score-5);
   addFloater(g.x,g.y-55,'-5','#ff9a8f',18);
   g.drainCooldown=2;
   updateHUD();
  }

  // Keep the Ghoul on screen until defeated.
  g.x=clamp(g.x,32,W-32);
 }
}

function drawGhouls(){
 for(const g of ghouls){
  if(!g)continue;
  ctx.save();
  ctx.translate(g.x,g.y);

  ctx.fillStyle='rgba(0,0,0,.3)';
  ctx.beginPath();ctx.ellipse(0,38,27,8,0,0,Math.PI*2);ctx.fill();

  ctx.fillStyle='#93b96f';
  ctx.fillRect(-17,-10,34,40);

  ctx.fillStyle='#34422f';
  ctx.beginPath();ctx.arc(0,-26,18,0,Math.PI*2);ctx.fill();

  ctx.strokeStyle='#93b96f';
  ctx.lineWidth=8;
  ctx.lineCap='round';
  ctx.beginPath();
  ctx.moveTo(-13,-3);ctx.lineTo(-29,13);
  ctx.moveTo(13,-3);ctx.lineTo(29,13);
  ctx.stroke();

  ctx.fillStyle='#242a23';
  ctx.fillRect(-16,27,12,28);
  ctx.fillRect(4,27,12,28);

  ctx.fillStyle='#ff4e47';
  ctx.beginPath();
  ctx.arc(-7,-29,3,0,Math.PI*2);
  ctx.arc(7,-29,3,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle='#ff7168';
  ctx.font='900 13px system-ui';
  ctx.textAlign='center';
  ctx.fillText(`GHOUL ${g.hp}/5`,0,-55);

  ctx.restore();
 }
}

function hitGhoul(x,y){
 for(let i=ghouls.length-1;i>=0;i--){
  const g=ghouls[i];
  if(Math.hypot(x-g.x,y-g.y)<60){
   g.hp-=1;
   score+=10;
   addFloater(g.x,g.y-42,'+10 HIT','#baff91',20);
   if(g.hp<=0){
    score+=75;
    addFloater(g.x,g.y-62,'+75 GHOUL GONE!','#baff91',25);
    ghouls.splice(i,1);
    ghoulTimer=7;
    ghoulWarning.textContent='GHOUL CLEARED! +75';
   }else{
    ghoulWarning.textContent=`GHOUL HIT — ${g.hp} LEFT`;
   }
   ghoulWarning.classList.add('active');
   setTimeout(()=>ghoulWarning.classList.remove('active'),650);
   updateHUD();
   return true;
  }
 }
 return false;
}

function addFloater(x,y,text,color='#fff',size=20){
 floaters.push({x,y,text,color,size,life:1,vy:-48});
}
function updateFloaters(dt){
 for(const f of floaters){f.y+=f.vy*dt;f.life-=dt}
 floaters=floaters.filter(f=>f.life>0);
 if(screenShake>0)screenShake=Math.max(0,screenShake-dt*28);
}
function drawFloaters(){
 ctx.save();
 for(const f of floaters){
  ctx.globalAlpha=Math.max(0,f.life);
  ctx.fillStyle=f.color;ctx.font=`1000 ${f.size}px system-ui`;
  ctx.textAlign='center';ctx.shadowColor='#000';ctx.shadowBlur=5;
  ctx.fillText(f.text,f.x,f.y);
 }
 ctx.restore();ctx.globalAlpha=1;
}
function triggerPersonalBest(){
 if(personalBestAnnounced)return;
 personalBestAnnounced=true;
 personalBestFlash.textContent='NEW PERSONAL BEST!';
 personalBestFlash.classList.add('show');
 sfx('record');
 setTimeout(()=>personalBestFlash.classList.remove('show'),2200);
}
function updateComboPolish(){
 const pct=Math.min(100,combo*8);
 comboBar.style.width=pct+'%';
 if(combo>=10)comboBar.style.filter='brightness(1.35)';
 else comboBar.style.filter='none';
}

function updateFinalCountdown(){
 const n=Math.ceil(timeLeft);
 if(n<=10&&n>0){
  finalCountdown.textContent=n;
  finalCountdown.classList.add('show');
  finalCountdown.classList.toggle('danger',n<=5);
  if(lastCountdownNumber!==n){
   lastCountdownNumber=n;
   tone(n<=5?180:260,.08,'square',.06);
   finalCountdown.animate(
    [{transform:'translate(-50%,-50%) scale(.55)',opacity:.2},{transform:'translate(-50%,-50%) scale(1.15)',opacity:1},{transform:'translate(-50%,-50%) scale(1)',opacity:1}],
    {duration:420,easing:'ease-out'}
   );
  }
 }else{
  finalCountdown.classList.remove('show','danger');
  finalCountdown.textContent='';
 }
}

function updateHUD(){
 scoreEl.textContent=Math.floor(score);missesEl.textContent=misses;
 checkScoreEvents();updateComboPolish();
 const localBest=Number(localStorage.getItem('ratRunPersonalBest')||0);
 if(score>localBest){localStorage.setItem('ratRunPersonalBest',Math.floor(score));if(localBest>0)triggerPersonalBest()}
 if(combo>=3){comboEl.textContent=`${combo}× COMBO`;comboEl.style.opacity=1}
}

canvas.addEventListener('pointerdown',e=>{if(!running)return;pointer.x=e.clientX;pointer.y=e.clientY;pointer.down=true;pointer.downAt=performance.now();pointer.moved=false;canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener('pointermove',e=>{if(pointer.down&&Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y)>12)pointer.moved=true});
canvas.addEventListener('pointerup',e=>{if(!running)return;const held=performance.now()-pointer.downAt;pointer.down=false;if(held>360&&!pointer.moved)placeTrap(e.clientX,e.clientY);else hitTest(e.clientX,e.clientY)});

function update(dt){
 setSystem('clock');updateFloaters(dt);
 elapsed+=dt;timeLeft=Math.max(0,30-elapsed);timeEl.textContent=Math.ceil(timeLeft);updateFinalCountdown();
 if(timeLeft<=0){endGame();return}
 difficulty=1+elapsed/24;worldY+=dt*(145+difficulty*7);
 if(freezeTimer>0)freezeTimer=Math.max(0,freezeTimer-dt);
 if(coffeeTimer>0)coffeeTimer=Math.max(0,coffeeTimer-dt);
 cheeseEffect.style.display=freezeTimer>0?'block':'none';coffeeEffect.style.display=coffeeTimer>0?'block':'none';
 cheeseEffect.querySelector('span').textContent=freezeTimer>0?freezeTimer.toFixed(1)+'s':'';
 coffeeEffect.querySelector('span').textContent=coffeeTimer>0?coffeeTimer.toFixed(1)+'s':'';
 if(announcementTimer>0){announcementTimer-=dt;if(announcementTimer<=0){announcement.style.opacity=0;announcement.style.transform='translate(-50%,-50%) scale(.8)'}}

 setSystem('spawning');
 adamTimer-=dt;if(adamTimer<=0){spawnAdam();adamTimer=rand(9,14)}
 powerTimer-=dt;if(powerTimer<=0){spawnPowerup();powerTimer=rand(7,11)}
 spawnTimer-=dt;if(spawnTimer<=0){const n=Math.random()<.18?2:1;for(let i=0;i<n;i++)spawnRat();spawnTimer=rand(.28,.62)/Math.min(1.6,.9+difficulty*.08)}
 if(buildings.length<15)addBuilding(-180);if(decorations.length<18)addDecoration(-100);if(obstacles.length<6)addObstacle(-220);

 setSystem('scenery');
 const scroll=dt*(145+difficulty*7);
 for(const b of buildings)b.y+=scroll;for(const d of decorations)d.y+=scroll;for(const o of obstacles)o.y+=scroll;
 buildings=buildings.filter(b=>b&&b.y<H+260);decorations=decorations.filter(d=>d&&d.y<H+130);obstacles=obstacles.filter(o=>o&&o.y<H+110);

 setSystem('rats');
 const ratScale=freezeTimer>0?.04:1;
 for(const r of rats){
  if(!r)continue;
  r.age+=dt;r.wobble+=dt*7;r.y+=Math.sin(r.wobble*1.7)*6*dt;
  const desiredX=r.targetX,desiredY=r.y+80+Math.sin(r.wobble)*r.curve;
  let dx=desiredX-r.x,dy=desiredY-r.y,len=Math.hypot(dx,dy)||1;
  const desiredVx=dx/len*r.speed,desiredVy=dy/len*r.speed*.48+35;
  r.vx+=(desiredVx-r.vx)*clamp(r.turnRate*dt,0,1);r.vy+=(desiredVy-r.vy)*clamp(r.turnRate*dt,0,1);
  r.x+=r.vx*dt*ratScale;r.y+=r.vy*dt*ratScale+(freezeTimer>0?scroll:0);
  for(const t of traps){if(t&&t.armed<=0&&Math.hypot(r.x-t.x,r.y-t.y)<t.r+r.r){r.alive=false;score+=35*(coffeeTimer>0?2:1);combo++;comboTimer=1.2;burst(t.x,t.y,'#f2c14e',14);t.life=0;updateHUD()}}
  const nowB=roadBounds(r.y),reached=r.fromLeft?r.x>nowB.right+r.r:r.x<nowB.left-r.r;
  if(reached||r.y>H+50){r.alive=false;misses++;combo=0;updateHUD()}
 }
 rats=rats.filter(r=>r&&r.alive);

 setSystem('bonuses');
 for(const a of adams){if(!a)continue;a.age+=dt;a.bob+=dt*9;a.x+=a.vx*dt;a.y+=a.vy*dt+Math.sin(a.bob)*18*dt;const b=roadBounds(a.y);if((a.fromLeft&&a.x>b.right+100)||(!a.fromLeft&&a.x<b.left-100)||a.y>H+100)a.alive=false}
 adams=adams.filter(a=>a&&a.alive);
 for(const p of powerups){if(!p)continue;p.age+=dt;p.life-=dt;p.y+=scroll;if(p.life<=0||p.y>H+80)p.alive=false}
 powerups=powerups.filter(p=>p&&p.alive!==false);
 for(const t of traps){if(!t)continue;t.life-=dt;t.armed-=dt;t.y+=scroll}traps=traps.filter(t=>t&&t.life>0&&t.y<H+70);

 setSystem('particles');
 for(const p of particles){if(!p)continue;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=260*dt;p.life-=dt}
 particles=particles.filter(p=>p&&p.life>0);
 if(comboTimer>0){comboTimer-=dt;if(comboTimer<=0){combo=0;comboEl.style.opacity=0;updateComboPolish()}}
}

async function endGame(){
 if(!running)return;running=false;stopMusic();policeAlert.classList.remove('active');
 const finalScore=Math.floor(score),oldLeader=leaderScore;
 message.innerHTML=`${dominoBoard(leaderboard,'FINAL SCORE LOADING')}<h1>${finalScore.toLocaleString()}</h1><p>Submitting ${playerName}’s run…</p>`;
 message.style.display='block';
 const scores=await submitScore(playerName,finalScore);
 const rank=scores.findIndex(s=>s.name===playerName&&s.score===finalScore)+1;
 const title=finalScore>oldLeader?'NEW BALTIMORE CHAMPION!':rank>0&&rank<=10?`YOU PLACED #${rank}`:'RUN COMPLETE';
 if(finalScore>oldLeader)sfx('record');
 message.innerHTML=`${dominoBoard(scores,title,playerName)}<h1>${finalScore.toLocaleString()}</h1><p>${rank>0?`${playerName} is ranked <strong>#${rank}</strong>.`:`Great run, ${playerName}.`} ${leaderboardOnline?'Score confirmed on the global leaderboard.':'Score saved locally; global upload can be retried.'}</p><button id="again">PLAY AGAIN</button><button id="home" class="audioBtn">LEADERBOARD HOME</button><p class="tiny">${leaderboardOnline?'GLOBAL SCORE CONFIRMED':'LOCAL FALLBACK'}</p>`;
 document.getElementById('again').addEventListener('click',start);
 document.getElementById('home').addEventListener('click',showOpening);
}

function drawSky(){
 const g=ctx.createLinearGradient(0,0,0,H*.48);g.addColorStop(0,currentNeighborhood==='INNER HARBOR'?'#172c52':'#31223f');g.addColorStop(1,'#ef8c63');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 ctx.fillStyle='rgba(255,223,151,.8)';ctx.beginPath();ctx.arc(W*.72,H*.14,28,0,7);ctx.fill();
}
function drawLandmarks(){
 const y=H*.16;
 ctx.fillStyle='#241d29';
 if(currentNeighborhood==='MOUNT VERNON'){
  ctx.fillRect(W*.07,y-120,28,120);ctx.beginPath();ctx.moveTo(W*.07,y-120);ctx.lineTo(W*.084,y-165);ctx.lineTo(W*.098,y-120);ctx.fill();
  ctx.font='900 15px system-ui';ctx.fillStyle='#e9d7ba';ctx.fillText('BROMO',W*.045,y-70);
 }else if(currentNeighborhood==='FELLS POINT'){
  ctx.fillStyle='#251d28';for(let i=0;i<7;i++)ctx.fillRect(i*W/6-15,y-(55+(i%3)*18),W/6+10,110);
  ctx.fillStyle='#7a332c';ctx.fillRect(W*.1,y-65,W*.34,70);ctx.fillStyle='#d4c2a0';
  for(let i=0;i<8;i++)ctx.fillRect(W*.12+i*W*.038,y-49,10,18);
 }else{
  ctx.fillStyle='#251d28';ctx.fillRect(W*.05,y-60,W*.3,65);ctx.fillRect(W*.64,y-52,W*.3,57);
  ctx.fillStyle='#ff3d38';ctx.font=`900 ${Math.max(18,W*.025)}px system-ui`;ctx.textAlign='center';ctx.shadowColor='#ff3d38';ctx.shadowBlur=10;ctx.fillText('DOMINO SUGARS',W*.79,y-64);ctx.shadowBlur=0;ctx.textAlign='left';
 }
}
function drawBuilding(b){
 const rb=roadBounds(b.y),x=b.side<0?rb.left-b.w-18:rb.right+18,base=b.y+95;
 ctx.save();ctx.translate(x,base-b.h);
 ctx.fillStyle=b.color;ctx.fillRect(0,0,b.w,b.h);
 ctx.fillStyle='#2f2424';ctx.fillRect(-4,-8,b.w+8,12);
 if(b.roof){ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(b.w*.5,-25);ctx.lineTo(b.w,0);ctx.fill()}
 for(let row=0;row<3;row++)for(let col=0;col<b.windows;col++){
  const wx=10+col*(b.w-20)/b.windows,wy=24+row*38;ctx.fillStyle=row===2&&Math.random()<.06?'#ffe89b':'#25313c';ctx.fillRect(wx,wy,Math.max(12,(b.w-30)/b.windows-5),23);
  ctx.strokeStyle='#c7b08c';ctx.lineWidth=2;ctx.strokeRect(wx,wy,Math.max(12,(b.w-30)/b.windows-5),23);
 }
 ctx.fillStyle='#d8cfbc';ctx.fillRect(b.w*.38,b.h-52,b.w*.24,52);
 ctx.fillStyle='#b9b1a2';for(let s=0;s<4;s++)ctx.fillRect(b.w*.22-s*4,b.h+s*7,b.w*.56+s*8,6);
 if(b.shop){ctx.fillStyle='#f0d39b';ctx.fillRect(4,b.h-72,b.w-8,35);ctx.fillStyle='#301c26';ctx.font='900 10px system-ui';ctx.textAlign='center';ctx.fillText(currentNeighborhood==='FELLS POINT'?'HARBOR CARRYOUT':'READ ST. MARKET',b.w/2,b.h-50)}
 if(b.sign){ctx.fillStyle='#fff';ctx.font='900 9px system-ui';ctx.textAlign='center';ctx.fillText('GO O’S',b.w/2,17)}
 ctx.restore();
}

function drawBaltimoreStreets(){
 const b0=roadBounds(0),b1=roadBounds(H);
 // Brick sidewalks.
 ctx.fillStyle='#8b554b';
 ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(b0.left,0);ctx.lineTo(b1.left,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
 ctx.beginPath();ctx.moveTo(b0.right,0);ctx.lineTo(W,0);ctx.lineTo(W,H);ctx.lineTo(b1.right,H);ctx.closePath();ctx.fill();

 // Brick seams, subtle and less cluttered.
 ctx.strokeStyle='rgba(245,203,188,.19)';ctx.lineWidth=1;
 for(let y=((worldY*.45)%34)-34;y<H+34;y+=34){
  const b=roadBounds(y);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(b.left,y);ctx.moveTo(b.right,y);ctx.lineTo(W,y);ctx.stroke();
 }
 for(let x=18;x<W;x+=42){
  ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();
 }

 // Rowhouses on both sides.
 const colors=['#8b3e35','#a44b3a','#71362f','#a95a42','#684038'];
 for(const side of[-1,1]){
  for(let i=0;i<5;i++){
   const y=((i*190+worldY*.7)%(H+250))-160;
   const w=72+((i*17+(side>0?11:3))%30);
   const h=122+((i*29+(side>0?19:7))%46);
   const rb=roadBounds(y);
   const x=side<0?rb.left-w-30:rb.right+30;
   ctx.fillStyle=colors[(i+(side>0?2:0))%colors.length];ctx.fillRect(x,y-h,w,h);
   ctx.fillStyle='#32242a';ctx.fillRect(x-3,y-h-7,w+6,9);
   for(let row=0;row<3;row++)for(let col=0;col<2;col++){
    const wx=x+12+col*(w*.48),wy=y-h+25+row*36;
    ctx.fillStyle='#243746';ctx.fillRect(wx,wy,15,21);
    ctx.strokeStyle='#c5b59b';ctx.strokeRect(wx,wy,15,21);
   }
   ctx.fillStyle='#d1c8b9';ctx.fillRect(x+w*.42,y-45,w*.18,45);
   for(let s=0;s<3;s++){ctx.fillRect(x+w*.24-s*3,y+s*7,w*.52+s*6,5)}
  }
 }

 // Trees, benches, hydrants, bins and parked cars — no repeated sign forest.
 for(let i=0;i<7;i++){
  const y=((i*145+worldY*.8)%(H+180))-80,b=roadBounds(y),side=i%2?-1:1;
  const offset=42+((i*13)%24);const x=side<0?b.left-offset:b.right+offset;
  if(i%4===0){
   ctx.fillStyle='#5b3d2a';ctx.fillRect(x-3,y-30,6,34);
   ctx.fillStyle='#315f39';ctx.beginPath();ctx.arc(x,y-37,18,0,7);ctx.fill();
  }else if(i%4===1){
   ctx.fillStyle='#52392c';ctx.fillRect(x-25,y-10,50,6);ctx.fillRect(x-20,y-4,5,15);ctx.fillRect(x+15,y-4,5,15);
  }else if(i%4===2){
   ctx.fillStyle='#c13f35';ctx.fillRect(x-7,y-18,14,25);ctx.beginPath();ctx.arc(x,y-18,8,0,7);ctx.fill();
  }else{
   ctx.fillStyle='#1f3c29';ctx.fillRect(x-13,y-19,26,34);ctx.fillStyle='#345a3d';ctx.fillRect(x-16,y-22,32,6);
  }
 }
 for(let i=0;i<4;i++){
  const y=((i*240+worldY*.9)%(H+300))-160,b=roadBounds(y),side=i%2?-1:1;
  const x=side<0?b.left-72:b.right+72;
  ctx.save();ctx.translate(x,y);
  ctx.fillStyle=['#3e6d89','#8c3f46','#394a3c','#b07b31'][i%4];
  ctx.beginPath();ctx.roundRect(-30,-44,60,88,9);ctx.fill();
  ctx.fillStyle='#1b2b34';ctx.fillRect(-20,-30,40,20);
  ctx.fillStyle='#171719';ctx.beginPath();ctx.arc(-20,33,6,0,7);ctx.arc(20,33,6,0,7);ctx.fill();
  ctx.restore();
 }

 // Only two occasional Baltimore street signs.
 if(Math.floor(elapsed)%20<5){
  const y=H*.19,b=roadBounds(y);
  for(const [x,label] of [[b.left-55,'CHARLES ST'],[b.right+55,'READ ST']]){
   ctx.strokeStyle='#282b2f';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,y+30);ctx.lineTo(x,y-30);ctx.stroke();
   ctx.fillStyle='#207c51';ctx.fillRect(x-36,y-34,72,20);
   ctx.fillStyle='#fff';ctx.font='900 9px system-ui';ctx.textAlign='center';ctx.fillText(label,x,y-20);
  }
 }
}

function drawStreet(){
 drawSky();drawLandmarks();buildings.sort((a,b)=>a.y-b.y).forEach(drawBuilding);
 const grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'#322f34');grad.addColorStop(1,'#48484b');
 ctx.beginPath();for(let y=-40;y<=H+40;y+=20){const b=roadBounds(y);if(y===-40)ctx.moveTo(b.left,y);else ctx.lineTo(b.left,y)}for(let y=H+40;y>=-40;y-=20){const b=roadBounds(y);ctx.lineTo(b.right,y)}ctx.closePath();ctx.fillStyle=grad;ctx.fill();
 // Baltimore brick sidewalks
 for(const side of[-1,1]){
  ctx.beginPath();for(let y=-40;y<=H+40;y+=20){const b=roadBounds(y),x=side<0?b.left:b.right;if(y===-40)ctx.moveTo(x,y);else ctx.lineTo(x,y)}
  for(let y=H+40;y>=-40;y-=20){const b=roadBounds(y),x=side<0?b.left-90:b.right+90;ctx.lineTo(x,y)}ctx.closePath();ctx.fillStyle='#8d5a4f';ctx.fill();
 }
 ctx.strokeStyle='rgba(247,207,188,.28)';ctx.lineWidth=1;
 for(let i=0;i<24;i++){const y=((i*48+worldY)%(H+96))-48,b=roadBounds(y);ctx.beginPath();ctx.moveTo(b.left-90,y);ctx.lineTo(b.left,y);ctx.moveTo(b.right,y);ctx.lineTo(b.right+90,y);ctx.stroke()}
 ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=2;for(let i=0;i<18;i++){const y=((i*95+worldY)%(H+190))-95,b=roadBounds(y);ctx.beginPath();ctx.moveTo(b.left,y);ctx.lineTo(b.right,y);ctx.stroke()}
 ctx.strokeStyle='#d8bd63';ctx.lineWidth=4;ctx.setLineDash([28,34]);ctx.beginPath();for(let y=-30;y<H+30;y+=15){const b=roadBounds(y),x=(b.left+b.right)/2;if(y===-30)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.stroke();ctx.setLineDash([]);
 drawBaltimoreStreets();
}
function drawDecor(d){
 const b=roadBounds(d.y),x=d.side<0?b.left-d.offset:b.right+d.offset;ctx.save();ctx.translate(x,d.y);ctx.scale(d.size,d.size);
 if(d.type==='trash'){ctx.fillStyle='#173522';ctx.fillRect(-18,-22,36,44);ctx.fillStyle='#294b33';ctx.fillRect(-22,-27,44,8)}
 else if(d.type==='hydrant'){ctx.fillStyle='#b93432';ctx.fillRect(-10,-18,20,38);ctx.fillRect(-18,-10,36,10);ctx.beginPath();ctx.arc(0,-19,12,Math.PI,0);ctx.fill()}
 else if(d.type==='stoop'){ctx.fillStyle='#d1c8ba';for(let i=0;i<4;i++)ctx.fillRect(-30-i*4,-20+i*8,60+i*8,7)}
 else if(d.type==='lamp'){ctx.strokeStyle='#141418';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(0,25);ctx.lineTo(0,-55);ctx.quadraticCurveTo(0,-78,20,-78);ctx.stroke();ctx.fillStyle='#ffe8a5';ctx.beginPath();ctx.arc(22,-78,8,0,7);ctx.fill()}
 else if(d.type==='mural'){ctx.fillStyle='#392b52';ctx.fillRect(-38,-50,76,58);ctx.fillStyle='#ff6c5c';ctx.font='900 15px system-ui';ctx.textAlign='center';ctx.fillText(d.variant%2?'BALTIMORE':'CHARM CITY',0,-18);ctx.strokeStyle='#57d3c2';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-32,-5);ctx.lineTo(30,-42);ctx.stroke()}
 else if(d.type==='busstop'){ctx.strokeStyle='#d6dce2';ctx.lineWidth=5;ctx.strokeRect(-28,-45,56,52);ctx.fillStyle='#287cc7';ctx.fillRect(-20,-36,40,18);ctx.fillStyle='#fff';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('MTA',0,-23)}
 else{ctx.strokeStyle='#28252d';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(0,25);ctx.lineTo(0,-45);ctx.stroke();ctx.fillStyle='#1778a8';ctx.fillRect(-38,-48,76,24);ctx.fillStyle='#fff';ctx.font='900 10px system-ui';ctx.textAlign='center';ctx.fillText(currentNeighborhood==='MOUNT VERNON'?'CHARLES ST':currentNeighborhood==='FELLS POINT'?'THAMES ST':'PRATT ST',0,-32)}
 ctx.restore();
}
function drawObstacle(o){ctx.save();ctx.translate(o.x,o.y);if(o.type==='cone'){ctx.fillStyle='#e77b27';ctx.beginPath();ctx.moveTo(0,-o.r);ctx.lineTo(o.r*.65,o.r);ctx.lineTo(-o.r*.65,o.r);ctx.closePath();ctx.fill();ctx.fillStyle='#eee';ctx.fillRect(-o.r*.45,0,o.r*.9,7)}else if(o.type==='pothole'){ctx.scale(1.5,.65);ctx.fillStyle='#171717';ctx.beginPath();ctx.arc(0,0,o.r,0,7);ctx.fill();ctx.strokeStyle='#777';ctx.lineWidth=3;ctx.stroke()}else{ctx.strokeStyle='#a9afb5';ctx.lineWidth=5;ctx.strokeRect(-o.r,-o.r*.6,o.r*2,o.r*1.2);ctx.beginPath();ctx.arc(-o.r*.65,o.r*.75,7,0,7);ctx.arc(o.r*.65,o.r*.75,7,0,7);ctx.stroke()}ctx.restore()}
function drawRat(r){ctx.save();ctx.translate(r.x,r.y);ctx.rotate(Math.atan2(r.vy,r.vx)+Math.PI/2);if(freezeTimer>0){ctx.shadowColor='#91e7ff';ctx.shadowBlur=14}ctx.strokeStyle='#b88f7a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,r.r*.8);ctx.quadraticCurveTo(r.tail,r.r*1.7,r.tail*1.3,r.r*2.2);ctx.stroke();ctx.fillStyle=freezeTimer>0?'#91ddeb':'#6e625c';ctx.beginPath();ctx.ellipse(0,0,r.r*.72,r.r,0,0,7);ctx.fill();ctx.fillStyle='#84766e';ctx.beginPath();ctx.arc(0,-r.r*.78,r.r*.48,0,7);ctx.fill();ctx.fillStyle='#d6a9a0';ctx.beginPath();ctx.arc(-r.r*.38,-r.r*.95,r.r*.2,0,7);ctx.arc(r.r*.38,-r.r*.95,r.r*.2,0,7);ctx.fill();ctx.fillStyle='#111';ctx.beginPath();ctx.arc(-r.r*.16,-r.r*.87,2.2,0,7);ctx.arc(r.r*.16,-r.r*.87,2.2,0,7);ctx.fill();if(freezeTimer>0){ctx.fillStyle='#d8f8ff';ctx.font='900 16px system-ui';ctx.fillText('❄',-6,-r.r-12)}ctx.restore()}
function drawTrap(t){ctx.save();ctx.translate(t.x,t.y);ctx.strokeStyle=t.armed>0?'#a79c80':'#f2c14e';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,t.r,0,7);ctx.stroke();ctx.beginPath();ctx.moveTo(-t.r,0);ctx.lineTo(t.r,0);ctx.moveTo(0,-t.r);ctx.lineTo(0,t.r);ctx.stroke();ctx.fillStyle='#e4c86d';ctx.beginPath();ctx.arc(0,0,7,0,7);ctx.fill();ctx.restore()}
function drawAdam(a){if(!adamImg.complete)return;ctx.save();ctx.translate(a.x,a.y+Math.sin(a.bob)*3);if(a.fromLeft)ctx.scale(-1,1);const pulse=1+Math.sin(a.age*8)*.035;ctx.scale(pulse,pulse);ctx.shadowColor='#b72cff';ctx.shadowBlur=coffeeTimer>0?28:18;ctx.drawImage(adamImg,-a.w/2,-a.h/2,a.w,a.h);ctx.shadowBlur=0;ctx.fillStyle=coffeeTimer>0?'#f4b5ff':'#b72cff';ctx.font='900 15px system-ui';ctx.textAlign='center';ctx.fillText(`CATCH ADAM! +${coffeeTimer>0?1000:500}`,0,-a.h/2-10);ctx.restore()}
function drawPowerup(p){const img=p.type==='cheese'?cheeseImg:coffeeImg;if(!img.complete)return;ctx.save();ctx.translate(p.x,p.y+Math.sin(p.age*5)*7);ctx.rotate(Math.sin(p.age*2)*.12+p.spin);const s=1+Math.sin(p.age*7)*.08;ctx.scale(s,s);ctx.shadowColor=p.type==='cheese'?'#ffe15a':'#c46cff';ctx.shadowBlur=28;ctx.drawImage(img,-47,-44,94,88);ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.font='1000 13px system-ui';ctx.textAlign='center';ctx.fillText(p.type==='cheese'?'FREEZE RATS':'DOUBLE SCORE',0,-54);ctx.restore()}


function drawDog(d){
 ctx.save();ctx.translate(d.x,d.y);ctx.scale(d.vx<0?-1:1,1);
 ctx.fillStyle='#6b4a31';ctx.beginPath();ctx.ellipse(0,0,19,11,0,0,7);ctx.fill();
 ctx.beginPath();ctx.arc(16,-5,8,0,7);ctx.fill();
 ctx.strokeStyle='#6b4a31';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-13,6);ctx.lineTo(-15,18);ctx.moveTo(9,6);ctx.lineTo(11,18);ctx.stroke();
 ctx.strokeStyle='#4a3022';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-18,-2);ctx.quadraticCurveTo(-28,-12,-31,-3);ctx.stroke();ctx.restore()
}
function drawPolice(){
 for(const p of policeUnits){
  ctx.save();ctx.translate(p.x,p.y);
  ctx.fillStyle='#274a79';ctx.fillRect(-17,-13,34,44);
  ctx.fillStyle='#d5a27f';ctx.beginPath();ctx.arc(0,-26,15,0,7);ctx.fill();
  ctx.fillStyle='#1b2c48';ctx.fillRect(-16,-43,32,10);
  ctx.fillStyle='#ffe36e';ctx.beginPath();ctx.arc(0,3,5,0,7);ctx.fill();
  ctx.fillStyle='#8fd0ff';ctx.font='900 12px system-ui';ctx.textAlign='center';ctx.fillText(`POLICE ${p.hp}/8`,0,-52);
  ctx.restore()
 }
}
function drawGators(){
 for(const g of gators){
  ctx.save();ctx.translate(g.x,g.y);
  ctx.fillStyle='#477347';ctx.beginPath();ctx.ellipse(0,0,48,24,0,0,7);ctx.fill();
  ctx.beginPath();ctx.moveTo(-42,0);ctx.lineTo(-76,-14);ctx.lineTo(-66,8);ctx.fill();
  ctx.fillStyle='#5f925c';ctx.beginPath();ctx.arc(36,-4,24,0,7);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(44,-10,4,0,7);ctx.fill();ctx.fillStyle='#111';ctx.beginPath();ctx.arc(45,-10,2,0,7);ctx.fill();
  ctx.fillStyle='#b9ff93';ctx.font='900 13px system-ui';ctx.textAlign='center';ctx.fillText(`SEWER GATOR ${g.hp}/6`,0,-35);
  ctx.restore()
 }
}
function drawGatorAids(){
 for(const a of gatorAids){
  ctx.save();ctx.translate(a.x,a.y+Math.sin(a.age*6)*6);ctx.rotate(Math.sin(a.age*4)*.12);
  ctx.shadowColor='#8cff7d';ctx.shadowBlur=22;
  ctx.fillStyle='#d9f57a';ctx.beginPath();ctx.roundRect(-20,-36,40,72,12);ctx.fill();
  ctx.fillStyle='#2e6634';ctx.fillRect(-15,-15,30,29);
  ctx.fillStyle='#fff';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('GATOR',0,-1);ctx.fillText('AID',0,12);
  ctx.fillStyle='#e8ecef';ctx.fillRect(-10,-43,20,10);ctx.shadowBlur=0;ctx.restore()
 }
}

function drawVehicle(v){
 ctx.save();ctx.translate(v.x,v.y);
 if(v.type==='bus'){
  ctx.fillStyle='#d6d9dd';ctx.fillRect(-v.w/2,-v.h/2,v.w,v.h);
  ctx.fillStyle='#2c6fa3';ctx.fillRect(-v.w/2,-v.h*.18,v.w,v.h*.27);
  ctx.fillStyle='#182936';ctx.fillRect(-v.w*.35,-v.h*.4,v.w*.7,v.h*.2);
  ctx.fillStyle='#fff';ctx.font='900 11px system-ui';ctx.textAlign='center';ctx.fillText('MTA',0,4);
  ctx.fillStyle='#f0c73d';ctx.fillRect(-v.w*.33,v.h*.31,v.w*.66,8);
 }else{
  ctx.fillStyle=v.color;ctx.beginPath();ctx.roundRect(-v.w/2,-v.h/2,v.w,v.h,12);ctx.fill();
  ctx.fillStyle='#22313b';ctx.fillRect(-v.w*.32,-v.h*.29,v.w*.64,v.h*.25);
  if(v.type==='taxi'){ctx.fillStyle='#171717';ctx.font='900 10px system-ui';ctx.textAlign='center';ctx.fillText('TAXI',0,4)}
 }
 ctx.fillStyle='#f8e596';ctx.fillRect(-v.w*.35,v.h*.36,12,7);ctx.fillRect(v.w*.35-12,v.h*.36,12,7);
 ctx.restore();
}
function drawPedestrian(p){
 ctx.save();ctx.translate(p.x,p.y);const step=Math.sin(p.phase)*7;
 ctx.strokeStyle='#2a2228';ctx.lineWidth=5;ctx.lineCap='round';
 ctx.beginPath();ctx.moveTo(0,2);ctx.lineTo(-7+step,27);ctx.moveTo(0,2);ctx.lineTo(7-step,27);ctx.stroke();
 ctx.fillStyle=p.shirt;ctx.beginPath();ctx.roundRect(-10,-26,20,30,7);ctx.fill();
 ctx.strokeStyle=p.shirt;ctx.beginPath();ctx.moveTo(-8,-18);ctx.lineTo(-17-step*.35,0);ctx.moveTo(8,-18);ctx.lineTo(17+step*.35,0);ctx.stroke();
 ctx.fillStyle='#b98367';ctx.beginPath();ctx.arc(0,-35,9,0,7);ctx.fill();ctx.restore();
}
function drawPigeon(p){
 ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.flying?Math.atan2(p.vy,p.vx):0);
 ctx.fillStyle='#7d858d';ctx.beginPath();ctx.ellipse(0,0,12,8,0,0,7);ctx.fill();
 ctx.fillStyle='#55626a';ctx.beginPath();ctx.arc(8,-3,5,0,7);ctx.fill();
 ctx.fillStyle='#bfc6cb';ctx.beginPath();ctx.moveTo(-2,0);ctx.lineTo(-17,-6-Math.sin(p.phase)*6);ctx.lineTo(-7,6);ctx.fill();
 ctx.fillStyle='#dd9259';ctx.beginPath();ctx.arc(12,-3,2,0,7);ctx.fill();ctx.restore();
}

function draw(){
 setSystem('drawing');ctx.save();
 if(screenShake>0)ctx.translate(rand(-screenShake,screenShake),rand(-screenShake,screenShake));
 drawStreet();
 decorations.filter(Boolean).sort((a,b)=>a.y-b.y).forEach(drawDecor);
 obstacles.filter(Boolean).forEach(drawObstacle);traps.filter(Boolean).forEach(drawTrap);
 rats.filter(Boolean).forEach(drawRat);powerups.filter(Boolean).forEach(drawPowerup);adams.filter(Boolean).forEach(drawAdam);
 for(const p of particles){ctx.globalAlpha=clamp(p.life*2,0,1);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size)}ctx.globalAlpha=1;
 const vignette=ctx.createRadialGradient(W/2,H/2,Math.min(W,H)*.25,W/2,H/2,Math.max(W,H)*.75);vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(8,4,16,.28)');ctx.fillStyle=vignette;ctx.fillRect(0,0,W,H);
 ctx.restore();drawFloaters();
}

function loop(now){
 if(!running)return;
 const dt=Math.min(.033,Math.max(.001,(now-last)/1000));last=now;
 try{update(dt);if(running)draw()}
 catch(error){recoverFrame(error)}
 if(running)requestAnimationFrame(loop)
}

const installBtn=document.getElementById('installBtn');let deferredInstallPrompt=null;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;installBtn.style.display='block'});
installBtn.addEventListener('click',async()=>{if(deferredInstallPrompt){deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;installBtn.style.display='none';return}alert(/iphone|ipad|ipod/i.test(navigator.userAgent)?'On iPhone: tap Share, then Add to Home Screen.':'Open your browser menu and choose Install app or Add to Home screen.')});
addEventListener('appinstalled',()=>installBtn.style.display='none');
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;if(/iphone|ipad|ipod/i.test(navigator.userAgent)&&!standalone){installBtn.style.display='block';installBtn.textContent='ADD TO iPHONE'}
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(console.error));
(async()=>{
 try{await loadLeaderboard()}
 catch(error){console.error('Startup leaderboard error:',error)}
 try{drawStreet()}catch(error){console.error('Startup draw error:',error)}
 showOpening()
})();
})();
</script>
</body>
</html>