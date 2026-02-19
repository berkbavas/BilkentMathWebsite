import { PROBLEM_OF_MONTH_2025 } from "../data/problem-of-the-month/problem-of-the-month-2025.js";
import { PROBLEM_OF_MONTH_2024 } from "../data/problem-of-the-month/problem-of-the-month-2024.js";
import { PROBLEM_OF_MONTH_2023 } from "../data/problem-of-the-month/problem-of-the-month-2023.js";
import { PROBLEM_OF_MONTH_2022 } from "../data/problem-of-the-month/problem-of-the-month-2022.js";
import { PROBLEM_OF_MONTH_2021 } from "../data/problem-of-the-month/problem-of-the-month-2021.js";
import { PROBLEM_OF_MONTH_2020 } from "../data/problem-of-the-month/problem-of-the-month-2020.js";
import { PROBLEM_OF_MONTH_2019 } from "../data/problem-of-the-month/problem-of-the-month-2019.js";
import { PROBLEM_OF_MONTH_2018 } from "../data/problem-of-the-month/problem-of-the-month-2018.js";
import { PROBLEM_OF_MONTH_2017 } from "../data/problem-of-the-month/problem-of-the-month-2017.js";
import { PROBLEM_OF_MONTH_2016 } from "../data/problem-of-the-month/problem-of-the-month-2016.js";
import { PROBLEM_OF_MONTH_2015 } from "../data/problem-of-the-month/problem-of-the-month-2015.js";
import { PROBLEM_OF_MONTH_2014 } from "../data/problem-of-the-month/problem-of-the-month-2014.js";
import { PROBLEM_OF_MONTH_2013 } from "../data/problem-of-the-month/problem-of-the-month-2013.js";
import { PROBLEM_OF_MONTH_2012 } from "../data/problem-of-the-month/problem-of-the-month-2012.js";
import { PROBLEM_OF_MONTH_2011 } from "../data/problem-of-the-month/problem-of-the-month-2011.js";
import { PROBLEM_OF_MONTH_2010 } from "../data/problem-of-the-month/problem-of-the-month-2010.js";
import { PROBLEM_OF_MONTH_2009 } from "../data/problem-of-the-month/problem-of-the-month-2009.js";
import { PROBLEM_OF_MONTH_2008 } from "../data/problem-of-the-month/problem-of-the-month-2008.js";
import { PROBLEM_OF_MONTH_2007 } from "../data/problem-of-the-month/problem-of-the-month-2007.js";
import { PROBLEM_OF_MONTH_2006 } from "../data/problem-of-the-month/problem-of-the-month-2006.js";

const { PROBLEM_OF_MONTH } = await import(`../data/problem-of-the-month.js?v=${document.version}`);
const { TRANSLATIONS, MONTHS_EN_TO_TR } = await import(`../data/translations.js?v=${document.version}`);
const { escapeHtml, safeUrl } = await import(`./helpers.js?v=${document.version}`);

// Data for rendering descending years
const DATA = [
    PROBLEM_OF_MONTH,
    PROBLEM_OF_MONTH_2025,
    PROBLEM_OF_MONTH_2024,
    PROBLEM_OF_MONTH_2023,
    PROBLEM_OF_MONTH_2022,
    PROBLEM_OF_MONTH_2021,
    PROBLEM_OF_MONTH_2020,
    PROBLEM_OF_MONTH_2019,
    PROBLEM_OF_MONTH_2018,
    PROBLEM_OF_MONTH_2017,
    PROBLEM_OF_MONTH_2016,
    PROBLEM_OF_MONTH_2015,
    PROBLEM_OF_MONTH_2014,
    PROBLEM_OF_MONTH_2013,
    PROBLEM_OF_MONTH_2012,
    PROBLEM_OF_MONTH_2011,
    PROBLEM_OF_MONTH_2010,
    PROBLEM_OF_MONTH_2009,
    PROBLEM_OF_MONTH_2008,
    PROBLEM_OF_MONTH_2007,
    PROBLEM_OF_MONTH_2006
];

const urlEn = "https://math.bilkent.edu.tr/Problem/"; // Base URL for problem PDFs in English
const urlTr = "https://math.bilkent.edu.tr/Soru/"; // Base URL for problem PDFs in Turkish

const elMount = document.getElementById("mount");
const elLatestProblemBtn = document.getElementById("latestProblemBtn");
const elQuickLinks = document.getElementById("quickLinks");

function yearStats(items) {
    const solversTotal = items.reduce((acc, it) => acc + (it.solvers?.length || 0), 0);
    return solversTotal;
}

