import { RESEARCH_DATA } from "../data/research.js";
import { escapeHtml, safeUrl } from "./helpers.js";


function renderFacultyChips(faculty, accent) {
    const chips = faculty.map(f => {
        let url = safeUrl(f.url);
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
    const labelParticipatingFaculty = lang === "en" ? "Participating faculty:" : "Öğretim üyeleri:"

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
        ${renderFacultyChips(area.faculty, accent)}
      </div>
    </details>
  `;
}


function render() {
    const lang = localStorage.getItem("lang") || "en";
    const elMount = document.getElementById("mount");
    const elCount = document.getElementById("facultyMemberCount");
    let totalMembers = 0;
    RESEARCH_DATA.forEach(item => totalMembers += item.faculty.length);
    elCount.textContent = lang === "tr" ? `${totalMembers} öğretim üyesi` : `${totalMembers} faculty member`;

    elMount.innerHTML = RESEARCH_DATA.map(item => renderAccordionItem(item, lang)).join("");
}

document.render = render; // Expose render function to global scope for language toggle
document.addEventListener("DOMContentLoaded", render); // Initial render on DOM load

// Note: The code above defines functions to render research areas with faculty chips
// and sets up the initial rendering and language toggle support.
