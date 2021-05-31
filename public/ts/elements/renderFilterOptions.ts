import renderAllProducts from "../elements/renderAllProducts";
import { spinner } from "../elements/spinner";
import { getCategoriesObject } from "../helpers/getCategoriesObject";

const filterByCategory = (products: IProduct[]) => {
  const dropdown = document.querySelector(".dropdown") as HTMLDivElement;
  const custom_select = document.querySelector(
    ".custom_select"
  ) as HTMLDivElement;
  const checkboxesNode = document.querySelectorAll(
    ".form-check-input"
  ) as NodeListOf<HTMLInputElement>;

  checkboxesNode.forEach((checkbox) => {
    let timeout: number;
    checkbox.addEventListener("click", (e) => {
      spinner(".shop-container");
      clearTimeout(timeout);

      timeout = window.setTimeout(() => {
        const category = (e.target as HTMLInputElement).value
          .trim()
          .toLowerCase();
        const checkedCategory = (e.target as HTMLInputElement).checked;

        if (category && checkedCategory) {
          const filteredCategory = products.filter(
            (product) =>
              product.category.toLowerCase() ===
              (e.target as HTMLInputElement).value.toLowerCase()
          );

          if (filteredCategory.length > 0) {
            renderAllProducts(
              filteredCategory,
              "Shop is currently empty",
              ".shop-container"
            );
            if (
              dropdown.classList.contains("show") &&
              custom_select.classList.contains("show")
            ) {
              dropdown.classList.remove("show");
              custom_select.classList.remove("show");
            }
          } else {
            const msg = `Sorry, we currently don't have items the catgegory ${category}`;
            renderAllProducts([], msg, ".shop-container");
            if (
              dropdown.classList.contains("show") &&
              custom_select.classList.contains("show")
            ) {
              dropdown.classList.remove("show");
              custom_select.classList.remove("show");
            }
          }
        } else {
          renderAllProducts(
            products,
            "Shop is currently empty",
            ".shop-container"
          );
          if (
            dropdown.classList.contains("show") &&
            custom_select.classList.contains("show")
          ) {
            dropdown.classList.remove("show");
            custom_select.classList.remove("show");
          }
        }
      }, 1000);
    });
  });
};

const renderFilterCategories = (products: IProduct[]) => {
  const custom_select = document.querySelector(
    ".custom_select"
  ) as HTMLDivElement;
  custom_select.innerHTML = "";

  const categories = getCategoriesObject(products);

  for (const property in categories) {
    const name = categories[property].item.category;
    const nameToUpperCase = name[0].toUpperCase() + name.slice(1).toLowerCase();

    custom_select.innerHTML += `<div class="form-check form-check--filter dropdown-item">
    <label class="form-check-label d-flex w-100" for="${nameToUpperCase}">${nameToUpperCase}
    <input class="form-check-input" type="checkbox" value="${nameToUpperCase}" id="${nameToUpperCase}">
    </label>
  </div>`;
  }

  filterByCategory(products);
};

const filterByPrice = (products: IProduct[]) => {
  const range = document.querySelector(".custom-range") as HTMLInputElement;
  const priceValue = document.querySelector(".value") as HTMLElement;

  priceValue.innerHTML = range.value;

  range.addEventListener("input", (e) => {
    priceValue.innerHTML = (e.target as HTMLInputElement).value;

    let timeout: number | null = null;

    spinner(".shop-container");
    if (typeof timeout === "number") clearTimeout(timeout);

    const value = (e.target as HTMLInputElement).value;

    const filteredPrice = products.filter((product) => product.price <= +value);

    window.setTimeout(() => {
      if (filteredPrice.length > 0) {
        renderAllProducts(
          filteredPrice,
          "Shop is currently empty",
          ".shop-container"
        );
      } else {
        const msg = `Sorry, we currently don't have shoes in with the price range 0 - ${value} NOK`;
        renderAllProducts([], msg, ".shop-container");
      }
    }, 1000);
  });
};

const renderFilterPrice = (products: IProduct[]) => {
  const filterPrice = document.querySelector(".filter-price") as HTMLDivElement;
  filterPrice.innerHTML = "";

  const allPrices: number[] = [];

  products.forEach((product: IProduct) => {
    if (product.price) {
      allPrices.push(product.price);
    }
  });

  const maxValue = Math.max(...allPrices);

  filterPrice.innerHTML += `
        <div class="d-flex justify-content-between"><small>0 NOK</small> <small class="value"></small><small>${maxValue} NOK</small></div>
        <input type="range" class="custom-range" min="0" max="${maxValue}" value=""  id="customRange3">`;

  filterByPrice(products);
};

export const renderFilterOptions = (products: IProduct[]) => {
  renderFilterCategories(products);
  renderFilterPrice(products);
};
