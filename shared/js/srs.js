/* ================================================================
   SRS - SM-2 Spaced Repetition Engine (shared across all subjects)
   Ported from Japanese Learning Guide
   ================================================================ */
const SRS = {
    data: {},
    _storageKey: null,

    load(storageKey) {
        this._storageKey = storageKey;
        try { this.data = JSON.parse(localStorage.getItem(storageKey) || '{}'); }
        catch (e) { this.data = {}; }
    },

    save() {
        if (this._storageKey) {
            localStorage.setItem(this._storageKey, JSON.stringify(this.data));
        }
    },

    getItem(key) {
        if (!this.data[key]) {
            this.data[key] = {
                interval: 0,
                repetition: 0,
                efactor: 2.5,
                nextReview: 0,
                level: 'new'
            };
        }
        return this.data[key];
    },

    review(key, quality) {
        // quality: 0-5 (0=total blackout, 5=perfect)
        const item = this.getItem(key);

        if (quality >= 3) {
            if (item.repetition === 0) item.interval = 1;
            else if (item.repetition === 1) item.interval = 6;
            else item.interval = Math.round(item.interval * item.efactor);
            item.repetition++;
        } else {
            item.repetition = 0;
            item.interval = 0;
        }

        item.efactor = Math.max(1.3,
            item.efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

        item.nextReview = Date.now() + item.interval * 86400000;

        if (item.repetition === 0) item.level = 'learning';
        else if (item.repetition <= 1) item.level = 'learning';
        else if (item.repetition <= 4) item.level = 'reviewing';
        else item.level = 'mastered';

        this.data[key] = item;
        this.save();
    },

    isDue(key) {
        const item = this.data[key];
        if (!item) return true;
        return Date.now() >= item.nextReview;
    },

    getLevel(key) {
        const item = this.data[key];
        if (!item) return 'new';
        return item.level;
    },

    getDueItems(prefix) {
        const now = Date.now();
        const due = [];
        for (const key in this.data) {
            if (key.startsWith(prefix) && now >= this.data[key].nextReview) {
                due.push(key);
            }
        }
        return due;
    },

    getStats(prefix) {
        const counts = { new: 0, learning: 0, reviewing: 0, mastered: 0 };
        for (const key in this.data) {
            if (key.startsWith(prefix)) {
                counts[this.data[key].level]++;
            }
        }
        return counts;
    }
};
