import { GRADUATE_STUDENTS } from "../data/graduate-students.js";
import { TRANSLATIONS } from "../data/translations.js";

const elementSearch = document.querySelector("#search");
const elementCount = document.querySelector("#count");
const elementReset = document.querySelector("#reset");

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

function matches(student, query) {
    const ql = query.toLowerCase();
    if (student.name && student.name.toLowerCase().includes(ql)) return true;
    return false;
}


function renderCards(list) {
    const container = document.querySelector("#gs-cards-container");
    container.innerHTML = list.map(card).join("");
}

function apply() {
    const currentLang = localStorage.getItem("lang") || "en";
    elementSearch.placeholder = TRANSLATIONS[currentLang].placeholderSearch;
    const query = elementSearch.value.trim();
    const list = GRADUATE_STUDENTS.filter(student => matches(student, query));
    elementCount.textContent = `${list.length} ${TRANSLATIONS[currentLang].postfixStudent}`;
    renderCards(list);
}

function resetFilters() {
    elementSearch.value = "";
    apply();
}

function render() {
    elementSearch.addEventListener("input", apply);
    elementReset.addEventListener("click", resetFilters);
    apply();
}


TRANSLATIONS.en.titleGraduateStudentsPage = "Graduate Students - Bilkent University";
TRANSLATIONS.en.headerGraduateStudents = "Graduate Students";
TRANSLATIONS.en.paragraphGraduateStudents = "Information about current graduate students of the Department of Mathematics.";
TRANSLATIONS.en.buttonReset = "Reset";
TRANSLATIONS.en.postfixStudent = "Student(s)";
TRANSLATIONS.en.placeholderSearch = "Search";

TRANSLATIONS.tr.titleGraduateStudentsPage = "Lisansüstü Öğrencileri - Bilkent Üniversitesi";
TRANSLATIONS.tr.headerGraduateStudents = "Lisansüstü Öğrencileri";
TRANSLATIONS.tr.paragraphGraduateStudents = "Matematik Bölümü'nün mevcut lisansüstü öğrencileri hakkında bilgi.";
TRANSLATIONS.tr.buttonReset = "Sıfırla";
TRANSLATIONS.tr.postfixStudent = "Öğrenci";
TRANSLATIONS.tr.placeholderSearch = "Ara";

document.render = render;
document.addEventListener("DOMContentLoaded", render);