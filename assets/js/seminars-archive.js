import { SEMINARS_2024_2025 } from "../data/seminars/seminars-2024-2025.js";
import { SEMINARS_2023_2024 } from "../data/seminars/seminars-2023-2024.js";
import { escapeHtml } from "./helpers.js";

const DATA = {
    "2024–2025": SEMINARS_2024_2025,
    "2023–2024": SEMINARS_2023_2024,
};

const elArchive = document.getElementById("mount");
const elReset = document.getElementById("reset");
const elSearch = document.getElementById("search");
const btnExpandAll = document.getElementById("expandAll");
const btnCollapseAll = document.getElementById("collapseAll");

function norm(s) {
    return s.trim().toLowerCase();
}

function toDateKey(s, t) { // DD.MM.YYYY -> Date
    const [d, m, y] = s.split(".").map(x => x.padStart(2, "0"));
    const [hh, mm] = (t || "00:00").split(":").map(x => x.padStart(2, "0"));
    return new Date(`${y}-${m}-${d}T${hh}:${mm}:00`);
}

function matches(item, q) {
    const ql = q.toLowerCase();
    if (item.title && item.title.toLowerCase().includes(ql)) return true;
    if (item.speaker && item.speaker.toLowerCase().includes(ql)) return true;
    return false;
}

function renderRow(seminar) {
    return `
    <tr>
      <td>
        <a class="title-link" target="_blank" href="${seminar.link || "#"}">${escapeHtml(seminar.title)}</a>
        <div class="col-speaker">${escapeHtml(seminar.speaker)}</div>
      </td>
      <td>${escapeHtml(seminar.date)}</td>
      <td>${escapeHtml(seminar.time)}</td>
      <td><span class="pill">${escapeHtml(seminar.place)}</span></td>
    </tr>
  `
}

function renderCard(seminar) {
    return `
    <article class="seminar-card">
      <div class="sc-top">
        <div>
          <div class="sc-title">
            <a href="${seminar.link || "#"}">${escapeHtml(seminar.title)}</a>
          </div>
          <div class="sc-speaker">${escapeHtml(seminar.speaker)}</div>
        </div>
        <div class="sc-date">
          <span class="m">${escapeHtml(seminar.date)}</span>
          <span class="t">${escapeHtml(seminar.time)}</span>
        </div>
      </div>

      <div class="sc-meta">
        <span class="pill">${escapeHtml(seminar.place)}</span>
      </div>
    </article>
  `;
}


function renderCards(list) {
    return `<div class="cards">
                ${list.map(renderCard).join("")}
            </div>`;
}


function renderTable(list) {
    return `<div class="table-card">
                <div class="table-wrap" role="region" aria-label="Seminar list" tabindex="0">
                    <table class="seminar-table" aria-describedby="count">
                        <thead>
                            <tr>
                                <th data-col="title">Title / Speaker</th>
                                <th data-col="date">Date</th>
                                <th data-col="time">Time</th>
                                <th data-col="place">Place</th>
                            </tr>
                        </thead>
                        <tbody>${list.map(renderRow).join("")}</tbody>
                    </table>
                </div>
            </div>`;
}

function renderYearContent(seminars) {
    return renderTable(seminars) + renderCards(seminars);
}

function render() {
    const search = norm(elSearch.value);

    elArchive.innerHTML = "";

    const years = Object.keys(DATA);

    years.forEach((yearLabel) => {
        const raw = DATA[yearLabel] ?? [];
        const list = raw
            .filter((item) => matches(item, search))
            .sort((a, b) => {
                return toDateKey(b.date, b.time) - toDateKey(a.date, a.time);
            });

        const count = list.length;
        const details = document.createElement("details");
        details.className = "archive-year";

        details.innerHTML = `
      <summary>
        <div class="year-summary">
          <div class="year-left">
            <div class="year-title">${yearLabel}</div>
            <div class="year-count">${count} seminar</div>
          </div>
          <div class="year-right">
            <span class="hint">View</span>
            <span class="chev" aria-hidden="true"></span>
          </div>
        </div>
      </summary>

      <div class="year-body">
        ${count ? renderYearContent(list) : `<p style="color:#666; margin:10px;">No results.</p>`}
      </div>
    `;

        elArchive.appendChild(details);
    });
}

function resetFilters() {
    elSearch.value = "";
    render();
}

function collapseAll() {
    document.querySelectorAll("#mount details").forEach(d => d.open = false);
}

function expandAll() {
    document.querySelectorAll("#mount details").forEach(d => d.open = true);
}   

// Controls
elSearch.addEventListener("input", render);
elReset.addEventListener("click", resetFilters);
btnExpandAll.addEventListener("click", expandAll);
btnCollapseAll.addEventListener("click", collapseAll);

document.addEventListener("DOMContentLoaded", render);
