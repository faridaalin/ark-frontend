import { BASE_URL, allProducts } from "./utils/settings";
import renderAllProducts from "./elements/renderAllProducts";
import { renderNavbar } from "./elements/renderNavbar";
import { saveToSessionStorage } from "./utils/storage";
import { renderFilterOptions } from "./elements/renderFilterOptions";
import { fectData } from "./helpers/fetcData";
import { showMessage } from "./helpers/showMessage";
import { removeMessage } from "./helpers/removeMessage";
import { spinner } from "./elements/spinner";

renderNavbar();

(() => {
  removeMessage(".shop-container .message-container");

  const URL = `${BASE_URL}/products`;
  spinner(".shop-container");

  fectData(URL).then((result) => {
    if (!result || typeof result === "string") {
      return showMessage(
        "danger",
        result,
        ".shop-container .message-container"
      );
    }

    console.log("shop:", result);

    saveToSessionStorage(allProducts, result);
    renderAllProducts(result, "Shop is currently empty", ".shop-container");
    renderFilterOptions(result);
  });
})();
