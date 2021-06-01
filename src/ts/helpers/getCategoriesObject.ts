export const getCategoriesObject = (data: IProduct[]): ICategores =>
  data.reduce((acc: any, item: IProduct) => {
    acc[item.category] = { item };
    return acc;
  }, {});
