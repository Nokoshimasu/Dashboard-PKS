
// Suchfunktion
async function initSearch() {
    const searchInput = document.getElementById('search-input');
    const datalist = document.getElementById('landkreise-list');

    const searchBtn = document.getElementById('search-btn');

    // Landkreise laden
    const response = await fetch('api/get_landkreise.php');
    const landkreise = await response.json();

    // Map für schnellen Zugriff: Name -> AGS
    const nameToAgs = {};

    landkreise.forEach(lk => {
        const option = document.createElement('option');
        option.value = lk.ort;
        datalist.appendChild(option);

        nameToAgs[lk.ort] = lk.ags;
    });

    // Gemeinsame Suchfunktion
    const performSearch = () => {
        const value = searchInput.value;
        const ags = nameToAgs[value];

        if (ags && typeof geojsonLayer !== 'undefined' && geojsonLayer) {
            let foundLayer = null;

            geojsonLayer.eachLayer(layer => {
                const layerRs = layer.feature.properties.RS.substring(0, 5);
                if (layerRs === ags) {
                    foundLayer = layer;
                }
            });

            if (foundLayer && typeof map !== 'undefined' && map) {
                map.fitBounds(foundLayer.getBounds());
                foundLayer.openPopup();
            }
        }
    };

    // Event-Listener für den Button
    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Text beim Reinklicken löschen
    searchInput.addEventListener('focus', (e) => {
        e.target.value = '';
    });
}

// Suche initialisieren
initSearch();
