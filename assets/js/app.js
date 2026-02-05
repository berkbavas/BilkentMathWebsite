/* ==========================================================
   App bootstrap
   ========================================================== */
import { TRANSLATIONS } from '../data/translations.js';

function init() {
    fetch("footer.html")
        .then(res => res.text())
        .then(html => { document.getElementById("footer").innerHTML = html; })
        .then(() => fetch("navigation.html"))
        .then(res => res.text())
        .then(html => {
            document.getElementById("navigation").innerHTML = html;
            setupNavigation();
            setupLanguageToggle();
        });
}

/* ==========================================================
   Selectors (single source of truth)
   ========================================================== */
const SELECTORS = {
    navToggle: "[data-nav-toggle]",
    nav: "#primaryNav",
    dropdownToggle: "[data-dropdown-toggle]",
    langToggle: "[data-lang-toggle]"
};

/* ==========================================================
   Navigation (mobile + dropdown)
   ========================================================== */
function setupNavigation() {
    const navToggle = document.querySelector(SELECTORS.navToggle);
    const nav = document.querySelector(SELECTORS.nav);
    const dropdownToggles = document.querySelectorAll(SELECTORS.dropdownToggle);

    if (!nav || !navToggle) return;

    /* Mobile menu toggle */
    navToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = nav.getAttribute("data-collapsed") === "false";
        setNavOpen(!isOpen);
    });

    /* Dropdown toggles */
    dropdownToggles.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleDropdown(btn);
        });
    });

    /* Close menus when clicking outside */
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            closeAllDropdowns();
            setNavOpen(false);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllDropdowns();
            setNavOpen(false);
        }
    });

    function setNavOpen(open) {
        nav.setAttribute("data-collapsed", String(!open));
        navToggle.setAttribute("aria-expanded", String(open));
        
        if (open) {
            document.body.classList.add("nav-open");
        } else {
            document.body.classList.remove("nav-open");
        }
    }

    function toggleDropdown(button) {
        const item = button.closest(".nav-item");
        const expanded = item.classList.contains("open");

        closeAllDropdowns();

        // If it was open, we just closed everything => done (toggle close)
        if (expanded) return;

        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
    }

    function closeAllDropdowns() {
        document.querySelectorAll(".nav-item.open")
            .forEach(item => item.classList.remove("open"));

        dropdownToggles.forEach(btn =>
            btn.setAttribute("aria-expanded", "false")
        );
    }


}

function setupLanguageToggle() {
    const toggles = document.querySelectorAll(SELECTORS.langToggle);

    let currentLang = localStorage.getItem("lang") || "en";
    
    // Update all toggle buttons - show the TARGET language (opposite of current)
    const targetLang = currentLang === "en" ? "TR" : "EN";
    toggles.forEach(toggle => {
        const langText = toggle.querySelector('.lang-text');
        if (langText) {
            langText.textContent = targetLang;
        } else {
            toggle.textContent = targetLang;
        }
    });
    
    applyTranslations(currentLang);

    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            currentLang = currentLang === "en" ? "tr" : "en";
            localStorage.setItem("lang", currentLang);
            
            // Update all toggle buttons - show the TARGET language (opposite of current)
            const newTargetLang = currentLang === "en" ? "TR" : "EN";
            document.querySelectorAll(SELECTORS.langToggle).forEach(btn => {
                const langText = btn.querySelector('.lang-text');
                if (langText) {
                    langText.textContent = newTargetLang;
                } else {
                    btn.textContent = newTargetLang;
                }
            });
            
            applyTranslations(currentLang);
            if (document.render) {
                document.render(); // For pages that implement a render function for dynamic content
            }
        });
    });
}

function applyTranslations(lang) {
    document.querySelectorAll("[data-lang]").forEach(el => {
        el.hidden = (el.dataset.lang !== lang);
    });

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const translation = TRANSLATIONS[key];
        if (translation) {
            el.textContent = translation[lang] || translation["en"] || "Translation missing";
        }
    });

    document.querySelectorAll("[data-fa]").forEach(el => {
        const faClass = el.getAttribute("data-fa");
        el.innerHTML += `<i class="${faClass}"></i>`; // Hacky way to inject FontAwesome icons. I don't like it but it works.
    });
}

document.addEventListener("DOMContentLoaded", init);