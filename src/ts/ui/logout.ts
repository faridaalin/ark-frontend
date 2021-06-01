import { user, userToken } from "../utils/settings";
import { renderNavbar } from "../elements/renderNavbar";

export const logout = () => {
  const logoutBtn = document.querySelector(".logout") as HTMLButtonElement;
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(user);
    localStorage.removeItem(userToken);
    location.reload();
    renderNavbar();
  });
};
