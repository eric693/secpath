/* Python 實戰 自動化篇：辦公自動化與網路資料
   <pre class="py"> 可在網頁執行；<pre class="out"> 是需要在自己電腦執行的完整程式碼。程式碼內的 < > & 寫成 &lt; &gt; &amp;，換行字元寫成 \\n */
window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push(
{
  id: 'c01', subject: 1, minutes: 45,
  title: '批次處理檔案',
  summary: '用 pathlib 走訪資料夾、篩選檔案、批次重新命名、依副檔名分類搬移、壓縮備份，以及「預覽模式」與日誌等安全做法，完成下載資料夾自動整理器。',
  sections: [
    { id: 'mindset', title: '自動化的思考方式', html: `
<p>辦公室裡最適合自動化的工作有三個特徵：<b>重複</b>、<b>規則明確</b>、<b>量大</b>。例如每天把下載資料夾的檔案分類、每月把 30 家分店的 Excel 合併、每週寄同一份報表。</p>
<div class="flow">
  <div><b>1. 手動做一次</b><span>把每個步驟寫下來</span></div>
  <div><b>2. 找出規則</b><span>什麼條件做什麼事</span></div>
  <div><b>3. 寫成程式</b><span>先處理一個檔案</span></div>
  <div><b>4. 擴大到全部</b><span>加上迴圈與錯誤處理</span></div>
</div>
<div class="box warn"><b class="t">安全第一</b>批次處理一次會動到大量檔案，寫錯可能把檔案搬錯或覆蓋。養成三個習慣：①先在<b>測試資料夾的複本</b>上執行；②加上<b>預覽模式</b>，只印出會做什麼、不真的執行；③<b>不要直接刪除</b>，改成搬到「待刪除」資料夾。</div>
<div class="box tip"><b class="t">網頁練習說明</b>本章的範例會先在網頁執行器的虛擬檔案系統中建立假檔案，再進行處理，所以可以放心執行。正式使用時，把資料夾路徑改成你電腦上的路徑即可。</div>` },
    { id: 'walk', title: '走訪與篩選檔案', html: `
<pre class="py">from pathlib import Path

# 建立練習用的假檔案
demo = Path('downloads')
demo.mkdir(exist_ok=True)
for name in ['報價單.xlsx', '會議紀錄.docx', 'IMG_2031.jpg', 'IMG_2032.JPG',
             '簡報.pptx', '發票.pdf', 'setup.exe', '月報_2026-09.xlsx']:
    (demo / name).write_text('test', encoding='utf-8')

for p in sorted(demo.iterdir()):                    # 列出所有項目
    print(f'{p.name:&lt;20} 副檔名={p.suffix.lower():&lt;6} 大小={p.stat().st_size} bytes')

print('Excel 檔：', [p.name for p in demo.glob('*.xlsx')])
print('含「月報」：', [p.name for p in demo.glob('*月報*')])</pre>
<table>
<tr><th>寫法</th><th>用途</th></tr>
<tr><td><code>p.iterdir()</code></td><td>列出資料夾內的檔案與子資料夾</td></tr>
<tr><td><code>p.glob('*.xlsx')</code></td><td>依萬用字元篩選</td></tr>
<tr><td><code>p.rglob('*.pdf')</code></td><td>包含所有子資料夾一起搜尋</td></tr>
<tr><td><code>p.is_file()</code> / <code>p.is_dir()</code></td><td>是檔案還是資料夾</td></tr>
<tr><td><code>p.name</code>、<code>p.stem</code>、<code>p.suffix</code></td><td>完整檔名、不含副檔名、副檔名</td></tr>
<tr><td><code>p.stat().st_size</code>、<code>st_mtime</code></td><td>檔案大小、最後修改時間</td></tr>
</table>` },
    { id: 'rename', title: '批次重新命名', html: `
<pre class="py">from pathlib import Path

folder = Path('photos')
folder.mkdir(exist_ok=True)
for i in [3, 1, 2]:
    (folder / f'IMG_{2030 + i}.jpg').write_text('x')

PREVIEW = True     # 先預覽，確認沒問題再改成 False
for n, p in enumerate(sorted(folder.glob('*.jpg')), start=1):
    new = p.with_name(f'墾丁旅遊_{n:03d}{p.suffix}')
    print(f'{p.name} → {new.name}')
    if not PREVIEW:
        p.rename(new)</pre>
<div class="box memo"><b class="t">動手做</b>把 PREVIEW 改成 False 執行，再加一行 <code>print(sorted(x.name for x in folder.iterdir()))</code> 確認結果。注意：如果新檔名已經存在，Windows 上 <code>rename</code> 會出錯，可以先用 <code>new.exists()</code> 檢查。</div>` },
    { id: 'organize', title: '動手做：下載資料夾自動整理器', html: `
<pre class="py">from pathlib import Path
import shutil

RULES = {
    '圖片': ['.jpg', '.jpeg', '.png', '.gif', '.heic'],
    '文件': ['.pdf', '.docx', '.doc', '.txt'],
    '試算表': ['.xlsx', '.xls', '.csv'],
    '簡報': ['.pptx', '.ppt'],
    '安裝檔': ['.exe', '.msi', '.dmg'],
}

def category_of(path):
    for cat, exts in RULES.items():
        if path.suffix.lower() in exts:
            return cat
    return '其他'

def organize(folder, preview=True):
    folder = Path(folder)
    moved = {}
    for p in folder.iterdir():
        if not p.is_file():
            continue                         # 跳過資料夾
        cat = category_of(p)
        target = folder / cat / p.name
        moved[cat] = moved.get(cat, 0) + 1
        print(('[預覽] ' if preview else '') + f'{p.name} → {cat}/')
        if not preview:
            target.parent.mkdir(exist_ok=True)
            shutil.move(str(p), str(target))
    return moved

# 準備練習檔案
demo = Path('downloads2')
demo.mkdir(exist_ok=True)
for name in ['報價單.xlsx', '會議紀錄.docx', 'IMG_2031.jpg', '簡報.pptx', 'setup.exe', 'note.md']:
    (demo / name).write_text('test')

print(organize(demo, preview=True))
print('---- 正式執行 ----')
print(organize(demo, preview=False))
print(sorted(str(p.relative_to(demo)) for p in demo.rglob('*') if p.is_file()))</pre>
<div class="box memo"><b class="t">動手做</b>①把超過 30 天沒修改的檔案移到「封存」資料夾（用 <code>time.time() - p.stat().st_mtime</code> 計算秒數）；②同名檔案已存在時，在檔名後加上 _1、_2。</div>` },
    { id: 'zip', title: '壓縮備份與記錄日誌', html: `
<pre class="py">from pathlib import Path
import shutil, logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s', force=True)

src = Path('reports_src')
src.mkdir(exist_ok=True)
for m in ['07', '08', '09']:
    (src / f'月報_2026-{m}.txt').write_text(f'{m} 月報內容', encoding='utf-8')

archive = shutil.make_archive('backup_2026Q3', 'zip', root_dir=src)   # 壓縮整個資料夾
logging.info('已建立備份：%s（%d bytes）', archive, Path(archive).stat().st_size)</pre>
<p><code>logging</code> 比 <code>print</code> 更適合自動化程式：可以記錄時間、分等級（INFO、WARNING、ERROR），也能寫進檔案（<code>filename='run.log'</code>），程式在背景排程執行時才查得到發生了什麼事。</p>
<div class="box tip"><b class="t">在自己的電腦使用</b>把 <code>Path('downloads2')</code> 改成 <code>Path.home() / 'Downloads'</code> 就是你的下載資料夾。第 3 章會教你設定每天自動執行。</div>` }
  ],
  keypoints: [
    '適合自動化的工作：重複、規則明確、量大',
    '先在複本上測試、加上預覽模式、不直接刪除',
    'iterdir 列出、glob／rglob 篩選、suffix 取副檔名、stat 取大小與時間',
    'with_name 產生新檔名、rename 重新命名、shutil.move 搬移',
    'mkdir(exist_ok=True) 建立資料夾不怕已存在',
    'shutil.make_archive 壓縮整個資料夾',
    'logging 記錄時間與等級，適合背景執行的程式'
  ]
},
{
  id: 'c02', subject: 1, minutes: 55,
  title: 'Excel 自動化',
  summary: '用 openpyxl 建立、讀取與修改 Excel，逐列處理資料、寫入公式、設定格式與欄寬，合併多個分店檔案成一份彙總報表。',
  sections: [
    { id: 'basic', title: 'openpyxl 基本操作', html: `
<p><b>openpyxl</b> 可以讀寫 .xlsx 檔案，不需要安裝 Excel。在自己電腦先執行 <code>pip install openpyxl</code>；網頁執行器第一次匯入時會自動安裝（約需數秒）。</p>
<div class="concepts">
  <div class="concept"><b>活頁簿 Workbook</b><span>整個 Excel 檔案。</span></div>
  <div class="concept"><b>工作表 Worksheet</b><span>檔案下方的分頁，例如「工作表1」。</span></div>
  <div class="concept"><b>儲存格 Cell</b><span>用 'A1' 或 (row=1, column=1) 指定，列與欄從 1 開始。</span></div>
</div>
<pre class="py">import openpyxl

wb = openpyxl.Workbook()            # 新的活頁簿
ws = wb.active                      # 預設的第一個工作表
ws.title = '九月業績'
ws['A1'] = '業務'
ws['B1'] = '業績'
ws.append(['小明', 120000])         # append 一次加一整列
ws.append(['小華', 98000])
ws.append(['小美', 135000])
ws['B5'] = '=SUM(B2:B4)'            # 寫入公式
wb.save('sales.xlsx')

wb2 = openpyxl.load_workbook('sales.xlsx')
ws2 = wb2['九月業績']
print(ws2['A2'].value, ws2.cell(row=2, column=2).value)
print('列數', ws2.max_row, '欄數', ws2.max_column)
for row in ws2.iter_rows(min_row=2, max_row=4, values_only=True):
    print(row)</pre>
<div class="box warn"><b class="t">公式不會被計算</b>openpyxl 寫入的公式要用 Excel 開啟後才會算出結果；用 openpyxl 讀取含公式的儲存格，預設拿到的是公式字串。若要讀取 Excel 上次計算的結果，用 <code>load_workbook(檔名, data_only=True)</code>。</div>` },
    { id: 'process', title: '逐列處理資料', html: `
<pre class="py">import openpyxl

wb = openpyxl.Workbook()
ws = wb.active
ws.append(['訂單編號', '品項', '單價', '數量'])
for r in [['A001', '滑鼠', 590, 3], ['A002', '鍵盤', 1290, 1], ['A003', '螢幕', 4990, 2], ['A004', '滑鼠', 590, 10]]:
    ws.append(r)

ws['E1'] = '小計'
ws['F1'] = '備註'
for row in range(2, ws.max_row + 1):
    price = ws.cell(row, 3).value
    qty = ws.cell(row, 4).value
    ws.cell(row, 5, price * qty)                 # 直接寫入計算結果
    if qty &gt;= 10:
        ws.cell(row, 6, '大量訂單')

for row in ws.iter_rows(values_only=True):
    print(row)</pre>
<div class="box tip"><b class="t">何時用 pandas</b>資料量大、需要篩選、分組統計時，用第 7 章的 pandas 讀進來處理更方便（<code>pd.read_excel</code>）。openpyxl 的強項是<b>保留格式、寫入公式、操作特定儲存格</b>，例如填寫公司固定格式的報表。</div>` },
    { id: 'style', title: '格式與外觀', html: `
<pre class="py">import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

wb = openpyxl.Workbook()
ws = wb.active
ws.append(['分店', '營業額', '達成率'])
for r in [['台北', 1250000, 1.08], ['台中', 860000, 0.92], ['高雄', 990000, 1.01]]:
    ws.append(r)

header_fill = PatternFill('solid', fgColor='1F4E8C')
thin = Side(style='thin', color='CCCCCC')
for cell in ws[1]:                              # 第一列標題
    cell.font = Font(bold=True, color='FFFFFF')
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal='center')

for row in ws.iter_rows(min_row=2):
    row[1].number_format = '#,##0'              # 千分位
    row[2].number_format = '0.0%'               # 百分比
    if row[2].value &lt; 1:
        row[2].font = Font(color='C00000')       # 未達標標紅色
    for c in row:
        c.border = Border(bottom=thin)

ws.column_dimensions['A'].width = 10
ws.column_dimensions['B'].width = 14
ws.freeze_panes = 'A2'                           # 凍結標題列
wb.save('styled.xlsx')
print('已輸出 styled.xlsx，在自己電腦用 Excel 開啟即可看到格式')</pre>` },
    { id: 'merge', title: '動手做：各分店月報自動彙整', html: `
<p>情境：每個月 30 家分店各自交一份格式相同的 Excel，你要合併成一份總表並算出各分店合計。</p>
<pre class="py">import openpyxl
from pathlib import Path

# 1. 準備練習檔案：三家分店各一份
folder = Path('branch_reports')
folder.mkdir(exist_ok=True)
data = {
    '台北': [['2026-09-01', '飲料', 32000], ['2026-09-01', '餐點', 51000]],
    '台中': [['2026-09-01', '飲料', 21000], ['2026-09-02', '餐點', 33000]],
    '高雄': [['2026-09-01', '飲料', 25000], ['2026-09-02', '飲料', 18000]],
}
for branch, rows in data.items():
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.append(['日期', '類別', '金額'])
    for r in rows:
        ws.append(r)
    wb.save(folder / f'{branch}_2026-09.xlsx')

# 2. 合併
out = openpyxl.Workbook()
detail = out.active
detail.title = '明細'
detail.append(['分店', '日期', '類別', '金額'])
totals = {}
for f in sorted(folder.glob('*_2026-09.xlsx')):
    branch = f.stem.split('_')[0]                    # 從檔名取得分店名稱
    ws = openpyxl.load_workbook(f).active
    for date, cat, amount in ws.iter_rows(min_row=2, values_only=True):
        detail.append([branch, date, cat, amount])
        totals[branch] = totals.get(branch, 0) + amount

# 3. 彙總工作表
summary = out.create_sheet('彙總')
summary.append(['分店', '九月合計'])
for b, t in sorted(totals.items(), key=lambda x: -x[1]):
    summary.append([b, t])
summary.append(['總計', f'=SUM(B2:B{summary.max_row})'])
out.save('總表_2026-09.xlsx')

for row in summary.iter_rows(values_only=True):
    print(row)
print('明細共', detail.max_row - 1, '筆')</pre>
<div class="box memo"><b class="t">動手做</b>加上檢查：如果某個分店檔案的標題列不是「日期、類別、金額」，就印出警告並跳過，避免格式錯誤的檔案混進總表。實務上這種防呆比主程式還重要。</div>
<div class="box tip"><b class="t">作品集提示</b>把「原本手動合併要 2 小時，程式 10 秒完成」寫進 README，就是很有說服力的作品描述。</div>` }
  ],
  keypoints: [
    'Workbook 是檔案、Worksheet 是分頁、Cell 是儲存格，列與欄從 1 開始',
    'load_workbook 讀取、ws.append 加一列、wb.save 存檔',
    'iter_rows(min_row=2, values_only=True) 從第二列開始逐列取值',
    'openpyxl 寫入的公式要用 Excel 開啟才會計算；data_only=True 讀取計算結果',
    'Font、PatternFill、number_format、column_dimensions 設定格式',
    '合併多檔：glob 找檔 → 逐檔讀取 → 寫入同一份明細 → 另建彙總工作表',
    '大量資料分析用 pandas；固定格式報表用 openpyxl'
  ]
},
{
  id: 'c03', subject: 1, minutes: 45,
  title: '自動寄信與排程',
  summary: '用 email 與 smtplib 組合並寄出含附件的信件、Gmail 應用程式密碼、用環境變數保存帳密，以及 Windows 工作排程器與 cron 定時執行。',
  sections: [
    { id: 'message', title: '組合一封 Email', html: `
<p>Python 標準函式庫就能寄信：<code>email</code> 負責組合信件內容，<code>smtplib</code> 負責連線到郵件伺服器送出。先在網頁上練習組合信件（不會真的寄出）：</p>
<pre class="py">from email.message import EmailMessage
from pathlib import Path

Path('月報.csv').write_text('分店,營業額\\n台北,1250000\\n', encoding='utf-8-sig')

msg = EmailMessage()
msg['Subject'] = '【自動寄送】2026 年 9 月營業月報'
msg['From'] = 'report-bot@example.com'
msg['To'] = 'boss@example.com, team@example.com'
msg.set_content('主管您好：\\n\\n附件為 9 月營業月報，請查收。\\n\\n（本信由程式自動寄出）')
msg.add_alternative('&lt;p&gt;主管您好：&lt;/p&gt;&lt;p&gt;附件為 &lt;b&gt;9 月營業月報&lt;/b&gt;，請查收。&lt;/p&gt;', subtype='html')

data = Path('月報.csv').read_bytes()
msg.add_attachment(data, maintype='text', subtype='csv', filename='月報.csv')

print(msg['Subject'])
print('附件：', [part.get_filename() for part in msg.iter_attachments()])</pre>` },
    { id: 'send', title: '寄出信件與保護密碼', html: `
<p>以 Gmail 為例，Google 不允許直接用登入密碼寄信，要先開啟<b>兩步驟驗證</b>，再到 Google 帳戶的「應用程式密碼」產生一組 16 碼密碼。公司信箱（Microsoft 365、自架郵件）請向 IT 確認 SMTP 伺服器與寄信規定。</p>
<pre class="out"># send_report.py —— 請在自己的電腦執行
import os, smtplib
from email.message import EmailMessage
from pathlib import Path

USER = os.environ['MAIL_USER']            # 從環境變數讀取，不寫在程式碼裡
PASSWORD = os.environ['MAIL_APP_PASSWORD']

msg = EmailMessage()
msg['Subject'] = '【自動寄送】營業月報'
msg['From'] = USER
msg['To'] = 'boss@example.com'
msg.set_content('附件為本月月報。')
msg.add_attachment(Path('總表.xlsx').read_bytes(), maintype='application',
                   subtype='vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                   filename='總表.xlsx')

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    server.login(USER, PASSWORD)
    server.send_message(msg)
print('寄送完成')</pre>
<div class="box warn"><b class="t">密碼絕對不要寫在程式碼裡</b>程式碼常會被分享、上傳到 GitHub，密碼一旦外洩就可能被拿去寄垃圾信。正確做法是放在<b>環境變數</b>，或寫在 <code>.env</code> 檔並用 <code>python-dotenv</code> 讀取，同時把 <code>.env</code> 加進 <code>.gitignore</code>。</div>
<pre class="out"># 設定環境變數
# Windows（命令提示字元，設定後重新開啟視窗才生效）
setx MAIL_USER "you@gmail.com"
setx MAIL_APP_PASSWORD "abcd efgh ijkl mnop"

# macOS／Linux（寫進 ~/.zshrc 或 ~/.bashrc）
export MAIL_USER="you@gmail.com"
export MAIL_APP_PASSWORD="abcd efgh ijkl mnop"</pre>
<pre class="py">import os
os.environ['DEMO_TOKEN'] = 'secret-123'          # 示範：程式內設定（實務上由系統設定）
token = os.environ.get('DEMO_TOKEN')
print('讀到金鑰：', token[:3] + '***')            # 印出時也只顯示前幾碼
print('沒設定時：', os.environ.get('NOT_SET', '（未設定）'))</pre>` },
    { id: 'schedule', title: '排程：讓程式每天自動執行', html: `
<table>
<tr><th>系統</th><th>工具</th><th>設定方式</th></tr>
<tr><td>Windows</td><td><b>工作排程器</b></td><td>建立基本工作 → 觸發程序選「每天」→ 動作選「啟動程式」，程式填 python.exe 的完整路徑，引數填腳本路徑，「開始位置」填腳本所在資料夾</td></tr>
<tr><td>macOS／Linux</td><td><b>cron</b></td><td>終端機輸入 <code>crontab -e</code>，加入一行排程</td></tr>
<tr><td>雲端</td><td>GitHub Actions、AWS Lambda + EventBridge</td><td>電腦不用開機也能執行（可接續 AWS 課程）</td></tr>
</table>
<pre class="out"># cron 格式：分 時 日 月 星期  指令
# 每個工作日早上 8:30 寄出月報
30 8 * * 1-5  cd /home/me/report &amp;&amp; /home/me/report/.venv/bin/python send_report.py &gt;&gt; run.log 2&gt;&amp;1

# 查詢 python 路徑
# Windows: where python      macOS/Linux: which python3</pre>
<div class="box exam"><b class="t">排程常見問題</b>①找不到檔案：排程執行時的「目前目錄」不是腳本所在位置，程式中請用 <code>Path(__file__).parent / '檔名'</code> 組出絕對路徑；②找不到套件：要用虛擬環境裡的 python 路徑；③不知道有沒有執行：把輸出與錯誤寫進日誌檔。</div>
<pre class="py">from pathlib import Path
# 在 .py 檔中，__file__ 是這個程式檔的路徑；網頁執行器沒有檔案，所以這裡用替代值示範
script = Path('/home/me/report/send_report.py')
base = script.parent
print('資料檔路徑：', base / 'data' / '總表.xlsx')</pre>` },
    { id: 'project', title: '動手做：每日報表自動寄送', html: `
<p>把前兩章和本章組合起來，就是一個完整的自動化專案：</p>
<div class="flow">
  <div><b>排程觸發</b><span>每天 8:30</span></div>
  <div><b>整理資料</b><span>合併各分店 Excel（第 2 章）</span></div>
  <div><b>產生報表</b><span>彙總與格式</span></div>
  <div><b>寄出 Email</b><span>附上報表</span></div>
  <div><b>寫入日誌</b><span>成功或失敗都記錄</span></div>
</div>
<pre class="out"># daily_report.py 架構
import logging
from pathlib import Path

BASE = Path(__file__).parent
logging.basicConfig(filename=BASE / 'run.log', level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(message)s')

def build_report():   ...   # 第 2 章的合併程式，回傳報表路徑
def send(path):       ...   # 本章的寄信程式

if __name__ == '__main__':
    try:
        path = build_report()
        send(path)
        logging.info('完成：%s', path.name)
    except Exception:
        logging.exception('執行失敗')     # 記錄完整錯誤訊息
        raise</pre>
<div class="box memo"><b class="t">動手做</b>加上「失敗時寄信通知自己」的功能，並在 README 中說明：需要哪些環境變數、如何設定排程、輸出的檔案放在哪裡。</div>` }
  ],
  keypoints: [
    'EmailMessage 組合主旨、收件人、內文、HTML 與附件',
    'smtplib.SMTP_SSL 連線並以 send_message 寄出',
    'Gmail 需開啟兩步驟驗證並使用應用程式密碼',
    '帳號密碼放環境變數或 .env，.env 要加入 .gitignore',
    'Windows 用工作排程器、macOS／Linux 用 cron 定時執行',
    '排程時用 Path(__file__).parent 組出絕對路徑，並用虛擬環境的 python',
    '自動化程式要寫日誌，失敗時用 logging.exception 記錄完整錯誤'
  ]
},
{
  id: 'c04', subject: 1, minutes: 50,
  title: 'HTTP 與 API',
  summary: 'HTTP 請求與回應、狀態碼、用 requests 呼叫 API、查詢參數與標頭、JSON 解析、錯誤處理與逾時，並串接政府開放資料。',
  sections: [
    { id: 'http', title: 'HTTP 請求與回應', html: `
<p>瀏覽網頁或使用 App 時，背後都是<b>用戶端</b>向<b>伺服器</b>送出 HTTP 請求、再收到回應。<b>API（Application Programming Interface）</b>是專門給程式使用的網址，回應通常是 JSON 而不是網頁。</p>
<table>
<tr><th>組成</th><th>說明</th><th>例子</th></tr>
<tr><td>方法 Method</td><td>GET 取得資料、POST 送出資料</td><td><code>GET</code></td></tr>
<tr><td>網址 URL</td><td>要存取的資源</td><td><code>https://api.example.com/weather</code></td></tr>
<tr><td>查詢參數 Query</td><td>網址 ? 後面的條件</td><td><code>?city=台北&amp;days=3</code></td></tr>
<tr><td>標頭 Headers</td><td>附加資訊，例如金鑰、格式</td><td><code>Authorization: Bearer xxx</code></td></tr>
<tr><td>狀態碼 Status</td><td>伺服器回應的結果</td><td><code>200</code></td></tr>
</table>
<table>
<tr><th>狀態碼</th><th>意義</th><th>怎麼處理</th></tr>
<tr><td><b>200</b></td><td>成功</td><td>讀取回應內容</td></tr>
<tr><td><b>400</b></td><td>請求格式錯誤</td><td>檢查參數</td></tr>
<tr><td><b>401／403</b></td><td>未授權／禁止存取</td><td>檢查 API 金鑰與權限</td></tr>
<tr><td><b>404</b></td><td>找不到</td><td>檢查網址</td></tr>
<tr><td><b>429</b></td><td>請求太頻繁</td><td>等待後再試、降低頻率</td></tr>
<tr><td><b>500 以上</b></td><td>伺服器錯誤</td><td>稍後重試</td></tr>
</table>` },
    { id: 'requests', title: '用 requests 呼叫 API', html: `
<p><code>requests</code> 是最常用的 HTTP 套件（<code>pip install requests</code>）。網頁執行器無法連線外部網站，下列程式請在自己的電腦執行：</p>
<pre class="out">import requests

url = 'https://api.github.com/repos/python/cpython'
r = requests.get(url, timeout=10)          # 一定要設定逾時，避免程式卡住
print(r.status_code)                       # 200
r.raise_for_status()                       # 不是 2xx 就拋出例外
data = r.json()                            # JSON → 字典
print(data['full_name'], data['stargazers_count'])

# 查詢參數用 params，requests 會自動處理中文與特殊字元
r = requests.get('https://api.example.com/search',
                 params={'q': '台北 咖啡', 'limit': 5},
                 headers={'Authorization': f'Bearer {token}'},
                 timeout=10)</pre>
<p>API 回應的 JSON 通常是多層的字典與串列。學會「一層一層取出資料」是最重要的技巧，這部分可以在網頁上練習：</p>
<pre class="py">import json

# 模擬 API 回傳的 JSON 文字
text = '''{
  "success": true,
  "records": {
    "location": [
      {"locationName": "臺北市", "weather": {"desc": "多雲", "minT": 22, "maxT": 29}},
      {"locationName": "高雄市", "weather": {"desc": "晴", "minT": 25, "maxT": 32}}
    ]
  }
}'''
data = json.loads(text)
for loc in data['records']['location']:
    w = loc['weather']
    print(f"{loc['locationName']}：{w['desc']}，{w['minT']}～{w['maxT']} 度")</pre>
<div class="box tip"><b class="t">看懂巢狀 JSON 的技巧</b>先印出 <code>data.keys()</code> 看最外層有哪些鍵，再一層一層往下走。也可以把 API 網址貼到瀏覽器，Chrome 與 Firefox 會自動排版 JSON 方便閱讀。</div>` },
    { id: 'robust', title: '錯誤處理、逾時與重試', html: `
<pre class="out">import time, requests

def get_json(url, params=None, retries=3):
    for attempt in range(1, retries + 1):
        try:
            r = requests.get(url, params=params, timeout=10)
            if r.status_code == 429:                 # 太頻繁：等一下再試
                time.sleep(5 * attempt)
                continue
            r.raise_for_status()
            return r.json()
        except requests.Timeout:
            print(f'第 {attempt} 次逾時')
        except requests.RequestException as e:      # 連線錯誤、HTTP 錯誤等
            print(f'第 {attempt} 次失敗：{e}')
        time.sleep(2 * attempt)                      # 逐次拉長等待時間
    raise RuntimeError(f'重試 {retries} 次仍失敗：{url}')</pre>
<div class="box exam"><b class="t">呼叫 API 的好習慣</b>①一定設定 <code>timeout</code>；②檢查狀態碼；③遇到 429 與 5xx 才重試，400／401 重試也沒用；④遵守 API 的使用次數限制；⑤金鑰放環境變數。</div>` },
    { id: 'opendata', title: '動手做：串接政府開放資料', html: `
<p>台灣有大量免費的開放資料，很適合當作品題材：</p>
<table>
<tr><th>平台</th><th>內容</th></tr>
<tr><td><a href="https://data.gov.tw/" target="_blank" rel="noopener">政府資料開放平臺</a></td><td>各部會資料集總入口</td></tr>
<tr><td><a href="https://opendata.cwa.gov.tw/" target="_blank" rel="noopener">中央氣象署開放資料</a></td><td>天氣預報、觀測、地震（需免費註冊取得授權碼）</td></tr>
<tr><td><a href="https://data.moenv.gov.tw/" target="_blank" rel="noopener">環境部環境資料開放平臺</a></td><td>空氣品質 AQI 等（需申請 API Key）</td></tr>
<tr><td><a href="https://openapi.twse.com.tw/" target="_blank" rel="noopener">證交所 OpenAPI</a></td><td>上市股票每日行情、本益比等，免金鑰</td></tr>
<tr><td><a href="https://tdx.transportdata.tw/" target="_blank" rel="noopener">運輸資料流通服務 TDX</a></td><td>公車、捷運、台鐵、YouBike 即時資料</td></tr>
</table>
<pre class="out"># 證交所：上市個股本益比、殖利率（免金鑰）—— 請在自己的電腦執行
import requests

url = 'https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL'
rows = requests.get(url, timeout=15).json()
print('資料筆數：', len(rows))
print(rows[0])          # 先看一筆的欄位名稱，再決定要取哪些欄位

high_yield = [r for r in rows if r.get('DividendYield') and float(r['DividendYield']) &gt;= 6]
for r in high_yield[:10]:
    print(r['Code'], r['Name'], r['DividendYield'], r['PEratio'])</pre>
<div class="box warn"><b class="t">欄位名稱以實際回應為準</b>開放資料的欄位與格式可能調整，寫程式前先印出一筆資料確認欄位。數值常以字串表示，空值可能是空字串或「-」，轉型前要先檢查。</div>
<div class="box memo"><b class="t">動手做</b>選一個你有興趣的開放資料（天氣、空品、YouBike），寫一個程式查詢資料並存成 CSV，這就是你的第一個 API 作品。</div>` }
  ],
  keypoints: [
    'HTTP 請求包含方法、網址、查詢參數、標頭；回應包含狀態碼與內容',
    '200 成功、401/403 權限問題、404 找不到、429 太頻繁、5xx 伺服器錯誤',
    'requests.get(url, params=..., headers=..., timeout=10)',
    'raise_for_status() 檢查狀態碼；r.json() 把回應轉成字典',
    '巢狀 JSON 一層一層取值，先印出 keys() 確認結構',
    '只對 429 與 5xx 重試，並逐次拉長等待時間',
    '台灣開放資料：data.gov.tw、氣象署、環境部、證交所、TDX'
  ]
},
{
  id: 'c05', subject: 1, minutes: 50,
  title: '網頁爬蟲',
  summary: '網頁的 HTML 結構、用開發者工具找元素、BeautifulSoup 解析與 CSS 選擇器、分頁與延遲、儲存結果，以及爬蟲的法律與禮儀界線。',
  sections: [
    { id: 'ethics', title: '先談界線：可以爬嗎？', html: `
<div class="box warn"><b class="t">爬蟲前一定要確認</b>①網站的<b>使用條款</b>是否禁止自動擷取；②<code>網站/robots.txt</code> 的規範；③<b>有沒有官方 API</b>，有就優先用 API；④<b>不抓取個人資料</b>（姓名、電話、Email 等），以免違反個資法；⑤控制頻率，每次請求之間加延遲，不要造成網站負擔；⑥抓到的內容有著作權，不可任意轉載或商業使用。</div>
<p>一般原則：抓取公開的商品價格、公告、統計資料供<b>個人研究</b>通常風險較低；繞過登入、驗證碼、付費牆，或大量複製他人內容，就可能涉及違法。不確定時，請先詢問網站方或法律專業人士。</p>` },
    { id: 'html', title: 'HTML 結構與開發者工具', html: `
<p>網頁是由 <b>HTML 標籤</b>組成的樹狀結構，每個標籤可以有 <code>class</code>、<code>id</code> 等屬性，爬蟲就是依這些特徵找到需要的資料。</p>
<pre class="out">&lt;div class="product"&gt;
  &lt;h2 class="title"&gt;無線滑鼠&lt;/h2&gt;
  &lt;span class="price"&gt;NT$ 590&lt;/span&gt;
  &lt;a href="/item/123"&gt;查看詳情&lt;/a&gt;
&lt;/div&gt;</pre>
<p>在 Chrome 對想抓的文字按右鍵 →「<b>檢查</b>」，就會打開開發者工具並標出對應的 HTML。觀察它的標籤名稱與 class，就能寫出選擇器。</p>
<table>
<tr><th>CSS 選擇器</th><th>意思</th></tr>
<tr><td><code>h2</code></td><td>所有 h2 標籤</td></tr>
<tr><td><code>.price</code></td><td>class 為 price 的元素</td></tr>
<tr><td><code>#main</code></td><td>id 為 main 的元素</td></tr>
<tr><td><code>div.product h2</code></td><td>在 div.product 裡面的 h2</td></tr>
<tr><td><code>a[href]</code></td><td>有 href 屬性的 a 標籤</td></tr>
<tr><td><code>table tr td:nth-child(2)</code></td><td>表格每一列的第二格</td></tr>
</table>` },
    { id: 'bs4', title: 'BeautifulSoup 解析', html: `
<p><b>BeautifulSoup</b>（<code>pip install beautifulsoup4</code>）把 HTML 轉成可以搜尋的物件。網頁執行器無法連網，但可以解析我們準備好的 HTML：</p>
<pre class="py">from bs4 import BeautifulSoup

html = '''
&lt;div id="list"&gt;
  &lt;div class="product"&gt;&lt;h2 class="title"&gt;無線滑鼠&lt;/h2&gt;&lt;span class="price"&gt;NT$ 590&lt;/span&gt;&lt;a href="/item/1"&gt;詳情&lt;/a&gt;&lt;/div&gt;
  &lt;div class="product"&gt;&lt;h2 class="title"&gt;機械鍵盤&lt;/h2&gt;&lt;span class="price"&gt;NT$ 2,490&lt;/span&gt;&lt;a href="/item/2"&gt;詳情&lt;/a&gt;&lt;/div&gt;
  &lt;div class="product"&gt;&lt;h2 class="title"&gt;27 吋螢幕&lt;/h2&gt;&lt;span class="price sale"&gt;NT$ 5,990&lt;/span&gt;&lt;a href="/item/3"&gt;詳情&lt;/a&gt;&lt;/div&gt;
&lt;/div&gt;
'''
soup = BeautifulSoup(html, 'html.parser')
print(soup.select_one('h2.title').text)              # 第一個符合的元素

items = []
for div in soup.select('div.product'):                # 所有符合的元素
    name = div.select_one('.title').get_text(strip=True)
    price_text = div.select_one('.price').get_text(strip=True)
    price = int(price_text.replace('NT$', '').replace(',', '').strip())
    link = div.select_one('a')['href']                # 取屬性
    on_sale = 'sale' in div.select_one('.price').get('class', [])
    items.append({'name': name, 'price': price, 'link': link, 'sale': on_sale})

for it in items:
    print(it)
print('最便宜：', min(items, key=lambda x: x['price'])['name'])</pre>
<table>
<tr><th>方法</th><th>用途</th></tr>
<tr><td><code>select(css)</code></td><td>回傳所有符合的元素（串列）</td></tr>
<tr><td><code>select_one(css)</code></td><td>回傳第一個符合的元素，找不到是 None</td></tr>
<tr><td><code>.get_text(strip=True)</code></td><td>取出文字並去除前後空白</td></tr>
<tr><td><code>el['href']</code> / <code>el.get('href')</code></td><td>取得屬性（get 找不到回傳 None）</td></tr>
</table>` },
    { id: 'crawl', title: '實際抓取：分頁、延遲與儲存', html: `
<pre class="out"># price_tracker.py —— 請在自己的電腦執行，網址請換成允許爬取的網站
import csv, time, random
from datetime import date
import requests
from bs4 import BeautifulSoup

HEADERS = {'User-Agent': 'Mozilla/5.0 (personal price tracker; contact: you@example.com)'}

def fetch(url):
    r = requests.get(url, headers=HEADERS, timeout=15)
    r.raise_for_status()
    r.encoding = r.apparent_encoding          # 避免中文亂碼
    return BeautifulSoup(r.text, 'html.parser')

rows = []
for page in range(1, 4):                       # 抓前三頁
    soup = fetch(f'https://example.com/products?page={page}')
    for div in soup.select('div.product'):
        rows.append([date.today(), div.select_one('.title').get_text(strip=True),
                     div.select_one('.price').get_text(strip=True)])
    time.sleep(random.uniform(2, 4))           # 每頁之間隨機等待 2～4 秒

with open('prices.csv', 'a', newline='', encoding='utf-8-sig') as f:
    csv.writer(f).writerows(rows)
print('完成，共', len(rows), '筆')</pre>
<div class="box tip"><b class="t">抓不到資料怎麼辦</b>有些網站的內容是 JavaScript 載入的，用 requests 拿到的 HTML 裡沒有資料。這時先打開開發者工具的「<b>Network（網路）</b>」分頁，重新整理網頁，篩選 Fetch/XHR，常能找到網站自己使用的 JSON API，直接用第 4 章的方法取得資料更穩定。真的需要操作瀏覽器時，才考慮 Playwright 或 Selenium。</div>
<div class="box memo"><b class="t">動手做：價格追蹤爬蟲</b>選一個允許爬取的網站，每天記錄幾項商品的價格到 CSV，搭配第 3 章的排程每天執行。下一章再加上「降價時通知手機」。</div>` }
  ],
  keypoints: [
    '爬蟲前確認使用條款與 robots.txt、優先使用官方 API、不抓個資、控制頻率',
    '用 Chrome 右鍵「檢查」找出資料所在的標籤與 class',
    'CSS 選擇器：.class、#id、父 子、[屬性]',
    'BeautifulSoup：select 取全部、select_one 取第一個、get_text(strip=True) 取文字',
    '取屬性用 el["href"] 或 el.get("href")',
    '請求之間加延遲、設定 timeout 與 User-Agent，中文亂碼可設定 r.encoding',
    'JavaScript 載入的網站先到 Network 分頁找 JSON API'
  ]
},
{
  id: 'c06', subject: 1, minutes: 40,
  title: '通知機器人',
  summary: '建立 Telegram Bot、取得 Token 與 Chat ID、用 requests 發送訊息、設計通知條件避免洗版，以及 LINE Messaging API 的差異，完成降價通知機器人。',
  sections: [
    { id: 'why', title: '為什麼需要通知機器人', html: `
<p>自動化程式在背景執行時，你需要一個方式知道「有事情發生了」，例如商品降價、報表產生失敗、空氣品質變差。Email 太容易被忽略，手機推播最即時。</p>
<table>
<tr><th>管道</th><th>優點</th><th>限制</th></tr>
<tr><td><b>Telegram Bot</b></td><td>免費、設定最簡單、沒有則數限制的困擾</td><td>收訊者需安裝 Telegram</td></tr>
<tr><td><b>LINE Messaging API</b></td><td>台灣普及率最高</td><td>需建立 LINE 官方帳號，免費方案每月有訊息則數上限</td></tr>
<tr><td><b>Email</b></td><td>不用額外註冊</td><td>即時性差</td></tr>
<tr><td><b>Discord／Slack Webhook</b></td><td>適合團隊頻道</td><td>需有對應的工作區</td></tr>
</table>
<div class="box warn"><b class="t">LINE Notify 已停止服務</b>LINE Notify 已於 2025 年 3 月 31 日結束服務，網路上的舊教學已無法使用，請改用 LINE Messaging API 或其他管道。</div>` },
    { id: 'telegram', title: '建立 Telegram Bot', html: `
<ol>
  <li>在 Telegram 搜尋 <b>@BotFather</b>，傳送 <code>/newbot</code>，依指示設定名稱，取得 <b>Bot Token</b>（類似 <code>123456:ABC-xxxx</code>）。</li>
  <li>搜尋你剛建立的 Bot，對它傳送任意一則訊息（Bot 不能主動找你，你要先跟它說話）。</li>
  <li>用瀏覽器開啟 <code>https://api.telegram.org/bot&lt;Token&gt;/getUpdates</code>，在回應中找到 <code>"chat":{"id": 數字}</code>，這就是你的 <b>Chat ID</b>。</li>
  <li>把 Token 與 Chat ID 設定為環境變數 <code>TG_TOKEN</code>、<code>TG_CHAT_ID</code>。</li>
</ol>
<pre class="out"># notify.py —— 請在自己的電腦執行
import os, requests

def send_telegram(text):
    token = os.environ['TG_TOKEN']
    chat_id = os.environ['TG_CHAT_ID']
    r = requests.post(f'https://api.telegram.org/bot{token}/sendMessage',
                      json={'chat_id': chat_id, 'text': text},
                      timeout=10)
    r.raise_for_status()
    return r.json()['ok']

if __name__ == '__main__':
    send_telegram('哈囉！這是 Python 傳來的第一則通知 🎉')</pre>
<div class="box exam"><b class="t">Token 就是密碼</b>任何拿到 Bot Token 的人都能用你的 Bot 發訊息。不小心公開時，到 BotFather 用 <code>/revoke</code> 重新產生。</div>` },
    { id: 'logic', title: '設計通知條件', html: `
<p>通知機器人最常見的問題是<b>洗版</b>：每次執行都發通知，很快就會被忽略。好的通知要「<b>有變化才通知</b>」，並記住上次的狀態。</p>
<pre class="py">import json
from pathlib import Path

STATE = Path('last_prices.json')

def load_state():
    return json.loads(STATE.read_text(encoding='utf-8')) if STATE.exists() else {}

def check(prices, targets):
    """prices: 目前價格；targets: 目標價。回傳要發送的訊息清單"""
    last = load_state()
    messages = []
    for name, price in prices.items():
        target = targets.get(name)
        old = last.get(name)
        if target and price &lt;= target and (old is None or old &gt; target):
            messages.append(f'🔔 {name} 降到 {price:,} 元（目標 {target:,}）')
        elif old and price &lt; old * 0.9:
            messages.append(f'📉 {name} 大降價：{old:,} → {price:,}')
    STATE.write_text(json.dumps(prices, ensure_ascii=False), encoding='utf-8')
    return messages

targets = {'機械鍵盤': 2000, '27 吋螢幕': 5500}
print('第 1 天：', check({'機械鍵盤': 2490, '27 吋螢幕': 5990}, targets))
print('第 2 天：', check({'機械鍵盤': 1990, '27 吋螢幕': 5990}, targets))
print('第 3 天：', check({'機械鍵盤': 1990, '27 吋螢幕': 5300}, targets))   # 鍵盤不重複通知</pre>
<div class="box tip"><b class="t">實務技巧</b>①同一件事只通知一次，狀態恢復後才重新通知；②把多則通知合併成一則摘要；③設定安靜時段；④程式失敗也要通知，否則你會以為「沒消息就是好消息」。</div>` },
    { id: 'project', title: '動手做：降價通知機器人', html: `
<div class="flow">
  <div><b>排程</b><span>每天 9:00、21:00</span></div>
  <div><b>抓價格</b><span>第 5 章的爬蟲或 API</span></div>
  <div><b>比較狀態</b><span>本章的 check()</span></div>
  <div><b>發送通知</b><span>Telegram</span></div>
</div>
<pre class="out"># price_bot.py
from price_tracker import get_prices      # 第 5 章：回傳 {商品: 價格}
from notify import send_telegram          # 本章
from checker import check                 # 本章

TARGETS = {'機械鍵盤': 2000, '27 吋螢幕': 5500}

try:
    for msg in check(get_prices(), TARGETS):
        send_telegram(msg)
except Exception as e:
    send_telegram(f'⚠️ 價格機器人執行失敗：{e}')
    raise</pre>
<h3>LINE Messaging API 簡介</h3>
<p>若通知對象主要使用 LINE：到 LINE Developers 建立 Messaging API Channel（會同時建立 LINE 官方帳號），取得 Channel Access Token，請使用者加入好友後，以 push message API 發送訊息。免費方案每月有則數上限，詳細規定以 LINE 官方公告為準。</p>
<div class="box memo"><b class="t">作品集提示</b>這個專案串起了爬蟲、狀態管理、排程與通知，是很完整的自動化作品。README 中附上一張手機收到通知的截圖，效果很好。</div>` }
  ],
  keypoints: [
    'Telegram Bot：@BotFather 建立取得 Token，先對 Bot 傳訊息再用 getUpdates 取得 Chat ID',
    '用 requests.post 呼叫 sendMessage 發送訊息',
    'Bot Token 等同密碼，放環境變數，外洩時用 /revoke 重新產生',
    '有變化才通知：把上次狀態存成 JSON 並比對',
    '程式失敗也要發通知',
    'LINE Notify 已於 2025/3/31 停止服務，改用 LINE Messaging API',
    '爬蟲 + 狀態比對 + 排程 + 通知 = 完整的自動化作品'
  ]
}
);
