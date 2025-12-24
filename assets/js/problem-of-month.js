import { PROBLEM_OF_MONTH_2024 } from "../data/problem-of-month/problem-of-month-2024.js";
import { PROBLEM_OF_MONTH_2025 } from "../data/problem-of-month/problem-of-month-2025.js";
import { escapeHtml } from "./helpers.js";

const DATA = {
    "2025": PROBLEM_OF_MONTH_2025,
    "2024": PROBLEM_OF_MONTH_2024,
};

const elMount = document.getElementById("mount");
const elLatestProblemBtn = document.getElementById("latestProblemBtn");
const elQuickLinks = document.getElementById("quickLinks");

function yearStats(items) {
    const solversTotal = items.reduce((acc, it) => acc + (it.solvers?.length || 0), 0);
    return solversTotal;
}

function renderCard(item) {
    const solversList = item.solvers
        .map(
            (solver) => `
      <li class="solver-item">
        <span class="solver-name">${escapeHtml(solver.name)}</span>
        <span class="solver-aff">${escapeHtml(solver.affiliation)}</span>
      </li>
    `).join("");

    const solverCount = item.solvers?.length || 0;

    return `
  <article class="pom-month-card">
    <div class="pom-top">
      <div class="pom-title">
        <div class="pom-monthline">
          <span class="pom-month">${escapeHtml(item.month)}</span>
          <span class="pom-year">${escapeHtml(String(item.year))}</span>
        </div>
        <div class="pom-subline">
          <span class="badge">
            <i class="fa-solid fa-users"></i>
            ${solverCount} solvers
          </span>
        </div>
      </div>

      <div class="pom-links">
        <a href="${item.question}" target="_blank" class="chip chip-ghost" aria-label="Open question PDF">
          <i class="fa-regular fa-circle-question"></i>
          Question
        </a>
        <a href="${item.solution}" target="_blank" class="chip chip-ghost" aria-label="Open solution PDF">
          <i class="fa-regular fa-file-lines"></i>
          Solution
        </a>
      </div>
    </div>

    <div class="pom-solvers">
      <details class="solvers-details">
        <summary class="solvers-summary">
          <span class="solvers-left">
            <i class="fa-solid fa-list-check"></i>
            Solvers
          </span>
          <span class="solvers-right">
            <span class="count-pill">${solverCount}</span>
            <span class="chev-mini" aria-hidden="true"></span>
          </span>
        </summary>

        <ul class="solver-list solver-grid">
          ${solversList}
        </ul>
      </details>
    </div>
  </article>
  `;
}

function renderCards(data) {
    return `
    <div class="pom-cards">
      ${data.map((item) => renderCard(item)).join("")}
    </div>
  `;
}

function createDetailSummary(year, solversTotal) {
    return `
    <summary class="archive-accordion-summary">
      <div class="year-summary">
        <div class="year-left">
          <div class="year-title">${year}</div>
          <div class="year-meta">
            <span class="year-pill"><i class="fa-solid fa-users"></i> ${solversTotal} solvers</span>
          </div>
        </div>
        <div class="year-right">
          <span class="hint">View</span>
          <span class="chev" aria-hidden="true"></span>
        </div>
      </div>
    </summary>
  `;
}

function render() {
    elMount.innerHTML = "";
    const years = Object.keys(DATA);
    years.sort((a, b) => b.localeCompare(a)); // Descending order

    let first = true;

    for (const year of years) {
        const yearData = DATA[year];
        const solversTotal = yearStats(yearData);

        const details = document.createElement("details");
        details.className = "archive-accordion-details";
        details.id = `year-${year}`;
        details.innerHTML = createDetailSummary(year, solversTotal);
        details.innerHTML += renderCards(yearData);
        elMount.appendChild(details);

        // Open the first year by default
        if (first) {
            details.setAttribute("open", "true");
            first = false;
        }

        // Quick links
        const linkBtn = document.createElement("button");
        linkBtn.className = "pom-btn-secondary";
        linkBtn.textContent = year;
        linkBtn.addEventListener("click", () => {
            document.getElementById(`year-${year}`).scrollIntoView({ behavior: "smooth" });
        });
        elQuickLinks.appendChild(linkBtn);
    }

    // Latest problem and solution buttons
    const latestYear = years[0];
    const latestData = DATA[latestYear];
    const latestItem = latestData[latestData.length - 1];
    elLatestProblemBtn.addEventListener("click", () => {
        window.open(latestItem.question, "_blank");
    });

    elLatestProblemBtn.textContent = `Latest Problem (${latestItem.month} ${latestItem.year})`;

}

document.addEventListener("DOMContentLoaded", render);
