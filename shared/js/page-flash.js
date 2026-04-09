// ── Dark Mode Init (runs before paint) ───────────────────────────
(function() {
    if (localStorage.getItem('darkMode') === 'on') {
        document.body ? document.body.classList.add('dark-mode') : document.addEventListener('DOMContentLoaded', function() { document.body.classList.add('dark-mode'); });
    }
})();

// ── Page Flash Notification System ────────────────────────────────
// Replaces alert(), confirm(), prompt() with sleek page-flash overlays.
// Usage:
//   pageFlash('Message')                         → info flash (auto-dismiss)
//   pageFlash('Error!', 'error')                 → error flash
//   pageFlash('Done!', 'success')                → success flash
//   pageFlash.confirm('Are you sure?').then(ok => { ... })
//   pageFlash.prompt('Enter value:').then(val => { ... })  // val is null if cancelled

(function () {
    // ── Inject styles once ────────────────────────────────────────
    var style = document.createElement('style');
    style.textContent =
        '#pf-overlay{position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;' +
        'background:rgba(0,0,0,0.35);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);opacity:0;transition:opacity .2s ease;pointer-events:none;}' +
        '#pf-overlay.pf-show{opacity:1;pointer-events:auto;}' +
        '#pf-box{background:#fff;color:#1a1a2e;border-radius:16px;padding:28px 32px 22px;' +
        'max-width:420px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.25);transform:scale(0.9) translateY(10px);' +
        'transition:transform .25s cubic-bezier(.34,1.56,.64,1),opacity .2s ease;opacity:0;text-align:center;font-family:inherit;}' +
        '#pf-overlay.pf-show #pf-box{transform:scale(1) translateY(0);opacity:1;}' +
        '#pf-icon{font-size:2.2rem;margin-bottom:8px;}' +
        '#pf-msg{font-size:0.95rem;line-height:1.55;margin-bottom:18px;white-space:pre-line;word-break:break-word;}' +
        '#pf-input{width:100%;padding:10px 14px;border:2px solid var(--border,#e0e0e0);border-radius:10px;font-size:0.95rem;' +
        'margin-bottom:14px;background:var(--input-bg,#f8f8fa);color:inherit;outline:none;box-sizing:border-box;}' +
        '#pf-input:focus{border-color:var(--accent,#6c5ce7);}' +
        '#pf-btns{display:flex;gap:10px;justify-content:center;}' +
        '.pf-btn{padding:10px 24px;border:none;border-radius:10px;font-size:0.9rem;font-weight:600;cursor:pointer;' +
        'transition:transform .15s,box-shadow .15s,background .15s;font-family:inherit;}' +
        '.pf-btn:active{transform:scale(0.96);}' +
        '.pf-btn-primary{background:var(--accent,#6c5ce7);color:#fff;box-shadow:0 4px 14px rgba(108,92,231,0.3);}' +
        '.pf-btn-primary:hover{box-shadow:0 6px 20px rgba(108,92,231,0.4);}' +
        '.pf-btn-cancel{background:var(--card-bg-hover,#f0f0f2);color:var(--text,#1a1a2e);}' +
        '.pf-btn-cancel:hover{background:var(--border,#e0e0e0);}' +
        /* Toast mode (auto-dismiss info/success/error) */
        '#pf-toast{position:fixed;top:24px;left:50%;transform:translateX(-50%) translateY(-120%);z-index:100001;' +
        'background:var(--card-bg,#fff);color:var(--text,#1a1a2e);padding:14px 28px;border-radius:14px;' +
        'box-shadow:0 8px 32px rgba(0,0,0,0.18);font-size:0.92rem;font-weight:500;max-width:460px;width:90%;' +
        'text-align:center;transition:transform .35s cubic-bezier(.34,1.56,.64,1),opacity .25s ease;opacity:0;' +
        'pointer-events:none;font-family:inherit;white-space:pre-line;display:flex;align-items:center;gap:10px;justify-content:center;}' +
        '#pf-toast.pf-toast-show{transform:translateX(-50%) translateY(0);opacity:1;pointer-events:auto;}' +
        '#pf-toast.pf-success{border-left:4px solid #00b894;}' +
        '#pf-toast.pf-error{border-left:4px solid #e74c3c;}' +
        '#pf-toast.pf-info{border-left:4px solid var(--accent,#6c5ce7);}';
    document.head.appendChild(style);

    // ── DOM elements (created lazily) ─────────────────────────────
    var _overlay = null, _box = null, _icon = null, _msg = null, _input = null, _btns = null;
    var _toast = null;
    var _toastTimer = null;
    var _queue = [];
    var _busy = false;

    function _ensureOverlay() {
        if (_overlay) return;
        _overlay = document.createElement('div');
        _overlay.id = 'pf-overlay';
        _overlay.innerHTML =
            '<div id="pf-box">' +
            '<div id="pf-icon"></div>' +
            '<div id="pf-msg"></div>' +
            '<input id="pf-input" type="text" style="display:none;">' +
            '<div id="pf-btns"></div>' +
            '</div>';
        document.body.appendChild(_overlay);
        _box = document.getElementById('pf-box');
        _icon = document.getElementById('pf-icon');
        _msg = document.getElementById('pf-msg');
        _input = document.getElementById('pf-input');
        _btns = document.getElementById('pf-btns');
    }

    function _ensureToast() {
        if (_toast) return;
        _toast = document.createElement('div');
        _toast.id = 'pf-toast';
        document.body.appendChild(_toast);
    }

    // ── Show a toast (auto-dismissing flash) ──────────────────────
    function _showToast(message, type, duration) {
        _ensureToast();
        if (_toastTimer) { clearTimeout(_toastTimer); }
        _toast.className = 'pf-' + (type || 'info');
        var icons = { success: '\u2705', error: '\u274c', info: '\u2139\ufe0f' };
        _toast.innerHTML = '<span>' + (icons[type] || icons.info) + '</span><span>' + _escHtml(message) + '</span>';
        // Force reflow for re-animation
        void _toast.offsetWidth;
        _toast.classList.add('pf-toast-show');
        _toastTimer = setTimeout(function () {
            _toast.classList.remove('pf-toast-show');
            _toastTimer = null;
        }, duration || 3500);
    }

    function _escHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ── Show the dialog overlay ───────────────────────────────────
    function _showDialog(opts) {
        return new Promise(function (resolve) {
            _ensureOverlay();
            var iconMap = {
                confirm: '\u26a0\ufe0f',
                prompt: '\u270f\ufe0f',
                info: '\u2139\ufe0f',
                success: '\u2705',
                error: '\u274c'
            };
            _icon.textContent = iconMap[opts.type] || iconMap.info;
            _msg.innerHTML = _escHtml(opts.message);
            _input.style.display = opts.type === 'prompt' ? '' : 'none';
            _input.value = opts.defaultValue || '';

            var btnsHtml = '';
            if (opts.type === 'confirm') {
                btnsHtml =
                    '<button class="pf-btn pf-btn-cancel" id="pf-no">Cancel</button>' +
                    '<button class="pf-btn pf-btn-primary" id="pf-yes">OK</button>';
            } else if (opts.type === 'prompt') {
                btnsHtml =
                    '<button class="pf-btn pf-btn-cancel" id="pf-no">Cancel</button>' +
                    '<button class="pf-btn pf-btn-primary" id="pf-yes">OK</button>';
            }
            _btns.innerHTML = btnsHtml;

            _overlay.classList.add('pf-show');

            function close(val) {
                _overlay.classList.remove('pf-show');
                setTimeout(function () { resolve(val); }, 200);
            }

            var yesBtn = document.getElementById('pf-yes');
            var noBtn = document.getElementById('pf-no');
            if (yesBtn) yesBtn.onclick = function () {
                close(opts.type === 'prompt' ? _input.value : true);
            };
            if (noBtn) noBtn.onclick = function () {
                close(opts.type === 'prompt' ? null : false);
            };

            // Close on backdrop click for confirms
            _overlay.onclick = function (e) {
                if (e.target === _overlay) close(opts.type === 'prompt' ? null : false);
            };

            // Enter key for prompt
            if (opts.type === 'prompt') {
                _input.onkeydown = function (e) {
                    if (e.key === 'Enter') { close(_input.value); }
                };
                setTimeout(function () { _input.focus(); }, 100);
            }

            // Escape to dismiss
            var escHandler = function (e) {
                if (e.key === 'Escape') {
                    document.removeEventListener('keydown', escHandler);
                    close(opts.type === 'prompt' ? null : false);
                }
            };
            document.addEventListener('keydown', escHandler);
        });
    }

    // ── Public API ────────────────────────────────────────────────
    function pageFlash(message, type) {
        _showToast(message, type || 'info');
    }

    pageFlash.success = function (message) { _showToast(message, 'success'); };
    pageFlash.error = function (message) { _showToast(message, 'error'); };
    pageFlash.info = function (message) { _showToast(message, 'info'); };

    pageFlash.confirm = function (message) {
        return _showDialog({ type: 'confirm', message: message });
    };

    pageFlash.prompt = function (message, defaultValue) {
        return _showDialog({ type: 'prompt', message: message, defaultValue: defaultValue || '' });
    };

    window.pageFlash = pageFlash;

})();

