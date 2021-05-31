export const removeMessage = (tag: string) => {
  const element = document.querySelector(tag) as HTMLDivElement;
  element.innerHTML = "";
};
