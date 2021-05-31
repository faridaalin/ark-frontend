import { loadCurrentItems } from "./loadCurrentItems";
import { favs, allProducts } from "../utils/settings";
import {
  getFromSessionStorage,
  getFromLocal,
  saveToFavsListStorage,
} from "../utils/storage";

export const saveFavourites = () => {
  const favButtonsNode = document.querySelectorAll(
    ".fav"
  ) as NodeListOf<HTMLOrSVGImageElement>;

  favButtonsNode.forEach((favButton) => {
    const handleSaveFavs = (e: Event) => {
      const id = +(e.target as HTMLElement).attributes[1].value;

      const { classList } = e.target as HTMLElement;
      classList.toggle("fa-heart-o");
      classList.toggle("fa-heart");

      const products = getFromSessionStorage(allProducts);
      let favsList = getFromLocal(favs);
      const newFav = products.find((item: any) => id === item.id);

      if (!favsList) {
        favsList = [];
        favsList.push(newFav);
        saveToFavsListStorage(favs, favsList);
      } else {
        const inFavsListAlready = favsList.find(
          (item: IProduct) => item.id === id
        );

        if (!inFavsListAlready) {
          favsList.push(newFav);
          saveToFavsListStorage(favs, favsList);
          return;
        }

        const filteredFavs = favsList.filter(
          (item: IProduct) => +item.id !== +newFav.id
        );
        saveToFavsListStorage(favs, filteredFavs);
        return;
      }
      loadCurrentItems(favs, ".favs-icon span");
    };

    favButton.addEventListener("click", handleSaveFavs);
  });
};
