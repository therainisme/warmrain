// ==UserScript==
// @name         Warm Rain
// @namespace    https://github.com/therainisme/warmrain
// @version      0.3.0
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

  // The userscript manager's API is not always ready at document-start — a
  // throwing GM_* call used to abort the whole script before anything was
  // painted. Every call is guarded, and the wash is applied before any of them.
  const gmGet = (key, fallback) => {
    try {
      return GM_getValue(key, fallback);
    } catch (e) {
      return fallback;
    }
  };
  const gmSet = (key, value) => {
    try {
      GM_setValue(key, value);
    } catch (e) {}
  };
  const gmMenu = (label, fn) => {
    try {
      GM_registerMenuCommand(label, fn);
      return true;
    } catch (e) {
      return false;
    }
  };

  const readDisabled = () => {
    const v = gmGet(STORE, []);
    return Array.isArray(v) ? v : [];
  };
  const isDisabled = () => {
    try {
      return readDisabled().includes(HOST);
    } catch (e) {
      return false;
    }
  };

  // One fixed multiply layer, attached to <html> rather than <body>, so a site
  // that swaps its body (Turbo, React roots) does not take the wash with it.
  function ensureWash() {
    const root = document.documentElement;
    if (!root) return;
    const existing = document.getElementById('warmrain-wash');
    if (existing && existing.parentNode === root) return;
    if (existing) existing.remove();

    const wash = document.createElement('div');
    wash.id = 'warmrain-wash';
    wash.style.cssText =
      'position:fixed;inset:0;pointer-events:none;z-index:2147483647;' +
      'background:#f6f3ec;mix-blend-mode:multiply;';
    root.appendChild(wash);
  }

  function removeWash() {
    const existing = document.getElementById('warmrain-wash');
    if (existing) existing.remove();
  }

  let toggleMenuDone = false;
  let resetMenuDone = false;

  function registerMenus() {
    if (!toggleMenuDone) {
      toggleMenuDone = gmMenu(
        isDisabled() ? '✅ 在此站点启用 Warm Rain' : '⛔ 在此站点禁用 Warm Rain',
        () => {
          const list = readDisabled();
          gmSet(
            STORE,
            list.includes(HOST) ? list.filter((h) => h !== HOST) : list.concat(HOST)
          );
          location.reload();
        }
      );
    }
    if (!resetMenuDone) {
      resetMenuDone = gmMenu('↺ 重置所有站点的 Warm Rain 设置', () => {
        gmSet(STORE, []);
        location.reload();
      });
    }
  }

  function boot() {
    if (isDisabled()) {
      removeWash();
    } else {
      ensureWash();
    }
    registerMenus();
  }

  boot();

  // Injection can land before <html> exists, after DOMContentLoaded has already
  // fired, or just before a soft navigation replaces the body. Re-apply at each
  // of those points; ensureWash is idempotent.
  const again = () => {
    if (!isDisabled()) ensureWash();
    registerMenus();
  };

  document.addEventListener('DOMContentLoaded', again, { once: true });
  window.addEventListener('load', again, { once: true });
  window.addEventListener('pageshow', again);
  ['turbo:load', 'turbo:render', 'pjax:end'].forEach((name) => {
    document.addEventListener(name, again);
    window.addEventListener(name, again);
  });

  // If the page removes the layer, put it back. Observing only <html>'s direct
  // children keeps this cheap even on pages that churn their DOM constantly.
  try {
    new MutationObserver(() => {
      if (!isDisabled()) ensureWash();
    }).observe(document.documentElement, { childList: true });
  } catch (e) {}
})();
