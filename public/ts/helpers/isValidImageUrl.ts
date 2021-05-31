export const isImageUrlValid = (url: string) => {
  const regEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  return regEx.test(url);
};
