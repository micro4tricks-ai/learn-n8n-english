// n8n week 43 — High availability, backups and recovery.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex) => ({ h, p, ex });
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('خبير', 'Expert'),
  title: B('التوافر العالي والنسخ الاحتياطي والاستعادة', 'High availability, backups and recovery'),
  goal: B('تخلّي أتمتة العميل تستحمل وقوع أي جزء: تحدد أهداف الاستعادة بالأرقام (RTO/RPO)، تبني توافر عالي لكل طبقة، نسخ احتياطي بنقطة زمنية، خطة كوارث متجرّبة، تحديثات من غير توقف، ومنع ضياع الطلبات وقت الأعطال.',
          'Make a client’s automation survive the failure of any part: set recovery targets in numbers (RTO/RPO), build high availability per layer, point-in-time backups, a tested disaster plan, upgrades without downtime, and no lost orders during outages.'),
  days: [
    { title: B('أهداف الاستعادة', 'Recovery targets'),
      goal: B('تعرف العميل يستحمل يوقف قد إيه ويخسر قد إيه.', 'Know how long the client can be down and how much they can lose.'),
      learn: [
        L(B('RTO وRPO', 'RTO and RPO'),
          B('**rto** (Recovery Time Objective) = أقصى وقت مقبول والخدمة واقفة. **rpo** (Recovery Point Objective) = أقصى بيانات مقبول تضيع (آخر نسخة كانت من قد إيه). متجر بيبيع 24 ساعة: RTO ساعة وRPO 5 دقايق؛ تقرير شهري داخلي: RTO يوم وRPO يوم. الأرقام دي بتحدد التكلفة كلها.', '**rto** (Recovery Time Objective) = the longest acceptable downtime. **rpo** (Recovery Point Objective) = the most data acceptable to lose (how old the last copy may be). A 24-hour shop: RTO 1 hour and RPO 5 minutes; an internal monthly report: RTO 1 day and RPO 1 day. These numbers drive the whole cost.'),
          'workflow / system               RTO      RPO      → what it needs\norder webhooks + invoices       30 min   0–5 min  HA webhooks, PITR database, sender retries\nCRM sync (hourly)               4 h      1 h      nightly backup + replayable sync\nmonthly report                  1 day    1 day    nightly backup is enough\n(agreed with the client, written in the SLA — week 46)'),
        L(B('من غير مبالغة', 'Without overdoing it'),
          B('توافر 99.99% بيتكلف أضعاف 99.9%. اسأل العميل: «لو n8n وقف ساعة، تخسر كام؟» لو الإجابة «تقريبًا ولا حاجة لأن Shopify بيعيد»، يبقى نسخة احتياطية كويسة وسيرفر واحد مراقَب كفاية. **high availability** للأجزاء اللي توقفها بيكلّف فعلًا.', '99.99% availability costs many times 99.9%. Ask the client: «if n8n stopped for an hour, how much would you lose?» If the answer is «almost nothing, because Shopify retries», a good backup and one monitored server are enough. **high availability** only for parts whose downtime truly costs.'),
          'availability   downtime per month   typical setup\n99%            ~7 h                 one server, nightly backups\n99.9%          ~43 min              one server + managed DB + fast restore runbook\n99.95%         ~22 min              HA webhooks/workers, managed HA DB, monitoring\n99.99%         ~4 min               multi-main, multi-zone, automated failover (expensive)'),
        L(B('خريطة الاعتماديات', 'The dependency map'),
          B('الأتمتة بتقع لو أي حاجة بتعتمد عليها وقعت: n8n، القاعدة، Redis، DNS، الـ proxy، الـ CRM، مزوّد AI، الإيميل. ارسم الخريطة واكتب لكل واحدة: لو وقعت يحصل إيه، وإيه البديل (retry، طابور، رسالة «حاول بعدين»). ده بيوريك الحلقة الأضعف.', 'An automation fails if anything it relies on fails: n8n, the database, Redis, DNS, the proxy, the CRM, the AI provider, email. Draw the map and write for each: what happens if it fails, and the fallback (retry, a queue, a «try later» message). It shows you the weakest link.'),
          'dependency     if down…                              fallback\nPostgres       everything stops                     managed HA + PITR\nRedis          webhooks fail → shop retries          AOF, restart runbook\nCRM API        deals not created                     retry 5× then dead-letter + replay\nAI provider    classification fails                  rule-based fallback, queue for later\nDNS/Caddy      nothing reachable                     second DNS provider? uptime alert')
      ],
      practice: [
        B('حدد RTO وRPO لـ 3 workflows عند عميل.', 'Set the RTO and RPO for 3 of a client’s workflows.'),
        B('اسأل «الساعة واقفة بتكلف كام؟».', 'Ask «what does an hour down cost?».'),
        B('ارسم خريطة الاعتماديات.', 'Draw the dependency map.'),
        B('حدد الحلقة الأضعف.', 'Identify the weakest link.')
      ],
      words: [
        W('rto', 'أقصى وقت توقف مقبول', 'the longest acceptable downtime', 'The RTO for orders is 30 minutes.'),
        W('rpo', 'أقصى بيانات مقبول تضيع', 'the most data acceptable to lose', 'The RPO is 5 minutes.'),
        W('high availability', 'الخدمة تكمّل لو جزء وقع', 'the service continues when a part fails', 'High availability for the webhooks only.'),
        W('availability', 'نسبة الوقت والخدمة شغالة', 'the share of time a service works', '99.9% availability allows 43 minutes a month.'),
        W('dependency map', 'خريطة الحاجات اللي النظام بيعتمد عليها', 'a map of what a system relies on', 'The dependency map showed DNS as a risk.')
      ],
      read: [{ t: 'AWS: Disaster recovery objectives', url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html', what: B('اقرا RTO وRPO والاستراتيجيات.', 'Read RTO, RPO and the strategies.') }],
      challenge: B('اكتب «ورقة الاستمرارية» لعميل: RTO/RPO لكل workflow مهم، خريطة اعتماديات بالبدائل، نسبة التوافر المطلوبة وتكلفتها — وخلّي العميل يوافق على الأرقام.', 'Write a «continuity sheet» for a client: RTO/RPO per key workflow, a dependency map with fallbacks, the required availability and its cost — and get the client to approve the numbers.'),
      quiz: [
        Q(B('RPO 5 دقايق:', 'An RPO of 5 minutes:'), [['أقصى 5 دقايق بيانات تضيع', 'at most 5 minutes of data lost'], ['التوقف 5 دقايق', 'down for 5 minutes'], ['نسخة كل يوم', 'a daily backup']], 0, B('بيانات.', 'Data.')),
        Q(B('تقرير شهري داخلي:', 'An internal monthly report:'), [['نسخة ليلية كفاية', 'a nightly backup is enough'], ['multi-region لازم', 'multi-region is required'], ['99.99%', '99.99%']], 0, B('حسب القيمة.', 'By value.')),
        Q(B('أول سؤال للتوافر:', 'The first availability question:'), [['التوقف بيكلّف كام؟', 'what does downtime cost?'], ['أغلى سيرفر؟', 'the priciest server?'], ['كام CPU؟', 'how many CPUs?']], 0, B('تكلفة.', 'Cost.'))
      ] },

    { title: B('التوافر لكل طبقة', 'Availability per layer'),
      goal: B('مفيش جزء واحد لو وقع يوقّع الكل.', 'No single part takes everything down.'),
      learn: [
        L(B('n8n نفسه', 'n8n itself'),
          B('في queue mode: webhook processors وworkers أكتر من نسخة على أكتر من سيرفر/zone — لو واحد وقع الباقي بيكمّل. والـ main: في n8n Enterprise فيه **multi-main** (أكتر من main بـ **leader election** — واحد بس بيشغّل الـ schedules)، ومن غيره: main واحد بإعادة تشغيل تلقائية وrestore سريع.', 'In queue mode: webhook processors and workers run as several instances on several servers/zones — if one fails the rest carry on. The main: n8n Enterprise has **multi-main** (several mains with **leader election** — only one runs the schedules); without it: one main with automatic restart and a fast restore.'),
          'zone A: main-1 (leader) · webhook-1 · worker-1, worker-2\nzone B: main-2 (follower) · webhook-2 · worker-3, worker-4\nshared: managed Postgres (HA, primary in A, standby in B) · Redis with replica + AOF\nload balancer health-checks /healthz and drops a dead instance in seconds'),
        L(B('القاعدة', 'The database'),
          B('Postgres هو القلب. **managed database** (RDS، Cloud SQL، Supabase، Neon) بـ standby في zone تانية و**failover** تلقائي (دقيقة أو اتنين). وقبل كده: **replica** للقراءة (تقارير) عشان متتقلش الأساسي. ومن غير managed: Patroni أو اعتمد على restore سريع واقبل RTO أعلى.', 'Postgres is the heart. A **managed database** (RDS, Cloud SQL, Supabase, Neon) with a standby in another zone and automatic **failover** (a minute or two). Plus a read **replica** for reports so the primary is not loaded. Without managed: Patroni, or rely on a fast restore and accept a higher RTO.'),
          'managed Postgres checklist\n[ ] Multi-AZ / HA standby with automatic failover\n[ ] point-in-time recovery (7–35 days)\n[ ] connection string uses the cluster endpoint (survives failover)\n[ ] n8n retries DB connections (it does) — test a failover in staging and time the gap'),
        L(B('Redis والـ proxy وDNS', 'Redis, the proxy and DNS'),
          B('Redis: managed بـ replica أو Sentinel، وAOF. الـ proxy: اتنين ورا load balancer مُدار، أو Caddy واحد بإعادة تشغيل تلقائية (أبسط، وكفاية لكتير). DNS: TTL قصير (5 دقايق) عشان لو غيّرت السيرفر الناس توصل بسرعة. وكل ده بيتراقب من برة (أسبوع 40).', 'Redis: managed with a replica or Sentinel, plus AOF. The proxy: two behind a managed load balancer, or one Caddy with automatic restart (simpler, and enough for many). DNS: a short TTL (5 minutes) so a server change propagates fast. And all of it monitored from outside (week 40).'),
          'small client: 1 VPS (Compose, restart: always) + managed Postgres + offsite backups → ~99.9%\nmid client: 2 VPS behind a cloud LB, webhooks/workers on both, managed Postgres HA + managed Redis → ~99.95%\nDNS TTL 300 s · health checks every 10 s · alerts to on-call')
      ],
      practice: [
        B('ارسم الطبقات وعلّم نقاط الفشل الواحدة.', 'Draw the layers and mark single points of failure.'),
        B('شغّل workers على سيرفرين.', 'Run workers on two servers.'),
        B('اختبر failover القاعدة على staging واحسب الوقت.', 'Test a database failover on staging and time it.'),
        B('قلّل TTL الـ DNS.', 'Lower the DNS TTL.')
      ],
      words: [
        W('multi-main', 'أكتر من main لـ n8n في نفس الوقت', 'several n8n mains at once', 'Multi-main needs Enterprise.'),
        W('leader election', 'اختيار نسخة واحدة تقود', 'choosing one instance to lead', 'Leader election runs schedules once.'),
        W('failover', 'التحويل للبديل لما الأساسي يقع', 'switching to the standby when the primary fails', 'Failover took 70 seconds.'),
        W('replica', 'نسخة متزامنة من القاعدة', 'a synchronised copy of the database', 'Reports read from the replica.'),
        W('managed database', 'قاعدة بيديرها مزوّد', 'a database run by a provider', 'A managed database handles failover.')
      ],
      read: [{ t: 'n8n Docs: Scaling and multi-main', url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode', what: B('اقرا Multi-main setup.', 'Read Multi-main setup.') }, { t: 'PostgreSQL: High availability', url: 'https://www.postgresql.org/docs/current/high-availability.html', what: B('اقرا المقدمة.', 'Read the introduction.') }],
      challenge: B('صمّم معمارية لعميل متوسط بهدف 99.95%: سيرفرين، webhooks وworkers على الاتنين، Postgres وRedis managed بـ HA، load balancer، health checks — ورسم وتكلفة شهرية تقريبية.', 'Design an architecture for a mid-sized client targeting 99.95%: two servers, webhooks and workers on both, managed HA Postgres and Redis, a load balancer and health checks — with a diagram and an approximate monthly cost.'),
      quiz: [
        Q(B('workers على سيرفر واحد:', 'Workers on one server:'), [['نقطة فشل واحدة', 'a single point of failure'], ['HA', 'HA'], ['أأمن', 'safer']], 0, B('وزّع.', 'Spread them.')),
        Q(B('الـ schedules مع multi-main:', 'Schedules with multi-main:'), [['الـ leader بس يشغّلها', 'only the leader runs them'], ['كلهم', 'all of them'], ['محدش', 'none']], 0, B('مرة واحدة.', 'Once.')),
        Q(B('connection string بعد failover:', 'The connection string after failover:'), [['cluster endpoint ثابت', 'a stable cluster endpoint'], ['IP السيرفر القديم', 'the old server IP'], ['يدوي', 'manual']], 0, B('شفاف.', 'Transparent.'))
      ] },

    { title: B('النسخ بنقطة زمنية', 'Point-in-time backups'),
      goal: B('ترجع البيانات لأي دقيقة قبل المشكلة.', 'Restore data to any minute before a problem.'),
      learn: [
        L(B('PITR', 'PITR'),
          B('النسخة الليلية = RPO يوم. **point-in-time recovery**: Postgres بيسجّل كل تغيير في **wal** (Write-Ahead Log) — نسخة أساسية + الـ WAL = تقدر ترجع لـ «النهارده 13:41:00» بالظبط (قبل ما حد يمسح جدول بالغلط). الـ managed databases بتعمله بضغطة؛ self-hosted: pgBackRest أو WAL-G لـ S3.', 'A nightly backup = an RPO of one day. **point-in-time recovery**: Postgres records every change in the **wal** (Write-Ahead Log) — a base backup + the WAL = you can return to «today 13:41:00» exactly (before someone dropped a table by mistake). Managed databases do it with a click; self-hosted: pgBackRest or WAL-G to S3.'),
          'self-hosted with WAL-G\narchive_mode = on\narchive_command = \'wal-g wal-push %p\'          # every WAL segment → S3 (encrypted)\nnightly: wal-g backup-push $PGDATA                 # base backup\nrestore to 13:41: wal-g backup-fetch $PGDATA LATEST + recovery_target_time = \'2026-10-04 13:41:00+03\''),
        L(B('3-2-1', '3-2-1'),
          B('قاعدة 3-2-1: 3 نسخ، على 2 نوع تخزين مختلف، 1 منهم برة الموقع (ومنها نسخة immutable مايتمسحش حتى لو حد اخترق — ransomware). والنسخ مشفّرة، والمفاتيح منفصلة، ومدة الاحتفاظ زي ما الخصوصية بتقول (أسبوع 42) — النسخ مش استثناء من الحذف.', 'The 3-2-1 rule: 3 copies, on 2 storage types, 1 off-site (including an immutable copy that cannot be deleted even after a breach — ransomware). Backups encrypted, keys kept separately, and retention as privacy requires (week 42) — backups are no exception to deletion.'),
          'copy 1: the live database (managed, HA)\ncopy 2: provider snapshots + PITR (same cloud, other zone)\ncopy 3: nightly pg_dump + n8n export → another provider’s S3 with Object Lock (immutable 30 days), encrypted\nkeys: N8N_ENCRYPTION_KEY + backup key in the password manager, not with the backups'),
        L(B('اتأكد إن النسخة شغالة', 'Verify the backup works'),
          B('**backup verification** آلي: كل يوم بعد النسخ، workflow أو سكربت يستعيد النسخة في قاعدة مؤقتة، ويعدّ الصفوف في جداول مهمة ويقارنها بالأصل، ويبعت «✓ نسخة 4 أكتوبر سليمة» أو تنبيه. نسخة محدش جرّبها = أمل، مش خطة.', 'Automatic **backup verification**: daily after the backup, a workflow or script restores it into a temporary database, counts rows in key tables, compares them with the source, and sends «✓ 4 October backup verified» or an alert. An untested backup is a hope, not a plan.'),
          'nightly 03:30 (after the 02:30 backup)\ncreatedb verify_tmp && pg_restore -d verify_tmp /backup/latest/n8n.dump\npsql verify_tmp -c "select count(*) from workflow_entity"   → 142 (source 142) ✓\npsql verify_tmp -c "select max(\\"createdAt\\") from execution_entity" → 02:29 ✓ (fresh)\ndropdb verify_tmp → POST heartbeat "backup-verified" (alert if missing by 05:00)')
      ],
      practice: [
        B('فعّل PITR في القاعدة المُدارة (أو WAL-G).', 'Enable PITR on the managed database (or WAL-G).'),
        B('رجّع القاعدة لدقيقة قبل حذف متعمد على staging.', 'Restore to a minute before a deliberate delete on staging.'),
        B('طبّق 3-2-1 بنسخة immutable.', 'Apply 3-2-1 with an immutable copy.'),
        B('اعمل backup verification آلي.', 'Build automatic backup verification.')
      ],
      words: [
        W('point-in-time recovery', 'الاستعادة لأي لحظة', 'restoring to any moment', 'Point-in-time recovery saved the morning’s orders.'),
        W('wal', 'سجل كل تغييرات Postgres', 'Postgres’s log of every change', 'WAL archives go to S3.'),
        W('3-2-1 rule', '3 نسخ، 2 نوع، 1 برة', '3 copies, 2 media, 1 off-site', 'Follow the 3-2-1 rule.'),
        W('immutable backup', 'نسخة مايتمسحش لمدة', 'a copy that cannot be deleted for a period', 'An immutable backup beats ransomware.'),
        W('backup verification', 'التأكد آليًا إن النسخة بتترجع', 'checking automatically that a backup restores', 'Backup verification runs at 03:30.')
      ],
      read: [{ t: 'PostgreSQL: Continuous archiving and PITR', url: 'https://www.postgresql.org/docs/current/continuous-archiving.html', what: B('اقرا المقدمة.', 'Read the introduction.') }, { t: 'WAL-G', url: 'https://github.com/wal-g/wal-g', what: B('اقرا PostgreSQL.', 'Read PostgreSQL.') }],
      challenge: B('اعمل نظام نسخ «بدرجة بنك» لـ n8n staging: PITR، 3-2-1 بنسخة immutable برة المزوّد، تشفير بمفاتيح منفصلة، verification يومي بـ heartbeat — وجرّب استعادة لدقيقة محددة واكتب الوقت.', 'Build a «bank-grade» backup system for n8n staging: PITR, 3-2-1 with an immutable copy at another provider, encryption with separate keys, daily verification with a heartbeat — and try a restore to a specific minute, recording the time taken.'),
      quiz: [
        Q(B('حد مسح جدول الساعة 13:42:', 'Someone dropped a table at 13:42:'), [['PITR لـ 13:41', 'PITR to 13:41'], ['نسخة امبارح', 'yesterday’s backup'], ['مستحيل', 'impossible']], 0, B('WAL.', 'WAL.')),
        Q(B('نسخة immutable:', 'An immutable backup:'), [['مايتمسحش حتى لو حد اخترق', 'cannot be deleted even after a breach'], ['بتتعدل', 'can be edited'], ['من غير تشفير', 'unencrypted']], 0, B('ransomware.', 'Ransomware.')),
        Q(B('نسخة محدش استعادها:', 'A backup nobody restored:'), [['أمل مش خطة', 'a hope, not a plan'], ['كفاية', 'enough'], ['أحسن', 'better']], 0, B('verification.', 'Verification.'))
      ] },

    { title: B('خطة الكوارث', 'The disaster plan'),
      goal: B('لو الداتا سنتر كله وقع، ترجع بخطوات معروفة.', 'If the whole data centre fails, you return with known steps.'),
      learn: [
        L(B('الاستراتيجيات', 'The strategies'),
          B('**disaster recovery** استراتيجيات بتكلفة متزايدة: نسخ وrestore (ساعات)، **cold standby** (سيرفرات مطفية في منطقة تانية + نسخ — ساعة)، **warm standby** (نسخة شغالة صغيرة بتتكبر — دقايق)، **multi-region** نشط-نشط (ثواني، غالي ومعقد). اختار حسب RTO/RPO من يوم 1.', '**disaster recovery** strategies with rising cost: backup and restore (hours), a **cold standby** (powered-off servers in another region + backups — an hour), a **warm standby** (a small running copy that scales up — minutes), **multi-region** active-active (seconds, expensive and complex). Choose by the RTO/RPO from day 1.'),
          'strategy           RTO        RPO        monthly cost (relative)\nbackup & restore   4–8 h      ≤ 24 h     1×\ncold standby       ~1 h       ≤ 15 min   1.2× (IaC + PITR copies)\nwarm standby       10–30 min  ≤ 5 min    1.6×\nmulti-region       < 1 min    ~0         3×+'),
        L(B('الـ runbook', 'The runbook'),
          B('خطة الكوارث = runbook خطوة بخطوة حد تاني يقدر ينفّذه الساعة 3 الفجر: إعلان الكارثة، إنشاء البنية من الكود (Compose/Terraform)، استعادة القاعدة، ضبط الأسرار، تحويل الـ DNS، اختبار الـ smoke، إبلاغ العميل. وكل خطوة بأمر جاهز ووقت متوقع.', 'A disaster plan = a step-by-step runbook someone else can run at 3 a.m.: declare the disaster, build the infrastructure from code (Compose/Terraform), restore the database, set the secrets, switch DNS, run the smoke tests, inform the client. Each step with a ready command and an expected time.'),
          'DR runbook — region down (target RTO 60 min)\n00  declare DR (lead + comms, week 40) · notify client\n05  terraform apply -var region=eu-central-2   (servers, network, LB)          ~10 min\n15  restore Postgres PITR copy in the new region                               ~15 min\n30  set secrets from the vault · docker compose up -d                          ~5 min\n35  smoke tests (week 38) · check queue + webhooks                             ~10 min\n45  DNS: n8n.example.com → new LB (TTL 300)                                    ~5–10 min\n55  confirm with the client · start replaying missed events (day 5)'),
        L(B('التمرين', 'The drill'),
          B('**dr drill** كل 6 شهور: نفّذ الـ runbook فعلًا على حساب/منطقة تجربة، وقِس الوقت الحقيقي مقابل RTO، وسجّل كل خطوة اتلخبطت. أول تمرين دايمًا بيكشف حاجات (سر ناقص، أمر قديم، صلاحية). حدّث الـ runbook بعد كل تمرين.', 'A **dr drill** every 6 months: actually run the runbook in a test account/region, measure real time against the RTO, and note every step that went wrong. The first drill always reveals things (a missing secret, an outdated command, a permission). Update the runbook after each drill.'),
          'DR drill 2026-10-04 — result: 94 min (target 60) ✗\n- Terraform state was in the dead region → move state to another region (Omar, 10-10)\n- WhatsApp credential missing from the vault → added (Sara, done)\n- DNS TTL was 3600 → lowered to 300 (done)\nnext drill: 2027-04 · target 60 min')
      ],
      practice: [
        B('اختار استراتيجية DR لكل workflow حسب RTO.', 'Choose a DR strategy per workflow by its RTO.'),
        B('اكتب runbook كارثة بأوامر جاهزة.', 'Write a disaster runbook with ready commands.'),
        B('خلّي البنية كلها في Compose/Terraform.', 'Put all infrastructure in Compose/Terraform.'),
        B('اعمل dr drill على staging وقِس.', 'Run a DR drill on staging and measure.')
      ],
      words: [
        W('disaster recovery', 'الرجوع بعد كارثة كبيرة', 'returning after a major disaster', 'Our disaster recovery target is 60 minutes.'),
        W('cold standby', 'بنية احتياطية مطفية جاهزة تتشغّل', 'powered-off backup infrastructure ready to start', 'A cold standby is cheap but slower.'),
        W('warm standby', 'نسخة احتياطية صغيرة شغالة', 'a small backup copy already running', 'The warm standby scales up in minutes.'),
        W('multi-region', 'التشغيل في أكتر من منطقة', 'running in more than one region', 'Multi-region is costly for small clients.'),
        W('dr drill', 'تمرين تنفيذ خطة الكوارث', 'a rehearsal of the disaster plan', 'The DR drill took 94 minutes.')
      ],
      read: [{ t: 'Google Cloud: Disaster recovery planning guide', url: 'https://docs.cloud.google.com/architecture/dr-scenarios-planning-guide', what: B('اقرا الأنماط.', 'Read the patterns.') }],
      challenge: B('اكتب DR runbook لعميل واعمل dr drill كامل على staging (منطقة أو سيرفر جديد): من الصفر للـ smoke tests والـ DNS — وقِس الوقت مقابل RTO، وصلّح 3 مشاكل لقيتها، وحدد ميعاد التمرين الجاي.', 'Write a DR runbook for a client and run a full DR drill on staging (a new region or server): from nothing to smoke tests and DNS — measure the time against the RTO, fix 3 problems you found, and set the next drill date.'),
      quiz: [
        Q(B('RTO ساعة وميزانية محدودة:', 'An RTO of one hour on a limited budget:'), [['cold standby', 'a cold standby'], ['multi-region', 'multi-region'], ['مفيش خطة', 'no plan']], 0, B('توازن.', 'Balance.')),
        Q(B('runbook كويس:', 'A good runbook:'), [['خطوات بأوامر وأوقات حد تاني ينفّذها', 'steps with commands and times someone else can run'], ['فكرة عامة', 'a general idea'], ['في دماغك', 'in your head']], 0, B('3 الفجر.', '3 a.m.')),
        Q(B('أول dr drill:', 'The first DR drill:'), [['بيكشف مشاكل غالبًا', 'usually reveals problems'], ['بينجح دايمًا', 'always succeeds'], ['مش لازم', 'unnecessary']], 0, B('اتعلّم.', 'Learn.'))
      ] },

    { title: B('تحديثات وأعطال من غير خسارة', 'Upgrades and outages without loss'),
      goal: B('تحدّث من غير توقف، ومفيش طلب يضيع وقت العطل.', 'Upgrade without downtime, and lose no order during an outage.'),
      learn: [
        L(B('تحديث من غير توقف', 'Zero-downtime upgrades'),
          B('**zero-downtime upgrade**: في queue mode حدّث الـ workers واحد واحد (graceful shutdown بيكمّل الشغال)، والـ webhook processors ورا الـ load balancer واحد واحد، والـ main آخر حاجة (لحظات قليلة). وmigrations القاعدة بتحصل مع أول main جديد — خد نسخة قبلها. أو **blue-green**: بيئة جديدة كاملة وتحويل.', 'A **zero-downtime upgrade**: in queue mode upgrade workers one by one (graceful shutdown finishes running jobs), webhook processors one by one behind the load balancer, and the main last (a few moments). Database migrations run with the first new main — take a backup before. Or **blue-green**: a complete new environment, then switch.'),
          'upgrade 1.110 → 1.112 (tested on staging first)\n1. PITR/backup mark · read the release notes (breaking changes, migrations)\n2. main: pull image, restart (migrations run) ~30 s · schedules pause briefly\n3. webhook-1 drain (LB) → upgrade → healthy → webhook-2 …\n4. worker-1 SIGTERM (finishes jobs) → upgrade → worker-2 …\n5. smoke tests · watch error rate 30 min · rollback = previous tag + restore mark if needed'),
        L(B('متضيعش أحداث', 'Lose no events'),
          B('وقت العطل الأحداث بتيجي بردو. الحلول: المرسل بيعيد (**webhook retries** في Shopify/Stripe — كويس، بس بحد)، أو طابور قدام n8n (Cloudflare Queue، SQS، أو خدمة Express صغيرة بتحفظ الـ webhook وترد 200 — أسبوع 18 JS)، وبعد الرجوع **idempotent replay**: تعيد تشغيل الأحداث، والـ dedupe بيمنع التكرار.', 'Events keep arriving during an outage. Solutions: the sender retries (**webhook retries** in Shopify/Stripe — good, but limited), or a queue in front of n8n (Cloudflare Queues, SQS, or a small Express service storing the webhook and replying 200), and after recovery an **idempotent replay**: re-run the events while dedupe prevents duplicates.'),
          'shop → tiny "inbox" service (separate host): verify HMAC → INSERT event (unique event_id) → 200\n      → forward to n8n; if n8n is down, keep status = pending\nafter recovery: replay pending events in order → n8n upserts by event_id → no duplicates\nShopify: retries 8× over 4 h · Stripe: up to 3 days — check each sender’s policy'),
        L(B('الصيانة المجدولة', 'Planned maintenance'),
          B('التغييرات الكبيرة (ترقية major، نقل سيرفر، تغيير قاعدة) في **maintenance window** متفق عليها (وقت أقل حركة)، بإبلاغ العميل قبلها، وخطة رجوع جاهزة، وحد زمني («لو مخلصناش 2:00، نرجع»). ونفّذها الأول كاملة على staging.', 'Big changes (a major upgrade, a server move, a database change) happen in an agreed **maintenance window** (the quietest time), with notice to the client beforehand, a ready rollback plan, and a time box («if not done by 2:00, roll back»). And run it completely on staging first.'),
          'maintenance notice (3 days before)\n"On Sunday 01:00–02:00 (Cairo) we will upgrade the automation platform. New orders will be queued and processed right after; no action needed. If anything takes longer, we will roll back by 02:00."\nchecklist: staging rehearsal ✓ · backup mark ✓ · rollback steps ✓ · client contact on call ✓')
      ],
      practice: [
        B('حدّث n8n على staging بالترتيب ده وقِس التوقف.', 'Upgrade n8n on staging in this order and measure downtime.'),
        B('اقرا سياسة إعادة الإرسال عند مرسلين بتستخدمهم.', 'Read the retry policies of senders you use.'),
        B('اعمل inbox صغير قدام webhook مهم.', 'Put a small inbox in front of an important webhook.'),
        B('اكتب إشعار صيانة.', 'Write a maintenance notice.')
      ],
      words: [
        W('zero-downtime upgrade', 'تحديث من غير توقف الخدمة', 'an upgrade without service interruption', 'Workers allow a zero-downtime upgrade.'),
        W('blue-green', 'بيئتين وتحويل بينهم', 'two environments and a switch between them', 'A blue-green deploy makes rollback instant.'),
        W('webhook retries', 'إعادة المرسل للـ webhook لو فشل', 'the sender re-sending a failed webhook', 'Shopify webhook retries last 4 hours.'),
        W('idempotent replay', 'إعادة تشغيل أحداث من غير تكرار الأثر', 're-running events without repeating effects', 'Idempotent replay recovered 600 orders.'),
        W('maintenance window', 'وقت متفق عليه للصيانة', 'an agreed time for maintenance', 'The maintenance window is Sunday 01:00.')
      ],
      read: [{ t: 'n8n release notes', url: 'https://docs.n8n.io/changelog/release-notes', what: B('اقرا Breaking changes قبل أي تحديث.', 'Read breaking changes before any upgrade.') }, { t: 'Shopify: Webhook retries', url: 'https://shopify.dev/docs/apps/build/webhooks/troubleshoot', what: B('اقرا Retry frequency.', 'Read Retry frequency.') }],
      challenge: B('اعمل «ترقية آمنة» كاملة على staging: release notes، backup mark، main ثم webhooks ثم workers، smoke tests، مراقبة 30 دقيقة — وفي نفس الوقت خلّي inbox يحفظ webhooks وقت التوقف ويعمل replay بعده من غير تكرار.', 'Do a full «safe upgrade» on staging: release notes, a backup mark, main then webhooks then workers, smoke tests, 30 minutes of watching — while an inbox stores webhooks during any gap and replays them afterwards without duplicates.'),
      quiz: [
        Q(B('ترتيب ترقية queue mode:', 'The order of a queue-mode upgrade:'), [['main ثم webhooks ثم workers واحد واحد', 'main, then webhooks, then workers one by one'], ['كله مرة واحدة', 'all at once'], ['workers بس', 'only workers']], 0, B('من غير توقف.', 'No downtime.')),
        Q(B('n8n وقع ساعتين والـ webhooks جاية:', 'n8n is down 2 hours and webhooks arrive:'), [['retries المرسل أو inbox ثم replay', 'sender retries or an inbox, then replay'], ['ضاعت', 'lost'], ['n8n بيحفظها لوحده', 'n8n stores them itself']], 0, B('مفيش ضياع.', 'No loss.')),
        Q(B('replay بعد الرجوع:', 'Replay after recovery:'), [['idempotent بـ event_id', 'idempotent by event_id'], ['مرتين للتأكيد', 'twice to be sure'], ['يدوي واحد واحد', 'manual one by one']], 0, B('dedupe.', 'Dedupe.'))
      ] },

    { title: B('مراجعة الأسبوع واختباره', 'Week review and test'),
      goal: B('أتمتة بتقوم بعد أي وقعة.', 'Automation that gets up after any fall.'),
      review: [
        B('RTO وRPO والتوافر وتكلفته وخريطة الاعتماديات.', 'RTO, RPO, availability and its cost, and the dependency map.'),
        B('HA لكل طبقة: n8n وPostgres وRedis والـ proxy وDNS.', 'HA per layer: n8n, Postgres, Redis, the proxy and DNS.'),
        B('PITR وWAL و3-2-1 والنسخ immutable والتحقق الآلي.', 'PITR, WAL, 3-2-1, immutable backups and automatic verification.'),
        B('استراتيجيات DR والـ runbook والتمارين.', 'DR strategies, the runbook and drills.'),
        B('تحديث من غير توقف وinbox وreplay وأوقات الصيانة.', 'Zero-downtime upgrades, an inbox, replay and maintenance windows.')
      ],
      project: B('ابني «خطة استمرارية» كاملة لعميل وطبّقها على staging: ورقة RTO/RPO وخريطة اعتماديات، معمارية HA مناسبة (مش مبالغ فيها)، PITR و3-2-1 بنسخة immutable وverification يومي، DR runbook وتمرين مقاس، ترقية من غير توقف موثّقة، وinbox بـ replay لأهم webhook — وتقرير للعميل بالأرقام والتكلفة.', 'Build a complete «continuity plan» for a client and apply it on staging: an RTO/RPO sheet and dependency map, a fitting (not overbuilt) HA architecture, PITR and 3-2-1 with an immutable copy and daily verification, a DR runbook and a measured drill, a documented zero-downtime upgrade, and an inbox with replay for the key webhook — plus a client report with numbers and cost.'),
      test: [
        Q(B('RTO:', 'RTO:'), [['أقصى وقت توقف مقبول', 'the longest acceptable downtime'], ['أقصى بيانات تضيع', 'the most data lost'], ['سرعة السيرفر', 'server speed']], 0, B('وقت.', 'Time.')),
        Q(B('99.9% شهريًا تقريبًا:', '99.9% monthly is about:'), [['43 دقيقة توقف', '43 minutes down'], ['7 ساعات', '7 hours'], ['4 دقايق', '4 minutes']], 0, B('حساب.', 'Arithmetic.')),
        Q(B('n8n Enterprise بأكتر من main:', 'n8n Enterprise with several mains:'), [['multi-main', 'multi-main'], ['blue-green', 'blue-green'], ['cold standby', 'cold standby']], 0, B('leader.', 'A leader.')),
        Q(B('Postgres HA مُدار:', 'Managed HA Postgres:'), [['standby وfailover تلقائي', 'a standby and automatic failover'], ['نسخة يوم', 'a daily copy'], ['RAM أكتر', 'more RAM']], 0, B('zones.', 'Zones.')),
        Q(B('ترجع لـ 13:41 بالظبط:', 'Return to exactly 13:41:'), [['PITR', 'PITR'], ['نسخة ليلية', 'a nightly backup'], ['replica', 'replica']], 0, B('WAL.', 'WAL.')),
        Q(B('قاعدة 3-2-1:', 'The 3-2-1 rule:'), [['3 نسخ، 2 نوع، 1 برة', '3 copies, 2 media, 1 off-site'], ['3 سيرفرات', '3 servers'], ['نسخة كل 3 أيام', 'a copy every 3 days']], 0, B('تنوع.', 'Diversity.')),
        Q(B('backup verification:', 'Backup verification:'), [['استعادة آلية ومقارنة', 'an automatic restore and comparison'], ['النظر لحجم الملف', 'looking at the file size'], ['مش لازم', 'unnecessary']], 0, B('ثقة.', 'Confidence.')),
        Q(B('سيرفرات مطفية جاهزة في منطقة تانية:', 'Powered-off servers ready in another region:'), [['cold standby', 'cold standby'], ['warm standby', 'warm standby'], ['multi-region', 'multi-region']], 0, B('أرخص.', 'Cheaper.')),
        Q(B('dr drill:', 'A DR drill:'), [['تنفيذ فعلي وقياس الوقت', 'a real run, timed'], ['قراءة الخطة', 'reading the plan'], ['اجتماع', 'a meeting']], 0, B('تمرين.', 'Practice.')),
        Q(B('تحديث workers من غير قطع:', 'Upgrading workers without cuts:'), [['واحد واحد بـ graceful shutdown', 'one by one with graceful shutdown'], ['kill الكل', 'kill them all'], ['بالليل وخلاص', 'just do it at night']], 0, B('zero-downtime.', 'Zero-downtime.')),
        Q(B('webhooks وقت العطل:', 'Webhooks during an outage:'), [['retries المرسل أو inbox + replay', 'sender retries or an inbox + replay'], ['بتضيع وخلاص', 'simply lost'], ['n8n بيخزّنها', 'n8n stores them']], 0, B('مفيش ضياع.', 'No loss.')),
        Q(B('ترقية major:', 'A major upgrade:'), [['maintenance window وإشعار وخطة رجوع', 'a maintenance window, notice and rollback plan'], ['فجأة الضهر', 'suddenly at noon'], ['من غير staging', 'without staging']], 0, B('تخطيط.', 'Planning.'))
      ] }
  ]
};
