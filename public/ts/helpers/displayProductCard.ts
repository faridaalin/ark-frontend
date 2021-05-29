import { productCard } from "../components/productCard";

export const displayProductCard = (products, container) => {
  products.map((product) => (container.innerHTML += productCard(product)));
};
