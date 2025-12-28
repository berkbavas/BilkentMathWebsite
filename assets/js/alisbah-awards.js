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
    const labels = {
        year: TRANSLATIONS.tableYear[lang],
        recipients: TRANSLATIONS.tableRecipients[lang],
        photos: TRANSLATIONS.tablePhotos[lang],
        view: TRANSLATIONS.tableView[lang]
    };
    const elTableMount = document.getElementById("tableMount");
    elTableMount.innerHTML = ALISBAH_AWARDS.map(item => renderRow(item, labels)).join("");
}

TRANSLATIONS.titleOrhanAlisbah = {
    en: "Orhan Alisbah Awards - Department of Mathematics - Bilkent University",
    tr: "Orhan Alisbah Ödülleri - Matematik Bölümü - Bilkent Üniversitesi"
};

TRANSLATIONS.tableYear = {
    en: "Year",
    tr: "Yıl"
};

TRANSLATIONS.tableRecipients = {
    en: "Recipients",
    tr: "Ödül Sahipleri"
};

TRANSLATIONS.tablePhotos = {
    en: "Photos",
    tr: "Fotoğraflar"
};

TRANSLATIONS.tableView = {
    en: "View",
    tr: "Görüntüle"
};


document.render = render;
document.addEventListener("DOMContentLoaded", render);
