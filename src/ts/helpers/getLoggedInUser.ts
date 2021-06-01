import { user } from "../utils/settings";
import { getFromLocal } from "../utils/storage";

export const getLoggedInUser = () => {
  const loggedUser = getFromLocal(user);
  return loggedUser;
};
