<p align="center">
  <a href="https://revealjs.com">
  <img src="https://hakim-static.s3.amazonaws.com/reveal-js/logo/v1/reveal-black-text-sticker.png" alt="reveal.js" width="500">
  </a>
  <br><br>
  <a href="https://github.com/hakimel/reveal.js/actions"><img src="https://github.com/hakimel/reveal.js/actions/workflows/test.yml/badge.svg"></a>
  <a href="https://slides.com/"><img src="https://static.slid.es/images/slides-github-banner-320x40.png?1" alt="Slides" width="160" height="20"></a>
</p>

reveal.js is an open source HTML presentation framework. It enables anyone with a web browser to create beautiful presentations for free. Check out the live demo at [revealjs.com](https://revealjs.com/).

The framework comes with a powerful feature set including [nested slides](https://revealjs.com/vertical-slides/), [Markdown support](https://revealjs.com/markdown/), [Auto-Animate](https://revealjs.com/auto-animate/), [PDF export](https://revealjs.com/pdf-export/), [speaker notes](https://revealjs.com/speaker-view/), [LaTeX typesetting](https://revealjs.com/math/), [syntax highlighted code](https://revealjs.com/code/) and an [extensive API](https://revealjs.com/api/).

---

Want to create reveal.js presentation in a graphical editor? Try <https://slides.com>. It's made by the same people behind reveal.js.

---

### Getting started

- 🚀 [Install reveal.js](https://revealjs.com/installation)
- 👀 [View the demo presentation](https://revealjs.com/demo)
- 📖 [Read the documentation](https://revealjs.com/markup/)
- 🖌 [Try the visual editor for reveal.js at Slides.com](https://slides.com/)
- 🎬 [Watch the reveal.js video course (paid)](https://revealjs.com/course)

---

<div align="center">
  MIT licensed | Copyright © 2011-2026 Hakim El Hattab, https://hakim.se
</div>


## Lecture 1 — Course overview and motivation

`ml_cfd_intro.html` is the editable introductory deck for Machine Learning in Fluid Mechanics. Open it directly in Firefox or serve this repository locally. Sections are arranged horizontally; move vertically through the slides within each section. Title-only slides are deliberately left blank for lecture development. The figures are copied from the lecture notebook's dark SVG exports. The final review slide contains 20 flashcards drawn from Lecture 1, with answers revealed on request and Again/Hard/Good controls.

The Quarto overview links the GitHub Pages deck at:

https://andreweiner.github.io/ml-cfd-slides/ml_cfd_intro.html

Publish the original HTML and its local assets together. This deck uses classic JavaScript files and local styles, fonts, and figures so it can also be opened directly in Firefox without a development server.

The introductory deck uses its own versioned Reveal.js runtime under `public/libs/reveal/6.0.2/`; other decks retain their existing runtime.

## Lecture 2 — Introduction to machine learning

`ml_intro.html` follows the lecture script with title-only canvases for live derivations and the lecture’s dark-theme sketches. Major sections run horizontally; slides within each section run vertically. It uses the same classic Reveal.js, local editor support, and Ink setup as Lecture 1, with separate annotation storage.

The final review slide contains 20 Lecture 2 flashcards with revealable answers and Again/Hard/Good controls.

GitHub Pages URL: https://andreweiner.github.io/ml-cfd-slides/ml_intro.html

Figures are copied from `ml-cfd-lecture/notebooks/media/` into `public/media/lecture_02/`; regenerate them with that course repository’s `notebooks/lecture_02_figures.py` before refreshing the copies.
