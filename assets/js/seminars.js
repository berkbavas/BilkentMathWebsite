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

// ---------- render ----------
function renderTable(list) {
  const tbody = $("#tbody");
  tbody.innerHTML = list.map(renderRow).join("");
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
  const cards = $("#cards");
  cards.innerHTML = list.map(renderCard).join("");
}


function apply() {
  const search = $("#search").value.trim();

  let list = SEMINARS.filter(s => matches(s, search));

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
