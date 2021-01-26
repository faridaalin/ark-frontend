import { getFromSessionStorage } from './utils/storage.js';
import { allProducts } from './utils/settings.js';
import renderAllProducts from "./elements/renderAllProducts.js";
import { renderNavbar } from "./elements/renderNavbar.js";


renderNavbar();

const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const category = urlParam.get("category");


document.querySelector('.header').innerHTML = category;
document.title = category;
const breadcrumb = document.querySelector('.breadcrumb');
breadcrumb.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${category}</li>`;

const currentProducts = getFromSessionStorage(allProducts);
const categoryToDisplay = currentProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase());
renderAllProducts(categoryToDisplay, "No categories available currently", ".category-container");

