<?php

namespace App\Controller;

use App\Entity\Categories;
use App\Entity\Produits;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

// Même façon qu'avec productcontroller
class CategorieController extends AbstractController
{
    // Récupérer toutes les catégories
    #[Route('/api/categories', name: 'get_categories', methods: ['GET'])]
    public function getCategories(EntityManagerInterface $entityManager): Response
    {
        // teste récupération de toutes les catégories
        $categories = $entityManager->getRepository(Categories::class)->findAll();
        $data = [];

        foreach ($categories as $categorie) {
            $data[] = [
                'id' => $categorie->getId(),
                'nom' => $categorie->getNom(),
            ];
        }

        return $this->json($data);
    }

    // Création d'une catégorie
    #[Route('/api/categories', name: 'create_categorie', methods: ['POST'])]
    public function createCategorie(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        // Validation des données
        if (empty($data['nom'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'Le champ "nom" est obligatoire'], 400);
        }

        
        $categorie = new Categories();
        $categorie->setNom($data['nom']);

        $entityManager->persist($categorie);
        $entityManager->flush();

        return $this->json($categorie, Response::HTTP_CREATED);
    }

    #[Route('/api/categories/{id}', name: 'get_categorie', methods: ['GET'])]
    public function getCategorie(int $id, EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(Categories::class)->find($id);

        if (!$categorie) {
            return new Response('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        return $this->json($categorie);
    }

    // Mettre à jour une catégorie
    #[Route('/api/categories/{id}', name: 'update_categorie', methods: ['PUT'])]
    public function updateCategorie(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $categorie = $entityManager->getRepository(Categories::class)->find($id);

        if (!$categorie) {
            return new Response('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        $categorie->setNom($data['nom']);

        $entityManager->flush();

        return $this->json($categorie);
    }

    // Supprimer une catégorie
    #[Route('/api/categories/{id}', name: 'delete_categorie', methods: ['DELETE'])]
    public function deleteCategorie(int $id, EntityManagerInterface $entityManager): Response
    {
        $categorie = $entityManager->getRepository(Categories::class)->find($id);

        if (!$categorie) {
            return new Response('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($categorie);
        $entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
