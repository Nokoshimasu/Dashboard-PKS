<?php
header('Content-Type: application/json');

include '../includes/db.php';

try {
    $stmt = $pdo->query("SELECT DISTINCT ags, ort FROM pks_daten ORDER BY ort ASC");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
