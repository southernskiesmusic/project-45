/**
 * Scratchpad - Project 56
 * Self-contained JS file that injects a drawing canvas overlay.
 * Include on any subject page to get a scratchpad FAB.
 */
(function() {
    'use strict';

    // Don't double-inject
    if (document.getElementById('scratchpad-fab')) return;

    // Inject CSS
    var style = document.createElement('style');
    style.textContent =
        '.scratchpad-fab{position:fixed;bottom:24px;right:86px;width:52px;height:52px;border-radius:50%;background:var(--primary,#e91e8a);color:#fff;border:none;font-size:1.4rem;cursor:pointer;z-index:999;box-shadow:0 4px 14px rgba(0,0,0,0.3);display:none;align-items:center;justify-content:center;transition:transform 0.2s;}' +
        '.scratchpad-fab:hover{transform:scale(1.1);}' +
        '.scratchpad-fab.active{background:#e74c3c;}' +
        '.scratchpad-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:1100;display:none;flex-direction:column;pointer-events:none;}' +
        '.scratchpad-overlay.open{display:flex;pointer-events:auto;}' +
        '.scratchpad-toolbar{position:absolute;top:12px;left:50%;transform:translateX(-50%);display:flex;gap:6px;padding:6px 12px;background:rgba(22,33,62,0.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-radius:12px;z-index:1102;box-shadow:0 4px 16px rgba(0,0,0,0.3);align-items:center;}' +
        '.scratchpad-toolbar button{background:rgba(255,255,255,0.12);border:none;color:#fff;font-size:1.1rem;width:36px;height:36px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.15s;}' +
        '.scratchpad-toolbar button:hover{background:rgba(255,255,255,0.25);}' +
        '.scratchpad-toolbar button.active{background:var(--primary,#e91e8a);}' +
        '.scratchpad-toolbar input[type="color"]{width:32px;height:32px;border:2px solid rgba(255,255,255,0.3);border-radius:8px;cursor:pointer;padding:0;background:none;}' +
        '.scratchpad-toolbar input[type="range"]{width:60px;accent-color:var(--primary,#e91e8a);}' +
        '.scratchpad-toolbar .sp-sep{width:1px;height:24px;background:rgba(255,255,255,0.2);margin:0 4px;}' +
        '.scratchpad-canvas{flex:1;cursor:crosshair;touch-action:none;}';
    document.head.appendChild(style);

    // Inject HTML
    var fab = document.createElement('button');
    fab.className = 'scratchpad-fab';
    fab.id = 'scratchpad-fab';
    fab.title = 'Scratchpad';
    fab.innerHTML = '&#9998;';

    var overlay = document.createElement('div');
    overlay.className = 'scratchpad-overlay';
    overlay.id = 'scratchpad-overlay';
    overlay.innerHTML =
        '<div class="scratchpad-toolbar" id="scratchpad-toolbar">' +
            '<button id="sp-draw" class="active" title="Draw">&#9998;</button>' +
            '<button id="sp-erase" title="Eraser">&#9003;</button>' +
            '<div class="sp-sep"></div>' +
            '<input type="color" id="sp-color" value="#ffffff" title="Colour">' +
            '<input type="range" id="sp-size" min="1" max="20" value="3" title="Brush size">' +
            '<div class="sp-sep"></div>' +
            '<button id="sp-undo" title="Undo (Ctrl+Z)">&#8630;</button>' +
            '<button id="sp-redo" title="Redo (Ctrl+Shift+Z)">&#8631;</button>' +
            '<button id="sp-clear" title="Clear">&#128465;</button>' +
            '<button id="sp-close" title="Close">&#10005;</button>' +
        '</div>' +
        '<canvas class="scratchpad-canvas" id="scratchpad-canvas"></canvas>';

    document.body.appendChild(fab);
    document.body.appendChild(overlay);

    // Logic
    var canvas = document.getElementById('scratchpad-canvas');
    var ctx = canvas.getContext('2d');
    var drawing = false, mode = 'draw', history = [], redoStack = [];

    function resize() {
        var data = canvas.toDataURL();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var img = new Image();
        img.onload = function() { ctx.drawImage(img, 0, 0); };
        img.src = data;
    }
    window.addEventListener('resize', resize);

    function saveState() {
        if (history.length > 40) history.shift();
        history.push(canvas.toDataURL());
        redoStack.length = 0;
    }

    fab.addEventListener('click', function() {
        var open = overlay.classList.toggle('open');
        fab.classList.toggle('active', open);
        if (open) { resize(); saveState(); }
    });

    document.getElementById('sp-close').addEventListener('click', function() {
        overlay.classList.remove('open');
        fab.classList.remove('active');
    });

    document.getElementById('sp-draw').addEventListener('click', function() {
        mode = 'draw';
        this.classList.add('active');
        document.getElementById('sp-erase').classList.remove('active');
        canvas.style.cursor = 'crosshair';
    });
    document.getElementById('sp-erase').addEventListener('click', function() {
        mode = 'erase';
        this.classList.add('active');
        document.getElementById('sp-draw').classList.remove('active');
        canvas.style.cursor = 'cell';
    });

    function restoreState(dataUrl) {
        var img = new Image();
        img.onload = function() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(img, 0, 0); };
        img.src = dataUrl;
    }
    function undo() {
        if (history.length < 2) return;
        redoStack.push(history.pop());
        restoreState(history[history.length - 1]);
    }
    function redo() {
        if (redoStack.length === 0) return;
        var state = redoStack.pop();
        history.push(state);
        restoreState(state);
    }
    document.getElementById('sp-undo').addEventListener('click', undo);
    document.getElementById('sp-redo').addEventListener('click', redo);
    document.addEventListener('keydown', function(e) {
        if (!overlay.classList.contains('open')) return;
        if (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) { e.preventDefault(); redo(); }
        else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); undo(); }
    });
    document.getElementById('sp-clear').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        saveState();
    });

    function getPos(e) {
        var r = canvas.getBoundingClientRect();
        var t = e.touches ? e.touches[0] : e;
        return { x: t.clientX - r.left, y: t.clientY - r.top };
    }

    function startDraw(e) {
        if (e.target.closest('.scratchpad-toolbar')) return;
        drawing = true;
        var p = getPos(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
    }
    function draw(e) {
        if (!drawing) return;
        e.preventDefault();
        var p = getPos(e);
        var sz = +document.getElementById('sp-size').value;
        ctx.lineWidth = mode === 'erase' ? sz * 4 : sz;
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = mode === 'erase' ? 'destination-out' : 'source-over';
        ctx.strokeStyle = document.getElementById('sp-color').value;
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
    function endDraw() {
        if (!drawing) return;
        drawing = false;
        ctx.globalCompositeOperation = 'source-over';
        saveState();
    }

    canvas.addEventListener('pointerdown', startDraw);
    canvas.addEventListener('pointermove', draw);
    canvas.addEventListener('pointerup', endDraw);
    canvas.addEventListener('pointerleave', endDraw);

    // Show FAB via showView integration - expose for external use
    window.P56_SCRATCHPAD = {
        show: function() { fab.style.display = 'flex'; },
        hide: function() {
            fab.style.display = 'none';
            overlay.classList.remove('open');
            fab.classList.remove('active');
        }
    };

    // Auto-show if a view is already active (not hub/dashboard)
    var activeView = document.querySelector('.view.active');
    if (activeView) {
        var hideIds = ['view-hub', 'view-dashboard', 'view-leaderboard'];
        if (hideIds.indexOf(activeView.id) === -1) fab.style.display = 'flex';
    }
})();
