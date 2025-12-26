import { CURRENT_FACULTY_EN, CURRENT_FACULTY_TR } from "../data/faculty.js";
import { EMERITI_EN, EMERITI_TR } from "../data/emeriti.js";
import { TRANSLATIONS } from "../data/translations.js";
import { escapeHtml } from "./helpers.js";

function cardTemplate(p) {
    const name = escapeHtml(p.name);
    const rank = escapeHtml(p.rank || "");
    const degree = escapeHtml(p.degree || "");
    const office = escapeHtml(p.office || "");
    const phone = escapeHtml(p.phone || "");
    const email = escapeHtml(p.email || "");
    const url = (p.url || "").trim();
    const photo = (p.photo || "").trim();

    const tags = (p.research || [])
        .map(t => `<span class="faculty-chip">${escapeHtml(t)}</span>`)
        .join("");

    const nameHtml = url
        ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${name}</a>`
        : name;

    return `
    <article class="faculty-card">
        <div class="faculty-media">
            <img src="${escapeHtml(photo)}" alt="${name}">
        </div>

        <div class="faculty-content">
            <header class="faculty-header">
                <h3 class="faculty-name">${nameHtml}</h3>
                ${rank ? `<span class="faculty-rank">${rank}</span>` : ""}
                ${degree ? `<p class="faculty-degree">${degree}</p>` : ""}
            </header>

            ${tags ? `<div class="faculty-chips">${tags}</div>` : ""}

            <ul class="faculty-meta">
                ${office ? `
                <li>
                    <i class="fa-regular fa-building"></i>
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
        </div>
    </article>`;
}


const gridCurrent = document.querySelector("#gridCurrent");
const gridEmeriti = document.querySelector("#gridEmeriti");

function render() {

    let currentLang = localStorage.getItem("lang") || "en";
    let currentFaculty = currentLang === "tr" ? CURRENT_FACULTY_TR : CURRENT_FACULTY_EN;
    let emeritiFaculty = currentLang === "tr" ? EMERITI_TR : EMERITI_EN;

    gridCurrent.innerHTML = currentFaculty.map(cardTemplate).join("");
    gridEmeriti.innerHTML = emeritiFaculty.map(cardTemplate).join("");
}

TRANSLATIONS.en.titleFaculty = "Faculty Members"
TRANSLATIONS.en.clickFaculty = "Click on a faculty member's name to view their personal web page."
TRANSLATIONS.en.currentFaculty = "Current Faculty"
TRANSLATIONS.en.emeritiFaculty = "Emeriti"

TRANSLATIONS.tr.titleFaculty = "Öğretim Üyeleri"
TRANSLATIONS.tr.clickFaculty = " Kişisel sayfalara ulaşmak için isimlerin üzerine tıklayınız."
TRANSLATIONS.tr.currentFaculty = "Mevcut Öğretim Üyeleri"
TRANSLATIONS.tr.emeritiFaculty = "Emekli Öğretim Üyeleri"

document.addEventListener("DOMContentLoaded", render);
document.render = render; // expose render function to other modules, app.js in particular