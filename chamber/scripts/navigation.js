const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const largeScreen = window.matchMedia("(min-width: 700px)");

function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navigation.hidden = !isOpen;
}

function syncNavigation() {
    if (largeScreen.matches) {
        setMenuOpen(true);
    } else {
        setMenuOpen(false);
    }
}

menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
    if (!largeScreen.matches && event.target.closest("a")) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !largeScreen.matches && !navigation.hidden) {
        setMenuOpen(false);
        menuButton.focus();
    }
});

largeScreen.addEventListener("change", syncNavigation);
syncNavigation();
