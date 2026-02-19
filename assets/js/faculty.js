
const { CURRENT_FACULTY } = await import(`../data/faculty.js?v=${document.version}`);
const { EMERITI } = await import(`../data/emeriti.js?v=${document.version}`);
const { escapeHtml } = await import(`./helpers.js?v=${document.version}`);

const URL = "https://math.bilkent.edu.tr/personnel_photos";

function cardTemplate(p) {
    let currentLang = localStorage.getItem("lang") || "en";

    const name = p.name;
    const title = p.title[currentLang] || "";
    const degree = p.degree[currentLang] || "";
    const office = p.office || "";
    const phone = p.phone || "";
    const email = p.email || "";
    const webpage = (p.webpage || "").trim();
    const photo = (p.photo || "").trim();

    const photoSrc = photo
        ? `${URL}/${photo}`
        : `${URL}/placeholder.jpg`;



    const tags = (p.research || [])
        .map(area => `<span class="faculty-chip">${escapeHtml(area[currentLang] || area["en"])}</span>`)
        .join("");

    const nameHtml = webpage
        ? `<a href="${escapeHtml(webpage)}" target="_blank" rel="noopener">${name}</a>`
        : name;

    return `
    <article class="person-card">
        <div class="faculty-image-and-content">
            <div class="faculty-media"><img src="${escapeHtml(photoSrc)}" alt="${name}"></div>

            <div class="faculty-content">
                <header class="faculty-header">
                    <h3 class="faculty-name">${nameHtml}</h3>
                    ${title ? `<span class="faculty-rank">${title}</span>` : ""}
                    ${degree ? `<p class="faculty-degree">${degree}</p>` : ""}
                </header>
                ${tags ? `<div class="faculty-chips">${tags}</div>` : ""}
            </div>
        </div>

        <ul class="faculty-meta">
        ${office ? `
        <li>
            <i class="fa-solid fa-briefcase"></i>
            <span>${office}</span>
        </li>` : ""}

        ${email ? `
        <li>
            <i class="fa-regular fa-envelope"></i>
            <span>${email}</span>
        </li>` : ""}

        ${phone ? `
        <li>
            <i class="fa-solid fa-phone"></i>
            <span>${phone}</span>
        </li>` : ""}
        </ul>

    </article>`;
}


function render() {
    const gridCurrent = document.querySelector("#gridCurrent");
    const gridEmeriti = document.querySelector("#gridEmeriti");
    const facultyMemberCount = document.querySelector("#facultyMemberCount");
    const lang = localStorage.getItem("lang") || "en";

    if (lang === "en") {
        facultyMemberCount.textContent = `${CURRENT_FACULTY.length} Faculty Members`;
    } else {
        facultyMemberCount.textContent = `${CURRENT_FACULTY.length} Öğretim Üyesi`;
    }

    gridCurrent.innerHTML = CURRENT_FACULTY.map(cardTemplate).join("");
    gridEmeriti.innerHTML = EMERITI.map(cardTemplate).join("");
}

document.render = render; // Expose render function for language toggle
render(); // Initial render