import { showMessage } from "../helpers/showMessage";
import { fectData } from "../helpers/fetcData";

export const deleteProduct = (url, token) => {
  const container = document.querySelector(".buttons");
  container.innerHTML += `<button type="button" name="action" value="delete" class="btn btn-outline-danger btn-block product-delete" data-toggle="modal" data-target="#deleteProduct">
    Delete
  </button>`;

  const deleteButton = document.querySelector(".btn-delete");

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

      history.back();
    });
  };

  deleteButton.addEventListener("click", handleDeleteProduct);
};
