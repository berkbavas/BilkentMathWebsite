import { SEMINARS } from "../data/seminars.js";
import { CURRENT_FACULTY } from "../data/faculty.js";
import { GRADUATE_STUDENTS } from "../data/graduate-students.js";
import { PROBLEM_OF_MONTH } from "../data/problem-of-month.js"
import { MONTHS_EN_TO_TR } from "../data/translations.js";

const URL = "https://math.bilkent.edu.tr/";

function toDateKey(s, t) { // DD.MM.YYYY -> Date
	const [d, m, y] = s.split(".").map(x => x.padStart(2, "0"));
	const [hh, mm] = (t || "00:00").split(":").map(x => x.padStart(2, "0"));
	return new Date(`${y}-${m}-${d}T${hh}:${mm}:00`);
}

function setRandomHeaderImage() {
	if (Math.random() < 0.5) {
		document.getElementById("header").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)), url("assets/img/001.jpg")`;
	} else {
		document.getElementById("header").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.55)), url("assets/img/002.jpg")`;
	}
}

function render() {
	document.getElementById("facultyCount").textContent = CURRENT_FACULTY.length;
	document.getElementById("gradCount").textContent = GRADUATE_STUDENTS.length;

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
	document.getElementById("problemOfMonthTitle").textContent = `${month} ${lastElement.year}`;

	setRandomHeaderImage();

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

document.render = render; // Expose render function to other modules, app.js in particular
document.addEventListener("DOMContentLoaded", render); // Initial render on DOM load
