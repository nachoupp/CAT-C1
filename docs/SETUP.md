# Configuració: Vercel + Supabase + IA + veu

Temps total: uns 20 minuts. Cap pas és obligatori: l'app funciona sense res configurat, i cada servei afegeix una funció.

## 1. Comptes i progrés al núvol (Supabase, gratuït)
1. Crea un projecte a https://supabase.com (regió: Europa).
2. **SQL Editor → New query**: enganxa el contingut de `supabase/migrations/001_progress.sql` i executa'l.
3. **Authentication → URL Configuration**:
   - Site URL: `https://<el-teu-projecte>.vercel.app`
   - Redirect URLs: `https://<el-teu-projecte>.vercel.app/**` i, per provar en local, `http://localhost:5173/**`
4. **Authentication → Emails**: pots traduir les plantilles al català (confirmació i recuperació de contrasenya).
5. **Project Settings → API**: copia `Project URL` i la clau `anon public`.
6. A Vercel (**Settings → Environment Variables**) afegeix:
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = anon public
   - `SUPABASE_URL` i `SUPABASE_ANON_KEY` (els mateixos valors): així la IA i la veu només funcionen per a usuaris amb sessió i ningú et gasta la clau.

> El servei de correu integrat de Supabase té un límit baix d'enviaments per hora. Per a ús real, connecta un SMTP propi (Authentication → SMTP), per exemple Resend o Brevo.

## 2. Profe IA (correcció, preguntes noves, conversa)
Posa'n **una**:
- `GEMINI_API_KEY` (Google AI Studio → Get API key). Té pla gratuït, però en el pla gratuït Google pot fer servir el contingut per millorar els seus productes; amb la facturació activada no. Opcional: `GEMINI_MODEL=gemini-3.8-flash` (si no en poses cap, fa servir el model estable més recent).
- `ANTHROPIC_API_KEY` (console.anthropic.com). De pagament per ús. Opcional: `ANTHROPIC_MODEL`.

## 3. Veu natural en català
Pots posar-ne una o diverses; l'ordre de preferència és Aina → Azure → ElevenLabs, i si la primera falla s'usa la següent.

- **Projecte Aina (gratuït, accent balear)**: el model Matxa del BSC té veus balears (Olga, Quim), centrals (Èlia, Grau), nord-occidentals i valencianes. Llicència: ús no comercial i de recerca, que és el cas d'un estudi personal. No es pot executar dins Vercel (és un contenidor de 3,5 GB), així que cal un servidor:
  1. A https://huggingface.co → New Space → SDK **Docker** → *Blank*, maquinari *CPU basic* (gratuït). Pot ser privat.
  2. Puja-hi els dos fitxers de `deploy/aina-tts/` (`Dockerfile` i `README.md`). Espera que l'estat passi a *Running* (la primera vegada uns minuts).
  3. A Vercel: `AINA_TTS_URL` = `https://<usuari>-<nom-space>.hf.space`. Si el Space és privat, afegeix `AINA_TTS_TOKEN` amb un token de lectura de Hugging Face (Settings → Access Tokens).
  4. Els Spaces gratuïts s'adormen després d'uns dies sense ús: el primer àudio després de dormir pot trigar a arribar (o sonar la veu de reserva). També el pots executar al teu ordinador: `docker run -p 8000:8000 projecteaina/tts-api:latest`.
- **Azure Speech (recomanat)**: portal.azure.com → crea un recurs *Speech* (pla gratuït F0 disponible) → copia una clau i la regió.
  - `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` (p. ex. `westeurope`)
  - Veus: Joana, Enric i Alba (ca-ES, neuronals). Es trien a Perfil → Veu.
- **ElevenLabs** (pla gratuït sense targeta): `ELEVENLABS_API_KEY` (+ opcional `ELEVENLABS_VOICE_ID`). Fa servir `eleven_v4` (o `eleven_v3` de reserva), els models que admeten català.
  - Quan creïs la clau, restringeix-la a: **Text to Speech** (Access) i **Speech to Text** (Access). La resta, *No access*.
  - La mateixa clau activa la **correcció oral** ("Grava't i et corregeixo"): `/api/stt` transcriu amb Scribe v2 en català.

## 4. Desplega
Vercel → Deployments → **Redeploy**. Comprova a Perfil que pots crear un compte, que la veu sona i que la correcció amb IA respon.
