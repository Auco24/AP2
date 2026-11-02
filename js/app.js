/* AP2 Trainer – App-Logik (ohne Framework, ohne Build). */
(function () {
  'use strict';

  var MD = window.MD;
  var esc = MD.esc;
  var CATS = window.AP2_CATEGORIES || [];
  var app = document.getElementById('app');

  /* ---------------- Speicher ---------------- */
  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* privat/voll */ }
    },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  var K = { progress: 'ap2.progress', imported: 'ap2.imported', session: 'ap2.session', theme: 'ap2.theme', history: 'ap2.history', src: 'ap2.src' };
  var EXAMS = window.AP2_EXAMS || [];
  var SRC_LABEL = { alle: 'Alle Aufgaben', uebung: 'Nur Übungsaufgaben', ihk: 'Nur IHK-Prüfungen' };
  var SRC = store.get(K.src, 'alle');

  var TYPE_LABEL = { single: 'Single Choice', multi: 'Multiple Choice', input: 'Eingabe', order: 'Reihenfolge', free: 'Freitext' };
  var STATUS_LABEL = { correct: 'richtig', partial: 'teilweise', wrong: 'falsch' };

  /* ---------------- Daten ---------------- */
  var ALL = [];   // alle Aufgaben
  var TASKS = []; // nach Quelle (SRC) gefiltert
  var BY_ID = {};

  function loadTasks() {
    var imported = store.get(K.imported, []);
    ALL = [];
    BY_ID = {};
    (window.AP2_TASKS || []).concat(window.AP2_IHK_TASKS || [], imported).forEach(function (t) {
      if (!t || !t.id || BY_ID[t.id]) return;
      if (!t.points) t.points = defaultPoints(t);
      ALL.push(t);
      BY_ID[t.id] = t;
    });
    applySrc();
  }

  function applySrc() {
    TASKS = ALL.filter(function (t) {
      return SRC === 'alle' || (SRC === 'ihk' ? !!t.exam : !t.exam);
    });
  }

  function srcSelect() {
    if (!EXAMS.length) return '';
    return '<label class="small src-select">Quelle <select id="srcSel">' + Object.keys(SRC_LABEL).map(function (k) {
      return '<option value="' + k + '"' + (k === SRC ? ' selected' : '') + '>' + SRC_LABEL[k] + '</option>';
    }).join('') + '</select></label>';
  }

  function bindSrc() {
    var el = document.getElementById('srcSel');
    if (el) el.addEventListener('change', function () { SRC = el.value; store.set(K.src, SRC); applySrc(); route(); });
  }

  function exam(id) { return EXAMS.filter(function (e) { return e.id === id; })[0]; }
  function examTasks(examId, catId) {
    return ALL.filter(function (t) { return t.exam === examId && (!catId || t.cat === catId); });
  }

  function defaultPoints(t) { return t.type === 'free' ? 6 : t.type === 'single' ? 2 : 3; }

  function cat(id) { return CATS.filter(function (c) { return c.id === id; })[0]; }
  function topic(catId, topicId) {
    var c = cat(catId);
    if (!c) return null;
    var t = c.topics.filter(function (x) { return x.id === topicId; })[0];
    return t || { id: topicId, name: topicId };
  }
  function tasksOf(catId, topicId) {
    return TASKS.filter(function (t) {
      return (!catId || (t.tcat || t.cat) === catId) && (!topicId || topicId === 'alle' || t.topic === topicId);
    });
  }

  /* ---------------- Fortschritt ---------------- */
  function progress() { return store.get(K.progress, {}); }
  function record(id, status) {
    var p = progress();
    var e = p[id] || { n: 0 };
    e.n += 1;
    e.s = status;
    e.t = Date.now();
    if (status === 'correct') e.ok = (e.ok || 0) + 1;
    p[id] = e;
    store.set(K.progress, p);
  }
  function stats(list) {
    var p = progress();
    var s = { total: list.length, correct: 0, partial: 0, wrong: 0, open: 0 };
    list.forEach(function (t) {
      var e = p[t.id];
      if (!e) s.open++; else s[e.s]++;
    });
    s.pct = s.total ? Math.round((s.correct + s.partial * 0.5) / s.total * 100) : 0;
    return s;
  }

  /* ---------------- Hilfen ---------------- */
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var x = a[i]; a[i] = a[j]; a[j] = x;
    }
    return a;
  }
  function range(n) { var r = []; for (var i = 0; i < n; i++) r.push(i); return r; }
  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }
  function bar(s) {
    var w = function (n) { return s.total ? (n / s.total * 100) : 0; };
    return '<div class="bar" title="' + s.correct + ' richtig, ' + s.partial + ' teilweise, ' + s.wrong + ' falsch, ' + s.open + ' offen">' +
      '<span class="b-ok" style="width:' + w(s.correct) + '%"></span>' +
      '<span class="b-part" style="width:' + w(s.partial) + '%"></span>' +
      '<span class="b-bad" style="width:' + w(s.wrong) + '%"></span></div>';
  }
  var CAT_ICON = { ga1: 'plan', ga2: 'code', wiso: 'scale' };
  function catClass(id) { return 'c-' + (CAT_ICON[id] ? id : 'x'); }
  function ring(pct, size, cls) {
    size = size || 48;
    var sw = size > 60 ? 7 : 5, r = (size - sw) / 2, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return '<span class="ring ' + (cls || '') + '" style="width:' + size + 'px;height:' + size + 'px"><svg viewBox="0 0 ' + size + ' ' + size + '">' +
      '<circle class="ring-bg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-width="' + sw + '"/>' +
      '<circle class="ring-fg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke-width="' + sw + '" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + off.toFixed(2) + '"/></svg>' +
      '<b style="font-size:' + Math.round(size / 4.2) + 'px">' + pct + '%</b></span>';
  }

  function renderNav(r, parts) {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var item = function (href, icon, label, active, extra, cls) {
      return '<a class="nav-item' + (active ? ' active' : '') + (cls ? ' ' + cls : '') + '" href="' + href + '"><span class="ico">' + ICON(icon) + '</span><span class="nav-label">' + label + '</span>' + (extra || '') + '</a>';
    };
    var cur = (r === 'k' || r === 't') ? parts[1] : null;
    var h = item('#/', 'home', 'Übersicht', !r) + '<div class="nav-sec">Prüfungsbereiche</div>';
    CATS.forEach(function (c) {
      h += item('#/k/' + c.id, CAT_ICON[c.id] || 'book', c.short.replace(/^(GA\d) – /, '$1 · '), cur === c.id, '<span class="nav-pct">' + stats(tasksOf(c.id)).pct + '%</span>', catClass(c.id));
    });
    h += '<div class="nav-sec">Werkzeuge</div>';
    if (EXAMS.length) h += item('#/pruefungen', 'file', 'IHK-Prüfungen', r === 'pruefungen');
    h += item('#/statistik', 'chart', 'Statistik', r === 'statistik') + item('#/daten', 'data', 'Daten & Import', r === 'daten');
    nav.innerHTML = h;
  }

  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function ihkNote(pct) {
    if (pct >= 92) return { n: 1, t: 'sehr gut' };
    if (pct >= 81) return { n: 2, t: 'gut' };
    if (pct >= 67) return { n: 3, t: 'befriedigend' };
    if (pct >= 50) return { n: 4, t: 'ausreichend' };
    if (pct >= 30) return { n: 5, t: 'mangelhaft' };
    return { n: 6, t: 'ungenügend' };
  }

  /* ---------------- Session ---------------- */
  var session = store.get(K.session, null);
  var timerHandle = null;

  function saveSession() { store.set(K.session, session); }

  function startSession(opts) {
    var list = opts.ids.filter(function (id) { return BY_ID[id]; });
    if (!list.length) { alert('Für diese Auswahl gibt es keine Aufgaben.'); return; }
    session = {
      mode: opts.mode || 'practice',
      title: opts.title || 'Übung',
      back: opts.back || '#/',
      ids: list,
      idx: opts.start || 0,
      answers: {},
      started: Date.now(),
      duration: opts.duration || 0,
      finished: false
    };
    saveSession();
    go('#/session');
  }

  function ans(id) {
    var a = session.answers[id];
    if (!a) {
      var t = BY_ID[id];
      a = { checked: false, result: null };
      if (t.type === 'single' || t.type === 'multi') { a.order = shuffle(range(t.options.length)); a.value = t.type === 'multi' ? [] : null; }
      if (t.type === 'order') { a.value = shuffle(range(t.items.length)); if (a.value.join() === range(t.items.length).join() && t.items.length > 1) a.value.reverse(); }
      if (t.type === 'input' || t.type === 'free') a.value = '';
      session.answers[id] = a;
    }
    return a;
  }

  /* ---------------- Auswertung ---------------- */
  function norm(s) { return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, '').replace(/[„“"']/g, ''); }
  function num(s) {
    var v = String(s).trim().replace(/\s/g, '').replace(/€|%|[a-zäöü]+$/gi, '');
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(v)) v = v.replace(/\./g, '');
    v = v.replace(',', '.');
    return v === '' || isNaN(+v) ? NaN : +v;
  }

  function evaluate(t, a) {
    if (t.type === 'single') return a.value === t.correct ? 'correct' : 'wrong';
    if (t.type === 'multi') {
      var sel = (a.value || []).slice().sort(), cor = t.correct.slice().sort();
      if (sel.join() === cor.join()) return 'correct';
      var hits = sel.filter(function (x) { return cor.indexOf(x) >= 0; }).length;
      var wrongSel = sel.length - hits;
      return hits > 0 && hits - wrongSel >= Math.ceil(cor.length / 2) ? 'partial' : 'wrong';
    }
    if (t.type === 'order') {
      var v = a.value || [];
      if (v.join() === range(t.items.length).join()) return 'correct';
      var same = v.filter(function (x, i) { return x === i; }).length;
      return same >= Math.ceil(t.items.length / 2) ? 'partial' : 'wrong';
    }
    if (t.type === 'input') {
      var answers = t.answers || [];
      if (t.numeric) {
        var n = num(a.value), tol = t.tolerance || 0;
        return answers.some(function (x) { return Math.abs(num(x) - n) <= tol + 1e-9; }) ? 'correct' : 'wrong';
      }
      return answers.some(function (x) { return norm(x) === norm(a.value); }) ? 'correct' : 'wrong';
    }
    return a.result; // free: Selbsteinschätzung
  }

  function pointsFor(t, result) {
    return result === 'correct' ? t.points : result === 'partial' ? t.points / 2 : 0;
  }

  /* ---------------- Router ---------------- */
  function route() {
    clearInterval(timerHandle);
    var parts = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    var r = parts[0] || '';
    renderNav(r, parts);
    document.body.classList.toggle('in-session', r === 'session');
    if (r === 'k' && cat(parts[1])) viewCategory(parts[1]);
    else if (r === 't' && cat(parts[1])) viewTopicList(parts[1], parts[2]);
    else if (r === 'session' && session) (session.finished ? viewResult() : viewSession());
    else if (r === 'ergebnis' && session) viewResult();
    else if (r === 'pruefungen') viewExams();
    else if (r === 'statistik') viewStats();
    else if (r === 'daten') viewData();
    else viewHome();
    window.scrollTo(0, 0);
  }

  /* ---------------- Ansichten ---------------- */
  function viewHome() {
    var all = stats(TASKS);
    var p = progress();
    var wrongIds = TASKS.filter(function (t) { return p[t.id] && p[t.id].s !== 'correct'; }).map(function (t) { return t.id; });
    var newCount = TASKS.filter(function (t) { return !p[t.id]; }).length;
    var running = session && !session.finished;
    var done = all.total - all.open;
    var quote = done ? Math.round(all.correct / done * 100) : 0;
    var hour = new Date().getHours();
    var greet = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Hallo' : 'Guten Abend';

    var html = '<header class="page-head"><div><p class="eyebrow">' + esc(new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })) + '</p>' +
      '<h1>' + greet + '! Bereit für die AP2?</h1><p class="muted">Fachinformatiker/-in Anwendungsentwicklung · ' + TASKS.length + ' Aufgaben</p></div>' +
      '<div class="head-tools">' + srcSelect() + '</div></header>';

    html += '<section class="kpis">' +
      '<div class="card kpi kpi-main">' + ring(all.pct, 76, 'accent') + '<div><div class="kpi-label">Gesamtfortschritt</div><div class="kpi-sub">' + all.correct + ' von ' + all.total + ' sicher gelöst</div>' + bar(all) + '</div></div>' +
      kpi('layers', 'Bearbeitet', done, 'von ' + all.total) +
      kpi('target', 'Trefferquote', quote + '%', done ? 'der bearbeiteten Aufgaben' : 'noch keine Daten') +
      kpi('repeat', 'Zu wiederholen', all.wrong + all.partial, 'falsch oder teilweise') +
      '</section>';

    if (running) {
      var sd = session.ids.filter(function (id) { return session.answers[id] && session.answers[id].checked; }).length;
      var sp = Math.round(sd / session.ids.length * 100);
      html += '<div class="card resume"><div class="resume-ico">' + ICON(session.mode === 'exam' ? 'timer' : 'play') + '</div>' +
        '<div class="resume-body"><div class="kpi-label">Weitermachen</div><strong>' + esc(session.title) + '</strong>' +
        '<div class="mini-bar"><span style="width:' + sp + '%"></span></div><span class="muted small">' + sd + ' / ' + session.ids.length + ' Aufgaben</span></div>' +
        '<div class="row"><button class="btn ghost" data-act="drop">Verwerfen</button><a class="btn primary" href="#/session">Fortsetzen ' + ICON('arrowRight') + '</a></div></div>';
    }

    html += '<section class="actions-grid">' +
      action('mix', 'shuffle', 'Zufallsmix', '10 gemischte Aufgaben aus allen Bereichen', false) +
      action('wrong', 'repeat', 'Fehler wiederholen', wrongIds.length ? wrongIds.length + ' Aufgaben warten auf dich' : 'Aktuell nichts zu wiederholen', !wrongIds.length) +
      action('open', 'sparkle', 'Neue Aufgaben', newCount ? newCount + ' noch nicht bearbeitet' : 'Alles einmal bearbeitet', !newCount) +
      '</section>';

    html += '<div class="section-head"><h2>Prüfungsbereiche</h2></div><div class="grid cats">';
    CATS.forEach(function (c) {
      var s = stats(tasksOf(c.id));
      html += '<a class="card cat-card ' + catClass(c.id) + '" href="#/k/' + c.id + '">' +
        '<div class="cat-top"><span class="cat-ico">' + ICON(CAT_ICON[c.id] || 'book') + '</span>' + ring(s.pct, 48) + '</div>' +
        '<h3>' + esc(c.name) + '</h3><p class="muted small">' + esc(c.description) + '</p>' +
        '<div class="cat-foot"><span>' + s.total + ' Aufgaben · ' + c.topics.length + ' Themen</span><span class="go">' + ICON('arrowRight') + '</span></div>' +
        bar(s) + '</a>';
    });
    html += '</div>';

    if (EXAMS.length) {
      html += '<div class="section-head"><h2>Was kommt in der Prüfung dran?</h2><a class="link" href="#/statistik">Mehr Statistik ' + ICON('chevronRight') + '</a></div>';
      html += '<div class="card relevance">' + relevanceList(8) + '</div>';
      html += '<div class="section-head"><h2>IHK-Prüfungen</h2><a class="link" href="#/pruefungen">Alle Termine ' + ICON('chevronRight') + '</a></div>';
      html += '<div class="exam-strip">' + EXAMS.map(function (e) {
        var s = stats(examTasks(e.id));
        return '<a class="card exam-chip" href="#/pruefungen">' + ring(s.pct, 40) + '<div><strong>' + esc(e.name) + '</strong><span class="muted small">' + examTasks(e.id).length + ' Aufgaben</span></div></a>';
      }).join('') + '</div>';
    }
    app.innerHTML = html;
    bindSrc();

    on('[data-act="drop"]', function () { if (confirm('Laufende Sitzung verwerfen?')) { session = null; store.del(K.session); route(); } });
    on('[data-act="mix"]', function () {
      startSession({ ids: shuffle(TASKS.map(function (t) { return t.id; })).slice(0, 10), title: 'Zufallsmix', back: '#/' });
    });
    on('[data-act="wrong"]', function () { startSession({ ids: shuffle(wrongIds), title: 'Fehler wiederholen', back: '#/' }); });
    on('[data-act="open"]', function () {
      var ids = TASKS.filter(function (t) { return !p[t.id]; }).map(function (t) { return t.id; });
      startSession({ ids: shuffle(ids).slice(0, 15), title: 'Neue Aufgaben', back: '#/' });
    });
  }

  function kpi(icon, label, value, sub) {
    return '<div class="card kpi"><span class="kpi-ico">' + ICON(icon) + '</span><div><div class="kpi-label">' + label + '</div><div class="kpi-value">' + value + '</div><div class="kpi-sub">' + sub + '</div></div></div>';
  }
  function action(act, icon, title, sub, disabled) {
    return '<button class="card action" data-act="' + act + '"' + (disabled ? ' disabled' : '') + '><span class="action-ico">' + ICON(icon) + '</span><span class="action-text"><strong>' + title + '</strong><span>' + sub + '</span></span>' + ICON('chevronRight', 'chev') + '</button>';
  }

  /* Prüfungsrelevanz: Anteil der IHK-Punkte je Thema über alle Termine */
  function relevance() {
    var map = {}, total = 0;
    (window.AP2_IHK_TASKS || []).forEach(function (t) {
      var key = (t.tcat || t.cat) + '/' + t.topic;
      map[key] = (map[key] || 0) + (t.points || 0);
      total += t.points || 0;
    });
    return Object.keys(map).map(function (k) {
      var parts = k.split('/'), tp = topic(parts[0], parts[1]) || { name: parts[1] };
      return { cat: parts[0], topic: parts[1], name: tp.name, points: map[k], share: total ? map[k] / total * 100 : 0 };
    }).sort(function (a, b) { return b.points - a.points; });
  }
  function relevanceList(limit) {
    var rows = relevance().slice(0, limit || 99);
    var max = rows.length ? rows[0].share : 1;
    return '<p class="muted small rel-note">Anteil der Prüfungspunkte je Thema über ' + EXAMS.length + ' IHK-Termine. Klick öffnet das Thema.</p><ol class="rel-list">' + rows.map(function (r) {
      var c = cat(r.cat);
      return '<li><a href="#/t/' + r.cat + '/' + encodeURIComponent(r.topic) + '"><span class="rel-name">' + esc(r.name) + ' <span class="tag ' + catClass(r.cat) + '">' + esc(c ? c.short.split(' ')[0] : r.cat) + '</span></span>' +
        '<span class="rel-bar"><span class="' + catClass(r.cat) + '" style="width:' + (r.share / max * 100) + '%"></span></span><span class="rel-val">' + r.share.toFixed(1).replace('.', ',') + ' %</span></a></li>';
    }).join('') + '</ol>';
  }

  function viewExams() {
    var html = '<header class="page-head"><div><p class="eyebrow">Originalprüfungen</p><h1>IHK-Prüfungen nach Termin</h1>' +
      '<p class="muted">In Originalreihenfolge üben oder als Prüfung mit Zeitlimit simulieren. Alle Aufgaben sind zusätzlich den Themen zugeordnet.</p></div></header>';
    if (!EXAMS.length) html += '<div class="card empty">Keine IHK-Prüfungen eingebunden.</div>';
    html += '<div class="grid exams">';
    EXAMS.forEach(function (e) {
      var s = stats(examTasks(e.id));
      html += '<div class="card exam-card"><div class="exam-head">' + ring(s.pct, 52) + '<div><h3>' + esc(e.name) + '</h3><span class="muted small">' + s.total + ' Aufgaben · ' + (s.total - s.open) + ' bearbeitet</span></div></div><div class="exam-parts">';
      CATS.forEach(function (c) {
        var list = examTasks(e.id, c.id);
        if (!list.length) return;
        var cs = stats(list);
        html += '<div class="exam-part"><span class="part-ico ' + catClass(c.id) + '">' + ICON(CAT_ICON[c.id]) + '</span><span class="part-name"><strong>' + esc(c.short) + '</strong><span class="muted small">' + list.length + ' Aufgaben · ' + cs.pct + ' %</span></span>' +
          '<span class="row"><button class="btn sm" data-ex="' + e.id + '" data-excat="' + c.id + '">' + ICON('play') + 'Üben</button>' +
          '<button class="btn sm ghost" data-ex="' + e.id + '" data-excat="' + c.id + '" data-exmode="exam" title="Prüfungssimulation mit Zeitlimit">' + ICON('timer') + c.examMinutes + ' min</button></span></div>';
      });
      html += '</div>' + (e.note ? '<p class="exam-note">' + ICON('info') + esc(e.note) + '</p>' : '') + '</div>';
    });
    html += '</div>';
    app.innerHTML = html;
    app.querySelectorAll('[data-ex]').forEach(function (b) {
      b.addEventListener('click', function () {
        var e = exam(b.getAttribute('data-ex')), c = cat(b.getAttribute('data-excat'));
        var isExam = b.getAttribute('data-exmode') === 'exam';
        startSession({
          ids: examTasks(e.id, c.id).map(function (t) { return t.id; }),
          mode: isExam ? 'exam' : 'practice', duration: isExam ? c.examMinutes * 60 : 0,
          title: e.name + ' · ' + c.short, back: '#/pruefungen'
        });
      });
    });
  }

  function viewCategory(catId) {
    var c = cat(catId);
    var all = tasksOf(catId);
    var s = stats(all);
    var html = '<nav class="crumbs"><a href="#/">Übersicht</a>' + ICON('chevronRight') + '<span>' + esc(c.short) + '</span></nav>' +
      '<header class="page-head cat-head ' + catClass(c.id) + '"><span class="cat-ico lg">' + ICON(CAT_ICON[c.id] || 'book') + '</span><div class="grow"><h1>' + esc(c.name) + '</h1><p class="muted">' + esc(c.description) + '</p></div>' +
      '<div class="head-ring">' + ring(s.pct, 72) + '<span class="muted small">' + s.total + ' Aufgaben</span></div></header>';

    html += '<div class="card exam-box"><span class="action-ico">' + ICON('timer') + '</span><div class="grow"><h3>Prüfungssimulation</h3><p class="muted small">Zufällige Aufgaben aus allen Themen, Lösungen erst am Ende, Bewertung nach IHK-Notenschlüssel.</p></div>' +
      '<div class="row wrap">' +
      '<label class="field">Aufgaben <select id="exN">' + [10, 15, 20, 30].map(function (n) { return '<option' + (n === 15 ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
      '<label class="field">Minuten <select id="exM">' + [20, 30, 45, 60, 90].map(function (n) { return '<option' + (n === Math.min(45, c.examMinutes) ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
      '<button class="btn primary" data-act="exam">' + ICON('play') + 'Starten</button></div></div>';

    html += '<div class="section-head"><h2>Themen</h2>' +
      '<span class="row wrap">' + srcSelect() + '<label class="switch"><input type="checkbox" id="onlyOpen"><span class="slider"></span>nur offene &amp; falsche</label></span></div>';
    html += '<div class="grid topics ' + catClass(c.id) + '">';
    html += topicRow(c, { id: 'alle', name: 'Alle Themen gemischt' }, all, true);
    c.topics.forEach(function (t) { html += topicRow(c, t, tasksOf(catId, t.id)); });
    var known = c.topics.map(function (t) { return t.id; });
    var extra = {};
    all.forEach(function (t) { if (known.indexOf(t.topic) < 0) extra[t.topic] = true; });
    Object.keys(extra).forEach(function (tid) { html += topicRow(c, { id: tid, name: tid + ' (importiert)' }, tasksOf(catId, tid)); });
    html += '</div>';
    app.innerHTML = html;
    bindSrc();

    on('[data-act="exam"]', function () {
      var n = +document.getElementById('exN').value;
      var m = +document.getElementById('exM').value;
      startSession({ ids: shuffle(all.map(function (t) { return t.id; })).slice(0, n), mode: 'exam', duration: m * 60, title: 'Prüfung ' + c.short, back: '#/k/' + catId });
    });
    app.querySelectorAll('[data-practice]').forEach(function (b) {
      b.addEventListener('click', function () {
        var tid = b.getAttribute('data-practice');
        var list = tasksOf(catId, tid);
        if (document.getElementById('onlyOpen').checked) {
          var p = progress();
          list = list.filter(function (t) { return !p[t.id] || p[t.id].s !== 'correct'; });
        }
        var ids = list.map(function (t) { return t.id; });
        if (tid === 'alle') ids = shuffle(ids);
        startSession({ ids: ids, title: c.short + ' · ' + topic(catId, tid).name, back: '#/k/' + catId });
      });
    });
  }

  function topicRow(c, t, list, highlight) {
    var s = stats(list);
    var ihk = list.filter(function (x) { return x.exam; }).length;
    return '<div class="card topic' + (highlight ? ' hl' : '') + '">' +
      '<div class="topic-top">' + ring(s.pct, 44) + '<div class="grow"><h3>' + esc(t.name) + '</h3>' +
      '<div class="muted small">' + s.total + ' Aufgaben' + (ihk ? ' · ' + ihk + ' IHK' : '') + '</div></div></div>' +
      '<div class="topic-stats"><span class="st ok">' + ICON('check') + s.correct + '</span><span class="st bad">' + ICON('x') + (s.wrong + s.partial) + '</span><span class="st">' + s.open + ' offen</span></div>' +
      '<div class="topic-actions">' +
      (t.id !== 'alle' ? '<a class="btn ghost sm" href="#/t/' + c.id + '/' + encodeURIComponent(t.id) + '">' + ICON('list') + 'Liste</a>' : '<span></span>') +
      '<button class="btn primary sm" data-practice="' + esc(t.id) + '"' + (s.total ? '' : ' disabled') + '>' + ICON('play') + 'Üben</button></div></div>';
  }

  function viewTopicList(catId, topicId) {
    var c = cat(catId);
    var t = topic(catId, topicId);
    var list = tasksOf(catId, topicId);
    var p = progress();
    var ts = stats(list);
    var html = '<nav class="crumbs"><a href="#/">Übersicht</a>' + ICON('chevronRight') + '<a href="#/k/' + catId + '">' + esc(c.short) + '</a>' + ICON('chevronRight') + '<span>' + esc(t.name) + '</span></nav>' +
      '<header class="page-head"><div class="grow"><p class="eyebrow">' + esc(c.short) + '</p><h1>' + esc(t.name) + '</h1><p class="muted">' + list.length + ' Aufgaben · ' + ts.correct + ' richtig · ' + ts.open + ' offen</p></div>' + ring(ts.pct, 64) + '</header><div class="task-index">';
    list.forEach(function (task, i) {
      var e = p[task.id];
      var st = e ? e.s : 'open';
      html += '<button class="card idx-item" data-i="' + i + '"><span class="dot ' + st + '"></span><span class="idx-nr">' + (i + 1) + '</span>' +
        '<span class="idx-text">' + esc(task.title || firstLine(task.q)) + '</span>' +
        (task.exam ? '<span class="badge ihk">' + esc(examName(task.exam)) + '</span>' : '') + '<span class="badge">' + TYPE_LABEL[task.type] + '</span><span class="badge pts">' + fmt(task.points) + ' P</span>' + ICON('chevronRight', 'chev') + '</button>';
    });
    html += '</div>';
    app.innerHTML = html;
    app.querySelectorAll('[data-i]').forEach(function (b) {
      b.addEventListener('click', function () {
        startSession({ ids: list.map(function (x) { return x.id; }), start: +b.getAttribute('data-i'), title: c.short + ' · ' + t.name, back: '#/t/' + catId + '/' + encodeURIComponent(topicId) });
      });
    });
  }

  function firstLine(s) {
    var l = String(s || '').split('\n').filter(function (x) { return x.trim() && !/^```/.test(x); })[0] || '';
    l = l.replace(/[*`#|]/g, '').trim();
    return l.length > 110 ? l.slice(0, 107) + '…' : l;
  }

  /* ---------------- Aufgabe bearbeiten ---------------- */
  function viewSession() {
    var id = session.ids[session.idx];
    var t = BY_ID[id];
    var a = ans(id);
    var exam = session.mode === 'exam';
    var c = cat(t.cat);
    var locked = a.checked && !exam;
    var answeredCount = session.ids.filter(function (x) { return session.answers[x] && (session.answers[x].checked || hasValue(BY_ID[x], session.answers[x])); }).length;

    var sp = Math.round(answeredCount / session.ids.length * 100);
    var html = '<div class="session-head">' +
      '<a class="icon-btn" href="' + session.back + '" title="Zurück" aria-label="Zurück">' + ICON('arrowLeft') + '</a>' +
      '<div class="session-title"><span class="eyebrow">' + (exam ? 'Prüfungssimulation' : 'Übung') + '</span><strong>' + esc(session.title) + '</strong></div>' +
      (exam ? '<div class="timer" id="timer">' + ICON('timer') + '<span>–</span></div>' : '<div class="session-count"><strong>' + answeredCount + '</strong> / ' + session.ids.length + '</div>') +
      '</div><div class="session-progress"><span style="width:' + sp + '%"></span></div>';

    html += '<div class="pager">' + session.ids.map(function (x, i) {
      var aa = session.answers[x];
      var cls = i === session.idx ? ' cur' : '';
      if (aa && aa.checked && !exam) cls += ' ' + aa.result;
      else if (aa && hasValue(BY_ID[x], aa)) cls += ' done';
      return '<button class="pg' + cls + '" data-go="' + i + '">' + (i + 1) + '</button>';
    }).join('') + '</div>';

    html += '<article class="card task">' +
      '<div class="task-meta"><span class="tag ' + catClass(t.cat) + '">' + esc(c ? c.short : t.cat) + '</span><span class="badge">' + esc((topic(t.tcat || t.cat, t.topic) || { name: t.topic }).name) + '</span>' +
      '<span class="badge">' + TYPE_LABEL[t.type] + '</span><span class="badge pts">' + fmt(t.points) + ' Punkte</span>' +
      (t.source ? '<span class="badge ihk">' + ICON('file') + esc(t.source) + '</span>' : '') +
      '<span class="spacer"></span><span class="task-no">Aufgabe ' + (session.idx + 1) + ' / ' + session.ids.length + '</span></div>' +
      (t.title ? '<h2 class="task-title">' + esc(t.title) + '</h2>' : '') +
      renderContext(t) +
      '<div class="md">' + MD.render(t.q) + '</div>' +
      '<div class="answer">' + renderAnswer(t, a, locked) + '</div>';

    if (locked) html += renderFeedback(t, a);
    html += '</article>';

    html += '<div class="actions">' +
      '<button class="btn ghost" data-act="prev"' + (session.idx === 0 ? ' disabled' : '') + '>' + ICON('arrowLeft') + 'Zurück</button><span class="spacer"></span>';
    if (exam) {
      html += '<button class="btn ghost" data-act="submit">' + ICON('flag') + 'Abgeben</button>';
      html += session.idx < session.ids.length - 1 ? '<button class="btn primary" data-act="next">Weiter' + ICON('arrowRight') + '</button>' : '';
    } else if (!a.checked) {
      html += '<button class="btn ghost" data-act="skip">Überspringen</button>';
      if (t.type === 'free') html += a.revealed ? '' : '<button class="btn primary" data-act="reveal">' + ICON('eye') + 'Musterlösung zeigen</button>';
      else html += '<button class="btn primary" data-act="check">' + ICON('check') + 'Prüfen</button>';
    } else {
      html += '<button class="btn ghost" data-act="retry">' + ICON('repeat') + 'Nochmal</button>';
      html += session.idx < session.ids.length - 1 ? '<button class="btn primary" data-act="next">Weiter' + ICON('arrowRight') + '</button>' : '<button class="btn primary" data-act="finish">' + ICON('award') + 'Auswertung</button>';
    }
    html += '</div><p class="keys"><kbd>1</kbd>–<kbd>9</kbd> Antwort wählen <kbd>Enter</kbd> prüfen / weiter <kbd>←</kbd><kbd>→</kbd> blättern</p>';
    app.innerHTML = html;

    bindAnswer(t, a, locked);
    app.querySelectorAll('[data-go]').forEach(function (b) {
      b.addEventListener('click', function () { session.idx = +b.getAttribute('data-go'); saveSession(); viewSession(); });
    });
    on('[data-act="prev"]', function () { move(-1); });
    on('[data-act="next"]', function () { move(1); });
    on('[data-act="skip"]', function () { if (session.idx < session.ids.length - 1) move(1); else finish(); });
    on('[data-act="check"]', function () { check(t, a); });
    on('[data-act="reveal"]', function () { a.revealed = true; saveSession(); viewSession(); });
    on('[data-act="retry"]', function () { delete session.answers[id]; saveSession(); viewSession(); });
    on('[data-act="finish"]', finish);
    on('[data-act="submit"]', function () {
      var open = session.ids.length - answeredCount;
      if (confirm(open ? open + ' Aufgabe(n) noch unbearbeitet. Trotzdem abgeben?' : 'Prüfung jetzt abgeben?')) finish();
    });
    app.querySelectorAll('[data-rate]').forEach(function (b) {
      b.addEventListener('click', function () {
        a.result = b.getAttribute('data-rate');
        a.checked = true;
        record(t.id, a.result);
        saveSession();
        viewSession();
      });
    });

    if (exam) startTimer();
  }

  function examName(id) { var e = exam(id); return e ? e.name : id; }

  function renderContext(t) {
    var h = '';
    if (t.context) {
      h += '<details class="context"' + (t.contextOpen === false ? '' : ' open') + '><summary>' + ICON('book') + 'Ausgangssituation</summary><div class="md">' + MD.render(t.context) + '</div></details>';
    }
    if (t.pages && t.pages.length) {
      h += '<details class="context pages"><summary>' + ICON('image') + 'Originalseite' + (t.pages.length > 1 ? 'n' : '') + ' anzeigen <span class="muted">· Diagramme, Tabellen</span></summary>' +
        t.pages.map(function (p) { return '<a href="' + esc(p) + '" target="_blank" rel="noopener"><img loading="lazy" src="' + esc(p) + '" alt="Originalseite"></a>'; }).join('') + '</details>';
    }
    return h;
  }

  function solPages(t) {
    if (!t.solPages || !t.solPages.length) return '';
    return '<details class="context pages"><summary>' + ICON('image') + 'Original-Lösungshinweise anzeigen</summary>' +
      t.solPages.map(function (p) { return '<a href="' + esc(p) + '" target="_blank" rel="noopener"><img loading="lazy" src="' + esc(p) + '" alt="Lösungsseite"></a>'; }).join('') + '</details>';
  }

  function hasValue(t, a) {
    if (!a) return false;
    if (t.type === 'multi') return a.value && a.value.length > 0;
    if (t.type === 'single') return a.value !== null && a.value !== undefined;
    if (t.type === 'order') return !!a.touched;
    return String(a.value || '').trim() !== '';
  }

  function renderAnswer(t, a, locked) {
    var dis = locked ? ' disabled' : '';
    if (t.type === 'single' || t.type === 'multi') {
      var inputType = t.type === 'single' ? 'radio' : 'checkbox';
      var h = t.type === 'multi' ? '<p class="hint">' + ICON('info') + 'Mehrere Antworten können richtig sein.</p>' : '';
      h += '<div class="options">';
      a.order.forEach(function (oi, k) {
        var checked = t.type === 'single' ? a.value === oi : a.value.indexOf(oi) >= 0;
        var cls = '';
        if (locked) {
          var isCorrect = t.type === 'single' ? t.correct === oi : t.correct.indexOf(oi) >= 0;
          cls = isCorrect ? ' opt-ok' : (checked ? ' opt-bad' : '');
        }
        h += '<label class="opt' + cls + (checked ? ' sel' : '') + '"><input type="' + inputType + '" name="opt" value="' + oi + '"' + (checked ? ' checked' : '') + dis + '>' +
          '<span class="key">' + (k + 1) + '</span><span class="opt-text">' + MD.inline(t.options[oi]) + '</span></label>';
      });
      return h + '</div>';
    }
    if (t.type === 'input') {
      return '<div class="input-row"><input id="inp" class="text-input" type="text" autocomplete="off" spellcheck="false" placeholder="' + esc(t.placeholder || 'Antwort eingeben') + '" value="' + esc(a.value) + '"' + dis + '>' +
        (t.unit ? '<span class="unit">' + esc(t.unit) + '</span>' : '') + '</div>';
    }
    if (t.type === 'order') {
      var o = '<p class="hint">' + ICON('info') + 'Bringe die Elemente in die richtige Reihenfolge – per Pfeil oder Ziehen.</p><ol class="order-list">';
      a.value.forEach(function (ii, pos) {
        var cls = locked ? (ii === pos ? ' opt-ok' : ' opt-bad') : '';
        o += '<li class="order-item' + cls + '" draggable="' + (!locked) + '" data-pos="' + pos + '"><span class="handle">' + ICON('grip') + '</span><span class="opt-text">' + MD.inline(t.items[ii]) + '</span>' +
          (locked ? '' : '<span class="row"><button class="icon-btn" data-up="' + pos + '" aria-label="nach oben">' + ICON('up') + '</button><button class="icon-btn" data-down="' + pos + '" aria-label="nach unten">' + ICON('down') + '</button></span>') + '</li>';
      });
      return o + '</ol>';
    }
    // free
    var exam = session.mode === 'exam';
    var f = '<textarea id="free" class="free-input' + (t.code ? ' mono' : '') + '" rows="' + (t.code ? 10 : 7) + '" spellcheck="' + (!t.code) + '" placeholder="Deine Lösung (wird nur für dich gespeichert)…"' + (locked ? ' readonly' : '') + '>' + esc(a.value) + '</textarea>';
    if (!exam && a.revealed && !a.checked) {
      f += '<div class="solution"><h4>' + ICON('book') + 'Musterlösung</h4><div class="md">' + MD.render(t.solution) + '</div>' +
        (t.explanation ? '<div class="md muted">' + MD.render(t.explanation) + '</div>' : '') + solPages(t) +
        '<div class="rate"><strong>Wie gut war deine Lösung?</strong><div class="row wrap">' +
        '<button class="btn ok" data-rate="correct">' + ICON('check') + 'Richtig</button><button class="btn part" data-rate="partial">' + ICON('half') + 'Teilweise</button><button class="btn bad" data-rate="wrong">' + ICON('x') + 'Falsch</button></div></div></div>';
    }
    return f;
  }

  function bindAnswer(t, a, locked) {
    if (locked) return;
    if (t.type === 'single' || t.type === 'multi') {
      app.querySelectorAll('input[name="opt"]').forEach(function (inp) {
        inp.addEventListener('change', function () {
          var v = +inp.value;
          if (t.type === 'single') a.value = v;
          else {
            var i = a.value.indexOf(v);
            if (inp.checked && i < 0) a.value.push(v);
            if (!inp.checked && i >= 0) a.value.splice(i, 1);
          }
          inp.closest('.options').querySelectorAll('.opt').forEach(function (l) { l.classList.toggle('sel', l.querySelector('input').checked); });
          saveSession();
        });
      });
    }
    if (t.type === 'input') {
      var inp = document.getElementById('inp');
      inp.addEventListener('input', function () { a.value = inp.value; saveSession(); });
      if (session.mode !== 'exam' || !a.value) inp.focus();
    }
    if (t.type === 'free') {
      var ta = document.getElementById('free');
      ta.addEventListener('input', function () { a.value = ta.value; saveSession(); });
      ta.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' && t.code) { e.preventDefault(); var s = ta.selectionStart; ta.setRangeText('  ', s, ta.selectionEnd, 'end'); a.value = ta.value; }
      });
    }
    if (t.type === 'order') {
      var swap = function (i, j) {
        if (j < 0 || j >= a.value.length) return;
        var x = a.value[i]; a.value[i] = a.value[j]; a.value[j] = x;
        a.touched = true; saveSession(); viewSession();
      };
      app.querySelectorAll('[data-up]').forEach(function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-up'); swap(i, i - 1); }); });
      app.querySelectorAll('[data-down]').forEach(function (b) { b.addEventListener('click', function () { var i = +b.getAttribute('data-down'); swap(i, i + 1); }); });
      var dragFrom = null;
      app.querySelectorAll('.order-item').forEach(function (li) {
        li.addEventListener('dragstart', function (e) { dragFrom = +li.getAttribute('data-pos'); li.classList.add('dragging'); try { e.dataTransfer.setData('text/plain', dragFrom); } catch (x) {} });
        li.addEventListener('dragend', function () { li.classList.remove('dragging'); });
        li.addEventListener('dragover', function (e) { e.preventDefault(); li.classList.add('over'); });
        li.addEventListener('dragleave', function () { li.classList.remove('over'); });
        li.addEventListener('drop', function (e) {
          e.preventDefault();
          var to = +li.getAttribute('data-pos');
          if (dragFrom === null || dragFrom === to) return;
          var item = a.value.splice(dragFrom, 1)[0];
          a.value.splice(to, 0, item);
          a.touched = true; saveSession(); viewSession();
        });
      });
    }
  }

  function renderFeedback(t, a) {
    var r = a.result;
    var icon = ICON(r === 'correct' ? 'check' : r === 'partial' ? 'half' : 'x');
    var h = '<div class="feedback ' + r + '"><div class="fb-head">' + icon + ' ' + (r === 'correct' ? 'Richtig!' : r === 'partial' ? 'Teilweise richtig' : 'Leider falsch') +
      ' <span class="muted small">(' + pointsFor(t, r) + ' / ' + t.points + ' Punkte)</span></div>';
    if (t.type === 'input' && r !== 'correct') h += '<p>Richtige Antwort: <strong>' + esc(t.answers[0]) + (t.unit ? ' ' + esc(t.unit) : '') + '</strong></p>';
    if (t.type === 'order' && r !== 'correct') h += '<p>Richtige Reihenfolge:</p><ol>' + t.items.map(function (x) { return '<li>' + MD.inline(x) + '</li>'; }).join('') + '</ol>';
    if (t.type === 'free') h += '<div class="md"><h4>Musterlösung</h4>' + MD.render(t.solution) + '</div>';
    if (t.explanation) h += '<div class="md explanation">' + MD.render(t.explanation) + '</div>';
    return h + solPages(t) + '</div>';
  }

  function check(t, a) {
    if (!hasValue(t, a) && t.type !== 'order') { flash('Bitte zuerst eine Antwort geben.'); return; }
    a.result = evaluate(t, a);
    a.checked = true;
    record(t.id, a.result);
    saveSession();
    viewSession();
  }

  function move(d) {
    var n = session.idx + d;
    if (n < 0 || n >= session.ids.length) return;
    session.idx = n;
    saveSession();
    viewSession();
  }

  function finish() {
    clearInterval(timerHandle);
    if (session.mode === 'exam') {
      session.ids.forEach(function (id) {
        var t = BY_ID[id], a = ans(id);
        if (t.type === 'free') return; // Selbstbewertung in der Auswertung
        a.result = hasValue(t, a) ? evaluate(t, a) : 'wrong';
        a.checked = true;
        record(id, a.result);
      });
    }
    session.finished = true;
    session.ended = Date.now();
    saveSession();
    go('#/ergebnis');
  }

  function startTimer() {
    var el = document.getElementById('timer');
    var tick = function () {
      var left = session.duration - (Date.now() - session.started) / 1000;
      if (!el) return;
      el.querySelector('span').textContent = fmtTime(left);
      el.classList.toggle('warn', left < 300);
      if (left <= 0) { clearInterval(timerHandle); alert('Die Zeit ist abgelaufen. Die Prüfung wird abgegeben.'); finish(); }
    };
    tick();
    timerHandle = setInterval(tick, 1000);
  }

  /* ---------------- Ergebnis ---------------- */
  function viewResult() {
    var exam = session.mode === 'exam';
    var total = 0, got = 0, pending = 0;
    var counts = { correct: 0, partial: 0, wrong: 0, open: 0 };
    session.ids.forEach(function (id) {
      var t = BY_ID[id], a = session.answers[id];
      total += t.points;
      if (a && a.checked) { got += pointsFor(t, a.result); counts[a.result]++; }
      else if (exam && t.type === 'free') pending++;
      else counts.open++;
    });
    var pct = total ? Math.round(got / total * 100) : 0;
    var note = ihkNote(pct);
    var dur = Math.round(((session.ended || Date.now()) - session.started) / 1000);

    var html = '<div class="card result-hero">' + ring(pct, 120, exam ? 'g' + note.n : 'accent') +
      '<div class="grow"><p class="eyebrow">Auswertung · ' + esc(session.title) + '</p><h1>' + (pct >= 81 ? 'Stark gemacht!' : pct >= 50 ? 'Bestanden – weiter so!' : 'Dranbleiben – das wird!') + '</h1>' +
      '<p class="muted">' + fmt(got) + ' von ' + fmt(total) + ' Punkten · Dauer ' + fmtTime(dur) + ' min</p>' +
      (exam ? '<span class="grade g' + note.n + '">Note ' + note.n + ' · ' + note.t + '</span>' : '') +
      (pending ? '<p class="notice-inline">' + ICON('info') + 'Bewerte unten noch ' + pending + ' Freitext-Aufgabe(n) selbst, um das Endergebnis zu erhalten.</p>' : '') +
      '<div class="chips"><span class="chip ok">' + ICON('check') + counts.correct + ' richtig</span><span class="chip part">' + ICON('half') + counts.partial + ' teilweise</span><span class="chip bad">' + ICON('x') + counts.wrong + ' falsch</span>' +
      (counts.open ? '<span class="chip">' + counts.open + ' übersprungen</span>' : '') + '</div>' +
      '<div class="row wrap"><button class="btn primary" data-act="again"' + (counts.wrong + counts.partial + counts.open ? '' : ' disabled') + '>' + ICON('repeat') + 'Falsche &amp; offene wiederholen</button>' +
      '<a class="btn ghost" href="' + session.back + '">Zur Übersicht</a></div></div></div>';

    html += '<div class="section-head"><h2>Aufgaben im Detail</h2></div>';
    session.ids.forEach(function (id, i) {
      var t = BY_ID[id], a = session.answers[id] || {};
      var r = a.checked ? a.result : 'open';
      html += '<details class="card review ' + r + '"' + (exam && t.type === 'free' && !a.checked ? ' open' : '') + '><summary><span class="dot ' + r + '"></span>' +
        '<span class="idx-nr">' + (i + 1) + '</span><span class="idx-text">' + esc(t.title || firstLine(t.q)) + '</span><span class="badge pts">' + (a.checked ? fmt(pointsFor(t, a.result)) : '–') + ' / ' + fmt(t.points) + ' P</span>' + ICON('down', 'chev') + '</summary>' +
        renderContext(t) + '<div class="md">' + MD.render(t.q) + '</div>' + reviewAnswer(t, a) + '</details>';
    });
    app.innerHTML = html;

    on('[data-act="again"]', function () {
      var ids = session.ids.filter(function (id) { var a = session.answers[id]; return !a || !a.checked || a.result !== 'correct'; });
      startSession({ ids: ids, title: 'Wiederholung', back: session.back });
    });
    app.querySelectorAll('[data-rate-id]').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-rate-id');
        var a = ans(id);
        a.result = b.getAttribute('data-rate');
        a.checked = true;
        record(id, a.result);
        saveSession();
        viewResult();
      });
    });

    if (exam && !pending && !session.logged) {
      var hist = store.get(K.history, []);
      hist.unshift({ t: Date.now(), title: session.title, pct: pct, note: note.n, n: session.ids.length });
      store.set(K.history, hist.slice(0, 50));
      session.logged = true;
      saveSession();
    }
  }

  function fmt(n) { return String(Math.round(n * 10) / 10).replace('.', ','); }

  function reviewAnswer(t, a) {
    var h = '<div class="review-body">';
    if (t.type === 'single' || t.type === 'multi') {
      h += '<ul class="rev-opts">' + t.options.map(function (o, i) {
        var isC = t.type === 'single' ? t.correct === i : t.correct.indexOf(i) >= 0;
        var sel = t.type === 'single' ? a.value === i : (a.value || []).indexOf(i) >= 0;
        return '<li class="' + (isC ? 'opt-ok' : sel ? 'opt-bad' : '') + '">' + '<span class="box' + (sel ? ' on' : '') + '">' + (sel ? ICON('check') : '') + '</span>' + MD.inline(o) + '</li>';
      }).join('') + '</ul>';
    } else if (t.type === 'input') {
      h += '<p>Deine Antwort: <strong>' + esc(a.value || '–') + '</strong> · Lösung: <strong>' + esc(t.answers[0]) + (t.unit ? ' ' + esc(t.unit) : '') + '</strong></p>';
    } else if (t.type === 'order') {
      h += '<p>Richtige Reihenfolge:</p><ol>' + t.items.map(function (x) { return '<li>' + MD.inline(x) + '</li>'; }).join('') + '</ol>';
    } else {
      h += '<p><strong>Deine Antwort:</strong></p><pre class="code user">' + esc(a.value || '–') + '</pre>' +
        '<h4>Musterlösung</h4><div class="md">' + MD.render(t.solution) + '</div>';
      if (!a.checked) {
        h += '<p><strong>Selbstbewertung:</strong></p><div class="row wrap">' +
          '<button class="btn ok" data-rate="correct" data-rate-id="' + esc(t.id) + '">' + ICON('check') + 'Richtig</button>' +
          '<button class="btn part" data-rate="partial" data-rate-id="' + esc(t.id) + '">' + ICON('half') + 'Teilweise</button>' +
          '<button class="btn bad" data-rate="wrong" data-rate-id="' + esc(t.id) + '">' + ICON('x') + 'Falsch</button></div>';
      }
    }
    if (t.explanation) h += '<div class="md explanation">' + MD.render(t.explanation) + '</div>';
    return h + solPages(t) + '</div>';
  }

  /* ---------------- Statistik ---------------- */
  function viewStats() {
    var all = stats(TASKS);
    var html = '<header class="page-head"><div><p class="eyebrow">Lernstand</p><h1>Statistik</h1><p class="muted">Fortschritt je Thema, Schwachstellen und Prüfungsrelevanz.</p></div>' + ring(all.pct, 72) + '</header>';
    html += '<section class="kpis three">' +
      kpi('layers', 'Bearbeitet', all.total - all.open, 'von ' + all.total) +
      kpi('check', 'Richtig', all.correct, 'sicher gelöst') +
      kpi('repeat', 'Zu wiederholen', all.wrong + all.partial, 'falsch oder teilweise') + '</section>';
    if (EXAMS.length) html += '<div class="section-head"><h2>Prüfungsrelevanz der Themen</h2></div><div class="card relevance">' + relevanceList() + '</div>';

    CATS.forEach(function (c) {
      html += '<div class="section-head"><h2><span class="cat-ico sm ' + catClass(c.id) + '">' + ICON(CAT_ICON[c.id]) + '</span>' + esc(c.name) + '</h2></div><div class="card table-card"><table class="stat-table"><thead><tr><th>Thema</th><th>Aufgaben</th><th>Richtig</th><th>Falsch/teilw.</th><th>Fortschritt</th></tr></thead><tbody>';
      c.topics.forEach(function (t) {
        var s = stats(tasksOf(c.id, t.id));
        var weak = s.total - s.open > 0 && s.pct < 50;
        html += '<tr' + (weak ? ' class="weak"' : '') + '><td><a href="#/t/' + c.id + '/' + t.id + '">' + esc(t.name) + '</a>' + (weak ? ' <span class="badge bad-badge">Schwachstelle</span>' : '') + '</td><td>' + s.total + '</td><td>' + s.correct + '</td><td>' + (s.wrong + s.partial) + '</td><td class="bar-cell">' + bar(s) + '</td></tr>';
      });
      html += '</tbody></table></div>';
    });

    if (EXAMS.length) {
      html += '<div class="section-head"><h2>IHK-Prüfungen</h2></div><div class="card table-card"><table class="stat-table"><thead><tr><th>Termin</th>' + CATS.map(function (c) { return '<th>' + esc(c.short) + '</th>'; }).join('') + '<th>Gesamt</th></tr></thead><tbody>' +
        EXAMS.map(function (e) {
          return '<tr><td>' + esc(e.name) + '</td>' + CATS.map(function (c) {
            var l = examTasks(e.id, c.id);
            return '<td>' + (l.length ? stats(l).pct + '% <span class="muted small">(' + l.length + ')</span>' : '–') + '</td>';
          }).join('') + '<td class="bar-cell">' + bar(stats(examTasks(e.id))) + '</td></tr>';
        }).join('') + '</tbody></table></div>';
    }

    var hist = store.get(K.history, []);
    html += '<div class="section-head"><h2>Prüfungssimulationen</h2></div>';
    if (!hist.length) html += '<p class="muted">Noch keine Prüfungssimulation abgeschlossen.</p>';
    else {
      html += '<div class="card"><table class="stat-table"><thead><tr><th>Datum</th><th>Prüfung</th><th>Aufgaben</th><th>Ergebnis</th><th>Note</th></tr></thead><tbody>' +
        hist.map(function (h) {
          return '<tr><td>' + new Date(h.t).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' }) + '</td><td>' + esc(h.title) + '</td><td>' + h.n + '</td><td>' + h.pct + '%</td><td><span class="grade g' + h.note + '">' + h.note + '</span></td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    app.innerHTML = html;
  }

  function statTile(label, value) {
    return '<div class="card tile"><div class="big">' + value + '</div><div class="muted small">' + label + '</div></div>';
  }

  /* ---------------- Daten / Import ---------------- */
  function viewData() {
    var imported = store.get(K.imported, []);
    var html = '<header class="page-head"><div><p class="eyebrow">Verwaltung</p><h1>Daten &amp; Import</h1><p class="muted">Eigene Aufgaben einbinden und Lernfortschritt sichern.</p></div></header>' +
      '<div class="card"><h3 class="card-title">' + ICON('upload') + 'Eigene Aufgaben importieren</h3>' +
      '<p class="muted small">JSON-Datei mit einer Liste von Aufgaben (Format siehe <code>docs/aufgabenformat.md</code>). Aufgaben mit gleicher ID werden ersetzt. ' +
      'Tipp: Lass dir im Claude-Projekt-Chat Aufgaben aus deinen Lernthemen in diesem Format erzeugen.</p>' +
      '<div class="row wrap"><input type="file" id="file" accept=".json,application/json"><span class="muted small">Aktuell importiert: <strong>' + imported.length + '</strong></span></div>' +
      '<details><summary class="small">…oder JSON direkt einfügen</summary><textarea id="paste" class="free-input mono" rows="8" placeholder=\'[{"id":"eigen-1","cat":"ga2","topic":"sql","type":"single", ...}]\'></textarea>' +
      '<button class="btn" data-act="paste">Einfügen &amp; importieren</button></details>' +
      '<div class="row wrap"><button class="btn ghost" data-act="tpl">Beispieldatei herunterladen</button>' +
      '<button class="btn ghost" data-act="expTasks"' + (imported.length ? '' : ' disabled') + '>Importierte exportieren</button>' +
      '<button class="btn bad" data-act="delTasks"' + (imported.length ? '' : ' disabled') + '>Importierte löschen</button></div><div id="importMsg"></div></div>';

    html += '<div class="card"><h3 class="card-title">' + ICON('download') + 'Fortschritt sichern</h3><p class="muted small">Der Fortschritt liegt nur in diesem Browser. Sichere ihn als Datei, um ihn auf einen anderen Rechner zu übertragen.</p>' +
      '<div class="row wrap"><button class="btn" data-act="expProg">Fortschritt exportieren</button>' +
      '<label class="btn ghost">Fortschritt importieren<input type="file" id="progFile" accept=".json" hidden></label>' +
      '<button class="btn bad" data-act="reset">Fortschritt zurücksetzen</button></div></div>';

    html += '<div class="card table-card"><h3 class="card-title">' + ICON('layers') + 'Aufgabenbestand</h3><table class="stat-table"><thead><tr><th>Bereich</th>' +
      Object.keys(TYPE_LABEL).map(function (k) { return '<th>' + TYPE_LABEL[k] + '</th>'; }).join('') + '<th>Summe</th></tr></thead><tbody>' +
      CATS.map(function (c) {
        var l = tasksOf(c.id);
        return '<tr><td>' + esc(c.short) + '</td>' + Object.keys(TYPE_LABEL).map(function (k) { return '<td>' + l.filter(function (t) { return t.type === k; }).length + '</td>'; }).join('') + '<td><strong>' + l.length + '</strong></td></tr>';
      }).join('') + '</tbody></table></div>';
    app.innerHTML = html;

    var msg = function (text, ok) { document.getElementById('importMsg').innerHTML = '<p class="' + (ok ? 'ok-text' : 'bad-text') + '">' + text + '</p>'; };
    document.getElementById('file').addEventListener('change', function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () { importJSON(r.result, msg); };
      r.readAsText(f);
    });
    on('[data-act="paste"]', function () { importJSON(document.getElementById('paste').value, msg); });
    on('[data-act="tpl"]', function () { download('ap2-aufgaben-beispiel.json', JSON.stringify(SAMPLE, null, 2)); });
    on('[data-act="expTasks"]', function () { download('ap2-eigene-aufgaben.json', JSON.stringify(store.get(K.imported, []), null, 2)); });
    on('[data-act="delTasks"]', function () { if (confirm('Alle importierten Aufgaben löschen?')) { store.del(K.imported); loadTasks(); viewData(); } });
    on('[data-act="expProg"]', function () {
      download('ap2-fortschritt-' + new Date().toISOString().slice(0, 10) + '.json', JSON.stringify({ progress: progress(), history: store.get(K.history, []) }, null, 2));
    });
    document.getElementById('progFile').addEventListener('change', function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var d = JSON.parse(r.result);
          if (!d.progress) throw new Error('Kein Fortschritt in der Datei.');
          store.set(K.progress, d.progress);
          if (d.history) store.set(K.history, d.history);
          alert('Fortschritt importiert.');
          viewData();
        } catch (err) { alert('Import fehlgeschlagen: ' + err.message); }
      };
      r.readAsText(f);
    });
    on('[data-act="reset"]', function () {
      if (confirm('Gesamten Lernfortschritt und Prüfungshistorie löschen?')) { store.del(K.progress); store.del(K.history); viewData(); }
    });
  }

  function validateTask(t, i) {
    var where = 'Aufgabe ' + (i + 1) + (t && t.id ? ' (' + t.id + ')' : '');
    if (!t || typeof t !== 'object') return where + ': kein Objekt';
    if (!t.id) return where + ': "id" fehlt';
    if (!t.cat) return where + ': "cat" fehlt';
    if (!t.topic) return where + ': "topic" fehlt';
    if (!TYPE_LABEL[t.type]) return where + ': unbekannter "type" (erlaubt: ' + Object.keys(TYPE_LABEL).join(', ') + ')';
    if (!t.q) return where + ': "q" (Aufgabentext) fehlt';
    if (t.type === 'single' && (!Array.isArray(t.options) || typeof t.correct !== 'number' || !t.options[t.correct])) return where + ': "options" und gültiger Index "correct" nötig';
    if (t.type === 'multi' && (!Array.isArray(t.options) || !Array.isArray(t.correct) || !t.correct.length)) return where + ': "options" und Index-Liste "correct" nötig';
    if (t.type === 'input' && (!Array.isArray(t.answers) || !t.answers.length)) return where + ': "answers" (Liste) nötig';
    if (t.type === 'order' && (!Array.isArray(t.items) || t.items.length < 2)) return where + ': "items" (mind. 2, in richtiger Reihenfolge) nötig';
    if (t.type === 'free' && !t.solution) return where + ': "solution" (Musterlösung) nötig';
    return null;
  }

  function importJSON(text, msg) {
    var data;
    try { data = JSON.parse(text); } catch (e) { msg('Ungültiges JSON: ' + esc(e.message)); return; }
    var list = Array.isArray(data) ? data : data && Array.isArray(data.tasks) ? data.tasks : null;
    if (!list) { msg('Erwartet wird eine Liste von Aufgaben oder {"tasks": [...]}.'); return; }
    var errors = list.map(validateTask).filter(Boolean);
    if (errors.length) { msg('Nicht importiert:<br>' + errors.slice(0, 8).map(esc).join('<br>')); return; }
    var builtin = {};
    (window.AP2_TASKS || []).forEach(function (t) { builtin[t.id] = true; });
    var clash = list.filter(function (t) { return builtin[t.id]; });
    if (clash.length) { msg('Diese IDs gibt es bereits als eingebaute Aufgaben: ' + clash.map(function (t) { return esc(t.id); }).join(', ')); return; }
    var cur = store.get(K.imported, []).filter(function (t) { return !list.some(function (n) { return n.id === t.id; }); });
    store.set(K.imported, cur.concat(list));
    loadTasks();
    viewData();
    msg(list.length + ' Aufgabe(n) importiert.', true);
  }

  function download(name, text) {
    var blob = new Blob([text], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  var SAMPLE = [
    { id: 'eigen-sql-1', cat: 'ga2', topic: 'sql', type: 'single', points: 2,
      q: 'Welche Klausel filtert **Gruppen** nach einer Aggregation?', options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], correct: 1,
      explanation: '`WHERE` filtert Zeilen vor der Gruppierung, `HAVING` Gruppen danach.' },
    { id: 'eigen-rechnen-1', cat: 'ga2', topic: 'rechnen', type: 'input', numeric: true, points: 3,
      q: 'Wie viele Byte sind 3 KiB?', answers: ['3072'], unit: 'Byte' },
    { id: 'eigen-wiso-1', cat: 'wiso', topic: 'arbeitsrecht', type: 'free', points: 6,
      q: 'Nennen Sie drei Pflichten des Arbeitnehmers aus dem Arbeitsvertrag.', solution: '- Arbeitspflicht\n- Weisungsgebundenheit\n- Verschwiegenheitspflicht\n- Treuepflicht / Wettbewerbsverbot' }
  ];

  /* ---------------- Allgemein ---------------- */
  function on(sel, fn) { var el = app.querySelector(sel); if (el) el.addEventListener('click', fn); }

  function flash(text) {
    var d = document.createElement('div');
    d.className = 'toast';
    d.textContent = text;
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 2200);
  }

  document.addEventListener('keydown', function (e) {
    if (!session || location.hash !== '#/session' || session.finished) return;
    var tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'textarea' || (tag === 'input' && e.target.type === 'text');
    if (e.key === 'Enter' && !e.shiftKey && tag !== 'textarea') {
      var btn = app.querySelector('[data-act="check"]') || app.querySelector('[data-act="next"]') || app.querySelector('[data-act="finish"]');
      if (btn) { e.preventDefault(); btn.click(); }
      return;
    }
    if (typing) return;
    if (/^[1-9]$/.test(e.key)) {
      var opts = app.querySelectorAll('input[name="opt"]');
      var o = opts[+e.key - 1];
      if (o && !o.disabled) { o.click(); }
    } else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowLeft') move(-1);
  });

  function curTheme() {
    return document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function paintThemeBtn() {
    var b = document.getElementById('themeToggle');
    if (!b) return;
    var dark = curTheme() === 'dark';
    b.innerHTML = '<span class="ico">' + ICON(dark ? 'sun' : 'moon') + '</span><span class="nav-label">' + (dark ? 'Helles Design' : 'Dunkles Design') + '</span>';
  }
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = curTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    store.set(K.theme, next);
    paintThemeBtn();
  });
  paintThemeBtn();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }

  loadTasks();
  if (EXAMS.length) {
    var foot = document.querySelector('.footer');
    if (foot) foot.textContent = 'Übungsaufgaben im Stil der AP2 + lokal eingebundene IHK-Prüfungen (' + EXAMS.length + ' Termine, nur für den persönlichen Gebrauch). Fortschritt wird nur lokal im Browser gespeichert.';
  }
  if (session && !session.ids.every(function (id) { return BY_ID[id]; })) { session = null; store.del(K.session); }
  window.addEventListener('hashchange', route);
  route();
})();
