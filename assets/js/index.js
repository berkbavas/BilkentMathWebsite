import { CURRENT_FACULTY_EN, CURRENT_FACULTY_TR } from "../data/faculty.js";
import { RESEARCH_DATA } from "../data/research.js";
import { SEMINARS } from "../data/seminars.js";
import { NEWS_EN, NEWS_TR } from "../data/news.js";

/* ==========================================================
   Home page renderer
   ========================================================== */

document.addEventListener("DOMContentLoaded", renderHome);

function getLang() {
  return localStorage.getItem("lang") || "en";
}

function parseTRDate(ddmmyyyy) {
  // "25.12.2025" -> Date (local)
  const [dd, mm, yyyy] = (ddmmyyyy || "").split(".").map(Number);
  if (!dd || !mm || !yyyy) return null;
  return new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
}

function formatSeminarDate(ddmmyyyy, lang) {
  const d = parseTRDate(ddmmyyyy);
  if (!d) return ddmmyyyy || "";
  const fmt = new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return fmt.format(d);
}

function flattenNews(newsObj) {
  const years = Object.keys(newsObj || {})
    .map((y) => Number(y))
    .filter(Boolean)
    .sort((a, b) => b - a);

  const flat = [];
  years.forEach((year) => {
    (newsObj[year] || []).forEach((item, idx) => {
      flat.push({ year, idx, ...item });
    });
  });
  return flat;
}

function renderHome() {
  const mount = document.getElementById("content");
  if (!mount) return;

  const lang = getLang();
  const faculty = lang === "tr" ? CURRENT_FACULTY_TR : CURRENT_FACULTY_EN;
  const news = lang === "tr" ? NEWS_TR : NEWS_EN;

  // KPIs
  const facultyCount = Array.isArray(faculty) ? faculty.length : 0;
  const researchCount = Array.isArray(RESEARCH_DATA) ? RESEARCH_DATA.length : 0;

  // Upcoming seminars (today+)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = (SEMINARS || [])
    .map((s) => ({ ...s, _date: parseTRDate(s.date) }))
    .filter((s) => s._date && s._date >= today)
    .sort((a, b) => a._date - b._date);

  const upcomingTop = upcoming.slice(0, 4);

  // Latest news items
  const latestNews = flattenNews(news).slice(0, 5);

  // Research highlights
  const highlights = (RESEARCH_DATA || []).slice(0, 6);

  mount.innerHTML = `
    <section class="home-hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-copy">
            <h1 data-i18n="homeHeroH1">Department of Mathematics</h1>
            <p class="hero-lead" data-i18n="homeHeroLead">
              Research and education at Bilkent University: undergraduate and graduate programs, seminars, and community.
            </p>

            <div class="about-actions">
              <a class="btn primary" href="research.html">
                <span data-i18n="homeCtaExploreResearch">Explore research</span>
                <i class="fa-solid fa-arrow-right"></i>
              </a>
              <a class="btn" href="seminars.html">
                <span data-i18n="homeCtaViewSeminars">See seminars</span>
              </a>
            </div>

            <div class="hero-kpis" aria-label="Key figures">
              <div class="kpi">
                <strong>${facultyCount}</strong>
                <span data-i18n="homeKpiFaculty">Faculty</span>
              </div>
              <div class="kpi">
                <strong>${researchCount}</strong>
                <span data-i18n="homeKpiResearchAreas">Research areas</span>
              </div>
              <div class="kpi">
                <strong>${upcoming.length}</strong>
                <span data-i18n="homeKpiUpcoming">Upcoming</span>
              </div>
            </div>
          </div>

          <aside class="hero-card" aria-label="Quick links">
            <div class="section-head">
              <h2 data-i18n="homeQuickTitle">Quick links</h2>
              <p class="muted"> </p>
            </div>

            <div class="quick-grid">
              ${quickLink("faculty.html", "fa-solid fa-user-group", lang === "tr" ? "Öğretim Üyeleri" : "Faculty")}
              ${quickLink("graduate-students.html", "fa-solid fa-user-graduate", lang === "tr" ? "Lisansüstü" : "Graduate Students")}
              ${quickLink("undergraduate-program.html", "fa-solid fa-book", lang === "tr" ? "Lisans" : "Undergraduate")}
              ${quickLink("graduate-program.html", "fa-solid fa-graduation-cap", lang === "tr" ? "Lisansüstü Program" : "Graduate Program")}
              ${quickLink("news.html", "fa-regular fa-newspaper", lang === "tr" ? "Haberler" : "News")}
              ${quickLink("problem-of-month.html", "fa-solid fa-trophy", lang === "tr" ? "Ayın Problemi" : "Problem of the Month")}
              ${quickLink("history.html", "fa-solid fa-timeline", lang === "tr" ? "Tarihçe" : "History")}
              ${quickLink("links.html", "fa-solid fa-link", lang === "tr" ? "Bağlantılar" : "Links")}
            </div>

            <div class="contact-card">
              <h3>${lang === "tr" ? "İletişim" : "Contact"}</h3>
              <p class="muted">
                ${lang === "tr" ? "Bilkent Üniversitesi, Matematik Bölümü" : "Bilkent University, Department of Mathematics"}<br>
                ${lang === "tr" ? "06800 Ankara, Türkiye" : "06800 Ankara, Türkiye"}
              </p>
              <div class="about-actions">
                <a class="btn small" href="about.html">
                  ${lang === "tr" ? "Bölüm hakkında" : "About the department"}
                </a>
                <a class="btn small" href="https://math.bilkent.edu.tr/" target="_blank" rel="noreferrer">
                  ${lang === "tr" ? "Eski site" : "Legacy site"}
                  <i class="fa-solid fa-up-right-from-square"></i>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 data-i18n="homeSectionSeminars">Upcoming seminars</h2>
            <p class="muted">${lang === "tr" ? "En yakın seminerler ve duyurular." : "The next talks and announcements."}</p>
          </div>
          <a class="link" href="seminars.html">
            <span data-i18n="homeViewAll">View all</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div class="list">
          ${renderSeminarList(upcomingTop, lang)}
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 data-i18n="homeSectionNews">Latest news</h2>
            <p class="muted">${lang === "tr" ? "Etkinlikler, ziyaretler ve bölüm duyuruları." : "Events, visits, and department announcements."}</p>
          </div>
          <a class="link" href="news.html">
            <span data-i18n="homeViewAll">View all</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div class="list">
          ${renderNewsList(latestNews)}
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2 data-i18n="homeSectionResearch">Research highlights</h2>
            <p class="muted">${lang === "tr" ? "Araştırma alanlarından bazıları." : "A selection of research areas."}</p>
          </div>
          <a class="link" href="research.html">
            <span data-i18n="homeViewAll">View all</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>

        <div class="areas-grid">
          ${highlights.map((a) => renderAreaCard(a, lang)).join("")}
        </div>
      </div>
    </section>
  `;
}

