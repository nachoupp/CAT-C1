---
title: Parla C1 veu
emoji: 🗣️
colorFrom: indigo
colorTo: pink
sdk: docker
app_port: 8000
pinned: false
---

Servidor de síntesi de veu en català (Projecte Aina, model Matxa) per a l'app Parla C1.
Endpoint: `POST /api/tts` amb `{"voice":"olga","type":"text","text":"Bon dia!","language":"ca-ba"}` → WAV.
