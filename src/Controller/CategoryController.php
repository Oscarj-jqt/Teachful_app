<?php

namespace App\Controller;

use App\Entity\Categories;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

// Même façon qu'avec productcontroller
class CategoryController extends AbstractController
{
    // Récupérer toutes les catégories
    #[Route('/api/categories', name: 'get_categories', methods: ['GET'])]
    public function getCategories(EntityManagerInterface $entityManager): Response
    {
        // teste récupération de toutes les catégories
        $categories = $entityManager->getRepository(Categories::class)->findAll();
        $data = [];

        foreach ($categories as $category) {
            $data[] = [
                'id' => $category->getId(),
                'nom' => $category->getNom(),
            ];
        }

        return $this->json($data);
    }

    // Création d'une catégorie
    #[Route('/api/categories', name: 'create_categorie', methods: ['POST'])]
    public function createCategory(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $category = new Categories();
        $category->setNom($data['nom']);

        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json($category, Response::HTTP_CREATED);
    }

    #[Route('/api/categories/{id}', name: 'get_category', methods: ['GET'])]
    public function getCategory(int $id, EntityManagerInterface $entityManager): Response
    {
        $category = $entityManager->getRepository(Categories::class)->find($id);

        if (!$category) {
            return new Response('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        return $this->json($category);
    }

    // Mettre à jour une catégorie
    #[Route('/api/categories/{id}', name: 'update_category', methods: ['PUT'])]
    public function updateCategory(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $category = $entityManager->getRepository(Categories::class)->find($id);

        if (!$category) {
            return new Response('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        $category->setNom($data['nom']);

        $entityManager->flush();

        return $this->json($category);
    }

    // Supprimer une catégorie
    #[Route('/api/categories/{id}', name: 'delete_category', methods: ['DELETE'])]
    public function deleteCategory(int $id, EntityManagerInterface $entityManager): Response
    {
        $category = $entityManager->getRepository(Categories::class)->find($id);

        if (!$category) {
            return new Response('Erreur ! Catégorie non trouvée', Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($category);
        $entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }
}
