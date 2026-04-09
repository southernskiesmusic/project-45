/* ================================================================
   PAPER FORMULA BOOKLET - Opens formula booklet as overlay during paper
   Clones the formula booklet view content into a modal so the student
   can reference formulas without leaving the paper.
   ================================================================ */
(function() {
    'use strict';

    var btn = document.getElementById('pg-formula-btn');
    if (!btn) return;

    var overlay = null;

    btn.addEventListener('click', function() {
        if (overlay) { overlay.style.display = ''; return; }

        // Find the formula booklet view
        var booklet = document.getElementById('view-formula-booklet');
        if (!booklet) { if (typeof pageFlash==='function') pageFlash('Formula booklet not available.', 'error'); return; }

        // Create overlay
        overlay = document.createElement('div');
        overlay.id = 'pg-formula-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;';

        var modal = document.createElement('div');
        modal.style.cssText = 'background:#fff;color:#1a1a2e;border-radius:16px;max-width:850px;width:100%;max-height:85vh;overflow-y:auto;padding:24px;box-shadow:0 12px 48px rgba(0,0,0,0.3);position:relative;';

        // Close button
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '\u2715 Close';
        closeBtn.style.cssText = 'position:sticky;top:0;float:right;background:var(--primary,#4361ee);color:#fff;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:700;font-size:0.85rem;z-index:1;';
        closeBtn.addEventListener('click', function() { overlay.style.display = 'none'; });

        // Clone content (skip the back button)
        var content = booklet.cloneNode(true);
        content.removeAttribute('id');
        content.style.display = 'block';
        content.className = '';
        var backBtn = content.querySelector('.back-btn');
        if (backBtn) backBtn.remove();

        modal.appendChild(closeBtn);
        modal.appendChild(content);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close on overlay click (not modal)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.style.display = 'none';
        });

        // Close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay && overlay.style.display !== 'none') {
                overlay.style.display = 'none';
            }
        });

        // Render math in cloned content
        if (typeof renderMathInElement === 'function') {
            renderMathInElement(modal, {
                delimiters: [
                    { left: '\\(', right: '\\)', display: false },
                    { left: '$$', right: '$$', display: true }
                ],
                throwOnError: false
            });
        }
    });
})();
