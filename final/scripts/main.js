const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const largeScreen = window.matchMedia('(min-width: 48rem)');

function closeMenu() {
    navigation.hidden = !largeScreen.matches;
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
}

menu.hidden = false;
closeMenu();
largeScreen.addEventListener('change', closeMenu);

menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    navigation.hidden = !open;
    navigation.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menu.focus();
    }
});

document.querySelector('#year').textContent = new Date().getFullYear();
