import { showMessage } from "../helpers/showMessage";
import { fectData } from "../helpers/fetcData";

export const updateProduct = async <T>(obj: T, url: string, token: string) => {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fectData(url, options).then((product) => {
    if (!product || typeof product === "string") {
      return showMessage("danger", product, ".edit-form .message-container");
    }

    if (product.updated_at) {
      const msg = "Product has been updated.";
      return showMessage("success", msg, ".edit-form .message-container");
    }

    if (product.error) {
      const msg = product.error;
      return showMessage("danger", msg, ".edit-form .message-container");
    }
  });
};
