import { allProducts } from "../utils/settings";
import { getFromSessionStorage } from "../utils/storage";
import renderAllProducts from "../elements/renderAllProducts";
import debounce from "lodash-es/debounce";

const getSearchTerm = (products: IProduct[], searchTerm: string) => {
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

export const renderSearch = (): void => {
  const products = getFromSessionStorage(allProducts);

  const searchInput = document.querySelector("#search") as HTMLInputElement;
  const searchIcon = document.querySelector(
    ".search-icon"
  ) as HTMLOrSVGImageElement;

  searchInput.addEventListener("input", (e: Event) => {
    const searchTerm = (e.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    const debouncedSearch = debounce(getSearchTerm, 1000);
    debouncedSearch(products, searchTerm);

    const handleSearch = () => {
      const debouncedSearch = debounce(getSearchTerm, 1000);
      debouncedSearch(products, searchTerm);
    };
    searchIcon.addEventListener("click", handleSearch);
  });
};
