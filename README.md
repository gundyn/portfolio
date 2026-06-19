# Nathan T. Gundy — Portfolio

Personal portfolio site for Nathan T. Gundy, Manager of Change & Release / Release Engineer. Built to demonstrate CI/CD pipeline design and automation skills through actual implementation — the site ships itself.

**Live site:** [nathangundy.com](https://www.nathangundy.com/)

---

## What this repo demonstrates

This isn't just a static site — it's a working example of a release pipeline. Every push to `main` triggers a fully automated build, test, and deploy sequence with no manual steps.

### Pipeline overview

```
Push to main
    │
    ├── Validate HTML       (html-validate)
    ├── Lint CSS            (stylelint)
    ├── Check Links         (lychee)
    └── Cypress E2E Tests
            │
            └── Deploy to Cloudflare Pages (Wrangler)
```

All four quality jobs run in parallel. Deploy only fires if every check passes.

---

## Tech stack

| Layer | Tool |
|---|---|
| Hosting | Cloudflare Pages |
| CDN / DNS / SSL | Cloudflare |
| CI/CD | GitHub Actions |
| Deploy | Wrangler (cloudflare/wrangler-action) |
| HTML validation | html-validate |
| CSS linting | stylelint |
| Link checking | lychee |
| E2E testing | Cypress |
| Fonts | Syne + Manrope (Google Fonts) |
| Icons | Font Awesome 6 |

---

## Project structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
├── .well-known/
│   └── security.txt        # Vulnerability disclosure contact (RFC 9116)
├── cypress/                # E2E test suite
├── files/
│   └── Nathan_Gundy_Resume.pdf
├── Images/
├── src/js/
├── .htmlvalidate.json      # HTML validation config
├── .stylelintrc.json       # CSS lint config
├── _redirects              # Cloudflare Pages routing (.well-known passthrough)
├── CNAME                   # Custom domain
├── index.html              # Main site
├── robots.txt
├── sitemap.xml
└── style.css
```

---

## Running locally

No build step required — open `index.html` directly in a browser, or use a local server:

```bash
npx serve .
```

### Running Cypress tests

```bash
npm install
npx cypress open     # interactive
npx cypress run      # headless
```

---

## Workflow details

The pipeline is defined in `.github/workflows/deploy.yml`. Key design decisions:

- **Parallel jobs** — validation, linting, link checking, and E2E tests all run simultaneously to minimize total pipeline time
- **Gated deploy** — the deploy job uses `needs:` to require all four checks to pass before publishing to Cloudflare Pages via Wrangler
- **Push-only deploy** — deploy skips on pull requests to prevent premature releases
- **`workflow_dispatch`** — manual trigger available from the GitHub Actions UI

Deploying through `wrangler pages deploy` (rather than Cloudflare's built-in Git
integration) is what makes the gate real: Cloudflare's auto-deploy would publish
every push immediately, *without* waiting for the tests above.

The deploy job reads these GitHub Actions settings (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` (secret) — token with the **Cloudflare Pages: Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` (secret) — Cloudflare account ID
- `CLOUDFLARE_PROJECT_NAME` (variable) — the Pages project name

Until all three are set the deploy job logs a warning and skips, so CI stays green.
Once they're set, **disable automatic Git deployments** on the Cloudflare Pages
project so this gated job is the only path to production.

---

## Contact

- **Email:** nathan.gundy@gmail.com
- **LinkedIn:** [linkedin.com/in/nathangundy](https://www.linkedin.com/in/nathangundy/)
- **GitHub:** [github.com/gundyn](https://github.com/gundyn)