// ── DM Notification Listener ─────────────────────────────────────
// Checks for unread DMs on any page where Firebase is available.
// Shows a toast when the user has unread messages.
(function() {
    function _startDmNotify() {
        if (typeof firebase === 'undefined' || !firebase.firestore || !firebase.auth) return;
        var _unsubSnapshot = null;
        firebase.auth().onAuthStateChanged(function(user) {
            // Clean up previous listener on auth state change
            if (_unsubSnapshot) { _unsubSnapshot(); _unsubSnapshot = null; }
            if (!user) return;
            var db = firebase.firestore();
            var _notifiedIds = {};
            // Listen for this user's conversations and check for unread client-side
            _unsubSnapshot = db.collection('directMessages')
                .where('participants', 'array-contains', user.uid)
                .onSnapshot(function(snap) {
                    snap.docChanges().forEach(function(change) {
                        if (change.type !== 'modified' && change.type !== 'added') return;
                        var d = change.doc.data();
                        var hasUnread = Array.isArray(d.hasUnread) && d.hasUnread.indexOf(user.uid) !== -1;
                        if (!hasUnread) return;
                        // Don't re-notify for the same conversation until it's been read
                        if (_notifiedIds[change.doc.id]) return;
                        _notifiedIds[change.doc.id] = true;
                        var senderName = 'Someone';
                        if (d.participantNames) {
                            var keys = Object.keys(d.participantNames);
                            for (var i = 0; i < keys.length; i++) {
                                if (keys[i] !== user.uid) { senderName = d.participantNames[keys[i]]; break; }
                            }
                        }
                        var preview = d.lastMessage || 'New message';
                        if (preview.length > 60) preview = preview.substring(0, 60) + '...';
                        pageFlash.info(senderName + ': ' + preview);
                    });
                    // Clean up notified IDs when unread is cleared
                    snap.forEach(function(doc) {
                        var d = doc.data();
                        var stillUnread = Array.isArray(d.hasUnread) && d.hasUnread.indexOf(user.uid) !== -1;
                        if (!stillUnread) delete _notifiedIds[doc.id];
                    });
                });
        });
    }
    // Wait for DOM + Firebase to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(_startDmNotify, 1500); });
    } else {
        setTimeout(_startDmNotify, 1500);
    }
})();

