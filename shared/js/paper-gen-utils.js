/* ================================================================
   paper-gen-utils.js - Shared utilities for all paper generators
   Auto-save, topic pool info, time adjustment
   Load BEFORE the subject's paper-generator.js
   ================================================================ */

var PG_UTILS = {

    // === AUTO-SAVE (#11) ===

    autoSave: function(key, pg) {
        try {
            var state = {
                mode: pg.mode,
                paper: pg.paper,
                flatParts: pg.flatParts,
                answers: pg.answers,
                marks: pg.marks,
                _working: pg._working,
                _flags: pg._flags || [],
                _drafts: pg._drafts || [],
                currentQ: pg.currentQ,
                timeLeft: pg.timeLeft,
                _totalTime: pg._totalTime,
                timerEnabled: pg.timerEnabled,
                selectedTopics: pg.selectedTopics,
                ts: Date.now()
            };
            localStorage.setItem(key + '_autosave', JSON.stringify(state));
        } catch (e) {}
    },

    loadSave: function(key) {
        try {
            var raw = localStorage.getItem(key + '_autosave');
            if (!raw) return null;
            var state = JSON.parse(raw);
            // Expire after 24 hours
            if (Date.now() - state.ts > 86400000) {
                localStorage.removeItem(key + '_autosave');
                return null;
            }
            return state;
        } catch (e) { return null; }
    },

    clearSave: function(key) {
        try { localStorage.removeItem(key + '_autosave'); } catch (e) {}
    },

    hasSave: function(key) {
        return !!this.loadSave(key);
    },

    // === RESUME BANNER (#11) ===

    renderResumeBanner: function(key, onResume, onDiscard) {
        var saved = this.loadSave(key);
        if (!saved) return '';
        var ago = this._timeAgo(saved.ts);
        var answered = (saved.answers || []).filter(function(a) { return a !== null; }).length;
        var total = (saved.flatParts || []).length;
        return '<div class="pg-resume-banner" id="pg-resume-banner">' +
            '<div class="pg-resume-info">' +
            '<strong>Resume saved paper?</strong>' +
            '<span class="pg-resume-meta">' + answered + '/' + total + ' answered &bull; ' + ago + '</span>' +
            '</div>' +
            '<div class="pg-resume-actions">' +
            '<button class="btn btn-primary btn-sm" id="pg-resume-yes">Resume</button>' +
            '<button class="btn btn-sm" id="pg-resume-no">Discard</button>' +
            '</div></div>';
    },

    wireResumeBanner: function(key, onResume, onDiscard) {
        var yesBtn = document.getElementById('pg-resume-yes');
        var noBtn = document.getElementById('pg-resume-no');
        var self = this;
        if (yesBtn) yesBtn.addEventListener('click', function() {
            var state = self.loadSave(key);
            if (state && onResume) onResume(state);
        });
        if (noBtn) noBtn.addEventListener('click', function() {
            self.clearSave(key);
            var banner = document.getElementById('pg-resume-banner');
            if (banner) banner.style.display = 'none';
            if (onDiscard) onDiscard();
        });
    },

    _timeAgo: function(ts) {
        var diff = Math.floor((Date.now() - ts) / 60000);
        if (diff < 1) return 'just now';
        if (diff < 60) return diff + ' min ago';
        var hours = Math.floor(diff / 60);
        if (hours < 24) return hours + 'h ago';
        return Math.floor(hours / 24) + 'd ago';
    },

    // === TOPIC POOL INFO (#10) ===

    renderPoolInfo: function(contexts) {
        var h = '<details class="pg-pool-info"><summary>Question Pool</summary><div class="pg-pool-grid">';
        for (var topic in contexts) {
            var count = contexts[topic].length;
            h += '<div class="pg-pool-row"><span class="pg-pool-topic">' +
                topic.replace(/^./, function(c) { return c.toUpperCase(); }).replace(/-/g, ' ') +
                '</span><span class="pg-pool-count">' + count + ' context' + (count !== 1 ? 's' : '') + '</span></div>';
        }
        h += '</div></details>';
        return h;
    },

    // === TIME ADJUSTMENT (#12) ===

    adjustTime: function(pg, deltaSec) {
        if (!pg.timerEnabled || pg.readingPhase) return;
        var maxTime = (pg._originalTime || pg._totalTime || 7200) + 3600; // max = original + 60 min
        pg.timeLeft = Math.max(0, Math.min(maxTime, pg.timeLeft + deltaSec));
        pg._totalTime = Math.max(pg._totalTime, pg.timeLeft);
        pg.updateTimerDisplay();
    },

    // === BOOKMARK / FLAG (#5) ===

    toggleFlag: function(pg, idx) {
        if (!pg._flags) pg._flags = new Array(pg.flatParts.length).fill(false);
        pg._flags[idx] = !pg._flags[idx];
        return pg._flags[idx];
    },

    getFlagCount: function(pg) {
        if (!pg._flags) return 0;
        return pg._flags.filter(Boolean).length;
    },

    // === USAGE LIMITS ===

    _getWeekStart: function() {
        var now = new Date();
        var day = now.getDay(); // 0=Sun, 1=Mon...
        var diff = (day === 0) ? 6 : day - 1; // days since Monday
        var monday = new Date(now);
        monday.setDate(now.getDate() - diff);
        return monday.toISOString().slice(0, 10);
    },

    /**
     * Check if the user can generate a paper based on their tier.
     * Returns { allowed: bool, reason?: string, remaining?: number, limit?: number }
     */
    checkPaperLimit: function() {
        // Owner/admin/developer: unlimited (check live role + cached role)
        var role = (typeof Premium !== 'undefined') ? Premium._role : null;
        if (!role) { try { role = localStorage.getItem('roleCache'); } catch(e) {} }
        if (role === 'owner' || role === 'admin' || role === 'Developer') {
            return { allowed: true, remaining: 999, limit: 999, tier: 'owner' };
        }

        var tier = (typeof Premium !== 'undefined' && Premium.getTier) ? Premium.getTier() : 'free';

        // Free: blocked entirely
        if (tier === 'free') {
            return { allowed: false, reason: 'upgrade', remaining: 0, limit: 0 };
        }

        var usage;
        try { usage = JSON.parse(localStorage.getItem('paperGenUsage') || '{}'); } catch (e) { usage = {}; }
        var today = new Date().toISOString().slice(0, 10);
        var weekStart = this._getWeekStart();

        // Pro: 2 per day
        if (tier === 'pro') {
            if (usage.date !== today) {
                usage = { date: today, weekStart: weekStart, dailyCount: 0, weeklyCount: usage.weekStart === weekStart ? (usage.weeklyCount || 0) : 0 };
            }
            var remaining = Math.max(0, 2 - (usage.dailyCount || 0));
            if (remaining === 0) {
                return { allowed: false, reason: 'daily_limit', remaining: 0, limit: 2, tier: tier };
            }
            return { allowed: true, remaining: remaining, limit: 2, tier: tier, period: 'today' };
        }

        // Student: 3 per week
        if (usage.weekStart !== weekStart) {
            usage = { weekStart: weekStart, date: today, dailyCount: 0, weeklyCount: 0 };
        }
        var remaining = Math.max(0, 3 - (usage.weeklyCount || 0));
        if (remaining === 0) {
            return { allowed: false, reason: 'weekly_limit', remaining: 0, limit: 3, tier: tier };
        }
        return { allowed: true, remaining: remaining, limit: 3, tier: tier, period: 'this week' };
    },

    /**
     * Increment usage counter after a paper is successfully generated.
     */
    incrementPaperUsage: function() {
        var tier = (typeof Premium !== 'undefined' && Premium.getTier) ? Premium.getTier() : 'free';
        if (tier === 'free') return;

        var usage;
        try { usage = JSON.parse(localStorage.getItem('paperGenUsage') || '{}'); } catch (e) { usage = {}; }
        var today = new Date().toISOString().slice(0, 10);
        var weekStart = this._getWeekStart();

        // Reset if stale
        if (tier === 'pro' && usage.date !== today) {
            usage = { date: today, weekStart: weekStart, dailyCount: 0, weeklyCount: usage.weekStart === weekStart ? (usage.weeklyCount || 0) : 0 };
        }
        if (usage.weekStart !== weekStart) {
            usage = { weekStart: weekStart, date: today, dailyCount: 0, weeklyCount: 0 };
        }

        usage.date = today;
        usage.dailyCount = (usage.dailyCount || 0) + 1;
        usage.weeklyCount = (usage.weeklyCount || 0) + 1;

        try { localStorage.setItem('paperGenUsage', JSON.stringify(usage)); } catch (e) {}
        // Analytics
        if (typeof P56Analytics !== 'undefined') P56Analytics.track('paper_generated', { subject: window.SUBJECT_KEY || '' });
    },

    /**
     * Show the paper limit modal. Returns false if blocked, true if allowed.
     * If allowed, also shows remaining count via pageFlash.
     */
    gatePaperGeneration: function() {
        var result = this.checkPaperLimit();

        if (!result.allowed) {
            if (result.reason === 'upgrade') {
                // Free user - show upgrade modal
                if (typeof showLimitModal === 'function') {
                    showLimitModal('papers');
                } else if (typeof showUpgradeModal === 'function') {
                    showUpgradeModal();
                } else if (typeof pageFlash !== 'undefined') {
                    pageFlash('Practice papers require a Student or Pro subscription.');
                }
                return false;
            }
            // Limit hit for paid user
            var msg = result.reason === 'daily_limit'
                ? 'You\'ve used all ' + result.limit + ' papers for today. Resets at midnight.'
                : 'You\'ve used all ' + result.limit + ' papers for this week. Resets on Monday.';
            if (result.tier === 'student') {
                msg += ' Upgrade to Pro for 2 papers per day.';
            }
            this._showPaperLimitModal(msg, result.tier);
            return false;
        }

        return true;
    },

    /**
     * Show remaining paper count after generation.
     */
    showRemainingAfterGen: function() {
        var result = this.checkPaperLimit();
        if (result.remaining !== undefined && typeof pageFlash !== 'undefined') {
            var label = result.period === 'today' ? 'today' : 'this week';
            pageFlash(result.remaining + ' paper' + (result.remaining !== 1 ? 's' : '') + ' remaining ' + label + '.');
        }
    },

    /**
     * Render a small usage badge for the paper generator setup screen.
     * Returns HTML string.
     */
    renderUsageBadge: function() {
        var result = this.checkPaperLimit();
        if (result.tier === undefined) {
            // Free user
            return '<div class="pg-usage-badge pg-usage-locked" style="margin:10px 0;padding:10px 14px;border-radius:10px;background:rgba(239,71,111,0.08);color:#ef476f;font-size:0.82rem;font-weight:600;text-align:center;">' +
                'Practice papers require a Student or Pro plan.' +
                '</div>';
        }
        var label = result.period === 'today' ? 'today' : 'this week';
        var color = result.remaining > 0 ? 'rgba(6,214,160,0.08)' : 'rgba(239,71,111,0.08)';
        var textColor = result.remaining > 0 ? '#06d6a0' : '#ef476f';
        return '<div class="pg-usage-badge" style="margin:10px 0;padding:10px 14px;border-radius:10px;background:' + color + ';color:' + textColor + ';font-size:0.82rem;font-weight:600;text-align:center;">' +
            result.remaining + ' of ' + result.limit + ' paper' + (result.limit !== 1 ? 's' : '') + ' remaining ' + label +
            (result.tier === 'student' ? ' (Student plan)' : ' (Pro plan)') +
            '</div>';
    },

    _showPaperLimitModal: function(msg, tier) {
        var overlay = document.getElementById('pg-limit-modal-overlay');
        if (overlay) overlay.remove();

        overlay = document.createElement('div');
        overlay.id = 'pg-limit-modal-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);backdrop-filter:blur(3px);';

        var upgradeBtn = tier === 'student'
            ? '<button id="pg-limit-upgrade-btn" style="padding:12px 28px;border-radius:12px;background:var(--primary,#4361ee);color:#fff;font-weight:700;font-size:0.95rem;border:none;cursor:pointer;">Upgrade to Pro</button>'
            : '';

        overlay.innerHTML =
            '<div style="background:var(--card,#fff);border-radius:20px;padding:32px 28px;max-width:420px;width:90%;text-align:center;box-shadow:0 12px 48px rgba(0,0,0,0.2);">' +
            '<div style="font-size:2.5rem;margin-bottom:8px;">&#128221;</div>' +
            '<h2 style="font-size:1.1rem;font-weight:800;margin-bottom:8px;">Paper limit reached</h2>' +
            '<p style="font-size:0.88rem;color:var(--text-light,#6c757d);line-height:1.6;margin-bottom:4px;">' + msg + '</p>' +
            '<div style="margin-top:20px;display:flex;flex-direction:column;gap:8px;">' +
            upgradeBtn +
            '<button id="pg-limit-dismiss-btn" style="background:none;border:none;font-size:0.82rem;color:var(--text-light,#6c757d);cursor:pointer;padding:8px;">OK</button>' +
            '</div></div>';
        document.body.appendChild(overlay);

        var upgBtn = overlay.querySelector('#pg-limit-upgrade-btn');
        if (upgBtn) {
            upgBtn.addEventListener('click', function() {
                overlay.remove();
                if (typeof showUpgradeModal === 'function') showUpgradeModal();
            });
        }
        overlay.querySelector('#pg-limit-dismiss-btn').addEventListener('click', function() { overlay.remove(); });
        overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
    },

    // === RECORD PAPER ACTIVITY (streak, XP, gems, practice history) ===

    recordPaperActivity: function(pg) {
        try {
            var answered = 0, awarded = 0, total = 0;
            for (var i = 0; i < pg.flatParts.length; i++) {
                total += pg.flatParts[i].part.marks || 1;
                if (pg.answers[i] !== null) answered++;
                awarded += (pg.marks[i] || 0);
            }

            // Practice history
            var prefix = (typeof STORAGE_PREFIX !== 'undefined' ? STORAGE_PREFIX : 'p56_') + 'paper';
            if (typeof savePracticeSession === 'function') {
                savePracticeSession(prefix, awarded, total);
            }

            // Daily streak
            if (typeof updateDailyStreak === 'function') {
                updateDailyStreak();
            }

            // XP: award for each answered question + bonus for completion
            if (typeof XP !== 'undefined' && XP.addXP) {
                XP.addXP(answered * (XP.RATES.question || 2), 'paper');
                XP.addXP(XP.RATES.correct || 5, 'paper-complete');
            }

            // Gems: award based on percentage score
            if (typeof addGems === 'function') {
                var pct = total > 0 ? awarded / total : 0;
                var gems = pct >= 0.9 ? 15 : pct >= 0.7 ? 10 : pct >= 0.5 ? 5 : 2;
                addGems(gems, 'paper');
            }

            // Sync
            if (typeof Auth !== 'undefined' && Auth.saveAndSync) Auth.saveAndSync();
        } catch (e) {}
    }
};
