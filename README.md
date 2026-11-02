# AP2 Trainer – Fachinformatiker/-in Anwendungsentwicklung

Lokale Lern-Web-App zur Vorbereitung auf die **Abschlussprüfung Teil 2 (AP2)**.
Aufgaben nach **Prüfungsbereich → Thema** auswählen und üben, mit sofortiger Auswertung,
Prüfungssimulation mit Timer und IHK-Notenschlüssel sowie Lernstatistik.

> Alle Aufgaben sind selbst erstellte Übungsaufgaben im Stil der AP2 – keine Original-IHK-Prüfungsaufgaben.
> WiSo-Inhalte (Fristen, Grenzen) bitte mit dem aktuellen Rechtsstand abgleichen.

## Starten

**Variante 1 – einfach öffnen:** `index.html` per Doppelklick im Browser öffnen. Funktioniert ohne Installation.

**Variante 2 – lokaler Server (empfohlen, ermöglicht Installation als App/Offline-Modus):**

- Windows: `start.bat` doppelklicken (benötigt Python)
- macOS/Linux: `./start.sh`
- oder manuell: `python -m http.server 8080` → <http://localhost:8080>

### Als Desktop-App installieren (PWA)

Mit Variante 2 in **Chrome/Edge** öffnen → in der Adressleiste auf das Symbol **„App installieren“** klicken.
Die App erscheint dann im Startmenü/auf dem Desktop, läuft in einem eigenen Fenster und funktioniert offline.

## Funktionen

- **3 Prüfungsbereiche, 21 Themen, 168 Aufgaben**
  - GA1 Planen eines Softwareproduktes · GA2 Entwicklung und Umsetzung von Algorithmen · WiSo
- **Aufgabentypen:** Single Choice, Multiple Choice, Eingabe (Zahl/Text), Reihenfolge, Freitext mit Musterlösung und Selbstbewertung (z. B. SQL, Pseudocode, UML)
- **Übungsmodus:** sofortiges Feedback mit Erklärung
- **Prüfungssimulation:** zufällige Aufgaben, Timer, Auswertung erst am Ende, Note nach IHK-Schlüssel
- **Fehler wiederholen**, **Zufallsmix**, **nur neue Aufgaben**, Filter „nur offene & falsche“
- **Statistik** pro Thema mit Markierung von Schwachstellen, Verlauf der Prüfungssimulationen
- **Eigene Aufgaben importieren** (JSON) – Format: [`docs/aufgabenformat.md`](docs/aufgabenformat.md)
- **Fortschritt exportieren/importieren** (z. B. für einen anderen Rechner)
- Hell/Dunkel-Modus, Tastaturbedienung (1–9, Enter, ←/→), mobiltauglich

## Eigene IHK-Prüfungen (nur lokal)

Original-Prüfungen (Aufgaben, Lösungen, Seitenbilder) können im Ordner `data/ihk/` abgelegt werden:

```
data/ihk/ihk-aufgaben.js   Liste der Termine + Lader
data/ihk/S2023.js …        Aufgaben je Prüfungstermin (Felder wie im Aufgabenformat, zusätzlich
                           exam, source, context, pages, solPages, tcat)
data/ihk/img/…             Seitenbilder der Aufgaben und Lösungshinweise
```

Die App zeigt diese Aufgaben automatisch auf der Startseite unter **„IHK-Prüfungen nach Termin“**, ordnet sie den Themen zu
und bietet einen Quellen-Filter (alle / nur Übungsaufgaben / nur IHK).

> ⚠️ IHK-/ZPA-Prüfungen und Lösungen sind urheberrechtlich geschützt. `data/ihk/` und `_pruefungen/` sind daher per
> `.gitignore` vom Repository ausgeschlossen – nur für den persönlichen Gebrauch.

## Projektstruktur

```
index.html             Einstieg
css/style.css          Gestaltung (hell/dunkel)
js/app.js              App-Logik (Routing, Übung, Prüfung, Statistik, Import)
js/markdown.js         Kleiner Markdown-Renderer für Aufgabentexte
data/categories.js     Prüfungsbereiche und Themen
data/tasks-*.js        Aufgaben (GA1, GA2, WiSo)
docs/aufgabenformat.md JSON-Format für eigene Aufgaben
manifest.webmanifest, sw.js, icons/   PWA (Installation, Offline)
```

Neue eingebaute Aufgaben: einfach in `data/tasks-*.js` ergänzen (gleiches Format wie beim Import).

---

## Кратко по-русски

Локальный тренажёр для подготовки к **AP2 (Fachinformatiker Anwendungsentwicklung)**.

- **Запуск:** открыть `index.html` двойным щелчком или запустить `start.bat` (Windows) / `start.sh` и открыть <http://localhost:8080>.
- **Установка как программа:** при запуске через `start.bat` в Chrome/Edge нажать в адресной строке «Установить приложение» — появится отдельное окно и ярлык, работает офлайн.
- **Выбор:** раздел (GA1 / GA2 / WiSo) → тема → задания. Режимы: тренировка с объяснениями, симуляция экзамена с таймером и оценкой по шкале IHK, повтор ошибок.
- **Свои задания:** раздел «Daten» → импорт JSON (формат в `docs/aufgabenformat.md`; там же шаблон запроса, чтобы Claude в чате проекта генерировал задания в нужном формате).
- Прогресс хранится только в браузере — его можно экспортировать в файл.
- **Экзамены IHK прошлых лет** лежат только локально в `data/ihk/` (не попадают на GitHub из-за авторских прав) — храни архив с ними у себя.
