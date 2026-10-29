/* 在頁面繪製前套用使用者選擇的深色／淺色主題，避免閃爍（CSP 不允許內嵌腳本，所以獨立成檔案） */
try { var t = localStorage.getItem('secpath.theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) {}
