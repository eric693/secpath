/* SQL 執行器的背景執行緒：以 sql.js（SQLite 編譯為 WebAssembly）在瀏覽器中執行查詢，主畫面可隨時終止 */
'use strict';
importScripts('/static/vendor/sql-wasm.js', '/static/js/sql-data.js');
const ready = initSqlJs({ locateFile: f => '/static/vendor/' + f });
const MAX_ROWS = 200;

function open(seed) {
  return ready.then(SQL => {
    const db = new SQL.Database();
    if (seed && self.SQL_SEEDS[seed]) db.exec(self.SQL_SEEDS[seed]);
    return db;
  });
}

self.onmessage = async e => {
  const { action, seed, sql } = e.data;
  const results = [];
  let db;
  try {
    db = await open(seed);
    if (action === 'schema') {
      const tables = db.exec("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY rowid")[0];
      const out = (tables ? tables.values : []).map(([name]) => {
        const cols = db.exec(`PRAGMA table_info("${name}")`)[0].values.map(r => ({ name: r[1], type: r[2], pk: !!r[5] }));
        const n = db.exec(`SELECT COUNT(*) FROM "${name}"`)[0].values[0][0];
        return { name, cols, n };
      });
      postMessage({ type: 'schema', tables: out });
      return;
    }
    // 逐句執行：SELECT 顯示結果表格，其餘顯示影響筆數
    for (const stmt of db.iterateStatements(sql)) {
      const text = stmt.getSQL().trim();
      const cols = stmt.getColumnNames();
      if (cols.length) {
        const rows = [];
        let total = 0;
        while (stmt.step()) { total++; if (rows.length < MAX_ROWS) rows.push(stmt.get()); }
        results.push({ sql: text, cols, rows, total });
      } else {
        stmt.step();
        const kind = (text.match(/^\s*(\w+)/) || [])[1] || '';
        results.push({ sql: text, changes: /^(insert|update|delete|replace)$/i.test(kind) ? db.getRowsModified() : null, kind: kind.toUpperCase() });
      }
      stmt.free();
    }
    postMessage({ type: 'done', results });
  } catch (err) {
    postMessage({ type: 'error', results, text: String(err.message || err) });
  } finally {
    if (db) db.close();
  }
};
