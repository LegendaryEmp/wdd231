const parameters = new URLSearchParams(window.location.search);
const requiredFields = ["first-name", "last-name", "email", "phone", "organization"];
const loadedAt = parameters.get("timestamp");
const applicationDate = loadedAt ? new Date(loadedAt) : null;
const complete = requiredFields.every((name) => parameters.get(name)?.trim())
    && applicationDate && !Number.isNaN(applicationDate.getTime());

if (complete) {
    requiredFields.forEach((name) => {
        document.getElementById(name).textContent = parameters.get(name);
    });

    const memberships = {
        np: "NP Membership",
        bronze: "Bronze Membership",
        silver: "Silver Membership",
        gold: "Gold Membership"
    };
    document.querySelector("#membership").textContent = memberships[parameters.get("membership")] || "Not specified";

    const time = document.querySelector("#submitted-time");
    time.dateTime = applicationDate.toISOString();
    time.textContent = new Intl.DateTimeFormat("en-NG", {
        dateStyle: "long",
        timeStyle: "long",
        timeZone: "Africa/Lagos"
    }).format(applicationDate);
    document.querySelector("#application-summary").hidden = false;
} else {
    document.querySelector("h1").textContent = "Your membership application";
    document.querySelector("#confirmation-message").textContent =
        "No complete application details were found. Please use the membership form to begin your application.";
}