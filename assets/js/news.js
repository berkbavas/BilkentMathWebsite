 

const newsModule =
  await import(`../data/news.js?v=${document.VERSION}`);

const helpersModule =
  await import(`./helpers.js?v=${document.VERSION}`);

const NEWS = newsModule.NEWS;
const { escapeHtml } = helpersModule;

let elMount = document.getElementById("news-timeline");

function renderYear(year, items) {
    const elYearSection = document.createElement("section");
    elYearSection.classList.add("news-year-section");

    const elYearHeader = document.createElement("h2");
    elYearHeader.classList.add("news-year-chip");
    elYearHeader.textContent = year;
    elYearSection.appendChild(elYearHeader);

    items.forEach((item) => {
        const content = item.content;
        const date = escapeHtml(item.date);

        const elItem = document.createElement("article");
        elItem.classList.add("news-item");

        const elDot = document.createElement("div");
        elDot.classList.add("news-dot");
        elDot.setAttribute("aria-hidden", "true");

        const elCard = document.createElement("div");
        elCard.classList.add("news-card");

        const elDate = document.createElement("time");
        elDate.classList.add("news-date");
        elDate.textContent = date;

        const elContent = document.createElement("div");
        elContent.classList.add("news-content");
        elContent.innerHTML = content;
        elCard.appendChild(elDate);
        elCard.appendChild(elContent);

        elItem.appendChild(elDot);
        elItem.appendChild(elCard);

        elYearSection.appendChild(elItem);
    });

    return elYearSection;
}

function render() {
    elMount.innerHTML = "";
    const lang = localStorage.getItem("lang") || "en";

    // Group news items by year
    const groupedByYear = NEWS.reduce((acc, item) => {
        if (!acc[item.year]) {
            acc[item.year] = [];
        }

        // Transform the item to have the right language properties
        const transformedItem = {
            date: item.date[lang],
            content: item.content[lang]
        };

        acc[item.year].push(transformedItem);
        return acc;
    }, {});

    // Sort years in descending order (newest first)
    const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

    // Render each year section
    sortedYears.forEach(year => {
        const yearSection = renderYear(year, groupedByYear[year]);
        elMount.appendChild(yearSection);
    });
}

document.render = render; // Expose render function for language toggle
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => { render(); document.app_init();});
} else {
  render();
  document.app_init();
}
