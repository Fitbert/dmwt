# DMWT — Don't Mess With Taxes

DIY Texas property tax protest packets. Enter your property, get an ARB-ready protest packet with comparable sales and an equity analysis — without paying a tax agent 30–40% of your savings.

**Live site:** https://fitbert.github.io/dmwt/

## How it works

1. **Enter your property** — address, county, appraised value, and condition details through a three-step intake wizard (Property → Details → Condition), covering the major Texas counties.
2. **We build the case** — comparable sales and equity analysis assembled into a protest packet formatted for your county's Appraisal Review Board.
3. **You file, you fight** — download the PDF packet and use the included talking points at your hearing.

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing page — how it works, pricing tiers |
| `/intake` | Three-step lead intake wizard; submits to the backend `/submit` endpoint |
| `/dashboard` | Sample assessment view — county value vs. estimated value, comp table, projected savings |
| `/thank-you` | Post-submission confirmation |

## Tech stack

- **React 19 + Vite 8** with React Router 7
- **Tailwind CSS v4** with a custom warm/vintage palette, Framer Motion animations, Lucide icons
- **Backend:** a separate Express service receives intake submissions (`POST /submit`), emails the lead, and generates the PDF packet
- **Deploy:** GitHub Actions workflow builds and publishes to GitHub Pages on every push to `main`

## Running locally

```bash
npm install
cp .env.example .env   # set VITE_BACKEND_URL to your backend (defaults to http://localhost:3001)
npm run dev
```

`npm run build` + `npm run preview` to check the production build before pushing — the deploy workflow ships whatever lands on `main`.

## Project status

The frontend is live and the intake flow is wired end-to-end to the backend contract. Honest notes on what's real vs. demo:

- The **dashboard currently shows sample data** (hardcoded comps and values) to demonstrate the assessment format — real comp data per county is the next milestone.
- The **backend must be deployed** and `VITE_BACKEND_URL` set for submissions to leave the browser; until then the intake works but leads go nowhere.
- **Roadmap:** live comps data source, lead persistence (Google Sheets/DB) so a failed email never loses a lead, input sanitization hardening on the PDF pipeline, and automated tests around the intake → packet payload contract.

## Disclaimer

DMWT provides self-help information and document formatting, not legal advice or representation. Verify deadlines and requirements with your county appraisal district.
