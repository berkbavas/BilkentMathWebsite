import { SEMINARS } from "../data/seminars.js";
import { TRANSLATIONS } from "../data/translations.js";
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

    let lang = localStorage.getItem("lang") || "en";

    $("#table-container").hidden = list.length === 0;
    $("#count").textContent = `${list.length} ${lang === "en" ? "seminar(s)" : "seminer"}`;

    renderTable(list);
    renderCards(list);
}

function resetFilters() {
    $("#search").value = "";
    apply();
}

function render() {
    let lang = localStorage.getItem("lang") || "en";
    $("#search").placeholder = TRANSLATIONS[lang].searchPlaceholder || "Search";
    $("#search").addEventListener("input", apply);
    $("#reset").addEventListener("click", resetFilters);

    apply();
}

TRANSLATIONS.en.tableHeaderTitleSpeaker = "Title / Speaker";
TRANSLATIONS.en.tableHeaderDate = "Date";
TRANSLATIONS.en.tableHeaderTime = "Time";
TRANSLATIONS.en.tableHeaderPlace = "Place";
TRANSLATIONS.en.titleSeminars = "2025-26 Academic Year Seminars";
TRANSLATIONS.en.textDescription = "Department seminars held during the 2025-26 academic year. ";
TRANSLATIONS.en.buttonReset = "Reset";
TRANSLATIONS.en.searchPlaceholder = "Search";

TRANSLATIONS.tr.tableHeaderTitleSpeaker = "Başlık / Konuşmacı";
TRANSLATIONS.tr.tableHeaderDate = "Tarih";
TRANSLATIONS.tr.tableHeaderTime = "Saat";
TRANSLATIONS.tr.tableHeaderPlace = "Yer";
TRANSLATIONS.tr.titleSeminars = "2025-26 Akademik Yılı Seminerleri";
TRANSLATIONS.tr.textDescription = "2025-26 akademik yılı boyunca düzenlenen bölüm seminerleri.";
TRANSLATIONS.tr.buttonReset = "Sıfırla";
TRANSLATIONS.tr.searchPlaceholder = "Ara";


document.render = render;
document.addEventListener("DOMContentLoaded", render);
