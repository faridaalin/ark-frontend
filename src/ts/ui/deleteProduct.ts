import { showMessage } from "../helpers/showMessage";
import { fectData } from "../helpers/fetcData";

export const deleteProduct = (url: string, token: string) => {
  const container = document.querySelector(".buttons") as HTMLDivElement;
  container.innerHTML += `<button type="button" name="action" value="delete" class="btn btn-outline-danger btn-block product-delete" data-toggle="modal" data-target="#deleteProduct">
    Delete
  </button>`;

  const deleteButton = document.querySelector(
    ".btn-delete"
  ) as HTMLButtonElement;

  const handleDeleteProduct = async () => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fectData(url, options).then((result) => {
      if (!result || typeof result === "string") {
        return showMessage("danger", result, "#msg");
      }

      if (result.created_at) {
        const msg = `${result.title} is deleted`;
        showMessage("success", msg, "#msg");
      }

      location.href = "/shop.html";
    });
  };

  deleteButton.addEventListener("click", handleDeleteProduct);
};
