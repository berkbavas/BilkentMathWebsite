import { ALUMNI } from "../data/alumni.js";
import { TRANSLATIONS } from "../data/translations.js";
import { escapeHtml } from "./helpers.js";

const elementSearch = document.querySelector("#search");
const elementReset = document.querySelector("#reset");
const elementRoot = document.getElementById("alumniRoot");

function renderEntry(a) {
    const esc = escapeHtml;
    const photoUrl = a.photo ? "https://math.bilkent.edu.tr/Alumni/" + a.photo : "";
    const bullets = Array.isArray(a.bullets) ? a.bullets : [];

    return `
    <article class="alumni-card">
        <header class="alumni-header">
            ${photoUrl ? `
            <div class="alumni-avatar">
                <img src="${photoUrl}" alt="${esc(a.name)}" loading="lazy">
            </div>` : ""}

            <div class="alumni-title">
                <h3 class="alumni-name">${esc(a.name)}</h3>
                ${a.year ? `<span class="alumni-year">${esc(a.year)}</span>` : ""}
            </div>
        </header>

        ${bullets.length ? `
        <ul class="alumni-bullets">
            ${bullets.map(b => `<li>${esc(b)}</li>`).join("")}
        </ul>` : ""}

        ${a.story ? `
        <details class="alumni-story">
            <summary>
                <i class="fa-solid fa-caret-right"></i>
                <span data-i18n="story">Story</span>
            </summary>
            <blockquote>${a.story}</blockquote>
        </details>` : ""}

        ${a.lastUpdate ? `
        <div class="alumni-update">
            Son güncelleme: ${esc(a.lastUpdate)}
        </div>` : ""}
    </article>
    `;
}

function matches(alumni, query) {
    const ql = query.toLowerCase();
    if (alumni.name && alumni.name.toLowerCase().includes(ql)) return true;
    return false;
}

function apply() {
    const lang = localStorage.getItem("lang") || "en";
    const query = elementSearch.value.trim();
    const list = ALUMNI.filter(alumni => matches(alumni, query));
    elementRoot.innerHTML = list.map(renderEntry).join("");
    elementSearch.placeholder = TRANSLATIONS[lang].placeholderSearch;
    if (list.length === 0) {
        elementRoot.innerHTML = `<p>${TRANSLATIONS[lang].noResults}</p>`;
    }
}

function resetFilters() {
    elementSearch.value = "";
    apply();
}

function init() {
    elementSearch.addEventListener("input", apply);
    elementReset.addEventListener("click", resetFilters);
    render();
}

function render() {
    apply();
}

TRANSLATIONS.en.headerAlumni = "Some of Our Alumni";
TRANSLATIONS.en.buttonReset = "Reset";
TRANSLATIONS.en.noResults = "No matching alumni found.";
TRANSLATIONS.en.placeholderSearch = "Search";

TRANSLATIONS.tr.headerAlumni = "Bazı Mezunlarımız";
TRANSLATIONS.tr.buttonReset = "Sıfırla";
TRANSLATIONS.tr.noResults = "Eşleşen mezun bulunamadı.";
TRANSLATIONS.tr.placeholderSearch = "Ara";

document.render = render; // expose render function to other modules, app.js in particular
document.addEventListener("DOMContentLoaded", init);
