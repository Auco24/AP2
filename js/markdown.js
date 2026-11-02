/* Minimaler Markdown-Renderer für Aufgabentexte.
 * Unterstützt: Absätze, Überschriften (###), **fett**, *kursiv*, `code`,
 * ```Codeblöcke```, Listen (- / 1.), Tabellen (| a | b |), Zeilenumbruch.
 */
(function () {
  'use strict';

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function inline(s) {
    var codes = [];
    s = s.replace(/`([^`]+)`/g, function (_, c) {
      codes.push(c);
      return '\u0000' + (codes.length - 1) + '\u0000';
    });
    s = esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    return s.replace(/\u0000(\d+)\u0000/g, function (_, i) {
      return '<code>' + esc(codes[+i]) + '</code>';
    });
  }

  function render(src) {
    if (!src) return '';
    var lines = String(src).replace(/\r\n?/g, '\n').split('\n');
    var out = [];
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      // Codeblock
      var fence = line.match(/^\s*```(\w*)\s*$/);
      if (fence) {
        var buf = [];
        i++;
        while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) buf.push(lines[i++]);
        i++;
        out.push('<pre class="code"><code>' + esc(buf.join('\n')) + '</code></pre>');
        continue;
      }

      // Leerzeile
      if (/^\s*$/.test(line)) { i++; continue; }

      // Überschrift
      var h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        var lvl = Math.min(6, h[1].length + 2);
        out.push('<h' + lvl + '>' + inline(h[2]) + '</h' + lvl + '>');
        i++;
        continue;
      }

      // Tabelle
      if (/^\s*\|/.test(line)) {
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
        var cells = rows.map(function (r) {
          return r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(function (c) { return c.trim(); });
        });
        var hasHead = cells.length > 1 && cells[1].every(function (c) { return /^:?-{2,}:?$/.test(c); });
        var html = '<div class="table-wrap"><table>';
        if (hasHead) {
          html += '<thead><tr>' + cells[0].map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead>';
          cells = cells.slice(2);
        }
        html += '<tbody>' + cells.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
        out.push(html);
        continue;
      }

      // Listen
      if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
        var ordered = /^\s*\d+\./.test(line);
        var items = [];
        while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''));
          i++;
        }
        var tag = ordered ? 'ol' : 'ul';
        out.push('<' + tag + '>' + items.map(function (t) { return '<li>' + inline(t) + '</li>'; }).join('') + '</' + tag + '>');
        continue;
      }

      // Absatz
      var para = [];
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^\s*(```|\||#{1,4}\s|([-*]|\d+\.)\s+)/.test(lines[i])) {
        para.push(inline(lines[i]));
        i++;
      }
      out.push('<p>' + para.join('<br>') + '</p>');
    }
    return out.join('\n');
  }

  window.MD = { render: render, esc: esc, inline: inline };
})();
