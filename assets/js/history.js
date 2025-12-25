/* assets/js/heads-of-department.js */

import { HEADS_OF_DEPARTMENT } from "../data/history.js";

function renderCard(head) {
  return `
  <article class="card">
    <div class="card-header">
      <img src="${head.photo}" alt="Photo of ${head.name}" class="card-photo">
    </div>

    <div class="card-content">
      <h3 class="card-name">${head.name}</h3>
      <p class="card-title">${head.title}</p>
      <p class="card-phd">${head.phd}</p>

      <div class="card-areas">
        ${head.areas.split(",").map(a => `<span class="chip">${a.trim()}</span>`).join("")}
      </div>

      <div class="card-term">${head.term}</div>
  
      <a class="card-link" href="${head.url}" target="_blank">
        Personal Page <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  </article>
  `;
}



function render() {
    const container = document.getElementById("heads-root");
    if (!container) return;
    container.innerHTML = HEADS_OF_DEPARTMENT.map(renderCard).join("");
}
document.addEventListener("DOMContentLoaded", render);