// ── Sentry error tracking ──────────────────────────────────────
// Lightweight integration - loads Sentry lazily on first error to avoid
// blocking page load. Set window.SENTRY_DSN before this script loads,
// or it reads from the script tag's data-dsn attribute.
(function() {
    var _dsn = window.SENTRY_DSN || (document.currentScript && document.currentScript.getAttribute('data-dsn')) || '';
    var _sentryReady = false;
    var _queue = [];

    function _loadSentry(cb) {
        if (_sentryReady) { cb(); return; }
        if (!_dsn) { return; } // No DSN configured - skip Sentry
        var s = document.createElement('script');
        s.src = 'https://browser.sentry-cdn.com/8.48.0/bundle.min.js';
        s.crossOrigin = 'anonymous';
        s.onload = function() {
            if (typeof Sentry !== 'undefined') {
                Sentry.init({
                    dsn: _dsn,
                    environment: location.hostname === 'localhost' ? 'development' : 'production',
                    release: 'project-56@' + (document.querySelector('meta[name="version"]') || {}).content || 'unknown',
                    sampleRate: 1.0,
                    maxBreadcrumbs: 30,
                    beforeSend: function(event) {
                        // Strip PII from error reports
                        if (event.user) { delete event.user.email; delete event.user.ip_address; }
                        return event;
                    }
                });
                // Set user context if signed in (uid only, no PII)
                try {
                    var user = firebase.auth().currentUser;
                    if (user) Sentry.setUser({ id: user.uid });
                } catch(e) {}
                _sentryReady = true;
                // Flush queued errors
                _queue.forEach(function(fn) { fn(); });
                _queue = [];
            }
            cb();
        };
        s.onerror = function() { cb(); }; // Sentry failed to load - degrade gracefully
        document.head.appendChild(s);
    }

    function _captureError(msg, filename, lineno, colno, error) {
        if (_sentryReady && typeof Sentry !== 'undefined') {
            Sentry.captureException(error || new Error(msg));
        } else if (_dsn) {
            _queue.push(function() {
                Sentry.captureException(error || new Error(msg));
            });
            _loadSentry(function() {});
        }
    }

    function _captureRejection(reason) {
        if (_sentryReady && typeof Sentry !== 'undefined') {
            Sentry.captureException(reason instanceof Error ? reason : new Error(String(reason)));
        } else if (_dsn) {
            _queue.push(function() {
                Sentry.captureException(reason instanceof Error ? reason : new Error(String(reason)));
            });
            _loadSentry(function() {});
        }
    }

    // ── Global error handlers ──────────────────────────────────
    window.addEventListener('error', function(e) {
        console.error('Uncaught error:', e.message, e.filename, e.lineno);
        _captureError(e.message, e.filename, e.lineno, e.colno, e.error);
        // Don't show white screen - show a friendly message
        var app = document.getElementById('app');
        if (app && !app.innerHTML.trim()) {
            app.innerHTML = '<div style="text-align:center;padding:40px;"><h2>Something went wrong</h2><p>Try refreshing the page. If the problem persists, contact support.</p><button onclick="location.reload()" style="padding:10px 24px;border-radius:8px;border:none;background:#4361ee;color:#fff;cursor:pointer;margin-top:12px;">Refresh</button></div>';
        }
    });
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        _captureRejection(e.reason);
    });

    // Pre-load Sentry after page is interactive (don't block render)
    if (_dsn) {
        if (document.readyState === 'complete') {
            _loadSentry(function() {});
        } else {
            window.addEventListener('load', function() { _loadSentry(function() {}); });
        }
    }
})();
