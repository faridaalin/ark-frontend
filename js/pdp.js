import {getUrlParam} from './helpers/getUrlParam.js'
import { BASE_URL } from "./utils/settings.js";
import { productDetail } from './components/productDetail.js'
import { renderNavbar } from "./elements/renderNavbar.js";
import { addToCart } from './helpers/addtoCart.js'
import { fectData } from './helpers/fetcData.js';
import { showMessage } from './helpers/showMessage.js';
import { removeMessage } from './helpers/removeMessage.js';
import { spinner } from "./elements/spinner.js";
import {setMetaTags} from './helpers/setMetaTags.js'

renderNavbar();


(() => {
  const id = getUrlParam("id");
  removeMessage('.pdp-container .message-container')
  const URL = `${BASE_URL}/products/${id}`;

  spinner('.pdp-detail-container');

  fectData(URL).then(result => {
    if (!result || typeof result === 'string') {
      spinner('.pdp-detail-container .spinner-container', 'd-none');
      showMessage('danger', result, '.pdp-container .message-container');
      return;

    }
    document.title = result.title;
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${result.title}</li>`;

    setMetaTags(result.description, result.title);
    productDetail(result)
    addToCart(result);
  });

}
)();










