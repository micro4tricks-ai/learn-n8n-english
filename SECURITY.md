# Security

**Reporting a problem:** please don't open a public issue. Use GitHub's private report (the repository's
**Security** tab → *Report a vulnerability*), or email micro4tricks@gmail.com. Say what you found, how to reproduce
it and what it affects. You'll get an answer within a few days.

## What the site does to stay safe

- A static site on GitHub Pages: no server of its own, and no secrets in the repository. The Supabase key in
  `assets/js/config.js` is the public (publishable) key; row-level security lets each signed-in user read and
  write only their own rows. Visitors who are not signed in have no access to any table, the test log is
  append-only, and each account has limits (40 synced stores, 10 MB in all, 5000 test attempts, small answer lists).
- Every page carries a Content-Security-Policy (`tools/build_csp.js`). Scripts that run with the site's storage come
  from the site itself (sql.js included); CDN code runs only inside the sandboxed runner.
- A page shown in a frame by another site hides itself behind a link (GitHub Pages can't send `X-Frame-Options`).
- Code a learner runs (Python, JavaScript, HTML examples) runs in a sandboxed frame with no origin of its own,
  so it can't reach the site's storage or the sign-in session.
- Everything that comes from outside — pasted workflow JSON, template search results, synced data, imported
  backups, links — is shown as text. `npm run security` checks this on every page in a real browser, and runs in CI.

More detail: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#security).
