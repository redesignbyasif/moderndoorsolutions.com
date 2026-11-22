/* ==========================================================================
   Modern Door Solutions — interactions
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var header = document.getElementById('siteHeader');
  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobileNav');
  var overlay = document.getElementById('overlay');
  var closeBtn = document.querySelector('.mobile-nav__close');
  var dockBar = document.getElementById('dockBar');
  var fab = document.getElementById('fab');

  /* ---------------------------------------------------------------
     Sticky header state + sticky call bar visibility
     --------------------------------------------------------------- */
  var lastY = 0;
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;

    if (header) header.classList.toggle('is-scrolled', y > 8);

    if (dockBar) {
      // show the mobile action bar after the hero, hide inside the contact section
      var heroBottom = (document.querySelector('.hero') || { offsetHeight: 600 }).offsetHeight;
      var contact = document.getElementById('contact');
      var inContact = false;
      if (contact) {
        var r = contact.getBoundingClientRect();
        inContact = r.top < window.innerHeight * 0.85 && r.bottom > 0;
      }
      dockBar.classList.toggle('is-visible', y > heroBottom * 0.55 && !inContact && !body.classList.contains('nav-open'));
    }

    if (fab) {
      var contactEl = document.getElementById('contact');
      var hideFab = false;
      if (contactEl) {
        var fr = contactEl.getBoundingClientRect();
        hideFab = fr.top < window.innerHeight * 0.9;
      }
      fab.classList.toggle('is-hidden', hideFab);
    }

    lastY = y;
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ---------------------------------------------------------------
     Mobile navigation drawer
     --------------------------------------------------------------- */
  var focusable = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  var previousFocus = null;

  function openNav() {
    if (!mobileNav) return;
    previousFocus = document.activeElement;
    mobileNav.hidden = false;
    if (overlay) overlay.hidden = false;
    // allow the browser to register display change before transitioning
    window.requestAnimationFrame(function () {
      body.classList.add('nav-open', 'is-locked');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
      var first = mobileNav.querySelector(focusable);
      if (first) first.focus({ preventScroll: true });
    });
  }

  function closeNav(returnFocus) {
    if (!mobileNav || mobileNav.hidden) return;
    body.classList.remove('nav-open', 'is-locked');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
    window.setTimeout(function () {
      mobileNav.hidden = true;
      if (overlay) overlay.hidden = true;
    }, 380);
    if (returnFocus !== false && previousFocus && previousFocus.focus) {
      previousFocus.focus({ preventScroll: true });
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (body.classList.contains('nav-open')) {
        closeNav();
      } else {
        navToggle.setAttribute('aria-label', 'Close menu');
        openNav();
      }
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', function () { closeNav(); });
  if (overlay) overlay.addEventListener('click', function () { closeNav(); });

  if (mobileNav) {
    mobileNav.addEventListener('click', function (e) {
      if (e.target === mobileNav) { closeNav(); return; }
      var link = e.target.closest('a[href^="#"]');
      if (link) closeNav(false);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!body.classList.contains('nav-open')) return;
    if (e.key === 'Escape') { closeNav(); return; }
    if (e.key === 'Tab' && mobileNav) {
      var items = Array.prototype.filter.call(
        mobileNav.querySelectorAll(focusable),
        function (el) { return el.offsetParent !== null; }
      );
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Close the drawer if the viewport grows past the desktop breakpoint
  var mq = window.matchMedia('(min-width: 1120px)');
  function handleMq() { if (mq.matches) closeNav(false); }
  if (mq.addEventListener) mq.addEventListener('change', handleMq);
  else if (mq.addListener) mq.addListener(handleMq);

  /* ---------------------------------------------------------------
     Smooth scrolling for in-page anchors (offset for sticky header)
     --------------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (!id || id === '#' || id.length < 2) return;
    var target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    if (id === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (history.replaceState) history.replaceState(null, '', location.pathname);
      return;
    }
    var headerH = header ? header.getBoundingClientRect().height : 0;
    var rect = target.getBoundingClientRect();
    var top = rect.top + window.pageYOffset - headerH + 1;
    if (rect.height === 0) top -= 0;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    if (history.replaceState) history.replaceState(null, '', id);
  });

  /* ---------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------------------------------------------------------
     Service request form — composes a mailto (no fake success state)
     --------------------------------------------------------------- */
  var form = document.getElementById('serviceForm');
  var status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || '').toString().trim(); };
      var name = get('name'), email = get('email');

      if (!name || !email) {
        if (status) status.textContent = 'Please add your name and email so we can reply.';
        (!name ? form.querySelector('[name="name"]') : form.querySelector('[name="email"]')).focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        if (status) status.textContent = 'That email address looks incomplete — please check it.';
        form.querySelector('[name="email"]').focus();
        return;
      }

      var subject = 'Service request — ' + (get('service') || 'Door service');
      var lines = [
        'Name: ' + name,
        'Email: ' + email,
        'Phone: ' + (get('phone') || '—'),
        'Service: ' + (get('service') || '—'),
        'Address: ' + (get('address') || '—'),
        '',
        'Details:',
        (get('message') || '—')
      ];
      var href = 'mailto:Zach@moderndoorsolutions.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));

      if (status) status.textContent = 'Opening your email app with these details ready to send…';
      window.location.href = href;
    });
  }

  /* ---------------------------------------------------------------
     Footer year
     --------------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------
     FAQ — keep only one item open at a time is optional; leave native
     --------------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* init */
  onScroll();
})();
