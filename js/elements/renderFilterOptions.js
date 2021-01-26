import renderAllProducts from "../elements/renderAllProducts.js";
import { spinner } from "../elements/spinner.js";
import { getCategoriesObject } from '../helpers/getCategoriesObject.js'

const filterByCategory = (products) => {
  const dropdown = document.querySelector('.dropdown');
  const custom_select = document.querySelector('.custom_select');
  const checkboxesNode = document.querySelectorAll('.form-check-input');

  checkboxesNode.forEach(checkbox => {
    let timeout = null;
    checkbox.addEventListener('click', (e) => {

      spinner('.shop-container');
      clearTimeout(timeout);

      timeout = setTimeout(() => {

        const category = e.target.value.trim().toLowerCase();
        const checkedCategory = e.target.checked;


        if (category && checkedCategory) {
          const filteredCategory = products.filter((product) => product.category.toLowerCase() === e.target.value.toLowerCase());

          if (filteredCategory.length > 0) {
            renderAllProducts(filteredCategory, "Shop is currently empty", ".shop-container");
            if (dropdown.classList.contains('show') && custom_select.classList.contains('show')) {
              dropdown.classList.remove('show');
              custom_select.classList.remove('show');
            }
          } else {
            const msg = `Sorry, we currently don't have items the catgegory ${category}`;
            renderAllProducts([], msg, ".shop-container");
            if (dropdown.classList.contains('show') && custom_select.classList.contains('show')) {
              dropdown.classList.remove('show');
              custom_select.classList.remove('show');
            }

          };
        } else {
          renderAllProducts(products, "Shop is currently empty", ".shop-container");
          if (dropdown.classList.contains('show') && custom_select.classList.contains('show')) {
            dropdown.classList.remove('show');
            custom_select.classList.remove('show');
          }

        }
      }, 1000);
    });
  });

};

const renderFilterCategories = (products) => {
  const custom_select = document.querySelector(".custom_select");
  custom_select.innerHTML = "";

  const categories = getCategoriesObject(products);

  for (const property in categories) {
    const name = categories[property].item.category;
    const nameToUpperCase = name[0].toUpperCase() + name.slice(1).toLowerCase();

    custom_select.innerHTML += `<div class="form-check form-check--filter dropdown-item">
    <label class="form-check-label d-flex w-100" for="${nameToUpperCase}">${nameToUpperCase}
    <input class="form-check-input" type="checkbox" value="${nameToUpperCase}" id="${nameToUpperCase}">
    </label>
  </div>`};

  filterByCategory(products);

};



const filterByPrice = (products) => {
  const range = document.querySelector('.custom-range');
  const priceValue = document.querySelector('.value');

  priceValue.innerHTML = range.value;

  range.addEventListener('input', (e) => {
    priceValue.innerHTML = e.target.value;

    let timeout = null;

    spinner('.shop-container');
    clearTimeout(timeout);

    const value = e.target.value;

    const filteredPrice = products.filter((product) => parseInt(product.price) <= parseInt(value));

    setTimeout(() => {
      if (filteredPrice.length > 0) {
        renderAllProducts(filteredPrice, "Shop is currently empty", ".shop-container");
      } else {
        const msg = `Sorry, we currently don't have shoes in with the price range 0 - ${value} NOK`;
        renderAllProducts([], msg, ".shop-container");

      };


    }, 1000);

  });

};



const renderFilterPrice = (products) => {
  const filterPrice = document.querySelector(".filter-price");
  filterPrice.innerHTML = "";

  const allPrices = [];

  products.forEach(product => {
    allPrices.push(product.price);
  });

  const minValue = Math.min(...allPrices);
  const maxValue = Math.max(...allPrices);

  filterPrice.innerHTML += ` 
        <div class="d-flex justify-content-between"><small>0 NOK</small> <small class="value"></small><small>${maxValue} NOK</small></div>
        <input type="range" class="custom-range" min="0" max="${maxValue}" value=""  id="customRange3">`;

  filterByPrice(products);

};

export const renderFilterOptions = (products) => {
  renderFilterCategories(products);
  renderFilterPrice(products)
}



