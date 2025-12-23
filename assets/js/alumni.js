import { ALUMNI } from "../data/alumni.js";
import { escapeHtml } from "./helpers.js";

function renderEntry(a) {
    const esc = escapeHtml;

    const photoUrl = "https://math.bilkent.edu.tr/Alumni/" + (a.photo || "");
    const bullets = Array.isArray(a.bullets) ? a.bullets : [];
    const links = Array.isArray(a.links) ? a.links : [];

    const imgHtml = a.photo
        ? `<img src="${photoUrl}" alt="${esc(a.name)}" loading="lazy">`
        : "";

    const bulletHtml = bullets.length
        ? `<ul>${bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>`
        : "";

    const storyHtml = a.story
        ? `<details><summary><i class="fa-solid fa-caret-right"></i>Story</summary><blockquote>${a.story}</blockquote></details>`
        : "";

    const lastUpdateHtml = a.lastUpdate
        ? `<div class="alumni-update">Son güncelleme: ${esc(a.lastUpdate)}</div>`
        : "";

    const linksHtml = links.length
        ? `<div class="alumni-links">
          ${links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label || "Link")}</a>`).join(" · ")}
        </div>`
        : "";

    return `
      <article class="card alumni-entry">
        <h3>${esc(a.name || "")}, <strong>${esc(a.year || "")}</strong></h3>
        <div class="alumni-info">
            <div class="alumni-image">
                ${imgHtml}
                ${bulletHtml}
            </div>
        ${storyHtml}
        ${linksHtml}
        ${lastUpdateHtml}
        </div>
      </article>
    `;
}

function matches(alumni, q) {
    const ql = q.toLowerCase();
    if (alumni.name && alumni.name.toLowerCase().includes(ql)) return true;
    if (alumni.year && alumni.year.toString().toLowerCase().includes(ql)) return true;
    return false;
}

function apply() {
    const q = document.querySelector("#search").value.trim();
    let list = ALUMNI.filter(alumni => matches(alumni, q));
    renderCards(list);
    if(list.length === 0) {
        document.getElementById("alumniRoot").innerHTML = "<p>No matching alumni found.</p>";
    }
}

function resetFilters() {
    document.querySelector("#search").value = "";
    apply();
}

function renderCards(list) {
    const root = document.getElementById("alumniRoot");
    root.innerHTML = list.map(renderEntry).join("");
}

function render() {
    document.querySelector("#search").addEventListener("input", apply);
    document.querySelector("#reset").addEventListener("click", resetFilters);
    apply();
}

document.addEventListener("DOMContentLoaded", render);
