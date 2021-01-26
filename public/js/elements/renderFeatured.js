import { saveFavourites } from '../helpers/saveFavourites.js';
import { getFromLocal } from "../utils/storage.js";
import { favs } from "../utils/settings.js";
import {card} from '../components/card.js'

const slideFeaturedImages = () => {
  const slidesContainer = document.querySelector('.custom-carousel_slide-container');
  const slides = [...slidesContainer.children];
  const leftButton = document.querySelector('.custom-carousel__button--left');
  const rightButton = document.querySelector('.custom-carousel__button--right');
  const slideWidth = slides[0].getBoundingClientRect().width;

  const moveOneSlideLeft = (e) => {
    slidesContainer.scrollLeft -= slideWidth
  }
  const moveOneSlideRight = (e) => {
    slidesContainer.scrollLeft += slideWidth
  }

  leftButton.addEventListener('click', moveOneSlideLeft);
  rightButton.addEventListener('click', moveOneSlideRight);

}


const displayFeaturedProducts = (featuredPropducts) => {
  const container = document.querySelector('.featured-container');
  const currentFavs = getFromLocal(favs) ? getFromLocal(favs) : [];

  container.innerHTML = `<div class="custom-carousel"">
  <button class="custom-carousel__button custom-carousel__button--left" aria-label="left button"><i class="fa fa-chevron-left"></i></button>
  <ul class="custom-carousel_slide-container">
    ${featuredPropducts.map(product => {
    return `<li class="custom-carousel__slide ">${card(product)}</li>`

  }).join("")}
  </ul>   
    <button class="custom-carousel__button custom-carousel__button--right" aria-label="right button"><i class="fa fa-chevron-right"></i></button>
  </div>`

  slideFeaturedImages();
  saveFavourites();

};


const renderFeatured = (products) => {
  const featuredPropducts = products.filter(product => product.featured);

  if (featuredPropducts.length !== 0) {
    displayFeaturedProducts(featuredPropducts);
  } else {
    document.querySelector('.featured-title').textContent = "";
    document.querySelector('.carousel-featured').innerHTML = "";
    
  }

};

export default renderFeatured;




