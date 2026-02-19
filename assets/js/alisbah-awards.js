
const { ALISBAH_AWARDS } = await import(`../data/alisbah-awards.js?v=${document.version}`);
const { TRANSLATIONS } = await import(`../data/translations.js?v=${document.version}`);

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
          <span data-i18n="alisbahView">${labels.view}</span>
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
    year: TRANSLATIONS.alisbahYear[lang],
    recipients: TRANSLATIONS.alisbahRecipients[lang],
    photos: TRANSLATIONS.alisbahPhotos[lang],
    view: TRANSLATIONS.alisbahView[lang],
  };

  const elTableMount = document.getElementById("tableMount");
  if (!elTableMount) return;

  elTableMount.innerHTML = ALISBAH_AWARDS.map(item => renderRow(item, labels)).join("");
}

document.render = render; // Expose render function for language toggle
render(); // Initial render