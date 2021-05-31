import { saveFavourites } from "../helpers/saveFavourites";
import { card } from "../components/card";

const slideFeaturedImages = () => {
  const slidesContainer = document.querySelector(
    ".custom-carousel_slide-container"
  ) as HTMLDivElement;

  const slides = [...slidesContainer.children];
  const leftButton = document.querySelector(
    ".custom-carousel__button--left"
  ) as HTMLButtonElement;
  const rightButton = document.querySelector(
    ".custom-carousel__button--right"
  ) as HTMLButtonElement;
  const slideWidth = slides[0].getBoundingClientRect().width;

  const moveOneSlideLeft = () => {
    slidesContainer.scrollLeft -= slideWidth;
  };
  const moveOneSlideRight = () => {
    slidesContainer.scrollLeft += slideWidth;
  };

  leftButton.addEventListener("click", moveOneSlideLeft);
  rightButton.addEventListener("click", moveOneSlideRight);
};

const displayFeaturedProducts = (featuredPropducts: IProduct[]) => {
  const container = document.querySelector(
    ".featured-container"
  ) as HTMLDivElement;

  container.innerHTML = `<div class="custom-carousel"">
  <button class="custom-carousel__button custom-carousel__button--left" aria-label="left button"><i class="fa fa-chevron-left"></i></button>
  <ul class="custom-carousel_slide-container">
    ${featuredPropducts
      .map((product: IProduct) => {
        return `<li class="custom-carousel__slide ">${card(product)}</li>`;
      })
      .join("")}
  </ul>
    <button class="custom-carousel__button custom-carousel__button--right" aria-label="right button"><i class="fa fa-chevron-right"></i></button>
  </div>`;

  slideFeaturedImages();
  saveFavourites();
};

const renderFeatured = (products: IProduct[]) => {
  const featuredPropducts = products.filter((product) => product.featured);

  if (featuredPropducts.length !== 0) {
    displayFeaturedProducts(featuredPropducts);
  } else {
    (
      document.querySelector(".featured-title") as HTMLHeadingElement
    ).textContent = "";
    (document.querySelector(".carousel-featured") as HTMLDivElement).innerHTML =
      "";
  }
};

export default renderFeatured;
