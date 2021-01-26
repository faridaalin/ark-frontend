export const getUrlParam = (param) => {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    return urlParam.get(param);
  }
  