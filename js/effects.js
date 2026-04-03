// effects.js
const efxChangeBtn = document.querySelector('#efxChangeBtn')
let hoveredEl = null;
let isPaused = false;
let choice = -1
let numChoices = 2
let i = 0;
let speed = 400;
let j = 0;
let direction = 1; // 1 = up, -1 = down
export function effectsLoops(){
    const youtubeProjects = document.querySelectorAll('#youtubeResources .project')
    efxChangeBtn.addEventListener('click', e => {
        console.log('here')
        if (choice < numChoices - 1) {
            choice++;
        } else {
            choice = -1;
        }
        
    })
    document.addEventListener('keydown',e => {
        const key = e.key.toLowerCase()
        if (e.metaKey && e.shiftKey && key === 'e') {
            e.stopPropagation(); // 💥 stops other listeners from interfering   
            if (choice < numChoices - 1) {
                choice++;
            } else {
                choice = -1;
            }
            const labels = {
                '-1': 'No Effect',
                '0': 'Wave',
                '1': 'Scale'
            };

            showIndicator(labels[choice]);
            return; // 👉 exit early so nothing else runs
        }
    }, true); // 👈 CAPTURE PHASE (this is the key)
    function animate() {
        frameIncrements(youtubeProjects)
        requestAnimationFrame(animate);
    }
    animate();
    youtubeProjects.forEach(el => {
    el.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    el.addEventListener('mouseleave', () => {
        isPaused = true;
    });

    el.addEventListener('focus', () => {
        isPaused = true;
    });

    el.addEventListener('blur', () => {
        isPaused = false;
    });
});
}



function frameIncrements(youtubeProjects){
    if (isPaused) return;
    i += direction;
        // hit top → start going down
    if (i  >= speed) {
        i = speed;       // clamp
        direction = -1;
    }
    // hit bottom → start going up + increment j
    if (i <= 0) {
        i = 0;         // clamp
        direction = 1;
        if(j < youtubeProjects.length - 1){
            j++;
        } else {
            j = 0;
        }
    }
    // debug
    console.log(choice)
    if(choice === 0){
        waveStaggeredPulse(i,youtubeProjects)
        // spacingEfx(i,j,youtubeProjects)
        return
    }
    if(choice === 1){
        transformElsEfx(i,j,youtubeProjects)
        return
        
    }
    if(choice === -1){
        youtubeProjects.forEach(el => {
            el.style.transform = 'scale(1)';
            el.style.backgroundColor = '';
            el.style.opacity = '';
        });
        return;
    }
    
}
function spacingEfx(i,j,youtubeProjects){
    let margin = i;
}

function transformElsEfx(i,j,youtubeProjects){
    let sizeTransform = (1.03 / 100) * i + 1;
    youtubeProjects.forEach((el, index) => {
        if (index === j) {
            el.style.transform = `scale(${sizeTransform})`;
        } else {
            el.style.transform = 'scale(1)';
        }
    });
}


function waveStaggeredPulse(i, youtubeProjects) {
    youtubeProjects.forEach((el, index) => {
        if (el === hoveredEl) return;

        const offset = index * 20; // spacing between waves
        let value = i - offset;

        // wrap value so it loops smoothly
        if (value < 0) value += speed;

        // normalize 0 → 1
        let progress = value / speed;

        // create fade in/out (triangle wave)
        let opacity = progress <= 0.5
            ? progress * 2
            : (1 - progress) * 2;

        applyEffect(el, opacity);
    });
}
function applyEffect(el, opacity) {
    // base opacity
    const minOpactiy = .5
    el.style.opacity = 0.5 + opacity * 0.5;
    // detect type via id
    if (el.id === 'aiYoutube') {
        el.style.backgroundColor = `rgba(255, 69, 0, ${opacity * minOpactiy})`;
    }
    if (el.id === 'cssYoutube') {
        el.style.backgroundColor = `rgb(143, 141, 159, ${opacity * minOpactiy})`;
    }
    if (el.id === 'dockerYoutube') {
        el.style.backgroundColor = `rgba(72, 61, 139, ${opacity * minOpactiy})`;
    }
    if (el.id === 'jsYoutube') {
        el.style.backgroundColor = `rgba(255, 255, 0, ${opacity * minOpactiy})`;
    }
    if (el.id === 'freecodecampYoutube') {
        el.style.backgroundColor = ` rgb(31, 81, 31, ${opacity * minOpactiy})`;
    }
    if (el.id === 'nodeJsYoutube') {
            el.style.backgroundColor = `rgb(32, 55, 122, ${opacity * minOpactiy})`;
    }
    if (el.id === 'pythonYoutube') {
        el.style.backgroundColor = `rgba(147, 112, 216, ${opacity * minOpactiy})`;
    }

    if (el.id === 'reactJsYoutube') {
        el.style.backgroundColor = `rgb(92, 107, 153, ${opacity * minOpactiy})`;
    }
}
function showIndicator(text) {
    const el = document.getElementById('effect-indicator');
    el.textContent = text;
    el.style.opacity = 1;

    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => {
        el.style.opacity = 0;
    }, 1000);
}