/* assets/js/history.js (redesign-safe)
   Renders heads of department list from ../data/history.js
*/

import { HEADS_OF_DEPARTMENT } from "../data/history.js";

/** Escape a string for HTML injection safety */
function esc(s = "") {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderCard(head) {
    const name = esc(head.name || "");
    const photo = esc(head.photo || "");
    const title = esc(head.title || "");
    const term = esc(head.term || "");
    const phd = esc(head.phd || "");

    const webpage = head.webpage || "";
    const safeLink = webpage ? esc(webpage) : "";

    const nameHtml = safeLink
        ? `<a href="${safeLink}" target="_blank" rel="noopener noreferrer">${name}</a>`
        : name;

    // areas can be array or comma-separated string
    let areas = head.areas;
    if (Array.isArray(areas)) {
        areas = areas.filter(Boolean).map(esc);
    } else {
        areas = String(areas || "")
            .split(",")
            .map(s => s.trim())
            .filter(Boolean)
            .map(esc);
    }

    const tagsHtml = areas.length
        ? areas.map(a => `<span class="chair-chip">${a}</span>`).join("")
        : "";

    return `
    <article class="chair-card">
        <img class="chair-avatar" src="${photo}" alt="${name}" loading="lazy">
        <div class="chair-body">
            <div class="chair-header">
                <div style="min-width:0">
                    <h3 class="chair-name">${nameHtml}</h3>
                    ${title ? `<p class="chair-role">${title}</p>` : ""}
                </div>
                ${term ? `<div class="chair-years">${term}</div>` : ""}
            </div>

            ${phd ? `<div class="chair-phd">${phd}</div>` : ""}
            ${tagsHtml ? `<div class="chair-tags">${tagsHtml}</div>` : ""}
        </div>
    </article>`;
}

function render() {
    const container = document.getElementById("heads-root");
    if (!container) return;

    const lang = localStorage.getItem("lang") || "en";

    const heads = HEADS_OF_DEPARTMENT.map(head => ({
        name: head.name,
        term: head.term,
        webpage: head.webpage || "",
        photo: head.photo,
        title: (head.title && head.title[lang]) ? head.title[lang] : "",
        phd: (head.phd && head.phd[lang]) ? head.phd[lang] : "",
        areas: (head.areas && head.areas[lang]) ? head.areas[lang] : ""
    }));

    container.innerHTML = heads.map(renderCard).join("");
}

document.render = render; // Expose for manual re-rendering after language change
document.addEventListener("DOMContentLoaded", render);
