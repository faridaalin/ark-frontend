import { cart, favs } from '../utils/settings.js';
import { logout } from '../ui/logout.js';
import { renderSearch } from '../ui/renderSearch.js'
import { loadCurrentItems } from '../helpers/loadCurrentItems.js';
import { login } from '../ui/login.js';
import { register } from '../ui/register.js';
import { showNavbarBgOnScroll } from "../ui/showNavbarBgOnScroll.js";
import { getLoggedInUser } from '../helpers/getLoggedInUser.js'



export const renderNavbar = () => {
  showNavbarBgOnScroll();

  const innerNav = document.querySelector('.custom-nav');
  const user = getLoggedInUser();
  const { pathname } = location;

  let authLink = `
    <li class="nav-item">
     <a class="nav-link" href="#" data-toggle="modal" data-target="#login">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
      </svg>
     </a>
    </li>
    `

  if (user) {
    if (user.username === "admin") {
      authLink = `
        <li class="nav-item ${pathname === "/add.html" ? "active" : ""}">
          <a class="nav-link" href="add.html">Add</a>
        </li>
        <li class="nav-item">
          <a  class="nav-link logout" href="#"py-2 px-2">Logout</a>        
        </li>
        <li class="nav-item">
        <a  class="nav-link custom-greeting" href="#" py-2 px-2">Hi ${user.username}</a>
        </li>
        `
    } else {
      authLink = `
        <li class="nav-item">
          <a  class="nav-link logout" href="#"py-2 px-2">Logout</a>        
        </li>
        <li class="nav-item">
        <a  class="nav-link custom-greeting" href="#" py-2 px-2">Hi ${user.username}</a>
        </li>
        `
    }
    window.addEventListener('DOMContentLoaded', (event) => {
      logout();
    });
  }

  window.addEventListener('DOMContentLoaded', (event) => {
    register();
    login();
    loadCurrentItems(cart, '.cart-icon span');
    loadCurrentItems(favs, '.favs-icon span');
  });


  let searchbar = "";
  if (pathname === "/shop.html") {
    searchbar = `
      <li class="nav-item search-box mx-0 pb-4 pb-lg-0 w-75">
        <div class="search ">
          <input class="form-control" type="search"  id="search" placeholder="Search" aria-label="Search">
            <svg class="search-icon" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
        </div>
      </li>`

    document.addEventListener("DOMContentLoaded", () => {
      renderSearch();
    });
  }
  showNavbarBgOnScroll();


  return innerNav.innerHTML = `
      <div class="collapse navbar-collapse inner-navbar flex-grow-1 justify-content-md-between pt-5 pt-lg-0" id="navbarSupportedContent">
      <ul class="navbar-nav nav-center justify-content-center mr-auto align-items-baseline">
        <li class="nav-item ${pathname === "/" || pathname === "/index.html" ? "active" : ""}">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item  ${pathname === "/shop.html" ? "active" : ""}">
          <a class="nav-link" href="/shop.html">Shop</a>
        </li>
       ${authLink}
      </ul>
    </div>   
    <div class="collapse navbar-collapse inner-navbar flex-grow-1 justify-content-md-between pb-5 pb-lg-0" id="navbarSupportedContent">
        <ul class="navbar-nav nav-left mr-auto mx-lg-0 ml-lg-auto flex-column flex-lg-row justify-content-between align-items-center">
        ${searchbar}
          <div class="d-flex flex-md-row">
          <li class="nav-item favs-icon px-2 px-lg-0">
          <a class="nav-link icon" href="/fav.html"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg><span class="counter">0</span></a>
          </li>
          <li class="nav-item cart-icon px-2 px-lg-0">
          <a class="nav-link icon"  href="/cart.html"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"/>
        </svg><span class="counter">0</span></a>
          </li>
          </div>
        </ul>
     </div>
      `;

}

