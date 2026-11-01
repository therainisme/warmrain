# Warm Rain for VS Code

A warm, low-contrast light theme, ported from the Herdr `paper-warm` palette.
Part of the [Warm Rain collection](../README.md), which ships the same palette
for Herdr, VS Code, and T3 Code.

- Background `#f6f3ec`, foreground `#3a3733`
- The same 16 ANSI colors as the terminal theme
- UI surfaces, panels, and syntax tokens mapped from the same palette

## Install

Copy this folder to your extensions directory (run from the repository root):

```sh
cp -R vscode ~/.vscode/extensions/therainisme.warmrain-0.1.0
```

Then reload VSCode (`Developer: Reload Window`) and choose **Warm Rain** via
`Preferences: Color Theme`.

## Uninstall

```sh
rm -rf ~/.vscode/extensions/therainisme.warmrain-0.1.0
```

## Palette

| Role | Color |
|---|---|
| background | `#f6f3ec` |
| foreground | `#3a3733` |
| surface | `#efece4` |
| selection | `#e2ddd2` |
| border | `#d5cfc3` |
| accent | `#3568a8` |
| comment | `#8a8378` |
| string | `#4e7a3a` |
| number | `#a5731c` |
| keyword | `#8a5a8f` |
| function | `#3568a8` |
| type | `#3a8a8a` |

## Files

```
package.json                        extension manifest
themes/warmrain-color-theme.json    the theme itself
```

The same theme file can be imported into T3 Code — see [`../t3code/`](../t3code/).

## License

MIT — see [LICENSE](../LICENSE).
