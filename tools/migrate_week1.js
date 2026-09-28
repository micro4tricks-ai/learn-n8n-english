// One-off: builds week 1 of each track (content/<track>/weeks/w01.js) from the old 7-day intensive week.
// Days 1-5 of the old week become days 1-5; day 6 is review + weekly project + weekly test.
// English text comes from the existing dictionaries (assets/js/*-en.js); a missing translation stops the script.
// Old days 6-7 (English: pronunciation/interviews, n8n: AI/production) come back in months 5-6.
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const AR = /[؀-ۿ]/;
const js = f => fs.readFileSync(path.join(ROOT, 'assets/js', f), 'utf8');

function load(dataFile, key, dictFiles){
  const win = {}; win.window = win;
  vm.runInNewContext(js(dataFile), win);
  const dict = {};
  const ctx = { window: {}, I18N_ADD: d => Object.assign(dict, d) };
  ctx.window.I18N_ADD = ctx.I18N_ADD;
  dictFiles.forEach(f => vm.runInNewContext(js(f), ctx));
  return { D: win[key], dict };
}

function makeBi(dict, missing){
  return function bi(s){
    if(s == null) return s;
    if(!AR.test(s)) return s;
    const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const en = dict[m[2]];
    if(en == null){ missing.push(m[2]); return { ar: s, en: '' }; }
    return { ar: s, en: m[1] + en + m[3] };
  };
}

function question(bi){
  return x => ({ q: bi(x.q), o: x.o.map(bi), a: x.a, why: bi(x.why) });
}

function build(track, cfg){
  const missing = [];
  const bi = makeBi(cfg.dict, missing);
  const q = question(bi);
  const days = cfg.D.SPRINT.slice(0, 5).map(s => ({
    d: s.d,
    title: bi(s.title),
    goal: bi(s.goal),
    minutes: 120,
    learn: s.learn.map(l => ({ h: bi(l[0]), p: bi(l[1]), ex: bi(l[2]) })),
    practice: s.build.map(bi),
    code: (s.code || []).map(c => ({ u: bi(c.u), p: bi(c.p) })),
    words: cfg.words(s.d).map(w => ({ t: w.t, m: bi(w.m), ex: bi(w.ex) })),
    read: cfg.D.LIBRARY.filter(b => (b.days || []).indexOf(s.d) !== -1)
      .map(b => ({ t: bi(b.t), url: b.url, what: bi(b.read) })),
    challenge: bi(s.challenge),
    quiz: s.quiz.slice(0, 3).map(q)
  }));
  const test = [];
  cfg.D.SPRINT.slice(0, 5).forEach(s => s.quiz.slice(3).forEach(x => test.push(q(x))));
  days.push({
    d: 6,
    title: cfg.day6.title,
    goal: cfg.day6.goal,
    minutes: 120,
    review: days.slice(0, 5).map(d => ({ ar: 'راجع اليوم ' + d.d + ': ' + d.title.ar, en: 'Review day ' + d.d + ': ' + d.title.en })),
    project: cfg.day6.project,
    test
  });
  if(missing.length){
    console.error(track + ': missing translations:\n' + missing.map(s => '  ' + s.slice(0, 120)).join('\n'));
    process.exit(1);
  }
  const week = { track, n: 1, month: 1, level: cfg.level, title: cfg.title, goal: cfg.goal, days };
  const out = '// Week 1 (built from the old intensive week by tools/migrate_week1.js, then edited by hand).\n' +
    'JOURNEY.week(' + JSON.stringify(week, null, 1) + ');\n';
  const file = path.join(ROOT, 'content', track, 'weeks', 'w01.js');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  console.log(track + ': wrote ' + path.relative(ROOT, file) + ' (' + days.length + ' days, ' + test.length + ' test questions)');
}

const en = load('english-data.js', 'EN_DATA', ['common-en.js', 'english-en.js']);
build('english', {
  D: en.D, dict: en.dict, level: 'A1',
  words: d => en.D.VOCAB.filter(v => v.s === d).map(v => ({ t: v.term, m: v.mean, ex: v.ex })),
  title: { ar: 'اقرا الأخطاء والتوثيق واكتب وتواصل', en: 'Read errors and docs, write, and communicate' },
  goal: { ar: 'أسبوع البداية: تقرا رسائل الأخطاء والتوثيق، وتسمّي حاجات الكود صح، وتكتب commit وREADME، وتسأل وترد بالإنجليزي.',
          en: 'The starting week: read error messages and docs, name things in code well, write commits and a README, and ask and answer in English.' },
  day6: {
    title: { ar: 'مراجعة الأسبوع والاختبار', en: 'Week review and test' },
    goal: { ar: 'راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 2 بيفتح لما تجيب 70% أو أكتر.',
            en: 'Review the five days, hand in the weekly project, and take the weekly test. Week 2 opens when you score 70% or more.' },
    project: { ar: 'اكتب بالإنجليزي لمشروع صغير عندك: README (الوصف، والتشغيل، والاستخدام)، و3 رسائل commit، وbug report واحد، وإيميل قصير لعميل بيشرح اللي عملته. اقراهم بصوت عالي، وصحّح أي كلمة مش متأكد منها بالقاموس.',
               en: 'For a small project of yours, write in English: a README (description, setup, usage), 3 commit messages, one bug report, and a short email to a client explaining what you did. Read them out loud and check any word you are not sure about in a dictionary.' }
  }
});

const n8 = load('n8n-data.js', 'N8N_DATA', ['common-en.js', 'n8n-en.js']);
build('n8n', {
  D: n8.D, dict: n8.dict, level: { ar: 'مبتدئ', en: 'Beginner' },
  words: d => n8.D.TERMS.filter(v => v.s === d).map(v => ({ t: v.t, m: v.m, ex: v.ex })),
  title: { ar: 'عقل n8n: البيانات والـ APIs والربط', en: 'How n8n thinks: data, APIs and connections' },
  goal: { ar: 'أسبوع البداية: تفهم الـ items والـ Expressions، وتنادي APIs، وتربط Sheets وTelegram وGmail، وتحوّل البيانات، وتخلّي الـ Workflow يستحمل الأخطاء.',
          en: 'The starting week: understand items and expressions, call APIs, connect Sheets, Telegram and Gmail, transform data, and make a workflow survive errors.' },
  day6: {
    title: { ar: 'مراجعة الأسبوع والاختبار', en: 'Week review and test' },
    goal: { ar: 'راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 2 بيفتح لما تجيب 70% أو أكتر.',
            en: 'Review the five days, hand in the weekly project, and take the weekly test. Week 2 opens when you score 70% or more.' },
    project: { ar: 'ابني Workflow واحد بيجمع الأسبوع كله: Webhook بيستقبل طلب، وHTTP Request بيجيب بيانات من API، وIF بيفرز النتايج، وبيسجّل في Google Sheets، وبيبعت ملخص على Telegram، وليه Error Workflow. صدّره JSON واكتب README قصير بيشرح بيعمل إيه وإزاي تشغّله.',
               en: 'Build one workflow that combines the whole week: a Webhook receives a request, an HTTP Request gets data from an API, an IF sorts the results, it logs to Google Sheets, sends a summary on Telegram, and has an Error Workflow. Export it as JSON and write a short README that explains what it does and how to run it.' }
  }
});
