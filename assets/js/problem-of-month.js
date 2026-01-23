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
import { escapeHtml, safeUrl } from "./helpers.js";

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

const url = "https://math.bilkent.edu.tr/Problem/"; // Base URL for problem PDFs
const elMount = document.getElementById("mount");
const elLatestProblemBtn = document.getElementById("latestProblemBtn");
const elQuickLinks = document.getElementById("quickLinks");

function yearStats(items) {
    const solversTotal = items.reduce((acc, it) => acc + (it.solvers?.length || 0), 0);
    return solversTotal;
}

function renderCard(item, lang) {
    const T = TRANSLATIONS.problemOfMonth;
    const solversList = (item.solvers || []).map(
        (solver) => `
      <li class="solver-item">
        <span class="solver-name">${escapeHtml(solver.name)}</span>
        <span class="solver-aff">${escapeHtml(solver.affiliation ? solver.affiliation : "")}</span>
      </li>
    `
    ).join("");

    const solverCount = item.solvers?.length || 0;

    let month = lang === "tr" ? MONTHS_EN_TO_TR[item.month] || item.month : item.month;
    let question = safeUrl(url + item.question);
    let solution = item.solution ? safeUrl(url + item.solution) : null;

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
            ${solverCount} ${T.pomSolversLabel[lang] || "solvers"}
          </span>
        </div>
      </div>

      <div class="pom-links">
        <a href="${question}" target="_blank" class="chip chip-ghost"}">
            <i class="fa-regular fa-circle-question"></i>
            ${T.pomQuestionLabel[lang] || "Question"}
        </a>

        ${solution ? `
        <a href="${solution}" target="_blank" class="chip chip-ghost"}">
            <i class="fa-regular fa-file-lines"></i>
            ${T.pomSolutionLabel[lang] || "Solution"}
        </a>
        ` : ""}
      </div>
    </div>

    <div class="pom-solvers">
      <details class="solvers-details" open>
        <summary class="solvers-summary">
          <span class="solvers-left">
            <i class="fa-solid fa-list-check"></i>
            ${(T.pomSolversTitle[lang] || "Solvers")}
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
    const T = TRANSLATIONS.problemOfMonth;
    return `
    <summary class="archive-accordion-summary">
      <div class="year-summary">
        <div class="year-left">
          <div class="year-title">${year}</div>
          <div class="year-meta">
            <span class="year-pill">
              <i class="fa-solid fa-users"></i>
              ${solversTotal} ${T.pomSolversLabel[lang] || "solvers"}
            </span>
          </div>
        </div>

        <div class="year-right">
          <span class="hint">${T.pomViewLabel[lang] || "View"}</span>
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
    const T = TRANSLATIONS.problemOfMonth;

    let month = lang === "tr" ? MONTHS_EN_TO_TR[latestItem.month] || latestItem.month : latestItem.month;

    elLatestProblemBtn.onclick = () => window.open(url + latestItem.question, "_blank");
    elLatestProblemBtn.textContent = (T.pomLatestProblemLabel[lang] || "Latest Problem") + ` (${month} ${latestItem.year})`;
}


TRANSLATIONS.problemOfMonth = {
    pomQuestionLabel: {
        en: "Question",
        tr: "Soru"
    },
    pomSolutionLabel: {
        en: "Solution",
        tr: "Çözüm"
    },
    pomSolversTitle: {
        en: "Solvers",
        tr: "Çözenler"
    },
    pomSolversLabel: {
        en: "solvers",
        tr: "çözen"
    },
    pomViewLabel: {
        en: "View",
        tr: "Görüntüle"
    },
    pomLatestProblemLabel: {
        en: "Problem of the Month",
        tr: "Ayın Sorusu"
    },
    pomOpenQuestionAria: {
        en: "Open question PDF",
        tr: "Soru PDF'ini aç"
    },
    pomOpenSolutionAria: {
        en: "Open solution PDF",
        tr: "Çözüm PDF'ini aç"
    },
    headerTitle: {
        en: "Problem of the Month",
        tr: "Ayın Sorusu"
    },
    headerDescription: {
        en: "A monthly problem series. Submit your solution and see the archive of questions and solutions.",
        tr: "Aylık soru serisi. Çözümünüzü gönderin veya arşive göz atın."
    },
    howToSubmitTitle: {
        en: "How to Submit",
        tr: "Nasıl Gönderilir?"
    },
    howToSubmitDescription: {
        en: "We will announce the following month on this page the names of people who have sent correct solutions. You can send your answers by one of the following ways.",
        tr: "Soruları doğru çözenlerin isimlerini takip eden ay bu sayfada yayınlıyoruz. Çözümlerinizi aşağıdaki yollardan biri ile bize ulaştırabilirsiniz."
    },
    mailLabel: {
        en: "Mail:",
        tr: "Posta:"
    },
    mailAddressLine1: {
        en: "Bilkent University,",
        tr: "Bilkent Üniversitesi,"
    },
    mailAddressLine2: {
        en: "Department of Mathematics,",
        tr: "Matematik Bölümü,"
    },
    mailAddressLine3: {
        en: "06800 Bilkent, Ankara, Turkey",
        tr: "06800 Bilkent, Ankara, Türkiye"
    },
    emailLabel: {
        en: "Email:",
        tr: "E-posta:"
    },
    faxLabel: {
        en: "Fax:",
        tr: "Faks:"
    },
    faxAttention: {
        en: "Attention: Azer Kerimov",
        tr: "İlgili: Azer Kerimov"
    },
    faxSubject: {
        en: "Subject: Math problem of the month",
        tr: "Konu: Ayın matematik sorusu"
    },
    quickLinksTitle: {
        en: "Quick links",
        tr: "Hızlı linkler"
    },
    quickLinksDescription: {
        en: "Open the latest question.",
        tr: "Son soruyu açın."
    }
};


document.render = render; // Expose render function to other modules, app.js in particular
document.addEventListener("DOMContentLoaded", render); // Initial render on DOM load 
