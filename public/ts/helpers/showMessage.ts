export const showMessage = (cssClass, msg, tag) => {
    const msgContainer = document.querySelector(tag);
    return msgContainer.innerHTML = `<div class="alert alert-${cssClass}" role="alert">${msg}</div>`;

}
