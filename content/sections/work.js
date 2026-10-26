// Sections of work.html: workplace English in scenario modules (types workmods / workexam in assets/js/work.js).
// The module list follows the topics of freeCodeCamp's A2 and B1 «English for Developers» certifications;
// every dialogue, phrase and question here is original, written for this site.
// Modules are added by content/sections/work-a2.js and work-b1.js (SECTIONS.extend).
SECTIONS.add({
  page: 'work', id: 'a2', order: 1, kind: 'dl', type: 'workmods', items: [],
  title: { ar: 'مستوى A2: أول أيامك في الشغل', en: 'Level A2: your first days at work' },
  nav: { ar: 'A2', en: 'A2' },
  desc: {
    ar: 'مواقف كل يوم في شركة برمجة: تعرّف نفسك، وتتكلم في الاستراحة، وتوصف يومك ومشروعك، وتسأل عن الكود والتوثيق، وتشارك تقدّمك في الـ stand-up. كل موديول: حوار قصير تسمعه سطر سطر، وجمل تاخدها معاك، واختبار صغير. ابدأ من الأول بالترتيب.',
    en: 'Everyday moments in a software company: introduce yourself, chat in the break room, describe your day and your project, ask about code and docs, and share your progress in the stand-up. Each module: a short dialogue to hear line by line, phrases to keep, and a small quiz. Start at the top and go in order.'
  }
});
SECTIONS.add({
  page: 'work', id: 'b1', order: 2, kind: 'dl', type: 'workmods', items: [],
  title: { ar: 'مستوى B1: تتكلم بثقة في الفريق', en: 'Level B1: speaking with confidence in the team' },
  nav: { ar: 'B1', en: 'B1' },
  desc: {
    ar: 'بعد A2: تحكي اللي حصل في الماضي، وتخطط للي جاي، وتستخدم الشرط والأفعال الناقصة، وتدّي feedback، وتوافق وتعترض بأدب، وتقارن وتقرر، وتنقل كلام غيرك، وتتكلم عن الأرقام، وأشهر الـ phrasal verbs في الشغل.',
    en: 'After A2: tell what happened in the past, plan what comes next, use conditionals and modal verbs, give feedback, agree and disagree politely, compare and decide, report what others said, talk about numbers, and the most common phrasal verbs at work.'
  }
});
SECTIONS.add({
  page: 'work', id: 'exams', order: 3, type: 'workexam',
  levels: [{ id: 'a2', t: { ar: 'امتحان A2', en: 'A2 exam' } }, { id: 'b1', t: { ar: 'امتحان B1', en: 'B1 exam' } }],
  title: { ar: 'امتحان كل مستوى', en: 'The level exams' },
  nav: { ar: 'الامتحانات', en: 'Exams' },
  desc: {
    ar: 'لما تخلّص موديولات المستوى، ادخل امتحانه: 20 سؤال عشوائي من كل أسئلة المستوى، والنجاح 80%. كل مرة الأسئلة بتتغيّر، واللي تغلط فيه بيروح دفتر الأخطاء في صفحة المراجعة.',
    en: 'When you finish a level\'s modules, take its exam: 20 random questions from all of that level\'s questions, pass mark 80%. The questions change every time, and the ones you miss go to the mistakes notebook on the review page.'
  }
});
