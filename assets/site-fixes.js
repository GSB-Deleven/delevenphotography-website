// Minimal replacement for the missing Astro/Vue hydration bundle.
// Toggles the mobile burger menu, since the original client JS was not part of the static export.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.burger').forEach(function (burger) {
    var dropdown = burger.parentElement.querySelector('.block-header-layout-mobile__dropdown');
    if (!dropdown) return;
    burger.addEventListener('click', function () {
      burger.classList.toggle('burger--open');
      dropdown.classList.toggle('block-header-layout-mobile__dropdown--open');
    });
  });
});

// Lightbox for photos marked .image--zoom (the builder shows a zoom cursor on them, but its viewer JS was not exported).
(function () {
  var box, bigImg, counter, closeBtn, list = [], idx = 0, lastFocus = null, touchX = null;

  var ICON = {
    close: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
    prev: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 5 8 12 15 19"/></svg>',
    next: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 16 12 9 19"/></svg>'
  };

  var CSS =
    '.dlb{position:fixed;inset:0;z-index:2147483000;background:rgba(15,13,10,.94);display:flex;align-items:center;justify-content:center;animation:dlb-in .2s ease}' +
    '.dlb[hidden]{display:none}' +
    '@keyframes dlb-in{from{opacity:0}to{opacity:1}}' +
    '.dlb-img{max-width:92vw;max-height:88vh;object-fit:contain;box-shadow:0 10px 40px rgba(0,0,0,.5);-webkit-user-select:none;user-select:none}' +
    '.dlb button{position:absolute;background:none;border:0;padding:0;color:#fff;cursor:pointer;width:56px;height:56px;display:flex;align-items:center;justify-content:center;opacity:.75;transition:opacity .15s}' +
    '.dlb button:hover,.dlb button:focus-visible{opacity:1}' +
    '.dlb-close{top:10px;right:10px}' +
    '.dlb-prev{left:8px;top:50%;transform:translateY(-50%)}' +
    '.dlb-next{right:8px;top:50%;transform:translateY(-50%)}' +
    '.dlb-count{position:absolute;bottom:18px;left:0;right:0;text-align:center;color:rgba(255,255,255,.7);font:14px/1 system-ui,sans-serif;letter-spacing:.05em;pointer-events:none}' +
    '@media (max-width:600px){.dlb-img{max-width:100vw;max-height:78vh;box-shadow:none}.dlb-prev,.dlb-next{top:auto;bottom:0;transform:none}.dlb-count{bottom:22px}}';

  // srcset URLs contain commas (format=auto,w=...), so candidates can't be split on ",".
  function largestSrc(img) {
    var best = img.currentSrc || img.src, bestW = 0, m;
    var re = /,?(\S+)\s+(\d+)w/g, srcset = img.getAttribute('srcset') || '';
    while ((m = re.exec(srcset))) {
      if (+m[2] > bestW) { bestW = +m[2]; best = m[1]; }
    }
    return best;
  }

  // Every photo exists twice (desktop + mobile variant); only the visible one belongs in the sequence.
  function visibleZoomImages() {
    return Array.prototype.filter.call(document.querySelectorAll('.image--zoom img'), function (el) {
      return el.getClientRects().length > 0;
    });
  }

  function button(cls, label, icon, onClick) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.setAttribute('aria-label', label);
    b.innerHTML = icon;
    b.addEventListener('click', function (e) { e.stopPropagation(); onClick(); });
    box.appendChild(b);
    return b;
  }

  function build() {
    if (box) return;
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    box = document.createElement('div');
    box.className = 'dlb';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Bildansicht');

    bigImg = document.createElement('img');
    bigImg.className = 'dlb-img';
    bigImg.decoding = 'async';
    box.appendChild(bigImg);

    counter = document.createElement('div');
    counter.className = 'dlb-count';
    box.appendChild(counter);

    closeBtn = button('dlb-close', 'Schliessen', ICON.close, close);
    button('dlb-prev', 'Vorheriges Bild', ICON.prev, function () { show(idx - 1); });
    button('dlb-next', 'Nächstes Bild', ICON.next, function () { show(idx + 1); });

    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    box.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 50) show(dx < 0 ? idx + 1 : idx - 1);
    });

    document.body.appendChild(box);
  }

  function show(i) {
    idx = (i + list.length) % list.length;
    var src = list[idx];
    bigImg.src = largestSrc(src);
    bigImg.alt = src.alt || '';
    counter.textContent = (idx + 1) + ' / ' + list.length;
    [idx + 1, idx - 1].forEach(function (n) {
      new Image().src = largestSrc(list[(n + list.length) % list.length]);
    });
  }

  function open(target) {
    list = visibleZoomImages();
    var start = list.indexOf(target);
    if (start < 0) return;
    build();
    lastFocus = document.activeElement;
    box.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    show(start);
    closeBtn.focus();
  }

  function close() {
    box.hidden = true;
    bigImg.removeAttribute('src');
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var zoom = e.target.closest && e.target.closest('.image--zoom');
    if (!zoom || (box && box.contains(zoom))) return;
    var img = zoom.querySelector('img');
    if (!img) return;
    e.preventDefault();
    open(img);
  });

  document.addEventListener('keydown', function (e) {
    if (!box || box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'Tab') {
      var btns = box.querySelectorAll('button');
      var first = btns[0], last = btns[btns.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
