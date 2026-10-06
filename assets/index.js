/* =============================================================================
   首页脚本（与 case.js 对称）
   保留：顶栏滚动态 / 滚动显影 / scrollspy / CTA 磁吸 / View Transition（CSS）
   改造：视差对象改为像素地平线；光标火星重配色并做 4px 网格对齐
   全部受 prefers-reduced-motion 降级
   ========================================================================== */
(function(){
  'use strict';

  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  function reduced(){ return reduceMQ.matches; }

  /* ---- 顶栏滚动态 ---- */
  var header = document.querySelector('.site-header');
  function onScrollHeader(){
    if(header) header.setAttribute('data-scrolled', window.scrollY > 24 ? 'true' : 'false');
  }
  window.addEventListener('scroll', onScrollHeader, {passive:true}); onScrollHeader();

  /* ---- 滚动显影 ---- */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, {threshold:0.2, rootMargin:'0px 0px -8% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('is-in'); });
  }

  /* ---- 滚动视差：像素地平线（仅像素层，位移极小 ±8px） ---- */
  var horizon = document.querySelector('.horizon__px');
  if(!reduced() && horizon){
    var ticking = false;
    var apply = function(){
      var t = window.scrollY * 0.03;
      t = Math.max(-8, Math.min(8, t));
      horizon.style.transform = 'translate3d(0,' + t.toFixed(1) + 'px,0)';
      ticking = false;
    };
    window.addEventListener('scroll', function(){
      if(!ticking){ ticking = true; requestAnimationFrame(apply); }
    }, {passive:true});
    apply();
  }

  /* ---- 光标微交互：像素火星（网格对齐）+ 主 CTA 磁吸 ---- */
  if(fine && !reduced()){
    var hero = document.querySelector('.hero'), spark = document.getElementById('spark');
    if(hero && spark){
      var raf = null, sx = 0, sy = 0;
      hero.addEventListener('pointermove', function(e){
        var r = hero.getBoundingClientRect();
        sx = e.clientX - r.left; sy = e.clientY - r.top;
        spark.style.opacity = '1';
        if(!raf){ raf = requestAnimationFrame(function(){
          spark.style.transform = 'translate(' + (Math.round(sx/4)*4) + 'px,' + (Math.round(sy/4)*4) + 'px)';
          raf = null;
        }); }
      });
      hero.addEventListener('pointerleave', function(){ spark.style.opacity = '0'; });
    }

    var mag = document.querySelector('[data-magnetic]');
    if(mag){
      var mraf = null;
      mag.addEventListener('pointermove', function(e){
        var r = mag.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width/2)) * 0.15;
        var dy = (e.clientY - (r.top + r.height/2)) * 0.15;
        dx = Math.max(-6, Math.min(6, dx)); dy = Math.max(-6, Math.min(6, dy));
        if(!mraf){ mraf = requestAnimationFrame(function(){
          mag.style.setProperty('--mx', dx.toFixed(1)+'px');
          mag.style.setProperty('--my', dy.toFixed(1)+'px');
          mraf = null;
        }); }
      });
      mag.addEventListener('pointerleave', function(){
        mag.style.setProperty('--mx','0px'); mag.style.setProperty('--my','0px');
      });
    }
  }

  /* ---- scrollspy：当前导航项 ---- */
  var sections = [].slice.call(document.querySelectorAll('main section[id]'));
  var links = [].slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
  if(sections.length && 'IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var id = '#' + e.target.id;
          links.forEach(function(l){
            if(l.getAttribute('href') === id){ l.setAttribute('aria-current','true'); }
            else { l.removeAttribute('aria-current'); }
          });
        }
      });
    }, {threshold:0.5});
    sections.forEach(function(s){ spy.observe(s); });
  }
})();
