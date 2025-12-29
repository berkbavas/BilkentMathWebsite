import { CURRENT_FACULTY } from "../data/faculty.js";
import { EMERITI } from "../data/emeriti.js";
import { escapeHtml } from "./helpers.js";

function cardTemplate(p) {
    let currentLang = localStorage.getItem("lang") || "en";

    const name = p.name;
    const title = p.title[currentLang] || "";
    const degree = p.degree[currentLang] || "";
    const office = p.office || "";
    const phone = p.phone || "";
    const email = p.email || "";
    const webpage = (p.webpage || "").trim();
    const photo = (p.photo || "").trim();

    const tags = (p.research[currentLang] || [])
        .map(t => `<span class="faculty-chip">${escapeHtml(t)}</span>`)
        .join("");

    const nameHtml = webpage
        ? `<a href="${escapeHtml(webpage)}" target="_blank" rel="noopener">${name}</a>`
        : name;

    return `
    <article class="person-card">
        <div class="faculty-image-and-content">
            <div class="faculty-media"><img src="${escapeHtml(photo)}" alt="${name}"></div>

            <div class="faculty-content">
                <header class="faculty-header">
                    <h3 class="faculty-name">${nameHtml}</h3>
                    ${title ? `<span class="faculty-rank">${title}</span>` : ""}
                    ${degree ? `<p class="faculty-degree">${degree}</p>` : ""}
                </header>
                ${tags ? `<div class="faculty-chips">${tags}</div>` : ""}
            </div>
        </div>

        <ul class="faculty-meta">
        ${office ? `
        <li>
            <i class="fa-solid fa-briefcase"></i>
            <span>${office}</span>
        </li>` : ""}

        ${email ? `
        <li>
            <i class="fa-regular fa-envelope"></i>
            <span>${email}</span>
        </li>` : ""}

        ${phone ? `
        <li>
            <i class="fa-solid fa-phone"></i>
            <span>${phone}</span>
        </li>` : ""}
        </ul>

    </article>`;
}


function render() {

    const gridCurrent = document.querySelector("#gridCurrent");
    const gridEmeriti = document.querySelector("#gridEmeriti");
    const facultyMemberCount = document.querySelector("#facultyMemberCount");
    const lang = localStorage.getItem("lang") || "en";

    if (lang === "en") {

        facultyMemberCount.textContent = `${CURRENT_FACULTY.length} Faculty Members`;
    } else {
        facultyMemberCount.textContent = `${CURRENT_FACULTY.length} Öğretim Üyesi`;
    }
    
    gridCurrent.innerHTML = CURRENT_FACULTY.map(cardTemplate).join("");
    gridEmeriti.innerHTML = EMERITI.map(cardTemplate).join("");
}

document.render = render;
document.addEventListener("DOMContentLoaded", render);