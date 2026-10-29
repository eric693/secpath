/* TypeScript 型別檢查與轉譯（背景執行緒）
   載入官方 TypeScript 編譯器，以 strict 模式檢查學員的程式，沒有錯誤時輸出 JavaScript 交給 JavaScript 執行器執行。
   lib 宣告檔（lib.es2022.d.ts、lib.dom.d.ts 等）在編譯器需要時以同步請求讀取並快取。 */
importScripts('/static/vendor/typescript/typescript.js');

const LIB_URL = '/static/vendor/typescript/lib/';
const FILE = '/main.ts';
const OPTIONS = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  lib: ['lib.es2022.d.ts', 'lib.dom.d.ts'],
  strict: true,
  skipLibCheck: true,
  types: []
};
const libText = {}, libFile = {};
const base = p => p.replace(/^.*\//, '');
function readLib(name) {
  if (name in libText) return libText[name];
  if (!/^lib\.[\w.]+\.d\.ts$/.test(name)) return (libText[name] = undefined);
  const x = new XMLHttpRequest();
  x.open('GET', LIB_URL + name, false);
  x.send();
  return (libText[name] = x.status === 200 ? x.responseText : undefined);
}

let oldProgram;
function check(code) {
  let js = '';
  const host = {
    getSourceFile(name, lang) {
      if (name === FILE) return ts.createSourceFile(name, code, lang, true);
      if (libFile[name]) return libFile[name];
      const text = readLib(base(name));
      return text === undefined ? undefined : (libFile[name] = ts.createSourceFile(name, text, lang, true));
    },
    getDefaultLibFileName: () => '/lib/lib.d.ts',
    getDefaultLibLocation: () => '/lib',
    writeFile(name, text) { if (name.endsWith('.js')) js = text; },
    getCurrentDirectory: () => '/',
    getDirectories: () => [],
    fileExists: name => name === FILE || readLib(base(name)) !== undefined,
    readFile: name => (name === FILE ? code : readLib(base(name))),
    getCanonicalFileName: f => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n'
  };
  const program = ts.createProgram([FILE], OPTIONS, host, oldProgram);
  oldProgram = program;
  const diags = ts.getPreEmitDiagnostics(program).filter(d => !d.file || d.file.fileName === FILE).map(d => ({
    line: d.file && d.start != null ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : 0,
    code: d.code,
    text: ts.flattenDiagnosticMessageText(d.messageText, '\n')
  }));
  if (!diags.length) program.emit();
  return { diags, js: js.replace(/^export \{\};\s*$/m, '') };
}

// 型別推論探索：列出最上層宣告被推論出的型別
function infer(code) {
  const r = check(code);
  const checker = oldProgram.getTypeChecker(), sf = oldProgram.getSourceFile(FILE), F = ts.TypeFormatFlags.NoTruncation;
  const items = [];
  const line = n => sf.getLineAndCharacterOfPosition(n.getStart()).line + 1;
  for (const st of sf.statements) {
    if (ts.isVariableStatement(st)) for (const d of st.declarationList.declarations) {
      if (ts.isIdentifier(d.name)) items.push({ line: line(d), name: d.name.text, kind: st.declarationList.flags & ts.NodeFlags.Const ? 'const' : 'let', type: checker.typeToString(checker.getTypeAtLocation(d.name), undefined, F) });
    } else if (ts.isFunctionDeclaration(st) && st.name) {
      const sig = checker.getSignatureFromDeclaration(st);
      items.push({ line: line(st), name: st.name.text, kind: 'function', type: sig ? checker.signatureToString(sig, undefined, F) : '' });
    } else if ((ts.isTypeAliasDeclaration(st) || ts.isInterfaceDeclaration(st)) && st.name) {
      items.push({ line: line(st), name: st.name.text, kind: ts.isInterfaceDeclaration(st) ? 'interface' : 'type', type: checker.typeToString(checker.getTypeAtLocation(st.name), undefined, F | ts.TypeFormatFlags.InTypeAlias) });
    }
  }
  return { diags: r.diags, items };
}

onmessage = e => {
  const { id, code, mode } = e.data;
  try { postMessage({ id, ...(mode === 'infer' ? infer(code) : check(code)) }); }
  catch (err) { postMessage({ id, diags: [{ line: 0, code: 0, text: '編譯器發生錯誤：' + err.message }], js: '' }); }
};
postMessage({ ready: true });
