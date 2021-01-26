export const lasyLoadImages = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
        "https://cdn.jsdelivr.net/npm/vanilla-lazyload@12.0.0/dist/lazyload.min.js";
    window.lazyLoadOptions = {
        elements_selector: "[loading=lazy]"
    };
    document.body.appendChild(script);
}