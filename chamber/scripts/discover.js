import { places } from "../data/places.mjs";

const gallery = document.querySelector("#discover-gallery");
const credits = document.querySelector("#photo-credits");
const dialog = document.querySelector("#place-details");

function showVisitMessage() {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    let message = "Welcome! Let us know if you have any questions.";

    try {
        const storedVisit = localStorage.getItem("chamber-discover-last-visit");
        const previousVisit = Number(storedVisit);
        if (storedVisit !== null && Number.isFinite(previousVisit)) {
            const elapsed = Math.max(0, now - previousVisit);
            const days = Math.floor(elapsed / day);
            message = elapsed < day
                ? "Back so soon! Awesome!"
                : `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
        }
        localStorage.setItem("chamber-discover-last-visit", String(now));
    } catch {
        // The welcome message still works when browser storage is unavailable.
    }

    document.querySelector("#visit-message").textContent = message;
}

function showDetails(place) {
    document.querySelector("#place-title").textContent = place.name;
    document.querySelector("#place-description").textContent = place.details;
    document.querySelector("#place-address").textContent = place.address;
    document.querySelector("#place-source").href = place.source;
    dialog.showModal();
}

function buildCard(place, index) {
    const card = document.createElement("article");
    card.className = "discover-card";

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = `images/${place.image}`;
    image.alt = place.alt;
    image.width = 300;
    image.height = 200;
    image.loading = index < 2 ? "eager" : "lazy";
    figure.append(image);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "benefits-button";
    button.textContent = "Learn more";
    button.setAttribute("aria-label", `Learn more about ${place.name}`);
    button.addEventListener("click", () => showDetails(place));

    card.append(title, figure, address, description, button);
    gallery.append(card);

    const credit = document.createElement("li");
    const source = document.createElement("a");
    source.href = place.photoSource;
    source.textContent = place.name;
    const license = document.createElement("a");
    license.href = place.licenseUrl;
    license.textContent = place.license;
    credit.append(source, ` — ${place.photographer}, `, license, ". Cropped and resized.");
    credits.append(credit);
}

showVisitMessage();
places.forEach(buildCard);
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
