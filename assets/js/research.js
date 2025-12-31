import { RESEARCH_DATA } from "../data/research.js";
import { CURRENT_FACULTY } from "../data/faculty.js";
import { escapeHtml, safeUrl } from "./helpers.js";

function renderFacultyChips(faculty, accent) {
    const chips = faculty.map(f => {
        let url = safeUrl(f.webpage);
        let name = escapeHtml(f.name);
        return `
      <a class="chip-link" href="${url}" target="_blank" rel="noopener" style="--chip-accent: ${accent};">
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
    const labelParticipatingFaculty = translations.participatingFaculty[lang] || translations.participatingFaculty["en"];

    let faculty = CURRENT_FACULTY.filter(i => (i.researchGroups || []).includes(area.id));

    return `
    <details class="acc-item max-width-720" style="--accent:${accent}">
      <summary class="acc-summary">
        <div class="acc-left">
          <span class="area-icon" aria-hidden="true"><i class="${area.icon}"></i></span>
          <div class="acc-title">
            <span class="swatch" aria-hidden="true"></span>
            <span>${title}</span>
          </div>
        </div>
        <div class="acc-chevron" aria-hidden="true"><i class="fa-solid fa-chevron-down"></i></div>
      </summary>
      <div class="acc-body">
        <p>${description}</p>
        <p><strong>${labelParticipatingFaculty}</strong></p>
        ${renderFacultyChips(faculty, accent)}
      </div>
    </details>
  `;
}

function render() {

    const lang = localStorage.getItem("lang") || "en";
    const elMount = document.getElementById("mount");
    const elFacultyMemberCount = document.getElementById("facultyMemberCount");
    const facultyMemberCount = CURRENT_FACULTY.filter(item => (item.researchGroups || []).length > 0).length;
    elFacultyMemberCount.textContent = `${facultyMemberCount} ${translations.faculty[lang]}`;

    const elResearchGroupCount = document.getElementById("researchGroupCount");
    const researchGroupCount = RESEARCH_DATA.length;
    elResearchGroupCount.textContent = `${researchGroupCount} ${translations.researchGroup[lang]}`;

    elMount.innerHTML = RESEARCH_DATA.map(item => renderAccordionItem(item, lang)).join("");
}

const translations = {
    faculty: { en: "faculty member", tr: "öğretim üyesi" },
    researchGroup: { en: "research group", tr: "araştırma grubu" },
    participatingFaculty: { en: "Participating faculty:", tr: "Öğretim Üyeleri:" }
};

document.render = render; // Expose render function to global scope for language toggle
document.addEventListener("DOMContentLoaded", render); // Initial render on DOM load

// Note: The code above defines functions to render research areas with faculty chips
// and sets up the initial rendering and language toggle support.
