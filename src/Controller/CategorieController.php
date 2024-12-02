<?php

namespace App\Controller;

use App\Entity\Categories;
use App\Entity\Produits;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

// Même façon qu'avec productcontroller
class CategorieController extends AbstractController
{
    // Récupérer toutes les catégories
    #[Route('/api/categories', name: 'get_categories', methods: ['GET'])]
    public function getCategories(CategoriesRepository $categoriesRepository)
{
    $categories = $categoriesRepository->findAll();
    return $this->json($categories);
}

    // Création d'une catégorie
    #[Route('/api/categories', name: 'create_categorie', methods: ['POST'])]
    public function createCategorie(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        // Validation des données
        if (empty($data['nom'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Le nom de la catégorie est obligatoire'], 400);
        }

        // Création d'une catégorie
        $categorie = new Categories();
        $categorie->setNom($data['nom']);

        // Sauvegarde
        $entityManager->persist($categorie);
        $entityManager->flush();

        return new JsonResponse(['message' => 'La nouvelle catégorie a été créée'], Response::HTTP_CREATED);
    }

    #[Route('/api/categories/{id}', name: 'get_categorie', methods: ['GET'])]
    public function getCategorie(int $id, EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(Categories::class)->find($id);

        if (!$categorie) {
            return new JsonResponse('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        return $this->json($categorie);
    }

    // Mettre à jour une catégorie
    #[Route('/api/categories/{id}', name: 'update_categorie', methods: ['PUT'])]
    public function updateCategorie(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(Categories::class)->find($id);

        if (!$categorie) {
            return new Response('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        // On récupère les données envoyés
        $data = json_decode($request->getContent(), true);

        // Validation des données
        if (empty($data['nom'])) {
            return new JsonResponse(['message' => 'Le nom de la catégorie est obligatoire'], 400);
        }

        // Mise à jour de la catégorie
        $categorie->setNom($data['nom']);

        $entityManager->flush();

        return new JsonResponse(['message' => 'Catégorie mise à jour avec succès']);
    }

    // Supprimer une catégorie
    #[Route('/api/categories/{id}', name: 'delete_categorie', methods: ['DELETE'])]
    public function deleteCategorie(int $id, EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(Categories::class)->find($id);

        if (!$categorie) {
            return new JsonResponse('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        // Suppression dans la bdd
        $entityManager->remove($categorie);
        $entityManager->flush();

        return new JsonResponse(['message' => 'La catégorie a bien été supprimée']);
    }
}
