/* Kategorien (Prüfungsbereiche der AP2 FIAE) und Themen. */
window.AP2_CATEGORIES = [
  {
    id: 'ga1',
    name: 'Planen eines Softwareproduktes',
    short: 'GA1 – Planen',
    icon: '📐',
    description: 'Projektmanagement, Vorgehensmodelle, Anforderungen, UML, Architektur, Qualitätssicherung, IT-Sicherheit.',
    examMinutes: 90,
    topics: [
      { id: 'projekt', name: 'Projektmanagement' },
      { id: 'vorgehen', name: 'Vorgehensmodelle & Agilität' },
      { id: 'anforderungen', name: 'Anforderungen & Ergonomie' },
      { id: 'uml', name: 'UML-Diagramme' },
      { id: 'architektur', name: 'Architektur & Entwurfsmuster' },
      { id: 'qualitaet', name: 'Testen & Qualitätssicherung' },
      { id: 'sicherheit', name: 'IT-Sicherheit & Datenschutz' }
    ]
  },
  {
    id: 'ga2',
    name: 'Entwicklung und Umsetzung von Algorithmen',
    short: 'GA2 – Algorithmen',
    icon: '🧮',
    description: 'Pseudocode, Sortieren & Suchen, Rekursion, OOP, SQL, Datenbankmodellierung, Schnittstellen, IT-Rechnen.',
    examMinutes: 90,
    topics: [
      { id: 'algorithmen', name: 'Algorithmen & Pseudocode' },
      { id: 'sortieren', name: 'Sortieren, Suchen & Komplexität' },
      { id: 'rekursion', name: 'Rekursion' },
      { id: 'oop', name: 'Objektorientierung' },
      { id: 'sql', name: 'SQL' },
      { id: 'datenbanken', name: 'Datenbankmodellierung & Normalisierung' },
      { id: 'schnittstellen', name: 'Schnittstellen & Datenformate' },
      { id: 'rechnen', name: 'IT-Rechnen & Zahlensysteme' }
    ]
  },
  {
    id: 'wiso',
    name: 'Wirtschafts- und Sozialkunde',
    short: 'WiSo',
    icon: '⚖️',
    description: 'Ausbildung, Arbeitsrecht, Mitbestimmung & Tarif, Sozialversicherung, Unternehmen, Verträge.',
    examMinutes: 60,
    topics: [
      { id: 'ausbildung', name: 'Berufsausbildung & Jugendschutz' },
      { id: 'arbeitsrecht', name: 'Arbeitsrecht' },
      { id: 'mitbestimmung', name: 'Mitbestimmung & Tarifrecht' },
      { id: 'sozial', name: 'Sozialversicherung & Entgelt' },
      { id: 'unternehmen', name: 'Unternehmen & Rechtsformen' },
      { id: 'vertrag', name: 'Rechtsgeschäfte & Verträge' }
    ]
  }
];

/* Sammelbecken für alle Aufgaben. Jede Datei unter data/ hängt ihre Aufgaben hier an. */
window.AP2_TASKS = window.AP2_TASKS || [];
