# Prompt per a Lovable

Construeix una app web mòbil anomenada **Parla C1**, estil iOS net i sobri (system font, fons agrupat, targetes blanques, barra de pestanyes inferior, mode fosc automàtic), tota en català, per preparar el certificat C1 de català del Govern de les Illes Balears. Pren com a referència de contingut i comportament el codi del repositori nachoupp/CAT-C1 (src/content i src/features).

Pestanyes: **Avui** (compte enrere 6/3/2027 i 2/10/2027, avís d'inscripció, sessió diària de 25 min segons el dia, píndola, connector i frase feta del dia, progrés), **Aprèn** (18 píndoles + cercador: sinònims i conjugador de Softcatalà, castellà→català amb IA), **Practica** (test Àrea 2 amb repetició d'errors, preguntes noves amb IA, jocs de frases fetes i barbarismes, targetes de connectors, àudios oficials GOIB), **Escriu** (consignes Àrea 3, comptador de paraules, rellotge, corrector LanguageTool, correcció amb rúbrica GOIB per IA, foto de redacció manuscrita), **Parla** (bot de conversa amb 4 situacions, micròfon, veu, avaluació final).

Backend: login simple amb Supabase perquè el progrés se sincronitzi entre dispositius; una edge function `ia` que rep `{messages, json, image}` i retorna `{text}` fent servir la IA integrada de Lovable. Mantén LanguageTool cridat des del client amb l'enllaç visible a languagetool.org.