function quickLink(href, icon, title) {
  return `
    <a class="quick-card" href="${href}">
      <div class="quick-ic"><i class="${icon}"></i></div>
      <div class="quick-meta">
        <div class="quick-title">${title}</div>
      </div>
    </a>
  `;
}

function renderSeminarList(items, lang) {
  if (!items || items.length === 0) {
    return `
      <div class="list-item">
        <div class="list-title">${lang === "tr" ? "Yaklaşan seminer bulunamadı." : "No upcoming seminars found."}</div>
        <div class="list-sub muted">${lang === "tr" ? "Arşiv için Seminerler sayfasına bakabilirsiniz." : "You can browse the archive on the Seminars page."}</div>
      </div>
    `;
  }

  return items
    .map((s) => {
      const dateText = formatSeminarDate(s.date, lang);
      const title = escapeHTML(s.title || "");
      const speaker = escapeHTML(s.speaker || "");
      const place = escapeHTML(s.place || "");
      const time = escapeHTML(s.time || "");
      const link = s.link ? s.link : "seminars.html";

      return `
        <a class="list-item" href="${link}" ${s.link ? `target="_blank" rel="noreferrer"` : ""}>
          <div class="tag">
            <i class="fa-regular fa-calendar"></i>
            <span>${dateText}</span>
            <span class="dot">•</span>
            <span>${time}</span>
            ${place ? `<span class="dot">•</span><span>${place}</span>` : ""}
          </div>
          <div class="list-title">${speaker}</div>
          <div class="list-sub">${title}</div>
        </a>
      `;
    })
    .join("");
}

function renderNewsList(items) {
  if (!items || items.length === 0) return "";

  return items
    .map((n) => {
      const year = n.year;
      const date = escapeHTML(n.date || "");
      const content = n.content || "";
      return `
        <div class="list-item">
          <div class="tag">
            <i class="fa-regular fa-newspaper"></i>
            <span>${year}</span>
            ${date ? `<span class="dot">•</span><span>${date}</span>` : ""}
          </div>
          <div class="list-sub">${content}</div>
        </div>
      `;
    })
    .join("");
}

function renderAreaCard(area, lang) {
  const title = area?.title?.[lang] || area?.title?.en || "";
  const desc = area?.description?.[lang] || area?.description?.en || "";
  const icon = area?.icon || "fa-solid fa-circle";
  const accent = area?.accent || "#3B82F6";
  const id = area?.id ? `#${area.id}` : "";

  return `
    <a class="area-card" href="research.html${id}" style="--accent:${accent}">
      <div class="area-ic"><i class="${icon}"></i></div>
      <div class="area-meta">
        <div class="area-title">${escapeHTML(title)}</div>
        <div class="area-desc">${escapeHTML(desc)}</div>
      </div>
      <i class="fa-solid fa-arrow-right area-arrow"></i>
    </a>
  `;
}

function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
