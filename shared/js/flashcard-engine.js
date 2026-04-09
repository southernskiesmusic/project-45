/* ================================================================
   FlashcardEngine - Shared flashcard UI for all subjects
   Requires: SRS (shared/js/srs.js)
   ================================================================ */
const FlashcardEngine = {
    _subjectKey: null,
    _cards: [],
    _currentDeck: [],
    _currentIndex: 0,
    _flipped: false,
    _container: null,
    _mode: 'dashboard', // dashboard | study | browse

    init(subjectKey, cardData) {
        this._subjectKey = subjectKey;
        this._cards = cardData || [];
        SRS.load(subjectKey + '_srsData');

        // Register all cards with SRS (so stats include unseen cards)
        this._cards.forEach(c => SRS.getItem(c.id));
        SRS.save();
    },

    _isProTier() {
        try {
            if (typeof Premium !== 'undefined') return Premium.getTier() === 'pro' || Premium._role === 'owner' || Premium._role === 'admin' || Premium._role === 'Developer';
            var role = localStorage.getItem('roleCache');
            if (role === 'owner' || role === 'admin' || role === 'Developer') return true;
            var s = JSON.parse(localStorage.getItem('premiumCache'));
            if (s && s.active) { var p = s.plan || 'student'; return p === 'standard' || p === 'pro'; }
            var sl = JSON.parse(localStorage.getItem('schoolLicenseCache'));
            if (sl && sl.active && sl.tier === 'school_pro') return true;
        } catch(e) {}
        return false;
    },

    show() {
        this._container = document.getElementById('fc-container');
        if (!this._container) return;
        if (!this._isProTier()) {
            this._container.innerHTML =
                '<div style="text-align:center;padding:60px 20px;">' +
                '<div style="font-size:3rem;margin-bottom:16px;">&#x1F512;</div>' +
                '<h3 style="margin-bottom:8px;">Pro Feature</h3>' +
                '<p style="color:var(--text-light);margin-bottom:20px;">Upgrade to Pro to unlock Flashcards with spaced repetition.</p>' +
                '<a href="../hub.html#pricing" style="display:inline-block;background:#4361ee;color:#fff;padding:12px 28px;border-radius:12px;font-weight:700;text-decoration:none;">Upgrade to Pro</a></div>';
            return;
        }
        this._mode = 'dashboard';
        this._renderDashboard();
    },

    /* ---------- Dashboard ---------- */
    _renderDashboard() {
        const stats = SRS.getStats('');
        const totalCards = this._cards.length;
        const dueCount = this._cards.filter(c => SRS.isDue(c.id)).length;

        // Group by topic
        const topics = {};
        this._cards.forEach(c => {
            if (!topics[c.topic]) topics[c.topic] = { cards: [], due: 0 };
            topics[c.topic].cards.push(c);
            if (SRS.isDue(c.id)) topics[c.topic].due++;
        });

        this._container.innerHTML = `
            <div class="fc-dashboard">
                <div class="fc-stats-bar">
                    <div class="fc-stat fc-stat-new"><span class="fc-stat-num">${stats.new}</span><span class="fc-stat-label">New</span></div>
                    <div class="fc-stat fc-stat-learning"><span class="fc-stat-num">${stats.learning}</span><span class="fc-stat-label">Learning</span></div>
                    <div class="fc-stat fc-stat-reviewing"><span class="fc-stat-num">${stats.reviewing}</span><span class="fc-stat-label">Reviewing</span></div>
                    <div class="fc-stat fc-stat-mastered"><span class="fc-stat-num">${stats.mastered}</span><span class="fc-stat-label">Mastered</span></div>
                </div>
                <div class="fc-progress-bar">
                    <div class="fc-progress-fill" style="width:${totalCards ? (stats.mastered / totalCards * 100) : 0}%"></div>
                </div>
                <p class="fc-progress-text">${stats.mastered} / ${totalCards} cards mastered</p>
                <button class="btn fc-study-btn" ${dueCount === 0 ? 'disabled' : ''}>${dueCount > 0 ? `Study ${dueCount} Due Card${dueCount !== 1 ? 's' : ''}` : 'All caught up!'}</button>
                <button class="btn btn-hint fc-study-all-btn">Study All Cards</button>
                <h3 class="fc-section-title">Decks</h3>
                <div class="fc-deck-list">
                    ${Object.entries(topics).map(([topic, data]) => `
                        <div class="fc-deck-item" data-topic="${topic}">
                            <span class="fc-deck-name">${this._topicLabel(topic)}</span>
                            <span class="fc-deck-count">${data.due > 0 ? `<strong>${data.due}</strong> due` : '<span class="fc-deck-done">done</span>'} &middot; ${data.cards.length} cards</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Event listeners
        this._container.querySelector('.fc-study-btn')?.addEventListener('click', () => {
            const due = this._cards.filter(c => SRS.isDue(c.id));
            if (due.length) this._startStudy(due);
        });
        this._container.querySelector('.fc-study-all-btn')?.addEventListener('click', () => {
            this._startStudy([...this._cards]);
        });
        this._container.querySelectorAll('.fc-deck-item').forEach(el => {
            el.addEventListener('click', () => {
                const topic = el.dataset.topic;
                const topicCards = this._cards.filter(c => c.topic === topic);
                this._startStudy(topicCards);
            });
        });
    },

    /* ---------- Study Session ---------- */
    _startStudy(cards) {
        // Shuffle
        this._currentDeck = cards.sort(() => Math.random() - 0.5);
        this._currentIndex = 0;
        this._flipped = false;
        this._mode = 'study';
        this._renderCard();
        this._bindKeys();
    },

    _renderCard() {
        if (this._currentIndex >= this._currentDeck.length) {
            this._renderComplete();
            return;
        }

        const card = this._currentDeck[this._currentIndex];
        const level = SRS.getLevel(card.id);
        const progress = `${this._currentIndex + 1} / ${this._currentDeck.length}`;

        this._container.innerHTML = `
            <div class="fc-study">
                <div class="fc-study-header">
                    <button class="btn btn-hint fc-exit-btn">&larr; Back</button>
                    <span class="fc-progress">${progress}</span>
                    <span class="fc-level fc-level-${level}">${level}</span>
                </div>
                <div class="fc-card ${this._flipped ? 'fc-card-flipped' : ''}" id="fc-card">
                    <div class="fc-card-inner">
                        <div class="fc-card-front">
                            <p>${card.front}</p>
                        </div>
                        <div class="fc-card-back">
                            <p>${card.back}</p>
                        </div>
                    </div>
                </div>
                ${this._flipped ? `
                <div class="fc-assess-row">
                    <button class="btn fc-btn-again" data-quality="1">Again</button>
                    <button class="btn fc-btn-hard" data-quality="2">Hard</button>
                    <button class="btn fc-btn-good" data-quality="3">Good</button>
                    <button class="btn fc-btn-easy" data-quality="5">Easy</button>
                </div>
                ` : `
                <p class="fc-tap-hint">Click card or press Space to reveal</p>
                `}
            </div>
        `;

        // Render math if available
        this._renderMath();

        // Card click to flip
        const cardEl = document.getElementById('fc-card');
        if (cardEl && !this._flipped) {
            cardEl.addEventListener('click', () => this._flipCard());
        }

        // Assessment buttons
        this._container.querySelectorAll('.fc-assess-row .btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const quality = parseInt(btn.dataset.quality);
                this._rateCard(quality);
            });
        });

        // Exit button
        this._container.querySelector('.fc-exit-btn')?.addEventListener('click', () => {
            this._unbindKeys();
            this.show();
        });
    },

    _flipCard() {
        if (this._flipped) return;
        this._flipped = true;
        this._renderCard();
    },

    _rateCard(quality) {
        const card = this._currentDeck[this._currentIndex];
        SRS.review(card.id, quality);
        this._flipped = false;
        this._currentIndex++;
        this._renderCard();
    },

    _renderComplete() {
        this._unbindKeys();
        const stats = SRS.getStats('');
        this._container.innerHTML = `
            <div class="fc-complete">
                <div class="fc-complete-icon">&#10003;</div>
                <h2>Session Complete!</h2>
                <p>You reviewed ${this._currentDeck.length} card${this._currentDeck.length !== 1 ? 's' : ''}.</p>
                <div class="fc-stats-bar">
                    <div class="fc-stat fc-stat-new"><span class="fc-stat-num">${stats.new}</span><span class="fc-stat-label">New</span></div>
                    <div class="fc-stat fc-stat-learning"><span class="fc-stat-num">${stats.learning}</span><span class="fc-stat-label">Learning</span></div>
                    <div class="fc-stat fc-stat-reviewing"><span class="fc-stat-num">${stats.reviewing}</span><span class="fc-stat-label">Reviewing</span></div>
                    <div class="fc-stat fc-stat-mastered"><span class="fc-stat-num">${stats.mastered}</span><span class="fc-stat-label">Mastered</span></div>
                </div>
                <button class="btn fc-study-btn fc-done-btn">Back to Dashboard</button>
            </div>
        `;
        this._container.querySelector('.fc-done-btn')?.addEventListener('click', () => this.show());
    },

    /* ---------- Keyboard handling ---------- */
    _keyHandler: null,

    _bindKeys() {
        this._keyHandler = (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!this._flipped) this._flipCard();
            } else if (this._flipped) {
                if (e.key === '1') this._rateCard(1);
                else if (e.key === '2') this._rateCard(2);
                else if (e.key === '3') this._rateCard(3);
                else if (e.key === '4') this._rateCard(5);
            }
        };
        document.addEventListener('keydown', this._keyHandler);
    },

    _unbindKeys() {
        if (this._keyHandler) {
            document.removeEventListener('keydown', this._keyHandler);
            this._keyHandler = null;
        }
    },

    /* ---------- Math rendering ---------- */
    _renderMath() {
        if (typeof renderMathInElement === 'function') {
            try { renderMathInElement(this._container, { delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: true }
            ], ignoredTags: ['script','noscript','style','textarea','pre','code','select','option'] }); } catch (e) { /* KaTeX not loaded */ }
        }
    },

    /* ---------- Helpers ---------- */
    _topicLabel(topic) {
        return topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
};
