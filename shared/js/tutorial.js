/* ================================================================
   PROJECT 45 - TUTORIAL
   Welcome slider (3 slides) + Spotlight walkthrough
   ================================================================ */
var Tutorial = (function() {
    'use strict';

    var STORAGE_KEY = 'p45_tutorialDone';
    var currentStep = 0;
    var steps = [];
    var overlay, tooltip;

    var STEPS = [
        { sel: '.subject-grid', title: 'Your subjects', desc: 'Tap any subject to start practising. Each has guided lessons, interactive trainers, and mastery tracking.', pos: 'top' },
        { sel: '#continue-section', title: 'Resume studying', desc: 'This shows your most-practised topic so you can jump straight back in.', pos: 'top', fallbackSel: '.continue-section' },
        { sel: '.topbar-right', title: 'Account & settings', desc: 'Sign in to save your progress across devices. Your scores are stored to your account.', pos: 'bottom' }
    ];

    function hasCompleted() { return localStorage.getItem(STORAGE_KEY) === 'true'; }
    function markComplete() { localStorage.setItem(STORAGE_KEY, 'true'); }

    // ── Welcome Slider ──
    function showWelcome(onContinue) {
        var el = document.createElement('div');
        el.className = 'tw-overlay';
        el.innerHTML =
            '<div class="tw-track" id="tw-track">' +
            '<div class="tw-slide tw-s1"><div class="tw-slide-inner">' +
            '  <div class="tw-logo"><span style="font-family:\'Clash Display\',sans-serif;font-size:2.2rem;font-weight:800;color:#F2F0EB;">Project <span style="color:#4f6ef7;">45</span></span></div>' +
            '  <h1 class="tw-h1">Aim for<br>45.</h1>' +
            '  <p class="tw-sub">The study platform built for IB DP students.</p>' +
            '</div></div>' +
            '<div class="tw-slide tw-s2"><div class="tw-slide-inner">' +
            '  <div class="tw-icon-wrap"><span class="tw-icon">&#128218;</span></div>' +
            '  <h2 class="tw-h2">Learn by doing.</h2>' +
            '  <p class="tw-body">Guided lessons, interactive trainers, and mastery tracking across Maths, Physics, Chemistry, Biology, and English.</p>' +
            '</div></div>' +
            '<div class="tw-slide tw-s3"><div class="tw-slide-inner">' +
            '  <div class="tw-icon-wrap"><span class="tw-icon">&#128075;</span></div>' +
            '  <h2 class="tw-h2">Let’s get you<br>studying.</h2>' +
            '  <p class="tw-body">One quick step to personalise your hub, then you’re in.</p>' +
            '</div></div>' +
            '</div>' +
            '<div class="tw-controls"><div class="tw-dots" id="tw-dots"></div><button class="tw-next" id="tw-next">Next</button></div>' +
            '<div class="tw-progress"><div class="tw-progress-fill" id="tw-progress-fill"></div></div>';

        document.body.appendChild(el);
        requestAnimationFrame(function() { el.classList.add('active'); });
        document.body.style.overflow = 'hidden';

        var track = document.getElementById('tw-track');
        var nextBtn = document.getElementById('tw-next');
        var progressFill = document.getElementById('tw-progress-fill');
        var slideIndex = 0;
        var totalSlides = 3;
        var autoTimer = null;

        function renderDots() {
            var d = document.getElementById('tw-dots'); var h = '';
            for (var i = 0; i < totalSlides; i++) {
                h += '<span class="tw-dot' + (i === slideIndex ? ' active' : i < slideIndex ? ' done' : '') + '"></span>';
            }
            d.innerHTML = h;
        }

        function go(idx) {
            slideIndex = idx;
            track.style.transform = 'translateX(-' + (idx * 100) + 'vw)';
            renderDots();
            progressFill.style.width = ((idx + 1) / totalSlides * 100) + '%';
            nextBtn.textContent = idx === totalSlides - 1 ? 'Get started' : 'Next';
            resetAuto();
        }

        function resetAuto() {
            if (autoTimer) clearTimeout(autoTimer);
            if (slideIndex < totalSlides - 1) autoTimer = setTimeout(function() { go(slideIndex + 1); }, 10000);
        }

        renderDots();
        progressFill.style.width = (1 / totalSlides * 100) + '%';
        resetAuto();

        var sx = 0;
        el.addEventListener('touchstart', function(e) { sx = e.touches[0].clientX; }, { passive: true });
        el.addEventListener('touchend', function(e) {
            var diff = sx - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && slideIndex < totalSlides - 1) go(slideIndex + 1);
                else if (diff < 0 && slideIndex > 0) go(slideIndex - 1);
            }
        }, { passive: true });

        document.addEventListener('keydown', function _kh(e) {
            if (!el.parentNode) { document.removeEventListener('keydown', _kh); return; }
            if (e.key === 'ArrowRight' && slideIndex < totalSlides - 1) go(slideIndex + 1);
            if (e.key === 'ArrowLeft' && slideIndex > 0) go(slideIndex - 1);
        });

        nextBtn.addEventListener('click', function() {
            if (slideIndex < totalSlides - 1) {
                go(slideIndex + 1);
            } else {
                if (autoTimer) clearTimeout(autoTimer);
                el.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(function() {
                    if (el.parentNode) el.parentNode.removeChild(el);
                    if (typeof onContinue === 'function') onContinue();
                }, 400);
            }
        });
    }

    // ── Spotlight Tour ──
    function buildUI() {
        overlay = document.createElement('div');
        overlay.className = 'tut-overlay';
        overlay.innerHTML =
            '<div class="tut-backdrop" id="tut-backdrop"></div>' +
            '<div class="tut-tooltip" id="tut-tooltip">' +
            '  <div class="tut-step-indicator" id="tut-dots"></div>' +
            '  <h3 class="tut-title" id="tut-title"></h3>' +
            '  <p class="tut-desc" id="tut-desc"></p>' +
            '  <div class="tut-actions">' +
            '    <button class="tut-skip" id="tut-skip">Skip tour</button>' +
            '    <div class="tut-nav">' +
            '      <button class="tut-btn tut-btn-back" id="tut-back">Back</button>' +
            '      <button class="tut-btn tut-btn-next" id="tut-next">Next</button>' +
            '    </div>' +
            '  </div>' +
            '</div>';
        document.body.appendChild(overlay);
        tooltip = document.getElementById('tut-tooltip');
        document.getElementById('tut-skip').addEventListener('click', end);
        document.getElementById('tut-next').addEventListener('click', function() { goTo(currentStep + 1); });
        document.getElementById('tut-back').addEventListener('click', function() { goTo(currentStep - 1); });
        document.getElementById('tut-backdrop').addEventListener('click', function(e) { if (e.target.id === 'tut-backdrop') end(); });
        document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) end(); });
    }

    function filterSteps() {
        steps = [];
        for (var i = 0; i < STEPS.length; i++) {
            var s = STEPS[i];
            var e = document.querySelector(s.sel);
            if (!e && s.fallbackSel) e = document.querySelector(s.fallbackSel);
            if (e && e.offsetParent !== null) steps.push({ def: s, el: e });
        }
    }

    function renderTourDots() {
        var d = document.getElementById('tut-dots'); var h = '';
        for (var i = 0; i < steps.length; i++) h += '<span class="tut-dot' + (i === currentStep ? ' active' : '') + '"></span>';
        d.innerHTML = h;
    }

    function goTo(idx) {
        if (idx < 0 || idx >= steps.length) return;
        currentStep = idx;
        var step = steps[idx], e = step.el, d = step.def;
        document.getElementById('tut-title').textContent = d.title;
        document.getElementById('tut-desc').textContent = d.desc;
        renderTourDots();
        document.getElementById('tut-back').style.display = idx === 0 ? 'none' : '';
        var nb = document.getElementById('tut-next');
        nb.textContent = idx === steps.length - 1 ? 'Done' : 'Next';
        nb.onclick = idx === steps.length - 1 ? function() { end(); } : function() { goTo(currentStep + 1); };
        e.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function() { positionTooltip(e, d.pos); }, 350);
    }

    function positionTooltip(e, pos) {
        var r = e.getBoundingClientRect(), p = 8, g = 16;
        overlay.style.setProperty('--spot-top', (r.top - p) + 'px');
        overlay.style.setProperty('--spot-left', (r.left - p) + 'px');
        overlay.style.setProperty('--spot-width', (r.width + p * 2) + 'px');
        overlay.style.setProperty('--spot-height', (r.height + p * 2) + 'px');
        var tt = tooltip;
        tt.classList.remove('pos-top', 'pos-bottom'); tt.classList.add('pos-' + pos);
        tt.style.top = ''; tt.style.left = '';
        if (pos === 'bottom') {
            tt.style.top = (r.bottom + g) + 'px';
        } else {
            tt.style.top = (r.top - g - tt.offsetHeight) + 'px';
            if (tt.getBoundingClientRect().top < 8) tt.style.top = (r.bottom + g) + 'px';
        }
        tt.style.left = Math.max(12, Math.min(r.left + r.width / 2 - 160, window.innerWidth - 332)) + 'px';
    }

    function start() {
        if (hasCompleted()) return;
        filterSteps();
        if (steps.length === 0) { markComplete(); return; }
        buildUI(); overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        currentStep = 0; goTo(0);
    }

    function end() {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        markComplete();
        setTimeout(function() { if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay); overlay = null; tooltip = null; }, 400);
    }

    function reset() { localStorage.removeItem(STORAGE_KEY); }

    return { start: start, showWelcome: showWelcome, end: end, reset: reset, hasCompleted: hasCompleted };
})();
