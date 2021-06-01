import { getFromSessionStorage } from "./utils/storage";
import { allProducts } from "./utils/settings";
import renderAllProducts from "./elements/renderAllProducts";
import { renderNavbar } from "./elements/renderNavbar";

renderNavbar();

const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const category = urlParam.get("category");
const title = document.querySelector(".header") as HTMLHeadingElement;

if (typeof category === "string") {
  title.innerHTML = category;
  document.title = category;
  const breadcrumb = document.querySelector(".breadcrumb") as HTMLLIElement;
  breadcrumb.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${category}</li>`;
}

const currentProducts = getFromSessionStorage(allProducts);

const categoryToDisplay = currentProducts.filter((product: IProduct) => {
  if (category) {
    return product.category.toLowerCase() === category.toLowerCase();
  }
});

renderAllProducts(
  categoryToDisplay,
  "No categories available currently",
  ".category-container"
);
