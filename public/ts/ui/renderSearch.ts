import { allProducts } from "../utils/settings";
import { getFromSessionStorage } from "../utils/storage";
import renderAllProducts from "../elements/renderAllProducts";

const getSearchTerm = (products: Product[], searchTerm: string) => {
  if (!products) return;
  const filteredSearch = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  });

  if (filteredSearch.length > 0) {
    renderAllProducts(
      filteredSearch,
      "Shop is currently empty",
      ".shop-container"
    );
  } else {
    const msg = `Sorry, we currently don't have ${searchTerm}`;
    renderAllProducts([], msg, ".shop-container");
  }
};

export const renderSearch = () => {
  const products = getFromSessionStorage(allProducts);

  const searchInput = document.querySelector("#search") as HTMLInputElement;
  const searchIcon = document.querySelector(
    ".search-icon"
  ) as HTMLOrSVGImageElement;
  let timeout: number;

  searchInput.addEventListener("input", (e: Event) => {
    const searchTerm = (e.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      getSearchTerm(products, searchTerm);
    }, 1000);

    const handleSearch = () => {
      setTimeout(() => {
        getSearchTerm(products, searchTerm);
      }, 1000);
    };
    searchIcon.addEventListener("click", handleSearch);
  });
};
