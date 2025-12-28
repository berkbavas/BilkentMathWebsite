import { ALUMNI_STATISTICS } from "../data/alumni-statistics.js";
import { TRANSLATIONS } from "../data/translations.js";

function hexToRgba(hex, a) {
    const h = (hex || "").replace("#", "").trim();
    const full = h.length === 3 ? h.split("").map(x => x + x).join("") : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Center text plugin for donut
const DonutCenterText = {
    id: "donutCenterText",
    afterDraw(chart, args, opts) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;

        const total = chart.data.datasets?.[0]?.data?.reduce((s, v) => s + (Number(v) || 0), 0) || 0;
        const text = opts?.text ?? `${total}%`;
        const sub = opts?.subtext ?? "Total";

        const x = (chartArea.left + chartArea.right) / 2;
        const y = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "800 22px Fira Sans";
        ctx.fillStyle = "rgba(17,17,17,.92)";
        ctx.fillText(text, x, y - 8);

        ctx.font = "600 12px Fira Sans";
        ctx.fillStyle = "rgba(17,17,17,.55)";
        ctx.fillText(sub, x, y + 12);

        ctx.restore();
    }
};

function render() {
    // destroy previous charts
    Chart.helpers.each(Chart.instances, c => c.destroy());

    const lang = localStorage.getItem("lang") || "en";
    const keys = Object.keys(ALUMNI_STATISTICS);
    const values = Object.values(ALUMNI_STATISTICS);
    const labels = keys.map(key => TRANSLATIONS.chartLabels[key][lang] ?? key);

    // theme-ish colors (brand #2d2a62 + soft companions)
    const palette = [
        "#00a5e6",
        "#4b6fff",
        "#22a06b",
        "#f59e0b",
        "#ef4444",
        "#d406d0",
        "#8b5cf6",
        "#acc10d",
        "#111827"
    ];

    // ---- BAR (horizontal) ----
    const barCanvas = document.getElementById("alumniBar");
    if (barCanvas) {
        new Chart(barCanvas, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    label: TRANSLATIONS.chartPercentage[lang] || "Percentage",
                    data: values,
                    borderRadius: 10,
                    barThickness: 14,
                    backgroundColor: palette.map(c => hexToRgba(c, 0.18)),
                    borderColor: palette.map(c => hexToRgba(c, 0.55)),
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { right: 8 } },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: "rgba(17,17,17,.92)",
                        padding: 10,
                        callbacks: {
                            label: ctx => `${ctx.parsed.x}%`
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: "rgba(0,0,0,.06)" },
                        ticks: {
                            callback: v => v + "%",
                            color: "rgba(17,17,17,.65)",
                            font: { size: 12 }
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: {
                            color: "rgba(17,17,17,.78)",
                            font: { size: 12, weight: "600" }
                        }
                    }
                }
            }
        });
    }

    // ---- DONUT ----
    const pieCanvas = document.getElementById("alumniPie");
    if (pieCanvas) {
        new Chart(pieCanvas, {
            type: "doughnut",
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: palette.map(c => hexToRgba(c, 0.22)),
                    borderColor: palette.map(c => hexToRgba(c, 0.55)),
                    borderWidth: 1,
                    hoverOffset: 10,
                    cutout: "62%"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            usePointStyle: true,
                            pointStyle: "circle",
                            padding: 14,
                            boxWidth: 8,
                            color: "rgba(17,17,17,.75)",
                            font: { size: 12, weight: "600" }
                        }
                    },
                    tooltip: {
                        backgroundColor: "rgba(17,17,17,.92)",
                        padding: 10,
                        callbacks: {
                            label: ctx => `${ctx.label}: ${ctx.parsed}%`
                        }
                    },
                    datalabels: {
                        color: "rgba(17,17,17,.80)",
                        font: { size: 11, weight: "800" },
                        formatter: (value) => value >= 6 ? value + "%" : "" // küçük dilimleri yazma
                    },
                    donutCenterText: {
                        text: "100%",
                        subtext: lang === "tr" ? "Toplam" : "Total"
                    }
                }
            },
            plugins: [ChartDataLabels, DonutCenterText]
        });
    }
}


TRANSLATIONS.headerAlumniStatistics = {
    en: "Alumni Statistics",
    tr: "Mezun İstatistikleri"
};

TRANSLATIONS.paragraphAlumniStatistics = {
    en: "Information about alumni of the Department of Mathematics.",
    tr: "Matematik Bölümü mezunları hakkında bilgiler."
};

TRANSLATIONS.headerCareerPathsBar = {
    en: "Career Paths After Graduation (Bar)",
    tr: "Mezuniyet Sonrası Kariyer Yolları (Çubuk Grafik)"
};

TRANSLATIONS.subCareerPathsBar = {
    en: "Distribution by sector (%)",
    tr: "Sektöre göre dağılım (%)"
};

TRANSLATIONS.headerCareerPathsPie = {
    en: "Career Paths After Graduation",
    tr: "Mezuniyet Sonrası Kariyer Yolları"
};

TRANSLATIONS.subCareerPathsPie = {
    en: "Distribution by sector (%)",
    tr: "Sektöre göre dağılım (%)"
};

TRANSLATIONS.chartPercentage = {
    en: "Percentage",
    tr: "Yüzde"
};

TRANSLATIONS.chartLabels = {
    academia: {
        en: "Academia",
        tr: "Akademi"
    },
    financeAndBanking: {
        en: "Finance and Banking",
        tr: "Bankacılık ve Finans"
    },
    it: {
        en: "IT",
        tr: "Bilişim Teknolojileri"
    },
    education: {
        en: "Education",
        tr: "Eğitim"
    },
    publicSector: {
        en: "Public Sector",
        tr: "Kamu Sektörü"
    },
    researchInstitute: {
        en: "Research Institute",
        tr: "Araştırma Enstitüsü"
    },
    telecommunications: {
        en: "Telecommunications",
        tr: "Telekomünikasyon"
    },
    defenseIndustry: {
        en: "Defense Industry",
        tr: "Savunma Sanayii"
    },
    other: {
        en: "Other",
        tr: "Diğer"
    }
};


document.render = render;
document.addEventListener("DOMContentLoaded", render);