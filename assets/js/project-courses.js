
import { PROJECT_COURSES } from '../data/project-courses.js';
import { TRANSLATIONS } from '../data/translations.js';

function render() {
    let elMount = document.getElementById('archiveMount');
    elMount.innerHTML = '';

    PROJECT_COURSES && Object.keys(PROJECT_COURSES).sort((a, b) => b - a).forEach(year => {
        let courses = PROJECT_COURSES[year];
        let yearSection = document.createElement('section');
        yearSection.className = 'card-2';
        let yearHeader = document.createElement('h2');
        yearHeader.className = 'card-title';
        yearHeader.textContent = year;
        yearSection.appendChild(yearHeader);
        courses.forEach(course => {
            let courseDiv = document.createElement('div');
            courseDiv.className = 'archive-item';
            let courseLink = document.createElement('a');
            courseLink.href = course.url;
            courseLink.target = '_blank';
            courseLink.rel = 'noopener noreferrer';
            courseLink.textContent = course.title;
            courseDiv.appendChild(courseLink);
            yearSection.appendChild(courseDiv);
        });
        elMount.appendChild(yearSection);
    });
}

document.render = render;
document.addEventListener('DOMContentLoaded', render);


// Add translations specific to Project Courses page
TRANSLATIONS.en.headerTitle = "Project Courses";
TRANSLATIONS.en.headerDescription = "Project-based courses offered by the Department of Mathematics, including senior projects and summer projects.";
TRANSLATIONS.en.textViewCourseInformation = "View course information →";
TRANSLATIONS.en.textViewCourseGuide = "Course guide →";
TRANSLATIONS.en.textProjectDetails = "Project details →";
TRANSLATIONS.en.textProjectArchive = "Project Archive";

TRANSLATIONS.tr.headerTitle = "Proje Dersleri";
TRANSLATIONS.tr.headerDescription = "Matematik Bölümü tarafından sunulan proje tabanlı dersler, mezuniyet projeleri ve yaz projeleri.";
TRANSLATIONS.tr.textViewCourseInformation = "Ders bilgilerini görüntüle →";
TRANSLATIONS.tr.textViewCourseGuide = "Ders bilgilerini görüntüle →";
TRANSLATIONS.tr.textProjectDetails = "Ders bilgilerini görüntüle →";
TRANSLATIONS.tr.textProjectArchive = "Arşiv";