export const addSize = () => {
    const select = document.querySelector('.custom-select');
    let selectedSize;
  
    if (isNaN(select.value)) {
      select.classList.add('is-invalid');
      return;
    } else {
      select.classList.remove('is-invalid');
      select.classList.add('is-valid');
    }
    return  selectedSize = parseInt(select.value);
  
    select.addEventListener('change', handleSize);
  }
  