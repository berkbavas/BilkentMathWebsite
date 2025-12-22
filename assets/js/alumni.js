(() => {
    const url = "assets/data/alumni.json";
    const root = document.getElementById("alumniRoot");

    const esc = (s) =>
        String(s ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    function renderEntry(a) {
        const bullets = Array.isArray(a.bullets) ? a.bullets : [];
        const links = Array.isArray(a.links) ? a.links : [];

        const imgHtml = a.photo
            ? `<img src="https://math.bilkent.edu.tr${esc(a.photo)}" alt="${esc(a.name)}" loading="lazy">`
            : "";

        const bulletHtml = bullets.length
            ? `<ul>${bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>`
            : "";

        const storyHtml = a.storyHtml
            ? `<details><summary><i class="fa-solid fa-caret-right"></i>Story</summary><blockquote>${a.storyHtml}</blockquote></details>`
            : "";

        const lastUpdateHtml = a.lastUpdate
            ? `<div class="alumni-update">Son güncelleme: ${esc(a.lastUpdate)}</div>`
            : "";

        const linksHtml = links.length
            ? `<div class="alumni-links">
          ${links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label || "Link")}</a>`).join(" · ")}
        </div>`
            : "";

        return `
      <article class="alumni-entry">
        <h3>${esc(a.name || "")}, <strong>${esc(a.year || "")}</strong></h3>
        <div class="alumni-info">
            <div class="alumni-image">
                ${imgHtml}
                ${bulletHtml}
            </div>
        ${storyHtml}
        ${linksHtml}
        ${lastUpdateHtml}
        </div>
      </article>
    `;
    }

    async function init() {
        try {
            const res = await fetch(url, { cache: "no-store" });
            if (!res.ok) throw new Error(`Failed to load alumni.json (${res.status})`);
            const json = await res.json();
            const items = Array.isArray(json.items) ? json.items : [];

            root.innerHTML = items.map(renderEntry).join("");

        } catch (e) {
            root.innerHTML = `<p class="alumni-error">Error: ${esc(e.message)}</p>`;
        }
    }

    init();
})();
