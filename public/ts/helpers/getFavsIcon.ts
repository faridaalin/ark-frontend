import { favs } from "../utils/settings";
import { getFromLocal } from "../utils/storage";

export const getFavsIcon = (product) => {
  const currentFavs = getFromLocal(favs) ? getFromLocal(favs) : [];
  const hasFavs = currentFavs.find((fav) => {
    return parseInt(fav.id) === parseInt(product.id);
  });

  return hasFavs ? "fa-heart" : "fa-heart-o";
};
