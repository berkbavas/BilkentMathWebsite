import { GRADUATE_STUDENTS } from "../data/graduate-students.js";
import { escapeHtml } from "./helpers.js";

function matches(student, q) {
    if (!q) return true;
    const hay = `${student.name} ${student.advisor}`.toLowerCase();
    return hay.includes(q.toLowerCase());
}

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

function renderCards(list) {
    const container = document.querySelector("#gs-cards-container");
    container.innerHTML = list.map(card).join("");
}

function apply() {
    const q = document.querySelector("#q").value.trim();
    let list = GRADUATE_STUDENTS.filter(student => matches(student, q));
    document.querySelector("#count").textContent = `${list.length} student(s)`;
    renderCards(list);
}

function resetFilters() {
    document.querySelector("#q").value = "";
    apply();
}

function render() {
    document.querySelector("#q").addEventListener("input", apply);
    document.querySelector("#reset").addEventListener("click", resetFilters);
    apply();
}

document.addEventListener("DOMContentLoaded", render);