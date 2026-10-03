// Python week 36 — Google, Slack and Telegram integrations, and the month 9 project.
// SDK calls are display-only; payload building, signature checks and pagination run with the standard library.
const B = (ar, en) => ({ ar, en });
const L = (h, p, ex, more) => Object.assign({ h, p, ex }, more || {});
const R = { run: 1 };
const T = { lang: 'text' };
const W = (t, ar, en, ex) => ({ t, m: B(ar, en), ex });
const Q = (q, o, a, why) => ({ q, o: o.map(x => B(x[0], x[1])), a, why });
module.exports = {
  level: B('محترف', 'Professional'),
  title: B('تكاملات Google وSlack وTelegram ومشروع الشهر', 'Google, Slack and Telegram integrations, and the month project'),
  goal: B('توصّل بايثون بالأدوات اللي الشركات بتستخدمها كل يوم — Google Sheets وSlack وTelegram — بأمان واعتمادية، وتجمع الشهر كله في مشروع واحد.',
          'Connect Python to the tools companies use every day — Google Sheets, Slack and Telegram — safely and reliably, and bring the whole month together in one project.'),
  days: [
    { title: B('Google Sheets من بايثون', 'Google Sheets from Python'),
      goal: B('تقرا وتكتب في Sheets من سكربت أو API بصلاحيات مضبوطة.', 'Read and write Sheets from a script or API with the right permissions.'),
      learn: [
        L(B('service account ولا OAuth؟', 'Service account or OAuth?'),
          B('**service account** = حساب للبرنامج نفسه (ملف JSON)؛ بتشارك معاه الشيت زي أي زميل. مناسب للسكربتات والسيرفرات. أما **OAuth** فلما البرنامج يشتغل **باسم المستخدم** على ملفاته — ومعاه شاشة **oauth consent**. وفي الحالتين اطلب أقل scopes (مثلًا `spreadsheets` بس، مش Drive كله). وملف الـ JSON سر: برة Git.', 'A **service account** = an account for the program itself (a JSON file); you share the sheet with it like any colleague. Good for scripts and servers. **OAuth** is for when the program works **as the user** on their files — with an **oauth consent** screen. Either way, request the fewest scopes (e.g. just `spreadsheets`, not all of Drive). The JSON file is a secret: keep it out of Git.'),
          'import gspread\n\ngc = gspread.service_account(filename=settings.google_sa_file)   # path from settings, not hard-coded\nsheet = gc.open_by_key(settings.orders_sheet_id).worksheet("Orders")\nrows = sheet.get_all_records()          # list of dicts using the header row\nprint(len(rows), rows[0])'),
        L(B('A1 notation والكتابة دفعة واحدة', 'A1 notation and writing in one batch'),
          B('الـ **google sheets api** بيتعامل بنطاقات **a1 notation** (`Orders!A1:C3`). اكتب دفعة واحدة (`update` أو **batch update**) بدل خلية خلية — عشان الحصة (quota) محدودة. الكود ده بيبني القيم والنطاق بنفسه:', 'The **google sheets api** works with **a1 notation** ranges (`Orders!A1:C3`). Write in one batch (`update` or a **batch update**) instead of cell by cell — the quota is limited. This code builds the values and the range itself:'),
          'def col_letter(n):\n    s = ""\n    while n:\n        n, r = divmod(n - 1, 26)\n        s = chr(65 + r) + s\n    return s\n\nrows = [{"order": 101, "total": 250.0, "city": "Cairo"},\n        {"order": 102, "total": 90.5, "city": "Giza"}]\nheader = list(rows[0])\nvalues = [header] + [[r[h] for h in header] for r in rows]\nrng = f"Orders!A1:{col_letter(len(header))}{len(values)}"\nprint(rng, values[1], col_letter(28))\n# sheet.update(values, rng)  — one call for the whole block', R),
        L(B('Sheets مش قاعدة بيانات', 'Sheets is not a database'),
          B('الشيت ممتاز كواجهة للفريق (مراجعة، تعديل يدوي، تقارير)، بس مش مكان لملايين الصفوف أو لكتابات متزامنة. النمط الصح: Postgres هو المصدر، والشيت **نسخة للعرض** بتتحدث من job — أو العكس: الفريق بيكتب في الشيت وjob بينقل للقاعدة بعد التحقق (pydantic).', 'A sheet is a great interface for the team (review, manual edits, reports), but not a place for millions of rows or concurrent writes. The right pattern: Postgres is the source, and the sheet is a **display copy** refreshed by a job — or the reverse: the team writes in the sheet and a job moves rows to the database after validation (pydantic).'),
          'Postgres (source) ──job every 15 min──▶ Sheet "Daily orders" (read-only for the team)\nSheet "Price changes" (team edits) ──job──▶ validate with pydantic ──▶ Postgres', T)
      ],
      practice: [
        B('اعمل service account وشارك معاه شيت تجربة.', 'Create a service account and share a test sheet with it.'),
        B('اقرا الصفوف بـ get_all_records وحوّلها لـ pydantic.', 'Read rows with get_all_records and convert them to pydantic.'),
        B('اكتب 100 صف بنداء واحد بدل 100 نداء.', 'Write 100 rows in one call instead of 100 calls.'),
        B('اكتب جملتين: إمتى service account وإمتى OAuth.', 'Write two sentences: when a service account and when OAuth.')
      ],
      words: [
        W('service account', 'حساب للبرنامج نفسه مش لشخص', 'an account for the program itself, not a person', 'Share the sheet with the service account.'),
        W('oauth consent', 'شاشة موافقة المستخدم على الصلاحيات', 'the screen where a user approves permissions', 'The oauth consent screen lists the scopes.'),
        W('google sheets api', 'واجهة جوجل البرمجية للجداول', 'Google’s programming interface for spreadsheets', 'The Google Sheets API has per-minute quotas.'),
        W('gspread', 'مكتبة بايثون سهلة لـ Google Sheets', 'an easy Python library for Google Sheets', 'gspread reads all records as dicts.'),
        W('a1 notation', 'طريقة كتابة نطاق خلايا زي A1:C3', 'the way to write a cell range like A1:C3', 'Use A1 notation for the target range.')
      ],
      read: [{ t: 'gspread documentation', url: 'https://docs.gspread.org/en/latest/', what: B('اقرا Authentication وExamples.', 'Read Authentication and Examples.') }, { t: 'Google Sheets API: Python quickstart', url: 'https://developers.google.com/workspace/sheets/api/quickstart/python', what: B('اقرا خطوات التفعيل.', 'Read the setup steps.') }],
      challenge: B('اعمل job بيقرا طلبات اليوم من Postgres (أو CSV) ويكتبها في شيت «Daily orders» بنداء واحد، وjob تاني بيقرا شيت «Price changes» ويتحقق منه بـ pydantic ويرفض الصفوف الغلط في تقرير.', 'Build a job that reads today’s orders from Postgres (or CSV) and writes them to a «Daily orders» sheet in one call, and a second job that reads a «Price changes» sheet, validates it with pydantic and reports rejected rows.'),
      quiz: [
        Q(B('سكربت على سيرفر بيكتب في شيت الشركة:', 'A server script writing to the company sheet:'), [['service account', 'a service account'], ['كلمة سر مديرك', 'your manager’s password'], ['OAuth لكل تشغيل', 'OAuth on every run']], 0, B('حساب للبرنامج.', 'An account for the program.')),
        Q(B('كتابة 500 صف:', 'Writing 500 rows:'), [['نداء واحد بنطاق', 'one call with a range'], ['500 نداء', '500 calls'], ['يدوي', 'by hand']], 0, B('الحصة.', 'The quota.')),
        Q(B('ملف JSON الخاص بالـ service account:', 'The service account JSON file:'), [['سر برة Git', 'a secret kept out of Git'], ['في README', 'in the README'], ['عام', 'public']], 0, B('مفتاح.', 'A key.'))
      ] },

    { title: B('Slack', 'Slack'),
      goal: B('تبعت رسايل غنية وتستقبل أوامر من Slack بأمان.', 'Send rich messages and receive commands from Slack safely.'),
      learn: [
        L(B('رسايل بـ Block Kit', 'Messages with Block Kit'),
          B('الـ **bot token** (`xoxb-…`) في الإعدادات، والرسالة **Block Kit**: أقسام وحقول وأزرار بدل نص طويل. أطلب أقل صلاحيات (`chat:write` بس لو هتبعت). والـ SDK الرسمي `slack_sdk` بيتعامل مع الأخطاء والحدود.', 'The **bot token** (`xoxb-…`) lives in settings, and the message uses **Block Kit**: sections, fields and buttons instead of a long text. Request minimal scopes (`chat:write` only if you just send). The official `slack_sdk` handles errors and limits.'),
          'from slack_sdk import WebClient\n\nclient = WebClient(token=settings.slack_bot_token)\nclient.chat_postMessage(channel="#orders", text="New order #101", blocks=[\n    {"type": "section", "text": {"type": "mrkdwn", "text": "*New order #101* — 250.00 EGP"}},\n    {"type": "section", "fields": [{"type": "mrkdwn", "text": "*City:*\\nCairo"},\n                                   {"type": "mrkdwn", "text": "*Payment:*\\npaid"}]},\n    {"type": "actions", "elements": [{"type": "button", "text": {"type": "plain_text", "text": "Ship"},\n                                      "action_id": "ship", "value": "101"}]},\n])'),
        L(B('التحقق من طلبات Slack', 'Verifying requests from Slack'),
          B('أي حد يقدر يبعت POST للـ endpoint بتاعك. Slack بيوقّع كل طلب بالـ **signing secret**: `v0:timestamp:body` بـ HMAC-SHA256. اتحقق من التوقيع (بـ compare_digest) **ومن الوقت** (أقل من 5 دقايق) عشان تمنع **replay attack** (حد يعيد إرسال طلب قديم).', 'Anyone can POST to your endpoint. Slack signs each request with the **signing secret**: `v0:timestamp:body` with HMAC-SHA256. Check the signature (with compare_digest) **and the time** (under 5 minutes) to stop a **replay attack** (someone resending an old request).'),
          'import hashlib, hmac, time\nSIGNING_SECRET = b"demo-signing-secret"\n\ndef slack_sign(ts, body):\n    base = f"v0:{ts}:{body}".encode()\n    return "v0=" + hmac.new(SIGNING_SECRET, base, hashlib.sha256).hexdigest()\n\ndef verify(headers, body, now):\n    ts = headers["X-Slack-Request-Timestamp"]\n    if abs(now - int(ts)) > 300:\n        return False                      # too old: possible replay\n    return hmac.compare_digest(slack_sign(ts, body), headers["X-Slack-Signature"])\n\nnow = int(time.time())\nbody = "command=/orders&text=today"\ngood = {"X-Slack-Request-Timestamp": str(now), "X-Slack-Signature": slack_sign(now, body)}\nold = {"X-Slack-Request-Timestamp": str(now - 900), "X-Slack-Signature": slack_sign(now - 900, body)}\nprint(verify(good, body, now), verify(good, body + "x", now), verify(old, body, now))', R),
        L(B('slash commands والرد خلال 3 ثواني', 'Slash commands and the 3-second reply'),
          B('**slash command** (`/orders today`) بيبعت POST لسيرفرك، ولازم ترد خلال **3 ثواني**. لو الشغل أطول: رد فورًا «جاري التحضير…» وكمّل في الطابور (أسبوع 35)، وابعت النتيجة على `response_url`. ومكتبة Bolt بتعمل ده بـ `ack()`. ولو مش عايز endpoint عام: **socket mode** بيفتح اتصال من جوه شبكتك.', 'A **slash command** (`/orders today`) POSTs to your server, and you must reply within **3 seconds**. If the work is longer: reply at once «preparing…» and continue in the queue (week 35), then send the result to `response_url`. The Bolt library does this with `ack()`. And if you do not want a public endpoint: **socket mode** opens a connection from inside your network.'),
          'from slack_bolt import App\napp = App(token=settings.slack_bot_token, signing_secret=settings.slack_signing_secret)\n\n@app.command("/orders")\ndef orders(ack, command, respond):\n    ack("Preparing the report…")                 # within 3 seconds\n    enqueue_report(command["text"], command["response_url"])')
      ],
      practice: [
        B('اعمل Slack app تجربة وابعت رسالة Block Kit.', 'Create a test Slack app and send a Block Kit message.'),
        B('شغّل مثال التوقيع وجرّب body متعدّل وطلب قديم.', 'Run the signature example and try a modified body and an old request.'),
        B('اعمل slash command بيرد فورًا ويكمّل في الطابور.', 'Build a slash command that replies at once and continues in the queue.'),
        B('اكتب الـ scopes اللي محتاجها فعلًا بس.', 'List only the scopes you really need.')
      ],
      words: [
        W('bot token', 'توكن البوت اللي بيبعت باسمه', 'the token the bot acts with', 'Keep the bot token in settings.'),
        W('block kit', 'نظام Slack لبناء رسايل غنية', 'Slack’s system for building rich messages', 'Block Kit adds buttons to the alert.'),
        W('signing secret', 'سر بيتحقق بيه من إن الطلب من Slack', 'a secret used to verify a request came from Slack', 'Check every request with the signing secret.'),
        W('slash command', 'أمر بيبدأ بـ / في الشات', 'a chat command starting with /', 'The /orders slash command returns today’s numbers.'),
        W('replay attack', 'إعادة إرسال طلب قديم صحيح', 'resending an old valid request', 'The timestamp check blocks replay attacks.')
      ],
      read: [{ t: 'Slack: Verifying requests from Slack', url: 'https://docs.slack.dev/authentication/verifying-requests-from-slack/', what: B('اقرا خطوات التحقق.', 'Read the verification steps.') }, { t: 'Bolt for Python', url: 'https://docs.slack.dev/tools/bolt-python/', what: B('اقرا Getting started والـ ack.', 'Read Getting started and ack.') }],
      challenge: B('اعمل «بوت عمليات» في Slack: تنبيه Block Kit لكل طلب كبير بزرار «Ship»، و`/orders today` بيرد فورًا ويبعت التقرير بعدين، مع تحقق التوقيع والوقت واختبارات للتحقق.', 'Build an «operations bot» in Slack: a Block Kit alert for each large order with a «Ship» button, and `/orders today` replying at once and sending the report later, with signature and time checks and tests for the verification.'),
      quiz: [
        Q(B('ليه بنتحقق من الوقت مع التوقيع؟', 'Why check the time as well as the signature?'), [['نمنع إعادة طلب قديم', 'to block resending an old request'], ['للسرعة', 'for speed'], ['للتنسيق', 'for formatting']], 0, B('replay.', 'Replay.')),
        Q(B('slash command شغله 30 ثانية:', 'A slash command needing 30 seconds:'), [['رد فوري وكمّل في الطابور', 'reply at once and continue in a queue'], ['استنى 30 ثانية', 'wait 30 seconds'], ['متردش', 'do not reply']], 0, B('3 ثواني.', '3 seconds.')),
        Q(B('من غير endpoint عام:', 'Without a public endpoint:'), [['socket mode', 'socket mode'], ['مستحيل', 'impossible'], ['FTP', 'FTP']], 0, B('اتصال من جوه.', 'A connection from inside.'))
      ] },

    { title: B('Telegram', 'Telegram'),
      goal: B('تبني بوت Telegram بأزرار وwebhook آمن.', 'Build a Telegram bot with buttons and a safe webhook.'),
      learn: [
        L(B('webhook ولا long polling؟', 'Webhook or long polling?'),
          B('**long polling** (`getUpdates`) أبسط للتجربة ومش محتاج سيرفر عام. للإنتاج: **setWebhook** على HTTPS مع `secret_token` — Telegram بيبعته في header `X-Telegram-Bot-Api-Secret-Token` وانت بتقارنه (**webhook secret**). ولو حد بعت من غيره: 401.', '**Long polling** (`getUpdates`) is simpler for testing and needs no public server. For production: **setWebhook** on HTTPS with a `secret_token` — Telegram sends it in the `X-Telegram-Bot-Api-Secret-Token` header and you compare it (**webhook secret**). Anything sent without it: 401.'),
          'httpx.post(f"https://api.telegram.org/bot{settings.tg_token}/setWebhook", json={\n    "url": "https://api.example.com/telegram/webhook",\n    "secret_token": settings.tg_webhook_secret,\n    "allowed_updates": ["message", "callback_query"],\n})\n\n@app.post("/telegram/webhook")\nasync def tg(update: dict, x_telegram_bot_api_secret_token: str = Header("")):\n    if not hmac.compare_digest(x_telegram_bot_api_secret_token, settings.tg_webhook_secret):\n        raise HTTPException(401)\n    await enqueue("telegram_update", update)   # reply fast, work in the queue\n    return {"ok": True}'),
        L(B('أزرار و MarkdownV2', 'Buttons and MarkdownV2'),
          B('**inline keyboard** = أزرار تحت الرسالة؛ كل زرار ليه `callback_data` (أقصى 64 بايت، فابعت معرّف مش بيانات). و**MarkdownV2** بيرفض الرسالة لو فيه رمز خاص مش متهرّب (`.` `-` `(`…) — فهرّب النص اللي جاي من البيانات دايمًا:', 'An **inline keyboard** = buttons under the message; each has `callback_data` (max 64 bytes, so send an id, not data). And **MarkdownV2** rejects the message if a special character is not escaped (`.` `-` `(`…) — so always escape text coming from data:'),
          'import json\nSPECIAL = set("_*[]()~`>#+-=|{}.!")\n\ndef escape_md(text):\n    return "".join("\\\\" + c if c in SPECIAL else c for c in text)\n\nmsg = {\n    "chat_id": 123456,\n    "text": "*New order*\\n" + escape_md("#101 total: 250.00 EGP (paid)"),\n    "parse_mode": "MarkdownV2",\n    "reply_markup": {"inline_keyboard": [[\n        {"text": "Ship", "callback_data": "ship:101"},\n        {"text": "Cancel", "callback_data": "cancel:101"},\n    ]]},\n}\nprint(msg["text"])\nprint(len(json.dumps(msg).encode()), "bytes;", all(len(b["callback_data"]) <= 64 for b in msg["reply_markup"]["inline_keyboard"][0]))', R),
        L(B('callback query', 'Callback query'),
          B('لما حد يدوس زرار، بيجيلك **callback query** فيه `data` و`from`. اتحقق إن الشخص مسموحله (قايمة IDs للفريق)، نفّذ مرة واحدة بس (idempotent: «اتشحن بالفعل»)، ورد بـ `answerCallbackQuery` عشان الزرار يبطّل يلف، وعدّل الرسالة بالحالة الجديدة.', 'When someone presses a button, you get a **callback query** with `data` and `from`. Check the person is allowed (a list of team IDs), act only once (idempotent: «already shipped»), reply with `answerCallbackQuery` so the button stops spinning, and edit the message to show the new state.'),
          'async def on_callback(cq: dict):\n    if cq["from"]["id"] not in settings.tg_team_ids:\n        return await answer(cq["id"], "Not allowed")\n    action, order_id = cq["data"].split(":")\n    changed = await services.apply(action, int(order_id))   # no-op if already done\n    await answer(cq["id"], "Done" if changed else "Already done")\n    await edit_message(cq["message"], status=action)')
      ],
      practice: [
        B('اعمل بوت من BotFather وجرّب getUpdates.', 'Create a bot with BotFather and try getUpdates.'),
        B('شغّل مثال MarkdownV2 بنص فيه نقط وأقواس.', 'Run the MarkdownV2 example with text containing dots and brackets.'),
        B('اعمل webhook بـ secret_token ورفض أي طلب من غيره.', 'Set a webhook with a secret_token and refuse any request without it.'),
        B('اعمل زرار «Ship» وتعامل مع الضغط مرتين.', 'Add a «Ship» button and handle a double press.')
      ],
      words: [
        W('long polling', 'سؤال السيرفر عن تحديثات بطلب بيفضل مفتوح', 'asking a server for updates with a request that stays open', 'Use long polling while testing locally.'),
        W('setwebhook', 'أمر Telegram لتسجيل رابط استقبال', 'the Telegram method that registers a receiving URL', 'Call setWebhook with a secret token.'),
        W('webhook secret', 'سر بيثبت إن الطلب من المصدر الصح', 'a secret proving a request comes from the right source', 'Compare the webhook secret on every request.'),
        W('inline keyboard', 'أزرار تحت رسالة البوت', 'buttons under a bot message', 'The inline keyboard has Ship and Cancel.'),
        W('callback query', 'حدث ضغط زرار في Telegram', 'the event of a button press in Telegram', 'Answer every callback query quickly.')
      ],
      read: [{ t: 'Telegram Bot API', url: 'https://core.telegram.org/bots/api', what: B('اقرا setWebhook وInlineKeyboardMarkup وformatting options.', 'Read setWebhook, InlineKeyboardMarkup and formatting options.') }],
      challenge: B('اعمل بوت Telegram للفريق: تنبيه بكل طلب جديد بأزرار Ship/Cancel، webhook بسر، صلاحيات بقايمة IDs، تنفيذ مرة واحدة، وتعديل الرسالة بالحالة.', 'Build a team Telegram bot: an alert for each new order with Ship/Cancel buttons, a webhook with a secret, permissions by an ID list, act-once handling, and editing the message with the status.'),
      quiz: [
        Q(B('callback_data المناسب:', 'Suitable callback_data:'), [['معرّف قصير ship:101', 'a short id like ship:101'], ['الطلب كله JSON', 'the whole order as JSON'], ['صورة', 'an image']], 0, B('64 بايت.', '64 bytes.')),
        Q(B('نص من البيانات في MarkdownV2:', 'Text from data in MarkdownV2:'), [['لازم يتهرّب', 'must be escaped'], ['يتبعت زي ما هو', 'is sent as is'], ['يتشال', 'is removed']], 0, B('وإلا الرسالة تترفض.', 'Or the message is rejected.')),
        Q(B('webhook من غير secret صح:', 'A webhook without the right secret:'), [['401', '401'], ['نعالجه', 'process it'], ['200 ونتجاهل', '200 and ignore']], 0, B('رفض.', 'Refuse.'))
      ] },

    { title: B('تكاملات يُعتمد عليها', 'Reliable integrations'),
      goal: B('تتعامل مع الحدود والصفحات والأسرار في أي API.', 'Handle limits, pages and secrets in any API.'),
      learn: [
        L(B('الصفحات وحدود المعدل مع بعض', 'Pages and rate limits together'),
          B('أغلب الـ APIs بترجع البيانات صفحات بـ cursor، وممكن ترد 429 في النص. generator واحد بيجيب كل الصفحات ويحترم Retry-After بحد أقصى للمحاولات — وتستخدمه مع Slack وGoogle وأي API:', 'Most APIs return data in pages with a cursor, and may reply 429 midway. One generator fetches every page and respects Retry-After with a retry limit — and you reuse it with Slack, Google and any API:'),
          'import time\nPAGES = {None: (["a", "b"], "c2"), "c2": (["c", "d"], "c3"), "c3": (["e"], None)}\ncalls = {"n": 0}\n\ndef fake_api(cursor):\n    calls["n"] += 1\n    if calls["n"] == 2:\n        return 429, {"Retry-After": "0"}, None\n    items, nxt = PAGES[cursor]\n    return 200, {}, {"items": items, "next_cursor": nxt}\n\ndef fetch_all(call, max_retries=3):\n    cursor = None\n    while True:\n        for _ in range(max_retries):\n            status, headers, body = call(cursor)\n            if status != 429:\n                break\n            time.sleep(float(headers.get("Retry-After", 1)))\n        else:\n            raise RuntimeError("rate limited for too long")\n        yield from body["items"]\n        cursor = body["next_cursor"]\n        if not cursor:\n            return\n\nprint(list(fetch_all(fake_api)), "calls:", calls["n"])', R),
        L(B('الحصص والـ SDK', 'Quotas and the SDK'),
          B('كل خدمة ليها **quota** (طلبات في الدقيقة/اليوم). اعرفها قبل ما تصمم، وجمّع الكتابات (batch)، وخزّن مؤقتًا القراءات المتكررة. والـ **sdk** الرسمي غالبًا أحسن من HTTP يدوي: بيتعامل مع المصادقة والـ retries والأنواع — بس افهم الطلبات اللي تحته عشان تعرف تصلّح.', 'Every service has a **quota** (requests per minute/day). Know it before you design, batch your writes, and cache repeated reads. The official **sdk** is usually better than raw HTTP: it handles auth, retries and types — but understand the requests underneath so you can debug.'),
          'Google Sheets: read/write requests per minute per project and per user\nSlack: tiers per method (e.g. chat.postMessage ≈ 1 message/second per channel)\nTelegram: about 30 messages/second overall, 1/second per chat\n→ check the current numbers in each provider’s docs before relying on them', T),
        L(B('الأسرار والصلاحيات', 'Secrets and permissions'),
          B('**least privilege**: كل توكن بأقل صلاحيات لازمة، وتوكن منفصل لكل بيئة (dev/prod). **token rotation**: غيّر الأسرار دوريًا وفورًا لو اتسربت — ولازم التغيير يبقى سهل (متغير بيئة واحد، من غير تعديل كود). ومتطبعش التوكن في اللوج أبدًا.', '**Least privilege**: every token has the minimum permissions needed, with a separate token per environment (dev/prod). **Token rotation**: change secrets regularly and immediately after a leak — and make changing them easy (one environment variable, no code edits). Never print a token in the logs.'),
          'class Settings(BaseSettings):\n    slack_bot_token: SecretStr       # printed as **********\n    tg_token: SecretStr\n    google_sa_file: Path\n\nlog.info("settings loaded: %s", settings)   # secrets stay masked\nclient = WebClient(token=settings.slack_bot_token.get_secret_value())')
      ],
      practice: [
        B('شغّل مثال الصفحات وغيّر رقم الـ 429.', 'Run the pages example and change when the 429 happens.'),
        B('اكتب جدول بالحصص للخدمات التلاتة من وثائقها.', 'Write a table of quotas for the three services from their docs.'),
        B('حوّل الأسرار لـ SecretStr واتأكد إنها مش بتظهر.', 'Turn the secrets into SecretStr and confirm they do not show.'),
        B('اكتب خطوات تغيير توكن Slack في 5 دقايق.', 'Write the steps to rotate the Slack token in 5 minutes.')
      ],
      words: [
        W('quota', 'حد الاستخدام المسموح من خدمة', 'the allowed usage limit of a service', 'We hit the daily quota at noon.'),
        W('sdk', 'مكتبة رسمية للتعامل مع خدمة', 'an official library for working with a service', 'The SDK retries rate-limited calls.'),
        W('least privilege', 'أقل صلاحيات لازمة للشغل', 'the minimum permissions the job needs', 'Least privilege limits the damage of a leak.'),
        W('token rotation', 'تغيير التوكنات دوريًا', 'replacing tokens regularly', 'Token rotation takes one environment variable.'),
        W('batch update', 'تحديث مجموعة حاجات في طلب واحد', 'updating many things in one request', 'One batch update writes the whole table.')
      ],
      read: ['lib:HTTPX documentation', { t: 'Pydantic: SecretStr', url: 'https://pydantic.dev/docs/validation/latest/api/pydantic/types/#pydantic.types.SecretStr', what: B('اقرا إزاي بيخفي القيمة.', 'Read how it hides the value.') }],
      challenge: B('اكتب «طبقة تكامل» مشتركة: fetch_all بالصفحات والـ 429، إعدادات بـ SecretStr، توكنات منفصلة لـ dev/prod، وصفحة توثيق بالحصص وخطوات تغيير كل توكن.', 'Write a shared «integration layer»: fetch_all with pages and 429s, SecretStr settings, separate dev/prod tokens, and a doc page with the quotas and the steps to rotate each token.'),
      quiz: [
        Q(B('توكن Slack بيبعت بس:', 'A Slack token that only sends:'), [['chat:write بس', 'chat:write only'], ['admin', 'admin'], ['كل الصلاحيات', 'every scope']], 0, B('least privilege.', 'Least privilege.')),
        Q(B('توكن اتسرب:', 'A leaked token:'), [['غيّره فورًا', 'rotate it immediately'], ['استنى', 'wait'], ['امسح الريبو بس', 'only delete the repo']], 0, B('rotation.', 'Rotation.')),
        Q(B('429 في نص الصفحات:', 'A 429 midway through pages:'), [['استنى Retry-After وكمّل من نفس الـ cursor', 'wait Retry-After and continue from the same cursor'], ['ابدأ من الأول', 'start over'], ['وقّف خالص', 'stop entirely']], 0, B('من غير تكرار.', 'Without duplicates.'))
      ] },

    { title: B('تصميم مشروع الشهر', 'Designing the month project'),
      goal: B('تجمع الكشط والـ API والتكاملات في نظام واحد قابل للاختبار.', 'Combine scraping, the API and integrations in one testable system.'),
      learn: [
        L(B('adapters للخدمات', 'Adapters for services'),
          B('متخليش منطقك يكلم Slack أو Telegram مباشرة. اعمل **adapter** بواجهة صغيرة (`send(text)`) وكل خدمة تنفّذها. في الاختبار: **fake client** بيسجّل الرسايل بدل ما يبعت. كده تختبر المنطق في ملّي ثانية ومن غير إنترنت:', 'Do not let your logic call Slack or Telegram directly. Create an **adapter** with a small interface (`send(text)`) that each service implements. In tests: a **fake client** records messages instead of sending. That way you test the logic in milliseconds with no internet:'),
          'from typing import Protocol\n\nclass Notifier(Protocol):\n    def send(self, text: str) -> None: ...\n\nclass FakeNotifier:\n    def __init__(self):\n        self.sent = []\n    def send(self, text):\n        self.sent.append(text)\n\ndef daily_summary(orders, notifier: Notifier):\n    total = sum(o["total"] for o in orders)\n    notifier.send(f"{len(orders)} orders, total {total:.2f}")\n\nfake = FakeNotifier()\ndaily_summary([{"total": 250}, {"total": 90.5}], fake)\nassert fake.sent == ["2 orders, total 340.50"]\nprint("ok", fake.sent)', R),
        L(B('معمارية المشروع', 'The project architecture'),
          B('مشروع الشهر بيجمع الأسابيع 33–36: scraper (Playwright/httpx) بيجمع أسعار المنافسين، Postgres، API (FastAPI) بيعرض ويستقبل، worker للمهام، وتنبيهات Slack/Telegram وتقرير في Sheets. كل جزء بحدود واضحة وتسجيل بالـ request id.', 'The month project combines weeks 33–36: a scraper (Playwright/httpx) collecting competitor prices, Postgres, an API (FastAPI) serving and receiving, a worker for jobs, and Slack/Telegram alerts plus a Sheets report. Each part has clear boundaries and logging with the request id.'),
          'scheduler ─▶ scraper ─▶ Postgres ◀─ API (FastAPI) ◀─ n8n / dashboard\n                         │\n                       worker ─▶ adapters: Slack · Telegram · Google Sheets\n                         └─▶ alerts when price changes > 10 %', T),
        L(B('runbook', 'The runbook'),
          B('**runbook** = صفحة «لو حصل كذا اعمل كذا»: الـ scraper وقف، Slack رجّع 429، التوكن انتهى، الشيت اتقفل. لكل مشكلة: إزاي تعرفها (لوج/تنبيه)، وخطوات الحل، ومين المسؤول. وخلّي إعدادات التكامل نفسها في الريبو (scopes، **app manifest** لـ Slack) عشان تتعاد في دقايق.', 'A **runbook** = a page of «if X happens, do Y»: the scraper stopped, Slack returned 429, the token expired, the sheet was locked. For each problem: how you notice it (log/alert), the fix steps, and who owns it. Keep the integration setup itself in the repo (scopes, the Slack **app manifest**) so it can be recreated in minutes.'),
          '## Slack alerts stopped\nSignal: no message in #prices for 2 h + "invalid_auth" in logs\n1. Check the token in the secret store (not expired/revoked)\n2. Rotate: create a new token, update SLACK_BOT_TOKEN, restart the worker\n3. Send a test alert: python -m app.tools.ping_slack\nOwner: ops on-call', T)
      ],
      practice: [
        B('اعمل Notifier وadapter لـ Slack وTelegram وFake.', 'Create a Notifier and adapters for Slack, Telegram and a fake.'),
        B('ارسم معمارية مشروعك في سطور.', 'Draw your project architecture in lines.'),
        B('اكتب runbook لـ 4 مشاكل.', 'Write a runbook for 4 problems.'),
        B('صدّر app manifest بتاع Slack للريبو.', 'Export the Slack app manifest into the repo.')
      ],
      words: [
        W('adapter', 'طبقة بتوحّد التعامل مع خدمة خارجية', 'a layer that standardises working with an external service', 'The Slack adapter implements send().'),
        W('fake client', 'نسخة وهمية من خدمة للاختبار', 'a pretend version of a service for tests', 'The fake client records sent messages.'),
        W('runbook', 'دليل خطوات التعامل مع المشاكل', 'a step-by-step guide for handling incidents', 'Follow the runbook when alerts stop.'),
        W('app manifest', 'ملف إعدادات تطبيق Slack', 'the configuration file of a Slack app', 'Keep the app manifest in Git.'),
        W('capstone', 'مشروع ختامي بيجمع كل اللي اتعلمته', 'a final project combining everything learned', 'The capstone joins scraping and alerts.')
      ],
      read: ['lib:pytest documentation', { t: 'Slack: App manifest reference', url: 'https://docs.slack.dev/reference/app-manifest/', what: B('اقرا شكل الملف.', 'Read the file format.') }],
      challenge: B('اكتب وثيقة تصميم صفحة واحدة لمشروع الشهر: المكونات، تدفق البيانات، الـ adapters، الحصص، الأسرار، الاختبارات، والـ runbook.', 'Write a one-page design doc for the month project: components, data flow, adapters, quotas, secrets, tests and the runbook.'),
      quiz: [
        Q(B('اختبار منطق التنبيه:', 'Testing the alert logic:'), [['fake client', 'a fake client'], ['Slack الحقيقي كل مرة', 'real Slack every time'], ['من غير اختبار', 'no test']], 0, B('سريع ومن غير إنترنت.', 'Fast and offline.')),
        Q(B('runbook فيه:', 'A runbook contains:'), [['العلامة، الخطوات، المسؤول', 'the signal, the steps, the owner'], ['الكود كله', 'all the code'], ['شعار الشركة', 'the company logo']], 0, B('عملي.', 'Practical.')),
        Q(B('adapter فايدته:', 'An adapter’s benefit:'), [['تبدّل الخدمة من غير ما تغيّر المنطق', 'swap the service without changing the logic'], ['أبطأ', 'slower'], ['أعقد', 'more complex']], 0, B('حدود واضحة.', 'Clear boundaries.'))
      ] },

    { title: B('مراجعة الشهر التاسع ومشروعه', 'Month 9 review and project'),
      goal: B('«مراقب أسعار» كامل من الكشط للتنبيه.', 'A complete «price watcher» from scraping to alerts.'),
      review: [
        B('Playwright والكشط على نطاق واسع بأدب واحترام robots.txt (أسبوع 33–34).', 'Playwright and polite scraping at scale respecting robots.txt (weeks 33–34).'),
        B('FastAPI بالمصادقة والطوابير والتحديثات اللحظية (أسبوع 35).', 'FastAPI with auth, queues and real-time updates (week 35).'),
        B('Google Sheets بـ service account وكتابة دفعة واحدة.', 'Google Sheets with a service account and batch writes.'),
        B('Slack وTelegram: Block Kit، التوقيعات، الأزرار، الـ webhook secret.', 'Slack and Telegram: Block Kit, signatures, buttons, webhook secrets.'),
        B('الحصص والصفحات والأسرار والـ adapters والـ runbook.', 'Quotas, pages, secrets, adapters and the runbook.')
      ],
      project: B('مشروع الشهر «مراقب أسعار»: scraper لصفحات منتجات مسموح بكشطها (أو API رسمي) كل ساعة، Postgres بالتاريخ، API بـ JWT وAPI key لـ n8n، تنبيه Slack وTelegram بأزرار لما السعر يتغير أكتر من 10%، تقرير يومي في Google Sheets، adapters وfakes، 25 اختبار، Docker، وrunbook.', 'Month project «price watcher»: a scraper for product pages you are allowed to scrape (or an official API) every hour, Postgres with history, an API with JWT and an API key for n8n, Slack and Telegram alerts with buttons when a price changes by more than 10%, a daily Google Sheets report, adapters and fakes, 25 tests, Docker, and a runbook.'),
      test: [
        Q(B('سكربت سيرفر وGoogle Sheets:', 'A server script and Google Sheets:'), [['service account', 'a service account'], ['كلمة سرك', 'your password'], ['ملف عام', 'a public file']], 0, B('حساب للبرنامج.', 'An account for the program.')),
        Q(B('Orders!A1:C3 اسمها:', 'Orders!A1:C3 is called:'), [['A1 notation', 'A1 notation'], ['JSON', 'JSON'], ['regex', 'a regex']], 0, B('نطاق.', 'A range.')),
        Q(B('الشيت كمصدر وحيد لملايين الصفوف:', 'A sheet as the only store for millions of rows:'), [['فكرة وحشة؛ Postgres المصدر', 'a bad idea; Postgres is the source'], ['ممتاز', 'excellent'], ['إجباري', 'required']], 0, B('عرض بس.', 'Display only.')),
        Q(B('توقيع Slack بيتعمل على:', 'The Slack signature covers:'), [['v0:timestamp:body', 'v0:timestamp:body'], ['الـ URL بس', 'only the URL'], ['اسم المستخدم', 'the user name']], 0, B('HMAC-SHA256.', 'HMAC-SHA256.')),
        Q(B('مدة الرد على slash command:', 'Time to answer a slash command:'), [['3 ثواني', '3 seconds'], ['دقيقة', 'a minute'], ['مفيش حد', 'no limit']], 0, B('ack فوري.', 'Immediate ack.')),
        Q(B('Block Kit:', 'Block Kit is:'), [['رسايل غنية بأقسام وأزرار', 'rich messages with sections and buttons'], ['قاعدة بيانات', 'a database'], ['لغة برمجة', 'a programming language']], 0, B('Slack.', 'Slack.')),
        Q(B('Telegram webhook آمن:', 'A safe Telegram webhook:'), [['secret_token في header', 'a secret_token in a header'], ['أي طلب مقبول', 'any request accepted'], ['التوكن في الرابط العام', 'the token in a public URL']], 0, B('webhook secret.', 'Webhook secret.')),
        Q(B('callback_data:', 'callback_data is:'), [['معرّف قصير ≤ 64 بايت', 'a short id ≤ 64 bytes'], ['ملف', 'a file'], ['صورة', 'an image']], 0, B('حد.', 'A limit.')),
        Q(B('ضغط الزرار مرتين:', 'A button pressed twice:'), [['تنفيذ مرة واحدة', 'act only once'], ['تنفيذ مرتين', 'act twice'], ['خطأ 500', 'a 500 error']], 0, B('idempotent.', 'Idempotent.')),
        Q(B('SecretStr:', 'SecretStr:'), [['يخفي السر في الطباعة واللوج', 'hides the secret in prints and logs'], ['يشفّر القاعدة', 'encrypts the database'], ['يسرّع', 'speeds things up']], 0, B('أمان.', 'Safety.')),
        Q(B('fake client في الاختبار:', 'A fake client in tests:'), [['يسجّل بدل ما يبعت', 'records instead of sending'], ['يبعت لـ Slack', 'sends to Slack'], ['يمسح البيانات', 'deletes data']], 0, B('من غير إنترنت.', 'Offline.')),
        Q(B('runbook:', 'A runbook:'), [['خطوات حل المشاكل', 'steps to fix incidents'], ['خطة تسويق', 'a marketing plan'], ['قايمة أسعار', 'a price list']], 0, B('للتشغيل.', 'For operations.'))
      ] }
  ]
};
