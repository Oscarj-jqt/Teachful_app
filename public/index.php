<?php
require_once __DIR__ . '/../vendor/autoload.php';



use App\Kernel;
use App\Entity\Produits;
use App\Entity\Categories;


// Initialisation de Faker
use Faker\Factory;
$faker = Factory::create('fr_FR');

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
    echo "Erreur de connexion : ";
}

// Insertion des catégories
$categories = ['Electronique', 'Livre', 'Maison', 'Vêtement', 'Sport'];


foreach ($categories as $categorieNom) {
    // Vérification si la catégorie existe déjà dans la base de données
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM categories WHERE nom = :nom");
    $stmt->execute([':nom' => $categorieNom]);
    $count = $stmt->fetchColumn();

    // Si la catégorie n'existe pas déjà, on l'insère
    if ($count == 0) {
        // on insère
        $stmt = $pdo->prepare("INSERT INTO categories (nom) VALUES (:nom)");
        $stmt->execute([':nom' => $categorieNom]);
        echo "Catégorie '$categorieNom' insérée.\n";
    } else {
        echo "La catégorie '$categorieNom' existe déjà.\n";
    }
    echo "Catégorie '$categorieNom' insérée.\n";
}


?>