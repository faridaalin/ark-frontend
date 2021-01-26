import { getFromLocal } from "../utils/storage.js";
import { favs } from "../utils/settings.js";
import renderAllProducts from '../elements/renderAllProducts.js';
import { renderNavbar } from "../elements/renderNavbar.js";
import { spinner } from "../elements/spinner.js";


renderNavbar();

export const renderFavs = () => {
    const savedFavs = getFromLocal(favs) ? getFromLocal(favs) : [];
    const msg = (savedFavs.length === 0) && "You have no items in your favourites list.";

    spinner('.fav-container');

    setTimeout(() => {
        renderAllProducts(savedFavs, msg, '.fav-container');
    }, 500);

}