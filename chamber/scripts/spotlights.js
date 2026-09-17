const spotlightContainer = document.querySelector("#spotlight-cards");

function shuffleMembers(members) {
    const shuffled = [...members];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
}

function membershipName(level) {
    return level === 3 ? "Gold member" : "Silver member";
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
    const name = document.createElement("h3");
    name.textContent = member.name;
    const tagline = document.createElement("p");
    tagline.className = "tagline";
    tagline.textContent = member.tagline;
    headingGroup.append(name, tagline);
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

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Member request failed");

        const members = await response.json();
        const eligibleMembers = members.filter((member) => member.membershipLevel >= 2);
        const featuredMembers = shuffleMembers(eligibleMembers).slice(0, 3);
        spotlightContainer.replaceChildren(...featuredMembers.map(createMemberCard));
    } catch (error) {
        const message = document.createElement("p");
        message.className = "error-message";
        message.textContent = "Member spotlights are temporarily unavailable.";
        spotlightContainer.replaceChildren(message);
        console.error("Unable to load member spotlights:", error);
    }
}

loadSpotlights();
