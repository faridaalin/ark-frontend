import { BASE_URL, userToken } from "./utils/settings";
import { getFromLocal } from "./utils/storage";
import { renderNavbar } from "./elements/renderNavbar";
import { removeMessage } from "./helpers/removeMessage";
import { addNewProduct } from "./ui/addProduct";
import {} from "./ui/addProduct";
import {
  validateFields,
  removeValidationStyle,
} from "./helpers/validateFields";
import { getLoggedInUser } from "./helpers/getLoggedInUser";

renderNavbar();

const form = document.querySelector("#addForm") as HTMLFormElement;
const user = getLoggedInUser();

if (!user) location.href = "/";

if (user && user.username === "admin") {
  const URL = `${BASE_URL}/products`;
  const token = getFromLocal(userToken);

  const title = document.querySelector("#name") as HTMLInputElement;
  const brand = document.querySelector("#brand") as HTMLInputElement;
  const price = document.querySelector("#price") as HTMLInputElement;
  const description = document.querySelector(
    "#description"
  ) as HTMLInputElement;
  const imgUrl = document.querySelector("#url") as HTMLInputElement;
  const altText = document.querySelector(".altText") as HTMLInputElement;
  const category = document.querySelector(".category") as HTMLInputElement;
  const featured = document.querySelector("#featured") as HTMLInputElement;

  const handleNewproduct = (e: Event) => {
    e.preventDefault();
    removeMessage("#msg");

    const isValid = validateFields(".add-form .form-control");
    if (isValid !== true) return;

    const productObject = {
      title: title.value,
      brand: brand.value,
      price: price.value,
      description: description.value,
      image_url: imgUrl.value,
      alt_text: altText.value,
      category: category.value,
      featured: featured.checked,
    };

    addNewProduct(URL, token, productObject);
    removeValidationStyle(".add-form .form-control");
    form.reset();
  };

  form.addEventListener("submit", handleNewproduct);
}
