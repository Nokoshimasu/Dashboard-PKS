let crimeChart;
let globalData2023 = [];
let globalData2024 = [];
let currentDistrictAgs = null;

document.addEventListener('DOMContentLoaded', () => {
    renderDiagram();

    // Event Listeners für Filter
    document.getElementById('delikt').addEventListener('change', renderDiagram);
    document.getElementById('geschlecht').addEventListener('change', renderDiagram);
    document.getElementById('alter').addEventListener('change', renderDiagram);

    document.getElementById('search-btn').addEventListener('click', handleSearch);
    document.getElementById('search-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});

async function renderDiagram() {
    const delikt = document.getElementById('delikt').value;
    const geschlecht = document.getElementById('geschlecht').value;
    const alter = document.getElementById('alter').value;


    const [data2023, data2024] = await Promise.all([
        fetchData(2023, delikt, geschlecht, alter),
        fetchData(2024, delikt, geschlecht, alter)
    ]);

    globalData2023 = data2023;
    globalData2024 = data2024;

    updateChart();
}

async function fetchData(jahr, delikt, geschlecht, alter) {
    const url = `api/get_data.php?jahr=${jahr}&delikt=${encodeURIComponent(delikt)}&geschlecht=${geschlecht}&alter=${alter}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

function handleSearch() {
    const searchInput = document.getElementById('search-input').value;

    if (!searchInput) {
        currentDistrictAgs = null;
        updateChart();
        return;
    }

    const district = globalData2023.find(d => d.ort.toLowerCase() === searchInput.toLowerCase())
        || globalData2024.find(d => d.ort.toLowerCase() === searchInput.toLowerCase());

    if (district) {
        currentDistrictAgs = district.ags;
        updateChart();
    } else {
        alert("Landkreis nicht gefunden oder keine Daten vorhanden.");
    }
}

function updateChart() {

    let val2023 = 0;
    let val2024 = 0;
    let labelText = "Gesamtdeutschland";

    if (currentDistrictAgs) {
        const d23 = globalData2023.find(d => d.ags === currentDistrictAgs);
        const d24 = globalData2024.find(d => d.ags === currentDistrictAgs);

        val2023 = d23 ? parseInt(d23.anzahl) : 0;
        val2024 = d24 ? parseInt(d24.anzahl) : 0;
        labelText = d23 ? d23.ort : (d24 ? d24.ort : "Unbekannt");
    } else {
        val2023 = globalData2023.reduce((sum, item) => sum + parseInt(item.anzahl), 0);
        val2024 = globalData2024.reduce((sum, item) => sum + parseInt(item.anzahl), 0);
    }

    const ctx = document.getElementById('crimeChart').getContext('2d');

    if (crimeChart) {
        crimeChart.destroy();
    }

    crimeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2023', '2024'],
            datasets: [{
                label: `Opferzahlen (${labelText})`,
                data: [val2023, val2024],
                backgroundColor: [
                    'rgba(54, 163, 235, 1)',
                    'rgba(255, 99, 133, 1)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Vergleich 2023 vs 2024 - ${document.getElementById('delikt').value}`
                }
            }
        }
    });

    // Unterschiede
    const absoluteDiff = val2024 - val2023;
    const percentageDiff = val2023 > 0 ? ((absoluteDiff / val2023) * 100).toFixed(2) : 'N/A';

    const absoluteDiffText = absoluteDiff >= 0 ? `+${absoluteDiff}` : `${absoluteDiff}`;
    const percentageDiffText = percentageDiff !== 'N/A'
        ? (absoluteDiff >= 0 ? `+${percentageDiff}%` : `${percentageDiff}%`)
        : percentageDiff;

    document.getElementById('diff-absolute').textContent = absoluteDiffText;
    document.getElementById('diff-percentage').textContent = percentageDiffText;

    const diffColor = absoluteDiff > 0 ? 'red' : (absoluteDiff < 0 ? 'green' : 'black');
    document.getElementById('diff-absolute').style.color = diffColor;
    document.getElementById('diff-percentage').style.color = diffColor;
}
