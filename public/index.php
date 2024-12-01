<?php

use App\Kernel;

require_once __DIR__ . '/../vendor/autoload.php';

// Initialisation de Faker
use Faker\Factory;

// Connexion à la base de données
$host = '127.0.0.1';
$db   = 'teachful_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    // Connexion à la base de données avec PDO
    $pdo = new PDO($dsn, $user, $pass);
    echo "Connexion réussie à la base de données !";
} catch (\PDOException $e) {
    // En cas d'erreur, afficher l'erreur
    echo "Erreur de connexion : " . $e->getMessage();
}



?>