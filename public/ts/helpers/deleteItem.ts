export const deleteItem = (array: any, id: number) => {
  return array.filter((item: any) => item.product.id !== id);
};
