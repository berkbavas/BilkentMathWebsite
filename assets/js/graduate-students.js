import { GRADUATE_STUDENTS } from "../data/graduate-students.js";
import { escapeHtml } from "./helpers.js";


function card(s) {
    const name = s.name ?? "";
    const advisor = s.advisor ?? "";
    const office = s.office ?? "";
    const phone = s.phone ?? "";
    const email = s.email ?? "";


    const photoUrl = encodeURI("https://math.bilkent.edu.tr/Grad_student_photos/" + (s.photo || "placeholder.jpg"));

    return `
    <article class="gs-card">
        <div class="gs-card-top" role="group" aria-label="${name}">
            <div class="gs-avatar">
            <img src="${photoUrl}" alt="${name}" loading="lazy">
            </div>
            <div class="gs-head">
                <h2 class="gs-name">${name}</h2>
                <p class="gs-sub">Advisor: ${advisor}</p>
            </div>
        </div>

        <div class="gs-meta">
            <div class="gs-meta-item">
                <i class="gs-ico fa-regular fa-building"></i>
                <span class="gs-meta-text">${office}</span>
            </div>

            <div class="gs-meta-item">
                <i class="gs-ico fa-regular fa-envelope"></i>
                <span class="gs-meta-text">${email}</span>
            </div>

            <div class="gs-meta-item">
                <i class="gs-ico fa-solid fa-phone"></i>
                <span class="gs-meta-text">${phone}</span>
            </div>

        </div>
    </article>
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