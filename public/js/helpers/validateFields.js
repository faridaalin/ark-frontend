import { showMessage } from "../helpers/showMessage.js";
import { removeMessage } from '../helpers/removeMessage.js'
import { isImageUrlValid } from "../helpers/isValidImageUrl.js";

export const validateFields = (tag) => {
  removeMessage("#msg");
  const inputs = document.querySelectorAll(tag);
  const inputsArr = [...inputs];

  let isValid = true;

  for (let i = 0; i < inputsArr.length; i++) {
    if (inputsArr[i].value.length === 0) {
      inputsArr[i].classList.add("is-invalid");
      isValid = false;

    } else if (inputsArr[i].type === "url" && inputsArr[i].value.length > 0 && !isImageUrlValid(inputsArr[i].value)) {
      document.querySelector(".img-feedback").innerHTML = "Invalid url";
      inputsArr[i].classList.add("is-invalid");
      isValid = false;

    } else if (inputsArr[i].name === "price" && isNaN(inputsArr[i].value)) {
      document.querySelector(".price-feedback").innerHTML = "Price must a digit";
      inputsArr[i].classList.add("is-invalid");
      isValid = false;

    } else {
      inputsArr[i].classList.remove("is-invalid");
      inputsArr[i].classList.add("is-valid");
    }
  }


  if (isValid === false) {
    const msg = "Check for missing values or incorrect values";
    showMessage("danger", msg, "#msg");

    return;
  }
  return isValid;
};

export const removeValidationStyle = (tag) => {

  const inputs = document.querySelectorAll(tag);
  const inputsArr = [...inputs];

  for (let i = 0; i < inputsArr.length; i++) {

    inputsArr[i].classList.remove("is-invalid");
    inputsArr[i].classList.remove("is-valid");

  }

};
