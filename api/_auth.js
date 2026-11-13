// Si el projecte té Supabase configurat al servidor, només els usuaris amb sessió poden gastar IA i veu.
export async function requireUser(req, env) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || env.AI_PUBLIC === "1") return { ok: true };
  const auth = req.headers.authorization || req.headers.Authorization || "";
  if (!auth.startsWith("Bearer ")) return { ok: false };
  const r = await fetch(`${url}/auth/v1/user`, { headers: { Authorization: auth, apikey: key } });
  return { ok: r.ok };
}
