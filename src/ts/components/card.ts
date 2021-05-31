import { getLoggedInUser } from "../helpers/getLoggedInUser";
import { getRoundNumber } from "../helpers/getRoundNumber";
import { getFavsIcon } from "../helpers/getFavsIcon";
import { BASE_URL } from "../utils/settings";

export const card = (product: IProduct) => {
  const price = getRoundNumber(product.price);

  const cssClass = getFavsIcon(product);

  const user = getLoggedInUser();
  const edit =
    user && user.username === "admin" && location.pathname !== "/fav.html"
      ? ` <button type="button" class="btn btn-dark btn-sm edit-btn"><a href="/edit.html?id=${product.id}">Edit</a></button>`
      : "";
  const image = product.image_url
    ? product.image_url
    : product.image
    ? `${BASE_URL}${product.image}`
    : `https://res.cloudinary.com/djey7uz4e/image/upload/v1606132924/noImage_plcdvu.jpg`;

  return ` <div class="product-top">
  ${edit}
  <a href="/pdp.html?id=${product.id}">
  <img class="card-img-top img-fluid" data-src="${image}" alt="${product.alt_text}" loading="lazy">
    <div class="overlay btn-container d-flex justify-content-center align-items-center">
      <button type="button" class="content-btn btn btn-outline-primary">View</button>
    </div>
  </a>
</div>

<div class="product-bottom  pt-3">
  <a href="/pdp.html?id=${product.id}"><h3 class="card-title mb-0">${product.title}</h3></a>
  <div class="feature-info__price d-flex flex-row align-items-center justify-content-between">
    <h5 class=" card-text  mb-0">${price} NOK</h5>
    <i class="feature-icon fav fa ${cssClass}" data-id="${product.id}"></i>
  </div>
</div>`;
};
