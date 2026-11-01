# Warm Rain for Tabby

The Warm Rain palette for [Tabby](https://tabby.sh). Part of the
[Warm Rain collection](../README.md), which ships the same palette for Herdr,
VS Code, T3 Code, and Tabby.

Tabby calls color schemes `TerminalColorScheme` and keeps user-defined ones in
`terminal.customColorSchemes` in its `config.yaml`. There is no separate scheme
file to drop in — the scheme is a block in that config file.

## Install

1. **Quit Tabby first.** Tabby rewrites `config.yaml` when it exits, so edits
   made while it is running can be lost.
2. Back up the config:

   ```sh
   cp ~/Library/Application\ Support/tabby/config.yaml ~/Library/Application\ Support/tabby/config.yaml.bak
   ```

   On Linux the file is `~/.config/tabby/config.yaml`; on Windows it is
   `%APPDATA%\tabby\config.yaml`.

3. Open `config.yaml` and find the `terminal:` block.
4. Replace `customColorSchemes: []` with the list from
   [`warmrain.yml`](warmrain.yml). If you already have custom schemes, append
   the `- name: Warm Rain` item instead of replacing the list.
5. Replace the existing `lightColorScheme:` block with the one from
   `warmrain.yml`. To use Warm Rain for both appearances, do the same for
   `colorScheme:`.
6. Add the `appearance.css` block from `warmrain.yml` under the existing
   `appearance:` key. This keeps the title and tab bar warm instead of white
   (see below).
7. Relaunch Tabby and open **Settings → Color schemes → Light mode**. Warm Rain
   should be selected and marked **Custom**.

With `appearance.colorSchemeMode: auto` (the default), Warm Rain is used
whenever the system is in light appearance. Set it to **Always light** if you
want Warm Rain all the time.

## Title bar and tab bar

Tabby derives its chrome from the active color scheme by lightening the
background. For a light scheme, `--theme-bg-more-2` is lightened twice, which
turns `#f6f3ec` into near-white. That is why the title and tab bar can look
white while the terminal is warm paper.

The `appearance.css` block in `warmrain.yml` pins the two chrome variables to
the Warm Rain surface color:

```yaml
appearance:
  css: |
    :root {
      --theme-bg-more: #efece4 !important;
      --theme-bg-more-2: #efece4 !important;
    }
```

`!important` is needed because Tabby sets these variables inline on the root
element. The active tab keeps `#f6f3ec`, so the tab bar gets a subtle one-step
separation from the terminal canvas.

### Without editing YAML

You can also add it through the UI, though it means setting 22 colors by hand:

1. **Settings → Color schemes → Light mode**.
2. Pick any light scheme, click **Edit**, set **Name** to `Warm Rain`.
3. Set FG `#3a3733`, BG `#f6f3ec`, CU `#3a3733`, CA `#f6f3ec`, SB `#e2ddd2`,
   SF `#3a3733`, then the 16 ANSI colors from [`warmrain.yml`](warmrain.yml).
4. Click **Save**.

## Exactness

Tabby's `terminal.minimumContrastRatio` (default `4`) may nudge low-contrast
text at render time. The Warm Rain ANSI set intentionally includes
near-background tones (`#cfc9bd`, `#e8e3d8`), so set:

```yaml
terminal:
  minimumContrastRatio: 1
```

if you want the terminal to show the palette exactly as written. This is the
same trade-off as Herdr's `minimum_contrast` setting.

## Uninstall

1. In **Settings → Color schemes → Light mode**, switch to another scheme.
2. Remove the `Warm Rain` item from `terminal.customColorSchemes` in
   `config.yaml` (or leave it; it is only a list entry).

## Files

```
warmrain.yml    the scheme, ready to merge into config.yaml
README.md       this file
```

## Palette

| Role | Color |
| --- | --- |
| background | `#f6f3ec` |
| foreground | `#3a3733` |
| cursor | `#3a3733` |
| cursor accent | `#f6f3ec` |
| selection | `#e2ddd2` |
| selection foreground | `#3a3733` |

The 16 ANSI colors are the same values as the Herdr theme:
`#4a4540`, `#b3423a`, `#4e7a3a`, `#a5731c`, `#3568a8`, `#8a5a8f`, `#3a8a8a`,
`#cfc9bd`, `#6b655d`, `#c9554c`, `#628f4b`, `#bd8a2e`, `#4a7fbf`, `#a06ea6`,
`#50a0a0`, `#e8e3d8`.
