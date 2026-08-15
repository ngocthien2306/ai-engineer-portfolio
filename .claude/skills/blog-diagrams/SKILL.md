---
name: blog-diagrams
description: Draw technical figures for this portfolio's blog posts and sections. Use when a post needs a pipeline, architecture, signal-path, comparison or timing diagram. Covers what earns a figure, and the SVG mechanics specific to this site (figures are loaded as <img>, so they must carry their own theme handling).
---

# Figures for this site

## When a figure earns its place

Draw the mechanism, not its name. A box labelled "OCR" says less than the sentence next to it. The path a frame takes through the station, the stage that was deleted and the arrow that vanished with it, the two edges the algorithm confused: those are things prose has to reconstruct in the reader's head and a picture just shows.

If a sentence says it faster, write the sentence. Three of these per post is plenty.

What tends to earn one here:
- **Signal path.** Trigger to actuator, with the thing that moves on each arrow.
- **Comparison.** Two approaches side by side, where the reader can point at the difference. Two unconnected boxes labelled "Option A" and "Option B" is a list, not a comparison.
- **Timing or budget.** Where the milliseconds go, and what the deadline is.
- **State over time.** Anything with a before and after, like a membrane potential crossing a threshold.

Label every arrow. `writes`, `triggers`, `invalidates`, `173 ms` is information; a bare arrow means "related somehow".

## Mechanics for this repo

Blog content is markdown rendered by `react-markdown` with no `rehype-raw`, so **inline SVG in a post will not render**. Figures are separate files referenced as images:

```
public/blog/my-figure.svg
![Alt text describing the claim](${B}blog/my-figure.svg)
```

`B` is declared at the top of `src/data/static/blog.ts` as `import.meta.env.BASE_URL`. It is required: the site is served from a base path, so a bare `/blog/...` will 404 in production.

Because the figure is loaded through `<img>`, the page's `currentColor` and its dark-mode class cannot reach inside it. So, unlike inline SVG, each figure handles its own theme:

- Put a `<style>` block inside the SVG with a `@media (prefers-color-scheme: dark)` override. This covers viewers on the system default, which is most of them.
- Give the figure its own background panel rather than a transparent ground. The site also has a manual dark toggle that the SVG cannot see, so a self-contained panel is what keeps it readable when the OS theme and the site theme disagree.
- Use soft off-white rather than pure white for the light panel, so it does not glare on a dark page.

Everything else follows the general rules: size by `viewBox`, no scripts, no external references, arrowheads as small `<polygon>` elements, text around 9.5 to 14px at drawn scale, and `role="img"` with an `aria-label` that states the figure's claim.

## House style

Established across the existing figures in `public/blog/`, keep it consistent:

| Token | Light | Dark |
|---|---|---|
| Page ground | `#f5f7f7` | `#131b1a` |
| Card / panel | `#ffffff` | `#1a2423` |
| Box fill | `#ffffff` | `#1f2b2a` |
| Rules and box strokes | `#b9c4c3` | `#3b4a49` |
| Ink | `#16211f` | `#e3ebe9` |
| Mid text | `#566664` | `#a4b3b1` |
| Soft text | `#869593` | `#7b8a88` |
| Signal / accent | `#0d7a72` | `#45c2b6` |
| Alarm / hot path | `#b8524a` | `#e8877d` |
| Data / input | `#2563a8` | `#6ba8e8` |

Type: the system UI stack for labels, a monospace stack for anything that is a value, an identifier or a formula. Titles at 14px bold, box titles at 11px semibold, body at 9.5px.

Restraint is the point. These are meant to read as figures from an engineering document, not as marketing graphics. Colour carries meaning only: the hot path is red because it is the path with a deadline, not for contrast.

## Grounding

Where a diagram describes a system that actually exists, take the labels from the real thing. The camera names, the counters, the measured latency and the exact wording on the buttons are all visible in the screen recordings in `public/videos/`. Sample a frame with `ffmpeg -ss <t> -i <file> -frames:v 1 -vf crop=...` and read the values off it rather than inventing plausible ones. A reader who has seen the system will notice either way.

## Two lanes: generated illustrations and hand-drawn figures

Figures on this site come from one of two routes, and the choice is about how much precise text the figure has to carry.

**Isometric illustrations, generated with Gemini.** For a scene: a station, a comparison of two approaches, a set of roles. Use `gemini-3-pro-image` with the API key in `.env`. The house look, matching what is already published, is: deep navy ground with a faint low-contrast geometric mesh, isometric vector 3D, flat shading with soft ambient occlusion, white and light-grey machinery, muted steel tones, light blue as the only accent, and red or green used once and only where it carries meaning. Ask for crisp geometry and generous empty space, and say no photorealism.

The one hard constraint: **short uppercase labels only**, three to six of them, each with a thin leader line to its object. Those render reliably. Sentences, numbers and units do not, so every measurement, latency figure and piece of reasoning belongs in the prose under the figure instead. Always end the prompt with a line forbidding any other text, logos or watermarks.

**Hand-authored SVG.** For anything where the data is the point: a membrane potential crossing a threshold, a gradient curve, a timing budget, a table-like comparison. Precision and correct text matter more than polish, and a generated image cannot be trusted to place a curve accurately.

If a figure needs both a scene and precise values, generate the scene and put the values in the caption. Do not ask the image model for them.
