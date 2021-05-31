import { loadCurrentItems } from "../helpers/loadCurrentItems";
import renderAllProducts from "../elements/renderAllProducts";
import { spinner } from "../elements/spinner";

export const saveToLocal = (key: string, value: [IProduct]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const saveCartItemsToLocal = (key: string, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  loadCurrentItems(key, ".cart-icon span");
};

export const saveToSessionStorage = (key: string, value: [IProduct]) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getFromSessionStorage = (key: string) => {
  const value = sessionStorage.getItem(key);
  return value === null ? null : JSON.parse(value);
};

export const getFromLocal = (key: string) => {
  const value = localStorage.getItem(key);
  return value === null ? null : JSON.parse(value);
};

export const saveToFavsListStorage = (tag: string, list: [IProduct]) => {
  saveToLocal(tag, list);
  loadCurrentItems(tag, ".favs-icon span");

  if (location.pathname === "/fav.html") {
    spinner(".fav-container");
    setTimeout(() => {
      renderAllProducts(list, "", ".fav-container");
    }, 500);
  }
};
