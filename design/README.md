# Redesign mockups

Design exploration for the resume home page, drafted September 2026 with Claude Design's canvas preview. Nothing in this directory is deployed: CodeBuild only syncs `site/`.

Canvas (view, edit, export PNG/PDF): https://claude.ai/code/artifact/ffc96272-d8ae-4c09-ab35-5aeaedf5d61b

## Files

| File | What it is |
|---|---|
| `Main.dc.html` | Leading direction: the full home page, evolved from the current terminal look. Same palette and fonts as `site/styles.css`, sans-serif headings, date column beside each role, skills as one compact table. |
| `EditorialLight.dc.html` | Option B, hero and first section only. Light page, serif headline, terminal reduced to a single prompt line. The professional end of the range. |
| `OpsConsole.dc.html` | Option C, hero and first section only. Status pills, career drawn as a pipeline, mono everywhere. The fun end of the range. |
| `canvas.json` | Artboard layout and the sticky notes shown on the canvas. |

Each artboard is a self-contained HTML file. The `<script src="./support.js">` line in the head is a placeholder the canvas editor fills in; a browser ignores it. The photo is referenced as `robert.jpg` and is not copied here, so open the files next to a copy of `site/robert.jpg` or upload that image alongside them.

## Content changes made in the mockups

These were folded into the mockup copy and ported to the live site separately on the `fix/site-accuracy` branch:

- Deploys run through a CodeBuild webhook, not CodePipeline.
- "Nine years" and "9+ yrs" became ten; Eldermark started September 2016.
- "Drove", "own", "led" softened to "helped lead", "look after", "helped".
- The sysadmin bullet no longer claims cost savings, since there is no figure behind it.

Still to confirm: the "8 accounts across 10 environments" count.

## Sample values

The visitor count and the "last deploy" pill in Option C are placeholders.
