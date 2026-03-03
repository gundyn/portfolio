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
            └── Deploy to GitHub Pages → Cloudflare CDN
```

All four quality jobs run in parallel. Deploy only fires if every check passes.

---

## Tech stack

| Layer | Tool |
|---|---|
| Hosting | GitHub Pages |
| CDN / DNS / SSL | Cloudflare |
| CI/CD | GitHub Actions |
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
│       └── main.yml        # CI/CD pipeline
├── cypress/                # E2E test suite
├── files/
│   └── Nathan_Gundy_Resume.pdf
├── Images/
├── src/js/
├── .htmlvalidate.json      # HTML validation config
├── .stylelintrc.json       # CSS lint config
├── CNAME                   # Custom domain for GitHub Pages
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

The pipeline is defined in `.github/workflows/main.yml`. Key design decisions:

- **Parallel jobs** — validation, linting, link checking, and E2E tests all run simultaneously to minimize total pipeline time
- **Gated deploy** — deploy job uses `needs:` to require all checks to pass first
- **Push-only deploy** — deploy skips on pull requests to prevent premature releases
- **`workflow_dispatch`** — manual trigger available from the GitHub Actions UI

---

## Contact

- **Email:** nathan.gundy@gmail.com
- **LinkedIn:** [linkedin.com/in/nathangundy](https://www.linkedin.com/in/nathangundy/)
- **GitHub:** [github.com/gundyn](https://github.com/gundyn)