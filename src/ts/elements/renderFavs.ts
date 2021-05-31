import { getFromLocal } from "../utils/storage";
import { favs } from "../utils/settings";
import renderAllProducts from "../elements/renderAllProducts";
import { renderNavbar } from "../elements/renderNavbar";
import { spinner } from "../elements/spinner";

renderNavbar();

export const renderFavs = () => {
  const savedFavs = getFromLocal(favs) ? getFromLocal(favs) : [];
  const msg =
    savedFavs.length === 0 ? "You have no items in your favourites list." : "";

  spinner(".fav-container");

  setTimeout(() => {
    renderAllProducts(savedFavs, msg, ".fav-container");
  }, 500);
};
