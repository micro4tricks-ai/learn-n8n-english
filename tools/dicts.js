// The pages load their English dictionaries with <script>I18N.en('common-en', 'n8n-en')</script>, which writes the
// <script> tags in place on English pages only (assets/js/i18n.js). jsdom does not run scripts written that way in
// order, so the tools that read a page swap the call for the plain tags first.
//   dicts(html, lang)  → html with the tags (English) or without them (Arabic)
//   dicts.names(html)  → the dictionary files a page uses, e.g. ['assets/js/common-en.js', …]
const CALL = /<script>I18N\.en\(([^)]*)\)<\/script>/g;
const list = args => args.split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
function dicts(html, lang){
  return html.replace(CALL, (_, a) => lang === 'en' ? list(a).map(n => '<script src="assets/js/' + n + '.js"></script>').join('\n') : '');
}
dicts.names = html => [...html.matchAll(CALL)].flatMap(m => list(m[1]).map(n => 'assets/js/' + n + '.js'));
module.exports = dicts;
