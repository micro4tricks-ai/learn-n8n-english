// Python week 20 — Charts, reports, scheduling and the month project.
const B = (ar, en) => ({ ar, en });
const SALES = 'import pandas as pd\nsales = pd.DataFrame({"branch": ["Cairo", "Alexandria", "Giza", "Mansoura", "Aswan"], "revenue": [128500, 77300, 40210, 21900, 9800]})\n';
module.exports = {
  level: B('متقدم', 'Advanced'),
  title: B('الرسوم والتقارير والجدولة ومشروع الشهر', 'Charts, reports, scheduling and the month project'),
  goal: B('ترسم رسوم بيانية واضحة بـ matplotlib وpandas تحطها في التقارير والإيميلات، وتتعامل مع التواريخ والتوقيتات صح، وتحوّل سكربتك لأداة سطر أوامر بـ argparse، وتخليه يشتغل لوحده في مواعيد (cron وTask Scheduler وn8n) — وتجمعهم في مشروع الشهر الخامس: التقرير الشهري الأوتوماتيك.',
          'Draw clear charts with matplotlib and pandas for reports and emails, handle dates and time zones correctly, turn a script into a command-line tool with argparse, and make it run by itself on a schedule (cron, Task Scheduler and n8n) — then combine them into the month 5 project: the automatic monthly report.'),
  days: [
    { title: B('matplotlib: أول رسم بياني', 'matplotlib: a first chart'),
      goal: B('ترسم bar وline بعناوين وتسميات، وتحفظها PNG، وتعرف إزاي تتعامل مع العربي في الرسوم.', 'Draw bar and line charts with titles and labels, save them as PNG, and know how to handle Arabic in charts.'),
      learn: [
        { h: B('figure وaxes وsavefig', 'figure, axes and savefig'),
          p: B('`fig, ax = plt.subplots(figsize=(7, 4))` بيعمل لوحة (figure) فيها رسم (axes). `ax.bar(x, y)` أعمدة، و`ax.plot(x, y)` خط. `ax.set_title` و`set_xlabel` و`set_ylabel`، و`fig.tight_layout()` يظبط المسافات، و`fig.savefig("chart.png", dpi=150)` يحفظ. هنا في الصفحة الصورة اللي اتحفظت بتظهر تحت الكود.', '`fig, ax = plt.subplots(figsize=(7, 4))` makes a canvas (figure) holding a chart (axes). `ax.bar(x, y)` draws bars and `ax.plot(x, y)` a line. `ax.set_title`, `set_xlabel` and `set_ylabel` label it, `fig.tight_layout()` fixes the spacing, and `fig.savefig("chart.png", dpi=150)` saves it. On this page the saved image appears under the code.'),
          ex: 'import matplotlib.pyplot as plt\nbranches = ["Cairo", "Alexandria", "Giza", "Mansoura"]\nrevenue = [128500, 77300, 40210, 21900]\nfig, ax = plt.subplots(figsize=(7, 4))\nax.bar(branches, revenue, color="#3f8f63")\nax.set_title("Revenue by branch — September 2026")\nax.set_ylabel("EGP")\nfig.tight_layout()\nfig.savefig("revenue.png", dpi=120)\nprint("saved revenue.png")', run: 1 },
        { h: B('خط بالتواريخ', 'A line over dates'),
          p: B('للبيانات اللي بتتغير مع الوقت استخدم خط. حط علامات على النقط (`marker="o"`)، وشبكة خفيفة (`ax.grid(alpha=.3)`)، ومتخليش المحور يبدأ من رقم غريب يضخّم الفرق. وأكتر من خط: نادي `plot` كذا مرة بـ `label=` و`ax.legend()`.', 'For data that changes over time use a line. Mark the points (`marker="o"`), add a faint grid (`ax.grid(alpha=.3)`), and do not start the axis at an odd number that exaggerates differences. For several lines call `plot` several times with `label=` and `ax.legend()`.'),
          ex: 'import matplotlib.pyplot as plt\nmonths = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"]\ncairo = [98, 104, 110, 101, 119, 128]\nalex = [61, 64, 70, 72, 75, 77]\nfig, ax = plt.subplots(figsize=(7, 3.5))\nax.plot(months, cairo, marker="o", label="Cairo")\nax.plot(months, alex, marker="o", label="Alexandria")\nax.set_ylim(0, 140)\nax.set_ylabel("revenue (thousand EGP)")\nax.grid(alpha=0.3)\nax.legend()\nfig.tight_layout()\nfig.savefig("trend.png", dpi=120)\nprint("saved trend.png")', run: 1 },
        { h: B('العربي في الرسوم', 'Arabic in charts'),
          p: B('matplotlib بيرسم الحروف العربي منفصلة ومن الشمال لليمين. الحلول: (1) خلي التسميات إنجليزي في الرسم والشرح عربي حواليه (الأسهل والأوضح في التقارير). (2) أو `arabic-reshaper` و`python-bidi` يجهّزوا النص قبل الرسم، مع خط بيدعم العربي (زي Amiri أو Noto Naskh). (3) أو ارسم في المتصفح بـ Chart.js (أسبوع 15) اللي بيدعم العربي لوحده.', 'matplotlib draws Arabic letters unjoined and left to right. Options: (1) keep chart labels in English with the Arabic explanation around them (simplest and clearest in reports). (2) Or prepare the text with `arabic-reshaper` and `python-bidi` before drawing, using a font that supports Arabic (such as Amiri or Noto Naskh). (3) Or draw in the browser with Chart.js (week 15), which handles Arabic by itself.'),
          ex: '# pip install matplotlib arabic-reshaper python-bidi   (+ an Arabic font file)\nimport arabic_reshaper\nfrom bidi.algorithm import get_display\nimport matplotlib.pyplot as plt\nfrom matplotlib import font_manager\n\nfont_manager.fontManager.addfont("Amiri-Regular.ttf")\nplt.rcParams["font.family"] = "Amiri"\nar = lambda text: get_display(arabic_reshaper.reshape(text))\nfig, ax = plt.subplots()\nax.bar([ar("القاهرة"), ar("الجيزة")], [128500, 40210])\nax.set_title(ar("الإيراد حسب الفرع"))\nfig.savefig("revenue_ar.png", dpi=150)' }
      ],
      practice: [
        B('ارسم bar لمبيعات 5 فروع، مترتبة من الأكبر، بعنوان وتسمية للمحور.', 'Draw a bar chart of 5 branches’ sales, sorted from the largest, with a title and an axis label.'),
        B('ارسم خط لإيراد 6 شهور لفرعين بـ legend.', 'Draw a line chart of 6 months of revenue for two branches with a legend.'),
        B('احفظ نفس الرسم بـ dpi=72 و200 وقارن الحجم والوضوح.', 'Save the same chart at dpi=72 and 200 and compare size and sharpness.'),
        B('جرّب كتابة تسمية عربي من غير reshaper وشوف المشكلة.', 'Try an Arabic label without the reshaper and see the problem.')
      ],
      code: [
        { u: B('دالة رسم أعمدة جاهزة', 'A ready bar-chart function'), p: 'import matplotlib.pyplot as plt\n\ndef bar_chart(labels, values, title, path, color="#3f8f63"):\n    pairs = sorted(zip(labels, values), key=lambda p: p[1])\n    fig, ax = plt.subplots(figsize=(7, 0.5 * len(pairs) + 1.2))\n    bars = ax.barh([p[0] for p in pairs], [p[1] for p in pairs], color=color)\n    ax.bar_label(bars, labels=[f"{v:,.0f}" for _, v in pairs], padding=4)\n    ax.set_title(title, loc="left")\n    for side in ("top", "right"):\n        ax.spines[side].set_visible(False)\n    fig.tight_layout()\n    fig.savefig(path, dpi=130)\n    plt.close(fig)\n    return path\n\nprint(bar_chart(["Pen", "Bag", "Notebook", "Sleeve"], [1350, 9100, 1440, 960], "Revenue by product", "products.png"))', run: 1 }
      ],
      words: [
        { t: 'matplotlib', m: B('مكتبة الرسوم البيانية الأساسية في Python', 'Python’s core charting library'), ex: 'import matplotlib.pyplot as plt' },
        { t: 'figure', m: B('اللوحة اللي الرسم بيتعمل عليها', 'the canvas a chart is drawn on'), ex: 'fig, ax = plt.subplots()' },
        { t: 'axes', m: B('الرسم نفسه بمحاوره جوه الـ figure', 'the chart itself with its axes, inside the figure'), ex: 'ax.bar(x, y)' },
        { t: 'savefig', m: B('بتحفظ الرسم صورة', 'saves the chart as an image'), ex: 'fig.savefig("chart.png", dpi=150)' },
        { t: 'legend', m: B('المفتاح اللي بيقول كل لون يعني إيه', 'the key telling what each colour means'), ex: 'ax.legend()' },
        { t: 'dpi', m: B('نقط في البوصة: دقة الصورة', 'dots per inch: the image resolution'), ex: 'dpi=150' },
        { t: 'axis label', m: B('اسم المحور ووحدته', 'an axis’s name and unit'), ex: 'ax.set_ylabel("EGP")' }
      ],
      read: [{ lib: 'Matplotlib: Quick start guide', what: B('الصفحة كلها.', 'The whole page.') }, { lib: 'Python Data Science Handbook', what: B('الفصل 4: Simple Line Plots وSimple Bar Plots.', 'Chapter 4: Simple Line Plots and bar plots.') }],
      challenge: B('اعمل 3 رسوم لمشروع التحليل (أسبوع 19): إيراد الفروع (أعمدة أفقية مترتبة بالقيم عليها)، والإيراد الشهري (خط)، ونسبة الفئات (أعمدة نسب بدل pie) — بألوان موحدة ومحفوظين في `charts/`.', 'Make 3 charts for the analysis project (week 19): branch revenue (sorted horizontal bars with values), monthly revenue (a line) and category shares (percentage bars instead of a pie) — in consistent colours, saved in `charts/`.'),
      quiz: [
        { q: B('عشان تحفظ الرسم صورة:', 'To save a chart as an image:'), o: ['fig.savefig("a.png")', 'plt.show()', 'ax.save()'], a: 0, why: B('show بيعرض بس.', 'show only displays.') },
        { q: B('بيانات بتتغير مع الشهور، الأنسب:', 'Data changing over months is best shown as:'), o: [B('خط', 'a line'), B('pie', 'a pie'), B('جدول بس', 'only a table')], a: 0, why: B('الاتجاه مع الوقت.', 'A trend over time.') },
        { q: B('العربي في matplotlib بيطلع منفصل. حل:', 'Arabic in matplotlib comes out unjoined. A fix:'), o: ['arabic-reshaper + python-bidi', 'dpi=300', 'plt.close()'], a: 0, why: B('بيوصّل الحروف ويظبط الاتجاه.', 'They join the letters and fix the direction.') }
      ] },

    { title: B('رسوم pandas والتصميم الواضح', 'pandas charts and clear design'),
      goal: B('ترسم من DataFrame مباشرة، وتختار نوع الرسم الصح، وتكتب القيم على الأعمدة، وتعمل لوحة من كذا رسم، وتحط الرسم في تقرير HTML وإيميل.', 'Plot straight from a DataFrame, choose the right chart type, write values on bars, build a panel of several charts, and put a chart into an HTML report and an email.'),
      learn: [
        { h: B('df.plot', 'df.plot'),
          p: B('`sales.plot.barh(x="branch", y="revenue")` بيرسم من DataFrame في سطر ويرجّع axes تكمّل عليه. و`series.plot()` لخط من بيانات زمنية. رتّب البيانات **قبل** الرسم (الأعمدة المترتبة أسهل تتقري بكتير).', '`sales.plot.barh(x="branch", y="revenue")` draws from a DataFrame in one line and returns axes you can keep editing. `series.plot()` draws a line from time data. Sort the data **before** plotting (sorted bars are far easier to read).'),
          ex: SALES + 'import matplotlib.pyplot as plt\nax = sales.sort_values("revenue").plot.barh(x="branch", y="revenue", legend=False, color="#3f8f63", figsize=(6, 3))\nax.set_xlabel("EGP")\nax.set_ylabel("")\nax.bar_label(ax.containers[0], fmt="{:,.0f}", padding=3)\nplt.tight_layout()\nplt.savefig("branches.png", dpi=120)\nprint("saved branches.png")', run: 1 },
        { h: B('اختار الرسم الصح', 'Choose the right chart'),
          p: B('مقارنة فئات → أعمدة (أفقية لو الأسماء طويلة). تغيّر مع الوقت → خط. أجزاء من كل → أعمدة نسب (الـ pie صعب يتقارن فيه أكتر من 3 أجزاء). علاقة بين رقمين → scatter. القواعد: عنوان بيقول الخلاصة («القاهرة 52% من الإيراد»)، ومحور يبدأ من صفر للأعمدة، وألوان قليلة، والرقم المهم مكتوب.', 'Comparing categories → bars (horizontal when names are long). Change over time → a line. Parts of a whole → percentage bars (pies are hard to compare beyond 3 parts). A relation between two numbers → a scatter. Rules: a title stating the takeaway («Cairo is 52% of revenue»), a bar axis starting at zero, few colours, and the key number written on the chart.'),
          ex: SALES + 'import matplotlib.pyplot as plt\nshare = (sales.set_index("branch")["revenue"] / sales["revenue"].sum() * 100).sort_values()\nfig, ax = plt.subplots(figsize=(6, 3))\nbars = ax.barh(share.index, share.values, color=["#b9d6c4"] * (len(share) - 1) + ["#3f8f63"])\nax.bar_label(bars, fmt="%.0f%%", padding=3)\nax.set_title(f"{share.idxmax()} is {share.max():.0f}% of revenue", loc="left", fontweight="bold")\nax.set_xlim(0, 100)\nax.spines[["top", "right"]].set_visible(False)\nfig.tight_layout()\nfig.savefig("share.png", dpi=120)\nprint("saved share.png")', run: 1 },
        { h: B('لوحة رسوم، وفي HTML وإيميل', 'A panel of charts, in HTML and email'),
          p: B('`fig, axes = plt.subplots(1, 2, figsize=(10, 4))` رسمين جنب بعض. وعشان تحط الرسم في تقرير HTML (أسبوع 14) أو إيميل من غير ملف منفصل: احفظه في الذاكرة (`io.BytesIO`) وحوّله base64 وحطه في `<img src="data:image/png;base64,...">`. للإيميل الأحسن تبعته كمرفق مضمّن (cid) لأن بعض برامج الإيميل بتمنع data URLs.', '`fig, axes = plt.subplots(1, 2, figsize=(10, 4))` puts two charts side by side. To place a chart in an HTML report (week 14) or an email without a separate file: save it to memory (`io.BytesIO`), turn it into base64 and use `<img src="data:image/png;base64,...">`. For email, attaching it inline (cid) is better because some mail programs block data URLs.'),
          ex: 'import base64, io\nimport matplotlib.pyplot as plt\nfig, (left, right) = plt.subplots(1, 2, figsize=(9, 3.2))\nleft.bar(["Cairo", "Giza", "Alex"], [128, 40, 77], color="#3f8f63"); left.set_title("Revenue (k EGP)")\nright.plot(["Jul", "Aug", "Sep"], [210, 232, 245], marker="o"); right.set_title("Monthly total"); right.set_ylim(0, 300)\nfig.tight_layout()\nfig.savefig("panel.png", dpi=110)\nbuf = io.BytesIO()\nfig.savefig(buf, format="png", dpi=110)\nimg = base64.b64encode(buf.getvalue()).decode()\nhtml = f\'<h2>September report</h2><img alt="Revenue charts" src="data:image/png;base64,{img}">\'\nprint(len(html), "characters of HTML, image inside")', run: 1 }
      ],
      practice: [
        B('ارسم 3 رسوم من DataFrame التحليل بـ df.plot.', 'Draw 3 charts from the analysis DataFrame with df.plot.'),
        B('خد رسم عندك وحسّنه بالقواعد: ترتيب، وعنوان بالخلاصة، وقيم مكتوبة، ولون مميز للأهم.', 'Take one of your charts and improve it with the rules: sorting, a takeaway title, written values, and a highlight colour for the key item.'),
        B('اعمل لوحة 2×2 من 4 رسوم واحفظها.', 'Build a 2×2 panel of 4 charts and save it.'),
        B('حط رسم في تقرير HTML (أسبوع 14) كـ base64 وافتحه في المتصفح.', 'Put a chart into the HTML report (week 14) as base64 and open it in the browser.')
      ],
      code: [
        { u: B('صورة مضمّنة في إيميل (cid)', 'An inline image in an email (cid)'), p: 'from email.message import EmailMessage\nfrom email.utils import make_msgid\nfrom pathlib import Path\n\ndef report_email(to: str, chart: Path) -> EmailMessage:\n    msg = EmailMessage()\n    msg["To"], msg["Subject"] = to, "September report"\n    msg.set_content("Your mail program cannot show HTML. The chart is attached.")\n    cid = make_msgid(domain="report.local")\n    msg.add_alternative(f\'<p>Revenue by branch:</p><img alt="chart" src="cid:{cid[1:-1]}" width="600">\', subtype="html")\n    msg.get_payload()[1].add_related(chart.read_bytes(), "image", "png", cid=cid)\n    return msg' }
      ],
      words: [
        { t: 'df.plot', m: B('رسم مباشر من DataFrame أو Series', 'plotting straight from a DataFrame or Series'), ex: 'df.plot.barh(x="branch", y="revenue")' },
        { t: 'bar label', m: B('القيمة مكتوبة على العمود', 'the value written on a bar'), ex: 'ax.bar_label(bars)' },
        { t: 'subplots', m: B('أكتر من رسم في لوحة واحدة', 'several charts in one figure'), ex: 'plt.subplots(1, 2)' },
        { t: 'scatter plot', m: B('رسم نقط يوضح العلاقة بين رقمين', 'a dot chart showing the relation between two numbers'), ex: 'ax.scatter(price, qty)' },
        { t: 'base64', m: B('تحويل بايتات (زي صورة) لنص', 'turning bytes (like an image) into text'), ex: 'data:image/png;base64,…' },
        { t: 'takeaway title', m: B('عنوان بيقول الخلاصة مش اسم البيانات', 'a title stating the conclusion, not the data’s name'), ex: '"Cairo is 52% of revenue"' }
      ],
      read: [{ lib: 'Matplotlib: Quick start guide', what: B('جزء Coding styles وMultiple Axes.', 'The Coding styles and multiple Axes parts.') }, { lib: 'pandas: Getting started', what: B('How to create plots in pandas?', 'How to create plots in pandas?') }],
      challenge: B('اعمل `charts.py` فيه 4 دوال رسم بنفس الشكل والألوان (أعمدة مترتبة، خط زمني، نسب، لوحة) بترجّع مسار الصورة، وتقرير HTML بيحط الـ 4 صور base64 مع جملة خلاصة تحت كل رسم.', 'Write `charts.py` with 4 chart functions sharing one look and palette (sorted bars, a time line, shares, a panel) that return the image path, plus an HTML report embedding the 4 images as base64 with a takeaway sentence under each.'),
      quiz: [
        { q: B('أنسب رسم لمقارنة 8 فروع بأسماء طويلة:', 'The best chart to compare 8 branches with long names:'), o: [B('أعمدة أفقية مترتبة', 'sorted horizontal bars'), B('pie', 'a pie'), B('خط', 'a line')], a: 0, why: B('سهل القراية.', 'Easy to read.') },
        { q: B('عنوان رسم أحسن:', 'A better chart title:'), o: ['"Cairo is 52% of revenue"', '"Chart 1"', '"Revenue data"'], a: 0, why: B('بيقول الخلاصة.', 'It states the takeaway.') },
        { q: B('صورة جوه HTML من غير ملف منفصل:', 'An image inside HTML with no separate file:'), o: ['data:image/png;base64,…', 'file://chart.png', '<chart>'], a: 0, why: B('base64.', 'base64.') }
      ] },

    { title: B('التواريخ والتوقيتات صح', 'Dates and time zones done right'),
      goal: B('تتعامل مع datetime وtimedelta، وتوقيت القاهرة بـ zoneinfo، وتنسيق وتحليل التواريخ، وحسابات التقارير زي «الشهر اللي فات» وأيام الشغل.', 'Work with datetime and timedelta, Cairo time with zoneinfo, formatting and parsing dates, and report arithmetic such as «last month» and working days.'),
      learn: [
        { h: B('datetime وtimedelta', 'datetime and timedelta'),
          p: B('`date.today()` و`datetime.now()`، و`timedelta(days=7)` مدة تجمعها أو تطرحها، والفرق بين تاريخين timedelta (`.days` و`.total_seconds()`). `strftime("%Y-%m-%d %H:%M")` تنسيق، و`date.fromisoformat("2026-09-30")` و`strptime` قراية (أسبوع 11).', '`date.today()` and `datetime.now()`, `timedelta(days=7)` is a duration to add or subtract, and the difference of two dates is a timedelta (`.days`, `.total_seconds()`). `strftime("%Y-%m-%d %H:%M")` formats, and `date.fromisoformat("2026-09-30")` and `strptime` parse (week 11).'),
          ex: 'from datetime import date, datetime, timedelta\ninvoice_day = date(2026, 9, 15)\ndue = invoice_day + timedelta(days=30)\nprint("due:", due, due.strftime("%A %d %B %Y"))\nlate = date(2026, 10, 20) - due\nprint("late by", late.days, "days")\nstart = datetime(2026, 10, 1, 8, 0)\nprint((start + timedelta(hours=36, minutes=15)).isoformat())', run: 1 },
        { h: B('التوقيتات', 'Time zones'),
          p: B('datetime من غير توقيت («naive») خطر: السيرفر ممكن يكون UTC وانت في القاهرة. استخدم «aware»: `datetime.now(ZoneInfo("Africa/Cairo"))`، وخزّن في القاعدة UTC، وحوّل للعرض بـ `.astimezone(...)`. ده نفس `GENERIC_TIMEZONE` في n8n — لو مختلف، الجدولة بتشتغل في ساعة غلط.', 'A datetime without a zone («naive») is risky: the server may run in UTC while you are in Cairo. Use «aware» ones: `datetime.now(ZoneInfo("Africa/Cairo"))`, store UTC in the database, and convert for display with `.astimezone(...)`. It is the same idea as `GENERIC_TIMEZONE` in n8n — if it differs, schedules fire at the wrong hour.'),
          ex: 'from datetime import datetime, timezone\nfrom zoneinfo import ZoneInfo\ncairo = ZoneInfo("Africa/Cairo")\nmeeting = datetime(2026, 10, 1, 15, 0, tzinfo=cairo)\nprint("Cairo:", meeting.isoformat())\nprint("UTC:  ", meeting.astimezone(timezone.utc).isoformat())\nprint("Dubai:", meeting.astimezone(ZoneInfo("Asia/Dubai")).strftime("%H:%M"))\nnaive = datetime(2026, 10, 1, 15, 0)\nprint("naive has no zone:", naive.tzinfo)', run: 1 },
        { h: B('حسابات التقارير', 'Report arithmetic'),
          p: B('التقارير دايمًا محتاجة فترات: «الشهر اللي فات» (أول يوم وآخر يوم)، «الأسبوع ده»، «آخر 30 يوم»، «أيام الشغل» (من غير الجمعة والسبت مثلًا). اكتبهم دوال صغيرة باختبارات — أخطاء آخر الشهر والسنة الكبيسة أشهر bugs في التقارير.', 'Reports always need periods: «last month» (first and last day), «this week», «the last 30 days», «working days» (without Friday and Saturday, say). Write them as small tested functions — month-end and leap-year mistakes are the commonest report bugs.'),
          ex: 'from datetime import date, timedelta\n\ndef last_month(today: date) -> tuple[date, date]:\n    first_this = today.replace(day=1)\n    last_prev = first_this - timedelta(days=1)\n    return last_prev.replace(day=1), last_prev\n\ndef working_days(start: date, end: date, weekend=(4, 5)) -> int:   # Friday=4, Saturday=5\n    return sum(1 for n in range((end - start).days + 1) if (start + timedelta(n)).weekday() not in weekend)\n\nprint(last_month(date(2026, 10, 1)))\nprint(last_month(date(2026, 3, 15)))     # February in a non-leap year\nprint(working_days(date(2026, 9, 1), date(2026, 9, 30)), "working days in September")\nassert last_month(date(2028, 3, 1)) == (date(2028, 2, 1), date(2028, 2, 29))   # leap year', run: 1 }
      ],
      practice: [
        B('احسب تاريخ الاستحقاق لـ 5 فواتير (+30 يوم) وكام يوم متأخرين النهارده.', 'Compute due dates for 5 invoices (+30 days) and how many days late they are today.'),
        B('اطبع الساعة دلوقتي في القاهرة وUTC ودبي ولندن.', 'Print the time now in Cairo, UTC, Dubai and London.'),
        B('اكتب `this_week(today)` و`last_n_days(today, n)` بـ 4 assert.', 'Write `this_week(today)` and `last_n_days(today, n)` with 4 asserts.'),
        B('اعرف كام يوم شغل فاضل في الشهر ده.', 'Find how many working days are left this month.')
      ],
      code: [
        { u: B('فلترة DataFrame بالشهر اللي فات', 'Filtering a DataFrame to last month'), p: 'import pandas as pd\nfrom datetime import date, timedelta\ndf = pd.DataFrame({"day": pd.to_datetime(["2026-08-30", "2026-09-01", "2026-09-30", "2026-10-01"]), "total": [100, 200, 300, 400]})\ntoday = date(2026, 10, 1)\nend = today.replace(day=1) - timedelta(days=1)\nstart = end.replace(day=1)\nmask = df.day.between(pd.Timestamp(start), pd.Timestamp(end))\nprint(start, end, df[mask].total.sum())', run: 1 }
      ],
      words: [
        { t: 'timedelta', m: B('مدة زمنية تجمعها أو تطرحها من تاريخ', 'a duration added to or subtracted from a date'), ex: 'timedelta(days=30)' },
        { t: 'time zone', m: B('المنطقة الزمنية وفرقها عن UTC', 'the zone and its offset from UTC'), ex: 'Africa/Cairo' },
        { t: 'zoneinfo', m: B('موديول التوقيتات في Python', 'Python’s time-zone module'), ex: 'ZoneInfo("Africa/Cairo")' },
        { t: 'UTC', m: B('التوقيت العالمي المرجعي', 'the reference world time'), ex: 'store timestamps in UTC' },
        { t: 'aware datetime', m: B('تاريخ ووقت معروف توقيته', 'a date-time with a known time zone'), ex: 'datetime.now(ZoneInfo("Africa/Cairo"))' },
        { t: 'naive datetime', m: B('تاريخ ووقت من غير توقيت؛ ملخبط', 'a date-time with no zone; ambiguous'), ex: 'datetime(2026, 10, 1, 15)' },
        { t: 'leap year', m: B('سنة فيها 29 فبراير', 'a year with 29 February'), ex: '2028' }
      ],
      read: [{ lib: 'datetime', what: B('اقرا Aware and Naive Objects وtimedelta Objects.', 'Read Aware and Naive Objects and timedelta Objects.') }, 'lib:zoneinfo'],
      challenge: B('اكتب `periods.py` فيه دوال: last_month وthis_month وlast_week وquarter_of وworking_days وis_month_end، و15 assert منهم حالات آخر السنة والكبيسة، واستخدمهم في مشروع التحليل عشان يختار فترة التقرير لوحده.', 'Write `periods.py` with last_month, this_month, last_week, quarter_of, working_days and is_month_end, plus 15 asserts including year-end and leap-year cases, and use them in the analysis project to pick the report period automatically.'),
      quiz: [
        { q: B('`date(2026, 3, 1) - timedelta(days=1)`:', '`date(2026, 3, 1) - timedelta(days=1)`:'), o: ['2026-02-28', '2026-02-29', '2026-03-00'], a: 0, why: B('2026 مش كبيسة.', '2026 is not a leap year.') },
        { q: B('أأمن حاجة تخزّنها في القاعدة:', 'The safest thing to store in a database:'), o: [B('وقت UTC', 'UTC time'), B('وقت محلي naive', 'naive local time'), B('نص بأي شكل', 'text in any shape')], a: 0, why: B('وحوّل للعرض.', 'Convert for display.') },
        { q: B('سكربت n8n بيشتغل ساعتين متأخر. الغالب:', 'An n8n schedule runs two hours late. Most likely:'), o: [B('التوقيت (timezone) مش مظبوط', 'the time zone is not set'), B('السيرفر بطيء', 'the server is slow'), B('cron غلط دايمًا', 'cron is always wrong')], a: 0, why: B('GENERIC_TIMEZONE.', 'GENERIC_TIMEZONE.') }
      ] },

    { title: B('أدوات سطر الأوامر بـ argparse', 'Command-line tools with argparse'),
      goal: B('تحوّل سكربتك لأداة بخيارات ومساعدة تلقائية بـ argparse: معاملات إجبارية واختيارية وقيم افتراضية وأوامر فرعية و--dry-run، عشان الجدولة وغيرك يشغّلوها بسهولة.', 'Turn your script into a tool with options and automatic help using argparse: required and optional arguments, defaults, subcommands and --dry-run, so schedulers and others can run it easily.'),
      learn: [
        { h: B('أول parser', 'A first parser'),
          p: B('`parser = argparse.ArgumentParser(description=...)`، و`add_argument("month")` معامل إجباري بالترتيب، و`add_argument("--out", default="reports")` اختياري، و`--dry-run` بـ `action="store_true"` (علم من غير قيمة)، و`type=int` بيحوّل. `parser.parse_args()` بيقرا sys.argv، و`-h` بيطلّع مساعدة لوحده. هنا بنديله قايمة بدل الطرفية عشان يشتغل في الصفحة.', '`parser = argparse.ArgumentParser(description=...)`, `add_argument("month")` is a required positional argument, `add_argument("--out", default="reports")` an optional one, `--dry-run` with `action="store_true"` a flag with no value, and `type=int` converts. `parser.parse_args()` reads sys.argv and `-h` prints help by itself. Here we pass a list instead of the terminal so it runs on the page.'),
          ex: 'import argparse\nparser = argparse.ArgumentParser(prog="report", description="Build the monthly sales report.")\nparser.add_argument("month", help="the month to report, like 2026-09")\nparser.add_argument("--out", default="reports", help="output folder (default: %(default)s)")\nparser.add_argument("--top", type=int, default=5, help="how many top products")\nparser.add_argument("--dry-run", action="store_true", help="show what would happen, change nothing")\nargs = parser.parse_args(["2026-09", "--top", "3", "--dry-run"])\nprint(args)\nprint(args.month, args.out, args.top, args.dry_run)\nparser.print_help()', run: 1 },
        { h: B('التحقق والاختيارات', 'Validation and choices'),
          p: B('`choices=["csv", "xlsx", "json"]` بيقبل قيم محددة، و`type=` ممكن تبقى دالتك انت بتتحقق وترفض بـ `argparse.ArgumentTypeError` (زي شكل الشهر). argparse بيطبع الخطأ والمساعدة ويخرج بكود 2 لوحده — مفيش داعي تكتب if كتير.', '`choices=["csv", "xlsx", "json"]` accepts only given values, and `type=` can be your own function that validates and rejects with `argparse.ArgumentTypeError` (like a month’s format). argparse prints the error and the usage and exits with code 2 by itself — no need for lots of ifs.'),
          ex: 'import argparse, re\n\ndef month(text):\n    if not re.fullmatch(r"\\d{4}-(0[1-9]|1[0-2])", text):\n        raise argparse.ArgumentTypeError(f"{text!r} is not a month like 2026-09")\n    return text\n\np = argparse.ArgumentParser(prog="report", exit_on_error=False)\np.add_argument("month", type=month)\np.add_argument("--format", choices=["csv", "xlsx", "json"], default="xlsx")\nprint(p.parse_args(["2026-09", "--format", "json"]))\nfor bad in (["2026-13"], ["2026-09", "--format", "pdf"]):\n    try:\n        p.parse_args(bad)\n    except argparse.ArgumentError as e:\n        print("rejected:", e)', run: 1 },
        { h: B('أوامر فرعية', 'Subcommands'),
          p: B('زي `git commit` و`git push`: `sub = parser.add_subparsers(dest="cmd", required=True)` وكل أمر ليه parser بمعاملاته (`build` و`send` و`clean`)، و`set_defaults(func=...)` بيربط كل أمر بدالته. ده الشكل الاحترافي لأداة بتعمل أكتر من حاجة.', 'Like `git commit` and `git push`: `sub = parser.add_subparsers(dest="cmd", required=True)`, each command with its own parser and arguments (`build`, `send`, `clean`), and `set_defaults(func=...)` linking each command to its function. The professional shape for a tool that does several things.'),
          ex: 'import argparse\n\ndef build(args):\n    print(f"building {args.month} into {args.out}")\n\ndef send(args):\n    print(f"sending {args.month} to {\', \'.join(args.to)}" + (" (dry run)" if args.dry_run else ""))\n\nparser = argparse.ArgumentParser(prog="report")\nsub = parser.add_subparsers(dest="cmd", required=True)\nb = sub.add_parser("build", help="make the files")\nb.add_argument("month"); b.add_argument("--out", default="reports")\nb.set_defaults(func=build)\ns = sub.add_parser("send", help="email the report")\ns.add_argument("month"); s.add_argument("--to", nargs="+", required=True); s.add_argument("--dry-run", action="store_true")\ns.set_defaults(func=send)\nfor argv in (["build", "2026-09"], ["send", "2026-09", "--to", "boss@x.com", "me@x.com", "--dry-run"]):\n    args = parser.parse_args(argv)\n    args.func(args)', run: 1 }
      ],
      practice: [
        B('حوّل `clean_downloads.py` (أسبوع 9) لـ argparse بـ `folder` و`--apply` و`--log`.', 'Convert `clean_downloads.py` (week 9) to argparse with `folder`, `--apply` and `--log`.'),
        B('شغّل `python tool.py -h` واقرا المساعدة اللي اتعملت لوحدها.', 'Run `python tool.py -h` and read the help written for you.'),
        B('اعمل type بيتحقق من مسار فولدر موجود.', 'Write a type that checks a folder path exists.'),
        B('اعمل أداة بأمرين فرعيين (`stats` و`export`).', 'Build a tool with two subcommands (`stats` and `export`).')
      ],
      code: [
        { u: B('هيكل أداة كاملة', 'A complete tool skeleton'), p: '"""report.py — usage: python report.py build 2026-09 --out reports [--dry-run]"""\nimport argparse, logging, sys\n\nlog = logging.getLogger("report")\n\ndef cmd_build(args) -> int:\n    log.info("building %s (dry run: %s)", args.month, args.dry_run)\n    return 0\n\ndef main(argv=None) -> int:\n    p = argparse.ArgumentParser(prog="report", description="Monthly sales report")\n    p.add_argument("-v", "--verbose", action="store_true")\n    sub = p.add_subparsers(dest="cmd", required=True)\n    b = sub.add_parser("build"); b.add_argument("month"); b.add_argument("--out", default="reports"); b.add_argument("--dry-run", action="store_true")\n    b.set_defaults(func=cmd_build)\n    args = p.parse_args(argv)\n    logging.basicConfig(level=logging.DEBUG if args.verbose else logging.INFO, format="%(asctime)s %(levelname)s %(message)s")\n    return args.func(args)\n\nif __name__ == "__main__":\n    sys.exit(main())' }
      ],
      words: [
        { t: 'argparse', m: B('موديول بيحوّل سكربت لأداة سطر أوامر بخيارات ومساعدة', 'a module turning a script into a command-line tool with options and help'), ex: 'argparse.ArgumentParser()' },
        { t: 'positional argument', m: B('معامل إجباري بيتكتب بالترتيب', 'a required argument given by position'), ex: 'report 2026-09' },
        { t: 'optional argument', m: B('خيار بيبدأ بـ -- وليه قيمة افتراضية', 'an option starting with -- with a default'), ex: '--out reports' },
        { t: 'flag', m: B('خيار من غير قيمة: موجود = True', 'an option with no value: present means True'), ex: '--dry-run' },
        { t: 'subcommand', m: B('أمر فرعي جوه الأداة بمعاملاته', 'a command inside a tool with its own arguments'), ex: 'report build / report send' },
        { t: 'usage message', m: B('رسالة طريقة الاستخدام اللي -h بتطلعها', 'the how-to-use text printed by -h'), ex: 'python report.py -h' }
      ],
      read: ['lib:argparse Tutorial', { lib: 'Real Python Tutorials', what: B('دوّر على «argparse» واقرا جزء subparsers.', 'Search for «argparse» and read the subparsers part.') }],
      challenge: B('حوّل مشروع التحليل (أسبوع 19) لأداة `sales` بأوامر: `clean` و`analyze --month 2026-09` و`charts` و`report --format xlsx|html` و`all`، كل واحد بيرجّع كود خروج صح، و`--dry-run` و`-v` عامين.', 'Turn the analysis project (week 19) into a `sales` tool with commands: `clean`, `analyze --month 2026-09`, `charts`, `report --format xlsx|html` and `all`, each returning the right exit code, with global `--dry-run` and `-v`.'),
      quiz: [
        { q: B('`--dry-run` بـ `action="store_true"`:', '`--dry-run` with `action="store_true"`:'), o: [B('لو اتكتب قيمته True', 'is True when given'), B('محتاج قيمة', 'needs a value'), B('بيطبع المساعدة', 'prints help')], a: 0, why: B('flag.', 'A flag.') },
        { q: B('المساعدة في argparse:', 'Help in argparse:'), o: [B('-h بيطلّعها لوحده', '-h prints it automatically'), B('لازم تكتبها بنفسك', 'you must write it yourself'), B('مش موجودة', 'does not exist')], a: 0, why: B('من help= لكل معامل.', 'From each argument’s help=.') },
        { q: B('قيمة مش من choices:', 'A value not in choices:'), o: [B('argparse بيرفضها ويطبع السبب', 'argparse rejects it and prints why'), B('بتتقبل', 'is accepted'), B('بتبقى None', 'becomes None')], a: 0, why: B('تحقق تلقائي.', 'Automatic validation.') }
      ] },

    { title: B('الجدولة: يشتغل لوحده', 'Scheduling: it runs by itself'),
      goal: B('تخلي سكربتك يشتغل في مواعيد بـ cron على Linux وTask Scheduler على Windows وSchedule Trigger في n8n، صح: بالـ venv والمسار الكامل واللوج وقفل يمنع تشغيلين مع بعض.', 'Make your script run on a schedule with cron on Linux, Task Scheduler on Windows and the n8n Schedule Trigger, correctly: with the venv, full paths, logging and a lock against two runs at once.'),
      learn: [
        { h: B('cron', 'cron'),
          p: B('على Linux أو السيرفر: `crontab -e` وسطر بـ 5 خانات (دقيقة ساعة يوم شهر يوم-الأسبوع) وبعدين الأمر. `0 8 1 * *` = الساعة 8 أول كل شهر. استخدم **مسارات كاملة** (cron مبيعرفش الفولدر بتاعك ولا الـ venv)، ووجّه الناتج لملف لوج، واتأكد من التوقيت بـ crontab.guru.', 'On Linux or a server: `crontab -e` and a line with 5 fields (minute hour day month weekday) followed by the command. `0 8 1 * *` = 8:00 on the first of every month. Use **full paths** (cron does not know your folder or venv), send the output to a log file, and check the timing with crontab.guru.'),
          ex: '# m  h  dom mon dow   command\n0  8  1   *   *     cd /home/me/sales && /home/me/sales/.venv/bin/python report.py all >> /home/me/sales/cron.log 2>&1\n*/30 9-18 * * 0-4    /home/me/watch/.venv/bin/python /home/me/watch/watch.py >> /home/me/watch/cron.log 2>&1\n0  2  *   *   *     /home/me/backup/.venv/bin/python /home/me/backup/backup.py\n\n# 0 8 1 * *      -> 08:00 on day 1 of every month\n# */30 9-18 * * 0-4 -> every 30 minutes, 09:00-18:59, Sunday to Thursday', lang: 'text' },
        { h: B('Task Scheduler على Windows', 'Task Scheduler on Windows'),
          p: B('من الواجهة: Create Task → Triggers (الميعاد) → Actions: Program = `C:\\...\\project\\.venv\\Scripts\\python.exe`، Arguments = `report.py all`، Start in = فولدر المشروع (مهم!). أو من الطرفية بـ `schtasks`. فعّل «Run whether user is logged on or not» لو عايزه يشتغل والجهاز مقفول القفل.', 'In the UI: Create Task → Triggers (the time) → Actions: Program = `C:\\...\\project\\.venv\\Scripts\\python.exe`, Arguments = `report.py all`, Start in = the project folder (important!). Or from the terminal with `schtasks`. Enable «Run whether user is logged on or not» to run while the screen is locked.'),
          ex: 'schtasks /Create /TN "SalesReport" /SC MONTHLY /D 1 /ST 08:00 ^\n  /TR "\\"C:\\Users\\me\\sales\\.venv\\Scripts\\python.exe\\" \\"C:\\Users\\me\\sales\\report.py\\" all"\n\nschtasks /Query /TN "SalesReport" /V /FO LIST\nschtasks /Run /TN "SalesReport"      # run it now to test\nschtasks /Delete /TN "SalesReport" /F', lang: 'text' },
        { h: B('قفل، ولوج، وn8n', 'A lock, a log, and n8n'),
          p: B('لو التشغيل اتأخر والتشغيل اللي بعده بدأ، الاتنين ممكن يبعتوا نفس الإيميلات. ملف قفل (`job.lock`) بيمنع ده: لو موجود، اخرج. واللوج بالوقت (أسبوع 8) هو الطريقة الوحيدة تعرف حصل إيه بالليل. وفي n8n: Schedule Trigger → Execute Command (`python report.py all`) أو HTTP Request لـ API بتاعك (أسبوع 21)، وبعدين إشعار بالنتيجة.', 'If a run is slow and the next one starts, both might send the same emails. A lock file (`job.lock`) prevents that: if it exists, exit. A timestamped log (week 8) is the only way to know what happened at night. In n8n: Schedule Trigger → Execute Command (`python report.py all`) or an HTTP Request to your API (week 21), then a notification with the result.'),
          ex: 'import os, sys, time\nfrom pathlib import Path\n\nclass SingleRun:\n    """Exit early when another copy of the job is still running."""\n    def __init__(self, path="job.lock", stale_after=3 * 3600):\n        self.path, self.stale_after = Path(path), stale_after\n    def __enter__(self):\n        if self.path.exists() and time.time() - self.path.stat().st_mtime < self.stale_after:\n            print("another run is in progress; exiting")\n            sys.exit(0)\n        self.path.write_text(str(os.getpid()))\n        return self\n    def __exit__(self, *exc):\n        self.path.unlink(missing_ok=True)\n        return False\n\nwith SingleRun():\n    print("doing the nightly work…")\nprint("lock removed:", not Path("job.lock").exists())', run: 1 }
      ],
      practice: [
        B('اكتب سطر cron لـ: كل يوم 7 الصبح، وكل اتنين 9 الصبح، وكل ربع ساعة في ساعات الشغل — واتأكد بـ crontab.guru.', 'Write cron lines for: every day at 7, every Monday at 9, and every 15 minutes during working hours — and check them on crontab.guru.'),
        B('اعمل مهمة في Task Scheduler بتشغّل سكربت بيكتب الوقت في ملف كل 5 دقايق، واتأكد إنها اشتغلت.', 'Create a Task Scheduler task running a script that writes the time to a file every 5 minutes, and confirm it ran.'),
        B('زوّد SingleRun على سكربت وشغّل نسختين مع بعض.', 'Add SingleRun to a script and start two copies at once.'),
        B('اعمل workflow في n8n: Schedule Trigger → Execute Command → Telegram بالناتج.', 'Build an n8n workflow: Schedule Trigger → Execute Command → Telegram with the output.')
      ],
      code: [
        { u: B('جدولة داخل Python (للبسيط)', 'In-process scheduling (for simple cases)'), p: '# pip install schedule   — fine for a script that is always running (on a server, in Docker)\nimport time, logging\nimport schedule\n\ndef job():\n    logging.info("checking prices…")\n\nschedule.every(30).minutes.do(job)\nschedule.every().day.at("08:00", "Africa/Cairo").do(job)\nwhile True:\n    schedule.run_pending()\n    time.sleep(20)' }
      ],
      words: [
        { t: 'cron', m: B('نظام الجدولة في Linux', 'the Linux scheduler'), ex: 'crontab -e' },
        { t: 'cron expression', m: B('5 خانات بتحدد الميعاد: دقيقة ساعة يوم شهر يوم-أسبوع', '5 fields setting a schedule: minute hour day month weekday'), ex: '0 8 1 * *' },
        { t: 'Task Scheduler', m: B('جدولة المهام في Windows', 'Windows’s task scheduler'), ex: 'schtasks /Create …' },
        { t: 'job lock', m: B('ملف بيمنع نسختين من نفس المهمة يشتغلوا مع بعض', 'a file stopping two copies of a job running at once'), ex: 'job.lock' },
        { t: 'Schedule Trigger', m: B('نود n8n بيشغّل الـ workflow في مواعيد', 'the n8n node that runs a workflow on a schedule'), ex: 'every day at 08:00' },
        { t: 'Execute Command', m: B('نود n8n بيشغّل أمر على السيرفر', 'the n8n node that runs a command on the server'), ex: 'python report.py all' }
      ],
      read: [{ lib: 'crontab.guru', what: B('جرّب الأمثلة اللي في الدرس.', 'Try the lesson’s examples.') }, 'lib:Windows Task Scheduler'],
      challenge: B('جدول `backup.py` (أسبوع 9) يشتغل كل يوم 2 الفجر بـ cron أو Task Scheduler، بالـ venv والمسار الكامل، ومعاه SingleRun ولوج وتنبيه Telegram لو فشل — وسيبه يومين واقرا اللوج.', 'Schedule `backup.py` (week 9) to run daily at 02:00 with cron or Task Scheduler, using the venv and full paths, with SingleRun, a log and a Telegram alert on failure — leave it two days and read the log.'),
      quiz: [
        { q: B('`0 8 * * 1` في cron:', '`0 8 * * 1` in cron:'), o: [B('8 الصبح كل اتنين', '08:00 every Monday'), B('8 دقايق كل ساعة', '8 minutes past every hour'), B('أول كل شهر', 'the first of each month')], a: 0, why: B('dow=1 الاتنين.', 'dow=1 is Monday.') },
        { q: B('ليه المسار الكامل لـ python في الجدولة؟', 'Why the full path to python in a schedule?'), o: [B('عشان يستخدم الـ venv الصح والجدولة مبتعرفش فولدرك', 'so it uses the right venv; the scheduler does not know your folder'), B('أسرع', 'faster'), B('مش لازم', 'not needed')], a: 0, why: B('بيئة مختلفة.', 'A different environment.') },
        { q: B('ملف القفل بيمنع:', 'A lock file prevents:'), o: [B('تشغيلين مع بعض', 'two runs at the same time'), B('الأخطاء', 'errors'), B('اللوج', 'logging')], a: 0, why: B('SingleRun.', 'SingleRun.') }
      ] },

    { title: B('مشروع الشهر الخامس واختبار الأسبوع', 'The month 5 project and weekly test'),
      goal: B('تبني تقرير شهري أوتوماتيك كامل من البيانات للإيميل، بيشتغل لوحده أول كل شهر، وتعدّي الاختبار وامتحان الشهر يفتح.', 'Build a complete automatic monthly report from data to email that runs itself on the first of each month, pass the test, and open the month exam.'),
      review: [
        B('matplotlib: figure وaxes وbar وplot وsavefig والعربي.', 'matplotlib: figure, axes, bar, plot, savefig and Arabic.'),
        B('df.plot، واختيار الرسم، وعنوان بالخلاصة، وbase64 في HTML، وcid في الإيميل.', 'df.plot, choosing the chart, takeaway titles, base64 in HTML and cid in email.'),
        B('datetime وtimedelta وzoneinfo وUTC والفترات (الشهر اللي فات وأيام الشغل).', 'datetime, timedelta, zoneinfo, UTC and periods (last month and working days).'),
        B('argparse: معاملات وخيارات وflags وchoices وأوامر فرعية.', 'argparse: arguments, options, flags, choices and subcommands.'),
        B('cron وTask Scheduler وn8n، والمسارات الكاملة والقفل واللوج.', 'cron, Task Scheduler and n8n, full paths, locks and logs.')
      ],
      project: B('**مشروع الشهر: التقرير الشهري الأوتوماتيك** (`monthly_report/`): أداة `report` بـ argparse وأوامر `build` و`send` و`all`، والشهر افتراضيًا «الشهر اللي فات» بتوقيت القاهرة. بتقرا البيانات (SQLite أسبوع 18 أو CSV/Excel)، وتحلّلها بـ pandas (أسبوع 19)، وتطلّع 4 رسوم PNG، و`report.xlsx` منسّق، و`report.html` بالرسوم base64، وPDF من الـ HTML بـ Playwright، وتبعت إيميل HTML بالرسم مضمّن (cid) والملفات مرفقة (dry run افتراضيًا)، وتبعت Telegram بسطر خلاصة. فيها SingleRun ولوج وكود خروج صح، ومجدولة أول كل شهر 8 الصبح (cron أو Task Scheduler أو n8n — اختار واحد واكتب الخطوات في README). 15 test على الفترات والتحليل.', '**Month project: the automatic monthly report** (`monthly_report/`): a `report` tool with argparse and the commands `build`, `send` and `all`, defaulting to «last month» in Cairo time. It reads the data (SQLite from week 18 or CSV/Excel), analyses it with pandas (week 19), produces 4 PNG charts, a formatted `report.xlsx`, a `report.html` with base64 charts and a PDF of the HTML made with Playwright, emails an HTML message with the chart inline (cid) and the files attached (dry run by default), and sends a one-line Telegram summary. It has SingleRun, a log and the right exit code, and is scheduled for 08:00 on the first of each month (cron, Task Scheduler or n8n — choose one and write the steps in the README). 15 tests on the periods and the analysis.'),
      test: [
        { q: B('`fig, ax = plt.subplots()` الـ ax هو:', 'In `fig, ax = plt.subplots()`, ax is:'), o: [B('الرسم اللي بترسم عليه', 'the chart you draw on'), B('الصورة المحفوظة', 'the saved image'), B('البيانات', 'the data')], a: 0, why: B('axes.', 'The axes.') },
        { q: B('`ax.bar_label(bars)`:', '`ax.bar_label(bars)`:'), o: [B('بيكتب القيم على الأعمدة', 'writes the values on the bars'), B('بيرتّب الأعمدة', 'sorts the bars'), B('بيلوّنها', 'colours them')], a: 0, why: B('قيم مكتوبة.', 'Written values.') },
        { q: B('نسب 6 فئات، الأحسن من pie:', 'Shares of 6 categories, better than a pie:'), o: [B('أعمدة نسب مترتبة', 'sorted percentage bars'), B('خط', 'a line'), B('scatter', 'a scatter')], a: 0, why: B('أسهل في المقارنة.', 'Easier to compare.') },
        { q: B('`(date(2026, 10, 1) - date(2026, 9, 1)).days`:', '`(date(2026, 10, 1) - date(2026, 9, 1)).days`:'), o: ['30', '31', '1'], a: 0, why: B('سبتمبر 30 يوم.', 'September has 30 days.') },
        { q: B('توقيت القاهرة في Python:', 'Cairo time in Python:'), o: ['ZoneInfo("Africa/Cairo")', 'timezone("EG")', 'tz=2'], a: 0, why: B('zoneinfo.', 'zoneinfo.') },
        { q: B('datetime من غير tzinfo اسمه:', 'A datetime without tzinfo is:'), o: ['naive', 'aware', 'UTC'], a: 0, why: B('مالوش توقيت.', 'It has no zone.') },
        { q: B('`add_argument("month")` معامل:', '`add_argument("month")` is a:'), o: [B('إجباري بالترتيب', 'required positional'), B('اختياري', 'optional'), 'flag'], a: 0, why: B('من غير --.', 'No --.') },
        { q: B('`python report.py -h`:', '`python report.py -h`:'), o: [B('بيطبع المساعدة ويخرج', 'prints help and exits'), B('بيشغّل التقرير', 'runs the report'), B('خطأ', 'an error')], a: 0, why: B('help تلقائي.', 'Automatic help.') },
        { q: B('`*/15 * * * *` في cron:', '`*/15 * * * *` in cron:'), o: [B('كل ربع ساعة', 'every 15 minutes'), B('الساعة 15', 'at 15:00'), B('يوم 15', 'on day 15')], a: 0, why: B('الدقايق كل 15.', 'Minutes in steps of 15.') },
        { q: B('Start in في Task Scheduler مهم عشان:', 'Start in matters in Task Scheduler because:'), o: [B('المسارات النسبية في السكربت تشتغل', 'relative paths in the script then work'), B('السرعة', 'speed'), B('الأمان', 'security')], a: 0, why: B('الفولدر الحالي.', 'The current folder.') },
        { q: B('أهم حاجة تعرف بيها السكربت عمل إيه بالليل:', 'The key way to know what a night script did:'), o: [B('لوج بالوقت', 'a timestamped log'), 'print', B('الذاكرة', 'memory')], a: 0, why: B('logging.', 'Logging.') },
        { q: B('في n8n عشان تشغّل سكربت Python في ميعاد:', 'In n8n, to run a Python script on a schedule:'), o: ['Schedule Trigger + Execute Command', 'Webhook + Set', 'Manual Trigger'], a: 0, why: B('أو HTTP لـ API بتاعك.', 'Or HTTP to your own API.') }
      ] }
  ]
};
