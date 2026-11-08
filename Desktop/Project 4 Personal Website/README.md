# Rasul Guliyev — Personal Portfolio

A minimalist, dark-themed portfolio for the SITE 1101 university project. Built with plain HTML, CSS, and vanilla JavaScript; no external libraries or build tools are required.

## Pages

- `index.html` — introduction and selected work
- `about.html` — background, interests, skills, and the interactive field-notes quest
- `projects.html` — project descriptions and details

## Run locally

Open `index.html` in a browser, or start a local server from this folder:

```powershell
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Interactions

- **Sticky navbar:** The header gains a translucent, blurred background when scrolling. Its active-link pill slides to the hovered or keyboard-focused link.
- **Smooth scrolling:** In-page anchor navigation uses native CSS scrolling.
- **Scroll reveals:** Elements with `data-reveal` fade and rise into view using `IntersectionObserver`.
- **Field-notes quest:** Expand all three notes on the About page to complete the quest. The notes remain usable without JavaScript.
- **Reduced motion:** Scroll and transition animations respect the system's reduced-motion preference.
- **Overflow stability:** The page reserves scrollbar space and clips horizontal overflow while retaining the sticky header.

Shared styling lives in `style.css`; lightweight interactions live in `script.js`, loaded with `defer` on each page.