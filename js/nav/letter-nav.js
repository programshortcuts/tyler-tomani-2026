export function initLetterNav({
    container = document,
    selector = 'a'
} = {}) {

    let lastLetterPressed = null;

    container.addEventListener('keydown', (e) => {

        // Ignore typing fields
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;

        if (e.metaKey || e.ctrlKey || e.altKey) return;

        const key = e.key.toLowerCase();

        // Only letters & numbers
        if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

        const allEls = [...container.querySelectorAll(selector)].filter(el => {
            const rect = el.getBoundingClientRect();
            return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
        });

        const matches = allEls.filter(el => {
            const text = el.textContent.trim().toLowerCase();
            return text.startsWith(key);
        });

        if (matches.length === 0) return;

        const active = document.activeElement;
        const currentIndex = matches.indexOf(active);
        const allIndex = allEls.indexOf(active);

        let nextEl;

        if (key !== lastLetterPressed) {
            if (e.shiftKey) {
                nextEl = [...matches].reverse().find(el => allEls.indexOf(el) < allIndex)
                    || matches[matches.length - 1];
            } else {
                nextEl = matches.find(el => allEls.indexOf(el) > allIndex)
                    || matches[0];
            }
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