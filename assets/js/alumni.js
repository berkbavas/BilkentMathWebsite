import { ALUMNI } from "../data/alumni.js";
import { TRANSLATIONS } from "../data/translations.js";
import { escapeHtml } from "./helpers.js";

const elementSearch = document.querySelector("#search");
const elementReset = document.querySelector("#reset");
const elementRoot = document.getElementById("alumniRoot");

function renderEntry(a, lang) {
    const esc = escapeHtml;
    const photoUrl = a.photo ? "https://math.bilkent.edu.tr/Alumni/" + a.photo : "";
    const bullets = Array.isArray(a.bullets) ? a.bullets : [];

    return `
    <article class="person-card">
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
        <ul class="alumni-bullets">${bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}

        ${a.story ? `
        <details class="alumni-story">
            <summary>
                <i class="fa-solid fa-caret-right"></i>
                <span data-i18n="story">${TRANSLATIONS.story[lang]}</span>
            </summary>
            <blockquote>${a.story}</blockquote>
        </details>` : ""}

        ${a.lastUpdate ? `
        <div class="alumni-update">
           ${TRANSLATIONS.lastUpdate[lang]}: ${esc(a.lastUpdate)}
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
    elementRoot.innerHTML = list.map(a => renderEntry(a, lang)).join("");
    elementSearch.placeholder = TRANSLATIONS.searchPlaceholder[lang];
    if (list.length === 0) {
        elementRoot.innerHTML = `<p>${TRANSLATIONS.noResults[lang]}</p>`;
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

TRANSLATIONS.buttonReset = {
    en: "Reset",
    tr: "Sıfırla"
};

TRANSLATIONS.noResults = {
    en: "No matching alumni found.",
    tr: "Eşleşen mezun bulunamadı."
};

TRANSLATIONS.searchPlaceholder = {
    en: "Search",
    tr: "Ara"
};

TRANSLATIONS.story = {
    en: "Story",
    tr: "Hikaye"
};

TRANSLATIONS.lastUpdate = {
    en: "Last Update",
    tr: "Son Güncelleme"
};


document.render = render;
document.addEventListener("DOMContentLoaded", init);