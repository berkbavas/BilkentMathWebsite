import { PROBLEM_OF_MONTH_2024 } from "../data/problem-of-month/problem-of-month-2024.js";
import { PROBLEM_OF_MONTH_2025 } from "../data/problem-of-month/problem-of-month-2025.js";
import { TRANSLATIONS, MONTHS_EN_TO_TR } from "../data/translations.js";
import { escapeHtml } from "./helpers.js";

// Data for rendering descending years
const DATA = [
	PROBLEM_OF_MONTH_2025,
	PROBLEM_OF_MONTH_2024
];

const elMount = document.getElementById("mount");
const elLatestProblemBtn = document.getElementById("latestProblemBtn");
const elQuickLinks = document.getElementById("quickLinks");

function yearStats(items) {
	const solversTotal = items.reduce((acc, it) => acc + (it.solvers?.length || 0), 0);
	return solversTotal;
}

function renderCard(item, t, lang) {
	const solversList = (item.solvers || []).map(
		(solver) => `
      <li class="solver-item">
        <span class="solver-name">${escapeHtml(solver.name)}</span>
        <span class="solver-aff">${escapeHtml(solver.affiliation)}</span>
      </li>
    `
	).join("");

	const solverCount = item.solvers?.length || 0;
	let month = lang === "tr" ? MONTHS_EN_TO_TR[item.month] : item.month;

	return `
  <article class="pom-month-card">
    <div class="pom-top">
      <div class="pom-title">
        <div class="pom-monthline">
          <span class="pom-month">${escapeHtml(month)}</span>
          <span class="pom-year">${escapeHtml(String(item.year))}</span>
        </div>

        <div class="pom-subline">
          <span class="badge">
            <i class="fa-solid fa-users"></i>
            ${solverCount} ${escapeHtml(t.pomSolversLabel || "solvers")}
          </span>
        </div>
      </div>

      <div class="pom-links">
        <a href="${item.question}" target="_blank" class="chip chip-ghost" aria-label="${escapeHtml(t.pomOpenQuestionAria || "Open question PDF")}">
          <i class="fa-regular fa-circle-question"></i>
          ${escapeHtml(t.pomQuestionLabel || "Question")}
        </a>

        <a href="${item.solution}" target="_blank" class="chip chip-ghost" aria-label="${escapeHtml(t.pomOpenSolutionAria || "Open solution PDF")}">
          <i class="fa-regular fa-file-lines"></i>
          ${escapeHtml(t.pomSolutionLabel || "Solution")}
        </a>
      </div>
    </div>

    <div class="pom-solvers">
      <details class="solvers-details">
        <summary class="solvers-summary">
          <span class="solvers-left">
            <i class="fa-solid fa-list-check"></i>
            ${escapeHtml(t.pomSolversTitle || "Solvers")}
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

function renderCards(data, t, lang) {
	return `
    <div class="pom-cards">
      ${data.map((item) => renderCard(item, t, lang)).join("")}
    </div>
  `;
}

function createDetailSummary(year, solversTotal, t) {
	return `
    <summary class="archive-accordion-summary">
      <div class="year-summary">
        <div class="year-left">
          <div class="year-title">${year}</div>
          <div class="year-meta">
            <span class="year-pill">
              <i class="fa-solid fa-users"></i>
              ${solversTotal} ${escapeHtml(t.pomSolversLabel || "solvers")}
            </span>
          </div>
        </div>

        <div class="year-right">
          <span class="hint">${escapeHtml(t.pomViewLabel || "View")}</span>
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
	const t = TRANSLATIONS[lang] || {};

	DATA.map((item, idx) => {
		const year = item[idx].year;
		const solversTotal = yearStats(item);
		const details = document.createElement("details");
		details.className = "archive-accordion-details";
		details.id = `year-${year}`;
		details.innerHTML = createDetailSummary(year, solversTotal, t);
		details.innerHTML += renderCards(item, t, lang);
		details.setAttribute("open", idx < 1 ? "true" : "false");
		elMount.appendChild(details);

		// Quick links buttons
		const linkBtn = document.createElement("button");
		linkBtn.className = "btn btn-ghost";
		linkBtn.textContent = year;
		linkBtn.addEventListener("click", () => {
			document.getElementById(`year-${year}`).scrollIntoView({ behavior: "smooth" });
		});
		elQuickLinks.appendChild(linkBtn);
	});


	// Latest problem button
	const latestData = DATA[0]; // Latest year
	const latestItem = latestData[latestData.length - 1];

	let month = lang === "tr" ? MONTHS_EN_TO_TR[latestItem.month] : latestItem.month;

	elLatestProblemBtn.onclick = () => window.open(latestItem.question, "_blank");
	elLatestProblemBtn.textContent =
		(t.pomLatestProblemLabel || "Latest Problem") + ` (${month} ${latestItem.year})`;
}

