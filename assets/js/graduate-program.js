import { TRANSLATIONS } from '../data/translations.js';
import { GRADUATE_SUPERVISORS_EN, GRADUATE_SUPERVISORS_TR } from "../data/graduate-supervisors.js";
import { escapeHtml } from "./helpers.js";

const elRoot = document.getElementById("supRoot");
const elSearch = document.getElementById("supSearch");
const elReset = document.getElementById("supReset");
const elCount = document.querySelector(".gsup-count");

function initials(name = "") {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0] ?? "";
    const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (a + b).toUpperCase();
}

function matches(p, search) {
    const lowerSearch = search.toLowerCase();

    if (p.name.toLowerCase().includes(lowerSearch)) {
        return true;
    }

    for (const area of p.areas) {
        if (area.toLowerCase().includes(lowerSearch)) {
            return true;
        }
    }
    return false;
}


function cardTemplate(p) {
    const esc = escapeHtml;
    const name = esc(p.name || "");
    const rank = esc(p.rank || "");
    const photo = (p.photo || "").trim();
    const areasText = p.areas.join(", ");
    const url = p.url || "#";

    const avatar = photo
        ? `<img src="${esc(photo)}" alt="${name}" loading="lazy">`
        : `<span class="sup-initials">${esc(initials(p.name || ""))}</span>`;

    return `
    <article class="sup-card">
        <div class="sup-top">
            <a href="${esc(url)}" class="sup-avatar">${avatar}</a>

            <div style="min-width:0">
                <a href="${esc(url)}" class="sup-name">${name}</a>
                ${rank ? `<div class="sup-rank">${rank}</div>` : ""}
            </div>
        </div>

            <div class="sup-details">
                <p>${esc(areasText)}</p>
            </div>
    </article>`;
}

function render() {
    const lang = localStorage.getItem("lang") || "en";
    const search = elSearch.value.trim();
    let list = lang === "en"
        ? GRADUATE_SUPERVISORS_EN
        : GRADUATE_SUPERVISORS_TR;
    if (search) {
        list = list.filter(p => matches(p, search));
    }

    if (list.length === 0) {
        elRoot.innerHTML = `<p>${TRANSLATIONS[lang].noResults}</p>`;
    }
    else {
        elRoot.innerHTML = list.map(cardTemplate).join("");
    }
    elCount.textContent = TRANSLATIONS[lang].countResults.replace("{count}", list.length);

}

function init() {
    elSearch.addEventListener("input", render);
    elReset.addEventListener("click", () => {
        elSearch.value = "";
        render();
    });
    render();
}

document.render = render;
document.addEventListener("DOMContentLoaded", init);

TRANSLATIONS.en.headerText = "Mathematics Graduate Program";
TRANSLATIONS.en.pageLead = "The Graduate Program of the Department of Mathematics at Bilkent University is among the leading mathematics research programs in Turkey. ";
TRANSLATIONS.en.titleGraduateSupervisors = "Graduate Supervisors";
TRANSLATIONS.en.paragraphGraduateSupervisors = "Faculty members and their research interests.";
TRANSLATIONS.en.placeholderSearch = "Search";
TRANSLATIONS.en.buttonReset = "Reset";
TRANSLATIONS.en.countResults = "{count} faculty members";
TRANSLATIONS.en.noResults = "No results found.";

TRANSLATIONS.tr.headerText = "Matematik Lisansüstü Programı";
TRANSLATIONS.tr.pageLead = "Bilkent Üniversitesi Matematik Bölümü Lisansüstü Programı, Türkiye'nin en önde gelen matematik araştırma programlarındandır.";
TRANSLATIONS.tr.titleGraduateSupervisors = "Lisansüstü Tez Danışmanları";
TRANSLATIONS.tr.paragraphGraduateSupervisors = "Öğretim üyeleri ve araştırma alanları.";
TRANSLATIONS.tr.placeholderSearch = "Ara";
TRANSLATIONS.tr.buttonReset = "Sıfırla";
TRANSLATIONS.tr.noResults = "Sonuç bulunamadı.";
TRANSLATIONS.tr.countResults = "{count} öğretim üyesi";