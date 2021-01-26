export const deleteItem = (array, id) => {
    return array.filter((item) => item.product.id !== id);
  };