/* ================================================================
   DASHBOARD BASE - Shared dashboard rendering logic
   ================================================================
   Usage (in a subject's dashboard.js):

   const DASHBOARD = DashboardBase.create({
       // REQUIRED: flat topic list (most subjects)
       topics: [
           { name: 'Mechanics', activities: [
               { prefix: 'mech', label: 'Mixed Practice' }
           ], lessonIds: ['mechanics-forces', 'mechanics-energy'] }
       ],

       // REQUIRED: prefix-to-label map for history + charts
       activityNames: {
           mech: 'Mechanics', waves: 'Waves'
       },

       // OPTIONAL - for subjects with standard/extended split (maths):
       // standardTopics: [...],
       // extendedTopics: [...],

       // OPTIONAL - storage prefix (default: uses global STORAGE_PREFIX)
       // storagePrefix: 'physics_',

       // OPTIONAL - override the empty-value placeholder (default: '\u2014')
       // emptyValue: '-',

       // OPTIONAL - whether to show topic progress summary (default: true)
       // showTopicProgress: true,

       // OPTIONAL - whether to show achievements gallery (default: false)
       // showAchievements: false
   });
   ================================================================ */
const DashboardBase = {

    /* ----------------------------------------------------------
       Factory - creates a DASHBOARD object from config
       ---------------------------------------------------------- */
    create(cfg) {
        const dash = Object.create(DashboardBase._proto);
        dash._cfg = cfg;
        dash._activityNames = cfg.activityNames || {};

        // Support two layouts:
        // 1) Standard/Extended split (maths) - uses cfg.standardTopics + cfg.extendedTopics
        // 2) Flat topic list (everything else) - uses cfg.topics
        if (cfg.standardTopics && cfg.extendedTopics) {
            dash._standardTopics = cfg.standardTopics;
            dash._extendedTopics = cfg.extendedTopics;
            dash._allTopics = cfg.standardTopics.concat(cfg.extendedTopics);
            dash._splitLayout = true;
        } else {
            dash._allTopics = cfg.topics || [];
            dash._splitLayout = false;
        }

        return dash;
    },

    /* ----------------------------------------------------------
       Prototype - shared methods for every dashboard instance
       ---------------------------------------------------------- */
    _proto: {

        /* ---- Public: topics getter (for external access) ---- */
        get topics() {
            return this._allTopics;
        },

        /* ---- Main render ---- */
        render() {
            var stats = getAllActivityStats();
            var prefix = this._storagePrefix();
            var lp = JSON.parse(localStorage.getItem(prefix + 'lessonProgress') || '{}');

            var totalQ = 0, totalCorrect = 0, bestStreak = 0, lessonsComplete = 0;
            var allLessonIds = [];

            this._allTopics.forEach(function(t) {
                t.activities.forEach(function(tr) {
                    var s = stats[tr.prefix];
                    if (s) {
                        totalQ += s.total || 0;
                        totalCorrect += s.score || 0;
                        if ((s.bestStreak || 0) > bestStreak) bestStreak = s.bestStreak;
                        if ((s.streak || 0) > bestStreak) bestStreak = s.streak;
                    }
                });
                t.lessonIds.forEach(function(id) {
                    allLessonIds.push(id);
                    if (lp[id]) lessonsComplete++;
                });
            });

            var accuracy = totalQ > 0 ? Math.round(totalCorrect / totalQ * 100) : 0;
            var ds = getDailyStreak();
            var empty = this._emptyVal();

            var gems = typeof getGems === 'function' ? getGems() : { balance: 0 };
            var h = '<div class="dash-overview">';
            h += this._statCard('Gems', gems.balance, '#a855f7');
            h += this._statCard('Day Streak', ds.current || 0, '#ffc107');
            h += this._statCard('Questions', totalQ, 'var(--primary)');
            h += this._statCard('Accuracy', totalQ > 0 ? accuracy + '%' : empty, 'var(--success)');
            h += this._statCard('Lessons', lessonsComplete + ' / ' + allLessonIds.length, 'var(--primary)');
            h += '</div>';

            // Render topic sections based on layout type
            if (this._splitLayout) {
                // Maths-style: Standard / Extended groups with section headers
                h += '<div class="dash-section-header standard">MYP Standard</div>';
                h += this._renderTopicGroup(this._standardTopics, stats, lp);
                h += '<div class="dash-section-header extended">MYP Extended</div>';
                h += this._renderTopicGroup(this._extendedTopics, stats, lp);
            } else {
                // All other subjects: topic progress summary + flat list
                if (this._cfg.showTopicProgress !== false) {
                    h += this._renderTopicProgress(stats, lp);
                }
                h += this._renderTopicList(stats, lp);
            }

            // Recent Activity (Practice History)
            h += this._renderHistory();

            // Review queue
            h += REVIEW_QUEUE.renderSection(this._activityNames);

            // Charts
            h += DASH_CHARTS.renderChartSection();
            h += DASH_CHARTS.renderTracklist(this._activityNames);

            // Achievements gallery (opt-in)
            if (this._cfg.showAchievements && typeof ACHIEVEMENTS !== 'undefined') {
                h += ACHIEVEMENTS.renderGallery();
            }

            document.getElementById('dash-content').innerHTML = h;
            DASH_CHARTS.initChart();
            REVIEW_QUEUE.init();
        },

        /* ---- Topic group renderer (for split layout - maths) ---- */
        _renderTopicGroup(topics, stats, lp) {
            var self = this;
            var out = '';
            topics.forEach(function(t) {
                var lessonsDone = t.lessonIds.filter(function(id) { return lp[id]; }).length;
                out += '<div class="dash-topic">';
                out += '<div class="dash-topic-header">' + t.name;
                if (t.lessonIds.length > 0) {
                    out += ' <span class="dash-lesson-count">' + lessonsDone + '/' + t.lessonIds.length + ' lessons</span>';
                }
                out += '</div>';
                t.activities.forEach(function(tr) {
                    var s = stats[tr.prefix];
                    var total = s ? (s.total || 0) : 0;
                    var score = s ? (s.score || 0) : 0;
                    var pct = total > 0 ? Math.round(score / total * 100) : 0;
                    out += '<div class="dash-row">';
                    out += '<span class="dash-row-label">' + tr.label + '</span>';
                    out += '<div class="dash-row-bar"><div class="dash-row-fill" style="width:' + pct + '%;background:' + self._barColor(pct) + '"></div></div>';
                    out += '<span class="dash-row-stat">' + score + '/' + total + '</span>';
                    if (total > 0) out += '<span class="dash-row-pct">' + pct + '%</span>';
                    else out += '<span class="dash-row-pct">' + self._emptyVal() + '</span>';
                    out += '</div>';
                });
                out += '</div>';
            });
            return out;
        },

        /* ---- Flat topic list renderer (physics, chem, bio, etc.) ---- */
        _renderTopicList(stats, lp) {
            var self = this;
            var h = '';
            this._allTopics.forEach(function(t) {
                var lessonsDone = t.lessonIds.filter(function(id) { return lp[id]; }).length;
                h += '<div class="dash-topic">';
                h += '<div class="dash-topic-header">' + t.name;
                if (t.lessonIds.length > 0) {
                    h += ' <span class="dash-lesson-count">' + lessonsDone + '/' + t.lessonIds.length + ' lessons</span>';
                }
                h += '</div>';

                t.activities.forEach(function(tr) {
                    var s = stats[tr.prefix];
                    var total = s ? (s.total || 0) : 0;
                    var score = s ? (s.score || 0) : 0;
                    var pct = total > 0 ? Math.round(score / total * 100) : 0;

                    h += '<div class="dash-row">';
                    h += '<span class="dash-row-label">' + tr.label + '</span>';
                    h += '<div class="dash-row-bar"><div class="dash-row-fill" style="width:' + pct + '%;background:' + self._barColor(pct) + '"></div></div>';
                    h += '<span class="dash-row-stat">' + score + '/' + total + '</span>';
                    if (total > 0) h += '<span class="dash-row-pct">' + pct + '%</span>';
                    else h += '<span class="dash-row-pct">' + self._emptyVal() + '</span>';
                    h += '</div>';
                });

                h += '</div>';
            });
            return h;
        },

        /* ---- Topic progress summary (mastery badges) ---- */
        _renderTopicProgress(stats, lp) {
            var self = this;
            var empty = this._emptyVal();
            var h = '<div class="tp-section">';
            h += '<div class="tp-section-header">Topic Progress</div>';
            this._allTopics.forEach(function(t) {
                var tTotal = 0, tScore = 0;
                t.activities.forEach(function(tr) {
                    var s = stats[tr.prefix];
                    if (s) { tTotal += s.total || 0; tScore += s.score || 0; }
                });
                var pct = tTotal > 0 ? Math.round(tScore / tTotal * 100) : 0;
                var mastery, mClass, barClass;
                if (tTotal === 0) { mastery = 'Not Started'; mClass = 'tp-not-started'; barClass = 'tp-grey'; }
                else if (pct >= 80) { mastery = 'Master'; mClass = 'tp-master'; barClass = 'tp-green'; }
                else if (pct >= 50) { mastery = 'Proficient'; mClass = 'tp-proficient'; barClass = 'tp-yellow'; }
                else { mastery = 'Learning'; mClass = 'tp-learning'; barClass = 'tp-red'; }

                h += '<div class="tp-row">';
                h += '<span class="tp-label">' + t.name + '</span>';
                h += '<div class="tp-bar"><div class="tp-bar-fill ' + barClass + '" style="width:' + (tTotal > 0 ? pct : 0) + '%"></div></div>';
                h += '<div class="tp-stats">';
                h += '<span class="tp-questions">' + tTotal + ' Q</span>';
                h += '<span class="tp-accuracy">' + (tTotal > 0 ? pct + '%' : empty) + '</span>';
                h += '<span class="tp-mastery ' + mClass + '">' + mastery + '</span>';
                h += '</div></div>';
            });
            h += '</div>';
            return h;
        },

        /* ---- Recent activity / practice history ---- */
        _renderHistory() {
            try {
                var prefix = this._storagePrefix();
                var hist = JSON.parse(localStorage.getItem(prefix + 'practiceHistory') || '[]');
                if (hist.length === 0) return '';
                var recent = hist.slice(-10).reverse();
                var self = this;
                var empty = this._emptyVal();
                var h = '<div class="dash-topic" style="margin-top:8px;">';
                h += '<div class="dash-topic-header">Recent Activity</div>';
                recent.forEach(function(entry) {
                    var name = self._activityNames[entry.prefix] || entry.prefix;
                    var d = new Date(entry.date);
                    var dateStr = d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
                    var pct = entry.total > 0 ? Math.round(entry.score / entry.total * 100) + '%' : empty;
                    h += '<div class="hist-row">';
                    h += '<span class="hist-name">' + name + '</span>';
                    h += '<span class="hist-date">' + dateStr + '</span>';
                    h += '<span class="hist-score">' + entry.score + '/' + entry.total + '</span>';
                    h += '<span class="hist-pct">' + pct + '</span>';
                    h += '</div>';
                });
                h += '</div>';
                return h;
            } catch (e) { return ''; }
        },

        /* ---- Stat card ---- */
        _statCard(label, value, color) {
            return '<div class="dash-stat"><div class="dash-stat-value" style="color:' + color + '">' + value + '</div><div class="dash-stat-label">' + label + '</div></div>';
        },

        /* ---- Bar color thresholds ---- */
        _barColor(pct) {
            if (pct >= 80) return 'var(--success)';
            if (pct >= 50) return 'var(--primary)';
            if (pct >= 25) return '#ffc107';
            return 'var(--error)';
        },

        /* ---- Helpers ---- */
        _storagePrefix() {
            // Maths uses bare keys (no prefix), others use STORAGE_PREFIX
            if (this._cfg.storagePrefix === '') return '';
            if (this._cfg.storagePrefix) return this._cfg.storagePrefix;
            return (typeof STORAGE_PREFIX !== 'undefined') ? STORAGE_PREFIX : '';
        },

        _emptyVal() {
            return this._cfg.emptyValue || '\u2014';
        }
    },

    /* ----------------------------------------------------------
       Shorthand init - creates and assigns to window.DASHBOARD
       ---------------------------------------------------------- */
    init(cfg) {
        window.DASHBOARD = DashboardBase.create(cfg);
        return window.DASHBOARD;
    }
};
