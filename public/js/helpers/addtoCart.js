import { cart } from '../utils/settings.js';
import { saveCartItemsToLocal, getFromLocal } from '../utils/storage.js';
import { addQty } from '../helpers/addQty.js';
import { addSize } from '../helpers/addSize.js';


export const addToCart = (product) => {
  const addToCartBtn = document.querySelector('#addToCart');
  let localCart = getFromLocal(cart);
  addQty();


  const showSuccessMessage = (itemToShow) => {
    const productAdded = document.querySelector('.product-added');
    productAdded.textContent = "";

    addToCartBtn.setAttribute('data-toggle', 'modal')
    addToCartBtn.setAttribute('data-target', '#addProductToCart');

    productAdded.textContent = `${itemToShow.title} has been added to your cart.`

  }

  if (!localCart) localCart = [];

  addToCartBtn.addEventListener('click', function (e) {
    addQty();

    const qty = document.querySelector('.value').textContent;
    const selectedQty = parseInt(qty);
    const selectedSize = addSize();

    if (!selectedSize) return;

    const alreadyInCart = localCart.find((item) => item.product.id === product.id);

    if (!alreadyInCart) {
      //NEW ITEM 
      localCart = [...localCart, {
        product: product,
        qtySize: [
          {
            size: selectedSize,
            qty: selectedQty,
          }
        ],
      }];
      showSuccessMessage(product);
      saveCartItemsToLocal(cart, localCart);

    } else {
      const item = localCart.find((item) => {
        return item.qtySize[0].size === selectedSize
      });

      if (!item) {
        alreadyInCart.qtySize = [...alreadyInCart.qtySize,
        {
          size: selectedSize,
          qty: selectedQty,
        }];
        showSuccessMessage(alreadyInCart.product);
        saveCartItemsToLocal(cart, localCart);

      } else {
        item.qtySize[0].qty = item.qtySize[0].qty + selectedQty;
        showSuccessMessage(alreadyInCart.product);
        saveCartItemsToLocal(cart, localCart);

      }
    }


  });
}






