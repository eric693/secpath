/* 靜態資源的快取與瘦身：
   1. 版本化網址：頁面中的 /static/… 加上 ?v=內容雜湊，瀏覽器可以長期快取，檔案更新時網址跟著改變、立即生效。
   2. 每門課只載入自己用到的互動練習：從 public/static/js/tools.js 中挑出該課程 LEVEL.tools 列出的工具，
      其他工具的設定、畫面與事件處理都不送出。tools.js 的結構需維持：
      META 每個工具一行、render 的 switch 中每個工具一個 case、bind 中每個工具一個 if (id === '…') 區塊。 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

module.exports = function createAssets({ ROOT }) {
  const STATIC = path.join(ROOT, 'public');
  const hashes = new Map();
  const hash = buf => crypto.createHash('sha1').update(buf).digest('hex').slice(0, 10);

  // 以檔案修改時間為快取鍵，內容變動時重新計算雜湊
  function version(urlPath) {
    const file = path.normalize(path.join(STATIC, urlPath));
    if (!file.startsWith(STATIC + path.sep)) return null;
    let st;
    try { st = fs.statSync(file); } catch { return null; }
    const key = file + ':' + st.mtimeMs;
    if (!hashes.has(key)) hashes.set(key, hash(fs.readFileSync(file)));
    return hashes.get(key);
  }
  const withVersion = u => { const v = version(u); return v ? `${u}?v=${v}` : u; };

  function versionHtml(html) {
    return html
      .replace(/((?:src|href)=")(\/static\/[^"?#]+)"/g, (m, attr, u) => attr + withVersion(u) + '"')
      .replace(/srcset="([^"]+)"/g, (m, list) => 'srcset="' + list.replace(/\/static\/[^\s,?"]+/g, withVersion) + '"');
  }

  /* ---------- 每門課的互動練習 ---------- */
  const TOOLS_FILE = path.join(STATIC, 'static', 'js', 'tools.js');
  const toolsCache = new Map();

  function levelToolIds(level) {
    const ctx = { window: {} };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'levels', level, 'level.js'), 'utf8'), ctx);
    return new Set(((ctx.window.LEVEL || {}).tools || []).map(t => t[0]));
  }

  function pick(src, want) {
    const lines = src.split('\n'), out = [];
    let region = null, keep = true;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (region === null) {
        out.push(line);
        if (/^  const META = \{$/.test(line)) region = 'meta';
        else if (/^    switch \(id\) \{$/.test(line)) { region = 'render'; keep = true; }
        else if (/^  function bind\(id, root\) \{$/.test(line)) { region = 'bind'; keep = true; }
        continue;
      }
      if (region === 'meta') {
        if (/^  \};$/.test(line)) { region = null; out.push(line); continue; }
        const m = line.match(/^    ([\w$]+): \{ name:/);
        if (!m || want.has(m[1])) out.push(line);
        continue;
      }
      if (region === 'render') {
        if (/^    \}$/.test(line) && /^    return '';$/.test(lines[i + 1] || '')) { region = null; out.push(line); continue; }
        const m = line.match(/^      case '([^']+)':/);
        if (m) keep = want.has(m[1]);
        if (keep) out.push(line);
        continue;
      }
      if (region === 'bind') {
        if (/^  \}$/.test(line)) { region = null; out.push(line); continue; }
        const m = line.match(/^    if \(id === '([^']+)'\) \{$/);
        if (m) keep = want.has(m[1]);
        if (keep) out.push(line);
      }
    }
    // META 的最後一個項目後面可能留下逗號，物件字面值允許結尾逗號，不影響執行
    return out.join('\n');
  }

  function toolsFor(level) {
    const st = fs.statSync(TOOLS_FILE), lst = fs.statSync(path.join(ROOT, 'levels', level, 'level.js'));
    const key = st.mtimeMs + ':' + lst.mtimeMs;
    const hit = toolsCache.get(level);
    if (hit && hit.key === key) return hit;
    const want = levelToolIds(level);
    const body = `/* 本課程的互動練習（由 tools.js 依 LEVEL.tools 擷取：${[...want].join('、')}） */\n` + pick(fs.readFileSync(TOOLS_FILE, 'utf8'), want);
    const entry = { key, body, etag: '"' + hash(body) + '"' };
    toolsCache.set(level, entry);
    return entry;
  }

  return { versionHtml, toolsFor, pick };
};
