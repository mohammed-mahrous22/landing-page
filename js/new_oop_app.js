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
const navbar = document.getElementById('navbar__list');
const links = navbar.getElementsByTagName('a');
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

//writing the class constructor

function Create_Page_Obj (sections, navbar, links){
//class methods are private only the events handlers are public as they are the ones to be used
    this.sections = sections;
    this.navbar = navbar;
    this.links  = links;
    let fragment = document.createDocumentFragment();

// for each section create a li and anchor inside it that associated with the section
   let Create_nav_helper = function (fragment, section) {
        let li = document.createElement('li');
        let text = section.querySelector('h2').textContent;
        li.innerHTML = `<a class ="menu__link" id="${section.id}_link" data-nav="${section.dataset.nav}"> ${text} </a>`
        fragment.appendChild(li);
    }
//return true if the section in viewport otherwise return false
    let Section_active_helper = function (section){
        let rect = section.getBoundingClientRect();
        return (rect.top  <= ((window.innerHeight || document.documentElement.clientHeight)/2)
            && rect.bottom >= ((window.innerHeight || document.documentElement.clientHeight)/2));
    }
    /**
     * End Helper Functions
     * Begin Main Functions
     *
     */
// build the nav
    let Create_nav_main = function (sections , navbar){
        for (const section of sections) {
            Create_nav_helper(fragment,section)
        }
        navbar.appendChild(fragment);
    }
    this.Create_nav_handler = ()=> {
        Create_nav_main(this.sections,this.navbar);
        onload_active_link(this.sections);
    }
// Add class 'active' to section when near top of viewport
    let Section_active_main = function (sections){
        for (let section of sections) {
            let link = document.getElementById(`${section.id}_link`);
            if (Section_active_helper(section)){
                section.className = "your-active-class";
                link.className = "active_link"
            }else {
                section.className = "";
                link.className = "menu__link";
            }
        }
    }
//so that the link will be active on page first-load or reload without having to scroll
    let onload_active_link = function (sections){
        for (let section of sections) {
            let link = document.getElementById(`${section.id}_link`);
            if (section.className === "your-active-class"){
                link.className = 'active_link';}}
    }
    this.Section_active_handler = ()=> {
        setTimeout(() => {
            Section_active_main(this.sections)
        }, 0)
    }
// Scroll to Section using scrollIntoView event
    this.on_click_scroll_handler = (event)=>{
       let link = event.target;
       let section = document.getElementById(link.id.replace(/_link/,''));
       section.scrollIntoView({behavior: "smooth",block: "center"});
    }



    }

// instantiate the page object from the class i just constructed
const Page_obj = new Create_Page_Obj(sections,navbar,links);






/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener('DOMContentLoaded', Page_obj.Create_nav_handler);
// Scroll to section on link click
document.addEventListener('DOMContentLoaded',()=>{
    for (let link of Page_obj.links) {
        link.addEventListener('click',Page_obj.on_click_scroll_handler)
    }});
// Set sections as active
window.addEventListener('scroll',Page_obj.Section_active_handler);