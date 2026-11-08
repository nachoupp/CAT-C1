// Parla C1 · Supabase Edge Function "ia" (per a Lovable / Supabase)
// Secrets: supabase secrets set GEMINI_API_KEY=...   (o ANTHROPIC_API_KEY=...)
// @ts-ignore: fitxer JS compartit amb Vercel
import { askModel } from "./_model.js";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (req.method !== "POST") return new Response("POST only", { status: 405, headers: cors });
  try {
    const body = await req.json();
    const text = await askModel(body, Deno.env.toObject());
    return new Response(JSON.stringify({ text }), { headers: { ...cors, "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String((e as Error).message || e) }), {
      status: (e as { status?: number }).status || 500, headers: { ...cors, "content-type": "application/json" }
    });
  }
});
