// Section of tips.html: printable keyboard-shortcut sheets (type sheets). Each sheet: id, t, sub, groups [{t, rows [[keys, meaning]]}].
(function(){
function R(keys, ar, en){ return [keys, { ar: ar, en: en }]; }
function G(ar, en, rows){ return { t: { ar: ar, en: en }, rows: rows }; }
SECTIONS.add({
  page: 'tips', id: 'keys', order: 3, kind: 's', type: 'sheets',
  title: { ar: 'ورق الاختصارات', en: 'Shortcut sheets' },
  nav: { ar: 'الاختصارات', en: 'Shortcuts' },
  desc: {
    ar: 'كل ورقة صفحة A4 تطبعها وتحطها جنب الشاشة. اتعلّم 3 اختصارات في الأسبوع لحد ما إيدك تعملها لوحدها.',
    en: 'Each sheet is one A4 page to print and keep by your screen. Learn 3 shortcuts a week until your hands do them by themselves.'
  },
  items: [
    { id: 'k-windows', t: { ar: 'ويندوز: الأساسيات', en: 'Windows essentials' }, sub: { ar: 'زرار Win هو زرار شعار ويندوز.', en: 'Win is the Windows logo key.' }, groups: [
      G('عام', 'General', [
        R('Win', 'قائمة Start والبحث', 'Start menu and search'),
        R('Win + I', 'الإعدادات', 'Settings'),
        R('Win + E', 'مستكشف الملفات File Explorer', 'File Explorer'),
        R('Win + D', 'إظهار سطح المكتب', 'Show the desktop'),
        R('Win + L', 'قفل الجهاز', 'Lock the PC'),
        R('Win + X', 'قائمة الأدوات السريعة (Terminal أدمن، Disk Management…)', 'Quick tools menu (admin Terminal, Disk Management…)'),
        R('Win + R', 'نافذة Run', 'The Run box'),
        R('Win + A', 'الإعدادات السريعة', 'Quick Settings'),
        R('Win + N', 'الإشعارات والتقويم', 'Notifications and calendar'),
        R('Win + .', 'إيموجي ورموز', 'Emoji and symbols')
      ]),
      G('الشبابيك', 'Windows', [
        R('Alt + Tab', 'التنقل بين الشبابيك', 'Switch windows'),
        R('Win + Tab', 'كل الشبابيك وأسطح المكتب', 'Task view and desktops'),
        R('Win + ← / →', 'نص الشاشة شمال/يمين', 'Snap left/right'),
        R('Win + ↑ / ↓', 'تكبير / تصغير', 'Maximise / minimise'),
        R('Win + Z', 'أشكال التقسيم', 'Snap layouts'),
        R('Win + Shift + ← / →', 'نقل الشباك للشاشة التانية', 'Move window to the other screen'),
        R('Win + Ctrl + D', 'سطح مكتب جديد', 'New virtual desktop'),
        R('Win + Ctrl + ← / →', 'التنقل بين أسطح المكتب', 'Switch desktops'),
        R('Alt + F4', 'قفل البرنامج', 'Close the app'),
        R('Win + P', 'وضع الشاشة التانية / البروجيكتور', 'Second screen / projector mode'),
        R('Win + K', 'التوصيل بشاشة لاسلكية', 'Connect to a wireless display')
      ]),
      G('مفيد وقت الأزمات', 'When things go wrong', [
        R('Ctrl + Shift + Esc', 'Task Manager على طول', 'Task Manager directly'),
        R('Ctrl + Alt + Del', 'شاشة الأمان (قفل، تسجيل خروج، Task Manager)', 'Security screen (lock, sign out, Task Manager)'),
        R('Win + Ctrl + Shift + B', 'إعادة تشغيل كارت الشاشة', 'Restart the graphics driver'),
        R('Shift + Restart', 'خيارات الإصلاح (WinRE)', 'Recovery options (WinRE)')
      ])
    ] },
    { id: 'k-capture', t: { ar: 'ويندوز: الحافظة والسكرين شوت والصوت', en: 'Windows: clipboard, capture and voice' }, sub: { ar: 'كلها مدمجة من غير برامج.', en: 'All built in, no extra software.' }, groups: [
      G('النسخ واللصق', 'Copy and paste', [
        R('Ctrl + C / X / V', 'نسخ / قص / لصق', 'Copy / cut / paste'),
        R('Ctrl + Shift + V', 'لصق من غير تنسيق (أغلب البرامج)', 'Paste as plain text (most apps)'),
        R('Win + V', 'سجل الحافظة والمثبّتات', 'Clipboard history and pins'),
        R('Ctrl + Z / Y', 'تراجع / إعادة', 'Undo / redo'),
        R('Ctrl + A', 'تحديد الكل', 'Select all')
      ]),
      G('الشاشة', 'Screen', [
        R('Win + Shift + S', 'سكرين شوت بـ Snipping Tool', 'Screenshot with Snipping Tool'),
        R('Win + Shift + R', 'تسجيل فيديو للشاشة', 'Record the screen'),
        R('PrtScn', 'سكرين شوت (أو Snipping Tool حسب الإعداد)', 'Screenshot (or Snipping Tool, per setting)'),
        R('Win + PrtScn', 'سكرين شوت يتحفظ في Pictures', 'Screenshot saved to Pictures'),
        R('Win + Alt + R', 'تسجيل بـ Game Bar', 'Record with Game Bar'),
        R('Win + G', 'شريط الألعاب Game Bar', 'Game Bar')
      ]),
      G('الصوت والكلام', 'Voice and speech', [
        R('Win + H', 'الكتابة بالصوت', 'Voice typing'),
        R('Win + Ctrl + S', 'Voice Access: التحكم بالصوت', 'Voice Access: control by voice'),
        R('Win + Ctrl + L', 'الترجمة النصية Live captions', 'Live captions'),
        R('Win + Ctrl + V', 'اختيار السماعة بسرعة', 'Quick sound output switcher')
      ]),
      G('الإتاحة', 'Accessibility', [
        R('Win + U', 'إعدادات Accessibility', 'Accessibility settings'),
        R('Win + + / Win + Esc', 'المكبّر تشغيل / قفل', 'Magnifier on / off'),
        R('Ctrl + Alt + M', 'تغيير وضع المكبّر', 'Cycle Magnifier views'),
        R('Win + Ctrl + Enter', 'قارئ الشاشة Narrator', 'Narrator'),
        R('Win + Ctrl + C', 'فلاتر الألوان (لو مفعّلة)', 'Colour filters (if enabled)')
      ])
    ] },
    { id: 'k-explorer', t: { ar: 'مستكشف الملفات (File Explorer)', en: 'File Explorer' }, sub: { ar: 'إدارة الملفات بالكيبورد.', en: 'Managing files from the keyboard.' }, groups: [
      G('التنقل', 'Navigation', [
        R('Win + E', 'فتح File Explorer', 'Open File Explorer'),
        R('Alt + D  /  Ctrl + L', 'شريط العنوان', 'Address bar'),
        R('Alt + ↑', 'الفولدر الأب', 'Parent folder'),
        R('Alt + ← / →', 'رجوع / قدّام', 'Back / forward'),
        R('Ctrl + F  /  F3', 'البحث', 'Search'),
        R('Ctrl + T / W', 'تابة جديدة / قفل التابة', 'New tab / close tab'),
        R('Ctrl + Tab', 'التابة اللي بعدها', 'Next tab')
      ]),
      G('الملفات', 'Files', [
        R('Ctrl + Shift + N', 'فولدر جديد', 'New folder'),
        R('F2', 'تغيير الاسم (ولكذا ملف مرة واحدة)', 'Rename (also several at once)'),
        R('Alt + Enter', 'الخصائص', 'Properties'),
        R('Ctrl + Shift + C', 'نسخ المسار', 'Copy as path'),
        R('Delete', 'لسلة المحذوفات', 'To the Recycle Bin'),
        R('Shift + Delete', 'مسح نهائي (خلي بالك)', 'Delete permanently (careful)'),
        R('Ctrl + Z', 'تراجع عن آخر نقل أو مسح', 'Undo the last move or delete'),
        R('Shift + Right-click', 'القائمة الكاملة', 'Full context menu'),
        R('Ctrl + Space (PowerToys)', 'معاينة الملف بـ Peek', 'Preview with Peek')
      ])
    ] },
    { id: 'k-browser', t: { ar: 'المتصفح', en: 'Browsers' }, sub: { ar: 'Chrome وEdge وFirefox وBrave.', en: 'Chrome, Edge, Firefox and Brave.' }, groups: [
      G('التابات', 'Tabs', [
        R('Ctrl + T', 'تابة جديدة', 'New tab'),
        R('Ctrl + W', 'قفل التابة', 'Close tab'),
        R('Ctrl + Shift + T', 'رجّع آخر تابة اتقفلت', 'Reopen the last closed tab'),
        R('Ctrl + Tab  /  Ctrl + 1…8', 'التنقل / تابة برقمها', 'Next tab / tab by number'),
        R('Ctrl + Shift + N  (Firefox: P)', 'نافذة خاصة', 'Private window'),
        R('Ctrl + Shift + A', 'بحث في التابات', 'Search tabs'),
        R('Middle-click', 'فتح لينك في تابة / قفل تابة', 'Open link in tab / close tab')
      ]),
      G('الصفحة', 'The page', [
        R('Ctrl + L  /  Alt + D', 'شريط العنوان', 'Address bar'),
        R('Ctrl + F', 'بحث في الصفحة', 'Find on page'),
        R('Ctrl + + / − / 0', 'تكبير / تصغير / رجوع', 'Zoom in / out / reset'),
        R('F5  /  Ctrl + F5', 'تحديث / تحديث من غير كاش', 'Reload / reload without cache'),
        R('Ctrl + P', 'طباعة أو حفظ PDF', 'Print or save as PDF'),
        R('F7', 'التصفح بمؤشر الكتابة', 'Caret browsing'),
        R('F9 (Edge, Firefox)', 'وضع القراءة', 'Reader mode'),
        R('Ctrl + Shift + S (Firefox)', 'سكرين شوت للصفحة كلها', 'Full-page screenshot')
      ]),
      G('البيانات', 'Data', [
        R('Ctrl + D', 'حفظ في المفضلة', 'Bookmark the page'),
        R('Ctrl + Shift + B', 'شريط المفضلة', 'Bookmarks bar'),
        R('Ctrl + H', 'التاريخ', 'History'),
        R('Ctrl + J', 'التحميلات', 'Downloads'),
        R('Ctrl + Shift + Delete', 'مسح بيانات التصفح', 'Clear browsing data')
      ]),
      G('يوتيوب', 'YouTube', [
        R('K', 'تشغيل / إيقاف', 'Play / pause'),
        R('J / L', '10 ثواني لورا / لقدّام', 'Back / forward 10 s'),
        R('M  /  F  /  C', 'كتم / ملء الشاشة / الترجمة', 'Mute / full screen / captions'),
        R('Shift + > / <', 'أسرع / أبطأ', 'Faster / slower'),
        R('Ctrl + → / ←', 'الفصل اللي بعده / قبله', 'Next / previous chapter')
      ])
    ] },
    { id: 'k-text', t: { ar: 'الكتابة ووورد', en: 'Typing and Word' }, sub: { ar: 'أغلبها شغال في أي برنامج كتابة.', en: 'Most work in any text program.' }, groups: [
      G('التحرك والتحديد', 'Moving and selecting', [
        R('Ctrl + ← / →', 'كلمة كلمة', 'Word by word'),
        R('Home / End', 'أول / آخر السطر', 'Start / end of line'),
        R('Ctrl + Home / End', 'أول / آخر المستند', 'Start / end of document'),
        R('Shift + Arrows', 'تحديد', 'Select'),
        R('Ctrl + Shift + ← / →', 'تحديد كلمة كلمة', 'Select word by word'),
        R('Double / triple click', 'تحديد كلمة / فقرة', 'Select word / paragraph'),
        R('Ctrl + Backspace', 'مسح الكلمة اللي قبل المؤشر', 'Delete the previous word')
      ]),
      G('التنسيق', 'Formatting', [
        R('Ctrl + B / I / U', 'بولد / مائل / تحت خط', 'Bold / italic / underline'),
        R('Ctrl + Space', 'شيل تنسيق الحروف', 'Clear character formatting'),
        R('Ctrl + E / L / R / J', 'توسيط / شمال / يمين / ضبط', 'Centre / left / right / justify'),
        R('Ctrl + Shift + 8', 'إظهار علامات التنسيق ¶', 'Show formatting marks ¶'),
        R('Ctrl + D', 'نافذة الخط', 'Font dialog'),
        R('F4', 'كرّر آخر حاجة', 'Repeat last action')
      ]),
      G('وورد', 'Word', [
        R('Ctrl + H', 'بحث واستبدال', 'Find and replace'),
        R('Ctrl + G  /  F5', 'روح لصفحة أو علامة', 'Go to page or bookmark'),
        R('Shift + F5', 'آخر مكان كنت بتعدّل فيه', 'Last edit position'),
        R('Ctrl + Enter', 'صفحة جديدة', 'Page break'),
        R('Shift + Enter', 'سطر جديد في نفس الفقرة', 'Line break in the same paragraph'),
        R('Shift + Alt + D / T', 'التاريخ / الوقت', 'Date / time'),
        R('Alt + F3  →  F3', 'حفظ نص متكرر واستدعاؤه', 'Save and insert reusable text'),
        R('Alt', 'حروف لكل أمر في الشريط', 'Letters for every ribbon command')
      ])
    ] },
    { id: 'k-excel', t: { ar: 'إكسيل والجداول', en: 'Excel and spreadsheets' }, sub: { ar: 'إكسيل؛ وأغلبها في LibreOffice Calc وGoogle Sheets.', en: 'Excel; most also work in LibreOffice Calc and Google Sheets.' }, groups: [
      G('التنقل', 'Moving', [
        R('Enter / Shift + Enter', 'تحت / فوق', 'Down / up'),
        R('Tab / Shift + Tab', 'يمين / شمال', 'Right / left'),
        R('Ctrl + Arrows', 'آخر البيانات في الاتجاه ده', 'Edge of the data'),
        R('Ctrl + Shift + Arrows', 'تحديد لحد آخر البيانات', 'Select to the edge'),
        R('Ctrl + Home / End', 'أول خلية / آخر خلية مستخدمة', 'First / last used cell'),
        R('Ctrl + PageUp / PageDown', 'الشيت اللي قبله / بعده', 'Previous / next sheet'),
        R('F2', 'تعديل الخلية', 'Edit the cell')
      ]),
      G('شغل سريع', 'Fast work', [
        R('Ctrl + 1', 'تنسيق الخلايا', 'Format cells'),
        R('Alt + =', 'جمع تلقائي', 'AutoSum'),
        R('Ctrl + E', 'Flash Fill: كمّل العمود من مثال', 'Flash Fill from one example'),
        R('Ctrl + T', 'تحويل لجدول', 'Make a table'),
        R('Ctrl + ;  /  Ctrl + Shift + ;', 'تاريخ / وقت النهارده', 'Today\'s date / time'),
        R('Ctrl + D / R', 'نسخ لتحت / لليمين', 'Fill down / right'),
        R('F4 (in a formula)', 'مرجع ثابت $A$1', 'Absolute reference $A$1'),
        R('Ctrl + `', 'إظهار المعادلات', 'Show formulas'),
        R('Ctrl + 5', 'شطب', 'Strikethrough'),
        R('Ctrl + Shift + L', 'فلتر', 'Filter'),
        R('Ctrl + Space / Shift + Space', 'تحديد العمود / الصف', 'Select column / row')
      ])
    ] },
    { id: 'k-run', t: { ar: 'أوامر Run وTerminal المفيدة', en: 'Useful Run and Terminal commands' }, sub: { ar: '`Win+R` واكتب الأمر، أو في Terminal.', en: '`Win+R` and type the command, or in Terminal.' }, groups: [
      G('أدوات النظام', 'System tools', [
        R('msinfo32', 'معلومات الجهاز كاملة', 'Full system information'),
        R('winver', 'نسخة ويندوز', 'Windows version'),
        R('taskmgr', 'مدير المهام Task Manager', 'Task Manager'),
        R('devmgmt.msc', 'Device Manager (التعريفات)', 'Device Manager (drivers)'),
        R('diskmgmt.msc', 'إدارة الأقراص Disk Management', 'Disk Management'),
        R('eventvwr.msc', 'سجل الأحداث', 'Event Viewer'),
        R('services.msc', 'الخدمات', 'Services'),
        R('taskschd.msc', 'المهام المجدولة', 'Task Scheduler'),
        R('cleanmgr', 'تنضيف الهارد Disk Cleanup', 'Disk Cleanup'),
        R('mdsched.exe', 'اختبار الرامات', 'Memory test'),
        R('rstrui', 'استرجاع النظام System Restore', 'System Restore'),
        R('wsreset', 'إصلاح Microsoft Store', 'Reset Microsoft Store'),
        R('netplwiz', 'حسابات المستخدمين', 'User accounts')
      ]),
      G('فولدرات خاصة', 'Special folders', [
        R('shell:startup', 'فولدر البرامج اللي بتشتغل مع ويندوز', 'Startup folder'),
        R('shell:sendto', 'قائمة Send to', 'Send to menu'),
        R('%temp%', 'الملفات المؤقتة', 'Temporary files'),
        R('%appdata%', 'إعدادات البرامج', 'Program settings')
      ]),
      G('Terminal (أدمن)', 'Terminal (admin)', [
        R('sfc /scannow', 'إصلاح ملفات الويندوز', 'Repair Windows files'),
        R('DISM /Online /Cleanup-Image /RestoreHealth', 'إصلاح مصدر ملفات الويندوز', 'Repair the Windows image'),
        R('chkdsk X: /f', 'فحص وإصلاح درايف', 'Check and fix a drive'),
        R('ipconfig /flushdns', 'مسح كاش الـ DNS', 'Clear the DNS cache'),
        R('winget upgrade --all', 'تحديث كل البرامج', 'Update all programs'),
        R('powercfg /batteryreport', 'تقرير صحة البطارية', 'Battery health report'),
        R('shutdown /s /t 3600', 'إطفاء بعد ساعة', 'Shut down in an hour'),
        R('shutdown /a', 'إلغاء الإطفاء المجدول', 'Cancel a scheduled shutdown')
      ])
    ] },
    { id: 'k-phone', t: { ar: 'الموبايل: أكواد وإيماءات', en: 'Phones: codes and gestures' }, sub: { ar: 'بعضها بيختلف حسب الشركة.', en: 'Some vary by brand.' }, groups: [
      G('أكواد', 'Codes', [
        R('*#06#', 'رقم الـ IMEI (وEID للـ eSIM)', 'IMEI number (and EID for eSIM)'),
        R('*#*#4636#*#*', 'معلومات الشبكة والإشارة (أندرويد)', 'Network and signal info (Android)'),
        R('*3001#12345#*', 'Field Test لقوة الإشارة (آيفون)', 'Field Test for signal strength (iPhone)'),
        R('*#0*#', 'قائمة اختبار الشاشة والحساسات (سامسونج)', 'Screen and sensor test menu (Samsung)')
      ]),
      G('أزرار وإيماءات', 'Buttons and gestures', [
        R('Power + Volume Down', 'سكرين شوت', 'Screenshot'),
        R('Back Tap (iPhone)', 'خبطتين على ضهر الموبايل لأمر تختاره', 'Tap the back twice for a chosen action'),
        R('Volume Up, Volume Down, hold Side', 'إعادة تشغيل إجبارية (آيفون)', 'Force restart (iPhone)'),
        R('Power ×5', 'نداء الطوارئ SOS (حسب الإعداد)', 'Emergency SOS (per setting)'),
        R('Long-press address bar', 'تحريك شريط العنوان فوق/تحت (Chrome أندرويد)', 'Move the address bar up/down (Chrome Android)')
      ])
    ] }
  ]
});
})();
