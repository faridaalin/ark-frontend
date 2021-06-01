export const createRatingArray = (product: IProduct) => {
  let productRating: string[] = [];
  const fullStar = `<i class="fa fa-star"></i>`;
  const emptyStar = `<i class="fa fa-star-o"></i>`;
  const RATING_NUMBER = 6;
  const rating = !product.rating ? 0 : product.rating;

  for (let i = 1; i < RATING_NUMBER; i++) {
    i <= rating ? productRating.push(fullStar) : productRating.push(emptyStar);
  }

  return productRating;
};
