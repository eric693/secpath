/* 可橫向捲動的表格（.table-wrap）：依捲動位置加上 fade-l／fade-r，讓被截掉的一側淡出，提示可以滑動。
   表格會在切換頁面或互動練習重新計算時重建，所以用 MutationObserver 監看整頁並合併到下一個畫格處理。 */
(function () {
  const mark = w => {
    const max = w.scrollWidth - w.clientWidth;
    w.classList.toggle('fade-l', max > 2 && w.scrollLeft > 2);
    w.classList.toggle('fade-r', max > 2 && w.scrollLeft < max - 2);
  };
  let queued = false;
  const all = () => { queued = false; document.querySelectorAll('.table-wrap').forEach(mark); };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(all); } };
  document.addEventListener('scroll', e => { if (e.target.classList && e.target.classList.contains('table-wrap')) mark(e.target); }, true);
  addEventListener('resize', queue);
  new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true });
  queue();
})();
