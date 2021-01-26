import { productCard } from "../components/productCard.js";

export const displayProductCard = (products, container) => {
    products.map(product => container.innerHTML += productCard(product));
};