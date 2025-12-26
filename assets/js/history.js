/* assets/js/heads-of-department.js */

import { HEADS_OF_DEPARTMENT_EN, HEADS_OF_DEPARTMENT_TR } from "../data/history.js";

function renderCard(head) {
    return `
    <div class="chair-card">
        <img class="chair-avatar" src="${head.photo}" alt="${head.name}">
        <div class="chair-body">
            <div class="chair-header">
                <div>
                    <h3 class="chair-name">${head.url ? `<a href="${head.url}" target="_blank" rel="noopener noreferrer">${head.name}</a>` : head.name}</h3>
                    <p class="chair-role">${head.title}</p>
                </div>
                <div class="chair-years">${head.term}</div>
            </div>
            <div class="chair-phd">${head.phd}</div>
           <div class="chair-tags">
            ${Array.isArray(head.areas)
            ? head.areas.map(a => `<span class="chair-chip">${a}</span>`).join("")
            : String(head.areas || "")
                .split(",")
                .map(s => s.trim())
                .filter(Boolean)
                .map(a => `<span class="chair-chip">${a}</span>`)
                .join("")}
            </div>
        </div>
    </div>
  `;
}



function render() {
    const container = document.getElementById("heads-root");
    const lang = localStorage.getItem("lang") || "en";
    const heads = lang === "tr" ? HEADS_OF_DEPARTMENT_TR : HEADS_OF_DEPARTMENT_EN;
    container.innerHTML = heads.map(renderCard).join("");
}

document.render = render;
document.addEventListener("DOMContentLoaded", render);