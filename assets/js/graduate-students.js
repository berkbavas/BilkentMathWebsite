import { GRADUATE_STUDENTS } from "../data/graduate-students.js";
import { escapeHtml } from "./helpers.js";

function row(student) {
  return `
      <tr>
        <td class="gs-photo-cell">
          <img src="${student.photo}" alt="${escapeHtml(student.name)}">
        </td>
        <td class="gs-name">${escapeHtml(student.name)}</td>
        <td>${escapeHtml(student.office)}</td>
        <td>${escapeHtml(student.phone)}</td>
        <td>
          <a href="mailto:${escapeHtml(student.email)}">
            ${escapeHtml(student.email)}
          </a>
         <td>${escapeHtml(student.supervisor)}</td>
        </td>
      </tr>
    `;
}

function card(student) {

  const URL = "https://math.bilkent.edu.tr/Grad_student_photos/";
  return `
      <div class="graduate-student-card">
        <img src="${URL}${student.photo}" alt="${escapeHtml(student.name)}">
        <h3>${escapeHtml(student.name)}</h3>
        <div class="graduate-student-content">
          <p><strong>Office:</strong> ${escapeHtml(student.office)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(student.phone)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(student.email)}">${escapeHtml(student.email)}</a></p>
          <p><strong>Supervisor:</strong> ${escapeHtml(student.advisor)}</p>
        </div>
      </div>
    `;
}

function renderTable() {
  const tbody = document.querySelector("#graduate-students-tbody");
  tbody.innerHTML = GRADUATE_STUDENTS.map(row).join("");
}

function renderCards() {
  const container = document.querySelector("#graduate-students-cards-container");
  container.innerHTML = GRADUATE_STUDENTS.map(card).join("");
}

document.addEventListener("DOMContentLoaded", renderCards);