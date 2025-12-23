import { ALUMNI_STATISTICS } from "../data/alumni-statistics.js";

async function render() {
    const labels = Object.keys(ALUMNI_STATISTICS);
    const values = Object.values(ALUMNI_STATISTICS);

    // Bar chart
    const barCanvas = document.getElementById("alumniBar");
    if (barCanvas) {
        new Chart(barCanvas, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    label: "Percentage",
                    data: values,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (v) => v + "%",
                        },
                    },
                },
            },
        });
    }

    // Pie chart
    const pieCanvas = document.getElementById("alumniPie");
    if (pieCanvas) {
        new Chart(pieCanvas, {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    data: values
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom"
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.label}: ${ctx.parsed}%`
                        }
                    },
                    datalabels: {
                        color: "#fff",
                        font: {
                            size: 16
                        },
                        formatter: (value) => value + "%",
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }
}

document.addEventListener("DOMContentLoaded", render);
