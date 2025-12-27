import { SEMINARS_2024_2025 } from "../data/seminars/seminars-2024-2025.js";
import { SEMINARS_2023_2024 } from "../data/seminars/seminars-2023-2024.js";
import { TRANSLATIONS } from "../data/translations.js";
import { escapeHtml } from "./helpers.js";

const DATA = {
    "2024-2025": SEMINARS_2024_2025,
    "2023-2024": SEMINARS_2023_2024,
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


function renderTable(list, lang) {

    let headerRow = lang === "en" ? `<th>Title / Speaker</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Place</th>` : `<th>Başlık / Konuşmacı</th>
                                <th>Tarih</th>
                                <th>Saat</th>
                                <th>Yer</th>`;

    return `<div class="table-card">
                <div class="table-wrap" role="region" aria-label="Seminar list" tabindex="0">
                    <table class="seminar-table" aria-describedby="count">
                        <thead>
                            <tr>
                                ${headerRow}
                            </tr>
                        </thead>
                        <tbody>${list.map(renderRow).join("")}</tbody>
                    </table>
                </div>
            </div>`;
}

function renderYearContent(seminars, lang) {
    return renderTable(seminars, lang) + renderCards(seminars);
}

function render() {
    let lang = localStorage.getItem("lang") || "en";
    elSearch.placeholder = lang === "en" ? "Search" : "Ara";

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
            <div class="year-count">${count} ${lang === "en" ? "seminars" : "seminer"}</div>
          </div>
          <div class="year-right">
            <span class="hint">${lang === "en" ? "View" : "Görüntüle"}</span>
            <span class="chev" aria-hidden="true"></span>
          </div>
        </div>
      </summary>

      <div class="year-body">
        ${count ? renderYearContent(list, lang) : `<p class="no-results">${lang === "en" ? "No seminars found." : "Seminer bulunamadı."}</p>`}
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

TRANSLATIONS.en.headerTitle = "Seminars Archive";
TRANSLATIONS.en.textDescription = "Department seminars held between 2009 and 2025 (by academic year).";
TRANSLATIONS.en.textDescriptionFiles = `Files from February 2009 through June 2012 are mainly "mht" files, which can best be opened using the following software:`;
TRANSLATIONS.en.buttonReset = "Reset";
TRANSLATIONS.en.buttonExpandAll = "Expand all";
TRANSLATIONS.en.buttonCollapseAll = "Collapse all";

TRANSLATIONS.tr.headerTitle = "Seminer Arşivi";
TRANSLATIONS.tr.textDescription = "2009 ile 2025 yılları arasında düzenlenen bölüm seminerleri (akademik yıla göre).";
TRANSLATIONS.tr.textDescriptionFiles = `Şubat 2009 ile Haziran 2012 arasındaki dosyalar çoğunlukla "mht" dosyalarıdır ve aşağıdaki yazılımlar kullanılarak açılabilir:`;
TRANSLATIONS.tr.buttonReset = "Sıfırla";
TRANSLATIONS.tr.buttonExpandAll = "Tümünü genişlet";
TRANSLATIONS.tr.buttonCollapseAll = "Tümünü daralt";



document.render = render;
document.addEventListener("DOMContentLoaded", render);
