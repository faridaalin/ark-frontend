import { getUrlParam } from "./helpers/getUrlParam";
import { BASE_URL } from "./utils/settings";
import { productDetail } from "./components/productDetail";
import { renderNavbar } from "./elements/renderNavbar";
import { addToCart } from "./helpers/addtoCart";
import { fectData } from "./helpers/fetcData";
import { showMessage } from "./helpers/showMessage";
import { removeMessage } from "./helpers/removeMessage";
import { spinner } from "./elements/spinner";
import { setMetaTags } from "./helpers/setMetaTags";

renderNavbar();

(() => {
  const id = getUrlParam("id");
  removeMessage(".pdp-container .message-container");
  const URL = `${BASE_URL}/products/${id}`;

  spinner(".pdp-detail-container");

  fectData(URL).then((result) => {
    if (!result || typeof result === "string") {
      spinner(".pdp-detail-container .spinner-container", "d-none");
      showMessage("danger", result, ".pdp-container .message-container");
      return;
    }

    console.log("PDP result:", result);
    document.title = result.title;
    const breadcrumb = document.querySelector(".breadcrumb") as HTMLLIElement;
    breadcrumb.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${result.title}</li>`;

    setMetaTags(result.description, result.title);
    productDetail(result);
    addToCart(result);
  });
})();
