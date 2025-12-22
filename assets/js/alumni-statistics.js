const STATS = {
    "Academia": 52,
    "Finance and Banking": 11,
    "IT": 8,
    "Education": 7,
    "Public Sector": 3,
    "Research Institute": 2,
    "Telecommunications": 2,
    "Defense Industry": 1,
    "Other": 13,
};

document.addEventListener("DOMContentLoaded", () => {

    const labels = Object.keys(STATS);
    const values = Object.values(STATS);

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
});
