// Builds a one-file copy of a journey page for a claude.ai artifact: every local CSS/JS inlined, the 24 week
// files and the search index included (the artifact cannot fetch files), accounts, comments and the offline
// app left out (its frame blocks other hosts), and links to the other pages pointing at the live site.
// usage: node tools/build_artifact.js [n8n|english]   → dist/<page>-artifact.html (then publish it)
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LIVE = 'https://micro4tricks-ai.github.io/learn-n8n-english/';
const page = process.argv[2] || 'n8n';
if(!['n8n', 'english'].includes(page)){ console.error('usage: node tools/build_artifact.js n8n|english'); process.exit(2); }
const read = p => fs.readFileSync(path.join(ROOT, p.split('?')[0]), 'utf8');
const inline = code => '<script>\n' + code.replace(/<\/script/gi, '<\\/script') + '\n</script>';
const DROP = /^assets\/js\/(vendor\/supabase|account)\.js/;   // accounts need Supabase, which the frame blocks

let html = read(page + '.html');
const title = html.match(/<title>[^<]*<\/title>/)[0];
html = html
  .replace(/<!doctype html>\s*/i, '').replace(/<html[^>]*>\s*/i, '').replace(/<\/html>\s*$/i, '')
  .replace(/<head>\s*/i, '').replace(/<\/head>\s*/i, '').replace(/<body>\s*/i, '').replace(/<\/body>\s*/i, '')
  .replace(/<title>[^<]*<\/title>\s*/, '')
  .replace(/<!-- meta:[\s\S]*?<!-- \/meta -->\s*/, '')
  .replace(/<meta [^>]*>\s*/g, '')
  .replace(/<link rel="(icon|manifest|apple-touch-icon|preconnect|canonical)"[^>]*>\s*/g, '')
  .replace(/<link rel="stylesheet" href="assets\/css\/site\.css[^"]*">/, () => '<style>\n' + read('assets/css/site.css') +
    '\n/* one-file copy: printing is not available in the artifact frame */\n[data-jprint]{display:none!important;}\n</style>')
  .replace(/<script src="([^"]+)"><\/script>/g, (tag, src) => {
    const p = src.split('?')[0];
    if(/^https?:/.test(src) || DROP.test(p)) return '';
    if(p === 'assets/js/config.js')
      return inline('window.SITE_CONFIG = {};\nwindow.SITE_EMBED = { base: ' + JSON.stringify(LIVE) + ', here: ' + JSON.stringify(page + '.html') + ' };');
    let out = inline(read(p));
    // the week files and the search index go right after the outline / before the shell, so nothing is fetched
    if(p === 'content/' + page + '/outline.js')
      out += fs.readdirSync(path.join(ROOT, 'content', page, 'weeks')).filter(f => /^w\d\d\.js$/.test(f)).sort()
        .map(f => inline(read('content/' + page + '/weeks/' + f))).join('\n');
    if(p === 'assets/js/site.js') out = inline(read('assets/data/search-index.js')) + '\n' + out;
    return out;
  })
  .replace(/href="(index|n8n|english|review|lab|speak|prompts|sheets)\.html"/g, (_, p) => p === page ? 'href="#"' : 'href="' + LIVE + (p === 'index' ? '' : p + '.html') + '" target="_blank" rel="noopener"');

// The artifact frame misbehaves with an RTL root element, so the direction lives on <body> in the copy.
html = html.replace('document.documentElement.dir = ', 'document.body.dir = ')
  .replace(/html\[dir="(rtl|ltr)"\]/g, 'body[dir="$1"]');
if(html.includes('documentElement.dir')) throw new Error('direction patch failed');
if(/<script src="assets\//.test(html)) throw new Error('a local script was not inlined');

fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
const out = path.join(ROOT, 'dist', page + '-artifact.html');
fs.writeFileSync(out, title + '\n' + html);
console.log(path.relative(ROOT, out) + ': ' + (fs.statSync(out).size / 1024 / 1024).toFixed(2) + ' MB');