/* ---- i18n keys ---- */
TRANSLATIONS.en.pomQuestionLabel = "Question";
TRANSLATIONS.en.pomSolutionLabel = "Solution";
TRANSLATIONS.en.pomSolversTitle = "Solvers";
TRANSLATIONS.en.pomSolversLabel = "solvers";
TRANSLATIONS.en.pomViewLabel = "View";
TRANSLATIONS.en.pomLatestProblemLabel = "Problem of the Month";
TRANSLATIONS.en.pomOpenQuestionAria = "Open question PDF";
TRANSLATIONS.en.pomOpenSolutionAria = "Open solution PDF";
TRANSLATIONS.en.headerTitle = "Problem of the Month";
TRANSLATIONS.en.headerDescription = "A monthly problem series. Submit your solution and see the archive of questions and solutions.";
TRANSLATIONS.en.howToSubmitTitle = "How to Submit";
TRANSLATIONS.en.howToSubmitDescription = "We will announce the following month on this page the names of people who have sent correct solutions. You can send your answers by one of the following ways.";
TRANSLATIONS.en.mailLabel = "Mail:";
TRANSLATIONS.en.mailAddressLine1 = "Bilkent University,";
TRANSLATIONS.en.mailAddressLine2 = "Department of Mathematics,";
TRANSLATIONS.en.mailAddressLine3 = "06800 Bilkent, Ankara, Turkey";
TRANSLATIONS.en.emailLabel = "Email:";
TRANSLATIONS.en.quickLinksTitle = "Quick links";
TRANSLATIONS.en.quickLinksDescription = "Jump to a year or open the latest question.";

TRANSLATIONS.tr.pomQuestionLabel = "Soru";
TRANSLATIONS.tr.pomSolutionLabel = "Çözüm";
TRANSLATIONS.tr.pomSolversTitle = "Çözenler";
TRANSLATIONS.tr.pomSolversLabel = "çözen";
TRANSLATIONS.tr.pomViewLabel = "Görüntüle";
TRANSLATIONS.tr.pomLatestProblemLabel = "Ayın Sorusu";
TRANSLATIONS.tr.pomOpenQuestionAria = "Soru PDF'ini aç";
TRANSLATIONS.tr.pomOpenSolutionAria = "Çözüm PDF'ini aç";
TRANSLATIONS.tr.headerTitle = "Ayın Sorusu";
TRANSLATIONS.tr.headerDescription = "Aylık soru serisi. Çözümünüzü gönderin veya arşive göz atın.";
TRANSLATIONS.tr.howToSubmitTitle = "Nasıl Gönderilir?";
TRANSLATIONS.tr.howToSubmitDescription = "Soruları doğru çözenlerin isimlerini takip eden ay bu sayfada yayınlıyoruz. Çözümlerinizi aşağıdaki yollardan biri ile bize ulaştırabilirsiniz.";
TRANSLATIONS.tr.mailLabel = "Posta:";
TRANSLATIONS.tr.mailAddressLine1 = "Bilkent Üniversitesi,";
TRANSLATIONS.tr.mailAddressLine2 = "Matematik Bölümü,";
TRANSLATIONS.tr.mailAddressLine3 = "06800 Bilkent, Ankara, Türkiye";
TRANSLATIONS.tr.emailLabel = "E-posta:";
TRANSLATIONS.tr.quickLinksTitle = "Hızlı linkler";
TRANSLATIONS.tr.quickLinksDescription = "Bir yıla atlayın veya son soruyu açın.";

document.render = render;
document.addEventListener("DOMContentLoaded", render);
