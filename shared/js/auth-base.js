/* ================================================================
   PROJECT 45 - AUTH + CLOUD SYNC
   Google sign-in + Firestore data persistence.
   Based on the Project 56 auth pattern.

   Usage:
     1. Define AUTH_CONFIG before loading this file:
        var AUTH_CONFIG = {
            cloudKey: 'maths',
            allLessons: ['lines','arithmetic-sequences',...],
            onAuthReady: function() {}
        };
     2. Load Firebase SDKs (compat), then firebase-config.js, then this file.
   ================================================================ */

(function() {
    'use strict';

    var cfg = (typeof AUTH_CONFIG !== 'undefined') ? AUTH_CONFIG : {};
    var cloudKey = cfg.cloudKey || '';
    var allLessons = cfg.allLessons || [];
    var onAuthReady = cfg.onAuthReady || null;
    var prefix = cfg.localPrefix || ((typeof STORAGE_PREFIX !== 'undefined') ? STORAGE_PREFIX : '');

    window.Auth = {
        user: null,
        db: null,
        _ready: false,
        _syncTimer: null,

        init: function() {
            if (!FIREBASE_CONFIG || !FIREBASE_CONFIG.apiKey) {
                this._ready = true;
                return;
            }
            firebase.initializeApp(FIREBASE_CONFIG);
            this.db = firebase.firestore();

            this._initUnloadFlush();

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

        /* ── Sign in / out ── */
        signIn: function() {
            if (!this.db) return;
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).catch(function(e) {
                console.error('Sign-in failed:', e.message);
            });
        },

        signOut: function() {
            if (!this.db) return;
            clearTimeout(this._syncTimer);
            firebase.auth().signOut().then(function() { location.reload(); }).catch(function() { location.reload(); });
        },

        /* ── UI (XSS-safe) ── */
        updateUI: function() {
            var btn = document.getElementById('auth-btn');
            var info = document.getElementById('auth-info');
            if (!btn) return;

            if (this.user) {
                var name = this.user.displayName || this.user.email || 'User';
                var photo = this.user.photoURL;

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

        /* ── Cloud sync ── */
        _docRef: function() {
            if (!this.db || !this.user) return null;
            return this.db.collection('users').doc(this.user.uid);
        },

        pullFromCloud: function() {
            var ref = this._docRef();
            if (!ref) return Promise.resolve();
            var self = this;
            return ref.get().then(function(doc) {
                if (doc.exists) {
                    var cloud = doc.data();
                    var p = cloud[cloudKey] || {};

                    if (p.activityStats) {
                        localStorage.setItem(prefix + 'activityStats', JSON.stringify(p.activityStats));
                    }
                    if (p.lessonProgress) {
                        localStorage.setItem(prefix + 'lessonProgress', JSON.stringify(p.lessonProgress));
                    }
                    if (p.practiceHistory) {
                        localStorage.setItem(prefix + 'practiceHistory', JSON.stringify(p.practiceHistory));
                    }
                    if (cloud.dailyStreak) {
                        localStorage.setItem('dailyStreak', JSON.stringify(cloud.dailyStreak));
                    }
                    if (cloud.settings) {
                        localStorage.setItem('p45-settings', JSON.stringify(cloud.settings));
                    }
                    if (cloud.darkMode !== undefined) {
                        localStorage.setItem('p45-dark', cloud.darkMode);
                    }
                } else {
                    self.pushToCloud();
                }
            }).catch(function(e) { console.error('Cloud pull failed:', e.message); });
        },

        pushToCloud: function() {
            var ref = this._docRef();
            if (!ref) return Promise.resolve();

            var data = {};

            // Subject data
            var subjectData = {};
            var actStats = localStorage.getItem(prefix + 'activityStats');
            if (actStats) { try { subjectData.activityStats = JSON.parse(actStats); } catch(e) {} }
            var lessProg = localStorage.getItem(prefix + 'lessonProgress');
            if (lessProg) { try { subjectData.lessonProgress = JSON.parse(lessProg); } catch(e) {} }
            var practHist = localStorage.getItem(prefix + 'practiceHistory');
            if (practHist) { try { subjectData.practiceHistory = JSON.parse(practHist); } catch(e) {} }

            if (Object.keys(subjectData).length > 0) {
                data[cloudKey] = subjectData;
            }

            // Global data
            var streak = localStorage.getItem('dailyStreak');
            if (streak) { try { data.dailyStreak = JSON.parse(streak); } catch(e) {} }

            var settings = localStorage.getItem('p45-settings');
            if (settings) { try { data.settings = JSON.parse(settings); } catch(e) {} }

            data.darkMode = localStorage.getItem('p45-dark') || 'false';
            data.displayName = this.user.displayName || '';
            data.photoURL = this.user.photoURL || '';
            data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();

            return ref.set(data, { merge: true }).catch(function(e) {
                console.error('Cloud push failed:', e.message);
            });
        },

        /* ── Debounced save ── */
        saveAndSync: function() {
            var self = this;
            clearTimeout(this._syncTimer);
            this._syncTimer = setTimeout(function() {
                self.pushToCloud();
            }, 2000);
        },

        /* ── Flush on page unload ── */
        _initUnloadFlush: function() {
            var self = this;
            document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'hidden' && self.user) {
                    self.pushToCloud();
                }
            });
        }
    };
})();
