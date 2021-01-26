import { BASE_URL, userToken } from "./utils/settings.js";
import { getFromLocal } from "./utils/storage.js";
import { renderNavbar } from "./elements/renderNavbar.js";
import { showMessage } from "./helpers/showMessage.js";
import { validateFields } from './helpers/validateFields.js';
import { deleteProduct } from "./ui/deleteProduct.js";
import { updateProduct } from "./ui/updateProduct.js";
import { removeMessage } from "./helpers/removeMessage.js";
import { fectData } from './helpers/fetcData.js';
import { getUrlParam } from './helpers/getUrlParam.js';
import { getLoggedInUser } from './helpers/getLoggedInUser.js';

renderNavbar();

const user = getLoggedInUser();

if (!user) location.href = "/";

if (user && user.username === "admin") {
  const id = getUrlParam("id");
  const title = document.querySelector("#name");
  const brand = document.querySelector("#brand");
  const price = document.querySelector("#price");
  const description = document.querySelector("#description");
  const imgUrl = document.querySelector("#url");
  const altText = document.querySelector(".altText");
  const category = document.querySelector(".category");
  const productID = document.querySelector("#id");
  const featured = document.querySelector("#featured");

  const URL = `${BASE_URL}/products/${id}`;
  const token = getFromLocal(userToken);

  fectData(URL).then(product => {
    if (!product || typeof product === 'string') {
      return showMessage('danger', product, '.edit-form .message-container');
    }

    title.value = product.title;
    brand.value = product.brand;
    price.value = product.price;
    description.value = product.description;
    imgUrl.value = product.image_url;
    altText.value = product.alt_text;
    category.value = product.category;
    productID.value = product.id;
    featured.checked = product.featured;
  });


  const form = document.querySelector(".edit-form");

  const handleFormEdit = (e) => {
    e.preventDefault();
    removeMessage('.edit-form .message-container');

    const isValid = validateFields(".edit-form .form-control");
    if (isValid === false || isValid === undefined) return;


    const productObj = {
      title: title.value,
      brand: brand.value,
      price: price.value,
      description: description.value,
      image_url: imgUrl.value,
      alt_text: altText.value,
      category: category.value,
      id: productID.value,
      featured: featured.checked,
    };

    updateProduct(productObj, URL, token);

  };

  deleteProduct(URL, token);

  form.addEventListener("submit", handleFormEdit);

}
