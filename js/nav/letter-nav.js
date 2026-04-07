// letter-nav.js
export function initLetterNav({
    container = document,
    selector = 'a,button'
} = {}) {

    if (!container) {
        console.warn('initLetterNav: container not found');
        return;
    }

    let lastLetterPressed = null;

    document.addEventListener('keydown', (e) => {
        
        // Ignore typing fields
        const tag = e.target.tagName;
        if (
            e.target.matches('input, textarea, [contenteditable="true"]')
        ) return;

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

// Allow if nothing meaningful is focused yet
    const isInitialState = active === document.body;

// Allow if focus is inside container
    const isInside = container.contains(active);

    if (!isInitialState && !isInside) return;

    let orderedMatches = matches;

    if (active && active !== document.body) {
        const parent = active.parentElement;

        const localMatches = matches.filter(el => el.parentElement === parent);
        const otherMatches = matches.filter(el => el.parentElement !== parent);

        // 👉 KEY: local first, then global
        if (localMatches.length) {
            orderedMatches = [...localMatches, ...otherMatches];
        }
    }

    const currentIndex = orderedMatches.indexOf(active);

    let nextEl;

    if (key !== lastLetterPressed || currentIndex === -1) {
        nextEl = orderedMatches[0];
    } else {
        if (e.shiftKey) {
            const i = (currentIndex - 1 + orderedMatches.length) % orderedMatches.length;
            nextEl = orderedMatches[i];
        } else {
            const i = (currentIndex + 1) % orderedMatches.length;
            nextEl = orderedMatches[i];
        }
    }

    nextEl?.focus();
    lastLetterPressed = key;
    });
}