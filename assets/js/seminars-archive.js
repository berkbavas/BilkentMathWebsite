import { SEMINARS_2024_2025 } from "../data/seminars/seminars-2024-2025.js";
import { SEMINARS_2023_2024 } from "../data/seminars/seminars-2023-2024.js";
import { SEMINARS_2022_2023 } from "../data/seminars/seminars-2022-2023.js";
import { SEMINARS_2021_2022 } from "../data/seminars/seminars-2021-2022.js";
import { SEMINARS_2020_2021 } from "../data/seminars/seminars-2020-2021.js";
import { SEMINARS_2019_2020 } from "../data/seminars/seminars-2019-2020.js";
import { SEMINARS_2018_2019 } from "../data/seminars/seminars-2018-2019.js";
import { SEMINARS_2017_2018 } from "../data/seminars/seminars-2017-2018.js";
import { SEMINARS_2016_2017 } from "../data/seminars/seminars-2016-2017.js";
import { SEMINARS_2015_2016 } from "../data/seminars/seminars-2015-2016.js";
import { SEMINARS_2014_2015 } from "../data/seminars/seminars-2014-2015.js";
import { SEMINARS_2013_2014 } from "../data/seminars/seminars-2013-2014.js";


import { TRANSLATIONS } from "../data/translations.js";
import { escapeHtml } from "./helpers.js";

const DATA = {
    "2024-2025": SEMINARS_2024_2025,
    "2023-2024": SEMINARS_2023_2024,
    "2022-2023": SEMINARS_2022_2023,
    "2021-2022": SEMINARS_2021_2022,
    "2020-2021": SEMINARS_2020_2021,
    "2019-2020": SEMINARS_2019_2020,
    "2018-2019": SEMINARS_2018_2019,
    "2017-2018": SEMINARS_2017_2018,
    "2016-2017": SEMINARS_2016_2017,
    "2015-2016": SEMINARS_2015_2016,
    "2014-2015": SEMINARS_2014_2015,
    "2013-2014": SEMINARS_2013_2014
};

const elArchive = document.getElementById("mount");
const elReset = document.getElementById("reset");
const elSearch = document.getElementById("search");
const btnExpandAll = document.getElementById("expandAll");
const btnCollapseAll = document.getElementById("collapseAll");
const elTotalSeminarCount = document.getElementById("totalSeminarCount");

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
      ${seminar.date ? `<td>${escapeHtml(seminar.date)}</td>` : "<td></td>"}
      ${seminar.time ? `<td>${escapeHtml(seminar.time)}</td>` : "<td></td>"}
      ${seminar.place ? `<td><span class="pill">${escapeHtml(seminar.place)}</span></td>` : "<td></td>"}
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
    return `<div class="cards">${list.map(renderCard).join("")}</div>`;
}


function renderTable(list, lang) {

    let headerRow = lang === "en" ? `<th>Title / Speaker</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Place</th>` :
        `<th>Başlık / Konuşmacı</th>
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
    elSearch.placeholder = TRANSLATIONS.searchPlaceholder[lang] || "Search";
    const labelSeminar = TRANSLATIONS.labelSeminar[lang] || "Seminar(s)";
    const labelView = TRANSLATIONS.labelView[lang] || "View";
    const labelNoResults = TRANSLATIONS.noResults[lang] || "No results found.";
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
            <div class="year-count">${count} ${labelSeminar}</div>
          </div>
          <div class="year-right">
            <span class="hint">${labelView}</span>
            <span class="chev" aria-hidden="true"></span>
          </div>
        </div>
      </summary>

      <div class="year-body">
        ${count ? renderYearContent(list, lang) : `<p class="no-results">${labelNoResults}</p>`}
      </div>
    `;

        elArchive.appendChild(details);
    });

    // Update total seminar count badge
    const totalCount = Object.values(DATA).reduce((sum, arr) => { return sum + arr.length; }, 0);
    elTotalSeminarCount.textContent = `${totalCount} ${TRANSLATIONS.labelSeminar[lang]}`;

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

TRANSLATIONS.headerTitle = {
    en: "Seminars Archive",
    tr: "Seminer Arşivi"
};

TRANSLATIONS.textDescription = {
    en: "Department seminars held between 2009 and 2025 (by academic year).",
    tr: "2009 ile 2025 yılları arasında düzenlenen bölüm seminerleri (akademik yıla göre)."
};

TRANSLATIONS.textDescriptionFiles = {
    en: `Files from February 2009 through June 2012 are mainly "mht" files, which can best be opened using the following software:`,
    tr: `Şubat 2009 ile Haziran 2012 arasındaki dosyalar çoğunlukla "mht" dosyalarıdır ve aşağıdaki yazılımlar kullanılarak açılabilir:`
};

TRANSLATIONS.buttonReset = {
    en: "Reset",
    tr: "Sıfırla"
};

TRANSLATIONS.buttonExpandAll = {
    en: "Expand all",
    tr: "Tümünü genişlet"
};

TRANSLATIONS.buttonCollapseAll = {
    en: "Collapse all",
    tr: "Tümünü daralt"
};

TRANSLATIONS.searchPlaceholder = {
    en: "Search",
    tr: "Ara"
};

TRANSLATIONS.labelSeminar = {
    en: "Seminar(s)",
    tr: "Seminer"
};

TRANSLATIONS.labelView = {
    en: "View",
    tr: "Görüntüle"
};

TRANSLATIONS.noResults = {
    en: "No results found.",
    tr: "Sonuç bulunamadı."
};


document.render = render; // Expose render function to global scope for language toggle
document.addEventListener("DOMContentLoaded", render); // Initial render on DOM load

// Note: The code above defines functions to render a seminars archive with search and expand/collapse features,
// and sets up the initial rendering and language toggle support.