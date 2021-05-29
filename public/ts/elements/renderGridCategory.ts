import { getCategoriesObject } from "../helpers/getCategoriesObject";

export const renderGridCategory = (products) => {
  const masonryGrid = document.querySelector(".masonry");
  const modifiedCategores = getCategoriesObject(products);

  for (const property in modifiedCategores) {
    const name = modifiedCategores[property].item.category;
    const nameToUpperCase = name[0].toUpperCase() + name.slice(1).toLowerCase();
    const img = modifiedCategores[property].item.image_url
      ? modifiedCategores[property].item.image_url
      : modifiedCategores[property].item.image.url
      ? `http://localhost:1337${modifiedCategores[property].item.image.url}`
      : `https://res.cloudinary.com/djey7uz4e/image/upload/v1606132924/noImage_plcdvu.jpg`;
    masonryGrid.innerHTML += `<a href="category.html?category=${name}" class="masonry__item" data-name="${name}" ><div class="masonry__image" style="background-image: url(${img});"><span>${nameToUpperCase}</span></div></a>`;
  }
};
