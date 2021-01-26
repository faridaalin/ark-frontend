import { user} from "../utils/settings.js";
import { getFromLocal } from "../utils/storage.js";

export const getLoggedInUser = () => {
  const loggedUser = getFromLocal(user);
  return loggedUser;

}
