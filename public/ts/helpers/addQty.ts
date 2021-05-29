export const addQty = () => {
    const increment = document.querySelector('.pluss');
    const decrement = document.querySelector('.minus');
    const qty = document.querySelector('.value');
  
    let value = 1;
    const handleIncrement = () => {
      qty.textContent = value += 1;
    };
  
    const handleDecrement = () => {
      (value <= 1) ? qty.textContent = value = 1 : qty.textContent = value -= 1;
    };
  
    increment.addEventListener('click', handleIncrement);
    decrement.addEventListener('click', handleDecrement);
  }
  
  
  