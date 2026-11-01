# Warm Rain for T3 Code

The Warm Rain palette for [T3 Code](https://t3.codes). Part of the
[Warm Rain collection](../README.md), which ships the same palette for Herdr,
VS Code, and T3 Code.

T3 Code has its own light/dark theme system. There are two ways to bring Warm
Rain in: import the VS Code theme, or publish the native T3 theme in this
folder.

## Option 1 — Import the VS Code theme (UI)

T3 Code can read a VS Code color theme directly.

1. Open **Settings → Colors & themes**.
2. Click **Add theme** → **Choose files** (or drag the JSON into the dialog, or
   paste it under **Theme JSON**).
3. Pick [`../vscode/themes/warmrain-color-theme.json`](../vscode/themes/warmrain-color-theme.json).
4. Choose **Use for both light and dark** (or keep it as the light theme).

The file picker opens `~/.vscode/extensions` by default, so an installed Warm
Rain extension is right there. T3 also has **Search Open VSX themes** for
community themes.

T3 maps the VS Code UI colors onto its own palette. `tokenColors` are **not**
carried over — code blocks and terminal ANSI colors are derived from the
palette. The surfaces, borders, text, and accent match; the per-token syntax
colors will not be identical to the VS Code theme.

## Option 2 — Publish the native T3 theme

`warmrain.json` in this folder is already in T3's environment-theme format, with
the palette mapped role by role.

```sh
mkdir -p ~/.t3/userdata/themes
cp t3code/warmrain.json ~/.t3/userdata/themes/
~/.t3/bin/t3 theme set warmrain
```

Then pick **Warm Rain** under **Settings → Colors & themes**, or let the
`theme set` command switch every connected client. Check it with:

```sh
~/.t3/bin/t3 theme show
```

To revert to no environment theme:

```sh
~/.t3/bin/t3 theme clear
```

### Format

```json
{
  "version": 1,
  "name": "Warm Rain",
  "appearance": "light",
  "canvas": "#f6f3ec",
  "accent": "#3568a8",
  "colors": { "...": "#rrggbb" }
}
```

`canvas` and `accent` seed the palette; `colors` overlays the individual
roles (`surface`, `text`, `border`, `sidebar`, `terminalBackground`, …). The
file is watched, so edits repaint T3 without a restart.

## Palette

Same as the rest of the collection: canvas `#f6f3ec`, text `#3a3733`, surfaces
`#efece4`, borders `#d5cfc3`, accent `#3568a8`.
