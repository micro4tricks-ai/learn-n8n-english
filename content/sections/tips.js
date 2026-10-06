// Sections of tips.html: a long-term reference of computer tips and tricks (see docs/ARCHITECTURE.md for the types).
// The cards of each category live in content/sections/tips-<cat>.js (SECTIONS.extend adds them to the «tips» section);
// the shortcut sheets are in tips-keys.js, the checklists in tips-lists.js and the glossary in tips-terms.js.
// Everything is written for this site from durable facts: no copied text, no adverts, only free/official tools named.
SECTIONS.add({
  page: 'tips', id: 'tips', order: 1, kind: 'tp', type: 'cards',
  title: { ar: 'النصايح حسب المجال', en: 'Tips by area' },
  nav: { ar: 'النصايح', en: 'Tips' },
  desc: {
    ar: 'مرجع عملي يعيش معاك: ويندوز، الملفات، النسخ الاحتياطي، الأمان والنصب، الباسوردات، الخصوصية، النت، المتصفح، الإيميل، الأوفيس، الموبايل، الصور والفيديو، الأجهزة، والبرامج المجانية. ابحث بكلمة (عربي أو إنجليزي) أو اختار تصنيف، وعلّم ⭐ على اللي هترجعله.\n\nالمسارات زي `Settings > System` مكتوبة بأسماء الإعدادات الإنجليزي زي ما بتظهر على الجهاز. الإصدارات بتتغيّر، فلو زرار اتنقل دوّر عليه باسمه في بحث الإعدادات.',
    en: 'A practical reference to keep: Windows, files, backups, security and scams, passwords, privacy, the internet, browsers, email, Office, phones, photos and video, hardware and free software. Search with a word or pick a category, and star ⭐ what you will come back to.\n\nPaths like `Settings > System` use the English names shown on the device. Versions change, so if a button has moved, search for its name in Settings.'
  },
  searchHint: { ar: 'مثلًا: باسورد، واي فاي، Excel، نسخ احتياطي، اسكرين…', en: 'e.g. password, Wi-Fi, Excel, backup, screenshot…' },
  cats: [
    { id: 'win', t: { ar: 'ويندوز', en: 'Windows' } },
    { id: 'files', t: { ar: 'الملفات والتخزين', en: 'Files and storage' } },
    { id: 'backup', t: { ar: 'النسخ الاحتياطي والاسترجاع', en: 'Backup and recovery' } },
    { id: 'fix', t: { ar: 'حل المشاكل', en: 'Troubleshooting' } },
    { id: 'sec', t: { ar: 'الأمان والنصب', en: 'Security and scams' } },
    { id: 'pass', t: { ar: 'الباسوردات والدخول', en: 'Passwords and sign-in' } },
    { id: 'priv', t: { ar: 'الخصوصية', en: 'Privacy' } },
    { id: 'net', t: { ar: 'النت والواي فاي', en: 'Internet and Wi-Fi' } },
    { id: 'web', t: { ar: 'المتصفح والبحث', en: 'Browsers and search' } },
    { id: 'mail', t: { ar: 'الإيميل', en: 'Email' } },
    { id: 'office', t: { ar: 'الأوفيس والجداول', en: 'Office and spreadsheets' } },
    { id: 'phone', t: { ar: 'الموبايل', en: 'Phones' } },
    { id: 'media', t: { ar: 'الصور والفيديو والصوت', en: 'Photos, video and audio' } },
    { id: 'hw', t: { ar: 'الأجهزة والشراء', en: 'Hardware and buying' } },
    { id: 'tools', t: { ar: 'برامج مجانية مفيدة', en: 'Useful free software' } },
    { id: 'ai', t: { ar: 'الذكاء الاصطناعي', en: 'AI assistants' } }
  ],
  items: []
});
