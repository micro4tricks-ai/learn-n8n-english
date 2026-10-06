// Section of tips.html: ready checklists for common situations (type lessons, each with a «done» mark).
(function(){
function L(id, min, t, body, tryIt){
  var o = { id: id, min: min, t: { ar: t[0], en: t[1] }, body: { ar: body[0], en: body[1] } };
  if(tryIt) o['try'] = { ar: tryIt[0], en: tryIt[1] };
  return o;
}
SECTIONS.add({
  page: 'tips', id: 'lists', order: 2, kind: 'ls', type: 'lessons',
  title: { ar: 'قوايم جاهزة للمواقف المهمة', en: 'Ready checklists for key moments' },
  nav: { ar: 'القوايم', en: 'Checklists' },
  desc: {
    ar: 'خطوات بالترتيب للحاجات اللي بتحصل مرة كل فترة وبننسى نعملها صح. علّم على القايمة لما تخلّصها.',
    en: 'Ordered steps for things that happen now and then and are easy to get wrong. Tick a checklist when you finish it.'
  },
  doneLabel: { ar: 'عملت القايمة دي', en: 'I did this checklist' },
  items: [
    L('cl-new-pc', 20,
      ["إعداد جهاز كمبيوتر جديد", "Setting up a new PC"],
      ["1. حدّث الويندوز لحد ما مايبقاش فيه تحديثات (`Settings > Windows Update`).\n2. اعمل حساب **Standard** لشغلك اليومي، وسيب الأدمن للتثبيت.\n3. فعّل **Windows Hello** (PIN أو بصمة).\n4. ظبّط الخصوصية: `Privacy & security` (البيانات الاختيارية، الإعلانات، الموقع).\n5. شيل التطبيقات الزيادة اللي مش هتستخدمها.\n6. فعّل **System Restore** واعمل نقطة استرجاع.\n7. ثبّت متصفحك ومدير الباسوردات ومانع إعلانات من المواقع الرسمية.\n8. ظبّط **النسخ الاحتياطي** (File History أو برنامج) وجرّبه.\n9. لو BitLocker شغال: اتأكد إن مفتاح الاسترجاع محفوظ.\n10. اعمل **Recovery Drive** على فلاشة واحفظها.",
       "1. Update Windows until nothing is left (`Settings > Windows Update`).\n2. Create a **Standard** account for daily work; keep admin for installing.\n3. Turn on **Windows Hello** (PIN or fingerprint).\n4. Set privacy: `Privacy & security` (optional data, ads, location).\n5. Remove preinstalled apps you will not use.\n6. Turn on **System Restore** and make a restore point.\n7. Install your browser, password manager and ad blocker from official sites.\n8. Set up **backups** (File History or a tool) and test them.\n9. If BitLocker is on, make sure the recovery key is saved.\n10. Make a **Recovery Drive** on a USB stick and keep it."],
      ["افتح `msinfo32` واكتب مواصفات جهازك في ملاحظة؛ هتحتاجها في أي مشكلة.", "Open `msinfo32` and note your PC's specs; you will need them for any problem."]),
    L('cl-monthly', 15,
      ["صيانة شهرية في ربع ساعة", "A 15-minute monthly check-up"],
      ["1. ويندوز وكل البرامج متحدّثة (`winget upgrade --all` أو UniGetUI).\n2. المتصفح والإضافات: شيل الإضافات اللي مش بتستخدمها.\n3. فحص سريع بـ Windows Security.\n4. **المساحة**: Storage Sense أو Disk Cleanup، وفضّي Downloads.\n5. **النسخ الاحتياطي** اتعمل فعلًا؟ رجّع ملف واحد كاختبار.\n6. **صحة الهارد**: CrystalDiskInfo.\n7. Startup apps: فيه حاجة جديدة اتضافت؟\n8. Restart حقيقي.",
       "1. Windows and all programs updated (`winget upgrade --all` or UniGetUI).\n2. Browser and extensions: remove unused extensions.\n3. A quick scan with Windows Security.\n4. **Space**: Storage Sense or Disk Cleanup, and empty Downloads.\n5. Did the **backup** really run? Restore one file as a test.\n6. **Drive health**: CrystalDiskInfo.\n7. Startup apps: anything new added?\n8. A real restart."],
      ["حط تذكير في التقويم أول يوم في كل شهر.", "Set a calendar reminder for the first day of each month."]),
    L('cl-yearly', 30,
      ["مراجعة أمان سنوية لحساباتك", "A yearly security review of your accounts"],
      ["1. **الإيميل الأساسي**: باسورد فريد قوي + تحقق بخطوتين أو passkey.\n2. حدّث **إيميل ورقم الاسترجاع** في جوجل ومايكروسوفت وآبل والبنك.\n3. **haveibeenpwned.com** وPassword Checkup: غيّر أي باسورد متسرب أو متكرر.\n4. شوف **الأجهزة المتصلة** بحساباتك وشيل القديمة.\n5. راجع **التطبيقات المربوطة** بحسابات جوجل وفيسبوك (Third-party access).\n6. امسح الحسابات اللي ما بقتش تستخدمها.\n7. جدّد **أكواد الاحتياط** واحفظها ورقي.\n8. فعّل Inactive Account Manager / Legacy Contact.\n9. **Google Takeout** نسخة سنوية.\n10. سجّل دخول في الحسابات اللي فيها ذكريات عشان ما تتقفلش.",
       "1. **Main email**: a strong unique password + two-step verification or a passkey.\n2. Update **recovery email and phone** for Google, Microsoft, Apple and your bank.\n3. **haveibeenpwned.com** and Password Checkup: change any leaked or reused password.\n4. Check **devices signed in** to your accounts and remove old ones.\n5. Review **apps connected** to your Google and Facebook accounts (third-party access).\n6. Delete accounts you no longer use.\n7. Renew **backup codes** and keep them on paper.\n8. Turn on Inactive Account Manager / Legacy Contact.\n9. A yearly **Google Takeout** copy.\n10. Sign in to accounts holding memories so they are not closed."]),
    L('cl-scammed', 10,
      ["لو اتنصب عليك أو شاكك", "If you have been scammed (or suspect it)"],
      ["1. **كلّم البنك فورًا** من الرقم اللي على الكارت؛ اقفل الكارت من التطبيق.\n2. لو اديت باسورد: غيّره من جهاز نضيف، وأي حساب بنفس الباسورد.\n3. لو اديت كود تحقق: أبلغ الجهة فورًا، و«Sign out of all devices».\n4. لو حد دخل على جهازك (AnyDesk وغيره): افصل النت، شيل البرنامج، افحص الجهاز، وغيّر الباسوردات من جهاز تاني.\n5. صوّر كل حاجة (رسايل، أرقام، تحويلات).\n6. بلّغ البوليس، وبلّغ عن الرسالة أو الإعلان.\n7. خلي بالك من «استرجاع الفلوس مقابل رسوم» بعدها: نصب تاني.\n8. احكي لحد قريب؛ الكسوف هو اللي بيخلي النصابين يكسبوا.",
       "1. **Call your bank at once** on the number on your card; freeze the card in the app.\n2. Gave a password? Change it from a clean device, and any account sharing it.\n3. Gave a verification code? Tell the organisation now, and «Sign out of all devices».\n4. Someone got into your PC (AnyDesk etc.)? Disconnect the internet, remove the program, scan, and change passwords from another device.\n5. Screenshot everything (messages, numbers, transfers).\n6. Report to the police, and report the message or ad.\n7. Beware «recover your money for a fee» afterwards: another scam.\n8. Tell someone close; embarrassment is what lets scammers win."]),
    L('cl-sell-device', 15,
      ["قبل ما تبيع أو تدّي جهاز", "Before selling or giving away a device"],
      ["1. **نسخة احتياطية** كاملة وجرّب إنها بتفتح.\n2. صدّر الباسوردات ومفاتيح البرامج.\n3. اخرج من حسابات جوجل وآبل ومايكروسوفت، واقفل Find My.\n4. امسح الجهاز من الأجهزة الموثوقة في حسابك.\n5. فك ربط الساعة والسماعات.\n6. شيل الشريحة وكارت الذاكرة، وامسح الـ eSIM.\n7. **Reset** كامل: كمبيوتر بـ «Clean data»، موبايل Factory reset.\n8. الراوتر والطابعة والتلفزيون: Factory reset كمان.",
       "1. A full **backup**, and check it opens.\n2. Export passwords and software keys.\n3. Sign out of Google, Apple and Microsoft, and turn off Find My.\n4. Remove the device from trusted devices in your account.\n5. Unpair the watch and earbuds.\n6. Remove the SIM and memory card, and erase the eSIM.\n7. A full **reset**: PC with «Clean data», phone with factory reset.\n8. Router, printer and TV: factory reset too."]),
    L('cl-phone-lost', 10,
      ["الموبايل ضاع أو اتسرق", "Phone lost or stolen"],
      ["1. من جهاز تاني: google.com/android/find أو icloud.com/find > حدّد المكان، شغّل صوت، أو اقفله.\n2. لو مش هيرجع: **Erase**.\n3. كلّم شركة الاتصالات تقفل الخط وتطلع شريحة بديلة (بنفس الرقم).\n4. غيّر باسورد الإيميل والبنك، و«Sign out of all devices» في واتساب وجوجل.\n5. نبّه البنك وراقب الحساب.\n6. محضر بالـ IMEI، وبعدين التأمين.\n7. على الموبايل الجديد: ارجع النسخة الاحتياطية، وامسح القديم من حساباتك.",
       "1. From another device: google.com/android/find or icloud.com/find > locate, play a sound, or lock it.\n2. If it is not coming back: **Erase**.\n3. Call your carrier to block the line and issue a replacement SIM (same number).\n4. Change email and bank passwords, and «Sign out of all devices» in WhatsApp and Google.\n5. Alert your bank and watch the account.\n6. A police report with the IMEI, then the insurer.\n7. On the new phone: restore the backup and remove the old one from your accounts."],
      ["دلوقتي وانت هادي: اطلب `*#06#` واكتب الـ IMEI في مكان آمن.", "Now, while calm: dial `*#06#` and note the IMEI somewhere safe."]),
    L('cl-backup-plan', 20,
      ["خطة نسخ احتياطي حقيقية في 20 دقيقة", "A real backup plan in 20 minutes"],
      ["1. حدد المهم: Documents وPictures وVideos وإيميلات ومستندات رسمية.\n2. **نسخة 1 في البيت**: هارد خارجي + File History أو Hasleo بجدول أسبوعي.\n3. **نسخة 2 برّه**: سحابة (ويُفضّل مشفّرة) أو هارد عند قريب.\n4. **صورة كاملة** للجهاز كل شهر.\n5. **الموبايل**: نسخة Google أو iCloud، وواتساب.\n6. افصل الهارد بعد النسخ (حماية من الفدية).\n7. **جرّب الاسترجاع** كل 3 شهور.\n8. اكتب الخطة ومكان المفاتيح في ورقة.",
       "1. Decide what matters: Documents, Pictures, Videos, email and official papers.\n2. **Copy 1 at home**: an external drive + File History or Hasleo on a weekly schedule.\n3. **Copy 2 elsewhere**: the cloud (ideally encrypted) or a drive at a relative's.\n4. A **full image** of the PC monthly.\n5. **Phone**: Google or iCloud backup, and WhatsApp.\n6. Unplug the drive after backing up (ransomware protection).\n7. **Test a restore** every 3 months.\n8. Write the plan and where the keys are on paper."]),
    L('cl-slow-pc', 30,
      ["الجهاز بقى بطيء", "The PC has become slow"],
      ["1. **Restart** حقيقي.\n2. Task Manager: مين واكل CPU أو Memory أو Disk؟\n3. اقفل البرامج الزيادة من **Startup apps**.\n4. شيل البرامج والإضافات اللي مش بتستخدمها.\n5. **المساحة**: سيب 15% فاضي على الأقل من الـ C.\n6. فحص فيروسات (Defender + Malwarebytes).\n7. `sfc /scannow` و DISM.\n8. صحة الهارد (CrystalDiskInfo).\n9. لسه بطيء وعنده هارد عادي؟ **SSD** هيفرق جدًا، وبعده الرامات.\n10. آخر حل: **`Reset this PC > Keep my files`**.",
       "1. A real **restart**.\n2. Task Manager: what is eating CPU, Memory or Disk?\n3. Turn off extras in **Startup apps**.\n4. Remove programs and extensions you do not use.\n5. **Space**: keep at least 15% of C free.\n6. A malware scan (Defender + Malwarebytes).\n7. `sfc /scannow` and DISM.\n8. Drive health (CrystalDiskInfo).\n9. Still slow with a hard disk? An **SSD** makes a huge difference, then RAM.\n10. Last resort: **Reset this PC > Keep my files**."]),
    L('cl-elderly', 25,
      ["تجهيز جهاز أو موبايل لحد كبير في السن", "Setting up a device for an older relative"],
      ["1. كبّر الخط والأيقونات والماوس.\n2. شاشة رئيسية فيها التطبيقات المهمة بس (أو Assistive Access / Simple mode).\n3. اختصار لمكالمات الفيديو مع العيلة.\n4. **حساب Standard** على الكمبيوتر، وتحديثات تلقائية.\n5. مانع إعلانات ومتصفح فيه حماية من النصب.\n6. اتفقوا على **كلمة سر عائلية** للمكالمات المستعجلة.\n7. علّمهم الجملة: «هقفل وأكلمكم على الرقم الرسمي».\n8. Quick Assist أو RustDesk عشان تساعدهم من بعيد (بموافقتهم).\n9. معلومات الطوارئ على شاشة القفل.\n10. ورقة فيها الباسوردات الأساسية في مكان أمين في بيتهم.",
       "1. Enlarge text, icons and the pointer.\n2. A home screen with only key apps (or Assistive Access / Simple mode).\n3. A shortcut for video calls with family.\n4. A **Standard account** on the PC, with automatic updates.\n5. An ad blocker and a browser with scam protection.\n6. Agree a **family safe word** for urgent calls.\n7. Teach them: «I'll hang up and call you on the official number».\n8. Quick Assist or RustDesk so you can help remotely (with their consent).\n9. Emergency info on the lock screen.\n10. A sheet with the key passwords kept safely at their home."]),
    L('cl-travel', 10,
      ["قبل السفر بالأجهزة", "Before travelling with your devices"],
      ["1. نسخة احتياطية للموبايل واللابتوب.\n2. **eSIM للسفر** أو باقة رومينج؛ واعرف لو الـ VPN مسموح في البلد.\n3. نزّل الخرائط **أوفلاين** والتذاكر وبطاقات الصعود في المحفظة.\n4. شاحن متعدد البورتات + كابلات + power bank في **شنطة اليد**.\n5. محوّل فيشة (الشواحن الحديثة بتشتغل على أي فولت).\n6. فعّل Find My، وقفل شاشة قوي، وSIM PIN.\n7. على الواي فاي العام: VPN، ومن غير شغل بنوك.\n8. ما تنشرش صور السفر وانت لسه برّه.",
       "1. Back up the phone and laptop.\n2. A **travel eSIM** or roaming plan; and check whether VPNs are allowed in that country.\n3. Download maps **offline**, and tickets and boarding passes to your wallet.\n4. A multi-port charger + cables + a power bank in **hand luggage**.\n5. A plug adapter (modern chargers accept any voltage).\n6. Turn on Find My, a strong screen lock and a SIM PIN.\n7. On public Wi-Fi: a VPN, and no banking.\n8. Do not post travel photos while you are still away."])
  ]
});
})();
