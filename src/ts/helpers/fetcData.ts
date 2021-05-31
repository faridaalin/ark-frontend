export const fectData = async (url: string, options?: any) => {
  try {
    const response = options ? await fetch(url, options) : await fetch(url);
    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText,
      };
    }
    return await response.json();
  } catch (error) {
    console.error(error.statusText);
    return error.statusText;
  }
};
