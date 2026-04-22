/* ================================================================
   PROJECT 45 - AUTH GATE
   Soft sign-in prompt (non-blocking bottom banner).
   Call AuthGate.dismiss() when Firebase resolves a signed-in user.
   ================================================================ */
(function() {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

    if (localStorage.getItem('p45_signed_in')) {
        window.AuthGate = {
            dismiss: function() {},
            show: function() { localStorage.removeItem('p45_signed_in'); showBanner(); }
        };
        return;
    }

    var style = document.createElement('style');
    style.textContent =
        '#auth-gate-banner{position:fixed;bottom:0;left:0;right:0;z-index:8000;display:flex;align-items:center;justify-content:center;gap:16px;' +
        'padding:14px 24px;background:var(--bg2,#0e0e18);border-top:1px solid rgba(255,255,255,0.1);' +
        'box-shadow:0 -4px 24px rgba(0,0,0,.4);transition:transform .35s ease;font-family:inherit;}' +
        '#auth-gate-banner.hidden{transform:translateY(100%);}' +
        '#auth-gate-banner p{margin:0;font-size:0.88rem;color:var(--text2,#B0ACA5);}' +
        '#auth-gate-signin{display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border:none;border-radius:8px;' +
        'font-size:0.85rem;font-weight:600;cursor:pointer;color:#fff;background:var(--accent,#4f6ef7);white-space:nowrap;' +
        'transition:transform .15s,box-shadow .15s;font-family:inherit;}' +
        '#auth-gate-signin:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(79,110,247,.35);}' +
        '#auth-gate-signin svg{flex-shrink:0;}' +
        '#auth-gate-dismiss{background:none;border:none;color:var(--text3,#8F8B83);cursor:pointer;font-size:1.3rem;padding:4px 8px;line-height:1;}' +
        '@media(max-width:600px){#auth-gate-banner{flex-wrap:wrap;gap:10px;padding:12px 16px;}#auth-gate-banner p{font-size:0.82rem;flex:1 1 100%;text-align:center;}}';
    document.head.appendChild(style);

    function showBanner() {
        var existing = document.getElementById('auth-gate-banner');
        if (existing) { existing.classList.remove('hidden'); return; }

        var banner = document.createElement('div');
        banner.id = 'auth-gate-banner';
        banner.setAttribute('role', 'status');
        banner.innerHTML =
            '<p>Sign in to save your progress and track your mastery across all subjects.</p>' +
            '<button id="auth-gate-signin">' +
            '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 019.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.9 23.9 0 000 24c0 3.77.9 7.35 2.56 10.52l7.97-5.93z"/><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.93C6.51 42.62 14.62 48 24 48z"/></svg>' +
            'Sign in with Google</button>' +
            '<button id="auth-gate-dismiss" aria-label="Dismiss">&times;</button>';
        document.body.appendChild(banner);

        document.getElementById('auth-gate-signin').addEventListener('click', function() {
            if (typeof firebase !== 'undefined' && firebase.auth) {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).catch(function(e) { console.error('Sign-in error:', e.message); });
            }
        });

        document.getElementById('auth-gate-dismiss').addEventListener('click', function() {
            banner.classList.add('hidden');
            sessionStorage.setItem('p45_gate_dismissed', '1');
        });

        if (sessionStorage.getItem('p45_gate_dismissed')) banner.classList.add('hidden');
    }

    setTimeout(showBanner, 2500);

    window.AuthGate = {
        dismiss: function() {
            localStorage.setItem('p45_signed_in', '1');
            var b = document.getElementById('auth-gate-banner');
            if (b) { b.classList.add('hidden'); setTimeout(function() { if (b.parentNode) b.parentNode.removeChild(b); }, 400); }
        },
        show: function() {
            localStorage.removeItem('p45_signed_in');
            showBanner();
        }
    };

    var _check = setInterval(function() {
        if (typeof firebase !== 'undefined' && firebase.auth && firebase.apps && firebase.apps.length) {
            clearInterval(_check);
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) AuthGate.dismiss(); else AuthGate.show();
            });
        }
    }, 100);
})();
