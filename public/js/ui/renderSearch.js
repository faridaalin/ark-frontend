import { allProducts } from '../utils/settings.js';
import { getFromSessionStorage } from '../utils/storage.js';
import renderAllProducts from '../elements/renderAllProducts.js';


const getSearchTerm = (products, searchTerm) => {

  const filteredSearch = products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm)
  })

  if (filteredSearch.length > 0) {
    renderAllProducts(filteredSearch, "Shop is currently empty", ".shop-container");
  } else {
    const msg = `Sorry, we currently don't have ${searchTerm}`;
    renderAllProducts([], msg, ".shop-container");
  };
}

export const renderSearch = () => {
  const products = getFromSessionStorage(allProducts);
  const searchInput = document.querySelector('#search');
  const searchIcon = document.querySelector('.search-icon');
  let timeout = null;

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      getSearchTerm(products, searchTerm);
    }, 1000);

    const handleSearch = () => {
      setTimeout(() => {
        getSearchTerm(products, searchTerm);
      }, 1000);

    }
    searchIcon.addEventListener('click', handleSearch)

  });
}