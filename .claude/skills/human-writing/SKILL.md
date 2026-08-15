---
name: human-writing
description: Write or edit English prose that does not read as AI-generated. Use for any user-facing copy — portfolio and site text, blog posts, README files, CV bullets, commit messages, docs, emails. Also use when asked to review existing text for "AI tells" or to make writing sound human.
---

# Writing that does not read as machine-written

The goal is not to hide anything. It is that the tells listed here are, almost always, symptoms of vague or padded writing. Removing them makes the text more specific, which is the actual objective.

Reference: [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

## Hard rules

**No em dashes in prose.** This is the single most recognisable tell. Every em dash is a punctuation decision deferred; make the decision instead:

| The dash was doing | Use |
|---|---|
| Joining two complete thoughts | A period. Usually two sentences is better anyway. |
| Introducing a list or an explanation | A colon. |
| Bracketing an aside | Commas, or parentheses. |
| Tacking a final item onto a list | A comma. |

Em dashes are fine in a table cell as a "no value" placeholder, and in code comments. Not in prose.

**No trailing "-ing" benefit clauses.** `…, ensuring data consistency`, `…, enabling faster workflows`, `…, reducing errors across all projects`. These append an unverifiable benefit to a factual statement. Either the benefit has a number, in which case state it as a fact, or it does not, in which case delete the clause. The sentence is always complete without it.

**No promotional adjectives about your own work.** cutting-edge, innovative, robust, comprehensive, seamless, production-grade, world-class, state-of-the-art, proven, powerful, passionate, dedicated, solid foundation, strong foundation. If the work is good, the specifics show it. If it is not, the adjective will not save it.

## Vocabulary to avoid

Not because the words are bad, but because their density in generated text has made them markers:

delve, showcase / showcasing, underscore, leverage (as a verb), pivotal, testament, tapestry, landscape (figurative), realm, crucial, intricate, enhance, foster, align with, emphasizing, highlighting, boasts, navigate (figurative), unlock, empower, elevate, harness, myriad, plethora.

Plain replacements: use, show, build, set up, run, cut, add, improve, matter, important.

Also avoid **copula avoidance** — writing `serves as`, `stands as`, `represents`, `functions as`, `marks` where `is` would do.

## Sentence patterns to avoid

- **Negative parallelism**: "not just X, but Y" / "it's not X, it's Y" / "X, not Y". Say what it is.
- **Rule of three for its own sake**: three adjectives or three parallel clauses where one would do. Genuine enumerations of real things are fine — a three-item technical list is content, not padding.
- **Over-signposting**: "In this section we will explore…", "It is worth noting that…", "Importantly,". Cut and start the sentence.
- **Formulaic closers**: "In conclusion", "Ultimately", "As we move forward", "The future is bright". End on the last real point.
- **Vague attribution**: "experts say", "studies show", "industry reports suggest". Name the source or drop the claim.

## Formatting tells

- Excessive **bold**. Two or three emphases on a page, on the things a reader would highlight themselves. Not eight, and not in three different colours.
- Title Case On Headings. Use sentence case.
- Emoji as section markers.
- Numbered markers (01 / 02 / 03) on content that is not actually a sequence.

## What NOT to strip

Over-correcting produces bland text, which is its own failure. Leave these alone:

- **Numbers and metrics.** `99% accuracy at 30 FPS on Jetson` is not puffery, it is evidence. Never soften a real figure to sound modest.
- **Technical density and jargon.** LIF neurons, surrogate gradients, TensorRT INT8 calibration, RGTAN. Density is not a tell; vagueness is.
- **Trailing "-ing" clauses that carry a number.** `…, achieving 99%+ accuracy and a 0.4% false positive rate` is evidence, not decoration. The rule targets *empty* tails.
- **Real enumerations.** `frontend (DevExtreme), backend (ASP.NET MVC), and database (MS SQL)` is a stack breakdown.
- **The author's own voice**, including opinions, hedges they actually mean, and admissions of what did not work. Those are the strongest signals of a human who did the work.

## Method for an editing pass

1. `grep -c '—'` the file. Convert every one in prose using the table above.
2. Search the vocabulary list. Replace or delete.
3. Read every sentence ending in a comma plus an "-ing" word. Delete the tail unless it carries a number.
4. Count bold spans. Cut to the two that matter.
5. Check for repeated filler phrases across the whole document. Saying "real-world" five times is a stronger tell than any single word.
6. Read the result aloud. Anywhere it sounds like a brochure, it is still wrong.

## Method for writing from scratch

Lead with the concrete thing. Name the system, the number, the failure. Prefer a specific detail a generator could not invent — the thing that broke at 2am, the constraint the hardware imposed, the metric that looked good and was not. Write the way you would explain it to a colleague who will ask a follow-up question.
