// main-script.js
import { initDropDowns } from "./ui/drop-downs.js";
import { initLetterNav } from "./nav/letter-nav.js";

function initMain() {
    initDropDowns();

    // Letter navigation ready-to-go
    initLetterNav({
        container: document,   // or document.querySelector('.page-wrapper')
        selector: 'a'          // or '.project' to limit scope
    });
}

initMain();