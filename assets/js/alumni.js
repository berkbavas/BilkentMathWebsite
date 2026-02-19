
const { ALUMNI } = await import(`../data/alumni.js?v=${document.version}`);
const { TRANSLATIONS } = await import(`../data/translations.js?v=${document.version}`);

const elementSearch = document.querySelector("#search");
const elementReset = document.querySelector("#reset");
const elementRoot = document.getElementById("alumniRoot");

const URL = "https://math.bilkent.edu.tr/Alumni/";

function renderEntry(a, lang) {
    const photoUrl = a.photo ? URL + a.photo : "";
    const bullets = Array.isArray(a.bullets) ? a.bullets : [];
    const story = a.story[lang] || "";

    return `
    <article class="person-card">
        <header class="alumni-header">
            ${photoUrl ? `
            <div class="alumni-avatar">
                <img src="${photoUrl}" alt="${a.name}" loading="lazy">
            </div>` : ""}

            <div class="alumni-title">
                <h3 class="alumni-name">${a.name}</h3>
                ${a.year ? `<span class="alumni-year">${a.year}</span>` : ""}
            </div>
        </header>

        ${bullets.length ? `
        <ul class="alumni-bullets">${bullets.map(b => `<li>${b}</li>`).join("")}</ul>` : ""}

        ${story ? `
        <details class="alumni-story">
            <summary>
                <i class="fa-solid fa-caret-right"></i>
                <span data-i18n="alumniStory">${TRANSLATIONS.alumniStory[lang]}</span>
            </summary>
            <blockquote>${story}</blockquote>
        </details>` : ""}

        ${a.lastUpdate ? `
        <div class="alumni-update">
           ${TRANSLATIONS.alumniLastUpdate[lang]}: ${a.lastUpdate}
        </div>` : ""}
    </article>
    `;
}

function matches(alumni, query) {
    const ql = query.toLowerCase();
    if (alumni.name && alumni.name.toLowerCase().includes(ql)) return true;
    return false;
}

function apply() {
    const lang = localStorage.getItem("lang") || "en";
    const query = elementSearch.value.trim();
    const list = ALUMNI.filter(alumni => matches(alumni, query));

    // Sort by year descending, then by surname ascending
    list.sort((a, b) => {
        const yearA = a.year || "";
        const yearB = b.year || "";
        if (yearA !== yearB) {
            return yearA < yearB; // Descending by year
        }
        const surnameA = a.name.split(" ").slice(-1)[0].toLowerCase();
        const surnameB = b.name.split(" ").slice(-1)[0].toLowerCase();
        return surnameA.localeCompare(surnameB); // Ascending by surname    
    });

    elementRoot.innerHTML = list.map(a => renderEntry(a, lang)).join("");
    elementSearch.placeholder = TRANSLATIONS.alumniSearchPlaceholder[lang];
    if (list.length === 0) {
        elementRoot.innerHTML = `<p>${TRANSLATIONS.alumniNoResults[lang]}</p>`;
    }
}

function resetFilters() {
    elementSearch.value = "";
    apply();
}

function init() {
    elementSearch.addEventListener("input", apply);
    elementReset.addEventListener("click", resetFilters);
    render();
}

function render() {
    apply();
}

document.render = render; // Expose render function for language toggle
init(); // Initialize event listeners and render initial list