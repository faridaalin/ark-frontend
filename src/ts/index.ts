import { renderGridCategory } from "./elements/renderGridCategory";
import { BASE_URL, allProducts } from "./utils/settings";
import renderHeroBanner from "./elements/renderHerobanner";
import renderFeatured from "./elements/renderFeatured";
import { renderNavbar } from "./elements/renderNavbar";
import { saveToSessionStorage, getFromSessionStorage } from "./utils/storage";
import { editBackgroundImg } from "./elements/renderHerobanner";
import { spinner } from "./elements/spinner";
import { fectData } from "./helpers/fetcData";
import { showMessage } from "./helpers/showMessage";
import { removeMessage } from "./helpers/removeMessage";
import { lasyLoadImages } from "./helpers/lasyLoadImages";

renderNavbar();

(async () => {
  removeMessage(".herobanner .message-container");
  removeMessage(".featured-container .message-container");
  const heroLoader = document.querySelector(".hero-loader ") as HTMLDivElement;

  const products = getFromSessionStorage(allProducts);
  const hero = getFromSessionStorage("herobanner");

  if (products !== null && hero !== null) {
    heroLoader.style.display = "none";
    renderGridCategory(products);
    renderFeatured(products);
    renderHeroBanner(hero.hero_url);
    lasyLoadImages();
    editBackgroundImg();

    return;
  } else {
    const homeUrl = `${BASE_URL}/home`;
    const productsUrl = `${BASE_URL}/products`;

    spinner(".featured-container");

    const [homeResponse, productResponse] = await Promise.all([
      fectData(homeUrl),
      fectData(productsUrl),
    ]);

    if (!homeResponse || typeof homeResponse === "string") {
      const msg = "Failed to get background image, couble check the url.";
      return showMessage("danger", msg, ".herobanner .message-container");
    }

    renderHeroBanner(homeResponse.hero_url);
    if (!productResponse || typeof productResponse === "string") {
      showMessage(
        "danger",
        "Sorry, an error happened. Please, try again later.",
        ".featured-container .message-container"
      );
      return;
    }

    heroLoader.style.display = "none";

    renderGridCategory(productResponse);
    renderFeatured(productResponse);
    lasyLoadImages();
    editBackgroundImg();
    saveToSessionStorage(allProducts, productResponse);
    saveToSessionStorage("herobanner", homeResponse);
  }
})();
