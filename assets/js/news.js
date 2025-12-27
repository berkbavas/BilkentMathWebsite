import { NEWS_EN, NEWS_TR } from "../data/news.js";
import {TRANSLATIONS} from "../data/translations.js";

let elMount = document.getElementById("news-timeline");

function renderYear(year, items) {
    const elYearSection = document.createElement("section");
    elYearSection.classList.add("news-year-section");

    const elYearHeader = document.createElement("h2");
    elYearHeader.classList.add("news-year-chip");
    elYearHeader.textContent = year;
    elYearSection.appendChild(elYearHeader);

    items.forEach((item) => {
        const elItem = document.createElement("article");
        elItem.classList.add("news-item");

        const elDot = document.createElement("div");
        elDot.classList.add("news-dot");
        elDot.setAttribute("aria-hidden", "true");

        const elCard = document.createElement("div");
        elCard.classList.add("news-card");

        const elDate = document.createElement("time");
        elDate.classList.add("news-date");
        elDate.textContent = item.date;

        const elContent = document.createElement("div");
        elContent.classList.add("news-content");
        elContent.innerHTML = item.content;

        elCard.appendChild(elDate);
        elCard.appendChild(elContent);

        elItem.appendChild(elDot);
        elItem.appendChild(elCard);

        elYearSection.appendChild(elItem);
    });

    return elYearSection;
}

function render() {
    let lang = localStorage.getItem("lang") || "en";
    let newsData = lang === "tr" ? NEWS_TR : NEWS_EN;

    elMount.innerHTML = "";

    let years = Object.keys(newsData).sort((a, b) => b - a);
    years.forEach((year) => {
        elMount.appendChild(renderYear(year, newsData[year]));
    });
}

document.render = render;
document.addEventListener("DOMContentLoaded", render);
