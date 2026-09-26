<div align="center">

# ⚙️ Developer Journey · رحلة المبرمج

**Learn n8n automation and technical English with a clear day-by-day plan — free, bilingual, in your browser.**

[![Live site](https://img.shields.io/badge/Live%20site-Open%20→-3f8f63?style=for-the-badge)](https://micro4tricks-ai.github.io/learn-n8n-english/)
&nbsp;
![Arabic | English](https://img.shields.io/badge/العربية%20|%20English-26332b?style=for-the-badge)
&nbsp;
![No build step](https://img.shields.io/badge/HTML%20·%20CSS%20·%20JS-no%20build-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<a href="https://micro4tricks-ai.github.io/learn-n8n-english/"><img src="docs/screenshot.png" alt="Developer Journey home page" width="860"></a>

</div>

Two free, bilingual (Arabic / English) learning plans that run entirely in the browser:

- **The n8n Journey** (`n8n.html`) — n8n automation plus the languages around it (JavaScript, Python, JSON/HTTP, SQL, Regex, Git, Docker, AI).
- **English for Developers** (`english.html`) — the technical English developers use every day: errors, docs, READMEs, commits, emails, meetings and interviews.

Each plan starts with a **7-day intensive week** (quizzes, worked examples, flashcards, a reading list per day) and continues with a **12-week plan** (daily tasks, weekly projects, a skills checklist).

خطتين تعلم مجانيتين بالعربي والإنجليزي: رحلة n8n واللغات اللي معاها، والإنجليزي التقني للمبرمجين. كل خطة بتبدأ بأسبوع مكثّف وبعده 12 أسبوع، وفيها اختبارات وأمثلة محلولة وبطاقات ومكتبة مصادر مجانية.

## Features

- **AR / EN switch** on every page — the whole site (UI, lessons, tasks, quizzes, vocabulary) flips language and direction (RTL ↔ LTR). The choice is remembered.
- **Progress saved locally** in the browser (`localStorage`) — no account, no server, no tracking.
- **Flashcards** with a “Got it” pile, search, and audio pronunciation on the English page (browser speech synthesis).
- **Library** of free official docs and books, each with exactly what to read and when.
- Pure HTML/CSS/JS — no build step and no framework. Works on any static host.

## Project structure

```
index.html            Landing page
n8n.html              The n8n plan
english.html          The English plan
assets/
  css/site.css        Shared styles (RTL/LTR via html[dir])
  js/i18n.js          Language switch + T()/TF()/TDEEP() helpers
  js/*-data.js        Page content (Arabic source text)
  js/*-app.js         Page logic and rendering
  js/*-en.js          English dictionaries (generated — see below)
  favicon.svg
tools/                Translation and test scripts (Node.js)
  i18n/<page>-keys.json   Arabic source strings, in a fixed order
  i18n/<page>-NN.json     English translations, by index
```

## Run locally

Any static server works:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk also works, but each page then keeps its own saved progress per file.

## How translation works

Arabic is the source language. Every string in the data, the page HTML and the app code is Arabic, and `assets/js/<page>-en.js` maps each Arabic string to English.

- In code, UI text goes through `T('…')`, templates through `TF('… {n} …', {n: 3})`, and data through `TDEEP(data)`.
- Static HTML is translated on load; an element with `data-t` is translated as one unit (for text mixed with `<b>`, `<code>`, …).

After you add or change Arabic text:

```bash
npm install                 # once: jsdom + acorn for the tools
npm run i18n:missing        # lists untranslated strings → tools/missing-<page>.json
npm run i18n:build          # appends them to tools/i18n/<page>-keys.json and rebuilds the dictionaries
```

Add the English text for the new indexes in a new `tools/i18n/<page>-NN.json` file, run `npm run i18n:build` again, then:

```bash
npm test                    # renders every page in both languages and reports errors or leftover Arabic
```

## Deploy

The site is static, so upload the files as they are:

- **Hostinger / any cPanel host:** upload everything except `tools/`, `node_modules/` and `package*.json` into `public_html/`.
- **GitHub Pages** (public repos, or private repos on a paid plan): Settings → Pages → Deploy from branch → `main` / root.
- **Netlify / Cloudflare Pages:** connect the repo, no build command, publish directory `/`.

Progress is stored per domain, so moving the site to a new domain starts learners from zero.

## Content notes

All external resources are links to their official websites or to books their authors publish for free. No third-party book content is copied into this repository.