function renderCard(item, lang) {
    const solversList = (item.solvers || []).map(
        (solver) => `
      <li class="solver-item">
        <span class="solver-name">${escapeHtml(solver.name)}</span>
        <span class="solver-aff">${escapeHtml(solver.affiliation ? solver.affiliation : "")}</span>
      </li>
    `
    ).join("");

    const solverCount = item.solvers?.length || 0;
    let urlQuestion = lang === "tr" ? urlTr + item.question.tr : urlEn + item.question.en;
    let month = lang === "tr" ? MONTHS_EN_TO_TR[item.month] || item.month : item.month;
    let question = safeUrl(urlQuestion);
    let solution = item.solution
        ? safeUrl(lang === "tr" ? urlTr + item.solution.tr : urlEn + item.solution.en)
        : null;

    return `
  <article class="pom-month-card">
    <div class="pom-top">
      <div class="pom-title">
        <div class="pom-monthline">
          <span class="pom-month">${month}</span>
          <span class="pom-year">${String(item.year)}</span>
        </div>

        <div class="pom-subline">
          <span class="badge">
            <i class="fa-solid fa-users"></i>
            ${solverCount} ${TRANSLATIONS.pomSolversLabel[lang] || "solvers"}
          </span>
        </div>
      </div>

      <div class="pom-links">
        <a href="${question}" target="_blank" class="chip chip-ghost"}">
            <i class="fa-regular fa-circle-question"></i>
            ${TRANSLATIONS.pomQuestionLabel[lang] || "Question"}
        </a>

        ${solution ? `
        <a href="${solution}" target="_blank" class="chip chip-ghost"}">
            <i class="fa-regular fa-file-lines"></i>
            ${TRANSLATIONS.pomSolutionLabel[lang] || "Solution"}
        </a>
        ` : ""}
      </div>
    </div>

    <div class="pom-solvers">
      <details class="solvers-details" open>
        <summary class="solvers-summary">
          <span class="solvers-left">
            <i class="fa-solid fa-list-check"></i>
            ${(TRANSLATIONS.pomSolversTitle[lang] || "Solvers")}
          </span>
          <span class="solvers-right">
            <span class="count-pill">${solverCount}</span>
            <span class="chev-mini" aria-hidden="true"></span>
          </span>
        </summary>

        <ul class="solver-list solver-grid">${solversList}</ul>
      </details>
    </div>
  </article>
  `;
}

function renderCards(data, lang) {
    return `
    <div class="pom-cards">
      ${data.map((item) => renderCard(item, lang)).join("")}
    </div>
  `;
}

function createDetailSummary(year, solversTotal, lang) {
    return `
    <summary class="archive-accordion-summary">
      <div class="year-summary">
        <div class="year-left">
          <div class="year-title">${year}</div>
          <div class="year-meta">
            <span class="year-pill">
              <i class="fa-solid fa-users"></i>
              ${solversTotal} ${TRANSLATIONS.pomSolversLabel[lang] || "solvers"}
            </span>
          </div>
        </div>

        <div class="year-right">
          <span class="hint">${TRANSLATIONS.pomViewLabel[lang] || "View"}</span>
          <span class="chev" aria-hidden="true"></span>
        </div>
      </div>
    </summary>
  `;
}

function render() {
    elMount.innerHTML = "";
    elQuickLinks.innerHTML = "";

    const lang = localStorage.getItem("lang") || "en";

    DATA.map((item, idx) => {
        const year = item[0].year;
        const solversTotal = yearStats(item);
        const details = document.createElement("details");
        details.className = "archive-accordion-details";
        details.id = `year-${year}`;
        details.innerHTML = createDetailSummary(year, solversTotal, lang);
        details.innerHTML += renderCards(item, lang);

        elMount.appendChild(details);

        // Quick links buttons
        // const linkBtn = document.createElement("button");
        // linkBtn.className = "btn btn-ghost";
        // linkBtn.textContent = year;
        // linkBtn.addEventListener("click", () => {
        //     document.getElementById(`year-${year}`).scrollIntoView({ behavior: "smooth" });
        // });
        // elQuickLinks.appendChild(linkBtn);
    });

    // Latest problem button
    const latestData = DATA[0]; // Latest year
    const latestItem = latestData[latestData.length - 1];

    let month = lang === "tr" ? MONTHS_EN_TO_TR[latestItem.month] || latestItem.month : latestItem.month;
    let url = lang === "tr" ? urlTr + latestItem.question.tr : urlEn + latestItem.question.en;
    elLatestProblemBtn.onclick = () => window.open(url, "_blank");
    elLatestProblemBtn.textContent = (TRANSLATIONS.pomLatestProblemLabel[lang] || "Latest Problem") + ` (${month} ${latestItem.year})`;
}

document.render = render; // Expose render function for language toggle
render(); // Initial render