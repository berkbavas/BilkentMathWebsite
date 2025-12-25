/* Research page (JSON-driven)
   - Desktop: Tabs
   - Mobile: Accordion
   - Faculty: chips/badges
*/

const RESEARCH_DATA = [
    {
        id: "algebra",
        title: "Algebra & Arithmetic",
        icon: "fa-solid fa-sitemap",
        accent: "#7C3AED",
        description:
            "Commutative algebra, invariant theory, algebraic geometry, geometric group theory. Analytic number theory. Algebraic topology. Finite group theory, fusion systems. Representation theory, Clifford theory, G-algebras. Algebraic combinatorics, graph theory, G-posets. Ring theory. Formal concept analysis.",
        faculty: [
            { name: "Laurence J. Barker", url: "https://math.bilkent.edu.tr/barker.html" },
            { name: "Ahmet Güloğlu", url: "https://math.bilkent.edu.tr/guloglu.html" },
            { name: "Tomos Parry", url: "https://math.bilkent.edu.tr/parry.html" },
            { name: "Müfit Sezer", url: "https://math.bilkent.edu.tr/sezer.html" },
            { name: "Özgün Ünlü", url: "https://math.bilkent.edu.tr/unlu.html" },
            { name: "Hamza Yeşilyurt", url: "https://math.bilkent.edu.tr/yesilyurt.html" },
            { name: "Deniz Yılmaz", url: "https://web4.bilkent.edu.tr/deniz/" }
        ]
    },
    {
        id: "analysis",
        title: "Analysis",
        icon: "fa-solid fa-wave-square",
        accent: "#2563EB",
        description:
            "Functional analysis, operator theory, operator algebras, matrix and numerical analysis, quantum operations. Potential theory, orthogonal polynomials, approximation theory. Complex analysis and operator theory in spaces of holomorphic and harmonic functions of several variables. Theory of entire functions, Polya frequency sequences. Analysis on Wiener space, Malliavin calculus and applications, Monge–Kantorovich measure transportation and Monge–Ampère equation on Wiener space. Differential operators and differential equations. Dynamical systems, PDEs, delay differential equations.",
        faculty: [
            { name: "Fatihcan Atay", url: "https://math.bilkent.edu.tr/atay.html" },
            { name: "Alexander Goncharov", url: "https://math.bilkent.edu.tr/goncharov.html" },
            { name: "H. Turgay Kaptanoğlu", url: "https://math.bilkent.edu.tr/kaptanoglu.html" },
            { name: "Konstantinos Maronikolakis", url: "https://conmaro.github.io/" },
            { name: "Türker Özsarı", url: "http://www.turkerozsari.com/" },
            { name: "Gökhan Yıldırım", url: "https://math.bilkent.edu.tr/yildirim.html" },
            { name: "Natalya Zheltukhina", url: "https://math.bilkent.edu.tr/zheltukhina.html" }
        ]
    },
    {
        id: "geometry",
        title: "Geometry & Topology",
        icon: "fa-solid fa-draw-polygon",
        accent: "#059669",
        description:
            "Algebraic geometry; geometry and arithmetic of K3-surfaces. Topology of real and complex algebraic varieties. Algebraic and geometric topology; classical knot theory. Geometric group theory, finite group actions on topological spaces, geometric structures associated to groups. Differential geometry, Riemannian and pseudo-Riemannian geometry, Lorentzian geometry, global analysis on manifolds, general relativity and quantum field theories.",
        faculty: [
            { name: "Cihan Bahran", url: "https://www.cihanbahran.org/" },
            { name: "Kadri İlker Berktav", url: "https://sites.google.com/view/kadriilkerberktav/home" },
            { name: "Alexander Degtyarev", url: "https://math.bilkent.edu.tr/degtyarev.html" },
            { name: "Cihan Okay", url: "http://cihan.okay.bilkent.edu.tr/" },
            { name: "Ali Sinan Sertöz", url: "https://math.bilkent.edu.tr/sertoz.html" },
            { name: "Bülent Ünal", url: "https://math.bilkent.edu.tr/unal.html" },
            { name: "Özgün Ünlü", url: "https://math.bilkent.edu.tr/unlu.html" },
            { name: "Ergün Yalçın", url: "https://math.bilkent.edu.tr/yalcin.html" }
        ]
    },
    {
        id: "applied",
        title: "Applied Mathematics",
        icon: "fa-solid fa-atom",
        accent: "#EA580C",
        description:
            "General relativity, mathematical physics; integrability of nonlinear PDEs, higher-dimensional classical field theories, strings and classical theory of gravitation. Mathematical theory of statistical physics, probability theory, financial mathematics, data science. Dynamical systems. Complex systems and network analysis. Systems and control theory. Mathematical biology and neuroscience.",
        faculty: [
            { name: "Fatihcan Atay", url: "https://math.bilkent.edu.tr/atay.html" },
            { name: "Metin Gürses", url: "https://math.bilkent.edu.tr/gurses.html" },
            { name: "Yaghoub Heydarzade", url: "https://math.bilkent.edu.tr/heydarzade.html" },
            { name: "Azer Kerimov", url: "https://math.bilkent.edu.tr/kerimov.html" },
            { name: "Naci Saldı", url: "https://web4.bilkent.edu.tr/saldi/" },
            { name: "Gökhan Yıldırım", url: "https://math.bilkent.edu.tr/yildirim.html" }
        ]
    }
];

function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function renderFacultyChips(faculty, accent) {
    const chips = faculty.map(f => {
        const name = escapeHtml(f.name);
        const url = escapeHtml(f.url);
        return `
      <a class="chip-link" href="${url}" target="_blank" rel="noreferrer"
         style="--accent:${accent}">
        <i class="fa-regular fa-user"></i>
        <span>${name}</span>
      </a>`;
    }).join("");

    return `<div class="faculty-chips">${chips}</div>`;
}


function renderAccordionItem(area, open) {
    const accent = area.accent;
    return `
    <details class="acc-item" ${open ? "open" : ""} style="--accent:${accent}">
      <summary class="acc-summary">
        <div class="acc-left">
          <span class="area-icon" aria-hidden="true"><i class="${area.icon}"></i></span>
          <div class="acc-title">
            <span class="swatch" aria-hidden="true"></span>
            <span>${escapeHtml(area.title)}</span>
          </div>
        </div>
        <div class="acc-chevron" aria-hidden="true"><i class="fa-solid fa-chevron-down"></i></div>
      </summary>
      <div class="acc-body">
        <p>${escapeHtml(area.description)}</p>
        <p><strong>Participating faculty:</strong></p>
        ${renderFacultyChips(area.faculty, accent)}
      </div>
    </details>
  `;
}


function initAccordion(areas) {
    const acc = document.querySelector(".research-accordion");
    acc.innerHTML = areas.map((a, idx) => renderAccordionItem(a, false)).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    initAccordion(RESEARCH_DATA);
});
