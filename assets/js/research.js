import { RESEARCH_DATA } from "../data/research.js";
import { TRANSLATIONS } from "../data/translations.js";

function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderFacultyChips(faculty, accent) {
    const chips = faculty.map(f => {
        const name = escapeHtml(f.name);
        const url = escapeHtml(f.url);
        return `
      <a class="chip-link" href="${url}" target="_blank" rel="noreferrer"
         style="--accent:${accent}">
        <i class="fa-regular fa-user"></i>
        <span>${name}</span>
      </a>`;
    }).join("");

    return `<div class="faculty-chips">${chips}</div>`;
}


function renderAccordionItem(area, lang) {
    const accent = area.accent;
    const description = area.description[lang] || area.description["en"];
    const title = area.title[lang] || area.title["en"];

    return `
    <details class="acc-item" style="--accent:${accent}">
      <summary class="acc-summary">
        <div class="acc-left">
          <span class="area-icon" aria-hidden="true"><i class="${area.icon}"></i></span>
          <div class="acc-title">
            <span class="swatch" aria-hidden="true"></span>
            <span>${escapeHtml(title)}</span>
          </div>
        </div>
        <div class="acc-chevron" aria-hidden="true"><i class="fa-solid fa-chevron-down"></i></div>
      </summary>
      <div class="acc-body">
        <p>${escapeHtml(description)}</p>
        <p><strong>${lang === "en" ? "Participating faculty:" : "Öğretim üyeleri:"}</strong></p>
        ${renderFacultyChips(area.faculty, accent)}
      </div>
    </details>
  `;
}


function render() {
    const lang = localStorage.getItem("lang") || "en";
    const mount = document.querySelector(".research-accordion");
    mount.innerHTML = RESEARCH_DATA.map((a, idx) => renderAccordionItem(a, lang)).join("");
}


TRANSLATIONS.en.headerText = "Research at Bilkent Mathematics";
TRANSLATIONS.en.pageLeadText = "Research activities at the Department of Mathematics are grouped into four classical areas of pure and applied mathematics. Each group consist of several faculty members and graduate students and holds regular weekly seminars and other activities.";
TRANSLATIONS.en.thesesArchiveText = "Theses archive";

TRANSLATIONS.tr.headerText = "Araştırma Alanları";
TRANSLATIONS.tr.pageLeadText = "Bilkent Matematik Bölümü'nde araştırma faaliyetleri matematiğin dört klasik alanında yoğunlaşmıştır. Öğretim üyeleri ve yüksek lisans öğrencilerinden oluşan her araştırma grubu, kendi haftalık düzenli seminer dizilerini ve diğer bilimsel faaliyetleri organize ederler.";
TRANSLATIONS.tr.thesesArchiveText = "Tez arşivi";

document.render = render;
document.addEventListener("DOMContentLoaded", render);
