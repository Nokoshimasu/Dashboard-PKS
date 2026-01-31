<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <title>PKS Dashboard</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

    <div id="sidebar">
        <h2>Filter</h2>
        <div class="filter-group">
            <label>Straftat:</label>
            <select id="delikt">
                <option value="Straftaten insgesamt">Straftaten insgesamt</option>
                <option value="Gewaltkriminalität">Gewaltkriminalität</option>
                <option value="Vorsätzliche einfache Körperverletzung § 223 StGB">Vorsätzliche einfache Körperverletzung
                </option>
                <option value="Mord Totschlag und Tötung auf Verlangen">Mord, Totschlag und Tötung auf Verlangen
                </option>
                <option
                    value="Raub räuberische Erpressung und räuberischer Angriff auf Kraftfahrer §§ 249-252 255 316a StGB">
                    Raub, räuberische Erpressung und räuberischer Angriff auf Kraftfahrer
                </option>
                <option value="Sonstige Raubüberfälle auf Straßen Wegen oder Plätzen">
                    Sonstige Raubüberfälle auf Straßen Wegen oder Plätzen
                </option>
            </select>
        </div>
        <div class="filter-group">
            <label>Geschlecht:</label>
            <select id="geschlecht">
                <option value="insg">Gesamt</option>
                <option value="m">Männlich</option>
                <option value="w">Weiblich</option>
            </select>
        </div>
        <div class="filter-group">
            <label>Alter:</label>
            <select id="alter">
                <option value="opfer">Alle Alter</option>
                <option value="kinder_u6">Kinder bis unter 6 Jahre</option>
                <option value="kinder_6_14">Kinder 6 bis unter 14 Jahre</option>
                <option value="kinder_u14">Kinder bis 14 Jahre</option>
                <option value="jugendliche_14_18">Jugendliche 14 bis unter 18 Jahre</option>
                <option value="heranwachsende_18_21">Heranwachsende 18 bis unter 21 Jahre</option>
                <option value="erwachsene_21_60">Erwachsene 21 bis unter 60 Jahre</option>
                <option value="erwachsene_60_plus">Erwachsene 60 Jahre und älter</option>
                <option value="erwachsene">Erwachsene</option>
            </select>
        </div>
        <div class="filter-group">
            <label>Suche:</label>
            <search id="search">
                <input type="text" id="search-input" list="landkreise-list" placeholder="Landkreis suchen..." />
                <button id="search-btn">Suchen</button>
                <datalist id="landkreise-list"></datalist>
            </search>
        </div>
        <div class="filter-group">
            <button id="diagram-btn" onclick="window.location.href='index.php'">Karte</button>
        </div>
    </div>

    <div id="map">
        <div id="chart-legend" style="text-align: center; padding: 8px; font-size: 13px;">
            <span
                style="display: inline-block; width: 20px; height: 20px; background-color: rgba(54, 163, 235, 1); margin-right: 5px; vertical-align: middle;"></span>
            <strong>2023</strong>
            <span
                style="display: inline-block; width: 20px; height: 20px; background-color: rgba(255, 99, 133, 1); margin-left: 20px; margin-right: 5px; vertical-align: middle;"></span>
            <strong>2024</strong>
        </div>
        <canvas id="crimeChart"></canvas>
        <div id="chart-stats" style="text-align: center; padding: 8px; font-size: 14px;">
            <p style="margin: 3px 0;"><strong>Unterschied:</strong> <span id="diff-absolute">-</span></p>
            <p style="margin: 3px 0;"><strong>Prozentuale Veränderung:</strong> <span id="diff-percentage">-</span></p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="assets/js/diagram.js"></script>
    <script src="assets/js/search_logic.js"></script>
</body>

</html>