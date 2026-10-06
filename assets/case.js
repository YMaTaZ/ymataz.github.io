/* 案例页共享脚本：转场遮罩 · 入场 · 数字走动 · 图表生长 */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 转场：纸面展开（纯透明度 + 轻微位移，无点阵） ---- */
  var intro = document.querySelector('.case-intro');
  if (intro) {
    var ready = function () { intro.classList.add('is-ready'); };
    if (reduce) { ready(); }
    else { requestAnimationFrame(function () { requestAnimationFrame(ready); }); }
    setTimeout(ready, 700); /* 兜底：即使动画未触发，内容也一定可见 */
  }

  /* ---- 导航滚动态 ---- */
  var nav = document.querySelector('.c-nav');
  function syncNav() { if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', syncNav, { passive: true }); syncNav();

  /* ---- 数字走动 ---- */
  function countUp(el) {
    var to = parseFloat(el.dataset.to), dec = parseInt(el.dataset.dec || '0', 10);
    var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = pre + to.toFixed(dec) + suf; return; }
    var steps = 22, t0 = null;
    function frame(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / 850);
      el.textContent = pre + (to * (Math.round(p * steps) / steps)).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = pre + to.toFixed(dec) + suf;
    }
    requestAnimationFrame(frame);
  }

  /* ---- 点阵 100 ---- */
  document.querySelectorAll('[data-grid]').forEach(function (el) {
    var cols = parseInt(el.dataset.cols || '10', 10), lit = parseInt(el.dataset.lit || '0', 10);
    var total = el.dataset.total ? parseInt(el.dataset.total, 10) : cols * Math.max(1, Math.ceil(lit / cols));
    var frag = document.createDocumentFragment();
    for (var i = 0; i < total; i++) {
      var c = document.createElement('i');
      c.className = 'chart__cell' + (i < lit ? ' lit' : '');
      frag.appendChild(c);
    }
    el.appendChild(frag);
  });

  /* ---- 触发动画 ---- */
  function activate(el) {
    el.querySelectorAll('[data-count]').forEach(countUp);
    el.querySelectorAll('.chart__fill').forEach(function (f, i) {
      setTimeout(function () { f.style.width = (parseFloat(f.dataset.v || '0') * 100) + '%'; }, 120 + i * 90);
    });
    el.querySelectorAll('.chart__cell.lit').forEach(function (c, i) {
      c.style.transitionDelay = (i * 10) + 'ms'; c.classList.add('on');
    });
    el.querySelectorAll('.chart__seg.lit').forEach(function (s, i) {
      s.style.transitionDelay = (i * 80) + 'ms'; s.classList.add('on');
    });
  }

  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); activate(el); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); activate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }
})();
