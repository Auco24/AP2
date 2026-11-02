/* GA2 – Entwicklung und Umsetzung von Algorithmen */
(function () {
  var SCHEMA = '**Datenbankschema**\n\n```\nKunde(KundeID, Name, Ort)\nBestellung(BestellID, KundeID→Kunde, Datum, Betrag)\nArtikel(ArtikelID, Bezeichnung, Preis, Bestand)\nPosition(BestellID→Bestellung, ArtikelID→Artikel, Menge)\n```\n';

  window.AP2_TASKS.push(
    /* ---------- Algorithmen & Pseudocode ---------- */
    {
      id: 'ga2-alg-01', cat: 'ga2', topic: 'algorithmen', type: 'input', numeric: true, points: 3,
      title: 'Schreibtischtest 1',
      q: 'Welchen Wert gibt der folgende Pseudocode aus?\n\n```\nx ← 0\nFÜR i ← 1 BIS 7\n    WENN i MOD 2 = 1 DANN\n        x ← x + i\n    ENDE WENN\nENDE FÜR\nAUSGABE x\n```',
      answers: ['16'],
      explanation: 'Addiert werden die ungeraden i: 1 + 3 + 5 + 7 = **16**.'
    },
    {
      id: 'ga2-alg-02', cat: 'ga2', topic: 'algorithmen', type: 'input', points: 3,
      title: 'Schreibtischtest 2',
      q: 'Was gibt der Algorithmus aus?\n\n```\nn ← 37\nz ← ""\nSOLANGE n > 0\n    z ← (n MOD 2) + z      // Ziffer vorne anhängen\n    n ← n DIV 2\nENDE SOLANGE\nAUSGABE z\n```',
      answers: ['100101'],
      explanation: 'Der Algorithmus wandelt dezimal in binär um: 37 = 32 + 4 + 1 = **100101₂**.'
    },
    {
      id: 'ga2-alg-03', cat: 'ga2', topic: 'algorithmen', type: 'input', numeric: true, points: 3,
      title: 'Verschachtelte Schleifen',
      q: 'Welchen Wert hat `z` am Ende?\n\n```\nz ← 0\nFÜR i ← 1 BIS 4\n    FÜR j ← i BIS 4\n        z ← z + 1\n    ENDE FÜR\nENDE FÜR\n```',
      answers: ['10'],
      explanation: 'Durchläufe innen: 4 + 3 + 2 + 1 = **10**.'
    },
    {
      id: 'ga2-alg-04', cat: 'ga2', topic: 'algorithmen', type: 'input', numeric: true, points: 3,
      title: 'Euklid',
      q: 'Was gibt der Algorithmus für `a = 84` und `b = 36` aus?\n\n```\nSOLANGE b ≠ 0\n    r ← a MOD b\n    a ← b\n    b ← r\nENDE SOLANGE\nAUSGABE a\n```',
      answers: ['12'],
      explanation: 'Euklidischer Algorithmus (ggT): (84,36) → (36,12) → (12,0) → **12**.'
    },
    {
      id: 'ga2-alg-05', cat: 'ga2', topic: 'algorithmen', type: 'input', points: 3,
      title: 'Array-Durchlauf',
      q: 'Welche Werte enthält das Array nach Ausführung? (Kommagetrennt angeben)\n\n```\na ← [3, 8, 2, 5, 1]\nFÜR i ← 1 BIS 4          // Index beginnt bei 0\n    a[i] ← a[i] + a[i-1]\nENDE FÜR\n```',
      answers: ['3,11,13,18,19'], placeholder: 'z. B. 1,2,3,4,5',
      explanation: 'Laufende Summe (Präfixsumme): 3 · 3+8=11 · 11+2=13 · 13+5=18 · 18+1=19.'
    },
    {
      id: 'ga2-alg-06', cat: 'ga2', topic: 'algorithmen', type: 'free', code: true, points: 6,
      title: 'Durchschnitt ohne negative Werte',
      q: 'Schreiben Sie eine Funktion `durchschnitt(werte[])` in Pseudocode, die den Durchschnitt aller **nicht negativen** Werte eines Arrays zurückgibt. Enthält das Array keine solchen Werte, soll `0` zurückgegeben werden.',
      solution: '```\nFUNKTION durchschnitt(werte[]) : Kommazahl\n    summe ← 0\n    anzahl ← 0\n    FÜR i ← 0 BIS länge(werte) - 1\n        WENN werte[i] >= 0 DANN\n            summe ← summe + werte[i]\n            anzahl ← anzahl + 1\n        ENDE WENN\n    ENDE FÜR\n    WENN anzahl = 0 DANN\n        RÜCKGABE 0\n    ENDE WENN\n    RÜCKGABE summe / anzahl\nENDE FUNKTION\n```',
      explanation: 'Typische Fehlerquelle: Division durch 0, wenn keine gültigen Werte vorhanden sind.'
    },
    {
      id: 'ga2-alg-07', cat: 'ga2', topic: 'algorithmen', type: 'free', code: true, points: 6,
      title: 'Palindrom',
      q: 'Schreiben Sie eine Funktion `istPalindrom(text)` in Pseudocode, die `wahr` zurückgibt, wenn der Text vorwärts und rückwärts gleich gelesen wird (z. B. „anna“). Verwenden Sie **keine** fertige Umkehr-Funktion.',
      solution: '```\nFUNKTION istPalindrom(text) : Boolean\n    links ← 0\n    rechts ← länge(text) - 1\n    SOLANGE links < rechts\n        WENN text[links] ≠ text[rechts] DANN\n            RÜCKGABE falsch\n        ENDE WENN\n        links ← links + 1\n        rechts ← rechts - 1\n    ENDE SOLANGE\n    RÜCKGABE wahr\nENDE FUNKTION\n```',
      explanation: 'Zwei-Zeiger-Technik: Vergleich von außen nach innen, Laufzeit O(n).'
    },
    {
      id: 'ga2-alg-08', cat: 'ga2', topic: 'algorithmen', type: 'free', code: true, points: 6,
      title: 'Zeichen zählen',
      q: 'Schreiben Sie eine Funktion `zaehleVokale(text)`, die die Anzahl der Vokale (a, e, i, o, u – Groß- und Kleinschreibung egal) in einem Text zurückgibt.',
      solution: '```\nFUNKTION zaehleVokale(text) : Ganzzahl\n    vokale ← "aeiou"\n    anzahl ← 0\n    FÜR i ← 0 BIS länge(text) - 1\n        zeichen ← klein(text[i])\n        WENN vokale ENTHÄLT zeichen DANN\n            anzahl ← anzahl + 1\n        ENDE WENN\n    ENDE FÜR\n    RÜCKGABE anzahl\nENDE FUNKTION\n```'
    },

    /* ---------- Sortieren & Suchen ---------- */
    {
      id: 'ga2-sort-01', cat: 'ga2', topic: 'sortieren', type: 'input', points: 3,
      title: 'Bubble Sort – 1. Durchlauf',
      q: 'Das Array `[5, 2, 4, 1, 3]` wird mit **Bubble Sort** aufsteigend sortiert. Wie sieht es nach dem **ersten vollständigen Durchlauf** aus? (Kommagetrennt)',
      answers: ['2,4,1,3,5'], placeholder: 'z. B. 1,2,3,4,5',
      explanation: '5↔2 → [2,5,4,1,3] · 5↔4 → [2,4,5,1,3] · 5↔1 → [2,4,1,5,3] · 5↔3 → **[2,4,1,3,5]**. Das größte Element „blubbert“ nach hinten.'
    },
    {
      id: 'ga2-sort-02', cat: 'ga2', topic: 'sortieren', type: 'input', points: 3,
      title: 'Selection Sort – 2 Durchläufe',
      q: 'Das Array `[29, 10, 14, 37, 13]` wird mit **Selection Sort** aufsteigend sortiert (Minimum suchen und an den Anfang tauschen). Wie sieht es nach **zwei** Durchläufen aus?',
      answers: ['10,13,14,37,29'], placeholder: 'z. B. 1,2,3,4,5',
      explanation: '1. Durchlauf: Min 10 ↔ 29 → [10,29,14,37,13] · 2. Durchlauf: Min 13 ↔ 29 → **[10,13,14,37,29]**.'
    },
    {
      id: 'ga2-sort-03', cat: 'ga2', topic: 'sortieren', type: 'single', points: 2,
      q: 'Welche Voraussetzung muss für eine **binäre Suche** erfüllt sein?',
      options: ['Das Array muss sortiert sein', 'Das Array darf keine Duplikate enthalten', 'Das Array muss eine Zweierpotenz an Elementen haben', 'Die Elemente müssen Zahlen sein'],
      correct: 0
    },
    {
      id: 'ga2-sort-04', cat: 'ga2', topic: 'sortieren', type: 'input', numeric: true, points: 3,
      q: 'Wie viele Vergleiche benötigt eine **binäre Suche** in einem sortierten Array mit **1.000 Elementen** im schlechtesten Fall höchstens?',
      answers: ['10'],
      explanation: '2¹⁰ = 1024 ≥ 1000 → maximal **10** Halbierungen/Vergleiche (⌈log₂(1000+1)⌉ = 10). Lineare Suche: bis zu 1000.'
    },
    {
      id: 'ga2-sort-05', cat: 'ga2', topic: 'sortieren', type: 'single', points: 2,
      q: 'Welche Zeitkomplexität hat **Bubble Sort** im schlechtesten Fall?',
      options: ['O(log n)', 'O(n)', 'O(n · log n)', 'O(n²)'],
      correct: 3
    },
    {
      id: 'ga2-sort-06', cat: 'ga2', topic: 'sortieren', type: 'single', points: 2,
      q: 'Welches Sortierverfahren hat auch im **schlechtesten Fall** eine Laufzeit von O(n · log n)?',
      options: ['Quicksort', 'Merge Sort', 'Insertion Sort', 'Bubble Sort'],
      correct: 1,
      explanation: 'Quicksort ist im Mittel O(n log n), im schlechtesten Fall (ungünstiges Pivot) aber O(n²).'
    },
    {
      id: 'ga2-sort-07', cat: 'ga2', topic: 'sortieren', type: 'free', code: true, points: 8,
      title: 'Bubble Sort implementieren',
      q: 'Implementieren Sie **Bubble Sort** in Pseudocode für ein Ganzzahl-Array `zahlen[]` (aufsteigend). Der Algorithmus soll vorzeitig abbrechen, wenn in einem Durchlauf nicht mehr getauscht wurde.',
      solution: '```\nPROZEDUR bubbleSort(zahlen[])\n    n ← länge(zahlen)\n    WIEDERHOLE\n        getauscht ← falsch\n        FÜR i ← 0 BIS n - 2\n            WENN zahlen[i] > zahlen[i+1] DANN\n                temp ← zahlen[i]\n                zahlen[i] ← zahlen[i+1]\n                zahlen[i+1] ← temp\n                getauscht ← wahr\n            ENDE WENN\n        ENDE FÜR\n        n ← n - 1\n    BIS getauscht = falsch\nENDE PROZEDUR\n```',
      explanation: 'Das `n ← n - 1` ist eine Optimierung: Nach jedem Durchlauf steht das größte Element bereits am Ende.'
    },
    {
      id: 'ga2-sort-08', cat: 'ga2', topic: 'sortieren', type: 'single', points: 2,
      q: 'Was bedeutet es, wenn ein Sortierverfahren **stabil** ist?',
      options: [
        'Es stürzt bei großen Datenmengen nicht ab',
        'Elemente mit gleichem Schlüssel behalten ihre ursprüngliche Reihenfolge',
        'Es benötigt keinen zusätzlichen Speicher',
        'Die Laufzeit ist immer gleich'
      ],
      correct: 1
    },

    /* ---------- Rekursion ---------- */
    {
      id: 'ga2-rek-01', cat: 'ga2', topic: 'rekursion', type: 'input', numeric: true, points: 2,
      q: 'Welchen Wert liefert `f(5)`?\n\n```\nFUNKTION f(n)\n    WENN n <= 1 DANN RÜCKGABE 1\n    RÜCKGABE n * f(n - 1)\nENDE FUNKTION\n```',
      answers: ['120'],
      explanation: 'Fakultät: 5 · 4 · 3 · 2 · 1 = **120**.'
    },
    {
      id: 'ga2-rek-02', cat: 'ga2', topic: 'rekursion', type: 'input', numeric: true, points: 3,
      q: 'Welchen Wert liefert `g(4711)`?\n\n```\nFUNKTION g(n)\n    WENN n = 0 DANN RÜCKGABE 0\n    RÜCKGABE (n MOD 10) + g(n DIV 10)\nENDE FUNKTION\n```',
      answers: ['13'],
      explanation: 'Quersumme: 1 + 1 + 7 + 4 = **13**.'
    },
    {
      id: 'ga2-rek-03', cat: 'ga2', topic: 'rekursion', type: 'input', numeric: true, points: 3,
      q: 'Wie oft wird `fib` insgesamt aufgerufen, wenn `fib(4)` berechnet wird (inklusive des ersten Aufrufs)?\n\n```\nFUNKTION fib(n)\n    WENN n < 2 DANN RÜCKGABE n\n    RÜCKGABE fib(n - 1) + fib(n - 2)\nENDE FUNKTION\n```',
      answers: ['9'],
      explanation: 'Aufrufe: fib(4) → fib(3), fib(2); fib(3) → fib(2), fib(1); jedes fib(2) → fib(1), fib(0). Gesamt 1 + 2 + 4 + 2 = **9**. Daher ist naive Rekursion hier ineffizient (exponentiell).'
    },
    {
      id: 'ga2-rek-04', cat: 'ga2', topic: 'rekursion', type: 'single', points: 2,
      q: 'Was passiert typischerweise, wenn einer rekursiven Funktion die **Abbruchbedingung fehlt**?',
      options: ['Die Funktion gibt 0 zurück', 'Es kommt zu einem Stapelüberlauf (Stack Overflow)', 'Der Compiler optimiert die Rekursion weg', 'Die Funktion wird iterativ ausgeführt'],
      correct: 1
    },
    {
      id: 'ga2-rek-05', cat: 'ga2', topic: 'rekursion', type: 'free', code: true, points: 6,
      title: 'Potenz rekursiv',
      q: 'Schreiben Sie eine **rekursive** Funktion `potenz(basis, exponent)` für ganzzahlige Exponenten ≥ 0. Nennen Sie außerdem **einen Nachteil** von Rekursion gegenüber Iteration.',
      solution: '```\nFUNKTION potenz(basis, exponent)\n    WENN exponent = 0 DANN\n        RÜCKGABE 1\n    ENDE WENN\n    RÜCKGABE basis * potenz(basis, exponent - 1)\nENDE FUNKTION\n```\n\n**Nachteil:** Jeder Aufruf belegt Speicher auf dem Stack → höherer Speicherbedarf, Gefahr eines Stack Overflows, oft langsamer durch Aufruf-Overhead.'
    },

    /* ---------- OOP ---------- */
    {
      id: 'ga2-oop-01', cat: 'ga2', topic: 'oop', type: 'input', points: 3,
      q: 'Was gibt das folgende Java-Programm aus?\n\n```\nclass Tier {\n    String laut() { return "..."; }\n}\nclass Hund extends Tier {\n    @Override\n    String laut() { return "Wuff"; }\n}\n\nTier t = new Hund();\nSystem.out.println(t.laut());\n```',
      answers: ['Wuff'],
      explanation: '**Polymorphie / dynamisches Binden:** Entscheidend ist der Laufzeittyp (`Hund`), nicht der deklarierte Typ (`Tier`).'
    },
    {
      id: 'ga2-oop-02', cat: 'ga2', topic: 'oop', type: 'single', points: 2,
      q: 'Was versteht man unter **Datenkapselung**?',
      options: [
        'Attribute werden privat gehalten und nur über definierte Methoden (Getter/Setter) zugänglich gemacht',
        'Eine Klasse erbt von mehreren Klassen',
        'Objekte werden in einer Datenbank gespeichert',
        'Methoden mit gleichem Namen und verschiedenen Parametern'
      ],
      correct: 0
    },
    {
      id: 'ga2-oop-03', cat: 'ga2', topic: 'oop', type: 'single', points: 2,
      q: 'Welche Aussage über eine **abstrakte Klasse** ist richtig?',
      options: [
        'Von ihr können direkt Objekte erzeugt werden',
        'Sie kann nicht instanziiert werden und kann abstrakte sowie konkrete Methoden enthalten',
        'Sie darf keine Attribute besitzen',
        'Sie darf keine Unterklassen haben'
      ],
      correct: 1
    },
    {
      id: 'ga2-oop-04', cat: 'ga2', topic: 'oop', type: 'single', points: 2,
      q: 'Eine Klasse besitzt `berechne(int a)` und `berechne(int a, int b)`. Wie nennt man das?',
      options: ['Überschreiben (Overriding)', 'Überladen (Overloading)', 'Vererbung', 'Kapselung'],
      correct: 1,
      explanation: 'Überladen: gleicher Name, unterschiedliche Parameterliste (in derselben Klasse). Überschreiben: Unterklasse ersetzt eine geerbte Methode mit gleicher Signatur.'
    },
    {
      id: 'ga2-oop-05', cat: 'ga2', topic: 'oop', type: 'multi', points: 3,
      q: 'Welche Aussagen zu **Interfaces** (z. B. in Java/C#) sind richtig?',
      options: [
        'Eine Klasse kann mehrere Interfaces implementieren.',
        'Ein Interface definiert einen Vertrag (Methodensignaturen), den implementierende Klassen erfüllen müssen.',
        'Von einem Interface kann man direkt ein Objekt mit `new` erzeugen.',
        'Interfaces fördern lose Kopplung.'
      ],
      correct: [0, 1, 3]
    },
    {
      id: 'ga2-oop-06', cat: 'ga2', topic: 'oop', type: 'input', numeric: true, points: 3,
      q: 'Welcher Wert wird ausgegeben?\n\n```\nclass Zaehler {\n    static int anzahl = 0;\n    Zaehler() { anzahl++; }\n}\n\nnew Zaehler();\nnew Zaehler();\nZaehler z = new Zaehler();\nSystem.out.println(Zaehler.anzahl);\n```',
      answers: ['3'],
      explanation: 'Ein `static`-Attribut gehört zur Klasse, nicht zum Objekt – alle Instanzen teilen sich denselben Zähler.'
    },
    {
      id: 'ga2-oop-07', cat: 'ga2', topic: 'oop', type: 'free', code: true, points: 8,
      title: 'Klasse Konto',
      q: 'Implementieren Sie (Java, C# oder Pseudocode) eine Klasse **Konto** mit\n\n- privaten Attributen `iban` und `kontostand`\n- Konstruktor mit IBAN (Kontostand startet bei 0)\n- `einzahlen(betrag)` – nur positive Beträge\n- `abheben(betrag)` – wirft eine Exception, wenn der Kontostand nicht ausreicht\n- Getter für den Kontostand',
      solution: '```\npublic class Konto {\n    private final String iban;\n    private double kontostand;\n\n    public Konto(String iban) {\n        this.iban = iban;\n        this.kontostand = 0;\n    }\n\n    public void einzahlen(double betrag) {\n        if (betrag <= 0) throw new IllegalArgumentException("Betrag muss positiv sein");\n        kontostand += betrag;\n    }\n\n    public void abheben(double betrag) {\n        if (betrag <= 0) throw new IllegalArgumentException("Betrag muss positiv sein");\n        if (betrag > kontostand) throw new IllegalStateException("Deckung nicht ausreichend");\n        kontostand -= betrag;\n    }\n\n    public double getKontostand() { return kontostand; }\n}\n```',
      explanation: 'Für Geldbeträge in echter Software besser `BigDecimal` bzw. `decimal` statt `double` verwenden.'
    },
    {
      id: 'ga2-oop-08', cat: 'ga2', topic: 'oop', type: 'single', points: 2,
      q: 'Was ist der Unterschied zwischen **Klasse** und **Objekt**?',
      options: [
        'Es gibt keinen Unterschied',
        'Eine Klasse ist der Bauplan, ein Objekt eine konkrete Instanz davon',
        'Ein Objekt ist der Bauplan, eine Klasse die Instanz',
        'Klassen existieren nur zur Laufzeit'
      ],
      correct: 1
    },

    /* ---------- SQL ---------- */
    {
      id: 'ga2-sql-01', cat: 'ga2', topic: 'sql', type: 'free', code: true, points: 4,
      q: SCHEMA + '\nGeben Sie die **Namen aller Kunden aus Berlin** alphabetisch sortiert aus.',
      solution: '```\nSELECT Name\nFROM Kunde\nWHERE Ort = \'Berlin\'\nORDER BY Name ASC;\n```'
    },
    {
      id: 'ga2-sql-02', cat: 'ga2', topic: 'sql', type: 'free', code: true, points: 6,
      q: SCHEMA + '\nErmitteln Sie für **jeden Kunden** (Name) die **Anzahl seiner Bestellungen** – auch Kunden **ohne** Bestellung sollen mit 0 erscheinen.',
      solution: '```\nSELECT k.Name, COUNT(b.BestellID) AS AnzahlBestellungen\nFROM Kunde k\nLEFT JOIN Bestellung b ON b.KundeID = k.KundeID\nGROUP BY k.KundeID, k.Name;\n```',
      explanation: '`LEFT JOIN` behält Kunden ohne Bestellung. `COUNT(b.BestellID)` zählt NULL nicht mit → 0. `COUNT(*)` würde fälschlich 1 liefern.'
    },
    {
      id: 'ga2-sql-03', cat: 'ga2', topic: 'sql', type: 'free', code: true, points: 6,
      q: SCHEMA + '\nGeben Sie alle Kunden (Name) aus, deren **Gesamtumsatz** (Summe aller Bestellbeträge) **über 1.000 €** liegt, absteigend nach Umsatz.',
      solution: '```\nSELECT k.Name, SUM(b.Betrag) AS Umsatz\nFROM Kunde k\nJOIN Bestellung b ON b.KundeID = k.KundeID\nGROUP BY k.KundeID, k.Name\nHAVING SUM(b.Betrag) > 1000\nORDER BY Umsatz DESC;\n```'
    },
    {
      id: 'ga2-sql-04', cat: 'ga2', topic: 'sql', type: 'free', code: true, points: 4,
      q: SCHEMA + '\nErhöhen Sie den **Preis aller Artikel** mit einem **Bestand unter 10** um **5 %**.',
      solution: '```\nUPDATE Artikel\nSET Preis = Preis * 1.05\nWHERE Bestand < 10;\n```'
    },
    {
      id: 'ga2-sql-05', cat: 'ga2', topic: 'sql', type: 'free', code: true, points: 5,
      q: SCHEMA + '\nGeben Sie alle Artikel aus, deren Preis **über dem Durchschnittspreis** aller Artikel liegt.',
      solution: '```\nSELECT ArtikelID, Bezeichnung, Preis\nFROM Artikel\nWHERE Preis > (SELECT AVG(Preis) FROM Artikel);\n```',
      explanation: 'Aggregatfunktionen dürfen nicht direkt im `WHERE` stehen – daher die Unterabfrage.'
    },
    {
      id: 'ga2-sql-06', cat: 'ga2', topic: 'sql', type: 'free', code: true, points: 6,
      q: SCHEMA + '\nErstellen Sie die Tabelle **Position** mit passenden Datentypen, zusammengesetztem Primärschlüssel und Fremdschlüsseln. Die Menge muss größer als 0 sein.',
      solution: '```\nCREATE TABLE Position (\n    BestellID INT NOT NULL,\n    ArtikelID INT NOT NULL,\n    Menge     INT NOT NULL CHECK (Menge > 0),\n    PRIMARY KEY (BestellID, ArtikelID),\n    FOREIGN KEY (BestellID) REFERENCES Bestellung(BestellID),\n    FOREIGN KEY (ArtikelID) REFERENCES Artikel(ArtikelID)\n);\n```'
    },
    {
      id: 'ga2-sql-07', cat: 'ga2', topic: 'sql', type: 'free', code: true, points: 6,
      q: SCHEMA + '\nGeben Sie für die Bestellung mit `BestellID = 1001` alle Artikel mit Bezeichnung, Menge und **Positionswert** (Menge × Preis) aus.',
      solution: '```\nSELECT a.Bezeichnung, p.Menge, p.Menge * a.Preis AS Positionswert\nFROM Position p\nJOIN Artikel a ON a.ArtikelID = p.ArtikelID\nWHERE p.BestellID = 1001;\n```'
    },
    {
      id: 'ga2-sql-08', cat: 'ga2', topic: 'sql', type: 'single', points: 2,
      q: 'Was ist der Unterschied zwischen `WHERE` und `HAVING`?',
      options: [
        'Es gibt keinen Unterschied',
        '`WHERE` filtert Zeilen vor der Gruppierung, `HAVING` filtert Gruppen nach der Gruppierung',
        '`HAVING` filtert Zeilen vor der Gruppierung, `WHERE` danach',
        '`HAVING` darf nur mit `ORDER BY` verwendet werden'
      ],
      correct: 1
    },
    {
      id: 'ga2-sql-09', cat: 'ga2', topic: 'sql', type: 'single', points: 2,
      q: 'Welcher JOIN liefert **nur** die Datensätze, die in **beiden** Tabellen einen passenden Partner haben?',
      options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL OUTER JOIN'],
      correct: 2
    },
    {
      id: 'ga2-sql-10', cat: 'ga2', topic: 'sql', type: 'single', points: 2,
      q: 'Welcher Befehl entfernt eine Tabelle **inklusive ihrer Struktur** aus der Datenbank?',
      options: ['DELETE FROM Tabelle', 'TRUNCATE TABLE Tabelle', 'DROP TABLE Tabelle', 'REMOVE TABLE Tabelle'],
      correct: 2,
      explanation: '`DELETE` löscht Zeilen (auch gefiltert), `TRUNCATE` leert die Tabelle komplett, `DROP` entfernt die Tabelle selbst (DDL).'
    },
    {
      id: 'ga2-sql-11', cat: 'ga2', topic: 'sql', type: 'single', points: 2,
      q: 'Eine Spalte `Telefon` enthält bei 3 von 10 Zeilen `NULL`. Was liefert `SELECT COUNT(Telefon) FROM Kunde;`?',
      options: ['10', '7', '3', 'NULL'],
      correct: 1,
      explanation: '`COUNT(spalte)` ignoriert NULL-Werte, `COUNT(*)` zählt alle Zeilen.'
    },
    {
      id: 'ga2-sql-12', cat: 'ga2', topic: 'sql', type: 'free', code: true, points: 4,
      q: SCHEMA + '\nLöschen Sie alle Kunden, die **noch nie bestellt** haben.',
      solution: '```\nDELETE FROM Kunde\nWHERE KundeID NOT IN (SELECT KundeID FROM Bestellung);\n```\n\nAlternativ mit `NOT EXISTS`:\n\n```\nDELETE FROM Kunde k\nWHERE NOT EXISTS (SELECT 1 FROM Bestellung b WHERE b.KundeID = k.KundeID);\n```'
    },

    /* ---------- Datenbanken & Normalisierung ---------- */
    {
      id: 'ga2-db-01', cat: 'ga2', topic: 'datenbanken', type: 'single', points: 2,
      q: 'Eine Tabelle enthält die Spalte `Telefonnummern` mit dem Wert „0301234, 0175987“. Gegen welche Normalform wird verstoßen?',
      options: ['1. Normalform', '2. Normalform', '3. Normalform', 'Boyce-Codd-Normalform'],
      correct: 0,
      explanation: '1. NF: Alle Attributwerte müssen **atomar** sein (keine Listen, keine Wiederholungsgruppen).'
    },
    {
      id: 'ga2-db-02', cat: 'ga2', topic: 'datenbanken', type: 'single', points: 2,
      q: 'Tabelle `Position(BestellNr, ArtikelNr, Menge, Artikelbezeichnung)` mit Primärschlüssel (BestellNr, ArtikelNr). Gegen welche Normalform verstößt `Artikelbezeichnung`?',
      options: ['1. NF', '2. NF', '3. NF', 'Gegen keine'],
      correct: 1,
      explanation: '`Artikelbezeichnung` hängt nur von einem **Teil** des Schlüssels (ArtikelNr) ab → partielle Abhängigkeit → Verstoß gegen die 2. NF.'
    },
    {
      id: 'ga2-db-03', cat: 'ga2', topic: 'datenbanken', type: 'single', points: 2,
      q: 'Tabelle `Mitarbeiter(PersNr, Name, AbtNr, AbtName)`. `AbtName` hängt von `AbtNr` ab. Gegen welche Normalform wird verstoßen?',
      options: ['1. NF', '2. NF', '3. NF', 'Gegen keine'],
      correct: 2,
      explanation: 'Transitive Abhängigkeit: PersNr → AbtNr → AbtName. Lösung: eigene Tabelle `Abteilung(AbtNr, AbtName)`.'
    },
    {
      id: 'ga2-db-04', cat: 'ga2', topic: 'datenbanken', type: 'single', points: 2,
      q: 'Wie wird eine **n:m-Beziehung** im relationalen Modell umgesetzt?',
      options: [
        'Fremdschlüssel in einer der beiden Tabellen',
        'Durch eine Zwischentabelle (Beziehungstabelle) mit beiden Fremdschlüsseln',
        'Durch Zusammenführen beider Tabellen',
        'n:m-Beziehungen sind nicht darstellbar'
      ],
      correct: 1
    },
    {
      id: 'ga2-db-05', cat: 'ga2', topic: 'datenbanken', type: 'multi', points: 3,
      q: 'Wofür stehen die Buchstaben von **ACID** bei Transaktionen?',
      options: ['Atomarität', 'Konsistenz', 'Isolation', 'Dauerhaftigkeit', 'Indexierung', 'Asynchronität'],
      correct: [0, 1, 2, 3]
    },
    {
      id: 'ga2-db-06', cat: 'ga2', topic: 'datenbanken', type: 'free', points: 8,
      title: 'Normalisierung Rechnung',
      q: 'Bringen Sie folgende Tabelle in die **3. Normalform**. Geben Sie die Tabellen mit Primär- (PK) und Fremdschlüsseln (FK) an.\n\n```\nRechnung(RechnungNr, Datum, KundeNr, KundeName, KundeOrt,\n         ArtikelNr, Bezeichnung, Einzelpreis, Menge)\n```\n\nEine Rechnung kann mehrere Artikel enthalten.',
      solution: '```\nKunde(KundeNr [PK], KundeName, KundeOrt)\nRechnung(RechnungNr [PK], Datum, KundeNr [FK])\nArtikel(ArtikelNr [PK], Bezeichnung, Einzelpreis)\nRechnungsposition(RechnungNr [PK, FK], ArtikelNr [PK, FK], Menge)\n```',
      explanation: 'Hinweis: Oft wird der Einzelpreis **zusätzlich** in der Position gespeichert, um den Preis zum Rechnungszeitpunkt festzuhalten (historisierter Preis) – das ist fachlich begründet und kein Normalisierungsfehler.'
    },
    {
      id: 'ga2-db-07', cat: 'ga2', topic: 'datenbanken', type: 'single', points: 2,
      q: 'Was stellt **referentielle Integrität** sicher?',
      options: [
        'Dass jede Tabelle einen Index besitzt',
        'Dass ein Fremdschlüssel nur auf existierende Primärschlüsselwerte verweist',
        'Dass Daten verschlüsselt gespeichert werden',
        'Dass keine NULL-Werte vorkommen'
      ],
      correct: 1
    },
    {
      id: 'ga2-db-08', cat: 'ga2', topic: 'datenbanken', type: 'single', points: 2,
      q: 'Im ER-Modell steht zwischen „Abteilung“ und „Mitarbeiter“ die Kardinalität **1:n**. Wo wird im relationalen Modell der Fremdschlüssel platziert?',
      options: ['In der Tabelle Abteilung', 'In der Tabelle Mitarbeiter', 'In einer Zwischentabelle', 'In beiden Tabellen'],
      correct: 1,
      explanation: 'Der Fremdschlüssel kommt immer auf die **n-Seite**: Mitarbeiter(…, AbtNr → Abteilung).'
    },

    /* ---------- Schnittstellen & Datenformate ---------- */
    {
      id: 'ga2-if-01', cat: 'ga2', topic: 'schnittstellen', type: 'single', points: 2,
      q: 'Was bedeutet der HTTP-Statuscode **404**?',
      options: ['Interner Serverfehler', 'Nicht autorisiert', 'Ressource nicht gefunden', 'Erfolgreich erstellt'],
      correct: 2
    },
    {
      id: 'ga2-if-02', cat: 'ga2', topic: 'schnittstellen', type: 'multi', points: 3,
      q: 'Welche HTTP-Statuscodes signalisieren **Erfolg**?',
      options: ['200 OK', '201 Created', '204 No Content', '301 Moved Permanently', '403 Forbidden', '500 Internal Server Error'],
      correct: [0, 1, 2],
      explanation: '2xx Erfolg · 3xx Umleitung · 4xx Clientfehler · 5xx Serverfehler.'
    },
    {
      id: 'ga2-if-03', cat: 'ga2', topic: 'schnittstellen', type: 'single', points: 2,
      q: 'Welcher Ausdruck ist **gültiges JSON**?',
      options: [
        "`{'name': 'Anna', 'alter': 25}`",
        '`{name: "Anna", alter: 25}`',
        '`{"name": "Anna", "alter": 25}`',
        '`{"name": "Anna", "alter": 25,}`'
      ],
      correct: 2,
      explanation: 'JSON verlangt doppelte Anführungszeichen für Schlüssel und Strings und erlaubt kein abschließendes Komma.'
    },
    {
      id: 'ga2-if-04', cat: 'ga2', topic: 'schnittstellen', type: 'single', points: 2,
      q: 'Welche HTTP-Methode wird in einer REST-API typischerweise zum **Anlegen** einer neuen Ressource verwendet?',
      options: ['GET', 'POST', 'DELETE', 'HEAD'],
      correct: 1
    },
    {
      id: 'ga2-if-05', cat: 'ga2', topic: 'schnittstellen', type: 'single', points: 2,
      q: 'Wann ist ein XML-Dokument **valide** (gültig)?',
      options: [
        'Wenn es wohlgeformt ist',
        'Wenn es wohlgeformt ist und zusätzlich einer DTD bzw. einem XML-Schema entspricht',
        'Wenn es weniger als 1 MB groß ist',
        'Wenn es UTF-8-kodiert ist'
      ],
      correct: 1
    },
    {
      id: 'ga2-if-06', cat: 'ga2', topic: 'schnittstellen', type: 'free', code: true, points: 6,
      title: 'JSON modellieren',
      q: 'Eine Bestellung hat eine Bestellnummer (1001), ein Datum (2026-05-14), einen Kunden (Nr. 42, Name „Lea Brandt“) und zwei Positionen (Artikel 7 „Maus“, Menge 2, Preis 19,99 € und Artikel 12 „Tastatur“, Menge 1, Preis 49,90 €).\n\nStellen Sie die Bestellung als **JSON** dar.',
      solution: '```\n{\n  "bestellNr": 1001,\n  "datum": "2026-05-14",\n  "kunde": { "nr": 42, "name": "Lea Brandt" },\n  "positionen": [\n    { "artikelNr": 7,  "bezeichnung": "Maus",     "menge": 2, "preis": 19.99 },\n    { "artikelNr": 12, "bezeichnung": "Tastatur", "menge": 1, "preis": 49.90 }\n  ]\n}\n```',
      explanation: 'Zahlen ohne Anführungszeichen und mit Punkt als Dezimaltrennzeichen; Listen als Array `[ ]`, verschachtelte Objekte mit `{ }`.'
    },
    {
      id: 'ga2-if-07', cat: 'ga2', topic: 'schnittstellen', type: 'single', points: 2,
      q: 'Welche HTTP-Methode ist **idempotent** und ersetzt eine Ressource vollständig?',
      options: ['POST', 'PUT', 'PATCH', 'CONNECT'],
      correct: 1,
      explanation: 'Idempotent: Mehrfaches Ausführen hat dieselbe Wirkung wie einmaliges. GET, PUT, DELETE sind idempotent, POST nicht.'
    },

    /* ---------- IT-Rechnen ---------- */
    {
      id: 'ga2-re-01', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 3,
      q: 'Wie viele **Byte** belegt ein unkomprimiertes Bild mit **1920 × 1080** Pixeln bei **24 Bit** Farbtiefe?',
      answers: ['6220800'], unit: 'Byte',
      explanation: '1920 · 1080 = 2.073.600 Pixel · 3 Byte = **6.220.800 Byte** ≈ 5,93 MiB.'
    },
    {
      id: 'ga2-re-02', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 3,
      q: 'Wie viele **Sekunden** dauert die Übertragung einer **500 MB** großen Datei über eine Leitung mit **100 Mbit/s** (ohne Overhead, Dezimalpräfixe)?',
      answers: ['40'], unit: 's',
      explanation: '500 MB · 8 = 4.000 Mbit; 4.000 Mbit / 100 Mbit/s = **40 s**.'
    },
    {
      id: 'ga2-re-03', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 2,
      q: 'Wandeln Sie die Binärzahl **1011 0110₂** in eine Dezimalzahl um.',
      answers: ['182'],
      explanation: '128 + 32 + 16 + 4 + 2 = **182**.'
    },
    {
      id: 'ga2-re-04', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 2,
      q: 'Wandeln Sie **0x2F** (hexadezimal) in eine Dezimalzahl um.',
      answers: ['47'],
      explanation: '2 · 16 + 15 = **47**.'
    },
    {
      id: 'ga2-re-05', cat: 'ga2', topic: 'rechnen', type: 'input', points: 3,
      q: 'Stellen Sie **−5** als 8-Bit-Zahl im **Zweierkomplement** dar.',
      answers: ['11111011'], placeholder: '8 Bit, z. B. 00000000',
      explanation: '+5 = 00000101 → invertieren 11111010 → +1 = **11111011**.'
    },
    {
      id: 'ga2-re-06', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 2,
      q: 'Wie viele **nutzbare Hostadressen** hat ein IPv4-Subnetz mit dem Präfix **/26**?',
      answers: ['62'],
      explanation: '32 − 26 = 6 Hostbits → 2⁶ = 64 Adressen − Netz- und Broadcastadresse = **62**.'
    },
    {
      id: 'ga2-re-07', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 2,
      q: 'Wie viele **MiB** sind **2 GiB**?',
      answers: ['2048'], unit: 'MiB',
      explanation: '1 GiB = 1024 MiB (Binärpräfixe, Faktor 2¹⁰).'
    },
    {
      id: 'ga2-re-08', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 3,
      q: 'Ein Datensatz besteht aus: ID (4 Byte), Name (50 Zeichen à 1 Byte), Geburtsdatum (8 Byte), Gehalt (8 Byte). Wie viele **KB** (1 KB = 1000 Byte) benötigen **25.000** Datensätze?',
      answers: ['1750'], unit: 'KB',
      explanation: '4 + 50 + 8 + 8 = 70 Byte · 25.000 = 1.750.000 Byte = **1.750 KB**.'
    },
    {
      id: 'ga2-re-09', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 2,
      q: 'Wie viele verschiedene Werte lassen sich mit **12 Bit** darstellen?',
      answers: ['4096'],
      explanation: '2¹² = **4096**.'
    }
  );
})();
