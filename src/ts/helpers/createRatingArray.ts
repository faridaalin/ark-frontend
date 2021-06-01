export const createRatingArray = (product: IProduct) => {
  let productRating: string[] = [];
  const fullStar = `<i class="fa fa-star"></i>`;
  const emptyStar = `<i class="fa fa-star-o"></i>`;
  const RATING_NUMBER = 6;

  for (let i = 1; i < RATING_NUMBER; i++) {
    if (!product.rating) {
      i <= RATING_NUMBER && productRating.push(emptyStar);
      return productRating;
    } else {
      i <= product.rating
        ? productRating.push(fullStar)
        : productRating.push(emptyStar);
    }
  }

  return productRating;
};
