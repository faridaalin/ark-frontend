export const showMessage = (cssClass: string, msg: string, element: string) => {
  const msgContainer = document.querySelector(element) as HTMLElement;
  return (msgContainer.innerHTML = `<div class="alert alert-${cssClass}" role="alert">${msg}</div>`);
};
