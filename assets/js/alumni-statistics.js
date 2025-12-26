import { ALUMNI_STATISTICS } from "../data/alumni-statistics.js";
import { TRANSLATIONS } from "../data/translations.js";

function render() {
    Chart.helpers.each(Chart.instances, chart => chart.destroy());
    const lang = localStorage.getItem("lang") || "en";
    const translation = TRANSLATIONS[lang];

    const labels = Object.keys(ALUMNI_STATISTICS).map(
        key => translation.chartLabels[key] ?? key
    );
    const values = Object.values(ALUMNI_STATISTICS);

    // ---- BAR CHART ----
    const barCanvas = document.getElementById("alumniBar");
    if (barCanvas) {
        new Chart(barCanvas, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    label: translation.chartPercentage,
                    data: values,
                    borderRadius: 6,
                    maxBarThickness: 48
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.parsed.y}%`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: v => v + "%"
                        }
                    }
                }
            }
        });
    }

    // ---- PIE CHART ----
    const pieCanvas = document.getElementById("alumniPie");
    if (pieCanvas) {
        new Chart(pieCanvas, {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    data: values,
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "bottom" },
                    tooltip: {
                        callbacks: {
                            label: ctx =>
                                `${ctx.label}: ${ctx.parsed}%`
                        }
                    },
                    datalabels: {
                        color: "#fff",
                        font: { size: 16 },
                        formatter: value => value + "%"
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }
}

TRANSLATIONS.en.chartLabels = {
    academia: "Academia",
    financeAndBanking: "Finance and Banking",
    it: "IT",
    education: "Education",
    publicSector: "Public Sector",
    researchInstitute: "Research Institute",
    telecommunications: "Telecommunications",
    defenseIndustry: "Defense Industry",
    other: "Other"
};

TRANSLATIONS.en.headerAlumniStatistics = "Alumni Statistics";
TRANSLATIONS.en.paragraphAlumniStatistics = "Information about alumni of the Department of Mathematics.";
TRANSLATIONS.en.headerCareerPathsBar = "Career Paths After Graduation (Bar)";
TRANSLATIONS.en.subCareerPathsBar = "Distribution by sector (%)";
TRANSLATIONS.en.headerCareerPathsPie = "Career Paths After Graduation";
TRANSLATIONS.en.subCareerPathsPie = "Distribution by sector (%)";
TRANSLATIONS.en.chartPercentage = "Percentage";

TRANSLATIONS.tr.chartLabels = {
    academia: "Akademi",
    financeAndBanking: "Bankacılık ve Finans",
    it: "Bilişim Teknolojileri",
    education: "Eğitim",
    publicSector: "Kamu Sektörü",
    researchInstitute: "Araştırma Enstitüsü",
    telecommunications: "Telekomünikasyon",
    defenseIndustry: "Savunma Sanayii",
    other: "Diğer"
};

TRANSLATIONS.tr.headerAlumniStatistics = "Mezun İstatistikleri";
TRANSLATIONS.tr.paragraphAlumniStatistics = "Matematik Bölümü mezunları hakkında bilgiler.";
TRANSLATIONS.tr.headerCareerPathsBar = "Mezuniyet Sonrası Kariyer Yolları (Çubuk Grafik)";
TRANSLATIONS.tr.subCareerPathsBar = "Sektöre göre dağılım (%)";
TRANSLATIONS.tr.headerCareerPathsPie = "Mezuniyet Sonrası Kariyer Yolları";
TRANSLATIONS.tr.subCareerPathsPie = "Sektöre göre dağılım (%)";
TRANSLATIONS.tr.chartPercentage = "Yüzde";

document.render = render;
document.addEventListener("DOMContentLoaded", render);
