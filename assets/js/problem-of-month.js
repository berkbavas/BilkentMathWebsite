import { PROBLEM_OF_MONTH_2025 } from "../data/problem-of-month/problem-of-month-2025.js";
import { PROBLEM_OF_MONTH_2024 } from "../data/problem-of-month/problem-of-month-2024.js";
import { PROBLEM_OF_MONTH_2023 } from "../data/problem-of-month/problem-of-month-2023.js";
import { PROBLEM_OF_MONTH_2022 } from "../data/problem-of-month/problem-of-month-2022.js";
import { PROBLEM_OF_MONTH_2021 } from "../data/problem-of-month/problem-of-month-2021.js";
import { PROBLEM_OF_MONTH_2020 } from "../data/problem-of-month/problem-of-month-2020.js";
import { PROBLEM_OF_MONTH_2019 } from "../data/problem-of-month/problem-of-month-2019.js";
import { PROBLEM_OF_MONTH_2018 } from "../data/problem-of-month/problem-of-month-2018.js";
import { PROBLEM_OF_MONTH_2017 } from "../data/problem-of-month/problem-of-month-2017.js";
import { PROBLEM_OF_MONTH_2016 } from "../data/problem-of-month/problem-of-month-2016.js";
import { PROBLEM_OF_MONTH_2015 } from "../data/problem-of-month/problem-of-month-2015.js";
import { PROBLEM_OF_MONTH_2014 } from "../data/problem-of-month/problem-of-month-2014.js";
import { PROBLEM_OF_MONTH_2013 } from "../data/problem-of-month/problem-of-month-2013.js";
import { PROBLEM_OF_MONTH_2012 } from "../data/problem-of-month/problem-of-month-2012.js";
import { PROBLEM_OF_MONTH_2011 } from "../data/problem-of-month/problem-of-month-2011.js";
import { PROBLEM_OF_MONTH_2010 } from "../data/problem-of-month/problem-of-month-2010.js";
import { PROBLEM_OF_MONTH_2009 } from "../data/problem-of-month/problem-of-month-2009.js";
import { PROBLEM_OF_MONTH_2008 } from "../data/problem-of-month/problem-of-month-2008.js";
import { PROBLEM_OF_MONTH_2007 } from "../data/problem-of-month/problem-of-month-2007.js";
import { PROBLEM_OF_MONTH_2006 } from "../data/problem-of-month/problem-of-month-2006.js";
import { PROBLEM_OF_MONTH } from "../data/problem-of-month.js"

import { TRANSLATIONS, MONTHS_EN_TO_TR } from "../data/translations.js";

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

const URL = "Problem/"; // Base URL for problem PDFs

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
        <span class="solver-name">${solver.name}</span>
        <span class="solver-aff">${solver.affiliation ? solver.affiliation : ""}</span>
      </li>
    `
  ).join("");

  const solverCount = item.solvers?.length || 0;

  let month = lang === "tr" ? MONTHS_EN_TO_TR[item.month] || item.month : item.month;
  let question = URL + item.question;
  let solution = item.solution ? URL + item.solution : null;

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
      <details class="solvers-details">
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
    if (idx === 0) {
      details.setAttribute("open", "true");
    }

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

  elLatestProblemBtn.onclick = () => window.open(URL + latestItem.question, "_blank");
  elLatestProblemBtn.textContent =
    (TRANSLATIONS.pomLatestProblemLabel[lang] || "Latest Problem") + ` (${month} ${latestItem.year})`;
}


TRANSLATIONS.pomQuestionLabel = {
  en: "Question",
  tr: "Soru"
};

TRANSLATIONS.pomSolutionLabel = {
  en: "Solution",
  tr: "Çözüm"
};

TRANSLATIONS.pomSolversTitle = {
  en: "Solvers",
  tr: "Çözenler"
};

TRANSLATIONS.pomSolversLabel = {
  en: "solvers",
  tr: "çözen"
};

TRANSLATIONS.pomViewLabel = {
  en: "View",
  tr: "Görüntüle"
};

TRANSLATIONS.pomLatestProblemLabel = {
  en: "Problem of the Month",
  tr: "Ayın Sorusu"
};

TRANSLATIONS.pomOpenQuestionAria = {
  en: "Open question PDF",
  tr: "Soru PDF'ini aç"
};

TRANSLATIONS.pomOpenSolutionAria = {
  en: "Open solution PDF",
  tr: "Çözüm PDF'ini aç"
};

TRANSLATIONS.headerTitle = {
  en: "Problem of the Month",
  tr: "Ayın Sorusu"
};

TRANSLATIONS.headerDescription = {
  en: "A monthly problem series. Submit your solution and see the archive of questions and solutions.",
  tr: "Aylık soru serisi. Çözümünüzü gönderin veya arşive göz atın."
};

TRANSLATIONS.howToSubmitTitle = {
  en: "How to Submit",
  tr: "Nasıl Gönderilir?"
};

TRANSLATIONS.howToSubmitDescription = {
  en: "We will announce the following month on this page the names of people who have sent correct solutions. You can send your answers by one of the following ways.",
  tr: "Soruları doğru çözenlerin isimlerini takip eden ay bu sayfada yayınlıyoruz. Çözümlerinizi aşağıdaki yollardan biri ile bize ulaştırabilirsiniz."
};

TRANSLATIONS.mailLabel = {
  en: "Mail:",
  tr: "Posta:"
};

TRANSLATIONS.mailAddressLine1 = {
  en: "Bilkent University,",
  tr: "Bilkent Üniversitesi,"
};

TRANSLATIONS.mailAddressLine2 = {
  en: "Department of Mathematics,",
  tr: "Matematik Bölümü,"
};

TRANSLATIONS.mailAddressLine3 = {
  en: "06800 Bilkent, Ankara, Turkey",
  tr: "06800 Bilkent, Ankara, Türkiye"
};

TRANSLATIONS.emailLabel = {
  en: "Email:",
  tr: "E-posta:"
};

TRANSLATIONS.faxLabel = {
  en: "Fax:",
  tr: "Faks:"
};

TRANSLATIONS.faxAttention = {
  en: "Attention: Azer Kerimov",
  tr: "İlgili: Azer Kerimov"
};

TRANSLATIONS.faxSubject = {
  en: "Subject: Math problem of the month",
  tr: "Konu: Ayın matematik sorusu"
};

TRANSLATIONS.quickLinksTitle = {
  en: "Quick links",
  tr: "Hızlı linkler"
};

TRANSLATIONS.quickLinksDescription = {
  en: "Open the latest question.",
  tr: "Son soruyu açın."
};


document.render = render; // Expose render function to other modules, app.js in particular
document.addEventListener("DOMContentLoaded", render); // Initial render on DOM load 
