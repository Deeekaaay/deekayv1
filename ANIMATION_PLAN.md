# Framer Motion Animation Plan — dineshsuresh.com

> Reference sites: waveform.framer.website · juanmora.co
> Stack: framer-motion (already installed), React 18, CRA

---

## Philosophy

- **Scroll-triggered, once** — `whileInView` + `viewport={{ once: true }}` on every section. No re-plays that feel janky.
- **Ease-out-expo** — `[0.16, 1, 0.3, 1]` for all entrances. Fast in, soft land. This is the curve Framer templates use.
- **Stagger over simultaneous** — lists always stagger at 0.10–0.15s per child. Never everything at once.
- **Respect `prefers-reduced-motion`** — wrap all transitions in a `useReducedMotion()` guard; if true, skip to final state instantly.

---

## Shared Variants (create `src/utils/motionVariants.js`)

```js
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.5,  ease: [0.16, 1, 0.3, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
```

---

## Section-by-Section Plan

### 1. Sidebar — `Sidebar.js`
**Trigger:** Page load (`animate` not `whileInView` — sidebar is always visible)

| Element | Variant | Delay |
|---|---|---|
| `h1` name | `fadeLeft` | 0.1s |
| `h3` title | `fadeLeft` | 0.2s |
| `.tagline` | `fadeLeft` | 0.3s |
| Download CV button | `fadeUp` | 0.4s |
| Nav links (each `<li>`) | `fadeLeft` staggered | 0.5s start, 0.08s gap |
| Social icons row | `fadeUp` | 0.85s |

**How:** Wrap `<aside>` in `motion.aside`. Each named child becomes `motion.div` / `motion.li` with `variants={fadeLeft}`. Parent uses `staggerContainer`.

---

### 2. About Section — `MainContent.js` → `<Section id="about">`
**Trigger:** `whileInView`, `viewport={{ once: true, margin: "-80px" }}`

| Element | Variant | Notes |
|---|---|---|
| Section `h2` title "Hello." | `fadeUp` | — |
| `.about-intro p` | `fadeUp` | 0.1s delay after title |
| `.about-content article` × 2 | `fadeUp` staggered | 0.12s apart |

---

### 3. ArcusHero — `ArcusHero.js`
**Trigger:** `whileInView`, `viewport={{ once: true, margin: "-60px" }}`
**This is the showcase card — give it the most polish.**

| Element | Variant | Notes |
|---|---|---|
| Card outer wrapper | slide up + scale `{ y: 40, scale: 0.97 }` → `{ y: 0, scale: 1 }` | duration 0.7s |
| Eyebrow "Featured Product" | `fadeUp` | 0.15s delay |
| Title "ArcusVision" | `fadeLeft`, bold | 0.25s delay |
| Live badge `● Live` | `fadeIn` with pulse `scale` loop | after title |
| Description `p` | `fadeUp` | 0.35s delay |
| Metrics row (3 items) | `staggerContainer(0.15)` each metric `fadeUp` | stagger |
| Tag list `<li>` items | `staggerContainer(0.06)` each `fadeIn` | quick pop-in |
| CTA buttons | `fadeUp` | last, 0.05s apart |

**Extra:** Number counter on `338+` users — `useMotionValue` + `useTransform` counting from 0→338 on enter.

---

### 4. Experience Section — `ExperienceCard.js`
**Current state:** Uses raw `IntersectionObserver` + `.animated` CSS class.
**Migration:** Replace with `motion.div` using `whileInView`.

| Element | Variant | Notes |
|---|---|---|
| Each `ExperienceCard` | `fadeUp` | `viewport={{ once: true, margin: "-60px" }}` |
| Cards as a list | `staggerContainer(0.15)` on the parent in `MainContent` | wrap the `.map()` in `motion.div` |
| Year range `p` | `fadeIn` slight delay inside card | 0.05s |
| Title `h3` | `fadeLeft` | 0.1s inside card |
| Description | `fadeUp` | 0.15s inside card |
| Tags `<li>` items | `staggerContainer(0.05)` | quick horizontal pop |

**Remove** the `IntersectionObserver` `useEffect` + `.animated` class once framer-motion handles it — avoids double animation logic.

---

### 5. Projects Section — `ProjectCard.js` + `MainContent.js`
**Current state:** Same IntersectionObserver pattern as Experience.
**Migration:** Same approach.

| Element | Variant | Notes |
|---|---|---|
| Section title "Projects" | `fadeUp` | whileInView |
| Featured cards | `staggerContainer(0.18)` parent, each card `fadeUp` | — |
| "Show X earlier projects" button | `fadeUp` | after featured cards settle |
| Earlier projects list | `AnimatePresence` + `fadeUp` each card | smooth expand/collapse on toggle |

**Extra:** Card hover — `whileHover={{ y: -4, scale: 1.005 }}` on `motion.div`. Subtler than CSS transform alone because framer handles the spring physics.

---

### 6. Certifications Section — `CertificationsSection.js` / `CertificationCard.js`
**Trigger:** `whileInView`, once.

| Element | Variant | Notes |
|---|---|---|
| Section title | `fadeUp` | — |
| Cert card grid | `staggerContainer(0.08)` parent | — |
| Each `CertificationCard` | `fadeUp` with `scale: 0.96 → 1` | quick pop, feels like a grid reveal |

---

### 7. Contact Section
**Trigger:** `whileInView`, once.

| Element | Variant | Notes |
|---|---|---|
| Section title "Contact" | `fadeUp` | — |
| Intro `p` | `fadeUp` | 0.1s delay |
| `input[name]` | `fadeUp` | 0.1s |
| `input[email]` | `fadeUp` | 0.2s |
| `textarea` | `fadeUp` | 0.3s |
| Send button | `fadeUp` + `whileHover={{ scale: 1.03 }}` `whileTap={{ scale: 0.97 }}` | 0.4s |

---

## Global Scroll Feel (Optional — Phase 2)

juanmora.co uses **Lenis** for smooth scroll. This is a separate library:
```
npm install @studio-freight/lenis
```
Wrap the app root with Lenis, sync it to framer-motion's `useScroll`. Gives buttery inertia scrolling that makes the whileInView triggers feel premium. Add this **after** all animations are working correctly.

---

## Implementation Order

1. **Create `src/utils/motionVariants.js`** — shared variants (30 min)
2. **Sidebar** — page-load entrance (30 min)
3. **ExperienceCard** — migrate from IntersectionObserver → framer (45 min)
4. **ProjectCard** — same migration + AnimatePresence toggle (45 min)
5. **ArcusHero** — full treatment + number counter (60 min)
6. **About + Contact** — simple fadeUp/stagger (30 min)
7. **Certifications grid** — stagger reveal (30 min)
8. **`prefers-reduced-motion` guard** — global check, skip animations (15 min)
9. **Lenis smooth scroll** — Phase 2, optional (45 min)

**Total estimated: ~5–6 hours focused work**

---

## `prefers-reduced-motion` Guard Pattern

```jsx
import { useReducedMotion } from "framer-motion";

// In any component:
const shouldReduce = useReducedMotion();
const variant = shouldReduce ? {} : fadeUp;
```

Or wrap globally in a context that overrides all variants to `{}` when reduced motion is preferred.

---

## Dependencies Already Present

- `framer-motion` ✅ (installed)
- No new packages needed for core animations
- Lenis is optional (Phase 2 only)
