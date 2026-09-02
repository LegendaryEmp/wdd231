const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const largeScreen = window.matchMedia("(min-width: 700px)");

function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-collapsed", !isOpen);
}

function syncNavigation() {
    const focusedElement = document.activeElement;
    menuButton.hidden = largeScreen.matches;
    setMenuOpen(largeScreen.matches);

    if (!largeScreen.matches && navigation.contains(focusedElement)) {
        menuButton.focus();
    } else if (largeScreen.matches && focusedElement === menuButton) {
        navigation.querySelector("a").focus();
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
    if (event.key === "Escape" && !largeScreen.matches && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuButton.focus();
    }
});

largeScreen.addEventListener("change", syncNavigation);
syncNavigation();
