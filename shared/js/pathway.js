/* ================================================================
   PATHWAY - Shared guided learning path with flowchart + completion %
   Works across all subjects. Call Pathway.init(lessonsMap, topicsConfig)
   ================================================================ */
const Pathway = {
    // Mastery thresholds - both must be met
    LESSON_THRESHOLD: 80,
    ACCURACY_THRESHOLD: 80,
    // Minimum questions answered before accuracy counts
    MIN_QUESTIONS: 5,

    // Set by init() per subject
    topics: [],
    _lessonsMap: {},

    // Get all lesson IDs in pathway order
    allLessons() {
        var all = [];
        this.topics.forEach(function(t) { all = all.concat(t.lessons); });
        return all;
    },

    // Get activity accuracy for a topic prefix
    _activityAccuracy(prefix) {
        if (typeof getAllActivityStats !== 'function') return { score: 0, total: 0, pct: 0 };
        var all = getAllActivityStats();
        var s = all[prefix];
        if (!s || !s.total) return { score: 0, total: 0, pct: 0 };
        return { score: s.score || 0, total: s.total, pct: Math.round((s.score / s.total) * 100) };
    },

    // Mastered = 80% lessons done AND 80% activity accuracy
    topicProgress(topicId) {
        var topic = this.topics.find(function(t) { return t.id === topicId; });
        if (!topic) return { done: 0, total: 0, pct: 0, lessonPct: 0, accuracyPct: 0, mastered: false };
        var done = 0;
        topic.lessons.forEach(function(lid) {
            if (LessonEngine.isComplete(lid)) done++;
        });
        var lessonPct = topic.lessons.length ? Math.round(done / topic.lessons.length * 100) : 0;
        var acc = this._activityAccuracy(topic.activityPrefix);
        var hasEnoughQuestions = acc.total >= this.MIN_QUESTIONS;
        var accuracyPct = hasEnoughQuestions ? acc.pct : 0;
        var displayPct = hasEnoughQuestions ? Math.round((lessonPct + accuracyPct) / 2) : lessonPct;
        var lessonsMet = lessonPct >= this.LESSON_THRESHOLD;
        var accuracyMet = hasEnoughQuestions && accuracyPct >= this.ACCURACY_THRESHOLD;
        return {
            done: done, total: topic.lessons.length,
            pct: displayPct, lessonPct: lessonPct,
            accuracyPct: accuracyPct, accuracyRaw: acc.pct,
            questionsAnswered: acc.total, hasEnoughQuestions: hasEnoughQuestions,
            mastered: lessonsMet && accuracyMet,
            lessonsMet: lessonsMet, accuracyMet: accuracyMet
        };
    },

    overallProgress() {
        var self = this;
        var totalPct = 0;
        var topicsMastered = 0;
        this.topics.forEach(function(t) {
            var p = self.topicProgress(t.id);
            totalPct += p.pct;
            if (p.mastered) topicsMastered++;
        });
        var avgPct = this.topics.length ? Math.round(totalPct / this.topics.length) : 0;
        var all = this.allLessons();
        var done = 0;
        all.forEach(function(lid) { if (LessonEngine.isComplete(lid)) done++; });
        return {
            done: done, total: all.length, pct: avgPct,
            topicsMastered: topicsMastered, totalTopics: this.topics.length,
            mastered: topicsMastered === this.topics.length
        };
    },

    nextLesson() {
        var all = this.allLessons();
        for (var i = 0; i < all.length; i++) {
            if (!LessonEngine.isComplete(all[i])) return all[i];
        }
        return null;
    },

    nextLessonAfter(lessonId) {
        var all = this.allLessons();
        var idx = all.indexOf(lessonId);
        if (idx < 0 || idx >= all.length - 1) return null;
        return all[idx + 1];
    },

    // Returns the lesson id for the most recently touched activity, if that lesson
    // is (a) in the pathway and (b) not already complete. Requires _lessonPrefixMap
    // (prefix -> lesson id) to be set by the host page.
    _recentLesson() {
        if (!this._lessonPrefixMap) return null;
        if (typeof getAllActivityStats !== 'function') return null;
        var stats = getAllActivityStats();
        var pathwayLessons = this.allLessons();
        var best = null, bestTs = 0;
        for (var prefix in stats) {
            var s = stats[prefix];
            if (!s || !s.lastTs || s.lastTs <= bestTs) continue;
            var lid = this._lessonPrefixMap[prefix];
            if (!lid || pathwayLessons.indexOf(lid) < 0) continue;
            if (LessonEngine.isComplete(lid)) continue;
            bestTs = s.lastTs;
            best = lid;
        }
        return best;
    },

    _lessonTitle(lessonId, lessonsMap) {
        var l = (lessonsMap || this._lessonsMap)[lessonId];
        return l ? l.title : lessonId;
    },

    updateHubProgress() {
        var self = this;
        this.topics.forEach(function(topic) {
            var card = document.querySelector('[data-topic="' + topic.id + '"]');
            if (!card) return;
            var prog = self.topicProgress(topic.id);
            // Ring shows accuracy (not completion)
            var ringPct = prog.hasEnoughQuestions ? prog.accuracyRaw : 0;
            var ring = card.querySelector('.pathway-ring');
            if (!ring) {
                ring = document.createElement('div');
                ring.className = 'pathway-ring';
                card.appendChild(ring);
            }
            var circumference = 2 * Math.PI * 18;
            var offset = circumference - (Math.min(ringPct, 100) / 100) * circumference;
            var color = ringPct >= 90 ? 'var(--success)' : ringPct >= 75 ? 'var(--primary)' : ringPct > 0 ? '#f59e0b' : 'rgba(0,0,0,0.08)';
            ring.innerHTML = '<svg viewBox="0 0 44 44" width="44" height="44">' +
                '<circle cx="22" cy="22" r="18" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="3"/>' +
                '<circle cx="22" cy="22" r="18" fill="none" stroke="' + color + '" stroke-width="3" ' +
                'stroke-dasharray="' + circumference.toFixed(1) + '" stroke-dashoffset="' + offset.toFixed(1) + '" ' +
                'stroke-linecap="round" transform="rotate(-90 22 22)" style="transition:stroke-dashoffset 0.6s ease"/>' +
                '</svg>' +
                '<span class="pathway-ring-pct">' + (ringPct > 0 ? ringPct + '%' : '-') + '</span>';
            // Completion tag
            var allLessonsDone = prog.lessonPct >= 100;
            var hasActivity = prog.questionsAnswered > 0;
            var tag = card.querySelector('.pathway-completion-tag');
            if (!tag) {
                tag = document.createElement('span');
                tag.className = 'pathway-completion-tag';
                card.appendChild(tag);
            }
            if (allLessonsDone && hasActivity) {
                tag.textContent = 'Completed';
                tag.classList.add('done');
                tag.classList.remove('not-done');
            } else if (allLessonsDone) {
                tag.textContent = 'Lessons done';
                tag.classList.add('done');
                tag.classList.remove('not-done');
            } else if (prog.done > 0 || hasActivity) {
                tag.textContent = 'In progress';
                tag.classList.add('not-done');
                tag.classList.remove('done');
            } else {
                tag.textContent = 'Not started';
                tag.classList.add('not-done');
                tag.classList.remove('done');
            }
        });
    },

    updateContinueBtn(lessonsMap) {
        var container = document.getElementById('pathway-continue');
        if (!container) return;
        var overall = this.overallProgress();
        var recentId = this._recentLesson();
        var nextId = recentId || this.nextLesson();
        var label = recentId ? 'Continue where you left off' : 'Continue Learning';
        if (!nextId) {
            container.innerHTML = '<div class="pathway-continue-card pathway-complete">' +
                '<div class="pathway-continue-icon">\u2728</div>' +
                '<div class="pathway-continue-info">' +
                '<div class="pathway-continue-label">All lessons complete!</div>' +
                '<div class="pathway-continue-sub">You\'ve finished every lesson. Try the activities to keep practising.</div>' +
                '</div></div>';
            return;
        }
        var lm = lessonsMap || this._lessonsMap;
        var title = this._lessonTitle(nextId, lm);
        var topicName = '';
        this.topics.forEach(function(t) {
            if (t.lessons.indexOf(nextId) >= 0) topicName = t.name;
        });
        container.innerHTML = '<div class="pathway-continue-card" onclick="Pathway._startLesson(\'' + nextId + '\')" style="cursor:pointer">' +
            '<div class="pathway-continue-icon">\u25B6\uFE0F</div>' +
            '<div class="pathway-continue-info">' +
            '<div class="pathway-continue-label">' + label + '</div>' +
            '<div class="pathway-continue-name">' + title + '</div>' +
            '<div class="pathway-continue-sub">' + topicName + ' \u2022 ' + overall.done + '/' + overall.total + ' lessons done</div>' +
            '</div>' +
            '<div class="pathway-continue-arrow">\u2192</div>' +
            '</div>';
    },

    _startLesson(lessonId) {
        var card = document.querySelector('[data-lesson="' + lessonId + '"]');
        if (card) { card.click(); return; }
        if (this._lessonsMap && this._lessonsMap[lessonId]) {
            LessonEngine.start(this._lessonsMap[lessonId]);
        }
    },

    renderFlowchart(lessonsMap) {
        var self = this;
        var lm = lessonsMap || this._lessonsMap;
        var overall = this.overallProgress();
        var h = '';

        h += '<div class="pw-overall">';
        h += '<div class="pw-overall-ring">';
        var circ = 2 * Math.PI * 54;
        var off = circ - (overall.pct / 100) * circ;
        var col = overall.mastered ? 'var(--success)' : 'var(--primary)';
        h += '<svg viewBox="0 0 120 120" width="120" height="120">' +
            '<circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="6"/>' +
            '<circle cx="60" cy="60" r="54" fill="none" stroke="' + col + '" stroke-width="6" ' +
            'stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" ' +
            'stroke-linecap="round" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset 0.8s ease"/>' +
            '</svg>';
        h += '<span class="pw-overall-pct">' + overall.pct + '%</span>';
        h += '</div>';
        h += '<div class="pw-overall-text">' + overall.done + '/' + overall.total + ' lessons \u2022 ' + overall.topicsMastered + '/' + overall.totalTopics + ' topics mastered</div>' +
            '<div class="pw-overall-sub">Mastery = 80% lessons completed + 80% activity accuracy</div>';
        h += '</div>';

        h += '<div class="pw-flowchart">';
        var foundNext = false;
        self.topics.forEach(function(topic, ti) {
            var prog = self.topicProgress(topic.id);
            var topicDone = prog.mastered;
            var topicClass = topicDone ? 'pw-topic done' : 'pw-topic';

            h += '<div class="' + topicClass + '">';
            h += '<div class="pw-topic-header">';
            h += '<div class="pw-topic-icon">' + topic.icon + '</div>';
            h += '<div class="pw-topic-info">';
            h += '<div class="pw-topic-name">' + topic.name + '</div>';
            h += '<div class="pw-topic-stat">' + prog.done + '/' + prog.total + ' lessons' +
                (prog.hasEnoughQuestions ? ' \u2022 ' + prog.accuracyRaw + '% accuracy' : '') + '</div>';
            if (topicDone) h += '<div class="pw-topic-mastered">Mastered</div>';
            h += '</div>';
            h += '<div class="pw-topic-bar"><div class="pw-topic-bar-fill" style="width:' + prog.pct + '%"></div></div>';
            h += '</div>';

            h += '<div class="pw-lessons">';
            topic.lessons.forEach(function(lid, li) {
                var done = LessonEngine.isComplete(lid);
                var isNext = !done && !foundNext;
                if (isNext) foundNext = true;
                var nodeClass = 'pw-node';
                if (done) nodeClass += ' done';
                else if (isNext) nodeClass += ' next';
                else nodeClass += ' locked';

                var title = self._lessonTitle(lid, lm);
                h += '<div class="pw-node-row">';
                if (li > 0 || ti > 0) {
                    h += '<div class="pw-connector' + (done ? ' done' : '') + '"></div>';
                }
                h += '<div class="' + nodeClass + '" onclick="Pathway._startLesson(\'' + lid + '\')">';
                h += '<div class="pw-node-dot">';
                if (done) h += '<svg viewBox="0 0 16 16" width="16" height="16"><path d="M3 8l3 3 7-7" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                else if (isNext) h += '<span class="pw-node-play">\u25B6</span>';
                else h += '<span class="pw-node-num">' + (li + 1) + '</span>';
                h += '</div>';
                h += '<div class="pw-node-label">' + title + '</div>';
                if (isNext) h += '<div class="pw-node-badge">Up next</div>';
                h += '</div>';
                h += '</div>';
            });

            // Activity node
            h += '<div class="pw-node-row">';
            h += '<div class="pw-connector' + (topicDone ? ' done' : '') + '"></div>';
            var actClass = topicDone ? 'pw-node pw-activity done' : 'pw-node pw-activity';
            h += '<div class="' + actClass + '" onclick="showView(\'' + topic.activity + '\')">';
            h += '<div class="pw-node-dot activity">\u270F\uFE0F</div>';
            var accInfo = self._activityAccuracy(topic.activityPrefix);
            var actLabel = 'Practice Activity';
            if (accInfo.total > 0) actLabel += ' \u2022 ' + accInfo.pct + '% (' + accInfo.score + '/' + accInfo.total + ')';
            if (accInfo.total > 0 && accInfo.total < self.MIN_QUESTIONS) actLabel += ' \u2022 ' + (self.MIN_QUESTIONS - accInfo.total) + ' more needed';
            h += '<div class="pw-node-label">' + actLabel + '</div>';
            h += '</div>';
            h += '</div>';

            h += '</div>'; // pw-lessons

            if (ti < self.topics.length - 1) {
                h += '<div class="pw-topic-connector' + (topicDone ? ' done' : '') + '"></div>';
            }

            h += '</div>'; // pw-topic
        });
        h += '</div>';

        var container = document.getElementById('pathway-content');
        if (container) container.innerHTML = h;
    },

    // Initialize - pass LESSONS map + topics config array
    _isProTier() {
        try {
            if (typeof Premium !== 'undefined') return Premium.getTier() === 'pro' || Premium._role === 'owner' || Premium._role === 'admin' || Premium._role === 'Developer';
            var role = localStorage.getItem('roleCache');
            if (role === 'owner' || role === 'admin' || role === 'Developer') return true;
            var s = JSON.parse(localStorage.getItem('premiumCache'));
            if (s && s.active) { var p = s.plan || 'student'; return p === 'standard' || p === 'pro'; }
            var sl = JSON.parse(localStorage.getItem('schoolLicenseCache'));
            if (sl && sl.active && sl.tier === 'school_pro') return true;
        } catch(e) {}
        return false;
    },

    init(lessonsMap, topicsConfig) {
        if (topicsConfig) this.topics = topicsConfig;
        this._lessonsMap = lessonsMap || {};
        this.updateHubProgress();
        this.updateContinueBtn();
        this.renderFlowchart();
    },

    // Refresh all views (call after navigation back to hub)
    refresh() {
        this.updateHubProgress();
        this.updateContinueBtn();
        this.renderFlowchart();
    }
};
