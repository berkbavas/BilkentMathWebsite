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
    <td><a class="pill" href="${item.photos}">View</a></td>
    </tr>
    `
}

function render() {
    let rows = "";
    ALISBAH_AWARDS.forEach(item => {rows += renderRow(item)});
    const elTableMount = document.getElementById("tableMount");
    elTableMount.innerHTML = rows;
}

document.addEventListener("DOMContentLoaded", render);
