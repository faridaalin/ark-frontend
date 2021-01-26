import { BASE_URL,userToken } from "../utils/settings.js";
import { getFromLocal } from '../utils/storage.js';
import { updateProduct } from "../ui/updateProduct.js";
import { validateFields } from '../helpers/validateFields.js';
import { getLoggedInUser } from '../helpers/getLoggedInUser.js';

const user = getLoggedInUser();


export const editBackgroundImg = (e) => {
    const token = getFromLocal(userToken);
    const URL = `${BASE_URL}/home`;
    const formButton = document.querySelector("#edit-bg");
    const altText = document.querySelector(".altText");
    const imgUrl = document.querySelector(".img-url");

    const handleBgChange = (e) => {
        e.preventDefault();

        const isValid = validateFields("#editBg-form .form-control");
        if (isValid === false || isValid === undefined) {
            return;
        }

        const productObj = {
            hero_banner_alt_text: altText.value,
            hero_url: imgUrl.value,
        };

        updateProduct(productObj, URL, token);
        location.reload();

    };

    formButton.addEventListener('click', handleBgChange);

}


const renderHeroBanner = (url) => {
    const herobanner = document.querySelector('.herobanner');
    const herobannerContent = document.querySelector('.herobanner__content');
    herobanner.style.backgroundImage = `url(${url})`;

    const edit =
        user && user.username === "admin"
            ? ` <button type="button" class="btn btn-info btn-sm edit-btn edit-bg" data-toggle="modal" data-target="#herobannerBg">Edit image</button>`
            : "";

    herobannerContent.innerHTML += edit;

}

export default renderHeroBanner;
