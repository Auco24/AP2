/* GA1 – Planen eines Softwareproduktes */
window.AP2_TASKS.push(
  /* ---------- Projektmanagement ---------- */
  {
    id: 'ga1-pm-01', cat: 'ga1', topic: 'projekt', type: 'input', numeric: true, points: 3,
    title: 'Netzplan – Projektdauer',
    q: 'Gegeben sind folgende Vorgänge:\n\n| Vorgang | Dauer (Tage) | Vorgänger |\n|---|---|---|\n| A | 3 | – |\n| B | 5 | A |\n| C | 2 | A |\n| D | 4 | B, C |\n| E | 1 | C |\n| F | 2 | D, E |\n\nWie viele Tage dauert das Projekt mindestens?',
    answers: ['14'], unit: 'Tage',
    explanation: 'Vorwärtsrechnung: A 0–3, B 3–8, C 3–5, E 5–6, D 8–12 (wartet auf B), F 12–14. Kritischer Pfad: **A → B → D → F**.'
  },
  {
    id: 'ga1-pm-02', cat: 'ga1', topic: 'projekt', type: 'input', numeric: true, points: 3,
    title: 'Netzplan – Gesamtpuffer',
    q: 'Gleicher Netzplan wie zuvor:\n\n| Vorgang | Dauer | Vorgänger |\n|---|---|---|\n| A | 3 | – |\n| B | 5 | A |\n| C | 2 | A |\n| D | 4 | B, C |\n| E | 1 | C |\n| F | 2 | D, E |\n\nWie groß ist der **Gesamtpuffer** von Vorgang **E**?',
    answers: ['6'], unit: 'Tage',
    explanation: 'E: FAZ = 5, FEZ = 6. Rückwärts: F beginnt spätestens bei 12 → SEZ(E) = 12, SAZ(E) = 11. GP = SAZ − FAZ = 11 − 5 = **6**.'
  },
  {
    id: 'ga1-pm-03', cat: 'ga1', topic: 'projekt', type: 'single', points: 2,
    q: 'Was kennzeichnet den **kritischen Pfad** in einem Netzplan?',
    options: [
      'Alle Vorgänge auf ihm haben einen Gesamtpuffer von 0.',
      'Er enthält die Vorgänge mit den höchsten Kosten.',
      'Er enthält die Vorgänge mit dem höchsten Risiko.',
      'Er ist der kürzeste Weg vom Start- zum Endereignis.'
    ],
    correct: 0,
    explanation: 'Jede Verzögerung eines Vorgangs auf dem kritischen Pfad verzögert das gesamte Projekt. Er ist der **längste** Weg durch den Netzplan.'
  },
  {
    id: 'ga1-pm-04', cat: 'ga1', topic: 'projekt', type: 'input', numeric: true, points: 3,
    title: 'Amortisationsdauer',
    q: 'Eine neue Software kostet einmalig **24.000 €**. Sie spart monatlich **1.500 €** Personalkosten, verursacht aber laufende Wartungskosten von **500 €** pro Monat.\n\nNach wie vielen Monaten hat sich die Investition amortisiert?',
    answers: ['24'], unit: 'Monate',
    explanation: 'Monatlicher Nettoeffekt = 1.500 € − 500 € = 1.000 €. Amortisation = 24.000 € / 1.000 € = **24 Monate**.'
  },
  {
    id: 'ga1-pm-05', cat: 'ga1', topic: 'projekt', type: 'multi', points: 3,
    q: 'Welche Größen bilden das **magische Dreieck** des Projektmanagements?',
    options: ['Kosten', 'Zeit / Termine', 'Qualität / Leistungsumfang', 'Teamgröße', 'Risiko'],
    correct: [0, 1, 2],
    explanation: 'Kosten, Zeit und Qualität (Umfang) beeinflussen sich gegenseitig: Wird eine Größe verändert, wirkt sich das auf mindestens eine andere aus.'
  },
  {
    id: 'ga1-pm-06', cat: 'ga1', topic: 'projekt', type: 'single', points: 2,
    q: 'Wofür steht das **„T“** in der SMART-Formel für Projektziele?',
    options: ['Technisch', 'Terminiert', 'Transparent', 'Teamfähig'],
    correct: 1,
    explanation: 'SMART = **S**pezifisch, **M**essbar, **A**ttraktiv/Akzeptiert, **R**ealistisch, **T**erminiert.'
  },
  {
    id: 'ga1-pm-07', cat: 'ga1', topic: 'projekt', type: 'free', points: 6,
    title: 'Make or Buy',
    q: 'Ihr Unternehmen überlegt, ein Ticketsystem selbst zu entwickeln oder eine Standardsoftware zu kaufen.\n\nNennen Sie je **zwei Vorteile** der Eigenentwicklung und der Standardsoftware.',
    solution: '**Eigenentwicklung**\n- Passt genau zu den eigenen Prozessen\n- Unabhängigkeit vom Hersteller, Know-how bleibt im Haus\n- Wettbewerbsvorteil durch individuelle Funktionen\n\n**Standardsoftware**\n- Sofort verfügbar, kürzere Einführungszeit\n- Meist geringere Kosten (Entwicklung auf viele Kunden verteilt)\n- Ausgereift/getestet, Support und Updates durch Hersteller',
    explanation: 'Bei der Entscheidung hilft häufig eine **Nutzwertanalyse** (gewichtete Kriterien).'
  },
  {
    id: 'ga1-pm-08', cat: 'ga1', topic: 'projekt', type: 'input', numeric: true, points: 4,
    title: 'Nutzwertanalyse',
    q: 'Bewerten Sie Produkt X mit einer Nutzwertanalyse (Punkte 1–10):\n\n| Kriterium | Gewichtung | Punkte X |\n|---|---|---|\n| Preis | 40 % | 6 |\n| Funktionsumfang | 35 % | 8 |\n| Support | 25 % | 4 |\n\nWie hoch ist der Nutzwert von Produkt X?',
    answers: ['6,2'], tolerance: 0.01,
    explanation: '0,40 · 6 + 0,35 · 8 + 0,25 · 4 = 2,4 + 2,8 + 1,0 = **6,2**.'
  },
  {
    id: 'ga1-pm-09', cat: 'ga1', topic: 'projekt', type: 'single', points: 2,
    q: 'Was ist das Ziel einer **Stakeholder-Analyse**?',
    options: [
      'Die Aktienkurse des Unternehmens zu bewerten',
      'Alle Personen/Gruppen mit Interesse oder Einfluss auf das Projekt zu erfassen und zu bewerten',
      'Den kritischen Pfad zu ermitteln',
      'Die Arbeitspakete den Entwicklern zuzuordnen'
    ],
    correct: 1
  },

  /* ---------- Vorgehensmodelle ---------- */
  {
    id: 'ga1-vm-01', cat: 'ga1', topic: 'vorgehen', type: 'single', points: 2,
    q: 'Wer ist in Scrum für die **Priorisierung des Product Backlogs** verantwortlich?',
    options: ['Scrum Master', 'Product Owner', 'Developers', 'Stakeholder'],
    correct: 1,
    explanation: 'Der Product Owner maximiert den Wert des Produkts und verwaltet das Product Backlog. Der Scrum Master unterstützt den Prozess.'
  },
  {
    id: 'ga1-vm-02', cat: 'ga1', topic: 'vorgehen', type: 'multi', points: 3,
    q: 'Welche der folgenden sind **Events in Scrum**?',
    options: ['Daily Scrum', 'Sprint Review', 'Sprint Retrospective', 'Lastenheft-Abnahme', 'Meilenstein-Review', 'Sprint Planning'],
    correct: [0, 1, 2, 5],
    explanation: 'Scrum-Events: Sprint (als Container), Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.'
  },
  {
    id: 'ga1-vm-03', cat: 'ga1', topic: 'vorgehen', type: 'single', points: 2,
    q: 'Wie lange dauert das **Daily Scrum** höchstens?',
    options: ['5 Minuten', '15 Minuten', '30 Minuten', '1 Stunde'],
    correct: 1
  },
  {
    id: 'ga1-vm-04', cat: 'ga1', topic: 'vorgehen', type: 'order', points: 3,
    q: 'Bringen Sie die Phasen des **Wasserfallmodells** in die richtige Reihenfolge.',
    items: ['Anforderungsanalyse', 'Entwurf', 'Implementierung', 'Test', 'Einführung & Betrieb'],
    explanation: 'Im klassischen Wasserfallmodell wird jede Phase abgeschlossen, bevor die nächste beginnt.'
  },
  {
    id: 'ga1-vm-05', cat: 'ga1', topic: 'vorgehen', type: 'single', points: 2,
    q: 'Was ist das charakteristische Merkmal des **V-Modells**?',
    options: [
      'Arbeit in festen Zeitintervallen (Sprints)',
      'Jeder Entwicklungsphase steht eine entsprechende Test-/Prüfphase gegenüber',
      'Visualisierung der Arbeit auf einem Board mit WIP-Limits',
      'Wiederholte Prototypen mit Risikoanalyse in einer Spirale'
    ],
    correct: 1,
    explanation: 'Linker Ast: Anforderungen → Systementwurf → Komponentenentwurf. Rechter Ast: Komponententest → Integrationstest → Systemtest → Abnahme.'
  },
  {
    id: 'ga1-vm-06', cat: 'ga1', topic: 'vorgehen', type: 'single', points: 2,
    q: 'Was bedeutet ein **WIP-Limit** in Kanban?',
    options: [
      'Maximale Anzahl an Aufgaben, die gleichzeitig in einer Spalte in Bearbeitung sein dürfen',
      'Maximale Länge eines Sprints',
      'Maximales Budget eines Arbeitspakets',
      'Mindestanzahl an Entwicklern pro Team'
    ],
    correct: 0,
    explanation: 'WIP = Work in Progress. Begrenzung verhindert Überlastung und macht Engpässe sichtbar.'
  },
  {
    id: 'ga1-vm-07', cat: 'ga1', topic: 'vorgehen', type: 'free', points: 6,
    q: 'Ein Kunde kann seine Anforderungen zu Projektbeginn nur grob beschreiben. Begründen Sie, warum sich hier ein **agiles Vorgehen** eher eignet als das Wasserfallmodell. Nennen Sie außerdem **einen Nachteil** agiler Vorgehensweisen.',
    solution: '**Vorteile agil in dieser Situation**\n- Anforderungen können iterativ konkretisiert und geändert werden\n- Kunde sieht nach jedem Sprint lauffähige Inkremente und kann früh Feedback geben\n- Fehlentwicklungen werden früh erkannt, Risiko sinkt\n\n**Nachteil**\n- Gesamtkosten und Endtermin schwer vorab planbar / Festpreis schwierig\n- Hoher Abstimmungsaufwand, Kunde muss regelmäßig verfügbar sein\n- Weniger umfassende Dokumentation'
  },
  {
    id: 'ga1-vm-08', cat: 'ga1', topic: 'vorgehen', type: 'single', points: 2,
    q: 'Was ist die **Definition of Done** in Scrum?',
    options: [
      'Eine Liste aller Anforderungen des Kunden',
      'Gemeinsames Verständnis, wann ein Inkrement die Qualitätskriterien erfüllt und als fertig gilt',
      'Das Protokoll der Sprint Retrospective',
      'Der Vertrag zwischen Auftraggeber und Auftragnehmer'
    ],
    correct: 1
  },

  /* ---------- Anforderungen & Ergonomie ---------- */
  {
    id: 'ga1-an-01', cat: 'ga1', topic: 'anforderungen', type: 'single', points: 2,
    q: 'Wer erstellt üblicherweise das **Lastenheft**?',
    options: ['Der Auftragnehmer', 'Der Auftraggeber', 'Die IHK', 'Der Datenschutzbeauftragte'],
    correct: 1,
    explanation: 'Lastenheft = **Was** und **Wofür** (Auftraggeber). Pflichtenheft = **Wie** und **Womit** (Auftragnehmer).'
  },
  {
    id: 'ga1-an-02', cat: 'ga1', topic: 'anforderungen', type: 'multi', points: 3,
    q: 'Welche Anforderungen sind **nicht-funktional**?',
    options: [
      'Die Suche liefert Ergebnisse in unter 2 Sekunden.',
      'Der Benutzer kann sein Passwort zurücksetzen.',
      'Das System ist zu 99,9 % im Jahr verfügbar.',
      'Das System erzeugt Rechnungen als PDF.',
      'Die Anwendung ist barrierefrei nach WCAG 2.1 AA.'
    ],
    correct: [0, 2, 4],
    explanation: 'Funktionale Anforderungen beschreiben, **was** das System tut. Nicht-funktionale beschreiben, **wie gut** (Performance, Verfügbarkeit, Usability, Sicherheit …).'
  },
  {
    id: 'ga1-an-03', cat: 'ga1', topic: 'anforderungen', type: 'single', points: 2,
    q: 'Ein Dialog zeigt jederzeit an, in welchem Schritt sich der Benutzer befindet und welche Aktionen möglich sind. Welcher Grundsatz der **ISO 9241-110** ist gemeint?',
    options: ['Steuerbarkeit', 'Selbstbeschreibungsfähigkeit', 'Erwartungskonformität', 'Aufgabenangemessenheit'],
    correct: 1
  },
  {
    id: 'ga1-an-04', cat: 'ga1', topic: 'anforderungen', type: 'single', points: 2,
    q: 'Der „Speichern“-Button befindet sich in allen Masken an derselben Stelle und hat dasselbe Symbol. Welcher Grundsatz ist erfüllt?',
    options: ['Erwartungskonformität', 'Lernförderlichkeit', 'Robustheit gegen Benutzerfehler', 'Individualisierbarkeit'],
    correct: 0,
    explanation: 'Erwartungskonformität: Konsistente Gestaltung, die den Erfahrungen und Konventionen der Benutzer entspricht.'
  },
  {
    id: 'ga1-an-05', cat: 'ga1', topic: 'anforderungen', type: 'multi', points: 3,
    q: 'Welche Grundsätze gehören zu den **Interaktionsprinzipien der ISO 9241-110**?',
    options: ['Steuerbarkeit', 'Robustheit gegen Benutzerfehler', 'Rentabilität', 'Aufgabenangemessenheit', 'Skalierbarkeit'],
    correct: [0, 1, 3],
    explanation: 'Aufgabenangemessenheit, Selbstbeschreibungsfähigkeit, Erwartungskonformität, Erlernbarkeit, Steuerbarkeit, Robustheit gegen Benutzerfehler, Benutzerbindung.'
  },
  {
    id: 'ga1-an-06', cat: 'ga1', topic: 'anforderungen', type: 'free', points: 6,
    title: 'User Story',
    q: 'Formulieren Sie für einen Online-Shop eine **User Story** zur Funktion „Bestellung stornieren“ und nennen Sie **drei Akzeptanzkriterien**.',
    solution: '**User Story:** Als *registrierter Kunde* möchte ich *eine noch nicht versandte Bestellung stornieren*, damit *ich keine Ware erhalte, die ich nicht mehr brauche*.\n\n**Akzeptanzkriterien**\n- Stornieren ist nur möglich, solange der Status nicht „versendet“ ist\n- Nach dem Stornieren erhält der Kunde eine Bestätigungs-E-Mail\n- Der Betrag wird innerhalb von x Tagen zurückerstattet / Zahlung wird freigegeben\n- Die Bestellung erscheint mit Status „storniert“ in der Bestellübersicht',
    explanation: 'Schema: **Als** <Rolle> **möchte ich** <Ziel/Funktion>, **damit** <Nutzen>.'
  },
  {
    id: 'ga1-an-07', cat: 'ga1', topic: 'anforderungen', type: 'single', points: 2,
    q: 'Welches ist ein **Qualitätsmerkmal** von Software nach **ISO/IEC 25010**?',
    options: ['Marktanteil', 'Wartbarkeit', 'Teamgröße', 'Lizenzpreis'],
    correct: 1,
    explanation: 'Merkmale u. a.: funktionale Eignung, Leistungseffizienz, Kompatibilität, Benutzbarkeit, Zuverlässigkeit, Sicherheit, Wartbarkeit, Übertragbarkeit.'
  },

  /* ---------- UML ---------- */
  {
    id: 'ga1-uml-01', cat: 'ga1', topic: 'uml', type: 'single', points: 2,
    q: 'Welches UML-Diagramm stellt den **zeitlichen Ablauf von Nachrichten** zwischen Objekten dar?',
    options: ['Klassendiagramm', 'Sequenzdiagramm', 'Anwendungsfalldiagramm', 'Komponentendiagramm'],
    correct: 1
  },
  {
    id: 'ga1-uml-02', cat: 'ga1', topic: 'uml', type: 'single', points: 2,
    q: 'Im Klassendiagramm verbindet eine Linie mit einer **ausgefüllten Raute** die Klassen `Rechnung` (an der Raute) und `Rechnungsposition`. Was bedeutet das?',
    options: [
      'Aggregation – Positionen können unabhängig von der Rechnung existieren',
      'Komposition – Positionen sind existenzabhängig von der Rechnung',
      'Vererbung – Rechnungsposition ist eine Rechnung',
      'Abhängigkeit – Rechnung nutzt Rechnungsposition kurzzeitig'
    ],
    correct: 1,
    explanation: 'Ausgefüllte Raute = Komposition (Teil stirbt mit dem Ganzen). Leere Raute = Aggregation.'
  },
  {
    id: 'ga1-uml-03', cat: 'ga1', topic: 'uml', type: 'multi', points: 3,
    q: 'Welche UML-Diagramme gehören zu den **Verhaltensdiagrammen**?',
    options: ['Aktivitätsdiagramm', 'Klassendiagramm', 'Zustandsdiagramm', 'Verteilungsdiagramm', 'Anwendungsfalldiagramm', 'Sequenzdiagramm'],
    correct: [0, 2, 4, 5],
    explanation: 'Strukturdiagramme: Klassen-, Objekt-, Komponenten-, Verteilungs-, Paketdiagramm … Verhaltensdiagramme: Aktivitäts-, Use-Case-, Zustands- und Interaktionsdiagramme (Sequenz, Kommunikation, Timing).'
  },
  {
    id: 'ga1-uml-04', cat: 'ga1', topic: 'uml', type: 'single', points: 2,
    q: 'Im Anwendungsfalldiagramm zeigt `«include»` von „Geld abheben“ auf „PIN prüfen“. Was bedeutet das?',
    options: [
      '„PIN prüfen“ wird bei „Geld abheben“ immer ausgeführt',
      '„PIN prüfen“ wird nur unter einer Bedingung ausgeführt',
      '„Geld abheben“ erbt von „PIN prüfen“',
      'Beide Anwendungsfälle laufen parallel'
    ],
    correct: 0,
    explanation: '`«include»` = verpflichtend eingebunden. `«extend»` = optionale Erweiterung unter Bedingung (Extension Point).'
  },
  {
    id: 'ga1-uml-05', cat: 'ga1', topic: 'uml', type: 'single', points: 2,
    q: 'Welche Sichtbarkeit hat ein Attribut mit dem Symbol **`#`** im Klassendiagramm?',
    options: ['public', 'private', 'protected', 'package'],
    correct: 2,
    explanation: '`+` public, `-` private, `#` protected, `~` package.'
  },
  {
    id: 'ga1-uml-06', cat: 'ga1', topic: 'uml', type: 'single', points: 2,
    q: 'Was stellt ein **schwarzer Balken mit einem eingehenden und mehreren ausgehenden Pfeilen** im Aktivitätsdiagramm dar?',
    options: ['Entscheidung (Verzweigung)', 'Gabelung (Fork) – parallele Abläufe beginnen', 'Endknoten', 'Objektfluss'],
    correct: 1,
    explanation: 'Fork teilt den Ablauf in parallele Stränge, Join (Balken mit mehreren Eingängen) synchronisiert sie wieder. Entscheidungen werden als Raute dargestellt.'
  },
  {
    id: 'ga1-uml-07', cat: 'ga1', topic: 'uml', type: 'free', points: 8,
    title: 'Klassendiagramm Bibliothek',
    q: 'Modellieren Sie (textuell) ein **Klassendiagramm** für eine Bibliothek:\n\n- Ein **Mitglied** hat Mitgliedsnummer, Name und E-Mail.\n- Ein **Buch** hat ISBN, Titel und Erscheinungsjahr.\n- Von einem Buch gibt es mehrere **Exemplare** (Inventarnummer); ein Exemplar gehört zu genau einem Buch.\n- Ein Mitglied kann mehrere Exemplare **ausleihen** (Ausleihdatum, Rückgabedatum).\n\nGeben Sie Klassen, Attribute (mit Sichtbarkeit) und Beziehungen mit Multiplizitäten an.',
    solution: '```\nMitglied                 Buch                    Exemplar\n- mitgliedNr: int        - isbn: String          - inventarNr: int\n- name: String           - titel: String\n- email: String          - jahr: int\n\nAusleihe\n- ausleihdatum: Date\n- rueckgabedatum: Date\n```\n\n**Beziehungen**\n- Buch `1` ◆—— `1..*` Exemplar (Komposition: Exemplar existiert nur zu einem Buch)\n- Mitglied `1` —— `0..*` Ausleihe\n- Ausleihe `0..*` —— `1` Exemplar\n\nAlternativ: Assoziationsklasse **Ausleihe** zwischen Mitglied `0..*` und Exemplar `0..*`.',
    explanation: 'Achte auf: private Attribute (`-`), Datentypen, Multiplizitäten an **beiden** Enden.'
  },
  {
    id: 'ga1-uml-08', cat: 'ga1', topic: 'uml', type: 'single', points: 2,
    q: 'Wie wird im **Zustandsdiagramm** eine Bedingung für einen Zustandsübergang notiert?',
    options: ['In geschweiften Klammern `{ }`', 'In eckigen Klammern `[ ]` als Guard', 'In spitzen Klammern `« »`', 'Als Notiz mit Eselsohr'],
    correct: 1,
    explanation: 'Notation eines Übergangs: `Ereignis [Guard] / Aktion`, z. B. `bezahlen [betrag >= preis] / quittungDrucken()`.'
  },

  /* ---------- Architektur & Entwurfsmuster ---------- */
  {
    id: 'ga1-ar-01', cat: 'ga1', topic: 'architektur', type: 'single', points: 2,
    q: 'Welche Aufgabe hat der **Controller** im MVC-Muster?',
    options: [
      'Er hält die Daten und die Geschäftslogik',
      'Er stellt die Daten für den Benutzer dar',
      'Er nimmt Benutzereingaben entgegen und steuert Model und View',
      'Er speichert Daten in der Datenbank'
    ],
    correct: 2
  },
  {
    id: 'ga1-ar-02', cat: 'ga1', topic: 'architektur', type: 'single', points: 2,
    q: 'Welches Entwurfsmuster stellt sicher, dass von einer Klasse **genau eine Instanz** existiert?',
    options: ['Observer', 'Factory Method', 'Singleton', 'Adapter'],
    correct: 2,
    explanation: 'Umsetzung: privater Konstruktor, statisches Attribut mit der Instanz und statische Methode `getInstance()`.'
  },
  {
    id: 'ga1-ar-03', cat: 'ga1', topic: 'architektur', type: 'single', points: 2,
    q: 'Mehrere Anzeigen sollen automatisch aktualisiert werden, wenn sich ein Messwert ändert. Welches Muster passt?',
    options: ['Observer', 'Singleton', 'Decorator', 'Builder'],
    correct: 0,
    explanation: 'Observer: Ein Subjekt verwaltet eine Liste von Beobachtern und benachrichtigt sie bei Zustandsänderungen (`notify()` → `update()`).'
  },
  {
    id: 'ga1-ar-04', cat: 'ga1', topic: 'architektur', type: 'single', points: 2,
    q: 'Eine bestehende Klasse hat eine inkompatible Schnittstelle und soll trotzdem verwendet werden. Welches Muster eignet sich?',
    options: ['Adapter', 'Observer', 'Singleton', 'Strategy'],
    correct: 0
  },
  {
    id: 'ga1-ar-05', cat: 'ga1', topic: 'architektur', type: 'multi', points: 3,
    q: 'Welche Aussagen treffen auf eine **REST-API** zu?',
    options: [
      'Die Kommunikation ist zustandslos.',
      'Ressourcen werden über URIs adressiert.',
      'Es werden HTTP-Methoden wie GET, POST, PUT, DELETE verwendet.',
      'Der Server muss eine Session für jeden Client speichern.',
      'Als Datenformat ist ausschließlich XML erlaubt.'
    ],
    correct: [0, 1, 2]
  },
  {
    id: 'ga1-ar-06', cat: 'ga1', topic: 'architektur', type: 'free', points: 6,
    title: 'Drei-Schichten-Architektur',
    q: 'Beschreiben Sie die **drei Schichten** einer Drei-Schichten-Architektur und nennen Sie **zwei Vorteile** dieser Aufteilung.',
    solution: '**Schichten**\n1. **Präsentationsschicht** – Benutzeroberfläche, Ein-/Ausgabe\n2. **Logikschicht (Geschäftslogik)** – Verarbeitung, Regeln, Validierung\n3. **Datenhaltungsschicht** – Speicherung und Zugriff auf Daten (DB)\n\n**Vorteile**\n- Schichten austauschbar (z. B. neue Oberfläche, andere Datenbank)\n- Bessere Wartbarkeit und Testbarkeit, klare Zuständigkeiten\n- Skalierbarkeit (Schichten auf verschiedenen Servern)\n- Parallele Entwicklung im Team möglich'
  },
  {
    id: 'ga1-ar-07', cat: 'ga1', topic: 'architektur', type: 'single', points: 2,
    q: 'Was ist ein typisches Merkmal einer **Microservice-Architektur**?',
    options: [
      'Die gesamte Anwendung wird als ein einziges Deployment ausgeliefert',
      'Kleine, unabhängig deploybare Dienste, die über Schnittstellen (z. B. HTTP) kommunizieren',
      'Alle Dienste teilen sich zwingend eine gemeinsame Datenbank',
      'Es darf nur eine Programmiersprache verwendet werden'
    ],
    correct: 1
  },

  /* ---------- Testen & QS ---------- */
  {
    id: 'ga1-qs-01', cat: 'ga1', topic: 'qualitaet', type: 'single', points: 2,
    q: 'Was kennzeichnet einen **Whitebox-Test**?',
    options: [
      'Der Tester kennt den Quellcode und leitet Testfälle aus der internen Struktur ab',
      'Der Tester testet nur anhand der Spezifikation',
      'Der Test wird ausschließlich vom Kunden durchgeführt',
      'Es werden nur Oberflächen getestet'
    ],
    correct: 0
  },
  {
    id: 'ga1-qs-02', cat: 'ga1', topic: 'qualitaet', type: 'input', numeric: true, points: 2,
    q: 'Ein Eingabefeld akzeptiert ganzzahlige Alterswerte von **18 bis 65**. Wie viele **Äquivalenzklassen** (gültige und ungültige zusammen) ergeben sich für ganze Zahlen mindestens?',
    answers: ['3'],
    explanation: 'Ungültig: < 18 · Gültig: 18 … 65 · Ungültig: > 65. (Nicht-numerische Eingaben wären eine weitere ungültige Klasse.)'
  },
  {
    id: 'ga1-qs-03', cat: 'ga1', topic: 'qualitaet', type: 'multi', points: 3,
    q: 'Welche Werte sind bei der **Grenzwertanalyse** für den gültigen Bereich **18 bis 65** (ganzzahlig) zu testen?',
    options: ['17', '18', '40', '65', '66', '0'],
    correct: [0, 1, 3, 4],
    explanation: 'Getestet werden die Grenzen selbst und die direkt benachbarten Werte außerhalb: 17, 18, 65, 66.'
  },
  {
    id: 'ga1-qs-04', cat: 'ga1', topic: 'qualitaet', type: 'order', points: 3,
    q: 'Bringen Sie die **Teststufen** in die Reihenfolge, in der sie typischerweise durchlaufen werden.',
    items: ['Komponententest (Unit-Test)', 'Integrationstest', 'Systemtest', 'Abnahmetest']
  },
  {
    id: 'ga1-qs-05', cat: 'ga1', topic: 'qualitaet', type: 'single', points: 2,
    q: 'Nach einer Fehlerkorrektur werden bereits bestehende Tests erneut ausgeführt, um unerwünschte Seiteneffekte zu finden. Wie heißt dieser Test?',
    options: ['Lasttest', 'Regressionstest', 'Abnahmetest', 'Smoke-Test'],
    correct: 1
  },
  {
    id: 'ga1-qs-06', cat: 'ga1', topic: 'qualitaet', type: 'single', points: 2,
    q: 'Was ist der **erste Schritt** im TDD-Zyklus (Test Driven Development)?',
    options: [
      'Code schreiben, der die Anforderung erfüllt',
      'Einen Test schreiben, der zunächst fehlschlägt (Red)',
      'Den Code refaktorisieren',
      'Das Pflichtenheft erstellen'
    ],
    correct: 1,
    explanation: 'Red → Green → Refactor.'
  },
  {
    id: 'ga1-qs-07', cat: 'ga1', topic: 'qualitaet', type: 'single', points: 2,
    q: 'Was fordert die **Zweigüberdeckung (C1)**?',
    options: [
      'Jede Anweisung wird mindestens einmal ausgeführt',
      'Jeder Zweig (jede Kante) des Kontrollflussgraphen wird mindestens einmal durchlaufen',
      'Jeder mögliche Pfad wird durchlaufen',
      'Jede Bedingungskombination wird getestet'
    ],
    correct: 1,
    explanation: 'C0 = Anweisungsüberdeckung, C1 = Zweigüberdeckung, C2 = Pfadüberdeckung. C1 schließt C0 ein.'
  },
  {
    id: 'ga1-qs-08', cat: 'ga1', topic: 'qualitaet', type: 'free', points: 6,
    title: 'Testfälle Rabatt',
    q: 'Die Funktion `rabatt(betrag)` liefert:\n\n- Betrag < 0 → Fehler\n- 0 ≤ Betrag < 100 → 0 %\n- 100 ≤ Betrag < 500 → 5 %\n- Betrag ≥ 500 → 10 %\n\nErstellen Sie eine **Testfalltabelle** (Eingabe, erwartetes Ergebnis) nach Grenzwertanalyse.',
    solution: '| Nr | Betrag | Erwartet |\n|---|---|---|\n| 1 | -0,01 | Fehler |\n| 2 | 0 | 0 % |\n| 3 | 99,99 | 0 % |\n| 4 | 100 | 5 % |\n| 5 | 499,99 | 5 % |\n| 6 | 500 | 10 % |\n| 7 | z. B. 10 000 | 10 % |',
    explanation: 'Jede Grenze wird von beiden Seiten getestet. Zusätzlich sinnvoll: ungültige Eingabe (Text, leer).'
  },

  /* ---------- IT-Sicherheit & Datenschutz ---------- */
  {
    id: 'ga1-sec-01', cat: 'ga1', topic: 'sicherheit', type: 'multi', points: 3,
    q: 'Welche sind die drei **klassischen Schutzziele** der Informationssicherheit?',
    options: ['Vertraulichkeit', 'Integrität', 'Verfügbarkeit', 'Skalierbarkeit', 'Wirtschaftlichkeit'],
    correct: [0, 1, 2],
    explanation: 'CIA-Triade: Confidentiality, Integrity, Availability. Oft ergänzt um Authentizität und Verbindlichkeit.'
  },
  {
    id: 'ga1-sec-02', cat: 'ga1', topic: 'sicherheit', type: 'single', points: 2,
    q: 'Welche Maßnahme schützt am wirksamsten vor **SQL-Injection**?',
    options: [
      'Prepared Statements / parametrisierte Abfragen',
      'Längere Passwörter',
      'HTTPS verwenden',
      'Die Datenbank auf einem eigenen Server betreiben'
    ],
    correct: 0,
    explanation: 'Benutzereingaben werden als Parameter übergeben und nie als SQL-Code interpretiert.'
  },
  {
    id: 'ga1-sec-03', cat: 'ga1', topic: 'sicherheit', type: 'single', points: 2,
    q: 'Wie sollten Passwörter in einer Datenbank gespeichert werden?',
    options: [
      'Im Klartext, damit der Support sie nachschlagen kann',
      'Mit AES verschlüsselt',
      'Als Hash mit individuellem Salt und langsamer Hashfunktion (z. B. bcrypt, Argon2)',
      'Base64-kodiert'
    ],
    correct: 2,
    explanation: 'Base64 ist keine Verschlüsselung. Ein Salt verhindert Rainbow-Table-Angriffe; langsame Verfahren erschweren Brute Force.'
  },
  {
    id: 'ga1-sec-04', cat: 'ga1', topic: 'sicherheit', type: 'single', points: 2,
    q: 'Anna möchte Ben eine Nachricht **asymmetrisch verschlüsselt** senden. Mit welchem Schlüssel verschlüsselt Anna?',
    options: ['Annas privatem Schlüssel', 'Annas öffentlichem Schlüssel', 'Bens öffentlichem Schlüssel', 'Bens privatem Schlüssel'],
    correct: 2,
    explanation: 'Nur Ben kann mit seinem privaten Schlüssel entschlüsseln. Für eine **Signatur** würde Anna dagegen ihren privaten Schlüssel verwenden.'
  },
  {
    id: 'ga1-sec-05', cat: 'ga1', topic: 'sicherheit', type: 'single', points: 2,
    q: 'Warum wird in der Praxis oft **hybride Verschlüsselung** (z. B. bei TLS) eingesetzt?',
    options: [
      'Weil symmetrische Verfahren unsicher sind',
      'Asymmetrisch wird der Sitzungsschlüssel sicher ausgetauscht, symmetrisch werden die Daten schnell verschlüsselt',
      'Weil asymmetrische Verfahren schneller sind',
      'Damit keine Zertifikate benötigt werden'
    ],
    correct: 1
  },
  {
    id: 'ga1-sec-06', cat: 'ga1', topic: 'sicherheit', type: 'single', points: 2,
    q: 'Ein Angreifer schleust über ein Kommentarfeld JavaScript ein, das im Browser anderer Nutzer ausgeführt wird. Wie heißt der Angriff?',
    options: ['SQL-Injection', 'Cross-Site-Scripting (XSS)', 'Phishing', 'DDoS'],
    correct: 1,
    explanation: 'Gegenmaßnahme: Ausgaben kontextgerecht escapen, Eingaben validieren, Content-Security-Policy.'
  },
  {
    id: 'ga1-sec-07', cat: 'ga1', topic: 'sicherheit', type: 'multi', points: 3,
    q: 'Welche Rechte haben betroffene Personen nach der **DSGVO**?',
    options: ['Recht auf Auskunft', 'Recht auf Löschung', 'Recht auf Datenübertragbarkeit', 'Recht auf Einsicht in den Quellcode', 'Recht auf Berichtigung'],
    correct: [0, 1, 2, 4]
  },
  {
    id: 'ga1-sec-08', cat: 'ga1', topic: 'sicherheit', type: 'single', points: 2,
    q: 'Welche Kombination ist eine echte **Zwei-Faktor-Authentifizierung**?',
    options: [
      'Passwort und Sicherheitsfrage',
      'Passwort und Einmalcode aus einer Authenticator-App auf dem Smartphone',
      'Benutzername und Passwort',
      'Zwei verschiedene Passwörter'
    ],
    correct: 1,
    explanation: 'Zwei **unterschiedliche** Faktoren: Wissen (Passwort), Besitz (Smartphone/Token), Inhärenz (Fingerabdruck).'
  },
  {
    id: 'ga1-sec-09', cat: 'ga1', topic: 'sicherheit', type: 'free', points: 6,
    title: 'TOM nach DSGVO',
    q: 'Nennen Sie **vier technisch-organisatorische Maßnahmen (TOM)** zum Schutz personenbezogener Daten in einer Webanwendung.',
    solution: '- Zugangs-/Zugriffskontrolle: Rollen- und Rechtekonzept, starke Authentifizierung (2FA)\n- Verschlüsselung: TLS für die Übertragung, Verschlüsselung gespeicherter Daten\n- Pseudonymisierung / Datenminimierung\n- Protokollierung (Logging) von Zugriffen und Änderungen\n- Regelmäßige Backups (Verfügbarkeit) und Wiederherstellungstests\n- Schulung und Verpflichtung der Mitarbeiter auf Vertraulichkeit\n- Physische Zutrittskontrolle zum Serverraum'
  }
);
