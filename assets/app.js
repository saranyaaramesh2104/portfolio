/* ==========================================================================
   Saranyaa Ramesh — portfolio behaviour
   Theme toggle, accessibility panel, image lightbox, hash routing between the
   home page and the case studies, the email composer, and the motion layer
   (parallax + magnetic cards).
   No frameworks, no build step, no third-party requests.
   ========================================================================== */

(function () {
  'use strict';

  var THEME_KEY = 'sr_theme';
  var A11Y_KEY = 'sr_a11y';

  var html = document.documentElement;
  var body = document.body;

  /* ── Theme ─────────────────────────────────────────────────────────── */
  function preferredTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* private mode */ }
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    var btn = document.getElementById('themeBtn');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#17100e' : '#fff8ec');
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
  }

  applyTheme(preferredTheme());

  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Accessibility panel ───────────────────────────────────────────── */
  // Each key maps to a body class defined in styles.css.
  var A11Y_CLASSES = {
    contrast: 'a11y-contrast',
    dyslexia: 'a11y-dyslexia',
    motion: 'a11y-motion',
    links: 'a11y-links',
    spacing: 'a11y-spacing',
    cursor: 'a11y-cursor'
  };

  var DEFAULT_A11Y = { textSize: 0, contrast: false, dyslexia: false, motion: false, links: false, spacing: false, cursor: false };
  var TEXT_STEPS = ['17px', '18.5px', '20px', '22px'];

  var a11y;
  try {
    a11y = Object.assign({}, DEFAULT_A11Y, JSON.parse(localStorage.getItem(A11Y_KEY) || '{}'));
  } catch (e) {
    a11y = Object.assign({}, DEFAULT_A11Y);
  }

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Single source of truth for the motion layer: the OS setting or the toggle.
  function motionOff() {
    return a11y.motion || prefersReduced.matches;
  }

  function applyA11y() {
    Object.keys(A11Y_CLASSES).forEach(function (key) {
      body.classList.toggle(A11Y_CLASSES[key], !!a11y[key]);
    });

    var step = Math.min(Math.max(parseInt(a11y.textSize, 10) || 0, 0), TEXT_STEPS.length - 1);
    html.style.setProperty('--fs-base', TEXT_STEPS[step]);

    Object.keys(A11Y_CLASSES).forEach(function (key) {
      var input = document.getElementById('a11y-' + key);
      if (input) input.checked = !!a11y[key];
    });
    var range = document.getElementById('a11y-textSize');
    if (range) range.value = step;

    if (motionOff()) clearMotion();
    else updateParallax();

    try { localStorage.setItem(A11Y_KEY, JSON.stringify(a11y)); } catch (e) { /* ignore */ }
  }

  Object.keys(A11Y_CLASSES).forEach(function (key) {
    var input = document.getElementById('a11y-' + key);
    if (!input) return;
    input.addEventListener('change', function () {
      a11y[key] = input.checked;
      applyA11y();
    });
  });

  var textRange = document.getElementById('a11y-textSize');
  if (textRange) {
    textRange.addEventListener('input', function () {
      a11y.textSize = parseInt(textRange.value, 10);
      applyA11y();
    });
  }

  var resetBtn = document.getElementById('a11yReset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      a11y = Object.assign({}, DEFAULT_A11Y);
      applyA11y();
    });
  }

  var a11yFab = document.getElementById('a11yFab');
  var a11yPanel = document.getElementById('a11yPanel');

  function setPanel(open) {
    if (!a11yPanel || !a11yFab) return;
    if (open) a11yPanel.setAttribute('open', '');
    else a11yPanel.removeAttribute('open');
    a11yFab.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (a11yFab && a11yPanel) {
    a11yFab.addEventListener('click', function (event) {
      event.stopPropagation();
      setPanel(!a11yPanel.hasAttribute('open'));
    });
    a11yPanel.addEventListener('click', function (event) { event.stopPropagation(); });
    document.addEventListener('click', function () { setPanel(false); });
  }

  /* ── Motion: parallax shapes and magnetic cards ────────────────────── */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll('.parallax'));
  var magneticEls = Array.prototype.slice.call(document.querySelectorAll('.feature, .work-card'));
  var parallaxQueued = false;

  function updateParallax() {
    parallaxQueued = false;
    if (motionOff()) return;
    var y = window.pageYOffset;
    parallaxEls.forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
      el.style.transform = 'translate3d(0,' + (y * speed).toFixed(1) + 'px,0)';
    });
  }

  function clearMotion() {
    parallaxEls.concat(magneticEls).forEach(function (el) { el.style.transform = ''; });
  }

  window.addEventListener('scroll', function () {
    if (parallaxQueued) return;
    parallaxQueued = true;
    requestAnimationFrame(updateParallax);
  }, { passive: true });

  // Cards lean very slightly toward the cursor. Pointer events cover mouse and
  // pen but not touch, so phones are unaffected.
  magneticEls.forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      if (motionOff() || event.pointerType === 'touch') return;
      var r = card.getBoundingClientRect();
      var dx = (event.clientX - r.left) / r.width - 0.5;
      var dy = (event.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'translate(' + (dx * 7).toFixed(2) + 'px,' + (dy * 7 - 3).toFixed(2) + 'px)';
    });
    card.addEventListener('pointerleave', function () { card.style.transform = ''; });
  });

  if (prefersReduced.addEventListener) {
    prefersReduced.addEventListener('change', function () {
      if (motionOff()) clearMotion();
      else updateParallax();
    });
  }

  applyA11y();

  /* ── Lightbox ──────────────────────────────────────────────────────── */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lastFocus = null;

  function openLightbox(source) {
    if (!lightbox || !lightboxImg) return;
    lastFocus = document.activeElement;
    lightboxImg.src = source.currentSrc || source.src;
    lightboxImg.alt = source.alt || '';
    lightbox.setAttribute('open', '');
    body.style.overflow = 'hidden';
    var close = document.getElementById('lightboxClose');
    if (close) close.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.removeAttribute('open');
    lightboxImg.removeAttribute('src');
    body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Delegated so images added to the HTML later need no extra wiring. The
  // decorative SVG shapes are excluded because they have no alt text.
  document.addEventListener('click', function (event) {
    var zoomable = event.target.closest('.shot, .community-card img');
    if (zoomable && !zoomable.closest('.work-card-blank') && !zoomable.classList.contains('decor')) {
      openLightbox(zoomable);
      return;
    }
    if (event.target.closest('#lightboxClose') || event.target.id === 'lightbox') {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    if (lightbox && lightbox.hasAttribute('open')) closeLightbox();
    else setPanel(false);
  });

  /* ── Routing ───────────────────────────────────────────────────────── */
  // Case studies are real HTML in the page rather than JS-rendered, so search
  // engines and link previews can read them. Routing just shows and hides.
  var homeView = document.getElementById('home');
  var cases = Array.prototype.slice.call(document.querySelectorAll('.case'));
  var BASE_TITLE = document.title;

  var currentView = null;

  function route() {
    var slug = (location.hash || '').replace(/^#\/?/, '');
    var target = slug ? document.getElementById('case-' + slug) : null;
    var view = target ? target.id : 'home';
    var viewChanged = view !== currentView;
    currentView = view;

    if (target) {
      if (homeView) homeView.hidden = true;
      cases.forEach(function (node) { node.hidden = node !== target; });
      // The heading is split across two typefaces; the first half is the name.
      var name = target.querySelector('.dsplit-a');
      document.title = (name ? name.textContent.trim() + ' — ' : '') + BASE_TITLE;
    } else {
      if (homeView) homeView.hidden = false;
      cases.forEach(function (node) { node.hidden = true; });
      document.title = BASE_TITLE;
    }

    requestAnimationFrame(observeReveals);
    return viewChanged;
  }

  window.addEventListener('hashchange', function () {
    var viewChanged = route();
    var slug = (location.hash || '').replace(/^#\/?/, '');
    var section = slug ? document.getElementById(slug) : null;

    if (section) {
      // A plain in-page anchor such as #work. Scrolling to top here would
      // override the browser's own jump, which is what broke the nav links.
      section.scrollIntoView({ behavior: motionOff() ? 'auto' : 'smooth', block: 'start' });
    } else if (viewChanged) {
      // Entering or leaving a case study starts at the top.
      window.scrollTo(0, 0);
    }
  });

  /* ── Scroll reveal ─────────────────────────────────────────────────── */
  var observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  }

  function observeReveals() {
    var pending = document.querySelectorAll('.reveal:not(.is-visible)');
    Array.prototype.forEach.call(pending, function (node) {
      // Anything inside a hidden view has no box; leave it for the next pass.
      if (!node.getClientRects().length) return;
      if (observer) observer.observe(node);
      else node.classList.add('is-visible');
    });
  }

  route();

  // Images settling can change what is on screen, so sweep again once loaded.
  window.addEventListener('load', observeReveals);

  /* ── Email composer ────────────────────────────────────────────────── */
  // GitHub Pages serves static files only, so there is no server to post to.
  // This opens the visitor's own mail client with the message pre-filled.
  var composer = document.getElementById('composer');
  if (composer) {
    composer.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = (document.getElementById('cName').value || '').trim();
      var note = (document.getElementById('cNote').value || '').trim();
      var subject = name ? 'Portfolio enquiry from ' + name : 'Portfolio enquiry';
      var lines = note ? [note] : [];
      if (name) lines.push('', '— ' + name);
      location.href =
        'mailto:' + composer.dataset.email +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }

  /* ── Footer year ───────────────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
