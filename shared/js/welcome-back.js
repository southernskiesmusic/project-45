/* ================================================================
   PROJECT 45 - WELCOME BACK
   Return-user modal after 3+ days away.
   localStorage key: p45_lastVisit (ISO date)
   ================================================================ */
var WelcomeBack = (function() {
    'use strict';

    var KEY = 'p45_lastVisit';

    var SUBJECTS = [
        { key: 'maths_activityStats',   label: 'Maths',     href: './maths/' },
        { key: 'physics_activityStats', label: 'Physics',   href: './physics/' },
        { key: 'chem_activityStats',    label: 'Chemistry', href: './chemistry/' },
        { key: 'bio_activityStats',     label: 'Biology',   href: './biology/' },
        { key: 'eng_activityStats',     label: 'English',   href: './english/' }
    ];

    function _getMostUsed() {
        var best = null, bestTotal = 0;
        for (var i = 0; i < SUBJECTS.length; i++) {
            try {
                var stats = JSON.parse(localStorage.getItem(SUBJECTS[i].key) || '{}');
                var total = 0;
                for (var k in stats) total += (stats[k].total || 0);
                if (total > bestTotal) { bestTotal = total; best = SUBJECTS[i]; }
            } catch(e) {}
        }
        return best || SUBJECTS[0];
    }

    function _showModal(daysMissed) {
        var subject = _getMostUsed();

        var overlay = document.createElement('div');
        overlay.className = 'wb-overlay';
        overlay.id = 'wb-overlay';
        overlay.innerHTML =
            '<div class="wb-card">' +
            '  <div class="wb-emoji">&#128075;</div>' +
            '  <h2 class="wb-title">Welcome back!</h2>' +
            '  <p class="wb-text">You\'ve been away for ' + daysMissed + ' day' + (daysMissed !== 1 ? 's' : '') + '. Your study journey awaits.</p>' +
            '  <a href="' + subject.href + '" class="wb-btn">Jump back into ' + subject.label + '</a>' +
            '  <button class="wb-dismiss" id="wb-dismiss">Maybe later</button>' +
            '</div>';

        document.body.appendChild(overlay);
        requestAnimationFrame(function() { overlay.classList.add('show'); });

        document.getElementById('wb-dismiss').addEventListener('click', function() {
            overlay.classList.remove('show');
            setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 300);
        });
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('show');
                setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 300);
            }
        });
    }

    function check() {
        var lastVisit = localStorage.getItem(KEY);
        var today = new Date().toLocaleDateString('en-CA');
        localStorage.setItem(KEY, today);
        if (!lastVisit) return;
        var daysDiff = Math.floor((new Date(today) - new Date(lastVisit)) / 86400000);
        if (daysDiff >= 3) _showModal(daysDiff);
    }

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            var onboard = document.getElementById('onboard-overlay');
            if (onboard && onboard.classList.contains('show')) return;
            check();
        }, 1500);
    });

    return { check: check };
})();
