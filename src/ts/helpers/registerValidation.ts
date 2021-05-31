import { validateEmail } from "./emailValidator";

export const validateUserAndPasswordInput = (
  fieldValue: string,
  field: HTMLDivElement,
  n: number
) => {
  if (fieldValue.length < n) {
    field.classList.add("is-invalid");
  } else {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  }
};
export const validateEmailIput = (
  fieldValue: string,
  field: HTMLDivElement
) => {
  if (!validateEmail(fieldValue)) {
    field.classList.add("is-invalid");
  } else {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  }
};
