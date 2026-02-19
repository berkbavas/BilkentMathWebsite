const { PROJECT_COURSES } = await import(`../data/project-courses.js?v=${document.version}`);
const { escapeHtml, safeUrl } = await import(`./helpers.js?v=${document.version}`);

function render() {
    let elMount = document.getElementById('archiveMount');
    elMount.innerHTML = '';

    PROJECT_COURSES && Object.keys(PROJECT_COURSES).sort((a, b) => b - a).forEach(year => {
        let courses = PROJECT_COURSES[year];
        let yearSection = document.createElement('section');
        yearSection.className = 'card';
        let yearHeader = document.createElement('h2');
        yearHeader.className = 'card-title';
        yearHeader.textContent = year;
        yearSection.appendChild(yearHeader);
        courses.forEach(course => {
            const url = safeUrl(course.url);
            const title = escapeHtml(course.title);

            let courseDiv = document.createElement('div');
            courseDiv.className = 'archive-item';
            let fontAwesomeIcon = document.createElement('i');
            fontAwesomeIcon.className = 'fa-solid fa-square-arrow-up-right';
            let courseLink = document.createElement('a');
            courseLink.href = url;
            courseLink.target = '_blank';
            courseLink.rel = 'noopener noreferrer';
            courseLink.textContent = title;
            courseLink.appendChild(fontAwesomeIcon);
            courseDiv.appendChild(courseLink);
            yearSection.appendChild(courseDiv);
        });
        elMount.appendChild(yearSection);
    });
}


document.render = render; // Expose render function for language toggle
render();
