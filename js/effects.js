let i = 0;
let j = 0;
let direction = 1; // 1 = up, -1 = down
export function effectsLoops(){
    const youtubeProjects = document.querySelectorAll('#youtubeResources .project')
    function animate() {
        i += direction;

        // hit top → start going down
        if (i  >= 110) {
            i = 110;       // clamp
            direction = -1;
        }

        // hit bottom → start going up + increment j
        if (i <= 0) {
            i = 0;         // clamp
            direction = 1;
            if(j < youtubeProjects.length){
                j++;
            } else {
                j = 0;
            }
            // console.log('cycle complete:', j);
        }
        // debug
        loopThruEls(i,j,youtubeProjects)
        requestAnimationFrame(animate);
    }

    animate();
}

function loopThruEls(i,j,youtubeProjects){
    let opcatiy = i * .01;
    console.log(opcatiy)
    console.log(j)
    youtubeProjects[j].style.opcatiy = i;
    console.log(youtubeProjects[j])
    // youtubeProjects[j].style.backgroundColor = `rgb(${i},2,2,${i})` 
    youtubeProjects[j].style.boxShadow = `0 0 ${i}px ${i}px white` 

}


