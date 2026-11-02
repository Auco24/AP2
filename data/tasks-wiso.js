/* WiSo – Wirtschafts- und Sozialkunde
 * Hinweis: Rechtsstand prüfen – Gesetze und Beitragssätze ändern sich. */
window.AP2_TASKS.push(
  /* ---------- Berufsausbildung & Jugendschutz ---------- */
  {
    id: 'wiso-aus-01', cat: 'wiso', topic: 'ausbildung', type: 'single', points: 2,
    q: 'Wie lange dauert die **Probezeit** in einem Berufsausbildungsverhältnis nach BBiG?',
    options: ['Genau 6 Monate', 'Mindestens 1 Monat, höchstens 4 Monate', 'Höchstens 2 Wochen', 'Sie ist frei vereinbar'],
    correct: 1
  },
  {
    id: 'wiso-aus-02', cat: 'wiso', topic: 'ausbildung', type: 'single', points: 2,
    q: 'Ein Auszubildender möchte **nach der Probezeit** die Ausbildung beenden, weil er den Beruf wechseln will. Welche Kündigungsfrist gilt?',
    options: ['Keine – jederzeit fristlos', '2 Wochen', '4 Wochen, schriftlich unter Angabe des Grundes', '3 Monate zum Quartalsende'],
    correct: 2,
    explanation: '§ 22 BBiG: Nach der Probezeit kann der Azubi mit 4 Wochen Frist kündigen, wenn er die Ausbildung aufgibt oder sich für einen anderen Beruf ausbilden lassen will. Der Ausbildende kann nach der Probezeit nur fristlos aus wichtigem Grund kündigen.'
  },
  {
    id: 'wiso-aus-03', cat: 'wiso', topic: 'ausbildung', type: 'single', points: 2,
    q: 'Wann **endet** das Ausbildungsverhältnis, wenn der Azubi die Abschlussprüfung **vor** Ablauf der vertraglichen Ausbildungszeit besteht?',
    options: [
      'Am letzten Tag der vertraglichen Ausbildungszeit',
      'Mit Bekanntgabe des Prüfungsergebnisses durch den Prüfungsausschuss',
      'Mit Aushändigung des IHK-Zeugnisses per Post',
      'Am Ende des Kalenderjahres'
    ],
    correct: 1
  },
  {
    id: 'wiso-aus-04', cat: 'wiso', topic: 'ausbildung', type: 'multi', points: 3,
    q: 'Welche Pflichten hat der **Ausbildende** (Ausbildungsbetrieb) nach BBiG?',
    options: [
      'Ausbildungsmittel kostenlos zur Verfügung stellen',
      'Für den Besuch der Berufsschule freistellen',
      'Eine angemessene Vergütung zahlen',
      'Den Azubi nach der Ausbildung unbefristet übernehmen',
      'Ein Zeugnis am Ende der Ausbildung ausstellen'
    ],
    correct: [0, 1, 2, 4],
    explanation: 'Eine Übernahmepflicht gibt es gesetzlich nicht (ggf. tarifvertraglich).'
  },
  {
    id: 'wiso-aus-05', cat: 'wiso', topic: 'ausbildung', type: 'single', points: 2,
    q: 'Eine Auszubildende ist zu Beginn des Kalenderjahres **16 Jahre** alt. Wie viele Werktage Urlaub stehen ihr nach dem **Jugendarbeitsschutzgesetz** mindestens zu?',
    options: ['24 Werktage', '25 Werktage', '27 Werktage', '30 Werktage'],
    correct: 2,
    explanation: '§ 19 JArbSchG: noch nicht 16 → 30 · noch nicht 17 → 27 · noch nicht 18 → 25 Werktage (jeweils zu Beginn des Kalenderjahres).'
  },
  {
    id: 'wiso-aus-06', cat: 'wiso', topic: 'ausbildung', type: 'single', points: 2,
    q: 'Wie hoch ist die **höchstzulässige tägliche Arbeitszeit** für Jugendliche nach JArbSchG im Regelfall?',
    options: ['6 Stunden', '8 Stunden', '9 Stunden', '10 Stunden'],
    correct: 1,
    explanation: 'Grundsatz: 8 Std. täglich und 40 Std. wöchentlich; bei Verkürzung an einzelnen Tagen bis zu 8,5 Std. an den übrigen Tagen.'
  },
  {
    id: 'wiso-aus-07', cat: 'wiso', topic: 'ausbildung', type: 'single', points: 2,
    q: 'Welche Institution ist für Ausbildungsberufe wie Fachinformatiker/-in die **zuständige Stelle** (u. a. Prüfungen, Verzeichnis der Ausbildungsverhältnisse)?',
    options: ['Die Agentur für Arbeit', 'Die Industrie- und Handelskammer (IHK)', 'Das Gewerbeaufsichtsamt', 'Die Berufsschule'],
    correct: 1
  },
  {
    id: 'wiso-aus-08', cat: 'wiso', topic: 'ausbildung', type: 'single', points: 2,
    q: 'Wie wird ein Berufsschultag mit **mehr als fünf Unterrichtsstunden** (à 45 Min.) einmal pro Woche auf die Ausbildungszeit angerechnet?',
    options: ['Gar nicht', 'Mit der tatsächlichen Unterrichtszeit', 'Mit der durchschnittlichen täglichen Ausbildungszeit', 'Pauschal mit 4 Stunden'],
    correct: 2,
    explanation: '§ 15 BBiG: Ein solcher Berufsschultag wird mit der durchschnittlichen täglichen Ausbildungszeit angerechnet (gilt für alle Azubis, auch Volljährige).'
  },

  /* ---------- Arbeitsrecht ---------- */
  {
    id: 'wiso-ar-01', cat: 'wiso', topic: 'arbeitsrecht', type: 'single', points: 2,
    q: 'Wie lange darf die werktägliche Arbeitszeit eines Erwachsenen nach dem **Arbeitszeitgesetz** maximal betragen?',
    options: [
      '8 Stunden, ohne Ausnahme',
      '8 Stunden; bis zu 10 Stunden, wenn innerhalb von 6 Monaten im Durchschnitt 8 Stunden nicht überschritten werden',
      '10 Stunden, ohne Ausgleich',
      '12 Stunden'
    ],
    correct: 1
  },
  {
    id: 'wiso-ar-02', cat: 'wiso', topic: 'arbeitsrecht', type: 'input', numeric: true, points: 2,
    q: 'Eine Mitarbeiterin arbeitet an einem Tag **7 Stunden**. Wie viele Minuten Pause stehen ihr nach ArbZG **mindestens** zu?',
    answers: ['30'], unit: 'Minuten',
    explanation: 'Mehr als 6 bis 9 Stunden: 30 Min. · mehr als 9 Stunden: 45 Min. Pausen können in Abschnitte von mind. 15 Min. aufgeteilt werden.'
  },
  {
    id: 'wiso-ar-03', cat: 'wiso', topic: 'arbeitsrecht', type: 'input', numeric: true, points: 2,
    q: 'Wie viele Stunden **ununterbrochene Ruhezeit** müssen Arbeitnehmer nach Beendigung der täglichen Arbeitszeit grundsätzlich haben?',
    answers: ['11'], unit: 'Stunden'
  },
  {
    id: 'wiso-ar-04', cat: 'wiso', topic: 'arbeitsrecht', type: 'single', points: 2,
    q: 'Wie viele **Arbeitstage** gesetzlicher Mindesturlaub hat ein erwachsener Arbeitnehmer mit einer **5-Tage-Woche** nach BUrlG?',
    options: ['18', '20', '24', '30'],
    correct: 1,
    explanation: 'BUrlG: 24 **Werktage** (Mo–Sa, 6-Tage-Woche) → umgerechnet 24 / 6 · 5 = **20 Arbeitstage**.'
  },
  {
    id: 'wiso-ar-05', cat: 'wiso', topic: 'arbeitsrecht', type: 'single', points: 2,
    q: 'Welche **gesetzliche Grundkündigungsfrist** gilt für Arbeitnehmer nach § 622 BGB (nach der Probezeit)?',
    options: ['2 Wochen', '4 Wochen zum 15. oder zum Ende eines Kalendermonats', '1 Monat zum Monatsende', '3 Monate zum Quartalsende'],
    correct: 1,
    explanation: 'Für den Arbeitgeber verlängert sich die Frist mit zunehmender Betriebszugehörigkeit (ab 2 Jahren). In der Probezeit (max. 6 Monate) gilt eine Frist von 2 Wochen.'
  },
  {
    id: 'wiso-ar-06', cat: 'wiso', topic: 'arbeitsrecht', type: 'multi', points: 3,
    q: 'Welche Personengruppen genießen einen **besonderen Kündigungsschutz**?',
    options: ['Schwangere', 'Schwerbehinderte Menschen', 'Betriebsratsmitglieder', 'Arbeitnehmer in Elternzeit', 'Mitarbeiter im Homeoffice', 'Mitarbeiter mit Dienstwagen'],
    correct: [0, 1, 2, 3]
  },
  {
    id: 'wiso-ar-07', cat: 'wiso', topic: 'arbeitsrecht', type: 'single', points: 2,
    q: 'Welche Funktion hat eine **Abmahnung**?',
    options: [
      'Sie beendet das Arbeitsverhältnis sofort',
      'Sie rügt ein konkretes Fehlverhalten und warnt vor arbeitsrechtlichen Konsequenzen im Wiederholungsfall',
      'Sie ist eine Lohnkürzung',
      'Sie muss von der IHK genehmigt werden'
    ],
    correct: 1,
    explanation: 'Funktionen: Hinweis-/Rüge- und Warnfunktion. Vor einer verhaltensbedingten Kündigung ist i. d. R. eine Abmahnung erforderlich.'
  },
  {
    id: 'wiso-ar-08', cat: 'wiso', topic: 'arbeitsrecht', type: 'single', points: 2,
    q: 'Was enthält ein **qualifiziertes Arbeitszeugnis** zusätzlich zum einfachen Zeugnis?',
    options: ['Angaben zu Leistung und Verhalten', 'Den Grund der Kündigung in jedem Fall', 'Das Gehalt', 'Krankheitstage'],
    correct: 0,
    explanation: 'Einfaches Zeugnis: Art und Dauer der Tätigkeit. Qualifiziertes Zeugnis (auf Verlangen): zusätzlich Leistung und Verhalten. Es muss wohlwollend und wahr sein.'
  },
  {
    id: 'wiso-ar-09', cat: 'wiso', topic: 'arbeitsrecht', type: 'single', points: 2,
    q: 'Ab wann gilt das **Kündigungsschutzgesetz** für einen Arbeitnehmer?',
    options: [
      'Ab dem ersten Arbeitstag in jedem Betrieb',
      'Nach mehr als 6 Monaten Betriebszugehörigkeit in Betrieben mit in der Regel mehr als 10 Arbeitnehmern',
      'Nach 2 Jahren Betriebszugehörigkeit',
      'Nur für Beamte'
    ],
    correct: 1
  },

  /* ---------- Mitbestimmung & Tarifrecht ---------- */
  {
    id: 'wiso-mb-01', cat: 'wiso', topic: 'mitbestimmung', type: 'single', points: 2,
    q: 'Ab welcher Betriebsgröße kann ein **Betriebsrat** gewählt werden?',
    options: [
      'Ab 5 ständigen wahlberechtigten Arbeitnehmern, von denen 3 wählbar sind',
      'Ab 10 Arbeitnehmern',
      'Ab 20 Arbeitnehmern',
      'Ab 50 Arbeitnehmern'
    ],
    correct: 0
  },
  {
    id: 'wiso-mb-02', cat: 'wiso', topic: 'mitbestimmung', type: 'single', points: 2,
    q: 'Für wie viele Jahre wird der **Betriebsrat** regelmäßig gewählt?',
    options: ['1 Jahr', '2 Jahre', '4 Jahre', '5 Jahre'],
    correct: 2,
    explanation: 'Betriebsrat: 4 Jahre. Jugend- und Auszubildendenvertretung (JAV): 2 Jahre.'
  },
  {
    id: 'wiso-mb-03', cat: 'wiso', topic: 'mitbestimmung', type: 'single', points: 2,
    q: 'Wer ist für die Wahl der **Jugend- und Auszubildendenvertretung (JAV)** wahlberechtigt?',
    options: [
      'Alle Arbeitnehmer des Betriebs',
      'Arbeitnehmer unter 18 Jahren und Auszubildende unter 25 Jahren',
      'Nur Auszubildende im ersten Lehrjahr',
      'Nur der Betriebsrat'
    ],
    correct: 1
  },
  {
    id: 'wiso-mb-04', cat: 'wiso', topic: 'mitbestimmung', type: 'single', points: 2,
    q: 'Der Arbeitgeber will ein **elektronisches Zeiterfassungssystem** einführen, mit dem sich Leistung und Verhalten überwachen lassen. Welches Recht hat der Betriebsrat?',
    options: ['Nur ein Informationsrecht', 'Ein Anhörungsrecht', 'Ein echtes Mitbestimmungsrecht (Zustimmung erforderlich)', 'Gar kein Recht'],
    correct: 2,
    explanation: '§ 87 Abs. 1 Nr. 6 BetrVG: Einführung und Anwendung technischer Einrichtungen zur Überwachung. Ohne Einigung entscheidet die Einigungsstelle.'
  },
  {
    id: 'wiso-mb-05', cat: 'wiso', topic: 'mitbestimmung', type: 'single', points: 2,
    q: 'Was bedeutet die **Friedenspflicht**?',
    options: [
      'Während der Laufzeit eines Tarifvertrags sind Arbeitskämpfe über die darin geregelten Inhalte verboten',
      'Arbeitnehmer dürfen sich im Betrieb nicht streiten',
      'Der Betriebsrat darf nicht streiken',
      'Streiks sind generell verboten'
    ],
    correct: 0
  },
  {
    id: 'wiso-mb-06', cat: 'wiso', topic: 'mitbestimmung', type: 'single', points: 2,
    q: 'Ein Arbeitsvertrag sieht 32 Urlaubstage vor, der geltende Tarifvertrag nur 30. Was gilt?',
    options: ['30 Tage, weil der Tarifvertrag Vorrang hat', '32 Tage – Günstigkeitsprinzip', '24 Werktage nach BUrlG', 'Der Mittelwert, 31 Tage'],
    correct: 1,
    explanation: 'Günstigkeitsprinzip: Abweichungen vom Tarifvertrag sind zulässig, wenn sie für den Arbeitnehmer günstiger sind.'
  },
  {
    id: 'wiso-mb-07', cat: 'wiso', topic: 'mitbestimmung', type: 'single', points: 2,
    q: 'Was wird typischerweise in einem **Manteltarifvertrag** geregelt?',
    options: [
      'Die Höhe der Löhne und Gehälter',
      'Allgemeine Arbeitsbedingungen wie Arbeitszeit, Urlaub, Kündigungsfristen',
      'Die Aktienausgabe des Unternehmens',
      'Die Wahl des Betriebsrats'
    ],
    correct: 1,
    explanation: 'Lohn-/Gehalts- bzw. Entgelttarifvertrag: Höhe der Vergütung. Manteltarifvertrag: allgemeine Arbeitsbedingungen, meist längere Laufzeit.'
  },
  {
    id: 'wiso-mb-08', cat: 'wiso', topic: 'mitbestimmung', type: 'order', points: 3,
    q: 'Bringen Sie den typischen Ablauf einer **Tarifauseinandersetzung** in die richtige Reihenfolge.',
    items: [
      'Kündigung des alten Tarifvertrags',
      'Tarifverhandlungen',
      'Scheitern der Verhandlungen / ggf. Schlichtung',
      'Urabstimmung über Streik',
      'Streik (ggf. Aussperrung)',
      'Neue Verhandlungen und Einigung, zweite Urabstimmung',
      'Abschluss des neuen Tarifvertrags'
    ]
  },

  /* ---------- Sozialversicherung & Entgelt ---------- */
  {
    id: 'wiso-sv-01', cat: 'wiso', topic: 'sozial', type: 'multi', points: 3,
    q: 'Welche Zweige gehören zur **gesetzlichen Sozialversicherung** in Deutschland?',
    options: ['Krankenversicherung', 'Pflegeversicherung', 'Rentenversicherung', 'Arbeitslosenversicherung', 'Unfallversicherung', 'Haftpflichtversicherung'],
    correct: [0, 1, 2, 3, 4]
  },
  {
    id: 'wiso-sv-02', cat: 'wiso', topic: 'sozial', type: 'single', points: 2,
    q: 'Wer zahlt die Beiträge zur **gesetzlichen Unfallversicherung**?',
    options: ['Arbeitnehmer allein', 'Arbeitgeber allein', 'Arbeitgeber und Arbeitnehmer je zur Hälfte', 'Der Staat'],
    correct: 1
  },
  {
    id: 'wiso-sv-03', cat: 'wiso', topic: 'sozial', type: 'single', points: 2,
    q: 'Wer ist **Träger** der gesetzlichen Unfallversicherung für gewerbliche Unternehmen?',
    options: ['Die Krankenkassen', 'Die Berufsgenossenschaften', 'Die Bundesagentur für Arbeit', 'Die Deutsche Rentenversicherung'],
    correct: 1
  },
  {
    id: 'wiso-sv-04', cat: 'wiso', topic: 'sozial', type: 'single', points: 2,
    q: 'Ein Azubi verunglückt auf dem **direkten Weg zur Berufsschule**. Welche Versicherung ist zuständig?',
    options: ['Private Unfallversicherung', 'Gesetzliche Krankenversicherung', 'Gesetzliche Unfallversicherung', 'Keine – Privatsache'],
    correct: 2,
    explanation: 'Wegeunfälle (direkter Weg zur Arbeit/Berufsschule und zurück) sind über die gesetzliche Unfallversicherung abgesichert.'
  },
  {
    id: 'wiso-sv-05', cat: 'wiso', topic: 'sozial', type: 'single', points: 2,
    q: 'Nach welchem Prinzip wird die **gesetzliche Rentenversicherung** finanziert?',
    options: ['Kapitaldeckungsverfahren', 'Umlageverfahren (Generationenvertrag)', 'Ausschließlich aus Steuern', 'Durch Arbeitgeberspenden'],
    correct: 1,
    explanation: 'Die heutigen Beitragszahler finanzieren die Renten der heutigen Rentner.'
  },
  {
    id: 'wiso-sv-06', cat: 'wiso', topic: 'sozial', type: 'single', points: 2,
    q: 'Welcher der folgenden Posten wird **nicht** vom Bruttogehalt eines Arbeitnehmers abgezogen?',
    options: ['Lohnsteuer', 'Solidaritätszuschlag (falls anfallend)', 'Umsatzsteuer', 'Rentenversicherungsbeitrag (Arbeitnehmeranteil)'],
    correct: 2,
    explanation: 'Die Umsatzsteuer fällt beim Kauf von Waren/Dienstleistungen an, nicht beim Gehalt.'
  },
  {
    id: 'wiso-sv-07', cat: 'wiso', topic: 'sozial', type: 'input', numeric: true, points: 3,
    q: 'Ein Arbeitnehmer verdient **3.000 € brutto**. Die Abzüge betragen: Lohnsteuer 310 €, Sozialversicherung (AN-Anteil) gesamt 21 %. Kirchensteuer und Soli fallen nicht an.\n\nWie hoch ist das **Nettogehalt**?',
    answers: ['2060'], unit: '€', tolerance: 0.01,
    explanation: 'SV = 3.000 € · 0,21 = 630 €. Netto = 3.000 − 310 − 630 = **2.060 €**.'
  },

  /* ---------- Unternehmen & Rechtsformen ---------- */
  {
    id: 'wiso-un-01', cat: 'wiso', topic: 'unternehmen', type: 'single', points: 2,
    q: 'Wie hoch ist das **Mindeststammkapital** einer GmbH?',
    options: ['1 €', '12.500 €', '25.000 €', '50.000 €'],
    correct: 2,
    explanation: 'GmbH: 25.000 € (mind. die Hälfte bei Anmeldung eingezahlt). UG (haftungsbeschränkt): ab 1 €. AG: Grundkapital 50.000 €.'
  },
  {
    id: 'wiso-un-02', cat: 'wiso', topic: 'unternehmen', type: 'single', points: 2,
    q: 'Wie haftet ein **Kommanditist** in einer KG?',
    options: ['Unbeschränkt mit seinem Privatvermögen', 'Nur bis zur Höhe seiner Einlage', 'Gar nicht', 'Gesamtschuldnerisch mit dem Komplementär'],
    correct: 1,
    explanation: 'Komplementär: unbeschränkt, unmittelbar, solidarisch. Kommanditist: beschränkt auf die Einlage, keine Geschäftsführungsbefugnis.'
  },
  {
    id: 'wiso-un-03', cat: 'wiso', topic: 'unternehmen', type: 'single', points: 2,
    q: 'Wie haften die Gesellschafter einer **OHG**?',
    options: ['Nur mit ihrer Einlage', 'Unbeschränkt, unmittelbar und solidarisch', 'Nur die Gesellschaft haftet', 'Nur der Geschäftsführer haftet'],
    correct: 1
  },
  {
    id: 'wiso-un-04', cat: 'wiso', topic: 'unternehmen', type: 'single', points: 2,
    q: 'Welche Handlung darf ein **Prokurist** ohne besondere Befugnis **nicht** vornehmen?',
    options: ['Mitarbeiter einstellen', 'Einen Kredit aufnehmen', 'Ein Betriebsgrundstück verkaufen', 'Waren einkaufen'],
    correct: 2,
    explanation: '§ 49 HGB: Veräußerung und Belastung von Grundstücken nur mit besonderer Befugnis. Außerdem nie: Bilanz unterschreiben, Insolvenz anmelden, Prokura erteilen.'
  },
  {
    id: 'wiso-un-05', cat: 'wiso', topic: 'unternehmen', type: 'single', points: 2,
    q: 'Ein Unternehmen will mit einem **festen Budget** von 50.000 € einen **möglichst großen** Werbeeffekt erzielen. Welches ökonomische Prinzip liegt vor?',
    options: ['Minimalprinzip', 'Maximalprinzip', 'Optimumprinzip', 'Solidaritätsprinzip'],
    correct: 1,
    explanation: 'Maximalprinzip: gegebene Mittel → maximales Ergebnis. Minimalprinzip: gegebenes Ziel → minimale Mittel.'
  },
  {
    id: 'wiso-un-06', cat: 'wiso', topic: 'unternehmen', type: 'single', points: 2,
    q: 'Eine Organisationsform mit **eindeutigen Weisungswegen**, ergänzt um **beratende Stellen ohne Weisungsbefugnis** (z. B. Rechtsabteilung), heißt …',
    options: ['Einliniensystem', 'Mehrliniensystem', 'Stabliniensystem', 'Matrixorganisation'],
    correct: 2
  },
  {
    id: 'wiso-un-07', cat: 'wiso', topic: 'unternehmen', type: 'single', points: 2,
    q: 'Welche Rechtsform ist eine **Kapitalgesellschaft**?',
    options: ['OHG', 'KG', 'GmbH', 'Einzelunternehmen'],
    correct: 2
  },

  /* ---------- Rechtsgeschäfte & Verträge ---------- */
  {
    id: 'wiso-ve-01', cat: 'wiso', topic: 'vertrag', type: 'single', points: 2,
    q: 'Ein **15-Jähriger** kauft ohne Zustimmung der Eltern ein Smartphone für 600 € auf Raten. Wie ist der Vertrag rechtlich zu beurteilen?',
    options: [
      'Er ist von Anfang an gültig',
      'Er ist schwebend unwirksam, bis die Eltern zustimmen oder ablehnen',
      'Er ist nichtig',
      'Er ist anfechtbar wegen Irrtums'
    ],
    correct: 1,
    explanation: '7- bis 17-Jährige sind beschränkt geschäftsfähig. Ratenkäufe fallen nicht unter den Taschengeldparagraphen (§ 110 BGB).'
  },
  {
    id: 'wiso-ve-02', cat: 'wiso', topic: 'vertrag', type: 'single', points: 2,
    q: 'Ab welchem Alter ist eine Person **voll geschäftsfähig**?',
    options: ['Ab 7 Jahren', 'Ab 14 Jahren', 'Ab 16 Jahren', 'Ab 18 Jahren'],
    correct: 3
  },
  {
    id: 'wiso-ve-03', cat: 'wiso', topic: 'vertrag', type: 'single', points: 2,
    q: 'Wodurch kommt ein **Kaufvertrag** zustande?',
    options: [
      'Durch zwei übereinstimmende Willenserklärungen (Antrag und Annahme)',
      'Erst durch die Bezahlung',
      'Erst durch die Übergabe der Ware',
      'Nur durch einen schriftlichen Vertrag'
    ],
    correct: 0
  },
  {
    id: 'wiso-ve-04', cat: 'wiso', topic: 'vertrag', type: 'single', points: 2,
    q: 'Eine gekaufte neue Grafikkarte ist defekt. Welches Recht muss der Käufer **zuerst** geltend machen?',
    options: ['Rücktritt vom Vertrag', 'Minderung des Kaufpreises', 'Nacherfüllung (Nachbesserung oder Ersatzlieferung)', 'Schadensersatz'],
    correct: 2,
    explanation: 'Vorrang der Nacherfüllung. Erst wenn sie fehlschlägt/verweigert wird: Rücktritt oder Minderung, ggf. Schadensersatz.'
  },
  {
    id: 'wiso-ve-05', cat: 'wiso', topic: 'vertrag', type: 'single', points: 2,
    q: 'Wie lange beträgt die gesetzliche **Gewährleistungsfrist** beim Kauf neuer Sachen?',
    options: ['6 Monate', '1 Jahr', '2 Jahre', '3 Jahre'],
    correct: 2
  },
  {
    id: 'wiso-ve-06', cat: 'wiso', topic: 'vertrag', type: 'single', points: 2,
    q: 'Ein Softwarehaus verpflichtet sich, eine **lauffähige App nach Pflichtenheft** zu liefern, die vom Kunden abgenommen wird. Welcher Vertragstyp liegt vor?',
    options: ['Dienstvertrag', 'Werkvertrag', 'Mietvertrag', 'Leihvertrag'],
    correct: 1,
    explanation: 'Werkvertrag: Ein **Erfolg** ist geschuldet (Abnahme). Dienstvertrag: Nur die **Tätigkeit** ist geschuldet (z. B. Beratung nach Stunden).'
  },
  {
    id: 'wiso-ve-07', cat: 'wiso', topic: 'vertrag', type: 'multi', points: 3,
    q: 'Welche Voraussetzungen müssen für einen **Lieferungsverzug** grundsätzlich erfüllt sein?',
    options: [
      'Fälligkeit der Lieferung',
      'Mahnung (entbehrlich, wenn der Termin kalendermäßig bestimmt ist)',
      'Verschulden des Lieferers (für Schadensersatz)',
      'Vorauszahlung durch den Käufer',
      'Schriftform des Kaufvertrags'
    ],
    correct: [0, 1, 2]
  },
  {
    id: 'wiso-ve-08', cat: 'wiso', topic: 'vertrag', type: 'free', points: 6,
    q: 'Erklären Sie den Unterschied zwischen **Besitz** und **Eigentum** und geben Sie je ein Beispiel.',
    solution: '- **Eigentum** = rechtliche Herrschaft über eine Sache (wem sie gehört). Beispiel: Die Firma ist Eigentümerin des Laptops.\n- **Besitz** = tatsächliche Herrschaft (wer sie gerade hat). Beispiel: Der Mitarbeiter, der den Firmenlaptop nutzt, ist Besitzer.\n\nWeiteres Beispiel: Bei einer Mietwohnung ist der Vermieter Eigentümer, der Mieter Besitzer. Bei Kauf unter Eigentumsvorbehalt wird der Käufer Besitzer, Eigentum geht erst mit vollständiger Bezahlung über.'
  }
);
