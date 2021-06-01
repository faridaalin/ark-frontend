import { BASE_URL, userToken } from "../utils/settings";
import { getFromLocal } from "../utils/storage";
import { updateProduct } from "../ui/updateProduct";
import { validateFields } from "../helpers/validateFields";
import { getLoggedInUser } from "../helpers/getLoggedInUser";

const user = getLoggedInUser();

export const editBackgroundImg = () => {
  const token = getFromLocal(userToken);
  const URL = `${BASE_URL}/home`;
  const formButton = document.querySelector("#edit-bg") as HTMLButtonElement;
  const altText = document.querySelector(".altText") as HTMLInputElement;
  const imgUrl = document.querySelector(".img-url") as HTMLInputElement;

  const handleBgChange = (e: Event) => {
    e.preventDefault();

    const isValid = validateFields("#editBg-form .form-control");

    if (isValid !== true) return;

    const productObj = {
      hero_banner_alt_text: altText.value,
      hero_url: imgUrl.value,
    };

    updateProduct<IUpdateHeroBanner>(productObj, URL, token);
    location.reload();
  };

  formButton.addEventListener("click", handleBgChange);
};

const renderHeroBanner = (url: string) => {
  const herobanner = document.querySelector(".herobanner") as HTMLDivElement;
  const herobannerContent = document.querySelector(
    ".herobanner__content"
  ) as HTMLDivElement;
  herobanner.style.backgroundImage = `url(${url})`;

  const edit =
    user && user.username === "admin"
      ? ` <button type="button" class="btn btn-info btn-sm edit-btn edit-bg" data-toggle="modal" data-target="#herobannerBg">Edit image</button>`
      : "";

  herobannerContent.innerHTML += edit;
};

export default renderHeroBanner;
