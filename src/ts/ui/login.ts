import { BASE_URL, user, userToken } from "../utils/settings";
import { saveToLocal } from "../utils/storage";
import { showMessage } from "../helpers/showMessage";
import { removeMessage } from "../helpers/removeMessage";
import { renderNavbar } from "../elements/renderNavbar";
import { fectData } from "../helpers/fetcData";

export const login = () => {
  const loginBtn = document.querySelector(".loginBtn") as HTMLButtonElement;

  const handleLogin = (e: Event) => {
    e.preventDefault();

    const username = document.querySelector("#username") as HTMLInputElement;
    const password = document.querySelector("#password") as HTMLInputElement;
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length < 2) {
      username.classList.add("is-invalid");
    } else {
      username.classList.remove("is-invalid");
      username.classList.add("is-valid");
    }
    if (passwordValue.length < 8) {
      password.classList.add("is-invalid");
    } else {
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
    }

    if (usernameValue.length > 2 && passwordValue.length > 7) {
      const authUser = (
        username: HTMLInputElement,
        password: HTMLInputElement
      ) => {
        removeMessage(".message-container");
        const URL = `${BASE_URL}/auth/local`;

        const usernameValue = username.value.trim();
        const passwordValue = password.value.trim();

        const data = {
          identifier: usernameValue,
          password: passwordValue,
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };

        const formSpinner = document.querySelector(
          ".form-group-spinner"
        ) as HTMLDivElement;
        const formGroupGontainer = document.querySelector(
          ".form-group-container"
        ) as HTMLDivElement;
        formSpinner.classList.add("hide-spinner");
        formGroupGontainer.classList.add("hide-form");

        fectData(URL, options).then((userData) => {
          if (!userData || typeof userData === "string") {
            const msg = "Invalid username or password";
            showMessage("danger", msg, ".message-container");
            formSpinner.classList.remove("hide-spinner");
            formGroupGontainer.classList.remove("hide-form");
            username.classList.add("is-invalid");
            password.classList.add("is-invalid");
            (
              document.querySelector(".feedback-password") as HTMLDivElement
            ).innerHTML = "";
            (
              document.querySelector(".feedback-username") as HTMLDivElement
            ).innerHTML = "";
            return;
          }
          saveToLocal(user, userData.user);
          saveToLocal(userToken, userData.jwt);
          const modal = document.querySelector(".modal") as HTMLDivElement;
          modal.classList.remove("show");
          modal.classList.add("hide");

          location.reload();
          renderNavbar();
        });
      };

      authUser(username, password);
    }
  };

  loginBtn.addEventListener("click", handleLogin);
};
