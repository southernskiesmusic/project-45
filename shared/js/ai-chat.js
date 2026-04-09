/* ================================================================
   AI Chat Teacher - Floating chat popup on subject pages
   Self-contained: injects own DOM + styles.
   Pro tier only (+ admin bypass).
   Features: resize, conversation history, 10-min inactivity timeout.
   ================================================================ */
(function () {
    'use strict';

    /* ── gate: any signed-in user ─────────────────────────────── */
    function canUseAI() {
        if (subjectKey() === 'hub') return true;
        if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) return true;
        return false;
    }

    /* ── state ─────────────────────────────────────────────────── */
    var _history = [];   // { role:'user'|'model', text:'' }
    var _open = false;
    var _sending = false;
    var _fns = null;
    var _activeConvoId = null;    // current conversation ID
    var _lastActivity = 0;        // timestamp of last send/receive
    var _inactivityTimer = null;
    var _viewingHistory = false;   // true when showing past conversations list
    var INACTIVITY_MS = 10 * 60 * 1000; // 10 minutes
    var STORAGE_KEY = 'p56_ai_conversations';

    function getFns() {
        if (!_fns) _fns = firebase.functions();
        return _fns;
    }

    function subjectKey() {
        return window.SUBJECT_KEY || 'general';
    }
    function subjectLabel() {
        var key = subjectKey();
        return key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ');
    }

    var TUTOR_NAMES = { physics: 'AInstein', hub: 'P56 Assistant' };
    function tutorGreeting() {
        var key = subjectKey();
        if (key === 'hub') return 'Hi! Ask me about Project 56!';
        var name = TUTOR_NAMES[key];
        return name
            ? 'Hi! I\'m ' + name + ', your ' + subjectLabel() + ' tutor'
            : 'Hi! I\'m your ' + subjectLabel() + ' tutor';
    }

    /* ── conversation persistence ─────────────────────────────── */
    function loadConversations() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
        catch(e) { return []; }
    }
    function saveConversations(convos) {
        // Keep only the latest 30 conversations
        if (convos.length > 30) convos = convos.slice(-30);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(convos));
    }
    function saveCurrentConvo() {
        if (!_activeConvoId || _history.length === 0) return;
        var convos = loadConversations();
        var idx = -1;
        for (var i = 0; i < convos.length; i++) {
            if (convos[i].id === _activeConvoId) { idx = i; break; }
        }
        var entry = {
            id: _activeConvoId,
            subject: subjectKey(),
            messages: _history.slice(),
            updatedAt: Date.now(),
            preview: _history[0] ? _history[0].text.substring(0, 60) : ''
        };
        if (idx >= 0) convos[idx] = entry;
        else convos.push(entry);
        saveConversations(convos);
    }
    function startNewConvo() {
        // Save any existing conversation first
        saveCurrentConvo();
        _activeConvoId = 'convo_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
        _history = [];
        _lastActivity = Date.now();
        resetInactivityTimer();
    }
    function archiveAndReset() {
        saveCurrentConvo();
        _activeConvoId = null;
        _history = [];
        clearTimeout(_inactivityTimer);
        // Show timeout message in chat
        var msgs = document.getElementById('ai-chat-msgs');
        if (msgs && !_viewingHistory) {
            msgs.innerHTML =
                '<div class="ai-chat-welcome">' +
                    '<strong>Session timed out</strong>' +
                    'Your conversation was saved.<br>Send a message to start a new one.' +
                '</div>';
        }
    }

    /* ── inactivity timer ─────────────────────────────────────── */
    function resetInactivityTimer() {
        clearTimeout(_inactivityTimer);
        if (_history.length > 0) {
            _inactivityTimer = setTimeout(archiveAndReset, INACTIVITY_MS);
        }
    }
    function touchActivity() {
        _lastActivity = Date.now();
        resetInactivityTimer();
    }

    /* ── render LaTeX via KaTeX (if loaded) ──────────────────── */
    function renderLatex(latex, displayMode) {
        if (typeof katex !== 'undefined') {
            try { return katex.renderToString(latex, { throwOnError: false, displayMode: !!displayMode }); }
            catch (e) { return '<code>' + latex + '</code>'; }
        }
        return '<code>' + latex + '</code>';
    }

    /* ── markdown + LaTeX → html ───────────────────────────────── */
    function md(text) {
        // Protect math blocks with placeholders before markdown processing
        var mathBlocks = [];
        text = text.replace(/\$\$([\s\S]+?)\$\$/g, function(_, l) { mathBlocks.push(renderLatex(l.trim(), true)); return '%%M' + (mathBlocks.length - 1) + '%%'; });
        text = text.replace(/\$(.+?)\$/g, function(_, l) { mathBlocks.push(renderLatex(l.trim(), false)); return '%%M' + (mathBlocks.length - 1) + '%%'; });
        text = text.replace(/\\\[([\s\S]+?)\\\]/g, function(_, l) { mathBlocks.push(renderLatex(l.trim(), true)); return '%%M' + (mathBlocks.length - 1) + '%%'; });
        text = text.replace(/\\\((.+?)\\\)/g, function(_, l) { mathBlocks.push(renderLatex(l.trim(), false)); return '%%M' + (mathBlocks.length - 1) + '%%'; });

        text = text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`(.+?)`/g, '<code>$1</code>')
            .replace(/^\s*[-\u2022]\s+/gm, '<br>&bull; ')
            .replace(/^\s*(\d+)\.\s+/gm, '<br>$1. ')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');

        // Restore math
        text = text.replace(/%%M(\d+)%%/g, function(_, i) { return mathBlocks[parseInt(i, 10)]; });
        return text;
    }

    /* ── inject styles ────────────────────────────────────────── */
    function injectStyles() {
        var s = document.createElement('style');
        s.textContent = [
            /* FAB */
            '#ai-chat-fab{position:fixed;bottom:90px;right:24px;z-index:9998;width:52px;height:52px;',
            'border-radius:50%;border:none;cursor:pointer;',
            'background:linear-gradient(135deg,#6c63ff,#3b82f6);color:#fff;',
            'box-shadow:0 4px 20px rgba(108,99,255,.4);',
            'display:flex;align-items:center;justify-content:center;',
            'transition:transform .2s,box-shadow .2s;font-family:inherit;}',
            '#ai-chat-fab:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(108,99,255,.55);}',
            '#ai-chat-fab svg{width:26px;height:26px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',
            '#ai-chat-fab .fab-badge{position:absolute;top:-2px;right:-2px;width:14px;height:14px;',
            'border-radius:50%;background:#22c55e;border:2px solid #fff;}',

            /* Panel */
            '#ai-chat-panel{position:fixed;bottom:152px;right:24px;z-index:9999;',
            'width:360px;height:520px;border-radius:16px;overflow:hidden;',
            'display:none;flex-direction:column;',
            'background:#fff;border:1px solid #e0e0e0;',
            'box-shadow:0 12px 48px rgba(0,0,0,.18);font-family:inherit;',
            'min-width:280px;min-height:300px;max-width:90vw;max-height:85vh;}',
            '#ai-chat-panel.open{display:flex;}',

            /* Resize handle - top-left corner */
            '.ai-chat-resize{position:absolute;top:0;left:0;width:18px;height:18px;cursor:nw-resize;z-index:10;',
            'opacity:0;transition:opacity .2s;}',
            '#ai-chat-panel:hover .ai-chat-resize{opacity:1;}',
            '.ai-chat-resize::before{content:"";position:absolute;top:3px;left:3px;width:8px;height:8px;',
            'border-top:2px solid rgba(255,255,255,.6);border-left:2px solid rgba(255,255,255,.6);}',
            '#ai-chat-panel.resizing{user-select:none;transition:none;}',
            '#ai-chat-panel.resizing *{user-select:none;}',

            /* Header */
            '.ai-chat-hdr{display:flex;align-items:center;justify-content:space-between;',
            'padding:14px 16px;background:linear-gradient(135deg,#6c63ff,#3b82f6);color:#fff;flex-shrink:0;}',
            '.ai-chat-hdr-left{display:flex;align-items:center;gap:8px;}',
            '.ai-chat-hdr-title{font-weight:700;font-size:.95rem;}',
            '.ai-chat-hdr-sub{font-size:.72rem;opacity:.8;margin-top:1px;}',
            '.ai-chat-hdr-btns{display:flex;align-items:center;gap:4px;}',
            '.ai-chat-hdr-btn{background:none;border:none;color:#fff;cursor:pointer;font-size:1.1rem;',
            'padding:2px 6px;line-height:1;opacity:.7;transition:opacity .15s;border-radius:4px;}',
            '.ai-chat-hdr-btn:hover{opacity:1;background:rgba(255,255,255,.15);}',
            '.ai-chat-hdr-btn.active{opacity:1;background:rgba(255,255,255,.2);}',
            '.ai-chat-close{background:none;border:none;color:#fff;cursor:pointer;font-size:1.3rem;',
            'padding:0 2px;line-height:1;opacity:.8;transition:opacity .15s;}',
            '.ai-chat-close:hover{opacity:1;}',

            /* Messages */
            '.ai-chat-msgs{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:10px;',
            'min-height:0;scroll-behavior:smooth;}',
            '.ai-chat-msg{max-width:85%;padding:10px 14px;border-radius:14px;font-size:.85rem;line-height:1.5;word-wrap:break-word;}',
            '.ai-chat-msg.user{align-self:flex-end;background:var(--primary,#6c63ff);color:#fff;border-bottom-right-radius:4px;}',
            '.ai-chat-msg.ai{align-self:flex-start;background:#f3f4f6;color:#1a1a2e;border-bottom-left-radius:4px;}',
            '.ai-chat-msg.ai code{background:rgba(0,0,0,.08);padding:1px 4px;border-radius:3px;font-size:.82em;}',
            '.ai-chat-msg.error{color:#e74c3c;font-style:italic;font-size:.8rem;}',

            /* Welcome */
            '.ai-chat-welcome{text-align:center;padding:20px 16px;color:#888;font-size:.82rem;line-height:1.6;}',
            '.ai-chat-welcome strong{display:block;font-size:.95rem;color:#333;margin-bottom:6px;}',

            /* Typing indicator */
            '.ai-chat-typing{align-self:flex-start;display:flex;gap:4px;padding:10px 16px;}',
            '.ai-chat-typing span{width:7px;height:7px;border-radius:50%;background:#aaa;',
            'animation:ai-dot-pulse .9s ease-in-out infinite;}',
            '.ai-chat-typing span:nth-child(2){animation-delay:.15s;}',
            '.ai-chat-typing span:nth-child(3){animation-delay:.3s;}',
            '@keyframes ai-dot-pulse{0%,80%,100%{opacity:.3;transform:scale(.85)}40%{opacity:1;transform:scale(1.1)}}',

            /* Input */
            '.ai-chat-input-row{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e0e0e0;',
            'background:#fff;flex-shrink:0;}',
            '.ai-chat-input{flex:1;border:1px solid #ddd;border-radius:10px;padding:9px 14px;',
            'font-size:.85rem;font-family:inherit;outline:none;background:#fff;color:#333;',
            'transition:border-color .15s;}',
            '.ai-chat-input:focus{border-color:var(--primary,#6c63ff);}',
            '.ai-chat-send{width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;',
            'background:var(--primary,#6c63ff);color:#fff;display:flex;align-items:center;justify-content:center;',
            'transition:opacity .15s;flex-shrink:0;}',
            '.ai-chat-send:disabled{opacity:.4;cursor:default;}',
            '.ai-chat-send svg{width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',

            /* History list */
            '.ai-chat-history{flex:1;overflow-y:auto;padding:8px;min-height:0;}',
            '.ai-chat-history-item{padding:10px 12px;border-radius:10px;cursor:pointer;margin-bottom:4px;',
            'border:1px solid #e8e8e8;transition:background .15s;}',
            '.ai-chat-history-item:hover{background:rgba(108,99,255,.06);}',
            '.ai-chat-history-preview{font-size:.82rem;color:#333;white-space:nowrap;',
            'overflow:hidden;text-overflow:ellipsis;font-weight:600;}',
            '.ai-chat-history-meta{font-size:.7rem;color:#888;margin-top:3px;',
            'display:flex;justify-content:space-between;}',
            '.ai-chat-history-empty{text-align:center;padding:30px 16px;color:#888;font-size:.82rem;}',
            '.ai-chat-history-new{display:block;width:100%;padding:10px;margin-bottom:8px;',
            'border:none;border-radius:10px;cursor:pointer;font-family:inherit;font-size:.82rem;font-weight:600;',
            'background:linear-gradient(135deg,#6c63ff,#3b82f6);color:#fff;transition:opacity .15s;}',
            '.ai-chat-history-new:hover{opacity:.9;}',
            '.ai-chat-history-del{background:none;border:none;cursor:pointer;color:#aaa;',
            'font-size:.8rem;padding:2px 4px;transition:color .15s;}',
            '.ai-chat-history-del:hover{color:var(--error,#e74c3c);}',

            /* Nudge speech bubble */
            '.ai-chat-nudge{position:fixed;bottom:148px;right:24px;z-index:9997;',
            'background:#fff;color:#333;font-size:.82rem;line-height:1.4;',
            'padding:10px 14px;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,.12);',
            'max-width:220px;cursor:pointer;opacity:0;transform:translateY(8px);',
            'transition:opacity .3s,transform .3s;pointer-events:none;border:1px solid #e0e0e0;}',
            '.ai-chat-nudge.show{opacity:1;transform:translateY(0);pointer-events:auto;}',
            '.ai-chat-nudge::after{content:"";position:absolute;bottom:-7px;right:20px;',
            'width:14px;height:14px;background:#fff;border-right:1px solid #e0e0e0;',
            'border-bottom:1px solid #e0e0e0;transform:rotate(45deg);}',

            /* mobile */
            '@media(max-width:480px){',
            '#ai-chat-panel{right:8px;left:8px;bottom:78px;width:auto;max-height:70vh;}',
            '#ai-chat-fab{bottom:82px;right:16px;width:46px;height:46px;}',
            '.ai-chat-nudge{bottom:134px;right:16px;max-width:200px;}',
            '}'
        ].join('');
        document.head.appendChild(s);
    }

    /* ── inject DOM ───────────────────────────────────────────── */
    function injectDOM() {
        /* FAB */
        var fab = document.createElement('button');
        fab.id = 'ai-chat-fab';
        fab.title = 'Ask AI Teacher';
        fab.innerHTML =
            '<svg viewBox="0 0 24 24">' +
            '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' +
            '<path d="M8 10h.01M12 10h.01M16 10h.01" stroke-width="3"/>' +
            '</svg>' +
            '<span class="fab-badge"></span>';

        /* Panel */
        var panel = document.createElement('div');
        panel.id = 'ai-chat-panel';
        panel.innerHTML =
            '<div class="ai-chat-resize" id="ai-chat-resize"></div>' +
            '<div class="ai-chat-hdr">' +
                '<div class="ai-chat-hdr-left">' +
                    '<div><div class="ai-chat-hdr-title">' + (TUTOR_NAMES[subjectKey()] || 'AI Teacher') + '</div>' +
                    '<div class="ai-chat-hdr-sub">' + subjectLabel() + '</div></div>' +
                '</div>' +
                '<div class="ai-chat-hdr-btns">' +
                    '<button class="ai-chat-hdr-btn" id="ai-chat-history-btn" title="Past conversations">&#x1f4cb;</button>' +
                    '<button class="ai-chat-close" id="ai-chat-close">&times;</button>' +
                '</div>' +
            '</div>' +
            '<div class="ai-chat-msgs" id="ai-chat-msgs">' +
                '<div class="ai-chat-welcome">' +
                    '<strong>' + tutorGreeting() + '</strong>' +
                    (subjectKey() === 'hub'
                        ? 'I can help you navigate subjects, find activities, or answer questions about the platform.'
                        : 'Ask me anything about ' + subjectLabel().toLowerCase() + '.<br>' +
                          'I\'ll guide you through concepts step by step.') +
                '</div>' +
            '</div>' +
            '<div class="ai-chat-history" id="ai-chat-history" style="display:none;"></div>' +
            '<div class="ai-chat-input-row" id="ai-chat-input-row">' +
                '<input class="ai-chat-input" id="ai-chat-input" type="text" placeholder="Ask a question..." autocomplete="off" maxlength="500">' +
                '<button class="ai-chat-send" id="ai-chat-send" title="Send">' +
                    '<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
                '</button>' +
            '</div>';

        /* Nudge bubble */
        var nudge = document.createElement('div');
        nudge.className = 'ai-chat-nudge';
        nudge.textContent = 'Hello! Stuck on a question, concept, or topic? Just ask me!';
        nudge.addEventListener('click', function() {
            nudge.classList.remove('show');
            togglePanel();
        });

        document.body.appendChild(fab);
        document.body.appendChild(panel);
        document.body.appendChild(nudge);

        /* Nudge timer - show every 10 min if chat is closed */
        var NUDGE_MS = 10 * 60 * 1000;
        var _nudgeTimer = setInterval(function() {
            if (_open) return;
            nudge.classList.add('show');
            setTimeout(function() { nudge.classList.remove('show'); }, 8000);
        }, NUDGE_MS);

        /* Wire events */
        fab.addEventListener('click', function() {
            nudge.classList.remove('show');
            togglePanel();
        });
        document.getElementById('ai-chat-close').addEventListener('click', closePanel);
        document.getElementById('ai-chat-send').addEventListener('click', send);
        document.getElementById('ai-chat-input').addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
        });
        document.getElementById('ai-chat-history-btn').addEventListener('click', toggleHistory);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && _open) closePanel();
        });

        /* Resize from top-left corner */
        var resizeHandle = document.getElementById('ai-chat-resize');
        var _resizing = false, _startX, _startY, _startW, _startH, _startRight, _startBottom;
        resizeHandle.addEventListener('mousedown', startResize);
        resizeHandle.addEventListener('touchstart', startResize, { passive: false });

        function startResize(e) {
            e.preventDefault();
            e.stopPropagation();
            _resizing = true;
            var pt = e.touches ? e.touches[0] : e;
            var rect = panel.getBoundingClientRect();
            _startX = pt.clientX;
            _startY = pt.clientY;
            _startW = rect.width;
            _startH = rect.height;
            _startRight = window.innerWidth - rect.right;
            _startBottom = window.innerHeight - rect.bottom;
            panel.classList.add('resizing');
            document.addEventListener('mousemove', onResize);
            document.addEventListener('mouseup', stopResize);
            document.addEventListener('touchmove', onResize, { passive: false });
            document.addEventListener('touchend', stopResize);
        }
        function onResize(e) {
            if (!_resizing) return;
            e.preventDefault();
            var pt = e.touches ? e.touches[0] : e;
            var dx = _startX - pt.clientX;
            var dy = _startY - pt.clientY;
            var newW = Math.max(280, Math.min(window.innerWidth * 0.9, _startW + dx));
            var newH = Math.max(300, Math.min(window.innerHeight * 0.85, _startH + dy));
            panel.style.width = newW + 'px';
            panel.style.height = newH + 'px';
            panel.style.right = _startRight + 'px';
            panel.style.bottom = _startBottom + 'px';
        }
        function stopResize() {
            _resizing = false;
            panel.classList.remove('resizing');
            document.removeEventListener('mousemove', onResize);
            document.removeEventListener('mouseup', stopResize);
            document.removeEventListener('touchmove', onResize);
            document.removeEventListener('touchend', stopResize);
        }
    }

    /* ── panel toggle ─────────────────────────────────────────── */
    function togglePanel() {
        _open ? closePanel() : openPanel();
    }
    function openPanel() {
        _open = true;
        _viewingHistory = false;
        var nb = document.querySelector('.ai-chat-nudge');
        if (nb) nb.classList.remove('show');
        document.getElementById('ai-chat-panel').classList.add('open');
        document.getElementById('ai-chat-fab').querySelector('.fab-badge').style.display = 'none';
        showChatView();
        setTimeout(function () { document.getElementById('ai-chat-input').focus(); }, 100);
    }
    function closePanel() {
        _open = false;
        _viewingHistory = false;
        saveCurrentConvo();
        document.getElementById('ai-chat-panel').classList.remove('open');
    }

    /* ── history view ─────────────────────────────────────────── */
    function toggleHistory() {
        if (_viewingHistory) {
            showChatView();
        } else {
            showHistoryView();
        }
    }
    function showChatView() {
        _viewingHistory = false;
        document.getElementById('ai-chat-msgs').style.display = 'flex';
        document.getElementById('ai-chat-history').style.display = 'none';
        document.getElementById('ai-chat-input-row').style.display = 'flex';
        document.getElementById('ai-chat-history-btn').classList.remove('active');
    }
    function showHistoryView() {
        _viewingHistory = true;
        saveCurrentConvo();
        document.getElementById('ai-chat-msgs').style.display = 'none';
        document.getElementById('ai-chat-history').style.display = 'block';
        document.getElementById('ai-chat-input-row').style.display = 'none';
        document.getElementById('ai-chat-history-btn').classList.add('active');
        renderHistoryList();
    }
    function renderHistoryList() {
        var container = document.getElementById('ai-chat-history');
        var convos = loadConversations().filter(function(c) { return c.messages && c.messages.length > 0; });
        convos.sort(function(a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });

        var html = '<button class="ai-chat-history-new" id="ai-chat-new-btn">+ New conversation</button>';

        if (convos.length === 0) {
            html += '<div class="ai-chat-history-empty">No past conversations yet.</div>';
        } else {
            convos.forEach(function(c) {
                var date = new Date(c.updatedAt || 0);
                var timeStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
                    ' ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
                var msgCount = c.messages ? c.messages.length : 0;
                var subj = (c.subject || 'general').charAt(0).toUpperCase() + (c.subject || 'general').slice(1);
                html += '<div class="ai-chat-history-item" data-convo-id="' + c.id + '">' +
                    '<div class="ai-chat-history-preview">' + escHtml(c.preview || 'Conversation') + '</div>' +
                    '<div class="ai-chat-history-meta">' +
                        '<span>' + subj + ' &middot; ' + msgCount + ' msgs</span>' +
                        '<span>' + timeStr +
                            ' <button class="ai-chat-history-del" data-del-id="' + c.id + '" title="Delete">&times;</button>' +
                        '</span>' +
                    '</div>' +
                '</div>';
            });
        }

        container.innerHTML = html;

        // Wire events
        document.getElementById('ai-chat-new-btn').addEventListener('click', function() {
            startNewConvo();
            showChatView();
            renderWelcome();
        });

        container.querySelectorAll('.ai-chat-history-item').forEach(function(item) {
            item.addEventListener('click', function(e) {
                if (e.target.classList.contains('ai-chat-history-del')) return;
                var id = item.getAttribute('data-convo-id');
                loadConvo(id);
            });
        });

        container.querySelectorAll('.ai-chat-history-del').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var id = btn.getAttribute('data-del-id');
                deleteConvo(id);
            });
        });
    }
    function loadConvo(id) {
        var convos = loadConversations();
        var found = null;
        for (var i = 0; i < convos.length; i++) {
            if (convos[i].id === id) { found = convos[i]; break; }
        }
        if (!found) return;

        // Save current first
        saveCurrentConvo();

        _activeConvoId = found.id;
        _history = found.messages ? found.messages.slice() : [];
        _lastActivity = Date.now();
        resetInactivityTimer();

        showChatView();

        // Re-render messages
        var msgs = document.getElementById('ai-chat-msgs');
        msgs.innerHTML = '';
        _history.forEach(function(h) {
            var role = h.role === 'model' ? 'ai' : 'user';
            var div = document.createElement('div');
            div.className = 'ai-chat-msg ' + role;
            div.innerHTML = role === 'ai' ? md(h.text) : escHtml(h.text);
            msgs.appendChild(div);
        });
        msgs.scrollTop = msgs.scrollHeight;
        setTimeout(function () { document.getElementById('ai-chat-input').focus(); }, 100);
    }
    function deleteConvo(id) {
        var convos = loadConversations();
        convos = convos.filter(function(c) { return c.id !== id; });
        saveConversations(convos);
        if (_activeConvoId === id) {
            _activeConvoId = null;
            _history = [];
        }
        renderHistoryList();
    }
    function renderWelcome() {
        var msgs = document.getElementById('ai-chat-msgs');
        msgs.innerHTML =
            '<div class="ai-chat-welcome">' +
                '<strong>' + tutorGreeting() + '</strong>' +
                (subjectKey() === 'hub'
                    ? 'I can help you navigate subjects, find activities, or answer questions about the platform.'
                    : 'Ask me anything about ' + subjectLabel().toLowerCase() + '.<br>' +
                      'I\'ll guide you through concepts step by step.') +
            '</div>';
    }

    /* ── add message to chat ──────────────────────────────────── */
    function addMsg(text, role) {
        var msgs = document.getElementById('ai-chat-msgs');
        // Remove welcome on first message
        var welcome = msgs.querySelector('.ai-chat-welcome');
        if (welcome) welcome.remove();

        var div = document.createElement('div');
        div.className = 'ai-chat-msg ' + role;
        div.innerHTML = role === 'ai' ? md(text) : escHtml(text);
        msgs.appendChild(div);
        msgs.scrollTop = msgs.scrollHeight;
        return div;
    }
    function addTyping() {
        var msgs = document.getElementById('ai-chat-msgs');
        var t = document.createElement('div');
        t.className = 'ai-chat-typing';
        t.id = 'ai-chat-typing';
        t.innerHTML = '<span></span><span></span><span></span>';
        msgs.appendChild(t);
        msgs.scrollTop = msgs.scrollHeight;
    }
    function removeTyping() {
        var t = document.getElementById('ai-chat-typing');
        if (t) t.remove();
    }
    function escHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    /* ── send message ─────────────────────────────────────────── */
    function send() {
        if (_sending) return;
        var input = document.getElementById('ai-chat-input');
        var text = input.value.trim();
        if (!text) return;

        // Start a new conversation if none active
        if (!_activeConvoId) {
            startNewConvo();
        }

        input.value = '';
        addMsg(text, 'user');
        _history.push({ role: 'user', text: text });
        touchActivity();

        _sending = true;
        document.getElementById('ai-chat-send').disabled = true;
        addTyping();

        var chatFn = getFns().httpsCallable('aiChat');
        chatFn({
            subject: subjectKey(),
            message: text,
            history: _history.slice(-20)
        }).then(function (result) {
            removeTyping();
            addMsg(result.data.reply, 'ai');
            _history.push({ role: 'model', text: result.data.reply });
            touchActivity();
            saveCurrentConvo();
            _sending = false;
            document.getElementById('ai-chat-send').disabled = false;
            input.focus();
        }).catch(function (err) {
            removeTyping();
            var msg = (err && err.message) || 'Something went wrong';
            var div = addMsg(msg, 'ai');
            div.classList.add('error');
            _sending = false;
            document.getElementById('ai-chat-send').disabled = false;
            input.focus();
        });
    }

    /* ── init ──────────────────────────────────────────────────── */
    function init() {
        // Hub page: show immediately, no premium gate
        if (subjectKey() === 'hub') {
            injectStyles(); injectDOM(); return;
        }
        // Wait for Premium to be ready
        if (typeof Premium === 'undefined' || !Premium._ready) {
            var attempts = 0;
            var poll = setInterval(function () {
                attempts++;
                if (attempts > 40) { clearInterval(poll); return; }
                if (typeof Premium !== 'undefined' && Premium._ready) {
                    clearInterval(poll);
                    if (canUseAI()) { injectStyles(); injectDOM(); }
                }
            }, 200);
            return;
        }
        if (canUseAI()) { injectStyles(); injectDOM(); }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
