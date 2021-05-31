export const addQty = () => {
  const increment = document.querySelector(".pluss") as HTMLElement;
  const decrement = document.querySelector(".minus") as HTMLElement;
  const qty = document.querySelector(".value") as HTMLElement;

  let value = 1;
  const handleIncrement = () => {
    value += 1;
    qty.textContent = value.toString();
  };

  const handleDecrement = () => {
    value <= 1 ? (value = 1) : (value -= 1);
    qty.textContent = value.toString();
  };

  increment.addEventListener("click", handleIncrement);
  decrement.addEventListener("click", handleDecrement);
};
