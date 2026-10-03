# Security

**Reporting a problem:** please don't open a public issue. Use GitHub's private report (the repository's
**Security** tab → *Report a vulnerability*), or email micro4tricks@gmail.com. Say what you found, how to reproduce
it and what it affects. You'll get an answer within a few days.

## What the site does to stay safe

- A static site on GitHub Pages: no server of its own, and no secrets in the repository. The Supabase key in
  `assets/js/config.js` is the public (publishable) key; row-level security lets each signed-in user read and
  write only their own rows.
- Every page carries a Content-Security-Policy (`tools/build_csp.js`).
- Code a learner runs (Python, JavaScript, HTML examples) runs in a sandboxed frame with no origin of its own,
  so it can't reach the site's storage or the sign-in session.
- Everything that comes from outside — pasted workflow JSON, template search results, synced data, imported
  backups, links — is shown as text. `npm run security` checks this on every page in a real browser, and runs in CI.

More detail: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#security).
