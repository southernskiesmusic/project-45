// ── Floating "Back to Topics" button ──────────────────────────────
// Shows a sticky floating back button when inside a trainer/activity
// view (not on landing or folder views). Hooks into showView().
// Also patches assignment-mode results to show "Back to Topics".

(function () {
    var style = document.createElement('style');
    style.textContent =
        '#float-back{position:fixed;bottom:20px;left:20px;z-index:9997;background:var(--card-bg,#fff);color:var(--text,#333);' +
        'border:2px solid var(--border,#e0e0e0);padding:9px 18px;border-radius:12px;font-weight:700;font-size:0.82rem;' +
        'cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.12);font-family:inherit;transition:opacity .2s,transform .2s;' +
        'display:none;gap:6px;align-items:center;}' +
        '#float-back:hover{background:var(--primary,#4361ee);color:#fff;border-color:var(--primary,#4361ee);}' +
        '#float-back svg{width:14px;height:14px;fill:currentColor;}';
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.id = 'float-back';
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg> Back to Topics';

    var _backTarget = null;

    btn.addEventListener('click', function () {
        if (_backTarget && typeof showView === 'function') {
            showView(_backTarget);
        }
    });

    function setup() {
        document.body.appendChild(btn);

        // Patch showView if it exists
        if (typeof showView !== 'function') return;
        var _origShowView = showView;

        window.showView = function (id) {
            _origShowView(id);
            _updateFloatingBack(id);
        };

        // Check initial state
        var active = document.querySelector('.view.active');
        if (active) {
            _updateFloatingBack(active.id.replace('view-', ''));
        }
    }

    function _updateFloatingBack(viewId) {
        // Determine if this is a trainer/activity view (not landing, hub, or folder)
        var el = document.getElementById('view-' + viewId);
        if (!el) { btn.style.display = 'none'; return; }

        // Check if this view has a back-btn (trainer/activity views do)
        var backBtn = el.querySelector('.back-btn[data-back]');

        // Hide on landing/hub views, or assignment mode skip button handles it
        if (viewId === 'landing' || viewId === 'hub') {
            btn.style.display = 'none';
            _backTarget = null;
            return;
        }

        // If view has a back button, show floating back pointing to same target
        if (backBtn) {
            _backTarget = backBtn.getAttribute('data-back');
            // Only show for activity views (not folder views which have topic grids)
            var hasTopicGrid = el.querySelector('.topic-grid');
            if (hasTopicGrid) {
                // This is a folder view, not an activity - still show but target hub
                btn.style.display = 'flex';
                btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg> ' + backBtn.textContent.trim();
            } else {
                btn.style.display = 'flex';
                btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg> ' + backBtn.textContent.trim();
            }
        } else {
            btn.style.display = 'none';
            _backTarget = null;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setTimeout(setup, 50);
    }
})();
