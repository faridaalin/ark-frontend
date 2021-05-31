export const getCategoriesObject = (data: any) =>
  data.reduce((acc: any, item: any) => {
    acc[item.category] = { item };
    return acc;
  }, {});
