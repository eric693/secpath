/* Python 執行器的背景執行緒：載入 Pyodide 並執行程式碼，主畫面可隨時終止（例如無限迴圈） */
'use strict';
const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
let ready = null;
const PIP = ['openpyxl'];
const installed = new Set();
// 課程資料集：程式中提到這些檔名時，自動放進 Pyodide 的工作目錄，用 pd.read_csv('sales.csv') 即可讀取
const DATA = ['sales.csv', 'customers.csv', 'sales_raw.csv'];
const FONT = '/static/vendor/fonts/NotoSansTC-subset.otf';
let fontReady = false;
async function prepare(py, code) {
  for (const name of DATA) {
    if (installed.has(name) || !code.includes(name)) continue;
    const res = await fetch('/static/data/' + name);
    if (!res.ok) throw new Error('無法下載資料檔 ' + name);
    py.FS.writeFile(name, await res.text());
    installed.add(name);
  }
  // matplotlib 預設字型沒有中文，第一次畫圖時載入繁體中文子集字型
  if (!fontReady && /\bmatplotlib\b/.test(code)) {
    postMessage({ type: 'status', text: '載入中文字型…' });
    const res = await fetch(FONT);
    if (res.ok) {
      py.FS.writeFile('/tmp/NotoSansTC-subset.otf', new Uint8Array(await res.arrayBuffer()));
      py.runPython(`
import matplotlib, matplotlib.font_manager as _fm
_fm.fontManager.addfont('/tmp/NotoSansTC-subset.otf')
matplotlib.rcParams['font.sans-serif'] = ['Noto Sans CJK TC', 'DejaVu Sans']
matplotlib.rcParams['axes.unicode_minus'] = False
`);
      fontReady = true;
    }
  }
}

function boot() {
  if (!ready) ready = (async () => {
    importScripts(PYODIDE + 'pyodide.js');
    const py = await loadPyodide({ indexURL: PYODIDE });
    py.setStdout({ batched: s => postMessage({ type: 'out', text: s }) });
    py.setStderr({ batched: s => postMessage({ type: 'err', text: s }) });
    await py.runPythonAsync(`
import builtins, sys, os
os.environ['MPLBACKEND'] = 'AGG'
import warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)
_secpath_inputs = []
def _secpath_input(prompt=''):
    if not _secpath_inputs:
        raise EOFError('沒有更多輸入資料：請在「輸入」欄位每行填一筆資料')
    value = _secpath_inputs.pop(0)
    print(f'{prompt}{value}')
    return value
builtins.input = _secpath_input

def _secpath_figures():
    if 'matplotlib.pyplot' not in sys.modules:
        return []
    import io, base64
    import matplotlib.pyplot as plt
    out = []
    for n in plt.get_fignums():
        buf = io.BytesIO()
        plt.figure(n).savefig(buf, format='png', dpi=110, bbox_inches='tight')
        out.append(base64.b64encode(buf.getvalue()).decode())
    plt.close('all')
    return out
`);
    return py;
  })();
  return ready;
}

self.onmessage = async e => {
  const { code, input } = e.data;
  let py;
  try {
    postMessage({ type: 'status', text: '載入 Python 環境中（第一次約需 10～20 秒）…' });
    py = await boot();
    postMessage({ type: 'status', text: '執行中…' });
    py.globals.get('_secpath_inputs').extend(py.toPy(input ? input.replace(/\r/g, '').split('\n') : []));
    await py.loadPackagesFromImports(code, { messageCallback: m => postMessage({ type: 'status', text: '下載套件：' + m }) });
    // Pyodide 未內建、但純 Python 的套件改從 PyPI 安裝
    // pandas 的 to_excel／read_excel 會在內部使用 openpyxl，程式中沒有 import 也要安裝
    const needs = n => new RegExp('^\\s*(import|from)\\s+' + n + '\\b', 'm').test(code) || (n === 'openpyxl' && /\b(to_excel|read_excel|ExcelWriter)\b/.test(code));
    const extra = PIP.filter(n => needs(n) && !installed.has(n));
    if (extra.length) {
      postMessage({ type: 'status', text: '安裝套件：' + extra.join('、') + '…' });
      await py.loadPackage('micropip');
      await py.pyimport('micropip').install(extra);
      extra.forEach(n => installed.add(n));
    }
    await prepare(py, code);
    const ns = py.toPy({ __name__: '__main__' });
    await py.runPythonAsync(code, { globals: ns });
    ns.destroy();
    const figs = py.runPython('_secpath_figures()').toJs();
    postMessage({ type: 'done', figs });
  } catch (err) {
    const figs = py ? (() => { try { return py.runPython('_secpath_figures()').toJs(); } catch (x) { return []; } })() : [];
    postMessage({ type: 'error', text: String(err.message || err), figs });
  } finally {
    if (py) try { py.runPython('_secpath_inputs.clear()'); } catch (x) { /* 忽略 */ }
  }
};
