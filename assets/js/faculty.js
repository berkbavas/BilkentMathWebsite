import { CURRENT_FACULTY_EN, CURRENT_FACULTY_TR } from "../data/faculty.js";
import { EMERITI_EN, EMERITI_TR } from "../data/emeriti.js";
import { TRANSLATIONS } from "../data/translations.js";
import { escapeHtml } from "./helpers.js";

function cardTemplate(p) {
    const name = escapeHtml(p.name);
    const rank = escapeHtml(p.rank || "");
    const degree = escapeHtml(p.degree || "");
    const research = escapeHtml(p.research || "");
    const office = escapeHtml(p.office || "");
    const phone = escapeHtml(p.phone || "");
    const email = escapeHtml(p.email || "");
    const url = (p.url || "").trim();
    const photo = (p.photo || "").trim();
    const tags = (p.research || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");
    const titleBadge = rank ? `<span class="badge">${rank}</span>` : "";
    const nameHtml = url
        ? `<a class="link" href="${escapeHtml(url)}" target="_blank" rel="noopener">${name}</a>`
        : `${name}`;

    return `
        <article class="card" data-rank="${escapeHtml(p.rank || "")}">
            <div class="card-top">
                <div class="faculty-avatar" aria-hidden="true">
                    <img src="${escapeHtml(photo)}" alt="${name}">
                </div>

                <div style="min-width:0">
                    <div class="name-row">
                        <h3 class="faculty-name">${nameHtml}</h3>
                        ${titleBadge}
                    </div>
                    <p class="faculty-title">${degree || research}</p>
                </div>
            </div>
            
            <div class="card-body">
                <div class="tags">${tags}</div>
                    <div class="faculty-meta">
                        ${office ? `<div class="faculty-meta-item">
                            <i class="faculty-ico fa-regular fa-building"></i>
                            <span class="faculty-meta-text">${office}</span>
                        </div>` : ""}

                        ${email ? `<div class="faculty-meta-item">
                            <i class="faculty-ico fa-regular fa-envelope"></i>
                            <span class="faculty-meta-text">${email}</span>
                        </div>` : ""}

                        ${phone ? `<div class="faculty-meta-item">
                            <i class="faculty-ico fa-solid fa-phone"></i>
                            <span class="faculty-meta-text">${phone}</span>
                        </div>` : ""}
                    </div>
                </div>
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