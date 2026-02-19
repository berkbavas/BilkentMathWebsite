 
import { TRANSLATIONS } from '../data/translations.js';
const { ALISBAH_AWARDS } = await import(`../data/alisbah-awards.js?v=${document.VERSION}`);

const URL = "https://math.bilkent.edu.tr/";

function renderRecipients(recipients) {
    return `
    <ul class="oa-names">
      ${recipients.map(r => `<li class="oa-chip">${r}</li>`).join("")}
    </ul>
  `;
}

function renderRow(item, labels) {
    const photosCell = item.photos
        ? `
      <td data-label="${labels.photos}">
        <a class="oa-btn" href="${URL + item.photos}" target="_blank" rel="noopener">
          <i class="fa-regular fa-image" aria-hidden="true"></i>
          <span data-i18n="tableView">${labels.view}</span>
        </a>
      </td>`
        : `<td>-</td>`;

    return `
    <tr class="oa-row">
      <td class="oa-year-cell" data-label="${labels.year}">${item.year}</td>
      <td data-label="${labels.recipients}">
        ${renderRecipients(item.recipients)}
      </td>
      ${photosCell}
    </tr>
  `;
}

function render() {
    const lang = localStorage.getItem("lang") || "en";
    const labels = {
        year: TRANSLATIONS.tableYear[lang],
        recipients: TRANSLATIONS.tableRecipients[lang],
        photos: TRANSLATIONS.tablePhotos[lang],
        view: TRANSLATIONS.tableView[lang],
    };

    const elTableMount = document.getElementById("tableMount");
    if (!elTableMount) return;

    elTableMount.innerHTML = ALISBAH_AWARDS.map(item => renderRow(item, labels)).join("");
}

TRANSLATIONS.tableYear = { en: "Year", tr: "Yıl" };
TRANSLATIONS.tableRecipients = { en: "Recipients", tr: "Ödül Sahipleri" };
TRANSLATIONS.tablePhotos = { en: "Photos", tr: "Fotoğraflar" };
TRANSLATIONS.tableView = { en: "View", tr: "Görüntüle" };

document.render = render; // Expose render function for language toggle
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => { render(); document.app_init();});
} else {
  render();
  document.app_init();
}

