// Week 1 (built from the old intensive week by tools/migrate_week1.js, then edited by hand).
JOURNEY.week({
 "track": "english",
 "n": 1,
 "month": 1,
 "level": "A1",
 "title": {
  "ar": "اقرا الأخطاء والتوثيق واكتب وتواصل",
  "en": "Read errors and docs, write, and communicate"
 },
 "goal": {
  "ar": "أسبوع البداية: تقرا رسائل الأخطاء والتوثيق، وتسمّي حاجات الكود صح، وتكتب commit وREADME، وتسأل وترد بالإنجليزي.",
  "en": "The starting week: read error messages and docs, name things in code well, write commits and a README, and ask and answer in English."
 },
 "days": [
  {
   "d": 1,
   "title": {
    "ar": "اقرا رسائل الأخطاء والـ Traceback",
    "en": "Reading error messages and tracebacks"
   },
   "goal": {
    "ar": "تقرا أي رسالة خطأ بالإنجليزي وتفهم هي بتقول إيه ومنين جاية، من غير ما تنسخها في مترجم.",
    "en": "Read any English error message and understand what it says and where it comes from, without pasting it into a translator."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "شكل رسالة الخطأ",
      "en": "The shape of an error message"
     },
     "p": {
      "ar": "أغلب رسائل الأخطاء ليها نفس الشكل: نوع الخطأ، وبعده نقطتين، وبعدهم وصف قصير. اقرا النوع الأول لأنه بيقولك الفئة.",
      "en": "Most error messages share the same shape: the error type, a colon, then a short description. Read the type first — it tells you the category."
     },
     "ex": "TypeError: can only concatenate str (not \"int\") to str\n└─ type ─┘  └──────────── message ────────────┘"
    },
    {
     "h": {
      "ar": "الـ Traceback بيتقري من تحت لفوق",
      "en": "A traceback is read from the bottom up"
     },
     "p": {
      "ar": "آخر سطر هو الخطأ نفسه، واللي فوقه هو الطريق اللي الكود مشي فيه لحد ما وقع. دوّر على أول سطر فيه اسم ملفك انت.",
      "en": "The last line is the error itself, and the lines above it are the path the code took until it failed. Look for the first line that mentions your own file."
     },
     "ex": "Traceback (most recent call last):\n  File \"app.py\", line 12, in <module>\n    total = price + tax\nTypeError: unsupported operand type(s) for +: 'int' and 'str'"
    },
    {
     "h": {
      "ar": "الكلمات اللي بتتكرر في الأخطاء",
      "en": "Words that keep appearing in errors"
     },
     "p": {
      "ar": "expected (كان متوقع)، got (اللي وصل)، missing (ناقص)، invalid (مش صالح)، unexpected (مش متوقع)، not found (مش موجود)، denied (مرفوض)، out of range (برّه الحدود)، deprecated (قديم وهيتشال).",
      "en": "expected (what it wanted), got (what arrived), missing, invalid, unexpected, not found, denied (refused), out of range (beyond the limits), deprecated (old and going away)."
     },
     "ex": "expected 2 arguments, got 3\nmissing 1 required positional argument: 'name'\nPermission denied"
    },
    {
     "h": {
      "ar": "الفرق بين: Error / Warning / Exception",
      "en": "The difference: Error / Warning / Exception"
     },
     "p": {
      "ar": "Error = حاجة وقفت البرنامج. Warning = تحذير والبرنامج كمّل. Exception = خطأ وقت التشغيل تقدر «تمسكه» (catch) بـ try/except.",
      "en": "Error = something stopped the program. Warning = a caution, and the program carried on. Exception = a run-time error you can “catch” with try/except."
     },
     "ex": {
      "ar": "DeprecationWarning: this function will be removed in version 3.0\n→ لسه شغال، بس غيّره قريب",
      "en": "DeprecationWarning: this function will be removed in version 3.0\n→ still works, but change it soon"
     }
    },
    {
     "h": {
      "ar": "أفعال بتوصف اللي حصل",
      "en": "Verbs that describe what happened"
     },
     "p": {
      "ar": "raise/throw = رمى خطأ. catch/handle = مسك الخطأ وتعامل معاه. fail = فشل. crash = وقع فجأة. hang/freeze = علّق. time out = خلص وقته.",
      "en": "raise/throw = produce an error. catch/handle = grab the error and deal with it. fail. crash = stop suddenly. hang/freeze = get stuck. time out = run out of time."
     },
     "ex": "The request timed out after 30 seconds.\nThe app crashed on startup.\nThis function raises ValueError if the input is empty."
    },
    {
     "h": {
      "ar": "اسأل عن الخطأ صح",
      "en": "Search for the error the right way"
     },
     "p": {
      "ar": "وانت بتدوّر على حل: انسخ نوع الخطأ والرسالة من غير الأجزاء اللي خاصة بجهازك (المسارات والأسماء).",
      "en": "When looking for a fix: copy the error type and message, without the parts specific to your machine (paths and names)."
     },
     "ex": "Search:  TypeError can only concatenate str (not \"int\") to str\nNot:     error line 12 app.py C:\\Users\\me\\…"
    }
   ],
   "practice": [
    {
     "ar": "افتح Python واعمل 5 أخطاء بإيدك: `print(x)` و`\"a\" + 1` و`int(\"abc\")` و`[1,2][5]` و`{\"a\":1}[\"b\"]`",
     "en": "Open Python and make 5 errors on purpose: `print(x)`, `\"a\" + 1`, `int(\"abc\")`, `[1,2][5]` and `{\"a\":1}[\"b\"]`"
    },
    {
     "ar": "لكل خطأ: اكتب نوعه، والكلمة المهمة في الرسالة، ومعناها بالعربي في سطر واحد",
     "en": "For each error: write its type, the key word in the message, and its meaning in your language in one line"
    },
    {
     "ar": "اقرا Traceback فيه 3 مستويات من تحت لفوق، وحدد السطر اللي في ملفك انت",
     "en": "Read a 3-level traceback from the bottom up and find the line in your own file"
    },
    {
     "ar": "افتح قسم «رسائل الأخطاء» تحت واحفظ الكلمة المهمة في كل رسالة",
     "en": "Open the “Error messages” section below and memorize the key word in each message"
    },
    {
     "ar": "دوّر على خطأ واحد في Google بالطريقة الصح، وقارن النتايج بالبحث بالعربي",
     "en": "Search for one error on Google the right way, and compare the results with searching in Arabic"
    },
    {
     "ar": "اكتب بالإنجليزي جملة تشرح كل خطأ: `This error happens when …`",
     "en": "Write one English sentence explaining each error: `This error happens when …`"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "قالب تشرح بيه أي خطأ",
      "en": "A template for explaining any error"
     },
     "p": "This error happens when ___.\nIt means that ___.\nTo fix it, I need to ___."
    },
    {
     "u": {
      "ar": "أمثلة مشروحة",
      "en": "Explained examples"
     },
     "p": "NameError: name 'total' is not defined\n→ I used the variable \"total\" before creating it.\n\nKeyError: 'email'\n→ The dictionary does not have the key \"email\"."
    },
    {
     "u": {
      "ar": "كلمات الأخطاء في جملة",
      "en": "Error words in a sentence"
     },
     "p": "The function expected a list but got a string.\nThe config file is missing.\nThe token is invalid or has expired."
    }
   ],
   "words": [
    {
     "t": "error",
     "m": {
      "ar": "خطأ",
      "en": "An error"
     },
     "ex": "Read the error message carefully."
    },
    {
     "t": "exception",
     "m": {
      "ar": "استثناء (خطأ وقت التشغيل)",
      "en": "An exception (a run-time error)"
     },
     "ex": "The code catches the exception and logs it."
    },
    {
     "t": "traceback",
     "m": {
      "ar": "تتبع مسار الخطأ اللي بايثون بيطبعه",
      "en": "The error path Python prints"
     },
     "ex": "The traceback shows where the error happened."
    },
    {
     "t": "syntax error",
     "m": {
      "ar": "خطأ في صياغة الكود",
      "en": "An error in how the code is written"
     },
     "ex": "A missing colon causes a syntax error."
    },
    {
     "t": "debug",
     "m": {
      "ar": "تصحيح الأخطاء",
      "en": "Finding and fixing errors"
     },
     "ex": "I spent an hour debugging this function."
    },
    {
     "t": "warning",
     "m": {
      "ar": "تحذير",
      "en": "A warning"
     },
     "ex": "The warning says this feature is deprecated."
    },
    {
     "t": "crash",
     "m": {
      "ar": "توقف البرنامج فجأة",
      "en": "The program stopping suddenly"
     },
     "ex": "The app crashes when the file is empty."
    },
    {
     "t": "expected",
     "m": {
      "ar": "كان متوقع",
      "en": "What was expected"
     },
     "ex": "expected 2 arguments, got 3"
    },
    {
     "t": "got",
     "m": {
      "ar": "اللي وصل فعلاً (في رسائل الأخطاء)",
      "en": "What actually arrived (in error messages)"
     },
     "ex": "expected str, got int"
    },
    {
     "t": "missing",
     "m": {
      "ar": "ناقص",
      "en": "Not there / left out"
     },
     "ex": "missing 1 required positional argument"
    },
    {
     "t": "invalid",
     "m": {
      "ar": "مش صالح",
      "en": "Not valid"
     },
     "ex": "invalid literal for int() with base 10"
    },
    {
     "t": "unexpected",
     "m": {
      "ar": "مش متوقع",
      "en": "Not expected"
     },
     "ex": "SyntaxError: unexpected EOF while parsing"
    },
    {
     "t": "not found",
     "m": {
      "ar": "مش موجود",
      "en": "Doesn't exist"
     },
     "ex": "404 Not Found"
    },
    {
     "t": "denied",
     "m": {
      "ar": "مرفوض",
      "en": "Refused"
     },
     "ex": "Permission denied"
    },
    {
     "t": "out of range",
     "m": {
      "ar": "برّه الحدود المسموحة",
      "en": "Outside the allowed limits"
     },
     "ex": "list index out of range"
    },
    {
     "t": "deprecated",
     "m": {
      "ar": "قديم ولسه شغال بس هيتشال",
      "en": "Old, still working, but going away"
     },
     "ex": "This function is deprecated and will be removed in 3.0."
    },
    {
     "t": "raise",
     "m": {
      "ar": "يرمي خطأ",
      "en": "To throw an error"
     },
     "ex": "The function raises ValueError if the input is empty."
    },
    {
     "t": "catch / handle",
     "m": {
      "ar": "يمسك الخطأ ويتعامل معاه",
      "en": "To catch an error and deal with it"
     },
     "ex": "Catch the exception and log it."
    },
    {
     "t": "time out",
     "m": {
      "ar": "الوقت خلص قبل ما الرد يوصل",
      "en": "Time ran out before the reply arrived"
     },
     "ex": "The request timed out after 30 seconds."
    },
    {
     "t": "hang / freeze",
     "m": {
      "ar": "يعلّق ومبيستجيبش",
      "en": "Gets stuck and stops responding"
     },
     "ex": "The app hangs when I click Save."
    }
   ],
   "read": [
    {
     "t": {
      "ar": "Automate the Boring Stuff (النسخة الإنجليزي)",
      "en": "Automate the Boring Stuff (English edition)"
     },
     "url": "https://automatetheboringstuff.com/",
     "what": {
      "ar": "نفس الفصل اللي بتذاكره بالعربي: اقرا صفحة بالإنجليزي الأول.",
      "en": "The same chapter you're studying in Arabic: read one page in English first."
     }
    }
   ],
   "challenge": {
    "ar": "اختار 3 رسائل أخطاء ظهرتلك فعلاً (من Python أو n8n أو أي برنامج). ترجم كل رسالة كلمة كلمة، واكتب لكل واحدة 3 جمل إنجليزي: السبب إيه، ومعناه إيه، وصلّحته إزاي. وبعدين اقراهم بصوت عالي.",
    "en": "Pick 3 error messages you actually got (from Python, n8n or any program). Translate each one word by word, and write 3 English sentences for each: what caused it, what it means, and how you fixed it. Then read them out loud."
   },
   "quiz": [
    {
     "q": {
      "ar": "في الـ Traceback، أنهي سطر فيه الخطأ نفسه؟",
      "en": "In a traceback, which line holds the actual error?"
     },
     "o": [
      {
       "ar": "أول سطر",
       "en": "The first line"
      },
      {
       "ar": "آخر سطر",
       "en": "The last line"
      },
      {
       "ar": "السطر اللي في النص",
       "en": "The line in the middle"
      },
      {
       "ar": "السطر اللي فيه Traceback",
       "en": "The line that says Traceback"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Traceback بيتقري من تحت لفوق: آخر سطر فيه نوع الخطأ ورسالته.",
      "en": "A traceback is read bottom-up: the last line has the error type and its message."
     }
    },
    {
     "q": {
      "ar": "\"expected 2 arguments, got 3\" معناها؟",
      "en": "What does \"expected 2 arguments, got 3\" mean?"
     },
     "o": [
      {
       "ar": "الدالة محتاجة 3 وانت بعت 2",
       "en": "The function needs 3 and you sent 2"
      },
      {
       "ar": "الدالة كانت مستنية 2 وانت بعت 3",
       "en": "The function expected 2 and you sent 3"
      },
      {
       "ar": "فيه خطأين",
       "en": "There are two errors"
      },
      {
       "ar": "الدالة مش موجودة",
       "en": "The function doesn't exist"
      }
     ],
     "a": 1,
     "why": {
      "ar": "expected = كان متوقع، got = اللي وصل فعلاً.",
      "en": "expected = what it wanted; got = what actually arrived."
     }
    },
    {
     "q": {
      "ar": "\"deprecated\" معناها إيه؟",
      "en": "What does \"deprecated\" mean?"
     },
     "o": [
      {
       "ar": "مكسور ومش شغال",
       "en": "Broken and not working"
      },
      {
       "ar": "قديم ولسه شغال بس هيتشال قدام",
       "en": "Old and still working, but it will be removed later"
      },
      {
       "ar": "جديد",
       "en": "New"
      },
      {
       "ar": "ممنوع",
       "en": "Forbidden"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Deprecated = لسه شغال، بس مش مستحسن تستخدمه لأنه هيتشال في إصدار جاي.",
      "en": "Deprecated = it still works, but you shouldn't use it because it'll be removed in a future version."
     }
    }
   ]
  },
  {
   "d": 2,
   "title": {
    "ar": "اقرا التوثيق (Documentation)",
    "en": "Reading documentation"
   },
   "goal": {
    "ar": "تفتح أي صفحة توثيق وتعرف تلاقي اللي محتاجه بسرعة: الدالة بتاخد إيه، وبترجع إيه، وممكن ترمي أنهي خطأ.",
    "en": "Open any docs page and quickly find what you need: what the function takes, what it returns, and which error it may raise."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "هيكل صفحة التوثيق",
      "en": "The structure of a docs page"
     },
     "p": {
      "ar": "أغلب صفحات التوثيق فيها نفس الأقسام: Description، وParameters (المدخلات)، وReturns (الناتج)، وRaises (الأخطاء)، وExample، وNote أو Warning.",
      "en": "Most docs pages share the same sections: Description, Parameters (inputs), Returns (output), Raises (errors), Example, and Note or Warning."
     },
     "ex": "requests.get(url, params=None, **kwargs)\n  Parameters: url – URL for the new Request object.\n  Returns: Response object\n  Return type: requests.Response"
    },
    {
     "h": {
      "ar": "التوثيق بيتكتب بالمضارع البسيط",
      "en": "Docs are written in the present simple"
     },
     "p": {
      "ar": "عشان كده هتلاقي الأفعال بـ s في الآخر: returns وtakes وraises وaccepts. وده نفس الأسلوب اللي تكتب بيه انت.",
      "en": "That's why verbs end in s: returns, takes, raises, accepts. It's the same style you should write in."
     },
     "ex": "This function returns a list.\nThe method takes two arguments.\nIt raises KeyError if the key is missing."
    },
    {
     "h": {
      "ar": "المبني للمجهول (Passive) منتشر جدًا",
      "en": "The passive voice is everywhere"
     },
     "p": {
      "ar": "بيركّز على الحاجة اللي حصلت مش على مين عملها: is + الفعل في التصريف التالت (V3).",
      "en": "It focuses on what happened, not on who did it: is + the verb's third form (V3)."
     },
     "ex": "The file is created automatically.\nAn exception is raised if the path does not exist.\nThis parameter is ignored when…"
    },
    {
     "h": {
      "ar": "كلمات الخيارات والشروط",
      "en": "Words for options and conditions"
     },
     "p": {
      "ar": "optional (اختياري)، required (إجباري)، default (القيمة الافتراضية)، if omitted (لو ما اتبعتش)، must (لازم)، should (المفروض)، may (ممكن).",
      "en": "optional, required, default, if omitted (if not provided), must, should, may."
     },
     "ex": "timeout (optional): Number of seconds to wait. Defaults to None.\nThe name must be unique."
    },
    {
     "h": {
      "ar": "Note وWarning وTip",
      "en": "Note, Warning and Tip"
     },
     "p": {
      "ar": "Note = معلومة إضافية مهمة. Warning = خطر أو حاجة ممكن تضيّع بيانات. Tip = نصيحة. Deprecated since = قديمة من إصدار كذا.",
      "en": "Note = extra important information. Warning = a danger, or something that could lose data. Tip = advice. Deprecated since = old since version X."
     },
     "ex": "Warning: This operation cannot be undone.\nNote: Only available in version 2.0 and later."
    },
    {
     "h": {
      "ar": "اقرا بذكاء (Skimming)",
      "en": "Read smart (skimming)"
     },
     "p": {
      "ar": "متقراش صفحة التوثيق كلها. اقرا أول جملة، وبعدين Parameters وReturns، وبعدين المثال. ولو لسه مش فاهم، ارجع للوصف.",
      "en": "Don't read the whole docs page. Read the first sentence, then Parameters and Returns, then the example. If it's still unclear, go back to the description."
     },
     "ex": "1) First sentence  2) Parameters  3) Returns  4) Example"
    }
   ],
   "practice": [
    {
     "ar": "افتح صفحة `str.split` في توثيق Python الرسمي، وحدد: بتاخد إيه، وبترجع إيه، وإيه الـ default",
     "en": "Open the `str.split` page in the official Python docs and find: what it takes, what it returns, and what the default is"
    },
    {
     "ar": "افتح صفحة `requests.get` واكتب معنى كل parameter بالعربي في سطر",
     "en": "Open the `requests.get` page and write the meaning of each parameter in one line"
    },
    {
     "ar": "دوّر في 3 صفحات توثيق على كلمات `optional` و`default` و`must` و`raises`، واكتب الجمل اللي فيها",
     "en": "Search 3 docs pages for the words `optional`, `default`, `must` and `raises`, and copy the sentences they appear in"
    },
    {
     "ar": "حوّل 5 جمل من التوثيق لجملك انت بنفس القاعدة (Present simple و Passive)",
     "en": "Rewrite 5 sentences from the docs as your own sentences using the same rule (present simple and passive)"
    },
    {
     "ar": "اقرا صفحة توثيق كاملة بطريقة Skimming في 5 دقايق بس، وبعدين لخّصها في 3 جمل إنجليزي",
     "en": "Skim a full docs page in just 5 minutes, then summarize it in 3 English sentences"
    },
    {
     "ar": "افتح أي صفحة وخلي DeepL في تاب تاني، ومتفتحوش غير للكلمة اللي فهمتهاش من السياق",
     "en": "Open any page with DeepL in another tab, and only use it for words you couldn't work out from context"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "قالب قراءة أي دالة",
      "en": "A template for reading any function"
     },
     "p": "Function: ___\nIt takes: ___ (required) and ___ (optional, default = ___)\nIt returns: ___\nIt raises: ___ when ___"
    },
    {
     "u": {
      "ar": "اكتب docstring زي التوثيق",
      "en": "Write a docstring like the docs"
     },
     "p": "def clean_email(email: str) -> str:\n    \"\"\"Return the email in lowercase without spaces.\n\n    Raises ValueError if the email is empty.\n    \"\"\""
    },
    {
     "u": {
      "ar": "جمل Passive مفيدة",
      "en": "Useful passive sentences"
     },
     "p": "The data is saved to the database.\nThe email is sent after the form is submitted.\nThis value is calculated automatically."
    }
   ],
   "words": [
    {
     "t": "argument",
     "m": {
      "ar": "وسيط — القيمة اللي بتبعتها للدالة",
      "en": "The value you pass to a function"
     },
     "ex": "Pass the file name as the first argument."
    },
    {
     "t": "parameter",
     "m": {
      "ar": "مُعامل — الاسم اللي بتستقبل بيه الدالة الوسيط",
      "en": "The name a function uses to receive an argument"
     },
     "ex": "The function has two parameters: name and age."
    },
    {
     "t": "return",
     "m": {
      "ar": "إرجاع قيمة من الدالة",
      "en": "Giving a value back from a function"
     },
     "ex": "The function returns None if nothing is found."
    },
    {
     "t": "version",
     "m": {
      "ar": "إصدار الحزمة أو البرنامج",
      "en": "The version of a package or program"
     },
     "ex": "Which version of Python are you using?"
    },
    {
     "t": "default value",
     "m": {
      "ar": "القيمة الافتراضية لو ما حددتش حاجة",
      "en": "The value used if you don't set one"
     },
     "ex": "The default value of timeout is 30 seconds."
    },
    {
     "t": "optional",
     "m": {
      "ar": "اختياري",
      "en": "Not required"
     },
     "ex": "timeout (optional): seconds to wait."
    },
    {
     "t": "required",
     "m": {
      "ar": "إجباري",
      "en": "Must be provided"
     },
     "ex": "The url parameter is required."
    },
    {
     "t": "defaults to",
     "m": {
      "ar": "القيمة الافتراضية هي",
      "en": "The default value is"
     },
     "ex": "Defaults to None."
    },
    {
     "t": "if omitted",
     "m": {
      "ar": "لو ما اتبعتش",
      "en": "If not provided"
     },
     "ex": "If omitted, the current date is used."
    },
    {
     "t": "returns",
     "m": {
      "ar": "بيرجّع",
      "en": "Gives back"
     },
     "ex": "Returns a list of strings."
    },
    {
     "t": "raises",
     "m": {
      "ar": "بيرمي (خطأ)",
      "en": "Throws (an error)"
     },
     "ex": "Raises KeyError if the key is not found."
    },
    {
     "t": "iterable",
     "m": {
      "ar": "حاجة تقدر تلف عليها (list، string…)",
      "en": "Something you can loop over (list, string…)"
     },
     "ex": "Accepts any iterable, such as a list or a tuple."
    },
    {
     "t": "callable",
     "m": {
      "ar": "حاجة تقدر تناديها زي الدالة",
      "en": "Something you can call like a function"
     },
     "ex": "key must be a callable that takes one argument."
    },
    {
     "t": "supported",
     "m": {
      "ar": "مدعوم",
      "en": "Works with / is allowed"
     },
     "ex": "Only UTF-8 is supported."
    },
    {
     "t": "undo",
     "m": {
      "ar": "ترجع في خطوة",
      "en": "To reverse a step"
     },
     "ex": "This action cannot be undone."
    },
    {
     "t": "note / warning",
     "m": {
      "ar": "ملاحظة / تحذير في التوثيق",
      "en": "A note / warning in the docs"
     },
     "ex": "Note: available since version 2.0."
    },
    {
     "t": "backward compatible",
     "m": {
      "ar": "متوافق مع الإصدارات القديمة",
      "en": "Works with older versions"
     },
     "ex": "The new version is backward compatible."
    }
   ],
   "read": [
    {
     "t": "Reverso Context",
     "url": "https://context.reverso.net/",
     "what": {
      "ar": "استخدمه لما مش عارف تحط الكلمة في جملة.",
      "en": "Use it when you don't know how to put a word in a sentence."
     }
    },
    {
     "t": "Google Developer Documentation Style Guide",
     "url": "https://developers.google.com/style",
     "what": {
      "ar": "Highlights (صفحة واحدة) + Word list كمرجع.",
      "en": "Highlights (one page) + the Word list as a reference."
     }
    },
    {
     "t": {
      "ar": "Python Tutorial (الرسمي)",
      "en": "The Python Tutorial (official)"
     },
     "url": "https://docs.python.org/3/tutorial/",
     "what": {
      "ar": "قسم 3 و4: اقرا من غير ترجمة، ودوّن الكلمات الجديدة.",
      "en": "Sections 3 and 4: read without translating and note new words."
     }
    },
    {
     "t": "freeCodeCamp News",
     "url": "https://www.freecodecamp.org/news/",
     "what": {
      "ar": "مقال قصير في اليوم في موضوع بتتعلمه.",
      "en": "One short article a day on the topic you're learning."
     }
    }
   ],
   "challenge": {
    "ar": "اختار دالة في مكتبة بتستخدمها (من Python أو n8n). اكتب لها «صفحة توثيق» صغيرة بالإنجليزي فيها Description وParameters وReturns وExample وNote. واستخدم Passive مرتين على الأقل.",
    "en": "Pick a function in a library you use (Python or n8n). Write a small English “docs page” for it with Description, Parameters, Returns, Example and Note. Use the passive at least twice."
   },
   "quiz": [
    {
     "q": {
      "ar": "في صفحة التوثيق، القسم اللي بيقولك الدالة بترجّع إيه اسمه؟",
      "en": "On a docs page, what's the section that tells you what the function returns called?"
     },
     "o": [
      "Parameters",
      "Returns",
      "Raises",
      "Example"
     ],
     "a": 1,
     "why": {
      "ar": "Returns = اللي الدالة بترجّعه (الناتج).",
      "en": "Returns = what the function gives back (the output)."
     }
    },
    {
     "q": {
      "ar": "\"timeout (optional). Defaults to None.\" يعني؟",
      "en": "What does \"timeout (optional). Defaults to None.\" mean?"
     },
     "o": [
      {
       "ar": "لازم تبعت timeout",
       "en": "You must send timeout"
      },
      {
       "ar": "ممكن تبعته، ولو ما بعتوش قيمته None",
       "en": "You can send it, and if you don't, its value is None"
      },
      {
       "ar": "timeout ممنوع",
       "en": "timeout is not allowed"
      },
      {
       "ar": "timeout بيبقى صفر",
       "en": "timeout is zero"
      }
     ],
     "a": 1,
     "why": {
      "ar": "optional = اختياري، Defaults to = القيمة لو ما حددتش حاجة.",
      "en": "optional = not required; Defaults to = the value if you don't set one."
     }
    },
    {
     "q": {
      "ar": "أنهي جملة مكتوبة بأسلوب التوثيق الصح؟",
      "en": "Which sentence is written in proper docs style?"
     },
     "o": [
      "This function return a list.",
      "This function returns a list.",
      "This function is return a list.",
      "This function returning a list."
     ],
     "a": 1,
     "why": {
      "ar": "مضارع بسيط مع he/she/it فبناخد s: returns.",
      "en": "Present simple with he/she/it takes an s: returns."
     }
    }
   ]
  },
  {
   "d": 3,
   "title": {
    "ar": "لغة الكود: الأسماء والتعليقات والـ Docstrings",
    "en": "The language of code: names, comments and docstrings"
   },
   "goal": {
    "ar": "تفهم أسماء الدوال والمتغيرات من أول نظرة، وتسمّي حاجتك بإنجليزي صح، وتكتب تعليقات واضحة.",
    "en": "Understand function and variable names at a glance, name your own things in correct English, and write clear comments."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "أسماء الدوال بتبدأ بفعل",
      "en": "Function names start with a verb"
     },
     "p": {
      "ar": "الدالة بتعمل حاجة، فاسمها بيبدأ بفعل: get وset وfetch وload وsave وparse وvalidate وconvert وhandle وsend وbuild وcalculate.",
      "en": "A function does something, so its name starts with a verb: get, set, fetch, load, save, parse, validate, convert, handle, send, build, calculate."
     },
     "ex": "get_user(), fetch_orders(), parse_date(), validate_email(),\nsend_invoice(), calculate_total(), handle_error()"
    },
    {
     "h": {
      "ar": "المتغيرات أسماء، والـ Boolean سؤال",
      "en": "Variables are nouns; booleans are questions"
     },
     "p": {
      "ar": "المتغير اسم (user وorders وtotal_price). والقيم اللي True/False بتبدأ بـ is أو has أو can أو should.",
      "en": "A variable is a noun (user, orders, total_price). True/False values start with is, has, can or should."
     },
     "ex": {
      "ar": "is_active, has_paid, can_edit, should_retry\nuser_count (مش count_user)",
      "en": "is_active, has_paid, can_edit, should_retry\nuser_count (not count_user)"
     }
    },
    {
     "h": {
      "ar": "المفرد والجمع",
      "en": "Singular and plural"
     },
     "p": {
      "ar": "قايمة = اسم جمع (users)، وعنصر واحد = مفرد (user). ولو في حلقة: for user in users.",
      "en": "A list = a plural noun (users); one element = singular (user). In a loop: for user in users."
     },
     "ex": "for order in orders:\n    total += order.amount"
    },
    {
     "h": {
      "ar": "التعليقات: اشرح «ليه» مش «إيه»",
      "en": "Comments: explain “why”, not “what”"
     },
     "p": {
      "ar": "الكود بيقول بيعمل إيه، والتعليق يقول ليه. وخلّيه قصير وبصيغة الأمر أو المضارع. وTODO وFIXME وNOTE ليهم معنى متفق عليه.",
      "en": "The code says what it does; the comment says why. Keep it short, in the imperative or present tense. TODO, FIXME and NOTE have agreed meanings."
     },
     "ex": "# Retry 3 times because the API sometimes returns 502\n# TODO: move this key to an environment variable\n# FIXME: fails when the list is empty"
    },
    {
     "h": {
      "ar": "اختصارات بتتكرر",
      "en": "Common abbreviations"
     },
     "p": {
      "ar": "args (arguments)، kwargs (keyword arguments)، init (initialize)، config (configuration)، env (environment)، repo (repository)، auth (authentication)، db (database)، msg (message)، idx (index)، tmp (temporary)، err (error).",
      "en": "args (arguments), kwargs (keyword arguments), init (initialize), config (configuration), env (environment), repo (repository), auth (authentication), db (database), msg (message), idx (index), tmp (temporary), err (error)."
     },
     "ex": "def __init__(self, config):\n    self.db = connect(config[\"db_url\"])"
    },
    {
     "h": "Naming conventions",
     "p": {
      "ar": "snake_case في Python، وcamelCase في JavaScript، وPascalCase للـ classes، وUPPER_CASE للثوابت.",
      "en": "snake_case in Python, camelCase in JavaScript, PascalCase for classes, and UPPER_CASE for constants."
     },
     "ex": "max_retries (Python)  maxRetries (JS)\nclass UserAccount    API_BASE_URL = \"…\""
    }
   ],
   "practice": [
    {
     "ar": "افتح أي كود Python أو JavaScript عندك، واكتب معنى 15 اسم (دوال ومتغيرات) بالعربي",
     "en": "Open any Python or JavaScript code you have and write the meaning of 15 names (functions and variables)"
    },
    {
     "ar": "غيّر أسماء 5 متغيرات في كودك لأسماء إنجليزي أوضح (مثلاً `x` ← `total_price`)",
     "en": "Rename 5 variables in your code to clearer English names (e.g. `x` → `total_price`)"
    },
    {
     "ar": "اكتب 5 تعليقات بتشرح «ليه» في كودك، مش «إيه»",
     "en": "Write 5 comments in your code that explain “why”, not “what”"
    },
    {
     "ar": "حوّل 10 أسماء من snake_case لـ camelCase والعكس",
     "en": "Convert 10 names from snake_case to camelCase and back"
    },
    {
     "ar": "اقرا ملف فيه TODO وFIXME في أي مشروع على GitHub وترجمهم",
     "en": "Read a file with TODO and FIXME comments in any project on GitHub and translate them"
    },
    {
     "ar": "افتح «من كتابك مباشرة» في بنك المفردات واقرا أمثلتها بصوت عالي",
     "en": "Open “From your book” in the vocabulary bank and read its examples out loud"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "أسماء كويسة مقابل أسماء وحشة",
      "en": "Good names vs bad names"
     },
     "p": "# Bad\ndef f(l):\n    t = 0\n    for i in l: t += i\n    return t\n\n# Good\ndef calculate_total(prices):\n    total = 0\n    for price in prices:\n        total += price\n    return total"
    },
    {
     "u": {
      "ar": "تعليقات بتشرح السبب",
      "en": "Comments that explain the reason"
     },
     "p": "# Use UTC so reports match across time zones\ncreated_at = datetime.now(timezone.utc)\n\n# NOTE: the API limits us to 60 requests per minute\ntime.sleep(1)"
    },
    {
     "u": {
      "ar": "أفعال الأسماء وأشهر معانيها",
      "en": "Naming verbs and their usual meanings"
     },
     "p": {
      "ar": "fetch  = يجيب من مكان بعيد (API)\nparse  = يحلّل نص لشكل مفهوم\nvalidate = يتأكد إنه صح\nhandle = يتعامل مع\nrender = يعرض / يرسم",
      "en": "fetch  = get from somewhere remote (an API)\nparse  = turn text into a usable structure\nvalidate = check that it's correct\nhandle = deal with\nrender = display / draw"
     }
    }
   ],
   "words": [
    {
     "t": "variable",
     "m": {
      "ar": "متغيّر — مكان بيتخزن فيه قيمة",
      "en": "A place where a value is stored"
     },
     "ex": "The variable \"total\" stores the final price."
    },
    {
     "t": "function",
     "m": {
      "ar": "دالة — كتلة كود بتنفذ مهمة معينة",
      "en": "A block of code that performs a specific task"
     },
     "ex": "This function sends an email to every new user."
    },
    {
     "t": "comment",
     "m": {
      "ar": "تعليق في الكود (بيبدأ بـ #)",
      "en": "A note in the code (starts with #)"
     },
     "ex": "Write a comment to explain why this line is needed."
    },
    {
     "t": "refactor",
     "m": {
      "ar": "إعادة تنظيم الكود من غير ما تغيّر وظيفته",
      "en": "Reorganizing code without changing what it does"
     },
     "ex": "I refactored the code to make it easier to read."
    },
    {
     "t": "naming convention",
     "m": {
      "ar": "قاعدة تسمية المتغيّرات (زي snake_case)",
      "en": "A rule for naming variables (like snake_case)"
     },
     "ex": "Python uses snake_case as its naming convention."
    },
    {
     "t": "hardcode",
     "m": {
      "ar": "كتابة قيمة ثابتة جوه الكود بدل ما تكون متغيّرة",
      "en": "Writing a fixed value into the code instead of making it configurable"
     },
     "ex": "Do not hardcode the password in the script."
    },
    {
     "t": "fetch",
     "m": {
      "ar": "يجيب (من مكان بعيد زي API)",
      "en": "To get (from somewhere remote, like an API)"
     },
     "ex": "fetch_orders() gets orders from the API."
    },
    {
     "t": "validate",
     "m": {
      "ar": "يتأكد إنه صحيح",
      "en": "To check that it's correct"
     },
     "ex": "validate_email() returns True if the email is valid."
    },
    {
     "t": "handle",
     "m": {
      "ar": "يتعامل مع",
      "en": "To deal with"
     },
     "ex": "handle_error() logs the error and sends an alert."
    },
    {
     "t": "render",
     "m": {
      "ar": "يعرض / يرسم على الشاشة",
      "en": "To display / draw on screen"
     },
     "ex": "The page renders the list of products."
    },
    {
     "t": "initialize (init)",
     "m": {
      "ar": "يجهّز القيم الأولية",
      "en": "To set up the starting values"
     },
     "ex": "Initialize the counter to zero."
    },
    {
     "t": "TODO / FIXME",
     "m": {
      "ar": "لسه هيتعمل / مشكلة لازم تتصلح",
      "en": "Still to be done / a problem that must be fixed"
     },
     "ex": "# TODO: add pagination"
    },
    {
     "t": "docstring",
     "m": {
      "ar": "نص توثيق جوه الدالة",
      "en": "Documentation text inside a function"
     },
     "ex": "\"\"\"Return the total price including tax.\"\"\""
    },
    {
     "t": "snake_case / camelCase",
     "m": {
      "ar": "طرق كتابة الأسماء",
      "en": "Ways of writing names"
     },
     "ex": "max_retries vs maxRetries"
    },
    {
     "t": "config",
     "m": {
      "ar": "إعدادات (configuration)",
      "en": "Settings (configuration)"
     },
     "ex": "Load the config from settings.json."
    }
   ],
   "read": [
    {
     "t": {
      "ar": "Automate the Boring Stuff (النسخة الإنجليزي)",
      "en": "Automate the Boring Stuff (English edition)"
     },
     "url": "https://automatetheboringstuff.com/",
     "what": {
      "ar": "نفس الفصل اللي بتذاكره بالعربي: اقرا صفحة بالإنجليزي الأول.",
      "en": "The same chapter you're studying in Arabic: read one page in English first."
     }
    }
   ],
   "challenge": {
    "ar": "خد سكربت كتبته قبل كده (20 سطر على الأقل). غيّر كل الأسماء لإنجليزي واضح، وضيف docstring لكل دالة، و3 تعليقات بتشرح «ليه». وبعدين اشرح السكربت بصوت عالي بالإنجليزي في دقيقة.",
    "en": "Take a script you wrote before (at least 20 lines). Rename everything in clear English, add a docstring to every function and 3 comments explaining “why”. Then explain the script out loud in English in one minute."
   },
   "quiz": [
    {
     "q": {
      "ar": "أنسب اسم لدالة بتجيب الطلبات من API؟",
      "en": "Best name for a function that gets orders from an API?"
     },
     "o": [
      "orders()",
      "fetch_orders()",
      "ordersFetching()",
      "o()"
     ],
     "a": 1,
     "why": {
      "ar": "اسم الدالة بيبدأ بفعل، وfetch معناها يجيب من مكان بعيد.",
      "en": "Function names start with a verb, and fetch means getting something from a remote place."
     }
    },
    {
     "q": {
      "ar": "أنسب اسم لمتغير True/False بيقول هل المستخدم دفع؟",
      "en": "Best name for a True/False variable saying whether the user has paid?"
     },
     "o": [
      "paid_user",
      "has_paid",
      "payment",
      "pay"
     ],
     "a": 1,
     "why": {
      "ar": "الـ Boolean بيتسمّى زي سؤال: is_ أو has_ أو can_.",
      "en": "Booleans are named like questions: is_, has_ or can_."
     }
    },
    {
     "q": {
      "ar": "\"# FIXME: fails when the list is empty\" معناها؟",
      "en": "What does \"# FIXME: fails when the list is empty\" mean?"
     },
     "o": [
      {
       "ar": "الكود ده ممتاز",
       "en": "This code is excellent"
      },
      {
       "ar": "فيه مشكلة معروفة لازم تتصلح: بيفشل لو القايمة فاضية",
       "en": "There's a known problem that must be fixed: it fails when the list is empty"
      },
      {
       "ar": "امسح السطر ده",
       "en": "Delete this line"
      },
      {
       "ar": "القايمة لازم تبقى فاضية",
       "en": "The list must be empty"
      }
     ],
     "a": 1,
     "why": {
      "ar": "FIXME = فيه مشكلة لازم تتصلح. TODO = حاجة لسه هتتعمل.",
      "en": "FIXME = there's a problem to fix. TODO = something still to be done."
     }
    }
   ]
  },
  {
   "d": 4,
   "title": {
    "ar": "اكتب: Commits وREADME وتقارير الأخطاء",
    "en": "Writing: commits, READMEs and bug reports"
   },
   "goal": {
    "ar": "تكتب commit messages وREADME وbug reports بالإنجليزي بشكل احترافي، زي اللي بتشوفهم في المشاريع الكبيرة.",
    "en": "Write commit messages, READMEs and bug reports in professional English, like the ones in big projects."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "Commit message بصيغة الأمر",
      "en": "Commit messages in the imperative"
     },
     "p": {
      "ar": "السطر الأول قصير (أقل من 50 حرف تقريبًا)، ويبدأ بفعل أمر من غير نقطة في الآخر. كأنك بتكمّل جملة «If applied, this commit will …».",
      "en": "The first line is short (roughly under 50 characters) and starts with an imperative verb, with no period at the end — as if completing the sentence “If applied, this commit will …”."
     },
     "ex": "Add login with Google\nFix crash when the cart is empty\nUpdate README with setup steps"
    },
    {
     "h": "Conventional Commits",
     "p": {
      "ar": "بادئة بتقول نوع التغيير: feat (ميزة جديدة)، fix (تصليح)، docs (توثيق)، refactor (إعادة تنظيم)، chore (شغل صيانة)، test (اختبارات).",
      "en": "A prefix that says the type of change: feat (new feature), fix (bug fix), docs (documentation), refactor (restructuring), chore (maintenance), test (tests)."
     },
     "ex": "feat: add CSV export\nfix: handle empty email in signup form\ndocs: explain how to run with Docker"
    },
    {
     "h": {
      "ar": "هيكل الـ README",
      "en": "The structure of a README"
     },
     "p": {
      "ar": "Title، وسطر بيقول المشروع بيعمل إيه، وFeatures، وInstallation، وUsage، وConfiguration، وContributing، وLicense.",
      "en": "Title, a line saying what the project does, Features, Installation, Usage, Configuration, Contributing and License."
     },
     "ex": "# Invoice Bot\nSends payment reminders from a Google Sheet.\n## Installation\n## Usage"
    },
    {
     "h": {
      "ar": "تقرير bug احترافي",
      "en": "A professional bug report"
     },
     "p": {
      "ar": "Summary، وSteps to reproduce، وExpected behavior، وActual behavior، وEnvironment (النظام والإصدار)، وScreenshots أو Logs.",
      "en": "Summary, Steps to reproduce, Expected behavior, Actual behavior, Environment (OS and version), and Screenshots or Logs."
     },
     "ex": "Steps to reproduce:\n1. Open the settings page\n2. Click \"Save\" with an empty name\nExpected: an error message\nActual: the page crashes"
    },
    {
     "h": {
      "ar": "الأزمنة اللي هتحتاجها",
      "en": "The tenses you'll need"
     },
     "p": {
      "ar": "Present simple للحقايق (The app sends…). Past simple للي حصل (I clicked…، It crashed…). Present perfect للي حصل ولسه أثره موجود (I have tried…، It has stopped working).",
      "en": "Present simple for facts (The app sends…). Past simple for what happened (I clicked…, It crashed…). Present perfect for what happened and still matters (I have tried…, It has stopped working)."
     },
     "ex": "I clicked \"Save\" and nothing happened.\nI have tried restarting the server.\nThe app sends an email every morning."
    },
    {
     "h": {
      "ar": "اكتب أقصر وأوضح",
      "en": "Write shorter and clearer"
     },
     "p": {
      "ar": "جملة واحدة = فكرة واحدة. شيل very وreally وkind of. واستخدم كلمة بسيطة بدل المعقدة (use بدل utilize).",
      "en": "One sentence = one idea. Cut very, really and kind of. Use the simple word instead of the fancy one (use instead of utilize)."
     },
     "ex": "Before: In order to be able to utilize the tool…\nAfter:  To use the tool…"
    }
   ],
   "practice": [
    {
     "ar": "اكتب 10 commit messages لتغييرات حقيقية أو متخيلة بصيغة Conventional Commits",
     "en": "Write 10 commit messages for real or imagined changes in Conventional Commits format"
    },
    {
     "ar": "صلّح الـ commits دي: `fixed bug`، `changes`، `adding the new login page.`",
     "en": "Fix these commits: `fixed bug`, `changes`, `adding the new login page.`"
    },
    {
     "ar": "اكتب README كامل لمشروع عندك باستخدام القالب اللي تحت",
     "en": "Write a complete README for one of your projects using the template below"
    },
    {
     "ar": "اكتب bug report لمشكلة قابلتك فعلاً بالهيكل الكامل",
     "en": "Write a fully structured bug report for a problem you actually ran into"
    },
    {
     "ar": "افتح 3 issues في مشروع مشهور على GitHub، وحدد فيهم Steps وExpected وActual",
     "en": "Open 3 issues in a popular GitHub project and identify Steps, Expected and Actual in each"
    },
    {
     "ar": "حط الـ README بتاعك في LanguageTool أو Hemingway من المكتبة وصلّح اللي يقولك عليه",
     "en": "Run your README through LanguageTool or Hemingway from the library and fix what it flags"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "قالب README",
      "en": "README template"
     },
     "p": "# Project Name\nOne sentence that explains what it does and for whom.\n\n## Features\n- ...\n\n## Installation\n```bash\npip install -r requirements.txt\n```\n\n## Usage\n```bash\npython main.py --input data.csv\n```\n\n## Configuration\nSet `API_KEY` in a `.env` file.\n\n## License\nMIT"
    },
    {
     "u": {
      "ar": "قالب Bug report",
      "en": "Bug report template"
     },
     "p": "**Summary:** ___ fails when ___.\n\n**Steps to reproduce:**\n1. ___\n2. ___\n\n**Expected behavior:** ___\n**Actual behavior:** ___\n\n**Environment:** Windows 11, Python 3.12, version 1.4.0\n**Logs:**\n```\n(paste the error here)\n```"
    },
    {
     "u": {
      "ar": "Commits جاهزة",
      "en": "Ready-made commits"
     },
     "p": "feat: add daily email report\nfix: prevent duplicate rows in Google Sheets\nrefactor: split main.py into smaller modules\ndocs: add screenshots to README\nchore: update dependencies"
    }
   ],
   "words": [
    {
     "t": "repository",
     "m": {
      "ar": "مستودع الكود",
      "en": "A code repository"
     },
     "ex": "Clone the repository to your computer."
    },
    {
     "t": "commit",
     "m": {
      "ar": "حفظ نسخة من التعديلات",
      "en": "Saving a snapshot of your changes"
     },
     "ex": "Commit your changes with a clear message."
    },
    {
     "t": "branch",
     "m": {
      "ar": "فرع منفصل من الكود",
      "en": "A separate line of development in the code"
     },
     "ex": "Create a new branch for this feature."
    },
    {
     "t": "merge",
     "m": {
      "ar": "دمج فرعين مع بعض",
      "en": "Combining two branches"
     },
     "ex": "Merge your branch into main after the review."
    },
    {
     "t": "bug",
     "m": {
      "ar": "عيب برمجي بيسبب سلوك غلط",
      "en": "A defect that causes wrong behavior"
     },
     "ex": "We found a bug in the login page."
    },
    {
     "t": "feat / fix / docs",
     "m": {
      "ar": "أنواع الـ commits في Conventional Commits",
      "en": "Commit types in Conventional Commits"
     },
     "ex": "fix: handle empty email"
    },
    {
     "t": "steps to reproduce",
     "m": {
      "ar": "خطوات تكرار المشكلة",
      "en": "The steps to make the problem happen again"
     },
     "ex": "Steps to reproduce: 1. Open settings 2. Click Save"
    },
    {
     "t": "expected / actual behavior",
     "m": {
      "ar": "السلوك المتوقع / اللي حصل فعلاً",
      "en": "What should happen / what actually happened"
     },
     "ex": "Expected: a message. Actual: a crash."
    },
    {
     "t": "workaround",
     "m": {
      "ar": "حل مؤقت لحد ما المشكلة تتصلح",
      "en": "A temporary fix until the real problem is solved"
     },
     "ex": "As a workaround, restart the app."
    },
    {
     "t": "changelog",
     "m": {
      "ar": "سجل التغييرات بين الإصدارات",
      "en": "A record of changes between versions"
     },
     "ex": "See the changelog for breaking changes."
    },
    {
     "t": "breaking change",
     "m": {
      "ar": "تغيير بيبوّظ الكود القديم",
      "en": "A change that breaks existing code"
     },
     "ex": "Version 2.0 has breaking changes."
    },
    {
     "t": "pull request (PR)",
     "m": {
      "ar": "طلب دمج تعديلاتك في المشروع",
      "en": "A request to merge your changes into the project"
     },
     "ex": "I opened a pull request with the fix."
    },
    {
     "t": "review",
     "m": {
      "ar": "مراجعة",
      "en": "A review"
     },
     "ex": "Could you review my PR?"
    }
   ],
   "read": [
    {
     "t": "Google Technical Writing Courses",
     "url": "https://developers.google.com/tech-writing",
     "what": {
      "ar": "Technical Writing One: الوحدات Words وActive voice وShort sentences وLists.",
      "en": "Technical Writing One: the Words, Active voice, Short sentences and Lists units."
     }
    },
    {
     "t": "Google Developer Documentation Style Guide",
     "url": "https://developers.google.com/style",
     "what": {
      "ar": "Highlights (صفحة واحدة) + Word list كمرجع.",
      "en": "Highlights (one page) + the Word list as a reference."
     }
    },
    {
     "t": "Conventional Commits",
     "url": "https://www.conventionalcommits.org/",
     "what": {
      "ar": "Summary وExamples (10 دقايق).",
      "en": "Summary and Examples (10 minutes)."
     }
    },
    {
     "t": "Make a README",
     "url": "https://www.makeareadme.com/",
     "what": "Suggestions for a good README."
    },
    {
     "t": "How to Write a Git Commit Message",
     "url": "https://cbea.ms/git-commit/",
     "what": {
      "ar": "The seven rules (10 دقايق).",
      "en": "The seven rules (10 minutes)."
     }
    },
    {
     "t": "Keep a Changelog",
     "url": "https://keepachangelog.com/",
     "what": {
      "ar": "الصفحة كلها (10 دقايق).",
      "en": "The whole page (10 minutes)."
     }
    },
    {
     "t": "LanguageTool",
     "url": "https://languagetool.org/",
     "what": {
      "ar": "حط فيه كل README وإيميل قبل ما تبعته.",
      "en": "Run every README and email through it before sending."
     }
    },
    {
     "t": "Hemingway Editor",
     "url": "https://hemingwayapp.com/",
     "what": {
      "ar": "حط فيه README بتاعك وقصّر الجمل الحمرا.",
      "en": "Paste your README and shorten the red sentences."
     }
    },
    {
     "t": "Purdue OWL",
     "url": "https://owl.purdue.edu/",
     "what": {
      "ar": "General Writing ← Punctuation و Professional Writing ← Email.",
      "en": "General Writing → Punctuation, and Professional Writing → Email."
     }
    },
    {
     "t": "GitHub ReadME Guides",
     "url": "https://github.com/readme/guides",
     "what": {
      "ar": "اختار مقال عن documentation أو README.",
      "en": "Pick an article about documentation or READMEs."
     }
    }
   ],
   "challenge": {
    "ar": "ارفع مشروع صغير على GitHub فيه: README كامل بالقالب، و5 commits على الأقل بصيغة Conventional Commits، وissue واحد فيه bug report بالهيكل الكامل. كله بالإنجليزي ومن غير مترجم.",
    "en": "Push a small project to GitHub with: a complete README from the template, at least 5 commits in Conventional Commits format, and one issue containing a fully structured bug report. All in English, with no translator."
   },
   "quiz": [
    {
     "q": {
      "ar": "أنهي commit message مكتوب صح؟",
      "en": "Which commit message is written correctly?"
     },
     "o": [
      "fixed the bug.",
      "Fix crash when cart is empty",
      "fixing some stuff",
      "Bug fix!!!"
     ],
     "a": 1,
     "why": {
      "ar": "صيغة أمر، وقصير، ومحدد، ومن غير نقطة في الآخر.",
      "en": "Imperative, short, specific, and no period at the end."
     }
    },
    {
     "q": {
      "ar": "في Conventional Commits، ميزة جديدة بتبدأ بإيه؟",
      "en": "In Conventional Commits, what does a new feature start with?"
     },
     "o": [
      "fix:",
      "feat:",
      "new:",
      "add:"
     ],
     "a": 1,
     "why": {
      "ar": "feat = feature جديدة. fix = تصليح bug.",
      "en": "feat = a new feature. fix = a bug fix."
     }
    },
    {
     "q": {
      "ar": "في bug report، \"Expected behavior\" معناه؟",
      "en": "In a bug report, what does \"Expected behavior\" mean?"
     },
     "o": [
      {
       "ar": "اللي حصل فعلاً",
       "en": "What actually happened"
      },
      {
       "ar": "اللي كان المفروض يحصل",
       "en": "What should have happened"
      },
      {
       "ar": "خطوات إعادة المشكلة",
       "en": "The steps to reproduce the problem"
      },
      {
       "ar": "نسخة البرنامج",
       "en": "The program version"
      }
     ],
     "a": 1,
     "why": {
      "ar": "Expected = المتوقع، وActual = اللي حصل فعلاً.",
      "en": "Expected = what should happen; Actual = what really happened."
     }
    }
   ]
  },
  {
   "d": 5,
   "title": {
    "ar": "التواصل: تسأل وتطلب وترد على عميل",
    "en": "Communication: asking, requesting and replying to clients"
   },
   "goal": {
    "ar": "تكتب سؤال في منتدى بيجيب ردود، ورسايل Slack وإيميلات مهذبة وواضحة لزمايلك وللعملاء.",
    "en": "Write forum questions that get answers, and polite, clear Slack messages and emails for teammates and clients."
   },
   "minutes": 120,
   "learn": [
    {
     "h": {
      "ar": "سؤال بيجيب رد",
      "en": "A question that gets answered"
     },
     "p": {
      "ar": "عنوان محدد، واللي انت عايز تعمله، واللي جرّبته، والخطأ بالظبط، والكود المختصر اللي بيطلّع المشكلة. ومتقولش «urgent» ولا «plz».",
      "en": "A specific title, what you want to do, what you tried, the exact error, and a minimal code sample that reproduces it. Don't say “urgent” or “plz”."
     },
     "ex": "Title: TypeError when adding price and tax in Python\nI am trying to…  I tried…  I get this error:…"
    },
    {
     "h": {
      "ar": "الطلب بأدب",
      "en": "Asking politely"
     },
     "p": {
      "ar": "Could you…? وWould you mind…? وI was wondering if… أكتر احترامًا من Give me… أو I want….",
      "en": "Could you…?, Would you mind…? and I was wondering if… are more respectful than Give me… or I want…."
     },
     "ex": "Could you review my pull request when you have time?\nWould you mind sharing the logs?"
    },
    {
     "h": {
      "ar": "أفعال مركّبة (Phrasal verbs) في الشغل",
      "en": "Phrasal verbs at work"
     },
     "p": {
      "ar": "set up (يجهّز)، log in (يسجّل دخول)، sign up (يعمل حساب)، look into (يبحث في)، figure out (يفهم/يحل)، run into (يقابل مشكلة)، follow up (يتابع)، roll back (يرجّع نسخة)، back up (ياخد نسخة احتياطية).",
      "en": "set up, log in, sign up, look into (investigate), figure out (understand/solve), run into (hit a problem), follow up, roll back (revert a version), back up (make a backup)."
     },
     "ex": "I ran into an issue while setting up the server.\nI will look into it and follow up tomorrow."
    },
    {
     "h": {
      "ar": "إيميل لعميل",
      "en": "An email to a client"
     },
     "p": {
      "ar": "تحية، وسبب الرسالة في أول سطر، والتفاصيل في نقاط، والخطوة الجاية بتاريخ، والختام.",
      "en": "A greeting, the reason for the message in the first line, the details as bullet points, the next step with a date, and a sign-off."
     },
     "ex": "Hi Sarah,\nQuick update on the automation project:\n- The Sheets integration is done.\n- Testing starts Monday.\nI will send a demo video by Thursday.\nBest regards,"
    },
    {
     "h": {
      "ar": "تعتذر وتصلّح من غير ما تقلل من نفسك",
      "en": "Apologize and fix without putting yourself down"
     },
     "p": {
      "ar": "متكترش sorry. قول اللي حصل، والحل، والتوقيت.",
      "en": "Don't overuse sorry. Say what happened, the fix, and the timing."
     },
     "ex": "Thanks for flagging this. The issue was caused by a wrong date format. It is fixed now, and I added a check so it will not happen again."
    },
    {
     "h": {
      "ar": "Standup في 3 جمل",
      "en": "A standup in 3 sentences"
     },
     "p": {
      "ar": "Yesterday I… Today I will… Blockers: …، أو No blockers.",
      "en": "Yesterday I… Today I will… Blockers: …, or No blockers."
     },
     "ex": "Yesterday I finished the login page.\nToday I will write tests for it.\nNo blockers."
    }
   ],
   "practice": [
    {
     "ar": "اكتب سؤال كامل عن مشكلة حقيقية بالهيكل (Title، Goal، Tried، Error، Code)",
     "en": "Write a full question about a real problem using the structure (Title, Goal, Tried, Error, Code)"
    },
    {
     "ar": "حوّل 5 جمل «أوامر» لطلبات مؤدبة بـ Could you أو Would you mind",
     "en": "Turn 5 “command” sentences into polite requests with Could you or Would you mind"
    },
    {
     "ar": "اكتب 8 جمل، كل جملة فيها phrasal verb من الدرس",
     "en": "Write 8 sentences, each using a phrasal verb from the lesson"
    },
    {
     "ar": "اكتب إيميل update لعميل عن مشروع (حقيقي أو متخيل)",
     "en": "Write an update email to a client about a project (real or imagined)"
    },
    {
     "ar": "اكتب رد على عميل زعلان بسبب bug، بالطريقة اللي في الدرس",
     "en": "Write a reply to a client who's upset about a bug, the way the lesson shows"
    },
    {
     "ar": "اكتب standup لـ 3 أيام متتالية",
     "en": "Write a standup for 3 days in a row"
    }
   ],
   "code": [
    {
     "u": {
      "ar": "قالب سؤال في منتدى أو Stack Overflow",
      "en": "Template for a forum or Stack Overflow question"
     },
     "p": "Title: [Error type] when [doing what] in [tool/language]\n\nI am trying to ___.\nI tried ___ and ___, but I get this error:\n\n```\n(paste the full error)\n```\n\nHere is a minimal example:\n```\n(10 lines or less)\n```\nWhat am I missing?"
    },
    {
     "u": {
      "ar": "قالب update لعميل",
      "en": "Template for a client update"
     },
     "p": "Hi ___,\n\nQuick update on ___:\n- Done: ___\n- In progress: ___\n- Next: ___ (by ___)\n\nLet me know if you have any questions.\n\nBest regards,\n___"
    },
    {
     "u": {
      "ar": "جمل Slack سريعة",
      "en": "Quick Slack sentences"
     },
     "p": "Quick question: ___?\nI'm looking into it now.\nThanks, that fixed it!\nCould you take a look at this when you have a minute?\nHeads-up: the server will be down at 10 PM for maintenance."
    }
   ],
   "words": [
    {
     "t": "request",
     "m": {
      "ar": "طلب (من متصفح لسيرفر)",
      "en": "A request (from a browser to a server)"
     },
     "ex": "The browser sends a request to the server."
    },
    {
     "t": "set up",
     "m": {
      "ar": "يجهّز / يعمل الإعداد",
      "en": "To prepare / configure"
     },
     "ex": "I set up the server yesterday."
    },
    {
     "t": "figure out",
     "m": {
      "ar": "يفهم / يلاقي حل",
      "en": "To understand / find a solution"
     },
     "ex": "I figured out why the test fails."
    },
    {
     "t": "run into",
     "m": {
      "ar": "يقابل (مشكلة)",
      "en": "To come across (a problem)"
     },
     "ex": "I ran into an error with the API."
    },
    {
     "t": "look into",
     "m": {
      "ar": "يبحث ويحقق في",
      "en": "To investigate"
     },
     "ex": "I will look into it today."
    },
    {
     "t": "follow up",
     "m": {
      "ar": "يتابع",
      "en": "To check back later"
     },
     "ex": "I will follow up by email tomorrow."
    },
    {
     "t": "roll back",
     "m": {
      "ar": "يرجّع لنسخة قديمة",
      "en": "To go back to an older version"
     },
     "ex": "We rolled back the last deploy."
    },
    {
     "t": "heads-up",
     "m": {
      "ar": "تنبيه مسبق",
      "en": "An advance warning"
     },
     "ex": "Heads-up: the server restarts at 10 PM."
    },
    {
     "t": "blocker",
     "m": {
      "ar": "حاجة موقفة شغلك",
      "en": "Something that's stopping your work"
     },
     "ex": "No blockers today."
    },
    {
     "t": "deadline",
     "m": {
      "ar": "آخر موعد",
      "en": "The final date"
     },
     "ex": "The deadline is Thursday."
    },
    {
     "t": "ETA",
     "m": {
      "ar": "الوقت المتوقع للانتهاء",
      "en": "The expected time of completion"
     },
     "ex": "What is the ETA for the fix?"
    }
   ],
   "read": [
    {
     "t": "Reverso Context",
     "url": "https://context.reverso.net/",
     "what": {
      "ar": "استخدمه لما مش عارف تحط الكلمة في جملة.",
      "en": "Use it when you don't know how to put a word in a sentence."
     }
    },
    {
     "t": "Stack Overflow: How to ask a good question",
     "url": "https://stackoverflow.com/help/how-to-ask",
     "what": {
      "ar": "الصفحة كلها (5 دقايق)، وبعدين How to create a Minimal Reproducible Example.",
      "en": "The whole page (5 minutes), then How to create a Minimal Reproducible Example."
     }
    },
    {
     "t": "LanguageTool",
     "url": "https://languagetool.org/",
     "what": {
      "ar": "حط فيه كل README وإيميل قبل ما تبعته.",
      "en": "Run every README and email through it before sending."
     }
    }
   ],
   "challenge": {
    "ar": "ابعت (أو جهّز) 3 رسايل حقيقية بالإنجليزي: سؤال في community.n8n.io أو Stack Overflow بالقالب، وإيميل update لعميل أو صاحب، ورد على مشكلة بالطريقة الاحترافية. اقراهم بصوت عالي قبل ما تبعت.",
    "en": "Send (or prepare) 3 real messages in English: a question on community.n8n.io or Stack Overflow using the template, an update email to a client or friend, and a professional reply to a problem. Read them out loud before sending."
   },
   "quiz": [
    {
     "q": {
      "ar": "أنهي أكتر أدب ووضوح؟",
      "en": "Which is the most polite and clear?"
     },
     "o": [
      "Send me the file now.",
      "Could you send me the file when you have a moment?",
      "I want the file.",
      "File please urgent"
     ],
     "a": 1,
     "why": {
      "ar": "Could you… when you have a moment مؤدبة ومحددة.",
      "en": "Could you… when you have a moment is polite and specific."
     }
    },
    {
     "q": {
      "ar": "\"I ran into an issue\" معناها؟",
      "en": "What does \"I ran into an issue\" mean?"
     },
     "o": [
      {
       "ar": "هربت من مشكلة",
       "en": "I escaped a problem"
      },
      {
       "ar": "قابلتني مشكلة",
       "en": "I hit a problem"
      },
      {
       "ar": "حليت مشكلة",
       "en": "I solved a problem"
      },
      {
       "ar": "عملت مشكلة عمدًا",
       "en": "I caused a problem on purpose"
      }
     ],
     "a": 1,
     "why": {
      "ar": "run into = يقابل (مشكلة) من غير ما يتوقعها.",
      "en": "run into = come across (a problem) unexpectedly."
     }
    },
    {
     "q": {
      "ar": "\"I will look into it\" معناها؟",
      "en": "What does \"I will look into it\" mean?"
     },
     "o": [
      {
       "ar": "هبص عليه وخلاص",
       "en": "I'll glance at it and that's it"
      },
      {
       "ar": "هبحث في الموضوع وأشوفه",
       "en": "I'll investigate the issue"
      },
      {
       "ar": "مش هعمل حاجة",
       "en": "I won't do anything"
      },
      {
       "ar": "هقفله",
       "en": "I'll close it"
      }
     ],
     "a": 1,
     "why": {
      "ar": "look into = يبحث ويحقق في مشكلة.",
      "en": "look into = research and investigate a problem."
     }
    }
   ]
  },
  {
   "d": 6,
   "title": {
    "ar": "مراجعة الأسبوع والاختبار",
    "en": "Week review and test"
   },
   "goal": {
    "ar": "راجع الخمس أيام، وسلّم مشروع الأسبوع، وخد الاختبار الأسبوعي. الأسبوع 2 بيفتح لما تجيب 70% أو أكتر.",
    "en": "Review the five days, hand in the weekly project, and take the weekly test. Week 2 opens when you score 70% or more."
   },
   "minutes": 120,
   "review": [
    {
     "ar": "راجع اليوم 1: اقرا رسائل الأخطاء والـ Traceback",
     "en": "Review day 1: Reading error messages and tracebacks"
    },
    {
     "ar": "راجع اليوم 2: اقرا التوثيق (Documentation)",
     "en": "Review day 2: Reading documentation"
    },
    {
     "ar": "راجع اليوم 3: لغة الكود: الأسماء والتعليقات والـ Docstrings",
     "en": "Review day 3: The language of code: names, comments and docstrings"
    },
    {
     "ar": "راجع اليوم 4: اكتب: Commits وREADME وتقارير الأخطاء",
     "en": "Review day 4: Writing: commits, READMEs and bug reports"
    },
    {
     "ar": "راجع اليوم 5: التواصل: تسأل وتطلب وترد على عميل",
     "en": "Review day 5: Communication: asking, requesting and replying to clients"
    }
   ],
   "project": {
    "ar": "اكتب بالإنجليزي لمشروع صغير عندك: README (الوصف، والتشغيل، والاستخدام)، و3 رسائل commit، وbug report واحد، وإيميل قصير لعميل بيشرح اللي عملته. اقراهم بصوت عالي، وصحّح أي كلمة مش متأكد منها بالقاموس.",
    "en": "For a small project of yours, write in English: a README (description, setup, usage), 3 commit messages, one bug report, and a short email to a client explaining what you did. Read them out loud and check any word you are not sure about in a dictionary."
   },
   "test": [
    {
     "q": {
      "ar": "\"This function raises ValueError\" يعني؟",
      "en": "What does \"This function raises ValueError\" mean?"
     },
     "o": [
      {
       "ar": "الدالة بتصلّح ValueError",
       "en": "The function fixes ValueError"
      },
      {
       "ar": "الدالة بترمي خطأ ValueError في حالة معيّنة",
       "en": "The function throws a ValueError in a certain case"
      },
      {
       "ar": "الدالة بتزوّد قيمة",
       "en": "The function increases a value"
      },
      {
       "ar": "الدالة بتتجاهل الخطأ",
       "en": "The function ignores the error"
      }
     ],
     "a": 1,
     "why": {
      "ar": "raise = يرمي/يطلّع خطأ، وده عكس catch/handle.",
      "en": "raise = throw/produce an error — the opposite of catch/handle."
     }
    },
    {
     "q": {
      "ar": "\"The request timed out\" معناها؟",
      "en": "What does \"The request timed out\" mean?"
     },
     "o": [
      {
       "ar": "الطلب نجح بسرعة",
       "en": "The request succeeded quickly"
      },
      {
       "ar": "الطلب خلص وقته من غير رد",
       "en": "The request ran out of time without a reply"
      },
      {
       "ar": "الطلب اتلغى من المستخدم",
       "en": "The user cancelled the request"
      },
      {
       "ar": "الطلب اتبعت مرتين",
       "en": "The request was sent twice"
      }
     ],
     "a": 1,
     "why": {
      "ar": "time out = الوقت المسموح خلص قبل ما الرد يوصل.",
      "en": "time out = the allowed time ran out before the reply arrived."
     }
    },
    {
     "q": {
      "ar": "\"An exception is raised if the file does not exist.\" نوعها؟",
      "en": "What kind of sentence is \"An exception is raised if the file does not exist.\"?"
     },
     "o": [
      "Active",
      {
       "ar": "Passive (مبني للمجهول)",
       "en": "Passive"
      },
      {
       "ar": "سؤال",
       "en": "A question"
      },
      {
       "ar": "أمر",
       "en": "A command"
      }
     ],
     "a": 1,
     "why": {
      "ar": "is + raised (V3) = مبني للمجهول، ومركّز على الخطأ مش على مين رماه.",
      "en": "is + raised (V3) = passive, focusing on the error rather than who raised it."
     }
    },
    {
     "q": {
      "ar": "\"Warning: This operation cannot be undone.\" معناها؟",
      "en": "What does \"Warning: This operation cannot be undone.\" mean?"
     },
     "o": [
      {
       "ar": "العملية دي سريعة",
       "en": "This operation is fast"
      },
      {
       "ar": "مش هتقدر ترجع في العملية دي",
       "en": "You can't reverse this operation"
      },
      {
       "ar": "العملية فيها خطأ",
       "en": "The operation has an error"
      },
      {
       "ar": "العملية مش متاحة",
       "en": "The operation isn't available"
      }
     ],
     "a": 1,
     "why": {
      "ar": "undo = ترجع في الخطوة. cannot be undone = مفيش رجوع.",
      "en": "undo = reverse a step. cannot be undone = there's no going back."
     }
    },
    {
     "q": {
      "ar": "في Python، اسم الثابت بيتكتب إزاي؟",
      "en": "In Python, how is a constant's name written?"
     },
     "o": [
      "maxRetries",
      "max_retries",
      "MAX_RETRIES",
      "MaxRetries"
     ],
     "a": 2,
     "why": {
      "ar": "الثوابت بتتكتب UPPER_CASE.",
      "en": "Constants are written in UPPER_CASE."
     }
    },
    {
     "q": {
      "ar": "\"kwargs\" اختصار لإيه؟",
      "en": "What is \"kwargs\" short for?"
     },
     "o": [
      "key words",
      "keyword arguments",
      "kilo words",
      "known args"
     ],
     "a": 1,
     "why": {
      "ar": "kwargs = keyword arguments، يعني وسائط بالاسم زي timeout=10.",
      "en": "kwargs = keyword arguments, i.e. named arguments like timeout=10."
     }
    },
    {
     "q": {
      "ar": "\"I ___ restarting the server, but it still fails.\" أنسب كلمة؟",
      "en": "\"I ___ restarting the server, but it still fails.\" Best word?"
     },
     "o": [
      "try",
      "have tried",
      "am try",
      "tried to trying"
     ],
     "a": 1,
     "why": {
      "ar": "Present perfect للي عملته ولسه ليه علاقة بالوضع دلوقتي.",
      "en": "Present perfect for something you did that still relates to the situation now."
     }
    },
    {
     "q": {
      "ar": "أبسط بديل لـ \"utilize\"؟",
      "en": "The simplest alternative to \"utilize\"?"
     },
     "o": [
      "utilization",
      "use",
      "make usage",
      "employ of"
     ],
     "a": 1,
     "why": {
      "ar": "في الكتابة التقنية الكلمة البسيطة أحسن دايمًا.",
      "en": "In technical writing the simple word is always better."
     }
    },
    {
     "q": {
      "ar": "إيه اللي لازم يبقى في سؤال المنتدى؟",
      "en": "What must a forum question include?"
     },
     "o": [
      "\"Urgent!!! please help\"",
      {
       "ar": "اللي جرّبته، والخطأ بالظبط، ومثال صغير",
       "en": "What you tried, the exact error, and a small example"
      },
      {
       "ar": "رابط المشروع كله بس",
       "en": "Just a link to the whole project"
      },
      {
       "ar": "اسمك ورقمك",
       "en": "Your name and phone number"
      }
     ],
     "a": 1,
     "why": {
      "ar": "السؤال الواضح اللي فيه محاولاتك والخطأ الكامل هو اللي بياخد رد.",
      "en": "A clear question with your attempts and the full error is the one that gets answered."
     }
    },
    {
     "q": {
      "ar": "\"roll back\" في الشغل معناها؟",
      "en": "What does \"roll back\" mean at work?"
     },
     "o": [
      {
       "ar": "ترجع لنسخة قديمة من الكود أو السيرفر",
       "en": "Go back to an older version of the code or server"
      },
      {
       "ar": "تلف الشاشة",
       "en": "Rotate the screen"
      },
      {
       "ar": "تمسح المشروع",
       "en": "Delete the project"
      },
      {
       "ar": "ترفع نسخة جديدة",
       "en": "Deploy a new version"
      }
     ],
     "a": 0,
     "why": {
      "ar": "roll back = ترجع لإصدار سابق لما الجديد يعمل مشاكل.",
      "en": "roll back = revert to a previous version when the new one causes problems."
     }
    }
   ]
  }
 ]
});
