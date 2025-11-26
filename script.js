// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Smooth scroll for internal links (same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    const headerOffset = 70;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    nav.classList.remove('open');
  });
});

// IntersectionObserver for reveal animations
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('revealed'));
}

// Counter animation for stats
const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
  const runCounter = counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
    let current = 0;
    const duration = 800;
    const start = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      counter.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
      else counter.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(c => counterObserver.observe(c));
}

// About tabs logic (used on About page & can exist on others)
const aboutTabs = document.querySelectorAll('.about-tab');
const aboutPanels = document.querySelectorAll('.about-panel');

aboutTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    aboutTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    aboutPanels.forEach(panel => {
      if (panel.getAttribute('data-panel') === target) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  });
});

// Cookie consent overlay
const cookieOverlay = document.getElementById('cookieOverlay');
const btnAccept = document.getElementById('cookieAccept');
const btnReject = document.getElementById('cookieReject');
const btnClose = document.querySelector('.cookie-close');
const analyticsToggle = document.getElementById('analyticsToggle');

const COOKIE_KEY = 'tng_cookie_preferences';

function showCookieOverlay() {
  if (!cookieOverlay) return;
  cookieOverlay.classList.add('visible');
  cookieOverlay.setAttribute('aria-hidden', 'false');
}

function hideCookieOverlay() {
  if (!cookieOverlay) return;
  cookieOverlay.classList.remove('visible');
  cookieOverlay.setAttribute('aria-hidden', 'true');
}

function saveCookiePrefs(prefs) {
  try {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
  } catch (_) {
    // ignore
  }
}

function getCookiePrefs() {
  try {
    const data = localStorage.getItem(COOKIE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (_) {
    return null;
  }
}

// Initial cookie check
const existingPrefs = getCookiePrefs();
if (!existingPrefs) {
  showCookieOverlay();
} else {
  if (analyticsToggle && typeof existingPrefs.analytics === 'boolean') {
    analyticsToggle.checked = existingPrefs.analytics;
  }
}

if (btnAccept) {
  btnAccept.addEventListener('click', () => {
    const prefs = {
      essential: true,
      analytics: analyticsToggle ? analyticsToggle.checked : true,
      timestamp: new Date().toISOString()
    };
    saveCookiePrefs(prefs);
    hideCookieOverlay();
  });
}

if (btnReject) {
  btnReject.addEventListener('click', () => {
    const prefs = {
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString()
    };
    if (analyticsToggle) analyticsToggle.checked = false;
    saveCookiePrefs(prefs);
    hideCookieOverlay();
  });
}

if (btnClose) {
  btnClose.addEventListener('click', () => {
    const prefs = {
      essential: true,
      analytics: false,
      timestamp: new Date().toISOString()
    };
    if (analyticsToggle) analyticsToggle.checked = false;
    saveCookiePrefs(prefs);
    hideCookieOverlay();
  });
}
