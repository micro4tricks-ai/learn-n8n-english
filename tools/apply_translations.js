// Freeze the missing keys (tools/missing-*.json), then write the English for the new indexes into a new tools/i18n/<page>-NN.json.
// translations.json is {"Arabic key": "English"}. usage: npm run i18n:missing, then node tools/apply_translations.js translations.json, then npm run i18n:build
const fs = require('fs'), path = require('path'), cp = require('child_process');
const ROOT = process.cwd(), DIR = path.join(ROOT, 'tools/i18n');
const tr = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const pages = ['common', 'n8n', 'english'];
const before = {};
for (const p of pages) before[p] = JSON.parse(fs.readFileSync(path.join(DIR, p + '-keys.json'), 'utf8')).length;
try { cp.execSync('node tools/make_dicts.js --freeze', { stdio: 'pipe' }); } catch (e) {}
let bad = 0;
for (const p of pages) {
  const keys = JSON.parse(fs.readFileSync(path.join(DIR, p + '-keys.json'), 'utf8'));
  const out = {};
  for (let i = before[p]; i < keys.length; i++) {
    if (tr[keys[i]] == null) { console.log('NO TRANSLATION', p, i, keys[i]); bad++; continue; }
    out[i] = tr[keys[i]];
  }
  if (!Object.keys(out).length) continue;
  const nums = fs.readdirSync(DIR).map(f => (f.match(new RegExp('^' + p + '-(\\d+)\\.json$')) || [])[1]).filter(Boolean).map(Number);
  const n = String(Math.max(0, ...nums) + 1).padStart(2, '0');
  const body = '{\n' + Object.keys(out).map(k => JSON.stringify(k) + ': ' + JSON.stringify(out[k])).join(',\n') + '\n}\n';
  fs.writeFileSync(path.join(DIR, p + '-' + n + '.json'), body);
  console.log(p, 'wrote', p + '-' + n + '.json', Object.keys(out).length);
}
process.exit(bad ? 1 : 0);
