import { card } from "./card";

export const productCard = (product: IProduct) => {
  return ` <div class="product-card col-sm-6 col-md-3 mb-5 pb-5 pt-3">
              ${card(product)}
    </div> `;
};
