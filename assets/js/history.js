/* assets/js/heads-of-department.js */

import { HEADS_OF_DEPARTMENT } from "../data/history.js";

function renderCard(head) {
  return `
    <div class="chair-card">
        <img class="chair-avatar" src="${head.photo}" alt="${head.name}">
        <div class="chair-body">
            <div class="chair-header">
                <div>
                    <h3 class="chair-name">${head.name}</h3>
                    <p class="chair-role">${head.title}</p>
                </div>
                <div class="chair-years">${head.term}</div>
            </div>
            <div class="chair-phd">${head.phd}</div>
            <div class="chair-tags">${head.areas}</div>
        </div>
    </div>
  `;
}



function render() {
    const container = document.getElementById("heads-root");
    if (!container) return;
    container.innerHTML = HEADS_OF_DEPARTMENT.map(renderCard).join("");
}
document.addEventListener("DOMContentLoaded", render);