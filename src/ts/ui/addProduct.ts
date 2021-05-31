import { showMessage } from "../helpers/showMessage";
import { removeMessage } from "../helpers/removeMessage";
import { fectData } from "../helpers/fetcData";

export const addNewProduct = (url: string, token: string, obj: any) => {
  removeMessage("#msg");

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };

  fectData(url, options).then((result) => {
    if (!result || typeof result === "string") {
      return showMessage("danger", result, "#msg");
    }
    if (result.created_at) {
      const msg = `${obj.title} has been created`;
      showMessage("success", msg, "#msg");
    }
  });
};
