// ==UserScript==
// @name         Warm Rain
// @namespace    https://github.com/therainisme/warmrain
// @version      0.2.0
// @description  Warm Rain — shifts every page color by the same warm-paper tone, so the site keeps its own design
// @author       therainisme
// @license      MIT
// @match        *://*/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  const HOST = location.hostname || location.origin;
  const STORE = 'warmrain.disabledHosts';

  const readDisabled = () => {
    const v = GM_getValue(STORE, []);
    return Array.isArray(v) ? v : [];
  };
  const isDisabled = () => readDisabled().includes(HOST);

  GM_registerMenuCommand(
    isDisabled() ? '✅ 在此站点启用 Warm Rain' : '⛔ 在此站点禁用 Warm Rain',
    () => {
      const list = readDisabled();
      GM_setValue(
        STORE,
        list.includes(HOST) ? list.filter((h) => h !== HOST) : list.concat(HOST)
      );
      location.reload();
    }
  );
  GM_registerMenuCommand('↺ 重置所有站点的 Warm Rain 设置', () => {
    GM_setValue(STORE, []);
    location.reload();
  });

  if (isDisabled()) return;

  // One fixed multiply layer, no per-element overrides.
  //
  // Every color on the page is multiplied by #f6f3ec: pure white becomes the
  // Warm Rain canvas, light greys keep a little depth, saturated colors get
  // quieter, and dark surfaces stay dark. Because it is a multiplicative
  // shift, contrast between a surface and its text is preserved — unlike
  // forcing backgrounds and text colors element by element, which is what
  // made pages look patchy.
  function ensureWash() {
    const target = document.body || document.documentElement;
    if (!target) return;
    const existing = document.getElementById('warmrain-wash');
    if (existing && existing.parentNode === target) return;
    if (existing) existing.remove();

    const wash = document.createElement('div');
    wash.id = 'warmrain-wash';
    wash.style.cssText =
      'position:fixed;inset:0;pointer-events:none;z-index:2147483647;' +
      'background:#f6f3ec;mix-blend-mode:multiply;';
    target.appendChild(wash);
  }

  ensureWash();
  document.addEventListener('DOMContentLoaded', ensureWash, { once: true });
})();
