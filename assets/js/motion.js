/* ==============================================================
   袁烨 · 作品集 2026 —— 动效脚本
   无依赖、无构建、不使用任何第三方库。

   设计原则（三条，都是踩过的坑）：
     1. 内容默认可见。只有在 <html class="js"> 存在时才把待出场元素
        设为透明——脚本没跑起来时页面必须完整可读。
     2. 不用 IntersectionObserver。整站只有一个 rAF 循环，
        按 getBoundingClientRect 判定；截图工具、无头浏览器、
        老内核里行为一致。
     3. 所有动效都能被 prefers-reduced-motion 一次性关掉。
   ============================================================== */
(function () {
  "use strict";

  var docEl = document.documentElement;
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canMotion = !mqReduce.matches;
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(f, 16); };

  var revealEls = [];
  var countEls = [];
  var parallaxEls = [];
  var pin = null;
  var pinSteps = [];
  var bar = null;
  var head = null;

  /* ---------------------------------------------------------
     大字逐行切分：把 .display 拆成 .ln > span，供 CSS 逐行升起
     --------------------------------------------------------- */
  function splitLines(el) {
    if (!el || el.dataset.split === "1") return;

    // 1. 把元素内容压平成「带 em 标记的字符」序列
    var chars = [];
    (function explode(node, inEm) {
      var kids = [].slice.call(node.childNodes);
      kids.forEach(function (n) {
        if (n.nodeType === 3) {
          var text = n.nodeValue;
          if (!text) return;
          var frag = document.createDocumentFragment();
          for (var i = 0; i < text.length; i++) {
            var s = document.createElement("span");
            s.textContent = text.charAt(i);
            if (inEm) s.style.color = "var(--accent)";
            frag.appendChild(s);
            chars.push(s);
          }
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) {
          if (n.tagName === "BR") return;
          var isEm = n.tagName === "EM" || inEm;
          explode(n, isEm);
          if (n.tagName === "EM" && !n.textContent) {
            if (n.parentNode) n.parentNode.removeChild(n);
          }
        }
      });
    })(el, false);

    if (!chars.length) return;
    el.dataset.split = "1";

    // 2. 按 offsetTop 归组还原视觉行
    var lines = [];
    var cur = [];
    var top = null;
    chars.forEach(function (s) {
      var y = s.offsetTop;
      if (top === null) { top = y; }
      if (Math.abs(y - top) > 2) {
        lines.push(cur);
        cur = [];
        top = y;
      }
      cur.push(s);
    });
    if (cur.length) lines.push(cur);

    // 3. 重建成 .ln > span 结构
    var frag = document.createDocumentFragment();
    lines.forEach(function (line, li) {
      var outer = document.createElement("span");
      outer.className = "ln";
      var inner = document.createElement("span");
      inner.style.setProperty("--d", (li * 90 + 200) + "ms");
      line.forEach(function (s) { inner.appendChild(s); });
      outer.appendChild(inner);
      frag.appendChild(outer);
    });

    el.innerHTML = "";
    el.appendChild(frag);
  }

  /* ---------------------------------------------------------
     数字滚动
     --------------------------------------------------------- */
  function animateCount(el) {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";

    var target = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.dec || "0", 10);
    if (!canMotion || isNaN(target)) {
      el.textContent = isNaN(target) ? el.textContent : target.toFixed(dec);
      return;
    }
    var dur = 940;
    var t0 = null;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var t = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * e).toFixed(dec);
      if (t < 1) raf(frame);
      else el.textContent = target.toFixed(dec);
    }
    raf(frame);
  }

  /* ---------------------------------------------------------
     唯一的滚动循环
     --------------------------------------------------------- */
  var vh = window.innerHeight;

  function measureViewport() {
    vh = window.innerHeight;
  }

  function inView(el, margin) {
    var r = el.getBoundingClientRect();
    return r.top < vh - (margin || 0) && r.bottom > 0;
  }

  /* 出场判定：只要元素顶边进过视口就算数。
     刻意不要求 bottom > 0 —— 快速滚动、锚点跳转、链接直接带 #hash
     落点的时候，元素可能整个被跳过去，用 inView 会永久停在透明状态。 */
  function passed(el, margin, atBottom) {
    var r = el.getBoundingClientRect();
    // 已经滚到底：视口里剩下的全都是「该出现了」，包括贴着页脚的那几块
    if (atBottom) return true;
    return r.top < vh - (margin || 0);
  }

  function tick() {
    var y = window.pageYOffset || docEl.scrollTop;
    var atBottom = y + vh >= document.body.scrollHeight - 2;

    // a) 出场
    for (var i = revealEls.length - 1; i >= 0; i--) {
      var el = revealEls[i];
      if (el.classList.contains("in")) { revealEls.splice(i, 1); continue; }
      if (passed(el, Math.min(120, vh * 0.14), atBottom)) {
        el.classList.add("in");
        revealEls.splice(i, 1);
      }
    }

    // b) 数字
    for (var j = countEls.length - 1; j >= 0; j--) {
      var c = countEls[j];
      if (c.dataset.counted === "1") { countEls.splice(j, 1); continue; }
      if (inView(c, 40)) { animateCount(c); countEls.splice(j, 1); }
    }

    // c) 视差
    for (var k = 0; k < parallaxEls.length; k++) {
      var p = parallaxEls[k];
      var pr = p.getBoundingClientRect();
      if (pr.bottom < -vh || pr.top > vh * 2) continue;
      var rate = parseFloat(p.dataset.parallax) || 0.08;
      var mid = pr.top + pr.height / 2 - vh / 2;
      p.style.setProperty("--py", (-mid * rate).toFixed(1) + "px");
    }

    // d) 阅读进度条 + 顶栏收缩
    var max = document.body.scrollHeight - vh;
    var prog = max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0;
    if (bar) bar.style.setProperty("--p", prog.toFixed(2));
    if (head) head.classList.toggle("is-scrolled", y > 12);

    // e) 钉住段：滚动进度决定四段谁亮
    if (pin && pin.classList.contains("pin-ready") && pinSteps.length) {
      var rect = pin.getBoundingClientRect();
      var span = pin.offsetHeight - vh;
      if (span > 0) {
        var pp = Math.min(1, Math.max(0, -rect.top / span));
        var q = Math.min(1, pp / 0.82);
        var active = Math.min(pinSteps.length - 1, Math.floor(q * pinSteps.length));
        for (var s = 0; s < pinSteps.length; s++) {
          pinSteps[s].classList.toggle("on", s <= active);
        }
      }
    }
  }

  var pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    raf(function () { pending = false; tick(); });
  }

  /* ---------------------------------------------------------
     锚点跳转高亮
     --------------------------------------------------------- */
  function initAnchorFlash() {
    if (!canMotion) return;
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href*="#"]');
      if (!a) return;
      var id = (a.getAttribute("href") || "").split("#")[1];
      if (!id) return;
      var sec = document.getElementById(id);
      if (!sec) return;
      sec.classList.remove("flash");
      void sec.offsetWidth;
      sec.classList.add("flash");
      window.setTimeout(function () { sec.classList.remove("flash"); }, 1400);
    });
  }

  /* ---------------------------------------------------------
     启动
     --------------------------------------------------------- */
  function boot() {
    docEl.classList.add("js");

    revealEls = [].slice.call(document.querySelectorAll("[data-reveal]"));
    countEls = [].slice.call(document.querySelectorAll("[data-count]"));
    parallaxEls = [].slice.call(document.querySelectorAll("[data-parallax]"));
    pin = document.querySelector(".pin");
    pinSteps = pin ? [].slice.call(pin.querySelectorAll(".chain > div")) : [];
    bar = document.querySelector(".readbar");
    head = document.querySelector(".site-head");

    // 大字逐行：仅宽屏且允许动效
    if (canMotion && window.innerWidth > 720) {
      try { splitLines(document.querySelector(".display")); } catch (e) {}
    }

    // 兄弟元素依次延迟（60ms 一档）
    revealEls.forEach(function (el) {
      if (el.dataset.d) return;
      var parent = el.parentElement;
      if (!parent) return;
      var sibs = [].slice.call(parent.children).filter(function (c) {
        return c.hasAttribute && c.hasAttribute("data-reveal");
      });
      var idx = sibs.indexOf(el);
      if (idx > 0) el.style.setProperty("--d", (idx * 60) + "ms");
    });

    // 钉住段
    if (pin) {
      if (canMotion && window.innerWidth >= 901) {
        pin.classList.add("pin-ready");
      } else {
        pinSteps.forEach(function (s) { s.classList.add("on"); });
      }
    }

    // 首帧：任何已在首屏内的元素立即出场（不等滚动）
    // 先强制一帧布局，再判定
    measureViewport();
    tick();
    // 图片加载完再补一次，避免高度变化后漏判
    window.addEventListener("load", function () { measureViewport(); tick(); });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", function () {
      measureViewport();
      schedule();
      var rp = pin;
      if (rp) {
        var ok = canMotion && window.innerWidth >= 901;
        rp.classList.toggle("pin-ready", ok);
        if (!ok) pinSteps.forEach(function (s) { s.classList.add("on"); });
      }
    }, { passive: true });

    // 兜底：动效被系统关闭时，直接全部可见
    if (mqReduce.matches) {
      revealEls.forEach(function (el) { el.classList.add("in"); });
      revealEls = [];
    }

    initAnchorFlash();

    // 低频兜底轮询（移动端地址栏收起等不触发 scroll 的情况）
    window.setInterval(tick, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
