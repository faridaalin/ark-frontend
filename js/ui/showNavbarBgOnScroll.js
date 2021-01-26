const addNavbarBG = () => {
    const navbarHome = document.querySelector('.home');
    const navbarContainer = document.querySelector('.container-fluid-navbar');
    if (location.pathname === "/" || location.pathname === "/index.html") {
        if (window.scrollY > 15) {
            navbarHome.classList.add('custom-bg');
            return navbarHome.style.boxShadow = "rgba(7, 7, 7, 0.8) 2px 2px 13px 0px";
        }
        navbarHome.classList.remove('custom-bg');
        return navbarHome.style.boxShadow = "";
    }

    if (window.scrollY > 15) {
        navbarContainer.style.boxShadow = "rgba(198, 212, 219, 0.86) 2px 2px 13px 0px";
        return navbarContainer.style.backgroundColor = "#edf6f9";
    }
    navbarContainer.style.boxShadow = "";
    navbarContainer.style.backgroundColor = "transparent";

}

export const showNavbarBgOnScroll = () => {

    if (window.scrollY > 15) {
        addNavbarBG();
    }
    const getWindowScrollY = () => {
        addNavbarBG();
    };
    window.addEventListener("scroll", getWindowScrollY);
};