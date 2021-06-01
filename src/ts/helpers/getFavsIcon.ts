import { favs } from "../utils/settings";
import { getFromLocal } from "../utils/storage";

export const getFavsIcon = (product: IProduct) => {
  const currentFavs = getFromLocal(favs) ? getFromLocal(favs) : [];
  const hasFavs = currentFavs.find((fav: IProduct) => {
    return fav.id === product.id;
  });

  return hasFavs ? "fa-heart" : "fa-heart-o";
};
