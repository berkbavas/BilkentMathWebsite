import { GRADUATE_STUDENTS } from "../data/graduate-students.js";
import { escapeHtml } from "./helpers.js";


function card(student) {
    const URL = "https://math.bilkent.edu.tr/Grad_student_photos/";
    return `
      <div class="card gs-entry">
        <img src="${URL}${student.photo}" alt="${escapeHtml(student.name)}">
        <h3>${escapeHtml(student.name)}</h3>
        <div class="gs-content">
          <p><strong>Office:</strong> ${escapeHtml(student.office)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(student.phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(student.email)}</p>
          <p><strong>Supervisor:</strong> ${escapeHtml(student.advisor)}</p>
        </div>
      </div>
    `;
}

function matches(student, q) {
    const ql = q.toLowerCase();
    if (student.name && student.name.toLowerCase().includes(ql)) return true;
    if (student.office && student.office.toLowerCase().includes(ql)) return true;
    if (student.phone && student.phone.toLowerCase().includes(ql)) return true;
    if (student.email && student.email.toLowerCase().includes(ql)) return true;
    if (student.advisor && student.advisor.toLowerCase().includes(ql)) return true;
    return false;
}


function renderCards(list) {
    const container = document.querySelector("#gs-cards-container");
    container.innerHTML = list.map(card).join("");
}

function apply() {
    const q = document.querySelector("#search").value.trim();
    let list = GRADUATE_STUDENTS.filter(student => matches(student, q));
    document.querySelector("#count").textContent = `${list.length} student(s)`;
    renderCards(list);
}

function resetFilters() {
    document.querySelector("#search").value = "";
    apply();
}

function render() {
    document.querySelector("#search").addEventListener("input", apply);
    document.querySelector("#reset").addEventListener("click", resetFilters);
    apply();
}

document.addEventListener("DOMContentLoaded", render);