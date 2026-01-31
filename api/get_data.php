<?php
header('Content-Type: application/json');

// DB-Verbindung einbinden
require_once '../includes/db.php';

// 1. Parameter vom AJAX-Call holen
$jahr = $_GET['jahr'] ?? 2023;
$delikt = $_GET['delikt'] ?? 'Straftaten insgesamt';
$geschlecht = $_GET['geschlecht'] ?? 'insg';
$alter = $_GET['alter'] ?? 'opfer';

// 2. Dynamischen Spaltennamen bauen
if ($alter === 'opfer') {
    // Spezialfall für die Gesamtspalte
    $spalte = ($geschlecht === 'insg') ? "opfer_insgesamt" : "opfer_" . $geschlecht;
} else {
    $spalte = $alter . "_" . $geschlecht;
}

// 3. Datenbank abfragen
$sql = "SELECT ags, ort, $spalte AS anzahl FROM pks_daten 
        WHERE jahr = :jahr AND straftat = :delikt";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':jahr' => $jahr,
    ':delikt' => $delikt
]);

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// 4. Ergebnis als JSON senden
echo json_encode($results);