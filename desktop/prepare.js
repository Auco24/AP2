/* Kopiert die Web-App (inkl. lokaler IHK-Daten, falls vorhanden) nach desktop/app. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const out = path.join(__dirname, 'app');
const items = ['index.html', 'manifest.webmanifest', 'css', 'js', 'data', 'fonts', 'icons', 'docs'];
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const it of items) {
  const src = path.join(root, it);
  if (fs.existsSync(src)) fs.cpSync(src, path.join(out, it), { recursive: true });
}
fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });
fs.copyFileSync(path.join(root, 'icons', 'icon-512.png'), path.join(__dirname, 'build', 'icon.png'));
console.log('Web-App nach desktop/app kopiert' + (fs.existsSync(path.join(root, 'data', 'ihk')) ? ' (inkl. IHK-Daten).' : '.'));
