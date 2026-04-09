/* ================================================================
   FIREBASE REMOTE CONFIG - shared across all pages
   ================================================================
   Usage:
     await P56_RC.ready;
     var val = P56_RC.get('key');           // string
     var b   = P56_RC.getBool('key');       // boolean
     var n   = P56_RC.getNum('key');        // number
     var obj = P56_RC.getJSON('key');       // parsed JSON
     var all = P56_RC.getAll();             // all params
   ================================================================ */
(function() {
    'use strict';

    // ── Defaults (used if fetch fails or offline) ──
    var DEFAULTS = {
        // Feature flags
        show_ads: true,
        show_leaderboard: true,
        show_forum_link: true,
        show_parent_link: true,
        show_classroom_link: true,
        premium_enabled: true,

        // Ad placement
        ad_frequency: 3,                    // show ad every N trainer completions
        ad_banner_hub: true,                // show banner on hub page
        ad_banner_subjects: true,           // show banner on subject pages

        // UI experiments
        hub_layout: 'grid',                 // 'grid' or 'list'
        subject_card_style: 'default',      // 'default', 'compact', 'detailed'
        show_streak_animation: true,
        show_daily_goal_prompt: true,

        // Content
        announcement_text: '',              // top-of-page banner text (empty = hidden)
        announcement_url: '',               // optional link for announcement
        maintenance_mode: false,            // show maintenance banner

        // Engagement
        min_questions_for_leaderboard: 0,   // gate leaderboard behind N questions
        show_study_tips: true,
        tip_rotation_seconds: 8,

        // Limits
        max_free_papers_per_day: 5,         // test generator daily limit
        max_free_questions_per_day: 0       // 0 = unlimited
    };

    var rc = null;
    var _ready;
    var _resolveReady;

    _ready = new Promise(function(resolve) { _resolveReady = resolve; });

    function init() {
        if (typeof firebase === 'undefined' || !firebase.remoteConfig) {
            console.warn('Remote Config SDK not loaded - using defaults');
            _resolveReady();
            return;
        }

        try {
            rc = firebase.remoteConfig();

            // Cache settings: fetch at most every 12 hours in prod, 1 min in dev
            var isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
            rc.settings.minimumFetchIntervalMillis = isDev ? 60000 : 43200000;

            rc.defaultConfig = DEFAULTS;

            rc.fetchAndActivate().then(function() {
                _resolveReady();
            }).catch(function(err) {
                console.warn('Remote Config: fetch failed, using defaults -', err.message);
                _resolveReady();
            });
        } catch (e) {
            console.warn('Remote Config: init error -', e.message);
            _resolveReady();
        }
    }

    function get(key) {
        if (rc) {
            try { return rc.getValue(key).asString(); } catch (e) {}
        }
        var d = DEFAULTS[key];
        return d !== undefined ? String(d) : '';
    }

    function getBool(key) {
        if (rc) {
            try { return rc.getValue(key).asBoolean(); } catch (e) {}
        }
        return !!DEFAULTS[key];
    }

    function getNum(key) {
        if (rc) {
            try { return rc.getValue(key).asNumber(); } catch (e) {}
        }
        var d = DEFAULTS[key];
        return typeof d === 'number' ? d : 0;
    }

    function getJSON(key) {
        try {
            return JSON.parse(get(key));
        } catch (e) {
            return null;
        }
    }

    function getAll() {
        if (rc) {
            try { return rc.getAll(); } catch (e) {}
        }
        return {};
    }

    // Expose globally
    window.P56_RC = {
        ready: _ready,
        get: get,
        getBool: getBool,
        getNum: getNum,
        getJSON: getJSON,
        getAll: getAll,
        DEFAULTS: DEFAULTS
    };

    // Init when DOM is ready (Firebase SDK should be loaded by then)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
