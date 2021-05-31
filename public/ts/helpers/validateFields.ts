import { showMessage } from "./showMessage";
import { removeMessage } from "./removeMessage";
import { isImageUrlValid } from "./isValidImageUrl";

export const validateFields = (element: string) => {
  removeMessage("#msg");
  const inputs = document.querySelectorAll(element) as NodeListOf<Element>;
  const inputsArr = [...inputs];

  let isValid: boolean = true;

  for (let i = 0; i < inputsArr.length; i++) {
    if ((inputsArr[i] as HTMLInputElement).value.length === 0) {
      inputsArr[i].classList.add("is-invalid");
      isValid = false;
    } else if (
      (inputsArr[i] as HTMLInputElement).type === "url" &&
      (inputsArr[i] as HTMLInputElement).value.length > 0 &&
      !isImageUrlValid((inputsArr[i] as HTMLInputElement).value)
    ) {
      (document.querySelector(".img-feedback") as HTMLDivElement).innerHTML =
        "Invalid url";
      inputsArr[i].classList.add("is-invalid");
      isValid = false;
    } else if (
      (inputsArr[i] as HTMLInputElement).name === "price" &&
      isNaN(+(inputsArr[i] as HTMLInputElement).value)
    ) {
      (document.querySelector(".price-feedback") as HTMLDivElement).innerHTML =
        "Price must a digit";
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

export const removeValidationStyle = (element: string) => {
  const inputs = document.querySelectorAll(element);
  const inputsArr = [...inputs];

  for (let i = 0; i < inputsArr.length; i++) {
    inputsArr[i].classList.remove("is-invalid");
    inputsArr[i].classList.remove("is-valid");
  }
};
