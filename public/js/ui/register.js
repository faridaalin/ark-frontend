import { BASE_URL } from "../utils/settings.js";
import { showMessage } from "../helpers/showMessage.js";
import { removeMessage } from "../helpers/removeMessage.js";
import { validateEmail } from '../helpers/emailValidator.js';
import { fectData } from '../helpers/fetcData.js';
import { removeValidationStyle } from "../helpers/validateFields.js";
import { validateEmailIput, validateUserAndPasswordInput } from "../helpers/registerValidation.js";

export const register = (e) => {
  const registerBtn = document.querySelector(".registerBtn");

  const handleLogin = (e) => {
    e.preventDefault();

    const registerForm = document.querySelector('.register-form');
    const formSpinner = registerForm.querySelector('.form-group-spinner');
    const formGroupGontainer = registerForm.querySelector('.form-group-container');
    const username = document.querySelector("#registerUsername");
    const password = document.querySelector("#registerPassword");
    const email = document.querySelector("#registerEmail");
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();

    validateUserAndPasswordInput(usernameValue, username, 2)
    validateEmailIput(emailValue, email);
    validateUserAndPasswordInput(passwordValue, password, 8)

    if (usernameValue.length < 2 || passwordValue.length < 8 || !validateEmail(emailValue)) return;

    const registerNewUser = (userInfo) => {

      removeMessage(".register-form .message-container");
      const URL = `${BASE_URL}/auth/local/register`;

      const data = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      formSpinner.classList.add('hide-spinner');
      formGroupGontainer.classList.add('hide-form')

      fectData(URL, options).then(userData => {
        if (!userData || typeof userData === 'string') {
          const msg = "username or email already exist";
          showMessage("danger", msg, '.register-form .message-container');
          formSpinner.classList.remove('hide-spinner');
          formGroupGontainer.classList.remove('hide-form')
          username.classList.add("is-invalid");
          email.classList.add("is-invalid");
          registerForm.querySelector('.feedback-username').innerHTML = "";
          registerForm.querySelector('.feedback-email').innerHTML = "";
          registerForm.querySelector('.feedback-password').innerHTML = "";
          return;

        }
        formSpinner.classList.remove('hide-spinner');
        formGroupGontainer.classList.remove('hide-form')

        removeValidationStyle(".register-form .form-control");
        registerForm.reset();

        const msg = `You have now created an account with the username: "${userData.user.username}" and email:"${userData.user.email}". You can now login.`
        showMessage("success", msg, '.register-form .message-container');
      });
    };

    const newUserRegisterInfo = {
      usernameValue,
      emailValue,
      passwordValue
    };

    registerNewUser(newUserRegisterInfo);

  };

  registerBtn.addEventListener("click", handleLogin);
};
