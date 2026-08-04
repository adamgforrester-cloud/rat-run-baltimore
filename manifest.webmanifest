const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
};

const cleanName = value =>
  String(value || "PLAYER").replace(/[^A-Z0-9 _-]/gi, "").trim().slice(0, 12).toUpperCase() || "PLAYER";

async function supabase(path, options = {}) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/${path}`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return fetch(url, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: options.method === "POST" ? "return=minimal" : undefined,
      ...(options.headers || {})
    }
  });
}

async function listScores() {
  const r = await supabase("rat_run_scores?select=name,score,created_at&order=score.desc&limit=25");
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export default async request => {
  if (request.method === "OPTIONS") return new Response("", { status: 204, headers });
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Leaderboard environment variables are not configured." }), { status: 503, headers });
    }
    if (request.method === "GET") {
      return new Response(JSON.stringify({ scores: await listScores() }), { status: 200, headers });
    }
    if (request.method === "POST") {
      const body = await request.json();
      const score = Math.floor(Number(body.score));
      const name = cleanName(body.name);
      const sessionId = String(body.sessionId || "").slice(0, 80);
      if (!Number.isFinite(score) || score < 0 || score > 100000 || !sessionId) {
        return new Response(JSON.stringify({ error: "Invalid score submission." }), { status: 400, headers });
      }
      const insert = await supabase("rat_run_scores", {
        method: "POST",
        body: JSON.stringify({ name, score, session_id: sessionId })
      });
      if (!insert.ok) {
        const text = await insert.text();
        if (!text.includes("duplicate")) throw new Error(text);
      }
      return new Response(JSON.stringify({ scores: await listScores() }), { status: 200, headers });
    }
    return new Response(JSON.stringify({ error: "Method not allowed." }), { status: 405, headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
};
