import { getFromLocal } from "../utils/storage";

export const loadCurrentItems = (tag: string, container: string) => {
  const currentItems = getFromLocal(tag);
  const counterContainer = document.querySelector(container) as HTMLDivElement;
  let total = 0;

  if (!currentItems) {
    return (counterContainer.innerHTML = total.toString());
  }

  if (tag === "cart") {
    let sum = 0;
    currentItems.forEach((element: any) => {
      element.qtySize.forEach((item: any) => {
        sum += item.qty;
      });
    });
    total = sum;

    return (counterContainer.textContent = total > 9 ? "9+" : total.toString());
  }

  if (tag === "favs") {
    const favsTotal = currentItems.length > 9 ? "9+" : currentItems.length;
    return (counterContainer.textContent = favsTotal);
  }
};