// ── Announcement Notification Listener ───────────────────────────
// Listens for new active announcements and shows a toast on any page.
// Tracks seen announcements in localStorage so each one only shows once.
(function() {
    function _startAnnouncementNotify() {
        if (typeof firebase === 'undefined' || !firebase.firestore) return;
        var db = firebase.firestore();
        var seen = {};
        try {
            var raw = localStorage.getItem('p56_seen_announcements');
            if (raw) seen = JSON.parse(raw);
        } catch(e) {}

        var _initial = true;
        db.collection('announcements')
            .where('active', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5)
            .onSnapshot(function(snap) {
                snap.docChanges().forEach(function(change) {
                    var d = change.doc.data();
                    var id = change.doc.id;

                    // Handle deleted announcements
                    if (change.type === 'removed' || !d.active) return;

                    // Don't show if already seen
                    if (seen[id]) return;

                    // Skip initial load for old announcements (> 1 hour old)
                    if (_initial && d.createdAt) {
                        var ageMs = Date.now() - d.createdAt.toMillis();
                        if (ageMs > 3600000) return;
                    }

                    // Mark as seen
                    seen[id] = Date.now();
                    try { localStorage.setItem('p56_seen_announcements', JSON.stringify(seen)); } catch(e) {}

                    // Show toast  -  high priority gets error style for visibility
                    var prefix = d.priority === 'high' ? '\u{1F6A8} ' : '\u{1F4E2} ';
                    var msg = prefix + (d.title || 'Announcement');
                    if (d.body) msg += '\n' + (d.body.length > 80 ? d.body.substring(0, 80) + '...' : d.body);
                    if (d.priority === 'high') {
                        pageFlash.error(msg);
                    } else {
                        pageFlash.info(msg);
                    }
                });
                _initial = false;
            });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(_startAnnouncementNotify, 2000); });
    } else {
        setTimeout(_startAnnouncementNotify, 2000);
    }
})();

