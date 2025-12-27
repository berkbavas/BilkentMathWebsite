import { TRANSLATIONS } from "../data/translations.js";
import { ALISBAH_AWARDS } from "../data/alisbah-awards.js";

function renderRecipients(recipients) {
  return `
    <ul class="oa-names">
      ${recipients.map(r => `<li class="oa-chip">${r}</li>`).join("")}
    </ul>
  `;
}

function renderRow(item, labels) {
  return `
    <tr class="oa-row">
      <td class="oa-year-cell" data-label="${labels.year}">${item.year}</td>
      <td data-label="${labels.recipients}">
        ${renderRecipients(item.recipients)}
      </td>
      <td data-label="${labels.photos}">
        <a class="oa-btn" href="${item.photos}" target="_blank" rel="noopener">
          <i class="fa-regular fa-image" aria-hidden="true"></i>
          <span data-i18n="tableView">${labels.view}</span>
        </a>
      </td>
    </tr>
  `;
}

function render() {
  const lang = localStorage.getItem("lang") || "en";
  const t = TRANSLATIONS[lang] || {};

  const labels = {
    year: t.tableYear || "Year",
    recipients: t.tableRecipients || "Recipients",
    photos: t.tablePhotos || "Photos",
    view: t.tableView || "View",
  };

  const elTableMount = document.getElementById("tableMount");
  elTableMount.innerHTML = ALISBAH_AWARDS.map(item => renderRow(item, labels)).join("");
}

TRANSLATIONS.en.titleOrhanAlisbah = "Orhan Alisbah Awards - Department of Mathematics - Bilkent University";
TRANSLATIONS.en.tableYear = "Year";
TRANSLATIONS.en.tableRecipients = "Recipients";
TRANSLATIONS.en.tablePhotos = "Photos";
TRANSLATIONS.en.tableView = "View";

TRANSLATIONS.tr.titleOrhanAlisbah = "Orhan Alisbah Ödülleri - Matematik Bölümü - Bilkent Üniversitesi";
TRANSLATIONS.tr.tableYear = "Yıl";
TRANSLATIONS.tr.tableRecipients = "Ödül Sahipleri";
TRANSLATIONS.tr.tablePhotos = "Fotoğraflar";
TRANSLATIONS.tr.tableView = "Görüntüle";

document.render = render;
document.addEventListener("DOMContentLoaded", render);
