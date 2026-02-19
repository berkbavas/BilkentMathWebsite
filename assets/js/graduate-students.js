 
const graduateStudentsModule =
  await import(`../data/graduate-students.js?v=${document.VERSION}`);
const helpersModule =
  await import(`./helpers.js?v=${document.VERSION}`);
const GRADUATE_STUDENTS = graduateStudentsModule.GRADUATE_STUDENTS;
const { escapeHtml } = helpersModule;

const URL = "https://math.bilkent.edu.tr/Grad_student_photos";

function cardTemplate(student) {
    const name = student.name || "";
    const office = student.office || "";
    const phone = student.phone || "";
    const email = student.email || "";
    const advisor = student.advisor || "";
    const photo = (student.photo || "").trim();

    // Use a placeholder if no photo
    const photoSrc = photo 
        ? `${URL}/${photo}` 
        : `${URL}/placeholder.jpg`;

    const lang = localStorage.getItem("lang") || "en";
    const advisorLabel = lang === "tr" ? "Danışman" : "Advisor";

    return `
    <article class="student-card">
        <div class="student-image-and-content">
            <div class="student-media">
                <img src="${escapeHtml(photoSrc)}" alt="${escapeHtml(name)}" loading="lazy">
            </div>

            <div class="student-content">
                <header class="student-header">
                    <h3 class="student-name">${escapeHtml(name)}</h3>
                    ${advisor ? `
                    <div class="student-advisor">
                        <i class="fa-solid fa-chalkboard-user" aria-hidden="true"></i>
                        <span>${advisorLabel}: <span class="student-advisor-name">${escapeHtml(advisor)}</span></span>
                    </div>` : ""}
                </header>

                <ul class="student-meta">
                    ${office ? `
                    <li>
                        <i class="fa-solid fa-door-open" aria-hidden="true"></i>
                        <span>${escapeHtml(office)}</span>
                    </li>` : ""}

                    ${email ? `
                    <li>
                        <i class="fa-regular fa-envelope" aria-hidden="true"></i>
                        <span>${escapeHtml(email)}</span>
                    </li>` : ""}

                    ${phone ? `
                    <li>
                        <i class="fa-solid fa-phone" aria-hidden="true"></i>
                        <span>${escapeHtml(phone)}</span>
                    </li>` : ""}
                </ul>
            </div>
        </div>
    </article>`;
}

function emptyState(lang) {
    const message = lang === "tr" 
        ? "Bu kategoride henüz öğrenci bulunmamaktadır." 
        : "No graduate students found.";
    
    return `
    <div class="students-empty">
        <i class="fa-solid fa-user-slash" aria-hidden="true"></i>
        <p>${message}</p>
    </div>`;
}

function noResultsState(lang) {
    const title = lang === "tr" ? "Sonuç bulunamadı" : "No results found";
    const message = lang === "tr" 
        ? "Arama kriterlerinize uygun öğrenci bulunamadı." 
        : "No students match your search criteria.";
    
    return `
    <div class="no-results">
        <i class="fa-solid fa-search" aria-hidden="true"></i>
        <h3>${title}</h3>
        <p>${message}</p>
    </div>`;
}

function filterStudents(searchTerm) {
    return GRADUATE_STUDENTS.filter(student => {
        const matchesSearch = !searchTerm || 
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (student.advisor && student.advisor.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesSearch;
    });
}

function render() {
    const studentsGrid = document.querySelector("#studentsGrid");
    const studentCount = document.querySelector("#studentCount");
    const searchInput = document.querySelector("#searchInput");
    const lang = localStorage.getItem("lang") || "en";

    // Update search placeholder based on language
    if (searchInput) {
        searchInput.placeholder = lang === "tr" ? "Ara..." : "Search";
    }

    // Get filter values
    const searchTerm = searchInput?.value || "";

    // Filter students
    const filteredStudents = filterStudents(searchTerm);

    // Update count
    const totalCount = GRADUATE_STUDENTS.length;
    const filteredCount = filteredStudents.length;
    
    if (studentCount) {
        if (searchTerm) {
            studentCount.textContent = lang === "en" 
                ? `${filteredCount} of ${totalCount} Students`
                : `${totalCount} öğrenciden ${filteredCount}`;
        } else {
            studentCount.textContent = lang === "en" 
                ? `${totalCount} Graduate Student${totalCount !== 1 ? 's' : ''}`
                : `${totalCount} Lisansüstü Öğrenci`;
        }
    }

    // Render grid
    if (studentsGrid) {
        if (filteredStudents.length > 0) {
            studentsGrid.innerHTML = filteredStudents.map(cardTemplate).join("");
        } else if (searchTerm) {
            studentsGrid.innerHTML = noResultsState(lang);
        } else {
            studentsGrid.innerHTML = emptyState(lang);
        }
    }


    searchInput.placeholder = lang === "tr" ? "Ara" : "Search";

    // Handle language toggle visibility
    document.querySelectorAll("[data-lang]").forEach(el => {
        const elLang = el.getAttribute("data-lang");
        el.hidden = elLang !== lang;
    });


}

function setupEventListeners() {
    const searchInput = document.querySelector("#searchInput");
    const resetBtn = document.querySelector("#resetBtn");
    

    // Debounce search
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(render, 300);
        });
    }

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
            }
            render();
        });
    }
}


// Initial render
document.addEventListener("DOMContentLoaded", () => {
    render();
    setupEventListeners();
});

document.render = render; // Expose render function for language toggle
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", () => {
    render();
    setupEventListeners();
});
} else {
    render();
    setupEventListeners();
}
