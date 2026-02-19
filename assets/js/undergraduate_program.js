 
const { RESEARCH_DATA } = await import(`../data/research.js?v=${document.VERSION}`);

function renderPill(area, lang) {
  const title = area.title?.[lang] || area.title?.en || "";
  const icon = area.icon || "fa-solid fa-circle";

  return `
    <span class="pill">
      <i class="${icon}"></i>
      ${title}
    </span>
  `;
}

function render() {
  const lang = localStorage.getItem("lang") || "en";
  const mount = document.getElementById("mount");
  if (!mount) return;

  mount.innerHTML = `
    <div class="ug-pill-row">
      ${RESEARCH_DATA.map(a => renderPill(a, lang)).join("")}
    </div>
  `;
}

document.render = render; // Expose render function for language toggle
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => { render(); document.app_init();});
} else {
  render();
  document.app_init();
}
