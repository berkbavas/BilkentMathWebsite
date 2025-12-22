
const FACULTY = [
  // ===== Current Faculty =====
  {
    name: "İnci Pekgüleç Apaydın",
    rank: "Instructor",
    degree: "M.S., Operational Research, Middle East Technical University, 1989",
    research: ["Classical and Exploratory Statistics", "Forecasting", "Statistical Decision Making"],
    office: "SA-144",
    phone: "+90 (312) 290-2131",
    email: "incia [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/apaydin.jpg",
    url: "",
    emeritus: false
  },
  {
    name: "Fatihcan Atay",
    rank: "Professor",
    degree: "Ph.D., Applied Mathematics, Brown University, 1994",
    research: ["Dynamical systems", "delay differential equations", "complex systems and networks", "applied mathematics"],
    office: "SA-132",
    phone: "+90 (312) 290-1265",
    email: "f.atay [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/atay-2.jpg",
    url: "https://fatihcanatay.wordpress.com/",
    emeritus: false
  },
  {
    name: "Cihan Bahran",
    rank: "Assistant Professor",
    degree: "Ph.D., Mathematics, University of Minnesota, 2019",
    research: ["Functorial Representation Theory with applications to Topology"],
    office: "SA-138",
    phone: "+90 (312) 290-2466",
    email: "cihan.bahran[-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/bahran.jpg",
    url: "https://www.cihanbahran.org/",
    emeritus: false
  },
  {
    name: "Laurence Barker",
    rank: "Associate Professor",
    degree: "Ph.D., Mathematics, Oxford University, 1992",
    research: ["Finite groups", "representation theory", "local and Clifford theory", "G-algebras", "G-posets"],
    office: "SA-129",
    phone: "+90 (312) 290-2120",
    email: "barker [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/barker-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Alexander Degtyarev",
    rank: "Professor",
    degree: "Ph.D., Mathematics, Steklov Mathematical Institute, 1988",
    research: ["Topology", "algebraic geometry"],
    office: "SA-130",
    phone: "+90 (312) 290-2135",
    email: "degt [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/degtyarev-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Alexander Goncharov",
    rank: "Associate Professor",
    degree: "Ph.D., Mathematics, Rostov State University, 1986",
    research: ["Functional analysis", "operator theory", "mathematical physics", "numerical analysis"],
    office: "SA-122",
    phone: "+90 (312) 290-1923",
    email: "goncha [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/goncharov-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Ahmet Güloğlu",
    rank: "Associate Professor",
    degree: "Ph.D., Mathematics, Ohio State University, 2005",
    research: ["Analytic number theory"],
    office: "SA-131",
    phone: "+90 (312) 290-2747",
    email: "guloglua [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/guloglu-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Yaghoub Heydarzade",
    rank: "Assistant Professor",
    degree: "Ph.D., Physics, Azarbaijan Shahid Madani University, 2018",
    research: ["Theoretical physics", "gravitation and cosmology"],
    office: "SA-137",
    phone: "+90 (312) 290-1590",
    email: "yheydarzade [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/heydarzade-2.jpg",
    url: "https://www.yaghoubheydarzade.com/",
    emeritus: false
  },
  {
    name: "H. Turgay Kaptanoğlu",
    rank: "Professor",
    degree: "Ph.D., Mathematics, University of Wisconsin-Madison, 1991",
    research: ["Complex analysis and operator theory in spaces of holomorphic and harmonic functions of several variables"],
    office: "SA-124",
    phone: "+90 (312) 290-2101",
    email: "kaptan [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/kaptanoglu-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Enis Kaya",
    rank: "Assistant Professor",
    degree: "Ph. D., University of Groningen",
    research: ["Arithmetic geometry", "algebraic geometry", "tropical geometry"],
    office: "SA-105",
    phone: "+90 (312) 290 2132",
    email: "enis.kaya [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/kaya.jpg",
    url: "https://sites.google.com/",
    emeritus: false
  },
  {
    name: "Azer Kerimov",
    rank: "Professor",
    degree: "Ph.D., Mathematics, Landau Institute of Theoretical Physics and Academy of Sciences of Azerbaijan, 1988",
    research: ["Mathematical theory of statistical physics", "probability", "mathematical analysis"],
    office: "SA-120",
    phone: "+90 (312) 290-1627",
    email: "kerimov [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/kerimov-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Yasir Kızmaz",
    rank: "Assistant Professor",
    degree: "Ph.D., Mathematics, Middle East Technical University, 2018",
    research: ["Finite group theory"],
    office: "SA-143",
    phone: "+90 (312) 290-2130",
    email: "yasirkizmaz [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/kizmaz.jpg",
    url: "https://myasir-kizmaz.wixsite.com/",
    emeritus: false
  },
  {
    name: "Konstantinos Maronikolakis",
    rank: "Visiting Assistant Professor",
    degree: "Ph.D., Mathematics, University College Dublin, 2024",
    research: ["Complex analysis", "potential theory", "functional analysis"],
    office: "SA-109",
    phone: "+90 (312) 290-2102",
    email: "konstantinos [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/maronikolakis.png",
    url: "https://conmaro.github.io/",
    emeritus: false
  },
  {
    name: "Cihan Okay",
    rank: "Assistant Professor",
    degree: "Ph.D., Mathematics, University of British Columbia, 2014",
    research: ["Algebraic topology", "quantum information theory"],
    office: "SA-140",
    phone: "+90 (312) 290-2103",
    email: "cihan.okay [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/okay.jpg",
    url: "https://cihan.okay.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Türker Özsarı",
    rank: "Associate Professor, Department Head",
    degree: "Ph.D., Mathematics, University of Virginia, 2010",
    research: ["Analysis of partial differential equations and control theory"],
    office: "SA-111A",
    phone: "+90 (312) 290 2899",
    email: "turker.ozsari [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/ozsari.jpg",
    url: "https://www.turkerozsari.com/",
    emeritus: false
  },
  {
    name: "Naci Saldı",
    rank: "Associate Professor",
    degree: "Ph.D., Applied Mathematics, Queen's University, 2015",
    research: ["Stochastic control theory", "game theory", "machine learning", "information theory", "probability theory and its applications"],
    office: "SA-139",
    phone: "+90 (312) 290-1938",
    email: "naci.saldi [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/saldi.jpg",
    url: "https://web4.bilkent.edu.tr/saldi/",
    emeritus: false
  },
  {
    name: "Ali Sinan Sertöz",
    rank: "Professor",
    degree: "Ph.D., Mathematics, University of British Columbia, 1984",
    research: ["Algebraic geometry"],
    office: "SA-121",
    phone: "+90 (312) 290-1490",
    email: "sertoz [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/sertoz-2.jpg",
    url: "https://sertoz.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Müfit Sezer",
    rank: "Professor",
    degree: "Ph.D., Mathematics, Purdue University, 2003",
    research: ["Commutative algebra", "invariant theory"],
    office: "SA-117",
    phone: "+90 (312) 290-1255",
    email: "sezer [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/sezer-2.jpg",
    url: "https://orcid.org/",
    emeritus: false
  },
  {
    name: "Syed Waqar Ali Shah",
    rank: "Assistant Professor",
    degree: "Ph.D., Harvard University",
    research: ["Iwasawa Theory", "Arithmetic Geometry"],
    office: "SA-103",
    phone: "+90 (312) 290-1883",
    email: "swshah [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/shah.jpg",
    url: "https://sites.google.com/",
    emeritus: false
  },
  {
    name: "Okan Tekman",
    rank: "Senior Lecturer",
    degree: "Ph.D., Mathematics, University of Minnesota, 1992",
    research: ["Automorphic forms"],
    office: "SA-125",
    phone: "+90 (312) 290-1256",
    email: "otekman [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/tekman-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Bülent Ünal",
    rank: "Associate Professor",
    degree: "Ph.D., Mathematics, University of Missouri, 2000",
    research: ["Differential geometry", "global analysis on manifolds", "general relativity and quantum field theories"],
    office: "SA-118",
    phone: "+90 (312) 290-1719",
    email: "bulent [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/unal-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Özgün Ünlü",
    rank: "Associate Professor",
    degree: "Ph.D., Mathematics, University of Wisconsin-Madison, 2004",
    research: ["Algebraic topology", "geometric group theory"],
    office: "SA-123",
    phone: "+90 (312) 290-1359",
    email: "unluo [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/unlu-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Ergün Yalçın",
    rank: "Professor",
    degree: "Ph.D., Mathematics, University of Wisconsin-Madison, 1998",
    research: ["Cohomology of groups", "finite group actions on topological spaces"],
    office: "SA-127",
    phone: "+90 (312) 290-2115",
    email: "yalcine [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/yalcin-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Hamza Yeşilyurt",
    rank: "Associate Professor",
    degree: "Ph.D., Mathematics, University of Illinois Urbana-Champaign, 2004",
    research: ["Analytic number theory"],
    office: "SA-106",
    phone: "+90 (312) 290-1897",
    email: "hamza [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/yesilyurt-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Gökhan Yıldırım",
    rank: "Assistant Professor",
    degree: "Ph.D., Applied Mathematics, University of Southern California, 2013",
    research: ["Enumerative combinatorics", "probability", "statistical physics", "data science"],
    office: "SA-142",
    phone: "+90 (312) 290-2104",
    email: "gokhan.yildirim [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/yildirim-2.jpg",
    url: "https://orcid.org/",
    emeritus: false
  },
  {
    name: "Deniz Yılmaz",
    rank: "Assistant Professor",
    degree: "Ph.D., Mathematics, University of California, Santa Cruz, 2020",
    research: ["Representation theory", "finite groups", "block theory", "biset functors"],
    office: "SA-114",
    phone: "+90 (312) 290-1085",
    email: "d.yilmaz [-at-] bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/d.yilmaz.jpg",
    url: "https://web4.bilkent.edu.tr/",
    emeritus: false
  },
  {
    name: "Natalya Zheltukhina",
    rank: "Instructor",
    degree: "Ph.D., Mathematics, Bilkent University, 2002",
    research: ["Theory of entire functions", "Polya frequency sequences"],
    office: "SA-111b",
    phone: "+90 (312) 290-2465",
    email: "natalya [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/zheltukhina-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: false
  },

  // ===== Emeriti =====
  {
    name: "İbrahim Dibağ",
    rank: "Professor",
    degree: "Ph.D., Mathematics, Princeton University, 1972",
    research: ["Algebraic topology"],
    office: "",
    phone: "",
    email: "",
    photo: "https://math.bilkent.edu.tr/dibag.jpg",
    url: "",
    emeritus: true
  },
  {
    name: "Uğurhan Muğan",
    rank: "Professor",
    degree: "Ph.D., Mathematics, Clarkson University, 1988",
    research: ["Nonlinear ordinary and partial differential equations", "asymptotic analysis", "boundary value problems", "singular integral equations"],
    office: "",
    phone: "",
    email: "",
    photo: "https://math.bilkent.edu.tr/mugan.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: true
  },
  {
    name: "Alexander Klyachko",
    rank: "Professor",
    degree: "Ph.D., Mathematics, Saratov State University, 1973",
    research: ["Algebra", "algebraic geometry", "number theory"],
    office: "",
    phone: "",
    email: "",
    photo: "https://math.bilkent.edu.tr/klyachko-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: true
  },
  {
    name: "Mefharet Kocatepe",
    rank: "Professor",
    degree: "Ph.D., Mathematics, University of Michigan, 1978",
    research: ["Functional analysis", "nuclear spaces", "Köthe spaces"],
    office: "",
    phone: "",
    email: "",
    photo: "https://math.bilkent.edu.tr/kocatepe-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: true
  },
  {
    name: "Ali Süleyman Üstünel",
    rank: "Visiting Professor",
    degree: "Doctorat d'Etat, Mathematics, University of Paris VI, 1981",
    research: ["Probability and analysis", "stochastic calculus", "financial mathematics"],
    office: "",
    phone: "",
    email: "",
    photo: "https://math.bilkent.edu.tr/ustunel-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: true
  },
  {
    name: "Aurelian Gheondea",
    rank: "Professor",
    degree: "Ph.D., Mathematics, University of Bucharest, 1990",
    research: ["Functional analysis", "operator theory", "mathematical physics", "numerical analysis"],
    office: "",
    phone: "",
    email: "",
    photo: "https://math.bilkent.edu.tr/gheondea-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: true
  },
  {
    name: "Yosum Kurtulmaz",
    rank: "Instructor",
    degree: "Ph.D., Mathematics, Middle East Technical University, 1998",
    research: ["Ring theory", "number theory", "formal concept analysis"],
    office: "",
    phone: "",
    email: "",
    photo: "https://math.bilkent.edu.tr/kurtulmaz-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: true
  },
  {
    name: "Metin Gürses",
    rank: "Professor",
    degree: "Ph.D., Physics, Middle East Technical University, 1975",
    research: ["Mathematical physics", "integrability of nonlinear PDEs", "higher-dimensional classical field theories"],
    office: "SA-126",
    phone: "+90 (312) 290-1924",
    email: "gurses [-at-] fen.bilkent.edu.tr",
    photo: "https://math.bilkent.edu.tr/gurses-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: true
  },
  {
    name: "Dilek Köksal",
    rank: "Instructor",
    degree: "Ph.D., Statistics, Ankara University, 1984",
    research: ["Probability and statistics"],
    office: "",
    phone: "",
    email: "",
    photo: "https://math.bilkent.edu.tr/guvenc-2.jpg",
    url: "https://www.fen.bilkent.edu.tr/",
    emeritus: true
  }
];


