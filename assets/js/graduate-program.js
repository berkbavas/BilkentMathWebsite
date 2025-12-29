import { TRANSLATIONS } from '../data/translations.js';
import { CURRENT_FACULTY } from "../data/faculty.js";

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

    for (const area of p.research) {
        if (area.toLowerCase().includes(lowerSearch)) {
            return true;
        }
    }
    return false;
}


function cardTemplate(p) {
    const name = p.name || "";
    const title = p.title || "";
    const photo = (p.photo || "").trim();
    const areasText = p.research.join(", ");
    const webpage = p.webpage || "#";

    const avatar = photo
        ? `<img src="${photo}" alt="${name}" loading="lazy">`
        : `<span class="sup-initials">${initials(p.name || "")}</span>`;

    return `
    <article class="sup-card">
        <div class="sup-top">
            <a href="${webpage}" class="sup-avatar">${avatar}</a>

            <div style="min-width:0">
                <a href="${webpage}" class="sup-name" target="_blank">${name}</a>
                ${title ? `<div class="sup-rank">${title}</div>` : ""}
            </div>
        </div>

            <div class="sup-details">
                <p>${areasText}</p>
            </div>
    </article>`;
}

function render() {
    const lang = localStorage.getItem("lang") || "en";
    const search = elSearch.value.trim();
    elSearch.placeholder = TRANSLATIONS.searchPlaceholder[lang];

    let list = CURRENT_FACULTY
        .filter(p => p.isSupervisor)
        .map(p => {
            return {
                name: p.name,
                title: p.title[lang] || "",
                photo: p.photo,
                research: p.research.map(area => area[lang] || ""),
                webpage: p.webpage || "#"
            };
        });

    if (search) {
        list = list.filter(p => matches(p, search));
    }

    if (list.length === 0) {
        elCount.textContent = "";
        elRoot.innerHTML = `<p>${TRANSLATIONS.noResults[lang]}</p>`;
    }
    else {
        elCount.textContent = TRANSLATIONS.countResults[lang].replace("{count}", list.length);
        elRoot.innerHTML = list.map(cardTemplate).join("");
    }

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

// Add translations specific to Graduate Supervisors page
TRANSLATIONS.titleGraduateSupervisors = {
    en: "Graduate Supervisors",
    tr: "Lisansüstü Tez Danışmanları"
};

TRANSLATIONS.paragraphGraduateSupervisors = {
    en: "Faculty members and their research interests.",
    tr: "Öğretim üyeleri ve araştırma alanları."
};

TRANSLATIONS.searchPlaceholder = {
    en: "Search",
    tr: "Ara"
};

TRANSLATIONS.buttonReset = {
    en: "Reset",
    tr: "Sıfırla"
};

TRANSLATIONS.countResults = {
    en: "{count} faculty members",
    tr: "{count} öğretim üyesi"
};

TRANSLATIONS.noResults = {
    en: "No results found.",
    tr: "Sonuç bulunamadı."
};

TRANSLATIONS.headerPastTheses = {
    en: "Past Theses",
    tr: "Geçmişte Yürütülen Tezler"
};

TRANSLATIONS.buttonPastTheses = {
    en: "View",
    tr: "Görüntüle"
};

TRANSLATIONS.headerCoordinator = {
    en: "Department Graduate Coordinator",
    tr: "Bölüm Lisansüstü Koordinatörü"
};

TRANSLATIONS.buttonApplyOnline = {
    en: "Apply Online",
    tr: "Çevrimiçi Başvuru Formu"
};

TRANSLATIONS.coordinatorName = {
    en: "Prof. Azer Kerimov",
    tr: "Prof. Dr. Azer Kerimov"
};

