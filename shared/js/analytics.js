// shared/js/analytics.js - Lightweight analytics for Project 56
// Uses Firestore to store events (no Firebase Analytics SDK needed)
(function() {
    'use strict';

    var P56Analytics = {
        _queue: [],
        _flushing: false,
        _sessionId: null,
        _sessionStart: null,

        init: function() {
            this._sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
            this._sessionStart = Date.now();
            this.track('session_start');

            // Flush on page unload
            var self = this;
            window.addEventListener('beforeunload', function() {
                var duration = Math.round((Date.now() - self._sessionStart) / 1000);
                self.track('session_end', { duration_seconds: duration });
                self._flush(true); // sync flush
            });

            // Periodic flush every 30s
            setInterval(function() { self._flush(); }, 30000);
        },

        track: function(event, data) {
            this._queue.push({
                e: event,
                d: data || {},
                t: Date.now(),
                s: this._sessionId
            });

            // Auto-flush if queue gets large
            if (this._queue.length >= 10) this._flush();
        },

        _flush: function(sync) {
            if (this._queue.length === 0 || this._flushing) return;

            var batch = this._queue.splice(0);
            var uid = null;
            try { uid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null; } catch(e) {}

            var payload = {
                events: batch,
                uid: uid,
                page: window.location.pathname,
                ts: Date.now()
            };

            if (sync && navigator.sendBeacon) {
                // Use sendBeacon for unload - fire and forget
                try {
                    var key = 'p56_analytics_' + Date.now();
                    localStorage.setItem(key, JSON.stringify(payload));
                } catch(e) {}
                return;
            }

            this._flushing = true;
            var self = this;

            try {
                if (typeof firebase !== 'undefined' && firebase.firestore) {
                    firebase.firestore().collection('analytics').add(payload)
                        .then(function() { self._flushing = false; })
                        .catch(function() { self._flushing = false; });
                } else {
                    self._flushing = false;
                }
            } catch(e) {
                self._flushing = false;
            }
        }
    };

    window.P56Analytics = P56Analytics;

    // Auto-init once Firebase is ready (deferred scripts)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            P56Analytics.init();
        });
    } else {
        P56Analytics.init();
    }
})();
