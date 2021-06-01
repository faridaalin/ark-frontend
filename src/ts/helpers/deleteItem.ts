export const deleteItem = (array: Icart[], id: number): Icart[] => {
  return array.filter((item: Icart) => item.product.id !== id);
};
