# Dineshkumar Suresh — Portfolio

> **Production-grade personal portfolio** built with React 18, a custom Three.js WebGL background, and a glassmorphism design system. Data is streamed live from Google Sheets. Deployed at [dineshsuresh.com](https://dineshsuresh.com?source=GithubReadme).

[![Live](https://img.shields.io/badge/Live-dineshsuresh.com-F59E0B?style=flat-square&logo=vercel&logoColor=white)](https://dineshsuresh.com?source=GithubReadme)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=threedotjs&logoColor=white)](https://threejs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Architecture Overview

```
React 18 (CRA)  ─►  Three.js WebGL Layer  ─►  Glassmorphism UI
                          │
                    Google Sheets CSV  ─►  DataContext (React Context + Cache)
                          │
                    EmailJS  ─►  Contact Form
                    GA4      ─►  Analytics
```

The site is a client-side SPA with a statically generated build deployed via `gh-pages`. All portfolio data (experience, projects, certifications) is sourced from Google Sheets, parsed via PapaParse, and cached in `sessionStorage` to eliminate redundant network calls.

---

## Tech Stack

| Layer      | Technology                                                    |
| ---------- | ------------------------------------------------------------- |
| Framework  | React 18.3                                                    |
| Language   | JavaScript (ES2022)                                           |
| 3D / WebGL | Three.js 0.184 — custom GLSL shader, ambient floating lines   |
| Routing    | React Router v6                                               |
| SEO        | react-helmet-async, JSON-LD structured data (3 schema blocks) |
| Data       | Google Sheets → CSV → PapaParse → DataContext                 |
| Email      | EmailJS                                                       |
| Analytics  | Google Analytics 4 (GA4)                                      |
| Icons      | Flaticon UIcons (CDN)                                         |
| Fonts      | Space Grotesk, IBM Plex Sans, IBM Plex Mono (Google Fonts)    |
| Deployment | GitHub Pages (`gh-pages`)                                     |
| Build      | Create React App (react-scripts 5)                            |

---

## Repository Structure

```
deekayv1/
├── public/
│   ├── assets/
│   │   ├── og-banner.png           # 1200×630 OG social preview image
│   │   ├── DineshkumarDeekay.pdf   # CV / Resume
│   │   └── favicon/                # Full favicon set + PWA manifest
│   ├── sitemap.xml
│   └── index.html                  # SEO meta, JSON-LD schemas, GA4
│
└── src/
    ├── components/
    │   ├── background/             # WebGL layer
    │   │   ├── BackgroundOverlay.js / .css
    │   │   └── FloatingLines.js / .css   # Three.js GLSL shader component
    │   ├── cards/                  # Reusable data cards
    │   │   ├── ExperienceCard.js / .css
    │   │   └── ProjectCard.js / .css
    │   ├── certifications/         # Certifications feature
    │   │   ├── CertificationCard.js
    │   │   ├── CertificationsSection.js
    │   │   └── CertificationsTable.js / .css
    │   ├── layout/                 # App shell components
    │   │   ├── ArcusHero.js / .css
    │   │   ├── MainContent.js / .css
    │   │   ├── MobileNav.js / .css
    │   │   ├── Section.js
    │   │   └── Sidebar.js / .css
    │   └── ui/                     # Generic UI primitives
    │       ├── Loader.js / .css
    │       ├── ScrollToTop.js
    │       └── TagList.js
    ├── config/
    │   ├── constants.js            # Intersection observer config, feature flags
    │   └── emailConfig.js
    ├── context/
    │   └── DataContext.js          # Global data provider + sessionStorage cache
    ├── hooks/
    │   ├── useCertifications.js
    │   ├── useExperience.js
    │   └── useProjects.js
    ├── pages/
    │   ├── CertificationsPage.js / .css
    │   └── ResumeDownload.js
    ├── styles/                     # Global stylesheets only
    │   ├── theme.css               # CSS custom properties, dark/light tokens
    │   ├── index.css               # Global resets
    │   └── App.css
    ├── utils/
    │   ├── emailService.js
    │   └── tracking.js
    ├── App.js
    └── index.js
```

> **Note on CSS architecture:** All component-level CSS files are co-located with their component (e.g. `Sidebar.js` and `Sidebar.css` live in the same directory). `src/styles/` is reserved exclusively for global tokens and resets.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
git clone https://github.com/Deeekaaay/deekayv1.git
cd deekayv1
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Google Sheets (published as CSV)
REACT_APP_CERTIFICATIONS_CSV_URL=your_google_sheets_csv_url
REACT_APP_EXPERIENCE_PROJECTS_CSV_URL=your_google_sheets_csv_url

# EmailJS (contact form)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_USER_ID=your_user_id

# Optional — visitor source tracking
REACT_APP_TELEGRAM_BOT_TOKEN=your_bot_token
REACT_APP_TELEGRAM_CHAT_ID=your_chat_id
```

### Development

```bash
npm start        # Start dev server on http://localhost:3000
npm run build    # Production build → /build
npm run deploy   # Build + push to gh-pages branch
```

---

## Key Design Decisions

### 1. WebGL Background (Three.js)

The ambient floating lines are rendered with a custom GLSL fragment shader inside `FloatingLines.js`. The renderer is strictly memoized — a single `WebGLRenderer` instance is created on mount, and a `ResizeObserver` handles viewport changes. The component is wrapped in `React.memo` at the `BackgroundOverlay` level to prevent re-renders from propagating down.

In light mode, the canvas opacity is reduced to `0.04` via a CSS override in `BackgroundOverlay.css` to prevent contrast blowouts against the bright background.

### 2. Data Layer

All sheet data is fetched once on app init via `DataContext`, parsed by PapaParse, and written to `sessionStorage`. Subsequent navigations (including back/forward) are served entirely from cache — zero repeat network requests per session.

### 3. Component-based CSS co-location

All CSS lives next to its component rather than in a central `styles/` bucket. This enforces the "one module = one directory" rule and prevents accidentally breaking unrelated components when editing styles.

### 4. SEO Strategy

Three JSON-LD schema blocks are injected in `public/index.html`:

- `Person` — entity declaration with 47 `knowsAbout` entries, `hasOccupation`, and `alumniOf`
- `SoftwareApplication` — ArcusVision declared as a live product entity
- `WebSite` — `SearchAction` for Google Sitelinks search box eligibility

`react-helmet-async` is used to inject per-route metadata (title, description, canonical) on the `/certifications` route, preventing duplicate meta content across the SPA.

---

## SEO Metrics (Configured)

| Signal          | Value                                       |
| --------------- | ------------------------------------------- |
| OG Image        | 1200×630 (`og-banner.png`)                  |
| JSON-LD Schemas | 3 (Person, SoftwareApplication, WebSite)    |
| Canonical       | Self-referencing on all routes              |
| Meta Locale     | `en_AU`                                     |
| Geo Tags        | `geo.region: AU-VIC`, Melbourne coordinates |
| GA4             | Active (`G-VCYRRR4378`)                     |
| Robots          | `index, follow`                             |
| Sitemap         | `/sitemap.xml`                              |

---

## Scripts Reference

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm start`      | Start local dev server             |
| `npm run build`  | Create optimised production bundle |
| `npm run deploy` | Build and push to `gh-pages`       |
| `npm test`       | Run test suite                     |

---

## Contact

**Dineshkumar Suresh**  
Full-Stack Software Engineer · Melbourne, Australia

- **Portfolio:** [dineshsuresh.com](https://dineshsuresh.com?source=GitHubReadme)
- **LinkedIn:** [linkedin.com/in/deeekay](https://linkedin.com/in/deeekay)
- **GitHub:** [github.com/Deeekaaay](https://github.com/Deeekaaay)
- **Email:** dineshdeekay.me@gmail.com

---

## License

MIT © Dineshkumar Suresh
