const { SEMINARS } = await import(`../data/seminars.js?v=${document.version}`);
const { CURRENT_FACULTY } = await import(`../data/faculty.js?v=${document.version}`);
const { GRADUATE_STUDENTS } = await import(`../data/graduate-students.js?v=${document.version}`);
const { PROBLEM_OF_MONTH } = await import(`../data/problem-of-the-month.js?v=${document.version}`);
const { NEWS } = await import(`../data/news.js?v=${document.version}`);
const { MONTHS_EN_TO_TR } = await import(`../data/translations.js?v=${document.version}`);

const URL = "https://math.bilkent.edu.tr/";

function toDateKey(s, t) { // DD.MM.YYYY -> Date
	const [d, m, y] = s.split(".").map(x => x.padStart(2, "0"));
	const [hh, mm] = (t || "00:00").split(":").map(x => x.padStart(2, "0"));
	return new Date(`${y}-${m}-${d}T${hh}:${mm}:00`);
}

function updateCounter(id, value) {
	const el = document.getElementById(id);
	if (el) {
		el.textContent = value;
	}
}

function render() {

	const now = new Date();

	const upcoming = SEMINARS
		.filter(s => toDateKey(s.date, s.time) >= now)
		.sort((a, b) => toDateKey(a.date, a.time) - toDateKey(b.date, b.time))
		.slice(0, 3);

	const past = SEMINARS
		.filter(s => toDateKey(s.date, s.time) < now)
		.sort((a, b) => toDateKey(b.date, b.time) - toDateKey(a.date, a.time))
		.slice(0, 3);

	renderSeminars("upcomingSeminars", upcoming);
	renderSeminars("pastSeminars", past);

	document.getElementById("upcomingSeminarsTitle").hidden = upcoming.length === 0;

	if (upcoming.length > 0) {
		document.getElementById("nextSeminarDate").textContent = `${upcoming[0].date} · ${upcoming[0].time} · ${upcoming[0].place}`;
		document.getElementById("nextSeminarTitle").innerHTML = `<a href="${URL + upcoming[0].link}" target="_blank" rel="noopener noreferrer">${upcoming[0].title}</a>`;
		document.getElementById("nextSeminarSpeaker").textContent = upcoming[0].speaker;
	}

	const lang = localStorage.getItem("lang") || "en";
	const lastElement = PROBLEM_OF_MONTH[PROBLEM_OF_MONTH.length - 1];
	let month = lang === "tr" ? MONTHS_EN_TO_TR[lastElement.month] || lastElement.month : lastElement.month;
	document.getElementById("problemOfTheMonthTitle").textContent = `${month} ${lastElement.year}`;

	renderHomeNews();

	updateCounter("facultyCount", CURRENT_FACULTY.length);
	updateCounter("gradCount", GRADUATE_STUDENTS.length);
}

function renderSeminars(containerId, list) {
	const el = document.getElementById(containerId);
	el.innerHTML = list.map(s => `
    <div class="seminar-card">
      <strong><a href="${URL + s.link}" target="_blank" rel="noopener noreferrer">${s.title}</a></strong><br>
      <span>${s.speaker}</span>
      <small>${s.date} · ${s.time} · ${s.place}</small>
    </div>
  `).join("");
}

function renderHomeNews() {
	const el = document.getElementById("homeNewsList");
	if (!el) return;

	const lang = localStorage.getItem("lang") || "en";
	const items = (NEWS || []).slice(0, 3);

	el.innerHTML = items.map(n => `
    <div class="home-news-item">
      <div class="home-news-date">${(n.date && (n.date[lang] || n.date.en)) || ""}</div>
      <div class="home-news-content">${(n.content && (n.content[lang] || n.content.en)) || ""}</div>
    </div>
  `).join("");
}

document.render = render; // Expose render function for language toggle
render(); // Initial render