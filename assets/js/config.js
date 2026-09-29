// Supabase project "developer-journey" for optional accounts. Both values come from the
// Supabase dashboard (Project Settings → API keys → publishable key). The anon/publishable key is meant to be public:
// row-level security in supabase/schema.sql keeps each account's data private.
// Leave them empty to run the site without accounts (progress stays in the browser).
window.JOURNEY_SUPABASE = {
  url: 'https://ndlqwuzqkwbddtsfzyak.supabase.co',
  anonKey: 'sb_publishable_l41O36eW3cjt325SEjA97Q_klghLE8K'
};

// Optional extras, off when empty:
// - giscus: comments on every journey week and tool page, stored as GitHub Discussions of this repo.
//   The ids come from https://giscus.app (repo + category). Comments show up once the giscus GitHub app is
//   installed on the repo (https://github.com/apps/giscus); until then the discussion box says so.
// - goatcounter: privacy-friendly visit counts (no cookies). Put the site code of your GoatCounter
//   account (https://www.goatcounter.com, free), e.g. 'learn-n8n' for learn-n8n.goatcounter.com.
window.SITE_CONFIG = {
  giscus: { repo: 'micro4tricks-ai/learn-n8n-english', repoId: 'R_kgDOUn0HmQ', category: 'Announcements', categoryId: 'DIC_kwDOUn0Hmc4DGrxI' },
  goatcounter: ''
};
