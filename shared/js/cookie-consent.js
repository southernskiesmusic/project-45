/* ── Cookie Consent Banner ──
   GDPR-compliant banner for AdSense + Analytics cookies.
   Essential cookies (Firebase, localStorage) don't need consent.
   ─────────────────────────────────────────────────────────── */
(function() {
    if (localStorage.getItem('cookieConsent')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:99999;' +
        'background:#1a1a2e;color:#e0e0e0;padding:16px 24px;' +
        'display:flex;align-items:center;justify-content:space-between;gap:16px;' +
        'font-family:Inter,system-ui,sans-serif;font-size:0.85rem;line-height:1.5;' +
        'box-shadow:0 -4px 24px rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.08);';

    banner.innerHTML =
        '<span>We use cookies for essential functions and to show ads via Google AdSense. ' +
        'See our <a href="/privacy.html" style="color:#6b8aff;text-decoration:underline;">Privacy Policy</a>.</span>' +
        '<span style="display:flex;gap:8px;flex-shrink:0;">' +
        '<button id="cookie-reject" style="padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);' +
        'background:transparent;color:#e0e0e0;cursor:pointer;font-size:0.82rem;font-family:inherit;">Reject Non-Essential</button>' +
        '<button id="cookie-accept" style="padding:8px 16px;border-radius:8px;border:none;' +
        'background:#4361ee;color:#fff;cursor:pointer;font-size:0.82rem;font-weight:600;font-family:inherit;">Accept All</button>' +
        '</span>';

    document.body.appendChild(banner);

    banner.querySelector('#cookie-accept').onclick = function() {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.remove();
    };

    banner.querySelector('#cookie-reject').onclick = function() {
        localStorage.setItem('cookieConsent', 'rejected');
        banner.remove();
        // Remove AdSense script if rejected
        var adScripts = document.querySelectorAll('script[src*="adsbygoogle"]');
        adScripts.forEach(function(s) { s.remove(); });
    };
})();
