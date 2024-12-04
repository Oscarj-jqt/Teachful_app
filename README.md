# Teachful


Ce projet simule une plateforme de gestion de produits et catégories, avec une API backend en Symfony et un frontend en React. Le but était de créer une interface utilisateur interactive permettant de gérer des produits et des catégories, avec des fonctionnalités comme l'ajout de produits, la gestion des relations entre catégories et produits, la validation des données, et l'authentification via JWT. Une démo fonctionnelle est hébergée sur **Vercel**.


## Description des Choix Techniques

### Backend - Symfony
- **Symfony** a été choisi pour sa robustesse dans la gestion d'APIs et la manipulation de bases de données. Il est bien adapté pour créer des services web sécurisés avec des validations complexes.
- **JWT** (JSON Web Tokens) est utilisé pour l'authentification des utilisateurs. Ce système permet d'assurer une communication sécurisée entre le frontend et le backend.

### Frontend - React
- **React** a été choisi pour son dynamisme dans la création de composants réutilisables et son intégration facile avec des APIs REST.
- **TailwindCSS** est utilisé pour une gestion rapide et efficace du design responsive.
- **Redux** est utilisé pour la gestion de l'état global de l'application, en particulier pour gérer les produits et les catégories.


## Prérequis

Il faudra installer :

- **PHP** 8.1 ou supérieur
- **Composer** pour les dépendances PHP
- **Node.js** 16.x ou supérieur
- **npm** ou **yarn** pour les dépendances JavaScript
- **Base de données** (MySQL ou PostgreSQL)
- **JWT** pour l'authentification sécurisée


### Instructions pour l'installation

 **Cloner le projet** :
```bash
git clone https://github.com/Oscarj-jqt/Teachful_app
cd Teachful_app
```

**Installer les dépendances du backend**
```bash
composer install
```
**Configurer la base de données dans le fichier .env**
```bash
DATABASE_URL="mysql://root:password@127.0.0.1:3306/nom_de_la_base?serverVersion=5.7"
```

**Créer la base de données et appliquer les migrations**
```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

**Configurer l'authentification JWT**
```bash
composer require lexik/jwt-authentication-bundle
```

**Lancer le serveur Symfony**
```bash
symfony serve -d
```

**Partie Frontend**

cd frontend

**Installer les dépendances**
```bash
npm install
```

**Lancer l'application React**
```bash
npm start
```


L'application React est hébergé ici :
https://teachful-app.vercel.app
