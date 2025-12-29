import { ALUMNI } from "../data/alumni.js";
import { TRANSLATIONS } from "../data/translations.js";

const elementSearch = document.querySelector("#search");
const elementReset = document.querySelector("#reset");
const elementRoot = document.getElementById("alumniRoot");
const URL = "https://math.bilkent.edu.tr/Alumni/";

function renderEntry(a, lang) {
    const photoUrl = a.photo ? URL + a.photo : "";
    const bullets = Array.isArray(a.bullets) ? a.bullets : [];
    const story = a.story[lang] || "";

    return `
    <article class="person-card">
        <header class="alumni-header">
            ${photoUrl ? `
            <div class="alumni-avatar">
                <img src="${photoUrl}" alt="${a.name}" loading="lazy">
            </div>` : ""}

            <div class="alumni-title">
                <h3 class="alumni-name">${a.name}</h3>
                ${a.year ? `<span class="alumni-year">${a.year}</span>` : ""}
            </div>
        </header>

        ${bullets.length ? `
        <ul class="alumni-bullets">${bullets.map(b => `<li>${b}</li>`).join("")}</ul>` : ""}

        ${story ? `
        <details class="alumni-story">
            <summary>
                <i class="fa-solid fa-caret-right"></i>
                <span data-i18n="story">${TRANSLATIONS.labelStory[lang]}</span>
            </summary>
            <blockquote>${story}</blockquote>
        </details>` : ""}

        ${a.lastUpdate ? `
        <div class="alumni-update">
           ${TRANSLATIONS.labelLastUpdate[lang]}: ${a.lastUpdate}
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
    elementSearch.placeholder = TRANSLATIONS.labelSearchPlaceholder[lang];
    if (list.length === 0) {
        elementRoot.innerHTML = `<p>${TRANSLATIONS.labelNoResults[lang]}</p>`;
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

TRANSLATIONS.labelButtonReset = {
    en: "Reset",
    tr: "Sıfırla"
};

TRANSLATIONS.labelNoResults = {
    en: "No matching alumni found.",
    tr: "Eşleşen mezun bulunamadı."
};

TRANSLATIONS.labelSearchPlaceholder = {
    en: "Search",
    tr: "Ara"
};

TRANSLATIONS.labelStory = {
    en: "Story",
    tr: "Hikaye"
};

TRANSLATIONS.labelLastUpdate = {
    en: "Last Update",
    tr: "Son Güncelleme"
};


document.render = render;
document.addEventListener("DOMContentLoaded", init);