// ── Poll Notification Listener ───────────────────────────────────
// Listens for new polls in forumMessages and shows a toast on any page.
(function() {
    function _startPollNotify() {
        if (typeof firebase === 'undefined' || !firebase.firestore || !firebase.auth) return;
        var _unsubSnapshot = null;
        firebase.auth().onAuthStateChanged(function(user) {
            // Clean up previous listener on auth state change
            if (_unsubSnapshot) { _unsubSnapshot(); _unsubSnapshot = null; }
            if (!user) return;
            var db = firebase.firestore();
            var seen = {};
            try {
                var raw = localStorage.getItem('p56_seen_polls');
                if (raw) seen = JSON.parse(raw);
            } catch(e) {}

            var _initial = true;
            _unsubSnapshot = db.collection('forumMessages')
                .where('type', '==', 'poll')
                .where('hidden', '==', false)
                .orderBy('createdAt', 'desc')
                .limit(5)
                .onSnapshot(function(snap) {
                    snap.docChanges().forEach(function(change) {
                        if (change.type !== 'added') return;
                        var d = change.doc.data();
                        var id = change.doc.id;

                        if (seen[id]) return;

                        // Skip old polls on initial load (> 1 hour)
                        if (_initial && d.createdAt && d.createdAt.toMillis) {
                            var ageMs = Date.now() - d.createdAt.toMillis();
                            if (ageMs > 3600000) return;
                        }

                        // Don't notify for own polls
                        if (d.authorUid === user.uid) return;

                        seen[id] = Date.now();
                        try { localStorage.setItem('p56_seen_polls', JSON.stringify(seen)); } catch(e) {}

                        var question = d.poll ? d.poll.question : 'New poll';
                        pageFlash.info('\u{1F4CA} New poll: ' + question);
                    });
                    _initial = false;
                });
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(_startPollNotify, 2500); });
    } else {
        setTimeout(_startPollNotify, 2500);
    }
})();
