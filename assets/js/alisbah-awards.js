
import { TRANSLATIONS } from "../data/translations.js";
import {ALISBAH_AWARDS} from "../data/alisbah-awards.js"


function renderRow(item) {
    let list = "";
    item.recipients.forEach(element => {
        list += `<li class="pill">${element}</li>`
    });

    return `
    <tr>
    <td class="oa-year-cell">${item.year}</td>
    <td>
        <ul class="oa-names">${list}</ul>
    </td>
    <td><a data-i18n="tableView" class="pill" href="${item.photos}">View</a></td>
    </tr>
    `
}

function render() {
    let rows = "";
    ALISBAH_AWARDS.forEach(item => {rows += renderRow(item)});
    const elTableMount = document.getElementById("tableMount");
    elTableMount.innerHTML = rows;
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

document.addEventListener("DOMContentLoaded", render);
