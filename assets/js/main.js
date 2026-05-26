(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    if (!q) return;
    q.setAttribute("aria-expanded", "false");
    q.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // Stats counter animation
  var statsSection = document.getElementById('statsSection');
  if (statsSection) {
    var counted = false;
    function animateCounters() {
      if (counted) return;
      var rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        counted = true;
        statsSection.querySelectorAll('.stat__number').forEach(function(el) {
          var target = parseInt(el.getAttribute('data-target'), 10);
          var suffix = el.getAttribute('data-suffix') || '+';
          var duration = 2000;
          var startTime = null;
          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = current.toLocaleString('tr-TR') + (progress < 1 ? '' : suffix);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }
    }
    window.addEventListener('scroll', animateCounters);
    animateCounters();
  }

  // AudioContext — ilk etkileşimde unlock edilir, popup sesinde kullanılır
  var _ac = null;
  function unlockAudio() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC || _ac) return;
      _ac = new AC();
      // Sessiz buffer ile Safari/mobil kilidi aç
      var buf = _ac.createBuffer(1, 1, _ac.sampleRate);
      var src = _ac.createBufferSource();
      src.buffer = buf;
      src.connect(_ac.destination);
      src.start(0);
    } catch(e) {}
  }

  function playBird() {
    try {
      if (!_ac || _ac.state === 'closed') return;
      var t = _ac.currentTime + 0.05;
      var dur = 0.22;
      var o = _ac.createOscillator();
      var g = _ac.createGain();
      o.connect(g);
      g.connect(_ac.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(2000, t);
      o.frequency.exponentialRampToValueAtTime(3400, t + dur * 0.55);
      o.frequency.exponentialRampToValueAtTime(2200, t + dur);
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.32, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.start(t);
      o.stop(t + dur + 0.05);
    } catch(e) {}
  }

  // WhatsApp popup — ilk kullanıcı etkileşiminden sonra açılır (autoplay politikası gereği)
  var waPopup = document.getElementById('waPopup');
  var waClose = document.getElementById('waPopupClose');
  var waPopupShown = false;
  function showWaPopup() {
    if (waPopupShown || !waPopup) return;
    if (sessionStorage.getItem('waPopupDismissed')) return;
    waPopupShown = true;
    setTimeout(function() {
      waPopup.classList.add('is-visible');
      playBird();
    }, 3000);
  }
  if (waClose) {
    waClose.addEventListener('click', function(e) {
      e.preventDefault();
      waPopup.classList.remove('is-visible');
      sessionStorage.setItem('waPopupDismissed', '1');
    });
  }

  // Mark active nav link
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("/").pop();
    if (href && href === path) a.classList.add("active");
  });

  // GA4 + AudioContext unlock — ilk kullanıcı etkileşiminde
  var ga4Loaded = false;
  function loadGA4() {
    if (ga4Loaded) return;
    ga4Loaded = true;
    unlockAudio();
    showWaPopup();
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    gtag("js", new Date());
    gtag("config", "G-XTGNCVEKBV");
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-XTGNCVEKBV";
    document.head.appendChild(s);
  }
  ["scroll", "click", "touchstart", "keydown", "mousemove"].forEach(function(evt) {
    window.addEventListener(evt, loadGA4, { once: true, passive: true });
  });
})();
