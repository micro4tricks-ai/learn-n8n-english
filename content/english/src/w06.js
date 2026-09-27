// Week 6 — The language of code: naming and comments.
const B = (ar, en) => ({ ar, en });
module.exports = {
  level: 'A2',
  title: B('لغة الكود: التسمية والتعليقات', 'The language of code: naming and comments'),
  goal: B('تسمّي الدوال والمتغيّرات بأسماء إنجليزي واضحة، وتكتب تعليقات وdocstrings قصيرة ومفيدة، وتتكلم عن النصوص والملفات في الكود.',
          'Name functions and variables with clear English names, write short, useful comments and docstrings, and talk about strings and files in code.'),
  days: [
    { title: B('أسماء الدوال: فعل + مفعول', 'Function names: verb + object'),
      goal: B('تختار الفعل الصح لاسم الدالة: get/fetch/retrieve، create/make، check/validate…', 'Choose the right verb for a function name: get/fetch/retrieve, create/make, check/validate…'),
      learn: [
        { h: B('قاعدة التسمية', 'The naming rule'),
          p: B('الدالة بتعمل حاجة، فاسمها يبدأ بفعل: send_invoice، get_user، is_valid. والمتغيّر حاجة، فاسمه اسم: user_count، invoice_total. والـ boolean سؤال: is_active، has_access.', 'A function does something, so its name starts with a verb: send_invoice, get_user, is_valid. A variable is a thing, so it is a noun: user_count, invoice_total. A boolean is a question: is_active, has_access.'),
          ex: '✗ data2, doStuff(), flag\n✓ unpaid_invoices, send_reminders(), is_overdue' },
        { h: B('أفعال متقاربة', 'Verbs that look alike'),
          p: B('get = تجيب (عام). fetch = تجيب من برّه (شبكة). retrieve = تسترجع من مكان تخزين. load = تحمّل في الذاكرة. find = تدوّر وممكن متلاقيش.', 'get = obtain (general). fetch = get from outside (network). retrieve = get back from storage. load = bring into memory. find = search, and it may find nothing.'),
          ex: 'fetch_weather(city)\nretrieve_order(order_id)\nload_config(path)\nfind_user_by_email(email)  # may return None' },
        'g:Make vs Do vs Take',
        'g:أفعال من غير حرف جر'
      ],
      practice: [
        B('غيّر أسماء 10 دوال ومتغيّرات في كودك لأسماء أوضح بالقاعدة، واكتب قبل وبعد.', 'Rename 10 functions and variables in your code with the rule, and write before and after.'),
        B('اختار الفعل الصح لـ 6 دوال: بتجيب من API، بتقرا ملف، بتدوّر في قايمة، بتتأكد من إيميل…', 'Choose the right verb for 6 functions: gets from an API, reads a file, searches a list, checks an email…'),
        B('اكتب 6 جمل بـ make / do / take في الشغل: make a decision، do a review، take a break.', 'Write 6 work sentences with make / do / take: make a decision, do a review, take a break.'),
        B('صلّح: `discuss about the plan` و`contact with the client` و`explain me the error`.', 'Fix: `discuss about the plan`, `contact with the client` and `explain me the error`.')
      ],
      words: ['implement', 'maintain', 'ensure', 'provide', 'require', 'retrieve', 'specify'],
      read: [{ lib: 'PEP 8 — Style Guide for Python', what: B('اقرا قسم «Naming Conventions» ولاحظ الـ snake_case وأسماء الكلاسات.', 'Read the "Naming Conventions" section and notice snake_case and class names.') }],
      challenge: B('خد ملف كود قديم عندك وأعد تسميته بالكامل، واكتب commit message بتشرح اللي عملته.', 'Take an old code file of yours, rename everything in it, and write a commit message explaining what you did.'),
      quiz: [
        { q: B('أحسن اسم لدالة بتجيب الطقس من API:', 'The best name for a function that gets the weather from an API:'), o: ['weather()', 'fetch_weather()', 'weather_data_thing()'], a: 1, why: B('فعل + مفعول، وfetch لأنها من الشبكة.', 'verb + object, and fetch because it comes from the network.') },
        { q: B('أحسن اسم لـ boolean:', 'The best name for a boolean:'), o: ['active', 'is_active', 'check_active_status'], a: 1, why: B('الـ boolean اسمه سؤال: is_ / has_.', 'A boolean is named like a question: is_ / has_.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Let\'s discuss about the plan.', 'Let\'s discuss the plan.', 'Let\'s discuss on the plan.'], a: 1, why: B('discuss من غير حرف جر.', 'discuss takes no preposition.') }
      ] },

    { title: B('النصوص في الكود', 'Strings in code'),
      goal: B('تتكلم عن عمليات النصوص بالإنجليزي: قص، وتقسيم، ودمج، واستبدال، وحروف كبيرة وصغيرة.', 'Talk about string operations in English: trimming, splitting, joining, replacing, upper and lower case.'),
      learn: [
        { h: B('اقرا عمليات النص', 'Reading string operations'),
          p: B('`name.strip()` = remove the whitespace from both ends. `line.split(",")` = split the line on commas. `", ".join(names)` = join the names with a comma.', '`name.strip()` = remove the whitespace from both ends. `line.split(",")` = split the line on commas. `", ".join(names)` = join the names with a comma.'),
          ex: 'text.lower()              convert the text to lowercase\ntext.replace("-", " ")    replace dashes with spaces\nlen(text)                 the length of the text' },
        'g:الظرف بـ ly',
        { h: B('وصف التغيير', 'Describing a change'),
          p: B('convert X to Y، turn X into Y، change X to Y، replace X with Y. انتبه لـ with بعد replace.', 'convert X to Y, turn X into Y, change X to Y, replace X with Y. Note the with after replace.'),
          ex: 'Convert the date to ISO format.\nReplace empty values with "N/A".' }
      ],
      practice: [
        B('اشرح 8 عمليات نصوص من كودك بجملة لكل واحدة.', 'Explain 8 string operations from your code in one sentence each.'),
        B('اكتب دالة بتنضّف اسم مستخدم (مسافات، حروف كبيرة) واكتب فوقها 3 سطور تعليق بالإنجليزي.', 'Write a function that cleans a user name (spaces, capitals) with a 3-line English comment above it.'),
        B('اكتب 5 جمل بظرف ly يوصف الفعل: The script runs quickly / fails silently.', 'Write 5 sentences with an -ly adverb describing the verb: The script runs quickly / fails silently.'),
        B('اكتب 4 جمل بـ replace… with و convert… to.', 'Write 4 sentences with replace… with and convert… to.')
      ],
      code: [
        { u: B('تعليق بيوصف تنضيف نص', 'A comment describing text cleanup'), p: '# Remove the whitespace, convert the name to lowercase,\n# and replace spaces with underscores.\nslug = name.strip().lower().replace(" ", "_")' }
      ],
      words: ['concatenate', 'split', 'join', 'strip', 'replace', 'uppercase / lowercase', 'whitespace'],
      read: [{ lib: 'Automate the Boring Stuff (النسخة الإنجليزي)', what: B('اقرا فصل «Manipulating Strings» وركّز على أسماء الدوال وشرحها.', 'Read the "Manipulating Strings" chapter and focus on the method names and their descriptions.') }],
      challenge: B('اكتب «cheat sheet» فيها 10 عمليات نصوص، كل واحدة بمثال كود وجملة إنجليزي.', 'Write a cheat sheet of 10 string operations, each with a code example and an English sentence.'),
      quiz: [
        { q: B('`text.strip()` بتعمل إيه؟', 'What does `text.strip()` do?'), o: [B('بتشيل المسافات من الأول والآخر', 'removes whitespace from both ends'), B('بتقسم النص', 'splits the text'), B('بتكبّر الحروف', 'makes it uppercase')], a: 0, why: B('strip = تشيل الزيادة من الأطراف.', 'strip = remove what is extra at the ends.') },
        { q: B('اكمل: `Replace commas ___ semicolons.`', 'Complete: `Replace commas ___ semicolons.`'), o: ['to', 'with', 'by'], a: 1, why: B('replace X with Y.', 'replace X with Y.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The job fails silent.', 'The job fails silently.', 'The job silently fail.'], a: 1, why: B('الظرف اللي بيوصف الفعل بياخد ly.', 'An adverb describing the verb takes -ly.') }
      ] },

    { title: B('تنسيق النصوص والخوارزميات', 'Formatting strings and algorithms'),
      goal: B('تشرح تنسيق النصوص وتحويل الأنواع، وتوصف خوارزمية بسيطة خطوة خطوة.', 'Explain string formatting and type conversion, and describe a simple algorithm step by step.'),
      learn: [
        { h: B('وصف خوارزمية', 'Describing an algorithm'),
          p: B('First، Then، Next، After that، Finally. وجملة لكل خطوة بفعل أمر: Sort the list. Compare each item with the next one.', 'First, Then, Next, After that, Finally. One sentence per step, with an imperative verb: Sort the list. Compare each item with the next one.'),
          ex: 'First, read the file.\nThen, split each line on commas.\nFinally, count the rows with an empty email.' },
        'g:صفات ed وing',
        { h: B('تحويل النوع', 'Type conversion'),
          p: B('`int("42")` = convert the string to an integer. `str(3.5)` = turn the number into a string. ولو فشل: ValueError: invalid literal for int().', '`int("42")` = convert the string to an integer. `str(3.5)` = turn the number into a string. If it fails: ValueError: invalid literal for int().'),
          ex: 'age = int(input("Age: "))   # converts the input to an integer\nmsg = f"You are {age} years old."' }
      ],
      practice: [
        B('اشرح خوارزمية عملتها (أو bubble sort) في 6 خطوات بـ First/Then/Finally.', 'Explain an algorithm you wrote (or bubble sort) in 6 steps with First/Then/Finally.'),
        B('اكتب 5 f-strings وجملة لكل واحدة بتشرح النتيجة.', 'Write 5 f-strings and a sentence explaining the result of each.'),
        B('اختار ed ولا ing: I\'m (interested/interesting) in AI. The bug is (confused/confusing).', 'Choose ed or ing: I\'m (interested/interesting) in AI. The bug is (confused/confusing).'),
        B('اكتب دالة recursive صغيرة (factorial) واشرحها في 4 جمل.', 'Write a small recursive function (factorial) and explain it in 4 sentences.')
      ],
      words: ['substring', 'f-string', 'format', 'boilerplate', 'algorithm', 'recursion', 'type casting'],
      read: [{ lib: 'Python Tutor', what: B('حط فيها دالة recursive وشوفها بتشتغل خطوة خطوة، واوصف اللي شفته بالإنجليزي.', 'Run a recursive function in it, watch it step by step, and describe what you saw in English.') }],
      challenge: B('اشرح لحد (أو سجّل) خوارزمية البحث الثنائي (binary search) في دقيقة بالإنجليزي من غير ورقة.', 'Explain binary search to someone (or in a recording) in one minute of English without notes.'),
      quiz: [
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['This error message is confused.', 'This error message is confusing.', 'This error message is confuse.'], a: 1, why: B('الحاجة اللي بتسبب الإحساس = ing.', 'The thing that causes the feeling = -ing.') },
        { q: B('recursion معناها:', 'recursion means:'), o: [B('دالة بتنادي نفسها', 'a function that calls itself'), B('loop سريع', 'a fast loop'), B('تحويل نوع', 'type conversion')], a: 0, why: B('recursive = بتنادي نفسها.', 'recursive = calls itself.') },
        { q: B('`int("42")` بتعمل:', '`int("42")` does:'), o: [B('تحوّل نص لرقم صحيح', 'converts a string to an integer'), B('تحوّل رقم لنص', 'converts a number to a string'), B('بتقرب الرقم', 'rounds a number')], a: 0, why: B('type casting من string لـ integer.', 'type casting from string to integer.') }
      ] },

    { title: B('التعليقات والـ docstrings', 'Comments and docstrings'),
      goal: B('تكتب تعليق بيشرح «ليه» مش «إيه»، وdocstring فيه Args وReturns وRaises.', 'Write comments that explain "why", not "what", and docstrings with Args, Returns and Raises.'),
      learn: [
        { h: B('التعليق الكويس', 'A good comment'),
          p: B('الكود بيقول «إيه»، والتعليق يقول «ليه». ✗ `# add 1 to i` ✓ `# skip the header row`. واكتبه جملة قصيرة بالمضارع أو الأمر.', 'The code says "what"; the comment says "why". ✗ `# add 1 to i` ✓ `# skip the header row`. Write it as a short sentence in the present or the imperative.'),
          ex: '# The API returns max 100 items, so we fetch page by page.\n# TODO: remove this workaround when v2 is released.' },
        { h: B('قالب docstring', 'A docstring template'),
          p: B('سطر أول بيقول الدالة بتعمل إيه (بفعل: Return…، Send…)، وبعدين Args وReturns وRaises.', 'The first line says what the function does (with a verb: Return…, Send…), then Args, Returns and Raises.'),
          ex: '"""Send a reminder to every customer with an overdue invoice.\n\nArgs:\n    days: How many days late an invoice must be.\nReturns:\n    The number of reminders sent.\nRaises:\n    ValueError: If days is negative.\n"""' },
        'g:explain و describe'
      ],
      practice: [
        B('امسح 5 تعليقات «إيه» من كودك واكتب مكانها تعليقات «ليه».', 'Delete 5 "what" comments from your code and write "why" comments instead.'),
        B('اكتب docstrings كاملة لـ 3 دوال بالقالب.', 'Write full docstrings for 3 functions using the template.'),
        B('اكتب 3 جمل بـ explain و3 بـ describe من غير «explain me».', 'Write 3 sentences with explain and 3 with describe, never "explain me".'),
        B('اكتب 3 تعليقات TODO/FIXME واضحة فيها السبب والمطلوب.', 'Write 3 clear TODO/FIXME comments with the reason and what is needed.')
      ],
      words: ['enable / disable', 'allocate', 'clarify', 'analyze', 'optimize', 'summarize', 'differentiate'],
      read: [{ lib: 'PEP 257 — Docstring Conventions', what: B('اقرا «One-line Docstrings» و«Multi-line Docstrings».', 'Read "One-line Docstrings" and "Multi-line Docstrings".') }],
      challenge: B('اختار أطول دالة عندك واكتب لها docstring كامل وتعليقين «ليه» جوه الكود، وخلّي حد يقراهم ويقولك فهم إيه.', 'Take your longest function and write it a full docstring and two "why" comments inside, then ask someone to read them and tell you what they understood.'),
      quiz: [
        { q: B('أنهي تعليق أحسن؟', 'Which comment is better?'), o: ['# loop over rows', '# skip rows without an email; the CRM rejects them', '# this is a loop'], a: 1, why: B('بيشرح السبب (ليه) مش اللي الكود بيقوله.', 'It explains the reason (why), not what the code already says.') },
        { q: B('أول سطر في docstring المفروض:', 'The first line of a docstring should:'), o: [B('يقول الدالة بتعمل إيه بفعل', 'say what the function does, with a verb'), B('يكتب اسم المبرمج', 'give the programmer\'s name'), B('يكرر اسم الدالة', 'repeat the function name')], a: 0, why: B('Return… / Send… / Check…', 'Return… / Send… / Check…') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Can you explain me the error?', 'Can you explain the error to me?', 'Can you explain to me about the error?'], a: 1, why: B('explain something to someone.', 'explain something to someone.') }
      ] },

    { title: B('ملفات البيانات', 'Data files'),
      goal: B('تتكلم عن CSV وJSON والـ parsing والـ schema بالإنجليزي، وتستخدم الأفعال بحروف الجر الثابتة.', 'Talk about CSV, JSON, parsing and schemas in English, and use verbs with their fixed prepositions.'),
      learn: [
        { h: B('وصف ملف CSV', 'Describing a CSV file'),
          p: B('The file has a header row and 5 columns. Each row is one customer. The delimiter is a semicolon. The encoding is UTF-8.', 'The file has a header row and 5 columns. Each row is one customer. The delimiter is a semicolon. The encoding is UTF-8.'),
          ex: 'name;email;city\nAli;ali@x.com;Cairo\n→ 3 columns, 1 data row, delimiter ";"' },
        'g:أفعال وحروف جر ثابتة',
        'g:الحروف الكبيرة وأسماء الأدوات'
      ],
      practice: [
        B('اوصف ملف CSV أو Excel عندك في 6 جمل (الأعمدة، الصفوف، الفاصل، الـ encoding).', 'Describe a CSV or Excel file you have in 6 sentences (columns, rows, delimiter, encoding).'),
        B('اكتب schema لملف JSON في جدول: field، type، required، description.', 'Write a schema for a JSON file as a table: field, type, required, description.'),
        B('اكتب 6 جمل بأفعال وحروف جرها: depend on، consist of، belong to، refer to، apply for، wait for.', 'Write 6 sentences with verb + preposition: depend on, consist of, belong to, refer to, apply for, wait for.'),
        B('اكتب أسماء 8 أدوات بالحروف الكبيرة الصح: GitHub، JavaScript، PostgreSQL، macOS، npm…', 'Write the names of 8 tools with the correct capitals: GitHub, JavaScript, PostgreSQL, macOS, npm…')
      ],
      words: ['CSV', 'delimiter', 'header row', 'serialize / deserialize', 'parse', 'schema', 'encryption'],
      read: [{ lib: 'Real Python', what: B('دوّر على «Reading and Writing CSV Files in Python» واقرا الجزء الأول.', 'Search for "Reading and Writing CSV Files in Python" and read the first part.') }],
      challenge: B('اكتب سكربت بيحوّل CSV لـ JSON، ومعاه README صغير بالإنجليزي بيوصف شكل الملفين.', 'Write a script that converts CSV to JSON, with a small English README describing both file formats.'),
      quiz: [
        { q: B('parse معناها:', 'parse means:'), o: [B('تحلل نص وتحوّله لبيانات منظمة', 'read text and turn it into structured data'), B('تمسح الملف', 'delete the file'), B('تشفّر البيانات', 'encrypt the data')], a: 0, why: B('parse JSON = تحوّل النص لـ object.', 'parse JSON = turn the text into an object.') },
        { q: B('اكمل: `The result depends ___ the input.`', 'Complete: `The result depends ___ the input.`'), o: ['of', 'on', 'from'], a: 1, why: B('depend on.', 'depend on.') },
        { q: B('أنهي كتابة صح؟', 'Which spelling is correct?'), o: ['Github and Javascript', 'GitHub and JavaScript', 'github and javaScript'], a: 1, why: B('اكتب اسم الأداة زي ما أصحابها بيكتبوه.', 'Write a tool\'s name the way its makers write it.') }
      ] },

    { title: B('مراجعة الأسبوع والاختبار', 'Week review and test'),
      goal: B('راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 7 بيفتح لما تجيب 70% أو أكتر.', 'Review the five days, hand in the weekly project, and take the weekly test. Week 7 opens when you score 70% or more.'),
      review: [
        B('الدالة فعل + مفعول، والمتغيّر اسم، والـ boolean سؤال.', 'A function is verb + object, a variable is a noun, a boolean is a question.'),
        B('get / fetch / retrieve / load / find، وmake / do / take.', 'get / fetch / retrieve / load / find, and make / do / take.'),
        B('عمليات النصوص، وreplace… with وconvert… to، والظرف بـ ly.', 'String operations, replace… with and convert… to, and -ly adverbs.'),
        B('التعليق يقول «ليه»، والـ docstring: سطر بفعل + Args + Returns + Raises.', 'A comment says "why"; a docstring is a verb line + Args + Returns + Raises.'),
        B('وصف ملفات CSV/JSON، والأفعال بحروف جرها، وأسماء الأدوات صح.', 'Describing CSV/JSON files, verbs with their prepositions, and tool names spelled right.')
      ],
      project: B('اعمل «code review» لنفسك بالإنجليزي على ملف كود حقيقي: غيّر 10 أسماء لأسماء أوضح، واكتب docstrings لكل الدوال، وعلّق على كل حاجة غريبة بتعليق «ليه»، واكتب ملخص من 8 جمل عن اللي غيّرته ولماذا، كأنك بتكتب وصف Pull Request.',
                 'Do an English "code review" of your own on a real code file: rename 10 things more clearly, write docstrings for every function, add a "why" comment to anything unusual, and write an 8-sentence summary of what you changed and why, as if it were a pull-request description.'),
      test: [
        { q: B('أحسن اسم لمتغيّر فيه عدد المستخدمين:', 'The best name for a variable holding the number of users:'), o: ['users_count_number_var', 'user_count', 'get_users'], a: 1, why: B('اسم (noun) قصير وواضح.', 'A short, clear noun.') },
        { q: B('دالة بتدوّر على مستخدم وممكن ترجّع None، اسمها:', 'A function that searches for a user and may return None is best named:'), o: ['find_user()', 'load_user()', 'user()'], a: 0, why: B('find = ممكن متلاقيش.', 'find = it may find nothing.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['Please do a decision today.', 'Please make a decision today.', 'Please take a decision to today.'], a: 1, why: B('make a decision.', 'make a decision.') },
        { q: B('`", ".join(names)` بتعمل:', '`", ".join(names)` does:'), o: [B('تدمج الأسماء بفاصلة', 'joins the names with a comma'), B('تقسم الأسماء', 'splits the names'), B('تمسح الفواصل', 'removes commas')], a: 0, why: B('join = تلزق بفاصل.', 'join = glue together with a separator.') },
        { q: B('اكمل: `Convert the price ___ an integer.`', 'Complete: `Convert the price ___ an integer.`'), o: ['to', 'with', 'in'], a: 0, why: B('convert X to Y.', 'convert X to Y.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['I\'m boring with this task.', 'I\'m bored with this task.', 'I\'m bore with this task.'], a: 1, why: B('إحساسك = ed.', 'Your feeling = -ed.') },
        { q: B('في وصف خوارزمية، آخر خطوة بتبدأ غالبًا بـ:', 'In an algorithm description, the last step usually starts with:'), o: ['First,', 'Finally,', 'Then,'], a: 1, why: B('Finally = في الآخر.', 'Finally = at the end.') },
        { q: B('أنهي تعليق بيشرح «ليه»؟', 'Which comment explains "why"?'), o: ['# set x to 0', '# reset the counter because the report starts a new month', '# counter'], a: 1, why: B('فيه السبب.', 'It gives the reason.') },
        { q: B('قسم «Raises» في docstring بيقول:', 'The "Raises" section of a docstring says:'), o: [B('الأخطاء اللي الدالة ممكن ترميها', 'the errors the function may raise'), B('القيمة اللي بترجع', 'the value it returns'), B('الباراميترز', 'the parameters')], a: 0, why: B('raises = الأخطاء.', 'raises = errors.') },
        { q: B('اختار الصح:', 'Choose the correct one:'), o: ['The report consists from three parts.', 'The report consists of three parts.', 'The report consists on three parts.'], a: 1, why: B('consist of.', 'consist of.') },
        { q: B('delimiter في ملف CSV هو:', 'The delimiter in a CSV file is:'), o: [B('العلامة اللي بتفصل الأعمدة', 'the character that separates columns'), B('أول صف', 'the first row'), B('اسم الملف', 'the file name')], a: 0, why: B('زي , أو ;', 'Like , or ;') },
        { q: B('أنهي كتابة صح؟', 'Which is spelled correctly?'), o: ['Postgresql on MacOS', 'PostgreSQL on macOS', 'postgreSQL on Mac OS'], a: 1, why: B('الأسماء الرسمية: PostgreSQL وmacOS.', 'The official names: PostgreSQL and macOS.') }
      ] }
  ]
};
