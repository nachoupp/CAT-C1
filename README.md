# Parla C1

Entrenador expert per aprovar el **certificat C1 de català** del Govern de les Illes Balears (GOIB),
pensat per a una persona amb nivell real B1-B2 i poc temps: 25 minuts al dia, amb l'examen com a guia.

## Mètode
Cada setmana, una unitat de 5 sessions de 25 minuts: **descobreix** (test previ, píndola, text model anotat) →
**practica** (20 exercicis) → **escriu guiat** (esquelet) → **parla** (lectura amb model i exposició 4/3/2) →
**examen de la unitat** (text tipus GOIB, correcció focalitzada i reescriptura). Els errors van al quadern i tornen
en el repàs espaiat. Cada 3 unitats hi ha un control.

## Què fa
| Àrea de l'examen | A l'app |
|---|---|
| 1 · Comprensió oral i lectora | Els 13 exàmens oficials (2020-2026) amb PDF i àudios; 2025-26 reservats per a simulacres |
| 2 · Domini del sistema lingüístic | Repàs espaiat (Leitner), simulacre cronometrat de 15/30 preguntes, preguntes noves amb IA, jocs |
| 3 · Expressió escrita | 6 consignes tipus examen, comptador i rellotge, corrector LanguageTool, correcció amb la rúbrica GOIB per IA, foto de redacció manuscrita |
| 4 · Expressió oral | Bot de conversa (4 situacions) amb dictat i veu, avaluació sobre 30; lectura i exposició amb rellotge |

A més: pla diari adaptatiu (reforça l'àrea més feble i prioritza simulacres a 3 setmanes de l'examen),
estimació de nota per àrea, 18 píndoles de teoria, diccionari castellà → català, calendari exportable a `.ics`,
còpia del progrés entre dispositius i instal·lació com a app al mòbil (PWA).

## Tecnologia
React 19 · TypeScript estricte · Vite 6 · Tailwind CSS 4 · Vitest · funcions serverless de Vercel · GitHub Actions.
Detalls a [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Pla de futur a [`docs/ROADMAP.md`](docs/ROADMAP.md).

## Desenvolupament
```bash
npm install
npm run dev        # http://localhost:5173
npm test           # tests de la lògica d'aprenentatge
npm run build      # typecheck + build de producció a dist/
```
Per provar la IA en local: `npx vercel dev` amb una clau a `.env` (vegeu `.env.example`).

## Configuració completa
Guia pas a pas (Supabase, IA i veu): [`docs/SETUP.md`](docs/SETUP.md).

## Publicar a Vercel
1. Vercel → **Add New → Project** → importa `nachoupp/CAT-C1` (Vercel detecta Vite).
2. **Settings → Environment Variables**, afegeix-ne UNA:
   - `GEMINI_API_KEY` (Google AI Studio). Té pla gratuït, però **en el pla gratuït Google pot fer servir els textos per millorar els seus productes**. Amb facturació activada no, i el cost és molt baix.
   - `ANTHROPIC_API_KEY` (Claude API). De pagament; molt bona corregint català.
3. Recomanat: `ALLOWED_ORIGIN=https://<el-teu-domini>.vercel.app`.
4. **Redeploy**. Sense clau, l'app funciona igual i els botons d'IA mostren un avís.

La clau només viu al servidor (`api/ia.js`); el navegador mai no la veu.

## Lovable
Lovable no es connecta a un repositori existent (en crea un de nou). Per portar-hi el projecte, importa'l com a ZIP
o crea'n un de nou amb el prompt de [`LOVABLE.md`](LOVABLE.md). La funció d'IA també existeix per a Supabase a `supabase/functions/ia`.

## Serveis externs
- **LanguageTool** (`api.languagetool.org`): gratuït, màx. 20 peticions/min i 20 KB per text, sense garanties. L'app hi enllaça i avisa que el text s'hi envia.
- **Softcatalà**: sinònims i conjugador (enllaços).
- **GOIB**: exàmens i àudios oficials (enllaços al web del Govern).

Les notes que dona la IA són orientatives; la nota oficial la decideix el tribunal.
