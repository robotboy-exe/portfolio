(function () {
  'use strict';
  var d = document, de = d.documentElement;
  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- theme toggle (persisted, flash-free via head bootstrap) ---------- */
  var tt = d.getElementById('themeToggle');
  function syncTT() {
    if (!tt) return;
    var dark = de.getAttribute('data-theme') === 'dark';
    tt.setAttribute('aria-checked', dark ? 'true' : 'false');
    tt.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (tt) tt.addEventListener('click', function () {
    var dark = de.getAttribute('data-theme') !== 'dark';
    de.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('so-theme', dark ? 'dark' : 'light'); } catch (e) {}
    syncTT();
  });
  syncTT();

  /* ---------- rail progress + back to top ---------- */
  var fill = d.getElementById('railFill');
  var btt = d.getElementById('backToTop');
  var ticking = false;
  function onScroll() {
    if (fill) {
      var max = de.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      fill.style.transform = 'scaleY(' + p + ')';
    }
    if (btt) btt.classList.toggle('show', window.scrollY > 420);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();
  if (btt) btt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  /* ---------- scramble-decode hero name ---------- */
  var sc = d.getElementById('scrambleName');
  if (sc && !reduced) {
    (function () {
      var target = sc.textContent;
      var chars = '01<>/#[]{}=+*^';
      var dur = 1000, t0 = null;
      function frame(now) {
        if (t0 === null) t0 = now;
        var t = (now - t0) / dur;
        var reveal = Math.floor(Math.min(1, t) * target.length);
        var out = '';
        for (var i = 0; i < target.length; i++) {
          var c = target.charAt(i);
          out += (c === ' ') ? ' ' : (i < reveal ? c : chars.charAt(Math.floor(Math.random() * chars.length)));
        }
        sc.textContent = out;
        if (t < 1) requestAnimationFrame(frame); else sc.textContent = target;
      }
      requestAnimationFrame(frame);
    })();
  }

  /* ---------- scroll reveals ---------- */
  var rvs = d.querySelectorAll('.rv');
  if (reduced || !('IntersectionObserver' in window)) {
    rvs.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    rvs.forEach(function (el) { io.observe(el); });
  }

  /* ---------- scrollspy ---------- */
  var navLinks = d.querySelectorAll('#siteNav a');
  if ('IntersectionObserver' in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    ['about', 'skills', 'projects', 'contact'].forEach(function (id) {
      var s = d.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* ---------- galleries (filmstrip + lightbox) ---------- */
  var live = d.getElementById('liveRegion');
  var lb = d.getElementById('lightbox');
  var lbImg = d.getElementById('lbImg');
  var lbCap = d.getElementById('lbCap');
  var lbCount = d.getElementById('lbCount');
  var lbCan = !!(lb && typeof lb.showModal === 'function');
  var curGal = null, curIdx = 0, lbTrigger = null;

  function pad2(n) { return String(n).padStart ? String(n).padStart(2, '0') : ('0' + n).slice(-2); }
  function lbRender() {
    if (!curGal || !lbImg) return;
    var item = curGal.items[curIdx];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    if (lbCap) lbCap.textContent = item.alt;
    if (lbCount) lbCount.textContent = pad2(curIdx + 1) + ' / ' + pad2(curGal.items.length);
  }
  function lbMove(delta) {
    if (!curGal) return;
    curIdx = (curIdx + delta + curGal.items.length) % curGal.items.length;
    lbRender();
    curGal.sync(curIdx);
  }

  d.querySelectorAll('[data-gallery]').forEach(function (g) {
    var slides = Array.prototype.slice.call(g.querySelectorAll('.fs-slide'));
    var thumbs = Array.prototype.slice.call(g.querySelectorAll('.fs-thumb'));
    var count = g.querySelector('.fs-count');
    var idx = 0;
    function show(n, say) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === idx); });
      thumbs.forEach(function (t, k) {
        t.classList.toggle('on', k === idx);
        t.setAttribute('aria-pressed', k === idx ? 'true' : 'false');
      });
      if (count) count.textContent = pad2(idx + 1) + ' / ' + pad2(slides.length);
      if (say && live) live.textContent = 'Screenshot ' + (idx + 1) + ' of ' + slides.length + ' shown';
    }
    var prev = g.querySelector('.fs-prev'), next = g.querySelector('.fs-next'), main = g.querySelector('.fs-main');
    if (prev) prev.addEventListener('click', function () { show(idx - 1, true); });
    if (next) next.addEventListener('click', function () { show(idx + 1, true); });
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { show(k, true); }); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(idx - 1, true); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); show(idx + 1, true); }
    });
    var api = {
      items: slides.map(function (s) { return { src: s.src, alt: s.alt }; }),
      sync: function (n) { show(n, false); }
    };
    if (main) {
      if (lbCan) {
        main.addEventListener('click', function () {
          curGal = api; curIdx = idx; lbTrigger = main;
          lbRender();
          try { lb.showModal(); } catch (e) {}
        });
      } else {
        main.disabled = true;
        main.classList.add('no-lb');
      }
    }
    show(0, false);
  });

  var lbPrev = d.getElementById('lbPrev'), lbNext = d.getElementById('lbNext'), lbClose = d.getElementById('lbClose');
  if (lbPrev) lbPrev.addEventListener('click', function () { lbMove(-1); });
  if (lbNext) lbNext.addEventListener('click', function () { lbMove(1); });
  if (lbClose) lbClose.addEventListener('click', function () { if (lb) lb.close(); });
  if (lb) {
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); lbMove(-1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); lbMove(1); }
    });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', function () {
      var t = lbTrigger; lbTrigger = null; curGal = null;
      if (t && typeof t.focus === 'function') t.focus();
    });
  }
})();
