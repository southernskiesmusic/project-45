/* ================================================================
   SUBJECT BASE - shared init logic for all subject pages
   Usage:
     SubjectBase.init({
       key: 'physics',
       topicMap: { 'mechanics': { view: 'mechanics' }, 'mech-practice': { view: 'mech-practice', init: function() { MECH.load(); } }, ... },
       lessons: { 'mechanics-forces': LESSON_MECHANICS_FORCES, ... },
       trainerInits: [function() { MECH.init(); }, ...],
       flashcardData: FLASHCARD_DATA_PHYSICS,  // or null
       hasFormulaPanel: false,
       hasDailyLimit: false,
       pathways: [...],                        // optional Pathway config array
       continueMap: {...},                     // optional continue-prompt map
       timedActivities: {...},                 // optional timed challenge map
       onTopicClick: function(topic, card) {}, // optional extra topic handler (return true to suppress default)
     });
   ================================================================ */
(function() {
    'use strict';

    var SubjectBase = {};

    // ── Reusable focus trap ─────────────────────────────────────
    // Keeps Tab/Shift+Tab within `panel` and closes on Escape.
    // Call on open; returns { destroy } to remove the handler on close.
    // `closeFn` is called when Escape is pressed.
    SubjectBase.trapFocus = function(panel, closeFn) {
        var FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        function handler(e) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeFn();
                return;
            }
            if (e.key !== 'Tab') return;
            var focusable = Array.from(panel.querySelectorAll(FOCUSABLE))
                .filter(function(el) { return el.offsetParent !== null; }); // visible only
            if (!focusable.length) return;
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
        panel.addEventListener('keydown', handler);
        return { destroy: function() { panel.removeEventListener('keydown', handler); } };
    };

    SubjectBase.init = function(config) {
        var key = config.key;
        var topicMap = config.topicMap || {};
        var lessons = config.lessons || {};
        var trainerInits = config.trainerInits || [];
        var flashcardData = config.flashcardData || null;
        var hasFormulaPanel = config.hasFormulaPanel || false;
        var hasDailyLimit = config.hasDailyLimit || false;
        var pathways = config.pathways || null;
        var continueMap = config.continueMap || null;
        var timedActivities = config.timedActivities || null;
        var onTopicClick = config.onTopicClick || null;

        // Expose SUBJECT_KEY globally (many utils reference it)
        window.SUBJECT_KEY = key;

        document.addEventListener('DOMContentLoaded', function() {
            // ==================== PREMIUM CLICK INTERCEPTOR (capture phase) ====================
            document.addEventListener('click', function(e) {
                var card = e.target.closest('.topic-card.premium-locked');
                if (card) { e.stopImmediatePropagation(); e.preventDefault(); showUpgradeModal(); }
            }, true);

            // ==================== CONTENT GATING + ADS ====================
            if (typeof applyContentGating === 'function') applyContentGating();
            if (typeof Ads !== 'undefined') Ads.init();

            // ==================== EXAM BANNER (persistent) ====================
            (function() {
                try {
                    var STORAGE_KEY = 'examCountdownDate';
                    var saved = localStorage.getItem(STORAGE_KEY);
                    var target;
                    if (saved) {
                        target = new Date(saved + 'T00:00:00');
                    } else {
                        var now = new Date();
                        var yr = now.getFullYear();
                        var may = new Date(yr, 3, 24);
                        target = now < may ? may : new Date(yr + 1, 3, 24);
                    }
                    var diff = target.getTime() - Date.now();
                    if (diff > 0) {
                        var banner = document.createElement('div');
                        banner.className = 'subject-exam-banner';
                        banner.innerHTML = '<div class="subject-exam-banner-left">' +
                            '<div class="subject-exam-banner-icon">&#128197;</div>' +
                            '<span class="subject-exam-banner-text">IB Written Exams</span>' +
                            '</div>' +
                            '<span class="subject-exam-banner-days" id="subject-cd-display"></span>';
                        banner.style.cursor = 'pointer';
                        banner.title = 'Back to hub';
                        banner.addEventListener('click', function() { if (typeof showView === 'function') showView('hub'); });
                        var hidden = localStorage.getItem('examCountdownHidden') === 'true';
                        if (!hidden) {
                            var appEl = document.getElementById('app');
                            if (appEl) appEl.insertBefore(banner, appEl.firstChild);
                        }
                        function updateSubjectCd() {
                            var d = target.getTime() - Date.now();
                            if (d <= 0) { var el = document.getElementById('subject-cd-display'); if (el) el.textContent = 'Now'; return; }
                            var days = Math.floor(d / 86400000);
                            var hrs = Math.floor((d % 86400000) / 3600000);
                            var mins = Math.floor((d % 3600000) / 60000);
                            var secs = Math.floor((d % 60000) / 1000);
                            var el = document.getElementById('subject-cd-display');
                            if (el) el.innerHTML = '<span style="font-weight:800">' + days + '</span><span style="font-weight:500;opacity:0.7">d </span>' +
                                '<span style="font-weight:800">' + hrs + '</span><span style="font-weight:500;opacity:0.7">h </span>' +
                                '<span style="font-weight:800">' + mins + '</span><span style="font-weight:500;opacity:0.7">m </span>' +
                                '<span style="font-weight:800">' + secs + '</span><span style="font-weight:500;opacity:0.7">s</span>';
                        }
                        updateSubjectCd();
                        setInterval(updateSubjectCd, 1000);
                    }
                } catch(e) {}
            })();

            // ==================== FOCUS MODE ====================
            (function() {
                // Inject focus topbar into all practice views
                document.querySelectorAll('.view').forEach(function(view) {
                    // Only add to views that have a score-bar (practice activities)
                    if (view.querySelector('.score-bar') && !view.querySelector('.focus-topbar')) {
                        var bar = document.createElement('div');
                        bar.className = 'focus-topbar';
                        bar.innerHTML = '<button class="focus-exit" data-focus-exit>&#8592; Exit</button>' +
                            '<span class="focus-counter" data-focus-counter></span>' +
                            '<div class="focus-progress"><div class="focus-progress-fill" data-focus-fill></div></div>';
                        view.insertBefore(bar, view.firstChild);
                    }
                });
                // Focus mode toggle: double-click score bar to enter, exit button to leave
                document.addEventListener('dblclick', function(e) {
                    if (e.target.closest('.score-bar')) {
                        document.body.classList.add('focus-mode');
                    }
                });
                document.addEventListener('click', function(e) {
                    if (e.target.closest('[data-focus-exit]')) {
                        document.body.classList.remove('focus-mode');
                    }
                });
            })();

            // ==================== AUTH ====================
            Auth.init();

            // ==================== TRAINER INITS ====================
            for (var i = 0; i < trainerInits.length; i++) {
                trainerInits[i]();
            }

            // ==================== FLASHCARD ENGINE ====================
            if (flashcardData && typeof FlashcardEngine !== 'undefined') {
                FlashcardEngine.init(key, flashcardData);
            }

            // ==================== STREAK / GEMS / FREEZE ====================
            if (typeof updateDailyStreakUI === 'function') updateDailyStreakUI();
            if (typeof updateGemsUI === 'function') updateGemsUI();
            if (typeof updateFreezeUI === 'function') updateFreezeUI();
            if (typeof checkStreakReminder === 'function') checkStreakReminder();

            // ==================== TOPIC CARD CLICKS ====================
            document.querySelectorAll('.topic-card[data-topic]').forEach(function(card) {
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.addEventListener('click', function() {
                    var topic = card.dataset.topic;

                    // Allow custom handler to intercept
                    if (onTopicClick && onTopicClick(topic, card) === true) return;

                    var entry = topicMap[topic];
                    if (entry) {
                        if (entry.href) { window.location.href = entry.href; return; }
                        showView(entry.view);
                        if (typeof entry.init === 'function') entry.init(card);
                    }
                });
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });
            });

            // ==================== LESSON CARDS ====================
            document.querySelectorAll('[data-lesson]').forEach(function(card) {
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.addEventListener('click', function() {
                    var lesson = lessons[card.dataset.lesson];
                    if (lesson) LessonEngine.start(lesson);
                });
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });
            });

            // ==================== LESSON BADGES ====================
            function updateLessonBadges() {
                document.querySelectorAll('[data-lesson]').forEach(function(card) {
                    var id = card.dataset.lesson;
                    var lessonObj = lessons[id];
                    if (lessonObj && LessonEngine.isComplete(lessonObj.id)) {
                        if (!card.querySelector('.lesson-done')) {
                            var badge = document.createElement('span');
                            badge.className = 'topic-tag lesson-done';
                            badge.textContent = 'Done';
                            card.appendChild(badge);
                        }
                    }
                });
            }

            // ==================== ACTIVITY BADGES ====================
            var activityPrefixes = config.activityPrefixes || {};
            function updateActivityBadges() {
                var statsKey = key === 'maths' ? 'activityStats' : key + '_activityStats';
                var stats;
                try { stats = JSON.parse(localStorage.getItem(statsKey) || '{}'); } catch(e) { return; }
                for (var topic in activityPrefixes) {
                    var prefix = activityPrefixes[topic];
                    if (stats[prefix] && stats[prefix].total > 0) {
                        var card = document.querySelector('.topic-card[data-topic="' + topic + '"]');
                        var existing = card ? card.querySelector('.activity-done') : null;
                        if (card) {
                            var s = stats[prefix];
                            var pct = s.total > 0 ? Math.round(((s.score || s.correct || 0) / s.total) * 100) : 0;
                            var label, cls;
                            if (pct >= 90) { label = 'Mastered'; cls = 'activity-done mastered'; }
                            else if (pct >= 75) { label = 'Strong'; cls = 'activity-done strong'; }
                            else { label = 'Practised'; cls = 'activity-done'; }
                            if (existing) {
                                existing.textContent = label;
                                existing.className = 'topic-tag ' + cls;
                            } else {
                                var badge = document.createElement('span');
                                badge.className = 'topic-tag ' + cls;
                                badge.textContent = label;
                                card.appendChild(badge);
                            }
                        }
                    }
                }
            }

            // ==================== BACK BUTTONS ====================
            document.querySelectorAll('[data-back]').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    showView(btn.dataset.back || 'hub');
                    updateLessonBadges();
                    updateActivityBadges();
                    if (typeof Pathway !== 'undefined') { Pathway.updateHubProgress(); Pathway.updateContinueBtn(); Pathway.renderFlowchart(); }
                    if ((btn.dataset.back || 'hub') === 'hub' && typeof showContinuePrompt === 'function') showContinuePrompt();
                });
            });

            updateLessonBadges();
            updateActivityBadges();

            // ==================== PATHWAY ====================
            if (pathways && typeof Pathway !== 'undefined') {
                Pathway.init(lessons, pathways);
            }

            // ==================== BOOKMARKS ====================
            if (typeof Bookmarks !== 'undefined') Bookmarks.injectButtons(key);

            // ==================== LESSON BACK BUTTON ====================
            var lessonBackBtn = document.getElementById('lesson-back-btn');
            if (lessonBackBtn) {
                lessonBackBtn.addEventListener('click', function() {
                    if (LessonEngine.folder) showView(LessonEngine.folder);
                    else showView('hub');
                });
            }

            // ==================== CONTINUE PROMPT ====================
            if (continueMap) {
                function _timeAgo(ts) {
                    var diff = Date.now() - ts;
                    var mins = Math.floor(diff / 60000);
                    if (mins < 1) return 'just now';
                    if (mins < 60) return mins + 'm ago';
                    var hrs = Math.floor(mins / 60);
                    if (hrs < 24) return hrs + 'h ago';
                    var days = Math.floor(hrs / 24);
                    return days + 'd ago';
                }

                window.showContinuePrompt = function() {
                    var container = document.getElementById('continue-prompt');
                    if (!container) return;
                    var stats = getAllActivityStats();
                    var best = null, bestTs = 0;
                    for (var prefix in stats) {
                        var s = stats[prefix];
                        if (s.lastTs && s.lastTs > bestTs && continueMap[prefix]) {
                            bestTs = s.lastTs;
                            best = prefix;
                        }
                    }
                    if (!best) { container.innerHTML = ''; return; }
                    var info = continueMap[best];
                    var s = stats[best];
                    var ago = _timeAgo(bestTs);
                    container.innerHTML = '<div class="continue-card" id="continue-card">' +
                        '<div class="continue-left">' +
                        '<div class="continue-label">Continue where you left off</div>' +
                        '<div class="continue-name">' + info.name + '</div>' +
                        '<div class="continue-stats">' + s.score + '/' + s.total + ' \u2022 ' + ago + '</div>' +
                        '</div>' +
                        '<div class="continue-arrow">\u2192</div>' +
                        '</div>';
                    document.getElementById('continue-card').addEventListener('click', function() {
                        var card = document.querySelector('.topic-card[data-topic="' + info.topic + '"]');
                        if (card) card.click();
                    });
                };
                showContinuePrompt();
            }

            // ==================== TIMED CHALLENGE BUTTONS ====================
            if (timedActivities) {
                document.querySelectorAll('[data-timed]').forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        var prefix = btn.dataset.timed;
                        var entry = timedActivities[prefix];
                        if (entry && typeof TIMED !== 'undefined') {
                            TIMED.start(prefix, entry.obj);
                        }
                    });
                });
            }

            // ==================== DAILY LIMIT (history/geography) ====================
            if (hasDailyLimit && typeof applyDailyLimit === 'function') {
                applyDailyLimit();
            }

            // ==================== FORMULA PANEL (maths) ====================
            if (hasFormulaPanel && typeof initFormulaPanel === 'function') {
                initFormulaPanel();
            }

            // ==================== KEYBOARD NAVIGATION FOR PRACTICE ====================
            (function() {
                // Label MC options with keyboard shortcuts (1-4 / A-D)
                function labelOptions(container) {
                    if (!container) return;
                    var btns = container.querySelectorAll('.option-btn');
                    btns.forEach(function(btn, i) {
                        if (i < 9) btn.setAttribute('data-key', String(i + 1));
                    });
                }

                // Label all existing option grids
                document.querySelectorAll('.options-grid').forEach(function(grid) {
                    labelOptions(grid);
                });

                // Observe new options being added
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(m) {
                        m.addedNodes.forEach(function(node) {
                            if (node.nodeType === 1) {
                                if (node.classList && node.classList.contains('options-grid')) labelOptions(node);
                                else if (node.querySelectorAll) {
                                    node.querySelectorAll('.options-grid').forEach(function(g) { labelOptions(g); });
                                }
                                if (node.classList && node.classList.contains('option-btn')) {
                                    var parent = node.parentElement;
                                    if (parent) labelOptions(parent);
                                }
                            }
                        });
                    });
                });
                observer.observe(document.body, { childList: true, subtree: true });

                // Key handler: 1-4 select options, Enter/Space for next
                document.addEventListener('keydown', function(e) {
                    // Don't intercept when typing in inputs
                    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
                    // Don't intercept when modifiers are held
                    if (e.ctrlKey || e.metaKey || e.altKey) return;

                    var activeView = document.querySelector('.view.active');
                    if (!activeView) return;

                    // Number keys 1-9 for MC options
                    var num = parseInt(e.key);
                    if (num >= 1 && num <= 9) {
                        var optionBtns = activeView.querySelectorAll('.options-grid .option-btn:not(:disabled)');
                        if (optionBtns.length >= num) {
                            e.preventDefault();
                            optionBtns[num - 1].click();
                        }
                        return;
                    }

                    // Enter or Space for Next Question
                    if (e.key === 'Enter' || e.key === ' ') {
                        var nextBtn = activeView.querySelector('.next-btn');
                        if (nextBtn && nextBtn.offsetParent !== null) {
                            e.preventDefault();
                            nextBtn.click();
                        }
                    }
                });
            })();

            // ==================== EMPTY STATES ====================
            (function() {
                // Add empty state to topic grids that have no cards
                document.querySelectorAll('.topic-grid').forEach(function(grid) {
                    var cards = grid.querySelectorAll('.topic-card, .lesson-card, [data-lesson], [data-topic]');
                    if (cards.length === 0 && !grid.querySelector('.empty-state')) {
                        var empty = document.createElement('div');
                        empty.className = 'empty-state';
                        empty.style.gridColumn = '1 / -1';
                        empty.innerHTML = '<span class="empty-state-icon">&#128218;</span>' +
                            '<span class="empty-state-title">No activities yet</span>' +
                            '<span class="empty-state-desc">Activities for this topic are coming soon.</span>';
                        grid.appendChild(empty);
                    }
                });

                // Add empty state to score bars that are blank
                document.querySelectorAll('.score-bar').forEach(function(bar) {
                    if (bar.children.length === 0 && !bar.querySelector('.empty-state')) {
                        var empty = document.createElement('div');
                        empty.className = 'empty-state';
                        empty.innerHTML = '<span class="empty-state-desc">Answer a question to see your stats</span>';
                        bar.appendChild(empty);
                    }
                });
            })();

            // ==================== HASH NAVIGATION ====================
            // Auto-navigate from assignment deep link (#t:trainerId or #l:lessonId)
            // Also supports #t:paper-gen:topicId to preselect a topic in the paper generator
            if (location.hash.length > 3) {
                var h = location.hash.slice(1).split(':');
                if (h.length >= 2) {
                    var sel = h[0] === 'l' ? '[data-lesson="' + h[1] + '"]' : '.topic-card[data-topic="' + h[1] + '"]';
                    var el = document.querySelector(sel);
                    if (el) setTimeout(function() {
                        el.click();
                        // Preselect topic in paper generator if topicId provided
                        if (h.length >= 3 && h[2]) {
                            var topicId = h[2];
                            var checks = document.querySelectorAll('#pg-topic-checks input[type="checkbox"]');
                            if (checks.length) {
                                checks.forEach(function(cb) { cb.checked = cb.value === topicId; });
                            }
                        }
                    }, 150);
                }
            }
        }); // end DOMContentLoaded
    }; // end SubjectBase.init

    /* ================================================================
       SubjectBase.initCommonUI(config)
       Handles boilerplate UI that is identical across all subject pages:
         - Settings (dark mode, wallpaper, font selector)
         - Music player
         - Feedback panel
         - Last updated (from GitHub API)
         - Paper generator wiring
         - Loading screen
         - Key Terms FAB panel
         - Topic search
         - Lesson history modal

       Config:
         subjectPath: 'humanities/history/'   - GitHub API path for last-updated
         paperGen: PAPER_GEN                  - paper generator object (or null/undefined)
       ================================================================ */
    SubjectBase.initCommonUI = function(config) {
        config = config || {};
        var subjectPath = config.subjectPath || '';
        var pg = config.paperGen || null;

        // ==================== SETTINGS (dark mode) ====================
        var darkToggle = document.getElementById('dark-toggle');
        if (darkToggle) {
            var isDark = document.body.classList.contains('dark-mode');
            darkToggle.textContent = isDark ? 'On' : 'Off';
            if (isDark) darkToggle.classList.add('active');
            darkToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                var on = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', on ? 'on' : 'off');
                darkToggle.textContent = on ? 'On' : 'Off';
                darkToggle.classList.toggle('active', on);
            });
        }

        // ==================== SETTINGS BUTTON ====================
        var settingsBtn = document.getElementById('settings-btn');
        var _settingsDropdown = document.getElementById('settings-dropdown');
        var _sdTrap = null;
        var _sdPrevFocus = null;

        function _sdClose() {
            if (_settingsDropdown) _settingsDropdown.classList.remove('show');
            if (settingsBtn) settingsBtn.setAttribute('aria-expanded', 'false');
            if (_sdTrap) { _sdTrap.destroy(); _sdTrap = null; }
            if (_sdPrevFocus) { _sdPrevFocus.focus(); _sdPrevFocus = null; }
        }
        function _sdOpen() {
            if (!_settingsDropdown) return;
            _sdPrevFocus = document.activeElement || null;
            _settingsDropdown.classList.add('show');
            if (settingsBtn) settingsBtn.setAttribute('aria-expanded', 'true');
            _sdTrap = SubjectBase.trapFocus(_settingsDropdown, _sdClose);
            var first = _settingsDropdown.querySelector('button, select, input, [tabindex]');
            if (first) first.focus();
        }

        // Expose open/close so subject-specific code can call them
        window._settingsDropdownOpen = _sdOpen;
        window._settingsDropdownClose = _sdClose;

        if (settingsBtn) {
            settingsBtn.addEventListener('click', function() {
                // If the dropdown exists and is wired up by subject-specific code, toggle it;
                // otherwise navigate to the settings page.
                if (_settingsDropdown && _settingsDropdown.dataset.dropdownActive === 'true') {
                    if (_settingsDropdown.classList.contains('show')) { _sdClose(); } else { _sdOpen(); }
                } else {
                    var base = (typeof PAGE_EXTRAS !== 'undefined' && PAGE_EXTRAS.basePath) ? PAGE_EXTRAS.basePath : '..';
                    window.location.href = base + '/settings.html';
                }
            });
        }

        // Escape key for settings dropdown (shared fallback)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && _settingsDropdown && _settingsDropdown.classList.contains('show')) {
                _sdClose();
            }
        });

        // ==================== WALLPAPER (DISABLED) ====================
        // Feature disabled - hide any remaining UI elements
        var bgSettingsLabel = document.querySelector('.settings-item');
        if (bgSettingsLabel) {
            // Hide all background-related settings items
            document.querySelectorAll('.settings-item').forEach(function(item) {
                var text = item.textContent || '';
                if (text.indexOf('Background') !== -1 || text.indexOf('Opacity') !== -1) {
                    if (item.querySelector('#bg-choose') || item.querySelector('#bg-opacity')) {
                        item.style.display = 'none';
                    }
                }
            });
        }

        // ==================== FONT SELECTOR ====================
        var fontSel = document.getElementById('font-selector');
        if (fontSel) {
            var fontMap = {
                system: '',
                inter: "'Inter', sans-serif",
                poppins: "'Poppins', sans-serif",
                roboto: "'Roboto', sans-serif",
                opensans: "'Open Sans', sans-serif",
                lato: "'Lato', sans-serif",
                nunito: "'Nunito', sans-serif",
                comic: "'Comic Neue', cursive",
                dyslexic: "'OpenDyslexic', sans-serif",
                mono: "'JetBrains Mono', monospace"
            };
            function _loadDyslexicFont() {
                if (document.getElementById('dyslexic-font-link')) return;
                var link = document.createElement('link');
                link.id = 'dyslexic-font-link';
                link.rel = 'stylesheet';
                link.href = 'https://fonts.cdnfonts.com/css/open-dyslexic';
                document.head.appendChild(link);
            }
            function _loadMonoFont() {
                if (document.getElementById('mono-font-link')) return;
                var link = document.createElement('link');
                link.id = 'mono-font-link';
                link.rel = 'stylesheet';
                link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap';
                document.head.appendChild(link);
            }
            var savedFont = localStorage.getItem('selectedFont') || 'system';
            fontSel.value = savedFont;
            if (fontMap[savedFont]) document.body.style.fontFamily = fontMap[savedFont];
            if (savedFont === 'dyslexic') _loadDyslexicFont();
            if (savedFont === 'mono') _loadMonoFont();
            fontSel.addEventListener('change', function() {
                var val = fontSel.value;
                localStorage.setItem('selectedFont', val);
                document.body.style.fontFamily = fontMap[val] || '';
                if (val === 'dyslexic') _loadDyslexicFont();
                if (val === 'mono') _loadMonoFont();
            });
        }

        // Music player removed

        // ==================== FEEDBACK PANEL ====================
        var fbFloatBtn = document.getElementById('fb-float-btn');
        if (fbFloatBtn) {
            var _fbPanel = document.getElementById('fb-float-panel');
            var _fbTrap = null;
            var _fbPrevFocus = null;

            function _fbClose() {
                _fbPanel.classList.remove('show');
                if (_fbTrap) { _fbTrap.destroy(); _fbTrap = null; }
                if (_fbPrevFocus) { _fbPrevFocus.focus(); _fbPrevFocus = null; }
            }
            function _fbOpen() {
                _fbPrevFocus = document.activeElement || null;
                _fbPanel.classList.add('show');
                _fbTrap = SubjectBase.trapFocus(_fbPanel, _fbClose);
                var first = _fbPanel.querySelector('select, textarea, button');
                if (first) first.focus();
            }

            fbFloatBtn.addEventListener('click', function() {
                if (_fbPanel.classList.contains('show')) { _fbClose(); } else { _fbOpen(); }
            });
            var fbClose = document.getElementById('fb-float-close');
            if (fbClose) fbClose.addEventListener('click', _fbClose);
            var fbSubmit = document.getElementById('fb-submit');
            if (fbSubmit) fbSubmit.addEventListener('click', function() {
                FEEDBACK.submit();
            });
        }

        // ==================== LAST UPDATED ====================
        if (subjectPath) {
            var url = 'https://api.github.com/repos/southernskiesmusic/project-56/commits?per_page=1&path=' + subjectPath;
            fetch(url)
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    if (data[0] && data[0].commit && data[0].commit.author && data[0].commit.author.date) {
                        var d = new Date(data[0].commit.author.date);
                        var el = document.getElementById('last-updated');
                        var dateStr = d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
                        var timeStr = d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true });
                        if (el) el.textContent = 'Last updated: ' + dateStr + ', ' + timeStr;
                    }
                })
                .catch(function() {
                    var el = document.getElementById('last-updated');
                    if (el) el.textContent = 'Last updated: recently';
                });
        }

        // ==================== PAPER GENERATOR ====================
        if (pg) {
            var _pgTimerEnabled = true;
            var _pgMode = 'paper';

            window._pgInitSetup = function() {
                var histEl = document.getElementById('pg-history-container');
                if (histEl) {
                    histEl.innerHTML = pg.renderHistory();
                    if (typeof pg._wireHistoryButtons === 'function') pg._wireHistoryButtons();
                }
            };
            // Render history on initial page load
            _pgInitSetup();

            document.querySelectorAll('.pg-mode-btn').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.pg-mode-btn').forEach(function(b) { b.classList.remove('active'); });
                    btn.classList.add('active');
                    _pgMode = btn.dataset.mode;
                    var paperOpts = document.getElementById('pg-paper-options');
                    var indivOpts = document.getElementById('pg-individual-options');
                    if (paperOpts) paperOpts.style.display = _pgMode === 'paper' ? '' : 'none';
                    if (indivOpts) indivOpts.style.display = _pgMode === 'individual' ? '' : 'none';
                });
            });

            var pgTimerToggle = document.getElementById('pg-timer-toggle');
            if (pgTimerToggle) {
                pgTimerToggle.addEventListener('click', function() {
                    _pgTimerEnabled = !_pgTimerEnabled;
                    this.textContent = _pgTimerEnabled ? 'On' : 'Off';
                });
            }

            var pgStartPaper = document.getElementById('pg-start-paper');
            if (pgStartPaper) {
                pgStartPaper.addEventListener('click', function() {
                    if (typeof PG_UTILS !== 'undefined' && !PG_UTILS.gatePaperGeneration()) return;
                    var topics = [];
                    document.querySelectorAll('#pg-topic-checks input:checked').forEach(function(cb) {
                        topics.push(cb.value);
                    });
                    if (topics.length === 0) { pageFlash('Select at least one topic.'); return; }
                    pg.startPaper(topics, _pgTimerEnabled);
                    if (typeof PG_UTILS !== 'undefined') {
                        PG_UTILS.incrementPaperUsage();
                        PG_UTILS.showRemainingAfterGen();
                    }
                });
            }

            var pgStartIndiv = document.getElementById('pg-start-individual');
            if (pgStartIndiv) {
                pgStartIndiv.addEventListener('click', function() {
                    if (typeof PG_UTILS !== 'undefined' && !PG_UTILS.gatePaperGeneration()) return;
                    var topic = document.getElementById('pg-individual-topic').value;
                    if (topic === 'random') topic = null;
                    pg.startIndividual(topic);
                    if (typeof PG_UTILS !== 'undefined') {
                        PG_UTILS.incrementPaperUsage();
                        PG_UTILS.showRemainingAfterGen();
                    }
                });
            }

            var pgPrev = document.getElementById('pg-prev-btn');
            if (pgPrev) pgPrev.addEventListener('click', function() {
                if (pg.currentQ > 0) pg.loadPart(pg.currentQ - 1);
            });
            var pgNext = document.getElementById('pg-next-btn');
            if (pgNext) pgNext.addEventListener('click', function() {
                if (pg.currentQ < pg.flatParts.length - 1) pg.loadPart(pg.currentQ + 1);
            });

            if (typeof SwipeNav !== 'undefined') {
                SwipeNav.bind('#view-paper-active', {
                    onSwipeLeft: function() { if (pg.currentQ < pg.flatParts.length - 1) pg.loadPart(pg.currentQ + 1); },
                    onSwipeRight: function() { if (pg.currentQ > 0) pg.loadPart(pg.currentQ - 1); },
                    excludeSelector: 'textarea, input, math-field, .calc-container, .pg-working-textarea, .pg-working-content, [contenteditable], button, .btn, .pg-nav-strip'
                });
            }

            var pgFinish = document.getElementById('pg-finish-btn');
            if (pgFinish) {
                pgFinish.addEventListener('click', function() {
                    if (typeof pageFlash !== 'undefined' && pageFlash.confirm) {
                        pageFlash.confirm('Submit your paper? Unanswered questions will score 0.').then(function(ok) {
                            if (ok) pg.finishPaper();
                        });
                    } else if (confirm('Submit your paper? Unanswered questions will score 0.')) {
                        pg.finishPaper();
                    }
                });
            }

            var pgAbort = document.getElementById('pg-abort-btn');
            if (pgAbort) {
                pgAbort.addEventListener('click', function() {
                    if (typeof pageFlash !== 'undefined' && pageFlash.confirm) {
                        pageFlash.confirm('Abort this paper? Your progress will be lost.').then(function(ok) {
                            if (ok) pg.abort();
                        });
                    } else if (confirm('Abort this paper? Your progress will be lost.')) {
                        pg.abort();
                    }
                });
            }

            var pgRetake = document.getElementById('pg-retake-btn');
            if (pgRetake) {
                pgRetake.addEventListener('click', function() {
                    showView('paper-setup');
                    _pgInitSetup();
                });
            }

            var pgResultsBack = document.querySelector('#view-paper-results [data-back="paper-setup"]');
            if (pgResultsBack) {
                pgResultsBack.addEventListener('click', function(e) {
                    e.preventDefault();
                    showView('paper-setup');
                    _pgInitSetup();
                });
            }

            // Mark scheme button (science subjects)
            var pgMarkScheme = document.getElementById('pg-markscheme-btn');
            if (pgMarkScheme && typeof pg.renderMarkScheme === 'function') {
                pgMarkScheme.addEventListener('click', function() {
                    pg.renderMarkScheme();
                });
            }
        }

        // ==================== LOADING SCREEN ====================
        var ls = document.getElementById('loading-screen');
        if (ls) {
            var bar = document.getElementById('loading-bar');
            var ctr = document.getElementById('loading-counter');
            if (bar) bar.style.width = '100%';
            if (ctr) ctr.textContent = '100%';
            setTimeout(function() {
                ls.classList.add('hidden');
                setTimeout(function() { ls.remove(); }, 900);
            }, 400);
        }

        // ==================== KEY TERMS FAB PANEL ====================
        (function() {
            var fab = document.getElementById('formula-fab');
            var panel = document.getElementById('formula-panel');
            var backdrop = document.getElementById('formula-panel-backdrop');
            if (!fab || !panel || !backdrop) return;
            var populated = false;
            fab.addEventListener('click', function() {
                if (!populated) {
                    var src = document.querySelector('#view-key-terms .card');
                    if (src) {
                        panel.innerHTML = '<button class="formula-panel-close" id="fp-close">&times; Close</button>' + src.innerHTML;
                        var oldBack = panel.querySelector('.back-btn');
                        if (oldBack) oldBack.remove();
                        document.getElementById('fp-close').addEventListener('click', closePanel);
                        populated = true;
                    }
                }
                panel.classList.add('open');
                backdrop.classList.add('open');
            });
            function closePanel() {
                panel.classList.remove('open');
                backdrop.classList.remove('open');
            }
            backdrop.addEventListener('click', closePanel);
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
            });
        })();

        // ==================== TOPIC SEARCH ====================
        if (!config.skipSearch) (function() {
            var searchInput = document.getElementById('search-input');
            var searchResults = document.getElementById('search-results');
            if (!searchInput || !searchResults) return;

            var index = [];
            document.querySelectorAll('.topic-card[data-topic]').forEach(function(card) {
                var topic = card.dataset.topic;
                var h2 = card.querySelector('h2');
                var p = card.querySelector('p');
                index.push({
                    type: 'topic', id: topic,
                    title: h2 ? h2.textContent : topic,
                    desc: p ? p.textContent : '',
                    action: function() { card.click(); },
                    el: card
                });
            });
            document.querySelectorAll('.topic-card[data-lesson]').forEach(function(card) {
                var lessonId = card.dataset.lesson;
                var h2 = card.querySelector('h2');
                var p = card.querySelector('p');
                index.push({
                    type: 'lesson', id: lessonId,
                    title: h2 ? h2.textContent : lessonId,
                    desc: p ? p.textContent : '',
                    action: function() { card.click(); }
                });
            });

            var activeIdx = -1;

            function doSearch(query) {
                var q = query.toLowerCase().trim();
                if (!q) {
                    searchResults.classList.remove('show');
                    searchResults.innerHTML = '';
                    document.querySelectorAll('.topic-card').forEach(function(c) { c.classList.remove('search-hidden'); });
                    return;
                }
                document.querySelectorAll('.topic-card[data-topic]').forEach(function(card) {
                    var text = (card.textContent || '').toLowerCase();
                    card.classList.toggle('search-hidden', text.indexOf(q) === -1);
                });
                var matches = index.filter(function(item) {
                    return item.title.toLowerCase().indexOf(q) !== -1 ||
                           item.desc.toLowerCase().indexOf(q) !== -1 ||
                           item.id.toLowerCase().indexOf(q) !== -1;
                }).slice(0, 8);
                if (matches.length === 0) {
                    searchResults.classList.remove('show');
                    searchResults.innerHTML = '';
                    return;
                }
                var icons = { topic: '\ud83d\udcda', lesson: '\ud83d\udcd6' };
                searchResults.innerHTML = matches.map(function(m, i) {
                    return '<div class="search-result' + (i === activeIdx ? ' active' : '') + '" data-idx="' + i + '">' +
                        '<span class="search-result-icon">' + (icons[m.type] || '') + '</span>' +
                        '<div class="search-result-text">' +
                        '<div class="search-result-title">' + m.title + '</div>' +
                        '<div class="search-result-sub">' + m.desc.slice(0, 60) + '</div>' +
                        '</div>' +
                        '<span class="search-result-type ' + m.type + '">' + m.type + '</span>' +
                        '</div>';
                }).join('');
                searchResults.classList.add('show');
                searchResults.querySelectorAll('.search-result').forEach(function(el, i) {
                    el.addEventListener('click', function() {
                        matches[i].action();
                        searchInput.value = '';
                        doSearch('');
                    });
                });
            }

            searchInput.addEventListener('input', function() { activeIdx = -1; doSearch(searchInput.value); });
            searchInput.addEventListener('keydown', function(e) {
                var items = searchResults.querySelectorAll('.search-result');
                if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, items.length - 1); updateActive(items); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); updateActive(items); }
                else if (e.key === 'Enter' && activeIdx >= 0 && items[activeIdx]) { e.preventDefault(); items[activeIdx].click(); }
                else if (e.key === 'Escape') { searchInput.value = ''; searchInput.blur(); doSearch(''); }
            });

            function updateActive(items) {
                items.forEach(function(el, i) { el.classList.toggle('active', i === activeIdx); });
            }

            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && ['INPUT','TEXTAREA','MATH-FIELD'].indexOf(document.activeElement.tagName) === -1 && !document.activeElement.isContentEditable)) {
                    e.preventDefault();
                    searchInput.focus();
                }
            });

            document.addEventListener('click', function(e) {
                if (!e.target.closest('.search-bar')) searchResults.classList.remove('show');
            });
        })();

        // ==================== LESSON HISTORY ====================
        (function() {
            var btn = document.getElementById('btn-lesson-history');
            if (!btn) return;
            btn.addEventListener('click', function() {
                var prefix = (typeof STORAGE_PREFIX !== 'undefined') ? STORAGE_PREFIX : '';
                var lp;
                try { lp = JSON.parse(localStorage.getItem(prefix + 'lessonProgress') || '{}'); } catch(e) { lp = {}; }
                var entries = [];
                for (var id in lp) {
                    if (lp[id] && lp[id].completed) entries.push({ id: id, score: lp[id].score || 0, total: lp[id].total || 0, ts: lp[id].ts || 0 });
                }
                entries.sort(function(a, b) { return b.ts - a.ts; });
                var h = '<div class="lh-overlay" id="lh-overlay"><div class="lh-modal">';
                h += '<div class="lh-header"><h2>Lesson History</h2><button class="lh-close" id="lh-close">&times;</button></div>';
                h += '<div class="lh-body">';
                if (entries.length === 0) {
                    h += '<p style="text-align:center;padding:24px;opacity:.6">No lessons completed yet.</p>';
                } else {
                    h += '<div class="lh-count">' + entries.length + ' lesson' + (entries.length !== 1 ? 's' : '') + ' completed</div>';
                    entries.forEach(function(e) {
                        var name = e.id.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
                        var pct = e.total > 0 ? Math.round(e.score / e.total * 100) : 100;
                        var date = e.ts ? new Date(e.ts).toLocaleDateString() : 'Unknown';
                        var col = pct >= 80 ? '#27ae60' : pct >= 50 ? '#f39c12' : '#e74c3c';
                        h += '<div class="lh-row"><div class="lh-info"><div class="lh-name">' + name + '</div><div class="lh-date">' + date + '</div></div>';
                        h += '<div class="lh-score-area">';
                        if (e.total > 0) {
                            h += '<div class="lh-bar-wrap"><div class="lh-bar" style="width:' + pct + '%;background:' + col + '"></div></div>';
                            h += '<div class="lh-pct">' + e.score + '/' + e.total + ' (' + pct + '%)</div>';
                        } else {
                            h += '<div class="lh-pct" style="color:#27ae60">Completed</div>';
                        }
                        h += '</div></div>';
                    });
                }
                h += '</div></div></div>';
                document.body.insertAdjacentHTML('beforeend', h);
                document.getElementById('lh-close').addEventListener('click', function() {
                    var el = document.getElementById('lh-overlay');
                    if (el) el.remove();
                });
                document.getElementById('lh-overlay').addEventListener('click', function(e) {
                    if (e.target === this) this.remove();
                });
            });
        })();
    }; // end SubjectBase.initCommonUI

    // Skin loading handled by js/skin-loader.js (loaded in <head>)

    // ── Accessibility: add ARIA roles to feedback & hint elements ──
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.feedback').forEach(function(el) {
            el.setAttribute('role', 'alert');
            el.setAttribute('aria-live', 'assertive');
        });
        document.querySelectorAll('.hint-box').forEach(function(el) {
            el.setAttribute('role', 'note');
            el.setAttribute('aria-label', 'Hint');
        });
    });

    window.SubjectBase = SubjectBase;

    // ── Auto-load viral share engine on subject pages ──
    // Dynamically inject the script since not all pages include it in HTML
    (function() {
        if (typeof ShareEngine !== 'undefined') return; // already loaded
        var isSubject = location.pathname.indexOf('/maths') !== -1 ||
            location.pathname.indexOf('/physics') !== -1 ||
            location.pathname.indexOf('/chemistry') !== -1 ||
            location.pathname.indexOf('/biology') !== -1 ||
            location.pathname.indexOf('/lal') !== -1 ||
            location.pathname.indexOf('/humanities') !== -1 ||
            location.pathname.indexOf('/arts') !== -1 ||
            location.pathname.indexOf('/mfl') !== -1;
        if (!isSubject) return;
        var s = document.createElement('script');
        s.src = (location.pathname.indexOf('/history/') !== -1 || location.pathname.indexOf('/geography/') !== -1 ||
                 location.pathname.indexOf('/integrated-humanities/') !== -1 || location.pathname.indexOf('/english/') !== -1 ||
                 location.pathname.indexOf('/french/') !== -1 || location.pathname.indexOf('/hindi/') !== -1 ||
                 location.pathname.indexOf('/visual-art/') !== -1 || location.pathname.indexOf('/music/') !== -1 ||
                 location.pathname.indexOf('/drama/') !== -1 || location.pathname.indexOf('/design/') !== -1 ||
                 location.pathname.indexOf('/personal-project/') !== -1)
            ? '../../js/viral-share-engine.js' : '../js/viral-share-engine.js';
        s.defer = true;
        document.head.appendChild(s);
    })();
})();
