# Accounts (Supabase)

Accounts are optional. The site works fully without them; with `assets/js/config.js` empty, the account button doesn't appear.

## What is stored

| Table | Row | Who can read it |
|---|---|---|
| `progress` | one per user and track (`english`, `n8n`): the same JSON the browser keeps (`done`, `answers`, `tests`) | only that user |
| `test_attempts` | one per test attempt: `test_id`, `score`, `total`, `answers`, `taken_at` | only that user |

Row-level security is in [`supabase/schema.sql`](../supabase/schema.sql). The anon key in `config.js` is public by design; it can't read anyone's rows.

## How sync works (`assets/js/account.js`)

1. Sign-in sends a sign-in link to the email (and a one-time code once custom SMTP is set up). No passwords.
2. After sign-in, the page reads the user's `progress` row for its track and **merges** it with the browser's copy: anything done on either device stays done, and every test attempt from both is kept (see `JOURNEY.mergeProgress`).
3. The merged copy is saved in the browser and uploaded. New test attempts are also added to `test_attempts`, once each.
4. Later changes upload about 2 seconds after they happen, and again when the tab comes back into view or the connection returns. If the server can't be reached, the page keeps working and says so in the account dialog.

## The live project

- Organization `developer-journey`, project ref `ndlqwuzqkwbddtsfzyak` (region eu-west-1, free plan). It is separate from the Muslim To-Do List project.
- `schema.sql` is applied; Site URL and redirect URLs are set as below.
- The key in `config.js` is the **publishable** key (`sb_publishable_…`), which is safe in the browser.
- Email templates can't be edited on the built-in sender, so the sign-in email has a **link** (no code). The dialog accepts a code too, for when custom SMTP with a `{{ .Token }}` template is added.

## Setting up the project

1. Create a project named `developer-journey` (free tier, region Frankfurt) in the `micro4tricks` organization.
2. SQL editor → run `supabase/schema.sql`.
3. Authentication → URL configuration:
   - Site URL: `https://micro4tricks-ai.github.io/learn-n8n-english/`
   - Redirect URLs: `https://micro4tricks-ai.github.io/learn-n8n-english/**` and `http://localhost:8000/**` for local testing.
4. Authentication → Email templates → "Magic link": include both the code and the link, for example:

   ```html
   <h2>Your sign-in code</h2>
   <p style="font-size:24px;letter-spacing:4px"><b>{{ .Token }}</b></p>
   <p>Or <a href="{{ .ConfirmationURL }}">sign in with this link</a>.</p>
   ```

5. Project settings → API: copy the project URL and the anon (publishable) key into `assets/js/config.js`.
6. The built-in email sender allows only a few emails per hour. For real traffic, add custom SMTP (Authentication → SMTP settings).

## Checking row-level security

With two test accounts, A and B: sign in as B, then run `client.from('progress').select('*')` in the browser console — it must return only B's rows, and inserting a row with A's `user_id` must fail.
