// letter-nav.js
export function initLetterNav({
    container = document,
    selector = 'a'
} = {}) {

    if (!container) {
        console.warn('initLetterNav: container not found');
        return;
    }

    let lastLetterPressed = null;

    document.addEventListener('keydown', (e) => {

        // Ignore typing fields
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        if (e.metaKey || e.ctrlKey || e.altKey) return;

        const key = e.key.toLowerCase();

        // Only letters & numbers
        if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

        // 🔑 Only look INSIDE your container
        const allEls = [...container.querySelectorAll(selector)].filter(el => {
            const rect = el.getBoundingClientRect();
            return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
        });

        const matches = allEls.filter(el =>
            el.textContent.trim().toLowerCase().startsWith(key)
        );

        if (!matches.length) return;

        const active = document.activeElement;
        const currentIndex = matches.indexOf(active);
        const allIndex = allEls.indexOf(active);

        let nextEl;

        if (key !== lastLetterPressed || currentIndex === -1) {
            // 🔥 if nothing is focused yet → always start at first match
            nextEl = matches[0];
        } else {
            if (e.shiftKey) {
                const i = (currentIndex - 1 + matches.length) % matches.length;
                nextEl = matches[i];
            } else {
                const i = (currentIndex + 1) % matches.length;
                nextEl = matches[i];
            }
        }

        nextEl?.focus();
        lastLetterPressed = key;
    });
}