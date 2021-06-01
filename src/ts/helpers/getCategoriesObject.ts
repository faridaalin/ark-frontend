export const getCategoriesObject = (data: IProduct[]): ICategores =>
  data.reduce((acc: ICategores, item: IProduct) => {
    acc[item.category] = { item };
    return acc;
  }, {});
