import { productCard } from "../components/productCard";

export const displayProductCard = (
  products: IProduct[],
  container: HTMLElement
) => {
  products.map((product) => (container.innerHTML += productCard(product)));
};
