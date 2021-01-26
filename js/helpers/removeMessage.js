export const removeMessage = (tag) => {
    const element = document.querySelector(tag);
    element.innerHTML = "";
}