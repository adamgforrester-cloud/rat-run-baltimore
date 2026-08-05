
import { RatRunGame } from "./game.js";
import { getTopScores, submitScore } from "./leaderboard.js";

const canvas = document.getElementById("game");
const overlay = document.getElementById("overlay");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const comboEl = document.getElementById("combo");
const countdownEl = document.getElementById("countdown");
const announcementEl = document.getElementById("announcement");
const headlineEl = document.getElementById("headline");
const statusEl = document.getElementById("onlineStatus");
const listEl = document.getElementById("leaderboard");
const resultEl = document.getElementById("resultText");
const nameEl = document.getElementById("playerName");
const startButton = document.getElementById("startButton");
const refreshButton = document.getElementById("refreshButton");

let online = false;

function sessionId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function renderScores(scores) {
  listEl.innerHTML = "";
  const rows = scores.length ? scores : [{name:"NO SCORES YET",score:0}];
  rows.slice(0,10).forEach(row => {
    const li=document.createElement("li");
    li.textContent=row.name;
    const span=document.createElement("span");
    span.textContent=Number(row.score).toLocaleString();
    li.appendChild(span);
    listEl.appendChild(li);
  });
}

async function refreshLeaderboard() {
  statusEl.className="status checking";
  statusEl.textContent="Checking global leaderboard…";
  try {
    const scores=await getTopScores(10);
    online=true;
    statusEl.className="status online";
    statusEl.textContent="● GLOBAL LEADERBOARD ONLINE";
    renderScores(scores);
    return scores;
  } catch (error) {
    console.error(error);
    online=false;
    statusEl.className="status offline";
    statusEl.textContent="● GLOBAL BOARD OFFLINE — GAME STILL PLAYABLE";
    renderScores([]);
    return [];
  }
}


const HEADLINES = [
  "CITY DECLARES RAT EMERGENCY",
  "MAYOR DENIES RAT PROBLEM",
  "RODENT POPULATION UP 327%",
  "CHEESE TRUCK OVERTURNED DOWNTOWN",
  "CHARLES STREET OVERRUN",
  "HEALTH DEPARTMENT: PLEASE STOP FEEDING THEM"
];

function showHeadline() {
  headlineEl.textContent = `📰 ${HEADLINES[Math.floor(Math.random()*HEADLINES.length)]}`;
  headlineEl.classList.remove("show");
  void headlineEl.offsetWidth;
  headlineEl.classList.add("show");
}

function announce(text) {
  announcementEl.textContent=text;
  announcementEl.classList.remove("show");
  void announcementEl.offsetWidth;
  announcementEl.classList.add("show");
}

const game = new RatRunGame(canvas, {
  onScore(score,combo) {
    scoreEl.textContent=score.toLocaleString();
    comboEl.textContent=`${combo}×`;
  },
  onTime(time) {
    timeEl.textContent=time;
  },
  onCountdown(number) {
    countdownEl.textContent=number;
    countdownEl.classList.remove("show");
    void countdownEl.offsetWidth;
    countdownEl.classList.add("show");
  },
  onAnnouncement: announce,
  async onFinish(score) {
    overlay.classList.add("show");
    resultEl.textContent=`FINAL SCORE: ${score.toLocaleString()} — uploading…`;
    try {
      await submitScore(nameEl.value,score,sessionId());
      resultEl.textContent=`FINAL SCORE: ${score.toLocaleString()} — GLOBAL SCORE CONFIRMED`;
      await refreshLeaderboard();
    } catch (error) {
      console.error(error);
      resultEl.textContent=`FINAL SCORE: ${score.toLocaleString()} — upload failed; try Refresh Scores`;
      statusEl.className="status offline";
      statusEl.textContent="● SCORE UPLOAD FAILED";
    }
  }
});

startButton.addEventListener("click", () => {
  resultEl.textContent="";
  overlay.classList.remove("show");
  showHeadline();
  setTimeout(() => game.start(), 620);
});

refreshButton.addEventListener("click", refreshLeaderboard);

refreshLeaderboard();
if ("serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(console.warn));
}
