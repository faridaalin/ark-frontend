import { createRatingArray } from "../helpers/createRatingArray";
import { getRoundNumber } from "../helpers/getRoundNumber";

export const productDetail = (product: IProduct) => {
  const container = document.querySelector(
    ".pdp-detail-container"
  ) as HTMLDivElement;

  const rating = createRatingArray(product);
  const price = getRoundNumber(+product.price);

  container.innerHTML = `
  <div class="img-container col-12 col-md-6 d-flex flex-column ">
  <div class="pdp-thumbnail-container d-flex justify-content-between order-2 px-0 mt-sm-4">
   <img class="pdp-thumbnail" src="${product.image_url}" alt="" srcset="" />
   <img class="pdp-thumbnail" src="${product.image_url}" alt="" srcset="" />
   <img class="pdp-thumbnail" src="${product.image_url}" alt="" srcset="" />
   <img class="pdp-thumbnail" src="${product.image_url}" alt="" srcset="" />
   </div>
   <img class="pdp-img px-0 pb-4 pb-sm-0" src="${
     product.image_url
   }" alt="" srcset="" />
  </div>

  <div class="col-12 col-md-6 pt-5 mt-5 pt-md-0 mt-md-0 align-self-baseline">
    <div class="content-container">
      <div class="rating-container">
        <small class="pb-2">${product.brand}</small>
        <div class="rating">
          ${rating.map((star) => star).join("")}
        </div>
      </div>
      <h3 class="pb-md-2">${product.title}</h3>
      <div class="pb-4 py-md-0 mt-md-0">
        <p class="description pb-2 pt-1">
          Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus
          ligula. Mauris consequat ornare feugiat.
        </p>
        <h5 class="price-title">${price} NOK</h5>
      </div>
    </div>
    <div class="checkout d-flex flex-column flex-lg-row pb-1 pb-lg-4">
      <div class="qty-container">
        Quantity
        <button type="button" class="btn minus" data-type="dec"><i class="fa fa-minus"></i></button>
        <span class="value">1</span>
        <button type="button" class="btn pluss" data-type="inc"><i class="fa fa-plus"></i></button>
      </div>
      <div class="input-group flex-fill">
        <select class="custom-select size h-100" id="inputGroupSelect02">
          <option selected>Choose size</option>
          <option value="40">40</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
          <option value="45">45</option>
          <option value="46">46</option>
        </select>
        <i class="fa fa-angle-down"></i>
      </div>
    </div>
    <div class="d-flex pt-4 pt-md-1">
      <button type="button" id="addToCart" class="btn btn-secondary flex-fill">
        Add to cart
      </button>
    </div>
  </div>`;
};
