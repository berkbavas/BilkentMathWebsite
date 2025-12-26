import { GRADUATE_STUDENTS } from "../data/graduate-students.js";
import { TRANSLATIONS } from "../data/translations.js";

const elementSearch = document.querySelector("#search");
const elementCount = document.querySelector("#count");
const elementReset = document.querySelector("#reset");

function card(s, lang) {
    const name = s.name ?? "";
    const advisor = s.advisor ?? "";
    const office = s.office ?? "";
    const phone = s.phone ?? "";
    const email = s.email ?? "";

    const photoUrl = encodeURI(
        "https://math.bilkent.edu.tr/Grad_student_photos/" + (s.photo || "placeholder.jpg")
    );

    const advisorLabel = lang === "tr" ? "Danışman" : "Advisor";

    return `
  <article class="gs-card">
    <div class="gs-card-inner">

      <div class="gs-top">
        <div class="gs-avatar">
          <img src="${photoUrl}" alt="${name}" loading="lazy">
        </div>

        <div class="gs-title">
          <h2 class="gs-name">${name}</h2>
          ${advisor ? `<p class="gs-sub"><span class="gs-sub-label">${advisorLabel}:</span> ${advisor}</p>` : ""}
        </div>
      </div>

      <div class="gs-divider" aria-hidden="true"></div>

      <ul class="gs-meta" aria-label="Contact information">
        ${office ? `
          <li class="gs-meta-item">
            <span class="gs-ico"><i class="fa-regular fa-building" aria-hidden="true"></i></span>
            <span class="gs-meta-text">${office}</span>
          </li>` : ""}

        ${email ? `
          <li class="gs-meta-item">
            <span class="gs-ico"><i class="fa-regular fa-envelope" aria-hidden="true"></i></span>
            <span class="gs-meta-text">${email}</span>
          </li>` : ""}

        ${phone ? `
          <li class="gs-meta-item">
            <span class="gs-ico"><i class="fa-solid fa-phone" aria-hidden="true"></i></span>
            <span class="gs-meta-text">${phone}</span>
          </li>` : ""}
      </ul>

    </div>
  </article>`;
}

function matches(student, query) {
    const ql = query.toLowerCase();
    if (student.name && student.name.toLowerCase().includes(ql)) return true;
    return false;
}


function renderCards(list) {
    const container = document.querySelector("#gs-cards-container");
    const currentLang = localStorage.getItem("lang") || "en";
    container.innerHTML = list.map(student => card(student, currentLang)).join("");
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

TRANSLATIONS.en.headerGraduateStudents = "Graduate Students";
TRANSLATIONS.en.paragraphGraduateStudents = "Information about current graduate students of the Department of Mathematics.";
TRANSLATIONS.en.buttonReset = "Reset";
TRANSLATIONS.en.postfixStudent = "Student(s)";
TRANSLATIONS.en.placeholderSearch = "Search";

TRANSLATIONS.tr.headerGraduateStudents = "Lisansüstü Öğrencileri";
TRANSLATIONS.tr.paragraphGraduateStudents = "Matematik Bölümü'nün mevcut lisansüstü öğrencileri hakkında bilgi.";
TRANSLATIONS.tr.buttonReset = "Sıfırla";
TRANSLATIONS.tr.postfixStudent = "Öğrenci";
TRANSLATIONS.tr.placeholderSearch = "Ara";

document.render = render;
document.addEventListener("DOMContentLoaded", render);