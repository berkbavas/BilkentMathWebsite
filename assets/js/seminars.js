import { SEMINARS } from "../data/seminars.js";
import { escapeHtml } from "./helpers.js";

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);


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

// ---------- render ----------
function renderTable(list) {
    const tbody = $("#tbody");
    tbody.innerHTML = list.map(s => `
    <tr>
      <td class="col-speaker">
        <div class="speaker">${escapeHtml(s.speaker)}</div>
      </td>
      <td class="col-title">
        <a class="title-link" href="${s.link || "#"}">
          ${escapeHtml(s.title)}
        </a>
      </td>
      <td class="col-date">
        <span class="chip">${escapeHtml(s.date)}</span>
      </td>
      <td class="col-time">${escapeHtml(s.time)}</td>
      <td class="col-place">
        <span class="pill">${escapeHtml(s.place)}</span>
      </td>
    </tr>
  `).join("");
}

function renderCards(list) {
    const cards = $("#cards");
    cards.innerHTML = list.map(s => `
    <article class="seminar-card">
      <div class="sc-top">
        <div>
          <div class="sc-title">
            <a href="${s.link || "#"}">${escapeHtml(s.title)}</a>
          </div>
          <div class="sc-speaker">${escapeHtml(s.speaker)}</div>
        </div>
        <div class="sc-date">
          <span class="m">${escapeHtml(s.date)}</span>
          <span class="t">${escapeHtml(s.time)}</span>
        </div>
      </div>

      <div class="sc-meta">
        <span class="pill">${escapeHtml(s.place)}</span>
      </div>
    </article>
  `).join("");
}


function apply() {
    const q = $("#search").value.trim();

    let list = SEMINARS.filter(s => matches(s, q));

    list.sort((a, b) => {
        return toDateKey(b.date, b.time) - toDateKey(a.date, a.time);
    });

    $("#count").textContent = `${list.length} seminar(s)`;
    renderTable(list);
    renderCards(list);
}

function resetFilters() {
    $("#search").value = "";
    apply();
}

function render() {
    $("#search").addEventListener("input", apply);
    $("#reset").addEventListener("click", resetFilters);
    apply();
}

document.addEventListener("DOMContentLoaded", render);
