/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const main = document.querySelector('main');
const sections = main.getElementsByTagName('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// for each section create a li and anchor inside it that associated with the section
function Create_nav_helper(section,textContent,holder) {
    const li = document.createElement('li');
    const data_nav = section.dataset.nav;
    const link = document.createElement('a');
    link.className = 'menu__link';
    link.id = data_nav;
    link.dataset.nav = data_nav;
    link.textContent = textContent;
    li.appendChild(link);
    holder.appendChild(li);
}

//return true if the section in viewport otherwise return false
function Section_active_helper(element) {
   const rect = element.getBoundingClientRect();
   return (rect.top  <= ((window.innerHeight || document.documentElement.clientHeight)/2)
        && rect.bottom >= ((window.innerHeight || document.documentElement.clientHeight)/2));
}








/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function Create_nav_main(){
    const fragment = document.createDocumentFragment();
    const navbar__list = document.getElementById('navbar__list');
    for(let section of sections){
        let text = section.querySelector('h2').textContent;
        Create_nav_helper(section,text,fragment);
    }
    navbar__list.appendChild(fragment);
}
// Add class 'active' to section when near top of viewport

//if true we give an active class to the section and the link associated with it else return everything as it was before
function Section_active_main(){
    for (let section of sections) {
        let link = document.getElementById(section.dataset.nav);
        if (Section_active_helper(section)){
            section.className = "your-active-class";
            link.className = "active_link";
        }else {
            section.className = "";
            link.className = "menu__link";
        }

    }
}

function Section_active_Handler(){
    window.setTimeout(Section_active_main,0)
}
// Scroll to section using scrollIntoView method

//creating a click event listener for each link in the navbar list
function add_event() {
    let menu = document.getElementById('navbar__list');
    let links = menu.getElementsByTagName('a');
    for (let link of links) {
//we scrollIntoView the section associated with the clicked link
        link.addEventListener('click', (event) =>{
            let link = event['target'];
            let section_id = link.dataset.nav.replace(/\s/g,'');
            let section = document.getElementById(section_id.toLowerCase());
            section.scrollIntoView({behavior:"smooth", block:"start",inline:"start"})})
    }

}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', Create_nav_main ,true );
//so that the link will be active on page first-load or reload without having to scroll
document.addEventListener('DOMContentLoaded', ()=>{
    for (let section of sections) {
        let link = document.getElementById(section.dataset.nav);
        if (section.className === "your-active-class"){
            link.className = 'active_link';}
    }} ,true );
// Scroll to section on link click
document.addEventListener('DOMContentLoaded',add_event);
// Set sections as active
window.addEventListener(`scroll`,Section_active_Handler);

