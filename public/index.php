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

// Insertion des produits
$produitsCount = 50;

// for ($i = 0; $i < $produitsCount; $i++) {
//     // Générer des données pour le produit
//     $nom = uniqid('Produit_', true);
//     $prix = rand(10, 1000);
//     $description = 'Description du produit ' . $nom;
    
//     // Sélectionner une catégorie au hasard
//     $categorie_id = rand(1, count($categories));  // Assure-toi que l'ID est valide dans la table

//     // Requête d'insertion pour les produits
//     $query = "INSERT INTO produits (nom, prix, description, date_de_creation, categorie_id) VALUES (:nom, :prix, :description, NOW(), :categorie_id)";
//     $stmt = $pdo->prepare($query);

//     $stmt->execute([
//         ':nom' => $nom,
//         ':prix' => $prix,
//         ':description' => $description,
//         ':categorie_id' => $categorie_id
//     ]);
    
//     echo "Produit '$nom' inséré.\n";

// }


?>