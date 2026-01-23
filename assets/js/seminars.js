import { SEMINARS } from "../data/seminars.js";
import { TRANSLATIONS } from "../data/translations.js";
import { escapeHtml, safeUrl } from "./helpers.js";

const URL = "https://math.bilkent.edu.tr/";

// ---------- helpers ----------
const $ = (sel) => document.querySelector(sel);

function toDateKey(s, t) {
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
    const url = safeUrl(URL + seminar.link);
    const title = escapeHtml(seminar.title);
    const speaker = escapeHtml(seminar.speaker);
    const date = escapeHtml(seminar.date);
    const time = escapeHtml(seminar.time);
    const place = escapeHtml(seminar.place);

    return `
    <tr>
      <td>
        <a class="title-link" target="_blank" href="${url}">${title}</a>
        <div class="col-speaker">${speaker}</div>
      </td>
      <td>${date}</td>
      <td>${time}</td>
      <td><span class="pill">${place}</span></td>
    </tr>
  `
}

// ---------- render ----------
function renderTable(list) {
    const tbody = $("#tbody");
    tbody.innerHTML = list.map(renderRow).join("");
}

function renderCard(seminar) {
    const url = safeUrl(URL + seminar.link);
    const title = escapeHtml(seminar.title);
    const speaker = escapeHtml(seminar.speaker);
    const date = escapeHtml(seminar.date);
    const time = escapeHtml(seminar.time);
    const place = escapeHtml(seminar.place);

    return `
    <article class="seminar-card">
      <div class="sc-top">
        <div>
            <div class="sc-title">
                <a href="${url}" target="_blank" rel="noopener">${title}</a>
            </div>
            <div class="sc-speaker">${speaker}</div>
        </div>

        <div class="sc-date">
            <span class="m">${date}</span>
            <span class="t">${time}</span>
        </div>
        </div>


        <div class="sc-meta">
            <span class="pill">${place}</span>
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
    const T = TRANSLATIONS.seminars;

    $("#table-container").hidden = list.length === 0;
    $("#count").textContent = `${list.length} ${T.seminarPostfix[lang] || "seminar(s)"}`;

    renderTable(list);
    renderCards(list);
}

function resetFilters() {
    $("#search").value = "";
    apply();
}

function render() {
    let lang = localStorage.getItem("lang") || "en";
    const T = TRANSLATIONS.seminars;
    $("#search").placeholder = T.searchPlaceholder[lang] || "Search";
    $("#search").addEventListener("input", apply);
    $("#reset").addEventListener("click", resetFilters);

    apply();
}

TRANSLATIONS.seminars = {
    titleSeminars: {
        en: "2025-26 Academic Year Seminars",
        tr: "2025-26 Akademik Yılı Seminerleri"
    },
    textDescription: {
        en: "Department seminars held during the 2025-26 academic year.",
        tr: "2025-26 akademik yılı boyunca düzenlenen bölüm seminerleri."
    },
    tableHeaderTitleSpeaker: {
        en: "Title / Speaker",
        tr: "Başlık / Konuşmacı"
    },
    tableHeaderDate: {
        en: "Date",
        tr: "Tarih"
    },
    tableHeaderTime: {
        en: "Time",
        tr: "Saat"
    },
    tableHeaderPlace: {
        en: "Place",
        tr: "Yer"
    },
    buttonReset: {
        en: "Reset",
        tr: "Sıfırla"
    },
    searchPlaceholder: {
        en: "Search",
        tr: "Ara"
    },
    seminarPostfix: {
        en: "seminar(s)",
        tr: "seminer"
    }
};

document.render = render; // Expose render function for language toggle
document.addEventListener("DOMContentLoaded", render);