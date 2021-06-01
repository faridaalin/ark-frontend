import { BASE_URL } from "../utils/settings";
import { showMessage } from "../helpers/showMessage";
import { removeMessage } from "../helpers/removeMessage";
import { validateEmail } from "../helpers/emailValidator";
import { fectData } from "../helpers/fetcData";
import { removeValidationStyle } from "../helpers/validateFields";
import {
  validateEmailIput,
  validateUserAndPasswordInput,
} from "../helpers/registerValidation";

export const register = () => {
  const registerBtn = document.querySelector(
    ".registerBtn"
  ) as HTMLButtonElement;

  const handleLogin = (e: Event) => {
    e.preventDefault();

    const registerForm = document.querySelector(
      ".register-form"
    ) as HTMLFormElement;
    const formSpinner = registerForm.querySelector(
      ".form-group-spinner"
    ) as HTMLDivElement;
    const formGroupGontainer = registerForm.querySelector(
      ".form-group-container"
    ) as HTMLDivElement;
    const username = document.querySelector(
      "#registerUsername"
    ) as HTMLInputElement;
    const password = document.querySelector(
      "#registerPassword"
    ) as HTMLInputElement;
    const email = document.querySelector("#registerEmail") as HTMLInputElement;
    const usernameValue = (username as HTMLInputElement).value.trim();
    const passwordValue = (password as HTMLInputElement).value.trim();
    const emailValue = (email as HTMLInputElement).value.trim();

    validateUserAndPasswordInput(usernameValue, username, 2);
    validateEmailIput(emailValue, email);
    validateUserAndPasswordInput(passwordValue, password, 8);

    if (
      usernameValue.length < 2 ||
      passwordValue.length < 8 ||
      !validateEmail(emailValue)
    )
      return;

    interface IUser {
      usernameValue: string;
      emailValue: string;
      passwordValue: string;
    }
    const registerNewUser = (user: IUser) => {
      removeMessage(".register-form .message-container");
      const URL = `${BASE_URL}/auth/local/register`;

      const data = {
        username: user.usernameValue,
        email: user.emailValue,
        password: user.passwordValue,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      formSpinner.classList.add("hide-spinner");
      formGroupGontainer.classList.add("hide-form");

      fectData(URL, options).then((userData) => {
        if (!userData || typeof userData === "string") {
          const msg = "username or email already exist";
          showMessage("danger", msg, ".register-form .message-container");
          formSpinner.classList.remove("hide-spinner");
          formGroupGontainer.classList.remove("hide-form");
          username.classList.add("is-invalid");
          email.classList.add("is-invalid");
          (
            registerForm.querySelector(".feedback-username") as HTMLDivElement
          ).innerHTML = "";
          (
            registerForm.querySelector(".feedback-email") as HTMLDivElement
          ).innerHTML = "";
          (
            registerForm.querySelector(".feedback-password") as HTMLDivElement
          ).innerHTML = "";
          return;
        }
        formSpinner.classList.remove("hide-spinner");
        formGroupGontainer.classList.remove("hide-form");

        removeValidationStyle(".register-form .form-control");
        registerForm.reset();

        const msg = `You have now created an account with the username: "${userData.user.username}" and email:"${userData.user.email}". You can now login.`;
        showMessage("success", msg, ".register-form .message-container");
      });
    };

    const newUser = {
      usernameValue,
      emailValue,
      passwordValue,
    };

    registerNewUser(newUser);
  };

  registerBtn.addEventListener("click", handleLogin);
};
