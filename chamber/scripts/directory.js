const directory = document.querySelector("#member-directory");
const viewButtons = document.querySelectorAll("[data-view]");

function membershipName(level) {
    if (level === 3) return "Gold member";
    if (level === 2) return "Silver member";
    return "Member";
}

function createMemberCard(member) {
    const card = document.createElement("article");
    card.className = "member-card";

    const header = document.createElement("div");
    header.className = "member-card-header";
    const logo = document.createElement("img");
    logo.src = member.image;
    logo.alt = `${member.name} logo`;
    logo.width = 62;
    logo.height = 62;
    logo.loading = "lazy";
    const headingGroup = document.createElement("div");
    const heading = document.createElement("h2");
    heading.textContent = member.name;
    const tagline = document.createElement("p");
    tagline.className = "tagline";
    tagline.textContent = member.tagline;
    headingGroup.append(heading, tagline);
    header.append(logo, headingGroup);

    const badge = document.createElement("p");
    badge.className = "membership-badge";
    badge.textContent = membershipName(member.membershipLevel);

    const details = document.createElement("address");
    details.className = "member-details";
    const address = document.createElement("span");
    address.textContent = member.address;
    const phone = document.createElement("a");
    phone.href = member.phoneLink;
    phone.textContent = member.phone;
    const website = document.createElement("a");
    website.href = member.website;
    website.textContent = "Visit website";
    details.append(address, phone, website);
    card.append(header, badge, details);
    return card;
}

viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const useListView = button.dataset.view === "list";
        directory.classList.toggle("list-view", useListView);
        viewButtons.forEach((viewButton) => {
            viewButton.setAttribute("aria-pressed", String(viewButton === button));
        });
    });
});

async function loadDirectory() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Member request failed");
        const members = await response.json();
        directory.replaceChildren(...members.map(createMemberCard));
    } catch (error) {
        const message = document.createElement("p");
        message.className = "error-message";
        message.textContent = "The member directory is temporarily unavailable.";
        directory.replaceChildren(message);
        console.error("Unable to load member directory:", error);
    }
}

loadDirectory();
