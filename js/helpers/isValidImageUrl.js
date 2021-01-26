export const isImageUrlValid = (url) => {
    const regEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    return regEx.test(url);
  };
  
