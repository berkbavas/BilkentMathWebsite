import { 
    ADMINISTRATIVE_STAFF,
} from "../data/administrative-staff.js";
import { escapeHtml } from "./helpers.js";

function cardTemplate(staff) {
    const currentLang = localStorage.getItem("lang") || "en";

    const name = staff.name || "";
    const title = staff.title?.[currentLang] || staff.title?.en || "";
    const responsibilities = staff.responsibilities?.[currentLang] || staff.responsibilities?.en || "";
    const office = staff.office || "";
    const phone = staff.phone || "";
    const email = staff.email || "";
    const photo = (staff.photo || "").trim();

    // Use a placeholder if no photo
    const photoSrc = photo || "https://via.placeholder.com/100x120?text=Photo";

    return `
    <article class="staff-card">
        <div class="staff-image-and-content">
            <div class="staff-media">
                <img src="${escapeHtml(photoSrc)}" alt="${escapeHtml(name)}" loading="lazy">
            </div>

            <div class="staff-content">
                <header class="staff-header">
                    <h3 class="staff-name">${escapeHtml(name)}</h3>
                    ${title ? `<span class="staff-title">${escapeHtml(title)}</span>` : ""}
                </header>
                ${responsibilities ? `<p class="staff-responsibilities">${escapeHtml(responsibilities)}</p>` : ""}
            </div>
        </div>

        <ul class="staff-meta">
            ${office ? `
            <li>
                <i class="fa-solid fa-door-open" aria-hidden="true"></i>
                <span>${escapeHtml(office)}</span>
            </li>` : ""}

            ${email ? `
            <li>
                <i class="fa-regular fa-envelope" aria-hidden="true"></i>
                <span>${escapeHtml(email)}</span>
            </li>` : ""}

            ${phone ? `
            <li>
                <i class="fa-solid fa-phone" aria-hidden="true"></i>
                <span>${escapeHtml(phone)}</span>
            </li>` : ""}
        </ul>
    </article>`;
}

function emptyState(lang) {
    const message = lang === "tr" 
        ? "Bu kategoride henüz personel bulunmamaktadır." 
        : "No staff members in this category yet.";
    
    return `
    <div class="staff-empty">
        <i class="fa-solid fa-user-slash" aria-hidden="true"></i>
        <p>${message}</p>
    </div>`;
}

function render() {
    const staffGrid = document.querySelector("#staffGrid");
    const staffCount = document.querySelector("#staffCount");
    const lang = localStorage.getItem("lang") || "en";

    // Get staff by category

    // Update count
    const totalCount = ADMINISTRATIVE_STAFF.length;
    if (staffCount) {
        staffCount.textContent = lang === "en" 
            ? `${totalCount} Staff Member${totalCount !== 1 ? 's' : ''}`
            : `${totalCount} Personel`;
    }

    // Render grids
    if (staffGrid) {
        staffGrid.innerHTML = ADMINISTRATIVE_STAFF.length 
            ? ADMINISTRATIVE_STAFF.map(cardTemplate).join("") 
            : emptyState(lang);
    }

    // Handle language toggle visibility
    document.querySelectorAll("[data-lang]").forEach(el => {
        const elLang = el.getAttribute("data-lang");
        el.hidden = elLang !== lang;
    });
}

// Expose render function for language toggle
document.render = render;
document.addEventListener("DOMContentLoaded", render);
