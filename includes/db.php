<?php
$host = 'localhost';
$db   = 'straftaten_opfer';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
} catch (PDOException $e) {
    die(json_encode(['error' => $e->getMessage()]));
}
