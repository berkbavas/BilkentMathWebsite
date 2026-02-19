
const seminarsModule =
  await import(`../data/seminars.js?v=${document.VERSION}`);

const facultyModule =
  await import(`../data/faculty.js?v=${document.VERSION}`);

const graduateStudentsModule =
  await import(`../data/graduate-students.js?v=${document.VERSION}`);

const problemModule =
  await import(`../data/problem-of-the-month.js?v=${document.VERSION}`);

import { MONTHS_EN_TO_TR } from "../data/translations.js";

const newsModule =
  await import(`../data/news.js?v=${document.VERSION}`);


const SEMINARS = seminarsModule.SEMINARS;
const CURRENT_FACULTY = facultyModule.CURRENT_FACULTY;
const GRADUATE_STUDENTS = graduateStudentsModule.GRADUATE_STUDENTS;
const PROBLEM_OF_MONTH = problemModule.PROBLEM_OF_MONTH;

const NEWS = newsModule.NEWS;

const URL = "https://math.bilkent.edu.tr/";

function toDateKey(s, t) { // DD.MM.YYYY -> Date
	const [d, m, y] = s.split(".").map(x => x.padStart(2, "0"));
	const [hh, mm] = (t || "00:00").split(":").map(x => x.padStart(2, "0"));
	return new Date(`${y}-${m}-${d}T${hh}:${mm}:00`);
}

// Animated counter function
function animateCounter(element, target, duration = 1500) {
	const start = 0;
	const startTime = performance.now();
	
	function easeOutQuart(t) {
		return 1 - Math.pow(1 - t, 4);
	}
	
	function update(currentTime) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const easedProgress = easeOutQuart(progress);
		const current = Math.floor(start + (target - start) * easedProgress);
		
		element.textContent = current;
		
		if (progress < 1) {
			requestAnimationFrame(update);
		} else {
			element.textContent = target;
		}
	}
	
	requestAnimationFrame(update);
}

// Intersection Observer for triggering animations when visible
function setupCounterAnimations() {
	const counters = [
		{ id: "facultyCount", value: CURRENT_FACULTY.length },
		{ id: "gradCount", value: GRADUATE_STUDENTS.length }
	];
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const counterData = counters.find(c => c.id === entry.target.id);
				if (counterData && !entry.target.dataset.animated) {
					entry.target.dataset.animated = "true";
					animateCounter(entry.target, counterData.value);
				}
			}
		});
	}, { threshold: 0.5 });
	
	counters.forEach(counter => {
		const el = document.getElementById(counter.id);
		if (el) {
			el.textContent = "0";
			observer.observe(el);
		}
	});
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
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}