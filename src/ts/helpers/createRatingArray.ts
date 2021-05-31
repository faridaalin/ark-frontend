export const createRatingArray = (product: IProduct) => {
  let productRating: any = [];
  const fullStar = `<i class="fa fa-star"></i>`;
  const emptyStar = `<i class="fa fa-star-o"></i>`;
  const RATING_NUMBER = 6;

  for (let i = 1; i < RATING_NUMBER; i++) {
    if (!product.rating) {
      productRating = [
        '<i class="fa fa-star-o"></i>',
        '<i class="fa fa-star-o"></i>',
        '<i class="fa fa-star-o"></i>',
        '<i class="fa fa-star-o"></i>',
        '<i class="fa fa-star-o"></i>',
      ];
    } else {
      i <= product.rating
        ? productRating.push(fullStar)
        : productRating.push(emptyStar);
      return productRating;
    }
  }

  return productRating;
};
