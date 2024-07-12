//estilo para el navbar

window.addEventListener("scroll", function () {
    const navbar = document.getElementById("nav");
    const scrollPosition = window.scrollY;

    // Si el scroll está más abajo de cierta posición, añadir la clase bg-dark
    if (scrollPosition > 100) {
        navbar.classList.add("bg-dark");
    } else {
        // Si el scroll está arriba de cierta posición, quitar la clase bg-dark
        navbar.classList.remove("bg-dark");
    }
});

const MenuNavbar = document.querySelector(".toggle-menu");
const navbarlist = document.querySelector(".navbar-list");

const toggleMenu = () => {
    navbarlist.classList.toggle("open-Navbar");
   // overlay.classList.toggle("show-overlay");
};

MenuNavbar.addEventListener("click", toggleMenu);