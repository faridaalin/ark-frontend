export const getCategoriesObject = data =>
data.reduce((acc, item) => {
    acc[item.category] = { item };
    return acc;
}, {});