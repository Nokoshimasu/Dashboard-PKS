<?php
$host = 'localhost';
$db = 'straftaten_opfer';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Datenbankfehler: " . $e->getMessage());
}

$filename = '2024 Opfer.csv';
$jahr = 2024;

$erlaubte_delikte = [
    "Straftaten insgesamt",
    "Raub räuberische Erpressung und räuberischer Angriff auf Kraftfahrer §§ 249-252 255 316a StGB",
    "Sonstige Raubüberfälle auf Straßen Wegen oder Plätzen",
    "Vorsätzliche einfache Körperverletzung § 223 StGB",
    "Gewaltkriminalität",
    "Mord Totschlag und Tötung auf Verlangen"
];

if (($handle = fopen($filename, "r")) !== FALSE) {
    fgetcsv($handle, 2000, ";"); // Header überspringen

    $sql = "INSERT INTO pks_daten (
                jahr, straftat, ags, ort, 
                opfer_insgesamt, opfer_m, opfer_w, 
                kinder_u6_insg, kinder_u6_m, kinder_u6_w,
                kinder_6_14_insg, kinder_6_14_m, kinder_6_14_w,
                kinder_u14_insg, kinder_u14_m, kinder_u14_w,
                jugendliche_14_18_insg, jugendliche_14_18_m, jugendliche_14_18_w,
                heranwachsende_18_21_insg, heranwachsende_18_21_m, heranwachsende_18_21_w,
                erwachsene_21_60_insg, erwachsene_21_60_m, erwachsene_21_60_w,
                erwachsene_60_plus_insg, erwachsene_60_plus_m, erwachsene_60_plus_w,
                erwachsene_insg, erwachsene_m, erwachsene_w
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    $stmt = $pdo->prepare($sql);
    $count = 0;

    while (($data = fgetcsv($handle, 2000, ";")) !== FALSE) {

        // Konvertiert den Text von Windows-Format zu UTF-8
        $deliktName = mb_convert_encoding(trim($data[0]), "UTF-8", "Windows-1252");
        $fallstatus = mb_convert_encoding(trim($data[3]), "UTF-8", "Windows-1252");
        $ort = mb_convert_encoding(trim($data[2]), "UTF-8", "Windows-1252");
        $ags_korrekt = str_pad(trim($data[1]), 5, "0", STR_PAD_LEFT);


        if ($fallstatus === 'insg.' && in_array($deliktName, $erlaubte_delikte)) {
            $werte = [
                $jahr,
                $deliktName,
                $ags_korrekt,
                $ort,
                (int) $data[4],
                (int) $data[5],
                (int) $data[6],
                (int) $data[7],
                (int) $data[8],
                (int) $data[9],
                (int) $data[10],
                (int) $data[11],
                (int) $data[12],
                (int) $data[13],
                (int) $data[14],
                (int) $data[15],
                (int) $data[16],
                (int) $data[17],
                (int) $data[18],
                (int) $data[19],
                (int) $data[20],
                (int) $data[21],
                (int) $data[22],
                (int) $data[23],
                (int) $data[24],
                (int) $data[25],
                (int) $data[26],
                (int) $data[27],
                (int) $data[28],
                (int) $data[29],
                (int) $data[30]
            ];

            $stmt->execute(array_slice($werte, 0, 31));
            $count++;
        }
    }
    fclose($handle);
    echo "Fertig! $count Zeilen importiert.";
}
?>