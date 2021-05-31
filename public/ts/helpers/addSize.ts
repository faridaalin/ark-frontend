export const addSize = () => {
  const select = document.querySelector(".custom-select") as HTMLSelectElement;
  if (isNaN(+select.value)) {
    select.classList.add("is-invalid");
    return;
  } else {
    select.classList.remove("is-invalid");
    select.classList.add("is-valid");
  }
  return parseInt(select.value);
};
