import { validateEmail } from '../helpers/emailValidator.js';

export const validateUserAndPasswordInput = (fieldValue, field, n) => {
    if (fieldValue.length < n) {
        field.classList.add("is-invalid");
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
    }
}
export const validateEmailIput = (fieldValue, field) => {
    if (!validateEmail(fieldValue)) {
        field.classList.add("is-invalid");
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
    }
}