/* ================================================================
   SHARED AUTH + CLOUD SYNC BASE
   Extracted from 15 per-subject auth.js files (2026-04-05)

   Usage:
     1. Define AUTH_CONFIG before loading this file:
        <script>
        var AUTH_CONFIG = {
            cloudKey: 'physics',           // Firestore doc sub-object key
            leaderboardSubject: 'physics', // Leaderboard.push() subject key
            allLessons: ['mech-forces','mech-energy',...],
            extraLocalKeys: [],            // e.g. ['portfolio'] for arts
            onAuthReady: function() {},    // called after pullFromCloud
            cloudKeyAliases: [],           // fallback keys e.g. ['geography'] for inthumanities
        };
        </script>
        <script defer src="../shared/js/auth-base.js"></script>

     2. Maths: load this base, then load maths/js/auth-ext.js which
        extends Auth with maths-specific methods.

     3. The global Auth object is backwards-compatible with all
        existing call sites (Auth.init, Auth.signIn, Auth.signOut,
        Auth.saveAndSync, Auth.user, Auth.db, Auth._ready, etc.)
   ================================================================ */

(function() {
    'use strict';

    // Read config (must be set before this script loads)
    var cfg = (typeof AUTH_CONFIG !== 'undefined') ? AUTH_CONFIG : {};
    var cloudKey = cfg.cloudKey || '';
    var leaderboardSubject = cfg.leaderboardSubject || cloudKey;
    var allLessons = cfg.allLessons || [];
    var extraLocalKeys = cfg.extraLocalKeys || [];
    var onAuthReady = cfg.onAuthReady || null;
    var cloudKeyAliases = cfg.cloudKeyAliases || [];
    // STORAGE_PREFIX should be defined before this file loads (via activity-utils.js or inline)
    // localPrefix overrides STORAGE_PREFIX for subjects with non-standard key patterns (e.g. French, Hindi)
    var prefix = cfg.localPrefix !== undefined ? cfg.localPrefix : ((typeof STORAGE_PREFIX !== 'undefined') ? STORAGE_PREFIX : '');

    window.Auth = {
        user: null,
        db: null,
        _ready: false,

        init: function() {
            if (!FIREBASE_CONFIG || FIREBASE_CONFIG.apiKey === 'PASTE_YOUR_API_KEY') {
                this._ready = true;
                return;
            }
            firebase.initializeApp(FIREBASE_CONFIG);
            // App Check - enable debug token on localhost
            if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                // self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
            }
            // firebase.appCheck().activate(new firebase.appCheck.ReCaptchaEnterpriseProvider('6Leb9ocsAAAAABpvg7Ivd1W7XjzVjpjfwC8bpPYx'), true);
            this.db = firebase.firestore();

            // Flush pending data on page hide (prevents lost pushes on navigation)
            this._initUnloadFlush();

            // Listen for auth state
            var self = this;
            firebase.auth().onAuthStateChanged(function(user) {
                self.user = user;
                self._ready = true;
                self.updateUI();
                if (user) {
                    self.pullFromCloud().then(function() {
                        if (typeof onAuthReady === 'function') onAuthReady();
                    });
                }
            });
        },

        // -- Sign in / out --
        signIn: function() {
            if (!this.db) return;
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
                    var fn = firebase.functions().httpsCallable('onUserCreated');
                    fn().catch(function(e) { console.error('Welcome email error:', e.message); });
                }
            }).catch(function(e) { console.error('Sign-in failed:', e.message); });
        },

        signOut: function() {
            if (!this.db) return;
            // Cancel any pending sync so cleared bg doesn't overwrite cloud
            clearTimeout(this._syncTimer);
            // Clear personal bg before reload
            localStorage.removeItem('customBg');
            localStorage.removeItem('customBgColor');
            localStorage.removeItem('customBgOpacity');
            localStorage.removeItem('premiumCache');
            if (typeof Premium !== 'undefined') Premium.init(null);
            firebase.auth().signOut().then(function() { location.reload(); }).catch(function() { location.reload(); });
        },

        // -- UI (XSS-safe: uses textContent + createElement instead of innerHTML) --
        updateUI: function() {
            var btn = document.getElementById('auth-btn');
            var info = document.getElementById('auth-info');
            if (!btn) return;

            if (this.user) {
                if (typeof AuthGate !== 'undefined') AuthGate.dismiss();
                var name = this.user.displayName || this.user.email || 'User';
                var photo = this.user.photoURL;

                // Clear previous content safely
                info.textContent = '';

                if (photo && /^https?:\/\//.test(photo)) {
                    var img = document.createElement('img');
                    img.src = photo;
                    img.alt = '';
                    img.className = 'auth-avatar';
                    info.appendChild(img);
                }

                var span = document.createElement('span');
                span.className = 'auth-name';
                span.textContent = name.split(' ')[0];
                info.appendChild(span);

                btn.textContent = 'Sign out';
                btn.onclick = function() { Auth.signOut(); };
            } else {
                info.textContent = '';
                btn.textContent = 'Sign in';
                btn.onclick = function() { Auth.signIn(); };
            }
        },

        // -- Cloud sync --
        _docRef: function() {
            if (!this.db || !this.user) return null;
            return this.db.collection('users').doc(this.user.uid);
        },

        // Pull cloud data -> merge into localStorage
        pullFromCloud: function() {
            var ref = this._docRef();
            if (!ref) return Promise.resolve();
            var self = this;
            return ref.get().then(function(doc) {
                if (doc.exists) {
                    var cloud = doc.data();

                    // Subject-specific data from cloud sub-object
                    var p = cloud[cloudKey] || {};
                    // Check aliases (e.g. inthumanities also checks 'geography')
                    if (!cloud[cloudKey] && cloudKeyAliases.length) {
                        for (var i = 0; i < cloudKeyAliases.length; i++) {
                            if (cloud[cloudKeyAliases[i]]) {
                                p = cloud[cloudKeyAliases[i]];
                                break;
                            }
                        }
                    }

                    // Activity stats (backward compat: read activityStats or trainerStats)
                    if (p.activityStats || p.trainerStats) {
                        localStorage.setItem(prefix + 'activityStats', JSON.stringify(p.activityStats || p.trainerStats));
                    }
                    // Lesson progress
                    if (p.lessonProgress) {
                        localStorage.setItem(prefix + 'lessonProgress', JSON.stringify(p.lessonProgress));
                    }
                    // Daily streak (global, unprefixed)
                    if (cloud.dailyStreak) {
                        if (typeof mergeCloudStreak === 'function') {
                            mergeCloudStreak(cloud.dailyStreak, cloud.streakServerTs);
                        } else {
                            localStorage.setItem('dailyStreak', JSON.stringify(cloud.dailyStreak));
                        }
                        if (typeof updateDailyStreakUI === 'function') updateDailyStreakUI();
                    }
                    // Timed challenges
                    if (p.timedChallenges) {
                        localStorage.setItem(prefix + 'timedChallenges', JSON.stringify(p.timedChallenges));
                    }
                    // Wrong answers (spaced repetition)
                    if (p.wrongAnswers) {
                        localStorage.setItem(prefix + 'wrongAnswers', JSON.stringify(p.wrongAnswers));
                    }
                    // Practice history
                    if (p.practiceHistory) {
                        localStorage.setItem(prefix + 'practiceHistory', JSON.stringify(p.practiceHistory));
                    }
                    // Extra subject-specific keys (e.g. portfolio for arts)
                    for (var j = 0; j < extraLocalKeys.length; j++) {
                        var ek = extraLocalKeys[j];
                        if (p[ek]) {
                            localStorage.setItem(prefix + ek, JSON.stringify(p[ek]));
                        }
                    }
                    // Bookmarks (global)
                    if (cloud.bookmarks) {
                        localStorage.setItem('bookmarks', JSON.stringify(cloud.bookmarks));
                    }
                    // Gems (global, unprefixed)
                    if (cloud.gems) {
                        localStorage.setItem('gems', JSON.stringify(cloud.gems));
                        updateGemsUI();
                    }
                    // Streak freezes (global, unprefixed)
                    if (cloud.streakFreezes) {
                        if (typeof mergeCloudFreezes === 'function') {
                            mergeCloudFreezes(cloud.streakFreezes);
                        } else {
                            localStorage.setItem('streakFreezes', JSON.stringify(cloud.streakFreezes));
                        }
                        if (typeof updateFreezeUI === 'function') updateFreezeUI();
                    }
                    // XP data (global)
                    if (cloud.p56_xp) {
                        var localXp = {};
                        try { localXp = JSON.parse(localStorage.getItem('p56_xp') || '{}'); } catch(e) {}
                        if ((cloud.p56_xp.total || 0) >= (localXp.total || 0)) {
                            localStorage.setItem('p56_xp', JSON.stringify(cloud.p56_xp));
                        }
                    }
                    // Weekly reward state (global, unprefixed)
                    if (cloud.weeklyRewardState) {
                        localStorage.setItem('weeklyRewardState', JSON.stringify(cloud.weeklyRewardState));
                    }
                    // Dark mode sync disabled
                    if (cloud.darkMode !== undefined) {
                        // no-op
                    }
                    // Custom background - only reload if bg is new
                    if (cloud.customBg && !localStorage.getItem('customBg')) {
                        localStorage.setItem('customBg', cloud.customBg);
                        if (cloud.customBgColor) localStorage.setItem('customBgColor', cloud.customBgColor);
                        if (cloud.customBgOpacity) localStorage.setItem('customBgOpacity', cloud.customBgOpacity);
                        location.reload();
                        return;
                    }
                    if (typeof Premium !== 'undefined') { Premium.init(cloud); applyContentGating(); }
                    if (typeof Notifications !== 'undefined') Notifications.pullFromCloud(cloud);
                } else {
                    // First sign-in: push local data up
                    self.pushToCloud();
                }
            }).catch(function(e) { console.error('Cloud pull failed:', e.message); });
        },

        // Push localStorage -> cloud
        pushToCloud: function() {
            var ref = this._docRef();
            if (!ref) return Promise.resolve();
            var self = this;

            var subjectData = {};
            var ts = localStorage.getItem(prefix + 'activityStats');
            if (ts) subjectData.activityStats = JSON.parse(ts);
            var lp = localStorage.getItem(prefix + 'lessonProgress');
            if (lp) subjectData.lessonProgress = JSON.parse(lp);
            var tc = localStorage.getItem(prefix + 'timedChallenges');
            if (tc) subjectData.timedChallenges = JSON.parse(tc);
            var wa = localStorage.getItem(prefix + 'wrongAnswers');
            if (wa) subjectData.wrongAnswers = JSON.parse(wa);
            var ph = localStorage.getItem(prefix + 'practiceHistory');
            if (ph) subjectData.practiceHistory = JSON.parse(ph);
            // Extra subject-specific keys
            for (var j = 0; j < extraLocalKeys.length; j++) {
                var ek = extraLocalKeys[j];
                var ev = localStorage.getItem(prefix + ek);
                if (ev) subjectData[ek] = JSON.parse(ev);
            }

            var data = {};
            data[cloudKey] = subjectData;
            data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
            // Bookmarks (global)
            var bk = localStorage.getItem('bookmarks');
            if (bk) data.bookmarks = JSON.parse(bk);
            // Daily streak (global, unprefixed)
            var ds = localStorage.getItem('dailyStreak');
            if (ds) data.dailyStreak = JSON.parse(ds);
            data.streakServerTs = firebase.firestore.FieldValue.serverTimestamp();
            // Gems (global, unprefixed)
            var gems = localStorage.getItem('gems');
            if (gems) data.gems = JSON.parse(gems);
            // Streak freezes (global, unprefixed)
            var sf = localStorage.getItem('streakFreezes');
            if (sf) data.streakFreezes = JSON.parse(sf);
            // XP data (global)
            var xpRaw = localStorage.getItem('p56_xp');
            if (xpRaw) data.p56_xp = JSON.parse(xpRaw);
            // Weekly reward state (global, unprefixed)
            var wrs = localStorage.getItem('weeklyRewardState');
            if (wrs) data.weeklyRewardState = JSON.parse(wrs);
            data.darkMode = localStorage.getItem('darkMode') || 'false';
            var bg = localStorage.getItem('customBg');
            if (bg) {
                data.customBg = bg;
                var bgc = localStorage.getItem('customBgColor');
                if (bgc) data.customBgColor = bgc;
                var bgo = localStorage.getItem('customBgOpacity');
                if (bgo) data.customBgOpacity = bgo;
            }

            data.lastActivityTs = firebase.firestore.FieldValue.serverTimestamp();
            return ref.set(data, { merge: true }).then(function() {
                self.pushLeaderboard();
            }).catch(function(e) { console.error('Cloud push failed:', e.message); });
        },

        // Push leaderboard entry (v3 - delta tracking)
        pushLeaderboard: function() {
            if (!this.db || !this.user) return;
            var ts = JSON.parse(localStorage.getItem(prefix + 'activityStats') || '{}');
            var lp = JSON.parse(localStorage.getItem(prefix + 'lessonProgress') || '{}');
            var totalQ = 0, totalC = 0, bestStreak = 0;
            for (var k in ts) {
                totalQ += ts[k].total || 0;
                totalC += ts[k].score || 0;
                var bs = Math.max(ts[k].bestStreak || 0, ts[k].streak || 0);
                if (bs > bestStreak) bestStreak = bs;
            }
            if (totalQ === 0) return;
            // Delta tracking: only push new questions since last push
            var lbKey = '_lbLastPushed_' + leaderboardSubject;
            var lastPushed = JSON.parse(localStorage.getItem(lbKey) || '{"q":0,"c":0}');
            var dQ = totalQ - lastPushed.q;
            var dC = totalC - lastPushed.c;
            if (dQ <= 0) {
                // Reset tracking if cloud pull overwrote stats with stale data
                if (totalQ < lastPushed.q) localStorage.setItem(lbKey, JSON.stringify({ q: totalQ, c: totalC }));
                return;
            }
            localStorage.setItem(lbKey, JSON.stringify({ q: totalQ, c: totalC }));
            var lessonsCompleted = allLessons.filter(function(id) { return lp[id] && lp[id].completed; }).length;
            var meta = {};
            if (typeof Premium !== 'undefined' && Premium.isPremium()) meta.tier = Premium.getTier();
            if (typeof Premium !== 'undefined' && Premium._role) meta.role = Premium._role;
            var c = localStorage.getItem('userCountry'); if (c) meta.country = c;
            var s = localStorage.getItem('userSchool'); if (s) meta.school = s;
            var cc = localStorage.getItem('studentClassCode'); if (cc) meta.classCode = cc;
            Leaderboard.push(this.db, this.user, leaderboardSubject, {
                questionsThisSession: dQ, correctThisSession: dC,
                bestStreak: bestStreak, lessonsCompleted: lessonsCompleted
            }, meta);
        },

        // Called after any data change (LA answer, lesson complete, etc.)
        saveAndSync: function() {
            clearTimeout(this._syncTimer);
            var self = this;
            this._syncTimer = setTimeout(function() { self.pushToCloud(); }, 2000);
        },

        // Flush pending push on page unload to prevent data loss
        _initUnloadFlush: function() {
            var self = this;
            document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'hidden' && self._syncTimer) {
                    clearTimeout(self._syncTimer);
                    self._syncTimer = null;
                    self.pushToCloud();
                }
            });
        }
    };
})();
