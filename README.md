# ReturnTriage — Reverse Logistics Case Study

An independent product strategy case study on reverse logistics in e-commerce,
with an interactive triage prototype. Concept and prototype only — no custom
model was trained, no retailer pilot was run, and no results are claimed as
production data.

## Files

```
index.html    Page structure and content
styles.css    All styling (design tokens, layout, components)
script.js     All interactivity (journey map, 4C explorer, the transparent
              scoring engine + triage simulator, phone tracker, plain-
              language toggle, Q&A accordion)
```

There are no image or media assets — every visual is built from HTML/CSS,
so the folder is fully self-contained apart from the Google Fonts link.

## What's new in this version

- **A transparent, weighted scoring formula** replaces the old hardcoded
  case scores. The five factors (return-window position, payment mode,
  return frequency, photo evidence, order value) and their point values
  live in the `WEIGHTS` object near the top of `script.js`. The simulator
  now computes each case's score live and shows the per-factor breakdown
  under the meter when you click "Run triage."
- **A unit-economics section** ("The napkin math a CFO asks for first")
  with explicit, swappable assumptions and a step-by-step calculation —
  not a single invented savings percentage.
- **A ninth Q&A entry** answering "why build triage instead of preventing
  returns upstream" head-on.

## Contact details

The byline (hero section and footer) uses:
- Email: khushivermaux@gmail.com
- LinkedIn: linkedin.com/in/khushiverma-mba
- Target roles: Product Manager · International Business Development

## How to use it

**View it locally:** open `index.html` in any modern browser. No build step,
no server, no dependencies.

**Host it:** upload all three files to any static host, keeping them in
the same folder — `index.html` references `styles.css` and `script.js` by
relative path.

**Edit it:**
- Copy, stats, and section order → `index.html`
- Colors, type, spacing → `styles.css`
- The scoring weights, the four simulator cases, the 4C content, the
  journey-map stages, and the Q&A answers all live as data near the top of
  `script.js` — edit those rather than the render logic below them.
