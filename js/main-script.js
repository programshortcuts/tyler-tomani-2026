// main-script.js
import { initDropDowns } from "./ui/drop-downs.js";
import { initLetterNav } from "./nav/letter-nav.js";
const pageWrapper = document.querySelector('.page-wrapper')
function initMain() {
    initDropDowns();

    // Letter navigation ready-to-go
    initLetterNav({
        // container: document,   // or document.querySelector('.page-wrapper')
        container: pageWrapper,   // or document.querySelector('.page-wrapper')
        selector: 'a'          // or '.project' to limit scope
    });
}

initMain();