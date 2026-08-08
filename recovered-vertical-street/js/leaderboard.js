
const SUPABASE_URL = "https://vaavrtkobsfqcessccfh.supabase.co";
const SUPABASE_KEY = "sb_publishable_NizQeRBjoMpbgMTb5aM9NQ_UN8nZp0f";
const TABLE = "rat_run_scores";
// Season 2 begins with the layered-parallax public feedback build. Older
// scores remain archived in Supabase and can be restored or displayed later.
const SEASON_START = "2026-08-08T00:49:38Z";

function cleanName(value) {
  return String(value || "PLAYER")
    .replace(/[^a-z0-9 _-]/gi, "")
    .trim()
    .slice(0, 12)
    .toUpperCase() || "PLAYER";
}

function headers(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    ...extra
  };
}

export async function getTopScores(limit = 10) {
  const query = new URLSearchParams({
    select: "player_name,score,created_at",
    created_at: `gte.${SEASON_START}`,
    order: "score.desc",
    limit: String(limit)
  });
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?${query}`, {
    headers: headers({ Accept: "application/json" })
  });
  if (!response.ok) throw new Error(`Leaderboard read failed (${response.status})`);
  return (await response.json()).map(row => ({
    name: cleanName(row.player_name),
    score: Number(row.score) || 0,
    date: row.created_at
  }));
}

export async function submitScore(playerName, score, sessionId) {
  const payload = {
    player_name: cleanName(playerName),
    score: Math.max(0, Math.floor(score)),
    session_id: sessionId
  };
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: headers({
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    }),
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Score upload failed (${response.status}): ${await response.text()}`);
}
