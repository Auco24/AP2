#!/usr/bin/env sh
# Startet den AP2 Trainer lokal unter http://localhost:8080
cd "$(dirname "$0")"
( sleep 1; (xdg-open http://localhost:8080 || open http://localhost:8080) >/dev/null 2>&1 ) &
python3 -m http.server 8080
