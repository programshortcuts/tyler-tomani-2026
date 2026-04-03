// effects.js
let choice = 0
let numChoices = 2
let i = 0;
let speed = 500;
let j = 0;
let direction = 1; // 1 = up, -1 = down
export function effectsLoops(){
    const youtubeProjects = document.querySelectorAll('#youtubeResources .project')
    document.addEventListener('keydown',e => {
        const key = e.key.toLowerCase()
        if(e.metaKey && e.shiftKey && key === 'e' ){
            console.log('choice')
            if(choice < numChoices){
                choice++
            } else {
                choice = -1
            }
        }
    });
    function animate() {
        frameIncrements(youtubeProjects)
        requestAnimationFrame(animate);
    }
    animate();
}

function frameIncrements(youtubeProjects){
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
        return
    }
}
function spacingEfx(i,j,youtubeProjects){
    let margin = i;
}

function transformElsEfx(i,j,youtubeProjects){
    let opcatiy = (1.03 / 100) * i + 1;
    youtubeProjects[j].style.transform = `scale(${opcatiy})`;
    youtubeProjects[j].style.left = `5%`;
    youtubeProjects[j].style.fontSize = `${opcatiy}rem`;
}


function waveStaggeredPulse(i, youtubeProjects) {
    youtubeProjects.forEach((el, index) => {
        const offset = index * 10; // spacing between waves
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
    el.style.opacity = 0.5 + opacity * 0.5;

    // detect type via class
    if (el.classList.contains('js-b')) {
        el.style.backgroundColor = `rgba(255, 255, 0, ${opacity * 0.4})`;
    }

    if (el.classList.contains('python-b')) {
        el.style.backgroundColor = `rgba(147, 112, 216, ${opacity * 0.4})`;
    }

    if (el.classList.contains('ai-b')) {
        el.style.backgroundColor = `rgba(255, 69, 0, ${opacity * 0.4})`;
    }

    if (el.classList.contains('nodeJs-b')) {
        el.style.backgroundColor = `rgba(65, 105, 225, ${opacity * 0.4})`;
    }
}