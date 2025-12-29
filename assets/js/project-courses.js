
import { PROJECT_COURSES } from '../data/project-courses.js';
import { TRANSLATIONS } from '../data/translations.js';
import { escapeHtml, safeUrl } from './helpers.js';

function render() {
    let elMount = document.getElementById('archiveMount');
    elMount.innerHTML = '';

    PROJECT_COURSES && Object.keys(PROJECT_COURSES).sort((a, b) => b - a).forEach(year => {
        let courses = PROJECT_COURSES[year];
        let yearSection = document.createElement('section');
        yearSection.className = 'card';
        let yearHeader = document.createElement('h2');
        yearHeader.className = 'card-title';
        yearHeader.textContent = year;
        yearSection.appendChild(yearHeader);
        courses.forEach(course => {
            const url = safeUrl(course.url);
            const title = escapeHtml(course.title);

            let courseDiv = document.createElement('div');
            courseDiv.className = 'archive-item';
            let fontAwesomeIcon = document.createElement('i');
            fontAwesomeIcon.className = 'fa-solid fa-square-arrow-up-right';
            let courseLink = document.createElement('a');
            courseLink.href = url;
            courseLink.target = '_blank';
            courseLink.rel = 'noopener noreferrer';
            courseLink.textContent = title;
            courseLink.appendChild(fontAwesomeIcon);
            courseDiv.appendChild(courseLink);
            yearSection.appendChild(courseDiv);
        });
        elMount.appendChild(yearSection);
    });
}

document.render = render;
document.addEventListener('DOMContentLoaded', render);


// Add translations specific to Project Courses page
TRANSLATIONS.headerTitle = {
    en: "Project Courses",
    tr: "Proje Dersleri"
};

TRANSLATIONS.headerDescription = {
    en: "Project-based courses offered by the Department of Mathematics, including senior projects and summer projects.",
    tr: "Matematik Bölümü tarafından sunulan proje tabanlı dersler, mezuniyet projeleri ve yaz projeleri."
};

TRANSLATIONS.textViewCourseInformation = {
    en: "View course information",
    tr: "Ders bilgilerini görüntüle"
};

TRANSLATIONS.textViewCourseGuide = {
    en: "Course guide",
    tr: "Ders rehberi"
};

TRANSLATIONS.textProjectDetails = {
    en: "Project details",
    tr: "Proje detayları"
};

TRANSLATIONS.textProjectArchive = {
    en: "Project Archive",
    tr: "Arşiv"
};
