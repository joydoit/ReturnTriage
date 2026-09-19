# ReturnTriage — Reverse Logistics Case Study

An independent product strategy case study on reverse logistics in e-commerce,
with an interactive triage prototype. Concept and prototype only — no custom
model was trained, no retailer pilot was run, and no results are claimed as
production data.

## Files

```
index.html    Page structure and content
styles.css    All styling (design tokens, layout, components)
script.js     All interactivity (journey map, 4C explorer, triage
              simulator, phone tracker, plain-language toggle, Q&A accordion)
```

There are no image or media assets — every visual (the phone mockup, the
meter, the fate cards) is built from HTML/CSS, so the folder is fully
self-contained apart from two font families loaded from Google Fonts
(Archivo, Source Serif 4, IBM Plex Mono) over the network.

## Contact details

A byline appears in exactly two places — the hero section (near the top)
and the footer — each formatted as:

```
Khushi Verma
MBA, International Business · Targeting Product Management
khushivermaux@gmail.com · linkedin.com/in/khushiverma-mba
```

There is no longer a byline in the sticky top bar — it was removed to
avoid a stray, easy-to-miss contact link; the hero and footer are the two
deliberate, well-formatted contact points.

To update any of these later, search `index.html` for the email or
LinkedIn URL — each appears once in the hero and once in the footer.

## How to use it

**View it locally:** open `index.html` in any modern browser. No build step,
no server, no dependencies.

**Host it:** upload all three files to any static host (GitHub Pages,
Netlify, Vercel, S3, etc.) keeping them in the same folder — the HTML
references `styles.css` and `script.js` by relative path.

**Edit it:**
- Copy, stats, and section order → `index.html`
- Colors, type, spacing, responsive rules → `styles.css` (see the `:root`
  custom properties at the top for the color/design-token system)
- The four triage scenarios, the 4C content, the journey-map stages, and
  the Q&A answers all live as small data arrays near the top of
  `script.js` — edit those arrays rather than the render logic below them.

## Notes on the design system

- Color tokens are defined once in `:root` and redefined under a dark-mode
  media query and a `data-theme="dark"` override, so the page adapts to the
  viewer's system theme.
- The only external network dependency is the Google Fonts stylesheet link
  in `index.html`. Everything else — including all four disposition icons,
  the meter, and the phone mockup — is inline HTML/CSS with no images.
- If a viewer has JavaScript disabled, a `<noscript>` block in the triage
  console shows a static frozen example so the prototype's intent is still
  visible.
