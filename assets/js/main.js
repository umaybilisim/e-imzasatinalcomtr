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
          var start = 0;
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

  // WhatsApp popup
  var waPopup = document.getElementById('waPopup');
  var waClose = document.getElementById('waPopupClose');
  if (waPopup) {
    var dismissed = sessionStorage.getItem('waPopupDismissed');
    if (!dismissed) {
      setTimeout(function() {
        waPopup.classList.add('is-visible');
        try {
          var AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return;
          var ac = new AC();
          function chirp(t, f0, f1, dur, amp) {
            var o = ac.createOscillator();
            var g = ac.createGain();
            o.connect(g);
            g.connect(ac.destination);
            o.type = 'sine';
            o.frequency.setValueAtTime(f0, t);
            o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.55);
            o.frequency.exponentialRampToValueAtTime(f0 * 1.1, t + dur);
            g.gain.setValueAtTime(0.001, t);
            g.gain.linearRampToValueAtTime(amp, t + 0.012);
            g.gain.exponentialRampToValueAtTime(0.001, t + dur);
            o.start(t);
            o.stop(t + dur + 0.05);
          }
          var T = ac.currentTime + 0.05;
          // Grup 1 — hızlı üç cıvıltı
          chirp(T,        1900, 3200, 0.13, 0.30);
          chirp(T + 0.17, 2100, 3500, 0.11, 0.28);
          chirp(T + 0.32, 2000, 3300, 0.13, 0.26);
          // Grup 2 — biraz farklı melodi
          chirp(T + 0.72, 1700, 3000, 0.12, 0.28);
          chirp(T + 0.88, 2200, 3600, 0.10, 0.26);
          chirp(T + 1.02, 2000, 3400, 0.14, 0.24);
          // Grup 3 — yükselen final
          chirp(T + 1.55, 1800, 3100, 0.12, 0.24);
          chirp(T + 1.71, 2100, 3500, 0.11, 0.22);
          chirp(T + 1.86, 2400, 3800, 0.15, 0.20);
          // Grup 4 — sessizce biten
          chirp(T + 2.40, 1900, 3200, 0.12, 0.16);
          chirp(T + 2.56, 2000, 3300, 0.11, 0.13);
          chirp(T + 2.70, 1800, 3000, 0.14, 0.10);
        } catch(e) {}
      }, 5000);
    }
    if (waClose) {
      waClose.addEventListener('click', function(e) {
        e.preventDefault();
        waPopup.classList.remove('is-visible');
        sessionStorage.setItem('waPopupDismissed', '1');
      });
    }
  }

  // Mark active nav link
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("/").pop();
    if (href && href === path) a.classList.add("active");
  });

  // GA4 — ilk kullanıcı etkileşiminde yükle (TBT sıfır, analytics tam)
  var ga4Loaded = false;
  function loadGA4() {
    if (ga4Loaded) return;
    ga4Loaded = true;
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
