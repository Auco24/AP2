# Aufgabenformat (JSON)

Eigene Aufgaben werden als **JSON-Liste** importiert (Seite **Daten → Eigene Aufgaben importieren**).
Dieselben Felder gelten für die eingebauten Aufgaben in `data/*.js`.

## Gemeinsame Felder

| Feld | Pflicht | Beschreibung |
|---|---|---|
| `id` | ✔ | Eindeutige ID, z. B. `"eigen-sql-01"` (nicht mit `ga1-`, `ga2-`, `wiso-` beginnen, um Kollisionen zu vermeiden) |
| `cat` | ✔ | Prüfungsbereich: `ga1`, `ga2` oder `wiso` |
| `topic` | ✔ | Thema, z. B. `sql`, `uml` (Liste unten). Unbekannte Themen erscheinen als „(importiert)“ |
| `type` | ✔ | `single`, `multi`, `input`, `order` oder `free` |
| `q` | ✔ | Aufgabentext (Markdown: `**fett**`, `` `code` ``, Codeblöcke mit ```, Tabellen, Listen) |
| `title` | – | Kurzer Titel für Listen |
| `points` | – | Punkte (Standard: single 2, multi/input/order 3, free 6) |
| `explanation` | – | Erklärung, die nach dem Prüfen angezeigt wird |

## Typen

### `single` – eine richtige Antwort
```json
{ "id": "eigen-1", "cat": "ga2", "topic": "sql", "type": "single",
  "q": "Welcher JOIN liefert nur passende Datensätze?",
  "options": ["LEFT JOIN", "INNER JOIN", "RIGHT JOIN"],
  "correct": 1 }
```
`correct` ist der **Index** (bei 0 beginnend). Die Optionen werden beim Anzeigen gemischt.

### `multi` – mehrere richtige Antworten
```json
{ "id": "eigen-2", "cat": "ga1", "topic": "sicherheit", "type": "multi",
  "q": "Welche sind Schutzziele?",
  "options": ["Vertraulichkeit", "Integrität", "Skalierbarkeit", "Verfügbarkeit"],
  "correct": [0, 1, 3] }
```

### `input` – kurze Eingabe (Zahl oder Text)
```json
{ "id": "eigen-3", "cat": "ga2", "topic": "rechnen", "type": "input",
  "q": "Wie viele Hosts hat ein /27-Netz?",
  "answers": ["30"], "numeric": true, "tolerance": 0, "unit": "Hosts" }
```
- `answers`: Liste akzeptierter Antworten (die erste wird als Lösung angezeigt).
- `numeric: true`: Zahlenvergleich, Komma und Punkt werden akzeptiert, `tolerance` erlaubt Abweichungen.
- Ohne `numeric` wird Text ohne Groß-/Kleinschreibung und ohne Leerzeichen verglichen (`"2, 4, 1"` = `"2,4,1"`).

### `order` – Reihenfolge herstellen
```json
{ "id": "eigen-4", "cat": "ga1", "topic": "qualitaet", "type": "order",
  "q": "Ordne die Teststufen.",
  "items": ["Unit-Test", "Integrationstest", "Systemtest", "Abnahmetest"] }
```
`items` in der **richtigen** Reihenfolge angeben – die App mischt sie.

### `free` – Freitext mit Musterlösung und Selbstbewertung
```json
{ "id": "eigen-5", "cat": "ga2", "topic": "sql", "type": "free", "code": true, "points": 6,
  "q": "Gib alle Kunden aus Köln aus.",
  "solution": "```\nSELECT * FROM Kunde WHERE Ort = 'Köln';\n```" }
```
`code: true` zeigt ein Code-Eingabefeld (Monospace, Tab-Taste rückt ein).

## Themen-IDs

| `cat` | `topic` |
|---|---|
| `ga1` | `projekt`, `vorgehen`, `anforderungen`, `uml`, `architektur`, `qualitaet`, `sicherheit` |
| `ga2` | `algorithmen`, `sortieren`, `rekursion`, `oop`, `sql`, `datenbanken`, `schnittstellen`, `rechnen` |
| `wiso` | `ausbildung`, `arbeitsrecht`, `mitbestimmung`, `sozial`, `unternehmen`, `vertrag` |

## Prompt-Vorlage für Claude

> Erstelle 10 Übungsaufgaben für die AP2 Fachinformatiker Anwendungsentwicklung zum Thema **SQL**
> als JSON-Liste im folgenden Format: *(Abschnitt „Typen“ oben einfügen)*.
> Verwende `cat: "ga2"`, `topic: "sql"`, IDs `eigen-sql-01` usw., mische die Typen
> `single`, `multi`, `input` und `free` und gib zu jeder Aufgabe eine `explanation` an.
> Antworte nur mit dem JSON.
