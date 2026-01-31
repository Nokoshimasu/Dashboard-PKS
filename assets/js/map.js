// 1. Karte initialisieren
const map = L.map('map', {
    center: [51.1657, 10.4515],
    zoom: 6,
    minZoom: 5,
    maxBounds: [[47.0, 5.0], [55.5, 16.0]]
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

let geojsonLayer;

// 2. Farbskala definieren
function getColor(d) {
    return d > 50000 ? '#4a0000' :
        d > 20000 ? '#67000d' :
            d > 10000 ? '#800026' :
                d > 5000 ? '#bd0026' :
                    d > 1000 ? '#e31a1c' :
                        d > 500 ? '#fc4e2a' :
                            d > 200 ? '#fd8d3c' :
                                d > 100 ? '#feb24c' :
                                    d > 50 ? '#fed976' :
                                        '#ffeda0';
}

// 3. Hauptfunktion
async function render() {
    const jahr = document.getElementById('jahr').value;
    const delikt = document.getElementById('delikt').value;
    const geschlecht = document.getElementById('geschlecht').value;
    const alter = document.getElementById('alter').value;

    // Daten von der PHP-Schnittstelle holen
    const response = await fetch(`api/get_data.php?jahr=${jahr}&delikt=${delikt}&geschlecht=${geschlecht}&alter=${alter}`);
    const values = await response.json();

    const dataMap = {};
    values.forEach(item => {
        dataMap[item.ags] = parseInt(item.anzahl);
    });

    // GeoJSON laden
    const geoResponse = await fetch('assets/data/landkreise.geojson');
    const geoData = await geoResponse.json();

    if (geojsonLayer) map.removeLayer(geojsonLayer);

    geojsonLayer = L.geoJson(geoData, {
        style: function (feature) {
            const rs = feature.properties.RS.substring(0, 5);
            const val = dataMap[rs] || 0;
            return {
                fillColor: getColor(val),
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
            };
        },
        onEachFeature: function (feature, layer) {
            const rs = feature.properties.RS.substring(0, 5);
            const name = feature.properties.GEN || "Unbekannt";
            const val = dataMap[rs] || 0;
            const popupContent = `<b>${name}</b><br>Opfer: ${val}`;

            layer.bindPopup(popupContent, {
                closeButton: false,
                autoPan: false,
                offset: L.point(0, -10)
            });

            // Event-Listener für Hover-Effekt
            layer.on({
                mouseover: function (e) {
                    const layer = e.target;

                    layer.setStyle({
                        weight: 3,
                        color: '#666',
                        fillOpacity: 0.9
                    });

                    layer.openPopup(e.latlng);
                },
                mouseout: function (e) {
                    geojsonLayer.resetStyle(e.target);
                    e.target.closePopup();
                },
                mousemove: function (e) {
                    e.target.getPopup().setLatLng(e.latlng);
                }
            });
        }
    }).addTo(map);
}

// Event-Listener hinzufügen
document.querySelectorAll('select').forEach(s => s.addEventListener('change', render));

// 5. Legende
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const grades = [0, 50, 100, 200, 500, 1000, 5000, 10000, 20000, 50000];

    div.innerHTML += '<b>Opferzahlen</b><br>';

    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

render();

