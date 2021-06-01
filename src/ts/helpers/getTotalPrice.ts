import { cart } from "../utils/settings";
import { getFromLocal } from "../utils/storage";
import { getRoundNumber } from "../helpers/getRoundNumber";

export const getTotalPricePerItem = (product: Icart): number => {
  const qty = product.qtySize.reduce((acc: number, totalQty: IqtySize) => {
    let reduceValue = acc;
    if (totalQty.qty) {
      reduceValue = acc + totalQty.qty;
    }
    return reduceValue;
  }, 0);
  return getRoundNumber(+(qty * product.product.price));
};

export const getTotalPrice = () => {
  const currentCart = getFromLocal(cart);
  let total = 0;

  if (!currentCart) {
    return total;
  }

  total = currentCart.reduce((acc: number, obj: Icart) => {
    obj.qtySize.forEach((item: IqtySize) => {
      if (item.qty) acc += obj.product.price * item.qty;
    });

    return acc;
  }, 0);

  return (total = getRoundNumber(+total));
};
