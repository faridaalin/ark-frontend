export const getFavsItem = (currentFavs, product) => {
    currentFavs.find(fav => {
      return parseInt(fav.id) === parseInt(product.id)
    });
  };
