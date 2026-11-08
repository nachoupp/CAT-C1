# Arquitectura

```
src/
  content/        Contingut del curs en JSON tipat (banc Àrea 2, píndoles, consignes, exàmens, fites…)
  lib/            Lògica pura i testejada
    srs.ts          repetició espaiada (Leitner, 6 caixes: 0,1,2,4,8,16 dies)
    plan.ts         pla diari adaptatiu de 25 min
    readiness.ts    estimació de nota per àrea (simulacres compten doble)
    store.ts        estat global (useSyncExternalStore + localStorage, codi d'exportació)
    ai.ts           client de /api/ia (+ parseig tolerant de JSON)
    languagetool.ts corrector + aplicació de correccions
    speech.ts       síntesi i reconeixement de veu en català
    ics.ts, dates.ts, text.ts, router.ts, toast.ts
  components/ui.tsx  Sistema de components (estil iOS, mode fosc automàtic)
  features/       Una carpeta per pantalla: today, learn, practice, write, speak, calendar
api/              Funció serverless de Vercel: proxy a Gemini o Claude, límit per IP, origen permès
supabase/functions/ia   La mateixa funció per a Supabase / Lovable
public/           PWA: manifest, service worker (offline de tot excepte IA i corrector), icona
```

## Decisions
- **Sense backend obligatori.** Tot funciona offline i sense comptes; la IA és una capa opcional.
- **La clau d'IA mai al client.** El navegador parla amb `/api/ia`; la funció tria proveïdor segons la variable d'entorn.
- **Proveïdor intercanviable.** `api/_model.js` normalitza el format (`{messages, json, image}` → `{text}`) per a Gemini i Claude.
- **Contingut separat del codi.** Afegir preguntes o píndoles és editar JSON; els tests validen l'estructura.
- **Router per hash.** Funciona a qualsevol hosting estàtic sense configuració.
- **Respostes d'IA validades.** `normalize()` limita notes i descarta camps mal formats abans de mostrar-los.

## Qualitat
GitHub Actions executa a cada push: `typecheck` (TS estricte), `test` (Vitest) i `build`.
