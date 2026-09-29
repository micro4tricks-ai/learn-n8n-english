// Sections of review.html. The types (srs, mistakes, stats, backup) live in assets/js/review.js.
SECTIONS.add({
  page: 'review', id: 'today', order: 1, type: 'srs',
  title: { ar: 'مراجعة النهارده', en: "Today's review" },
  nav: { ar: 'مراجعة النهارده', en: 'Today' },
  desc: {
    ar: 'كل يوم 10–15 دقيقة. البطاقة بتظهر لك في الوقت اللي قبل ما تنساها بالظبط، بخوارزمية **FSRS** (نفس اللي في Anki). شوف الكلمة، افتكر معناها **قبل** ما تقلب، وبعدين قيّم نفسك بصراحة: الخوارزمية بتتعلم من تقييمك.',
    en: 'Ten to fifteen minutes a day. Each card comes back just before you would forget it, scheduled by **FSRS** (the same algorithm as Anki). Look at the word, recall the meaning **before** you flip, then rate yourself honestly: the algorithm learns from your ratings.'
  }
});
SECTIONS.add({
  page: 'review', id: 'mistakes', order: 2, type: 'mistakes',
  title: { ar: 'دفتر الأخطاء', en: 'Mistakes notebook' },
  desc: {
    ar: 'أي سؤال غلطت فيه في الرحلة أو الامتحانات أو اختبارات القواعد بيتسجل هنا لوحده. جاوبه صح مرتين ورا بعض وهيتشال. الأسئلة بتيجي مخلوطة من مواضيع مختلفة، وده بيثبّت المعلومة أكتر من مراجعة موضوع واحد.',
    en: 'Every question you get wrong in the journey, the exams or the grammar quizzes lands here by itself. Answer it right twice in a row and it leaves. Questions come mixed from different topics, which makes them stick better than reviewing one topic at a time.'
  }
});
SECTIONS.add({
  page: 'review', id: 'stats', order: 3, type: 'stats',
  title: { ar: 'إحصائياتي', en: 'My stats' },
  desc: {
    ar: 'أيام مذاكرتك، وأحسن درجة في كل اختبار أسبوعي في الرحلتين، ونقط ضعفك من دفتر الأخطاء.',
    en: 'Your study days, your best score in every weekly test of both journeys, and your weak spots from the mistakes notebook.'
  }
});
SECTIONS.add({
  page: 'review', id: 'backup', order: 4, type: 'backup',
  title: { ar: 'نسخة احتياطية واستخدام من غير نت', en: 'Backup and offline use' },
  nav: { ar: 'نسخة احتياطية', en: 'Backup' },
  desc: {
    ar: 'نزّل كل تقدّمك في ملف واحد ورجّعه على أي جهاز أو متصفح، حتى من غير حساب. وتقدر تحمّل الموقع كله عشان تذاكر من غير نت.',
    en: 'Download all your progress as one file and restore it on any device or browser, even without an account. You can also keep the whole site for studying offline.'
  }
});
