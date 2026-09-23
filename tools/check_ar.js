// Lists lines where Arabic text is not wrapped in T('…') / TF('…')
const fs = require('fs');
const f = process.argv[2];
fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
  const rest = l.replace(/TF?\('(?:[^'\\]|\\.)*'/g, '');
  if (/[؀-ۿ]/.test(rest) && !/^\s*\/\//.test(l)) console.log(i + 1, l.trim().slice(0, 180));
});
