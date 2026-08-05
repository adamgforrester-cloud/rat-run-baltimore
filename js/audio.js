
let ctx = null;
function audioContext() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}
export function tone(freq, duration=.08, type="square", volume=.045, delay=0) {
  try {
    const a = audioContext();
    const osc = a.createOscillator();
    const gain = a.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, a.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(volume, a.currentTime + delay + .01);
    gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + delay + duration);
    osc.connect(gain).connect(a.destination);
    osc.start(a.currentTime + delay);
    osc.stop(a.currentTime + delay + duration + .02);
  } catch (_) {}
}
export function ratHitSound(combo=0) {
  tone(430 + Math.min(combo,12)*22, .055, "triangle", .055);
  tone(760 + Math.min(combo,12)*16, .04, "square", .025, .035);
}
export function countdownSound(n) {
  tone(n <= 3 ? 165 : 250, .11, "square", .06);
}
export function startSound() {
  tone(330,.08,"triangle",.05);
  tone(490,.08,"triangle",.05,.08);
  tone(720,.14,"triangle",.05,.16);
}
