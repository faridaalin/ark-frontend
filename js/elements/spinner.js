export const spinner = (container, css) => {
    const element = document.querySelector(container);
    const cssClass = css ? css : "";
    
    return element.innerHTML = `
    <div class="spinner-container  main-container ${cssClass} ">
      <div class="d-flex align-items-center justify-content-center">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-secondary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
`;

};