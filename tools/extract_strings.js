// Lists every Arabic string that still has no English translation.
// It runs each page in English mode (jsdom) and also scans T('…')/TF('…') literals in the app code,
// so strings that only appear in some UI states are caught too.
// usage: node tools/extract_strings.js            → prints counts, writes tools/missing-*.json
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const acorn = require('acorn');
const walk = require('acorn-walk');
const ROOT = path.resolve(__dirname, '..');
const AR = /[؀-ۿ]/;

// Inline the local scripts so jsdom runs the page exactly like a browser would, without network.
function runPage(file) {
  let html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  html = html.replace(/<link[^>]*>/g, '').replace(/<script src="([^"]+)"><\/script>/g,
    (_, src) => '<script>' + fs.readFileSync(path.join(ROOT, src.split('?')[0]), 'utf8').replace(/<\/script/g, '<\/script') + '</script>');
  const dom = new JSDOM(html, {
    runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/' + file,
    beforeParse(w) {
      w.localStorage.setItem('site_lang', 'en');
      w.IntersectionObserver = class { observe() {} };
      w.HTMLElement.prototype.scrollIntoView = function () {};
      w.addEventListener('error', e => console.error(file, 'ERROR', e.message));
    }
  });
  const w = dom.window;
  return { found: Object.keys(w.I18N_MISSING || {}), w };
}
function literalKeys(file, has) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const out = [];
  walk.simple(acorn.parse(src, { ecmaVersion: 2022 }), {
    CallExpression(n) {
      if (n.callee.type === 'Identifier' && (n.callee.name === 'T' || n.callee.name === 'TF') &&
          n.arguments[0] && n.arguments[0].type === 'Literal' && typeof n.arguments[0].value === 'string') {
        const k = n.arguments[0].value.trim().replace(/\s+/g, ' ');
        if (AR.test(k) && !has(k)) out.push(k);
      }
    }
  });
  return out;
}
(async () => {
  const pages = { common: 'index.html', n8n: 'n8n.html', english: 'english.html' };
  const apps = { n8n: 'assets/js/n8n-app.js', english: 'assets/js/english-app.js' };
  const seen = new Set();
  for (const [name, file] of Object.entries(pages)) {
    const { found, w } = runPage(file);
    // T() in i18n.js knows the dictionary; ask it whether a literal is covered
    const has = k => w.T(k) !== k;
    let keys = found.concat(apps[name] ? literalKeys(apps[name], has) : []);
    keys = [...new Set(keys)].filter(k => !seen.has(k));
    keys.forEach(k => seen.add(k));
    fs.writeFileSync(path.join(__dirname, `missing-${name}.json`), JSON.stringify(keys, null, 1));
    console.log(name, keys.length, 'missing');
  }
  process.exit(0);
})();
