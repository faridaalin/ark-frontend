import { cart } from "../utils/settings";
import { saveCartItemsToLocal, getFromLocal } from "../utils/storage";
import { addQty } from "../helpers/addQty";
import { addSize } from "../helpers/addSize";

export const addToCart = (product: IProduct) => {
  const addToCartBtn = document.querySelector(
    "#addToCart"
  ) as HTMLButtonElement;
  let localCart = getFromLocal(cart);
  addQty();

  const showSuccessMessage = (itemToShow: IProduct) => {
    const productAdded = document.querySelector(
      ".product-added"
    ) as HTMLDivElement;
    productAdded.textContent = "";

    addToCartBtn.setAttribute("data-toggle", "modal");
    addToCartBtn.setAttribute("data-target", "#addProductToCart");

    productAdded.textContent = `${itemToShow.title} has been added to your cart.`;
  };

  if (!localCart) localCart = [];

  addToCartBtn.addEventListener("click", function () {
    addQty();

    const qty = (document.querySelector(".value") as HTMLDivElement)
      .textContent;

    const selectedQty = qty && parseInt(qty);
    const selectedSize = addSize();

    if (!selectedSize) {
      return;
    }

    const alreadyInCart = localCart.find(
      (item: Icart) => item.product.id === product.id
    );

    if (!alreadyInCart) {
      //NEW ITEM
      localCart = [
        ...localCart,
        {
          product: product,
          qtySize: [
            {
              size: selectedSize,
              qty: selectedQty,
            },
          ],
        },
      ];

      showSuccessMessage(product);
      saveCartItemsToLocal(cart, localCart);
      return;
    } else {
      const item = localCart.find((item: Icart) => {
        return item.qtySize[0].size === selectedSize;
      });

      if (!item) {
        alreadyInCart.qtySize = [
          ...alreadyInCart.qtySize,
          {
            size: selectedSize,
            qty: selectedQty,
          },
        ];

        showSuccessMessage(alreadyInCart.product);
        saveCartItemsToLocal(cart, localCart);
        return;
      } else {
        item.qtySize[0].qty = item.qtySize[0].qty + selectedQty;
        showSuccessMessage(alreadyInCart.product);
        saveCartItemsToLocal(cart, localCart);
        return;
      }
    }
  });
};
