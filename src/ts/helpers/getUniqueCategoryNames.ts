export const getUniqueCategoryNames = (products: IProduct[]) => {
  const categories = products.map((product) => product.category);
  const categoriesToLoweCase = categories.map((category) =>
    category.toLowerCase()
  );
  const unique_categories = [...new Set(categoriesToLoweCase)];
  const backToUpperCase = unique_categories.map(
    (category) => category[0].toUpperCase() + category.slice(1).toLowerCase()
  );
  return backToUpperCase;
};
