// drop-downs.js
export function initDropDowns(){
    const dropDowns = document.querySelectorAll('.drop-down')
    hideAllDowns()
    dropDowns.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault()
            const dropParent = e.target.closest('.drop-parent')
            const downs  = dropParent.querySelector('.downs')
            toggleDowns(downs)
        });
    })
}
function toggleDowns(downs){
    console.log(downs)
    if(downs.classList.contains('hide')){
        downs.classList.remove('show')
    }
    downs.classList.toggle('hide')
    
}
function hideAllDowns(){
    const downs = document.querySelectorAll('.downs')
    downs.forEach(el => {
        if(!el.classList.contains('show')){
            el.classList.add('hide')
        } else {
            el.classList.remove('show')
        }
        
    })
}