/* ====== HELPERS ====== */
const $ = (sel, root = document) => root.querySelector(sel);

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function includesQuery(haystack, q) {
  if (!q) return true;
  return tokenize(haystack).includes(q);
}

function tokenize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cardTemplate(p) {
  const name = escapeHtml(p.name);
  const rank = escapeHtml(p.rank || "");
  const degree = escapeHtml(p.degree || "");
  const research = escapeHtml(p.research || "");
  const office = escapeHtml(p.office || "");
  const phone = escapeHtml(p.phone || "");
  const email = escapeHtml(p.email || "");
  const url = (p.url || "").trim();
  const photo = (p.photo || "").trim();

  const tags = (p.research || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("");

  const titleBadge = rank ? `<span class="badge">${rank}</span>` : "";

  const nameHtml = url
    ? `<a class="link" href="${escapeHtml(url)}" target="_blank" rel="noopener">${name}</a>`
    : `${name}`;

  return `
    <article class="faculty-card" data-rank="${escapeHtml(p.rank || "")}">
      <div class="cardTop">
        <div class="faculty-avatar" aria-hidden="true">
          ${photo ? `<img src="${escapeHtml(photo)}" alt="${name}">` : ""}
        </div>

        <div style="min-width:0">
          <div class="nameRow">
            <h3 class="faculty-name">${nameHtml}</h3>
            ${titleBadge}
          </div>
          <p class="faculty-title">${degree || research}</p>
        </div>
      </div>

      <div class="cardBody">
        ${research ? `<div class="tags">${tags}</div>` : ""}
            <div class="kv">
              ${office ? `<b>Office:</b><span>${office}</span>` : ""}
              ${phone ? `<b>Phone:</b><span>${phone}</span>` : ""}
              ${email ? `<b>E-mail:</b><span>${email}</span>` : ""}
            </div>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const current = FACULTY.filter(p => !p.emeritus);
  const emeriti = FACULTY.filter(p => p.emeritus);


  const gridCurrent = $("#gridCurrent");
  const gridEmeriti = $("#gridEmeriti");

  if (gridCurrent) {
    gridCurrent.innerHTML =
      current.map(cardTemplate).join("") || emptyState("No matching current faculty.");
  }

  if (gridEmeriti) {
    gridEmeriti.innerHTML =
      emeriti.map(cardTemplate).join("") || emptyState("No matching emeriti.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  render();
});