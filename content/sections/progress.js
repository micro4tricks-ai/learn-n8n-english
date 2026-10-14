// Sections of progress.html («My achievements»); the section types come from assets/js/achieve.js.
SECTIONS.add({
  page: 'progress', id: 'summary', order: 1, kind: 'c', open: true,
  title: { ar: 'ملخص إنجازاتك', en: 'Your achievements' },
  desc: { ar: 'كل اللي خلّصته في الرحلات الأربعة، من المتصفح ده (ومن حسابك لما يزامن). اطبعه أو احفظه PDF واعرضه في الـ CV أو LinkedIn.', en: 'Everything you finished in the four journeys, from this browser (and from your account once it syncs). Print it or save it as a PDF to show on a CV or LinkedIn.' },
  type: 'achieve'
});
SECTIONS.add({
  page: 'progress', id: 'certs', order: 2, kind: 'c', open: true,
  title: { ar: 'شهاداتك', en: 'Your certificates' },
  desc: { ar: 'شهادة لكل شهر عدّيت امتحانه، وشهادة للرحلة كلها بعد الامتحان النهائي.', en: 'A certificate for every month whose exam you passed, and one for the whole journey after the final exam.' },
  type: 'certs'
});
