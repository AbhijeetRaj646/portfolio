(function() {
  const config = window.SITE_CONFIG || {};

  function selectAll(selector, root = document) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
  }

  function setHref(selector, href) {
    selectAll(selector).forEach(function(el) {
      el.setAttribute('href', href);
    });
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return '';
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (_) {
      return '';
    }
  }

  function getWhatsappLink(number, presetText) {
    const sanitized = (number || '').replace(/[^\d]/g, '');
    const text = encodeURIComponent(presetText || 'Hello! I would like to know more about your courses.');
    return sanitized ? `https://wa.me/${sanitized}?text=${text}` : (config.social && config.social.whatsapp ? config.social.whatsapp : '#');
  }

  function ensureIcon(anchor, type) {
    if (!anchor || anchor.dataset.iconInjected === 'true') return;
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    const path = document.createElementNS(ns, 'path');
    if (type === 'linkedin') {
      path.setAttribute('d', 'M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.06c.63-1.2 2.17-2.46 4.47-2.46 4.78 0 5.66 3.14 5.66 7.22V24h-5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.31 0-2.67 1.8-2.67 3.65V24h-5V8z');
    } else if (type === 'instagram') {
      path.setAttribute('d', 'M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM18.5 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z');
    } else if (type === 'whatsapp') {
      path.setAttribute('d', 'M20.52 3.48C18.4 1.36 15.37.25 12.17.25 5.74.25.5 5.49.5 11.92c0 2.07.54 4.07 1.58 5.86L.49 23.5l5.88-1.54a11.4 11.4 0 0 0 5.8 1.55h.01c6.43 0 11.67-5.24 11.67-11.67 0-3.12-1.22-6.05-3.33-8.16Zm-8.34 17.72h-.01a9.25 9.25 0 0 1-4.72-1.29l-.34-.2-3.49.91.93-3.4-.22-.35a9.27 9.27 0 1 1 7.86 4.33Zm5.07-6.92c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.91 1.1-.17.19-.34.21-.62.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49-.16-.01-.35-.01-.54-.01-.19 0-.49.07-.75.35-.26.28-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.02 3.09 4.9 4.33.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.11.55-.08 1.66-.68 1.9-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33Z');
    }
    svg.appendChild(path);
    anchor.insertBefore(svg, anchor.firstChild);
    anchor.dataset.iconInjected = 'true';
  }

  function injectSocialIcons() {
    selectAll('a[data-link="linkedin"]').forEach(function(a) { ensureIcon(a, 'linkedin'); });
    selectAll('a[data-link="instagram"]').forEach(function(a) { ensureIcon(a, 'instagram'); });
    selectAll('a[data-link="whatsapp"]').forEach(function(a) { ensureIcon(a, 'whatsapp'); });
  }

  function hydrateGlobalLinks() {
    if (config.phone) {
      setHref('[data-link="phone"]', `tel:${config.phone.replace(/\s/g, '')}`);
      selectAll('[data-text="phone"]').forEach(function(el){ el.textContent = config.phone; });
    }
    if (config.email) {
      setHref('[data-link="email"]', `mailto:${config.email}`);
      selectAll('[data-text="email"]').forEach(function(el){ el.textContent = config.email; });
    }
    const wa = getWhatsappLink(config.whatsappNumber);
    setHref('[data-link="whatsapp"]', wa);

    if (config.social) {
      if (config.social.linkedin) setHref('[data-link="linkedin"]', config.social.linkedin);
      if (config.social.instagram) setHref('[data-link="instagram"]', config.social.instagram);
    }

    const floating = document.getElementById('floating-whatsapp');
    if (floating) floating.setAttribute('href', wa);

    const academyEls = selectAll('[data-text="academyName"]');
    academyEls.forEach(function(el) { el.textContent = config.academyName || 'Defence Academy'; });

    const map = document.getElementById('mapFrame');
    if (map && config.googleMapEmbedSrc) {
      map.setAttribute('src', config.googleMapEmbedSrc);
      map.setAttribute('loading', 'lazy');
      map.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    }

    injectSocialIcons();
  }

  function initNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('primaryNav');
    if (toggle && nav) {
      toggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
      });
      selectAll('#primaryNav a').forEach(function(link) {
        link.addEventListener('click', function() {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  function renderNotices(listEl, notices) {
    listEl.innerHTML = '';
    if (!Array.isArray(notices) || notices.length === 0) {
      listEl.innerHTML = '<li class="empty">No announcements at the moment. Please check back later.</li>';
      return;
    }
    notices.forEach(function(n) {
      const li = document.createElement('li');
      li.className = 'notice-item' + (n.urgent ? ' urgent blink' : '');
      const inner = document.createElement('div');
      inner.className = 'notice-inner';

      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = n.urgent ? 'Urgent' : 'Update';

      const msg = document.createElement('p');
      msg.className = 'message';
      msg.textContent = n.message || '';

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = formatDate(n.date);

      inner.appendChild(badge);
      inner.appendChild(msg);
      if (n.link) {
        const a = document.createElement('a');
        a.href = n.link;
        a.className = 'notice-link';
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'Details';
        inner.appendChild(a);
      }
      inner.appendChild(meta);
      li.appendChild(inner);
      listEl.appendChild(li);
    });
  }

  function loadNotices() {
    var section = document.getElementById('noticeBoard');
    var widgetList = document.getElementById('widgetNotices');
    if (!section && !widgetList) return;

    var listEl = section ? section.querySelector('ul') : null;

    fetch('assets/data/notices.json', { cache: 'no-cache' })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (listEl) renderNotices(listEl, data);
        if (widgetList) renderNotices(widgetList, data.slice(0, 6));
        const hasUrgent = Array.isArray(data) && data.some(function(n) { return !!n.urgent; });
        const badge = document.getElementById('announcementBadge');
        if (badge && hasUrgent) {
          badge.classList.add('show');
          badge.textContent = 'New';
        }
      })
      .catch(function() {
        if (listEl) listEl.innerHTML = '<li class="empty">Unable to load announcements right now.</li>';
      });
  }

  function initAnnouncementsWidget() {
    const opener = document.getElementById('announcementToggle');
    const panel = document.getElementById('announcementPanel');
    if (!opener || !panel) return;
    opener.addEventListener('click', function() {
      panel.classList.toggle('open');
      opener.setAttribute('aria-expanded', panel.classList.contains('open'));
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    hydrateGlobalLinks();
    initNav();
    initAnnouncementsWidget();
    loadNotices();
  });
})();