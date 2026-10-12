import { getMeals } from './data.js';

const grid = document.querySelector('#meal-grid');
const status = document.querySelector('#meal-status');
const filter = document.querySelector('#category-filter');
const dialog = document.querySelector('#meal-dialog');
const featured = grid.dataset.featured === 'true';
let meals = [];
let lastButton;

function openDetails(meal, button) {
    lastButton = button;
    document.querySelector('#dialog-title').textContent = meal.name;
    document.querySelector('#dialog-category').textContent = meal.category;
    document.querySelector('#dialog-description').textContent = meal.description;
    document.querySelector('#dialog-serving').textContent = meal.serving;
    dialog.showModal();
}

function displayMeals(category = 'all') {
    const selected = featured ? meals.slice(0, 3) : meals.filter((meal) => category === 'all' || meal.category === category);
    grid.replaceChildren();
    selected.forEach((meal, index) => {
        const card = document.createElement('article');
        card.className = 'meal-card';
        card.innerHTML = `
            <img src="${meal.image}" alt="${meal.alt}" width="400" height="300" loading="${index < 3 ? 'eager' : 'lazy'}">
            <div class="meal-content">
                <p class="category">${meal.category}</p>
                <h2>${meal.name}</h2>
                <p>${meal.description}</p>
                <button class="details-button" type="button" aria-label="About this meal: ${meal.name}">About this meal</button>
            </div>`;
        if (featured) {
            const heading = card.querySelector('h2');
            const smallerHeading = document.createElement('h3');
            smallerHeading.textContent = heading.textContent;
            heading.replaceWith(smallerHeading);
        }
        const button = card.querySelector('button');
        button.addEventListener('click', () => openDetails(meal, button));
        grid.append(card);
    });
    status.hidden = featured;
    status.textContent = `${selected.length} ${selected.length === 1 ? 'meal' : 'meals'} shown`;
}

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => lastButton?.focus());

if (filter) {
    filter.addEventListener('change', () => {
        displayMeals(filter.value);
        try {
            localStorage.setItem('nigerian-kitchen-category', filter.value);
        } catch {
            // Filtering still works if browser storage is unavailable.
        }
    });
}

async function loadGallery() {
    try {
        meals = await getMeals();
        if (filter) {
            let savedCategory;
            try {
                savedCategory = localStorage.getItem('nigerian-kitchen-category');
            } catch {
                savedCategory = 'all';
            }
            if ([...filter.options].some((option) => option.value === savedCategory)) {
                filter.value = savedCategory;
            }
            filter.disabled = false;
        }
        displayMeals(filter ? filter.value : 'all');
    } catch {
        status.hidden = false;
        status.textContent = 'The meals could not be loaded. Please refresh the page to try again.';
    } finally {
        grid.setAttribute('aria-busy', 'false');
    }
}

loadGallery();
