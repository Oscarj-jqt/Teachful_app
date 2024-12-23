<?php

# Controleur gérant les routes CRUD de Produits
namespace App\Controller;

use App\Entity\Categories;
use App\Entity\Produits;
// interraction avec la base de donnée
use Doctrine\ORM\EntityManagerInterface; 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProduitController extends AbstractController
{


    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    // Route pour récupérer les produits (get)
    #[Route(path:'api/produits', name:'get_produits', methods:['GET'])]
    public function getProduits(ProduitsRepository $produitsRepository)
    {
        {
            $produits = $produitsRepository->findAll();
            return $this->json($produits);
        }
        
    }

    // Création d'un produit (post) 
    #[Route('/api/produits', name: 'create_produit', methods: ['POST'])]
    public function createProduit(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // On récupère les informations du body avec json_decode
        $data = json_decode($request->getContent(), true);

        // Système de validation pour l'ajout de produit avec le controleur
        if (!$data['nom'] || !$data['prix'] || !$data['categorie_relation_id']) {
            return new JsonResponse(['error' => 'Données manquantes.'], 400);
        }

        // Création d'un nouveau produit
        $produit = new Produits();
        // Gestion des attributs
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);


        // categorie_id un id correspondant à une catégorie dans la base de donnée
        $categorie = $entityManager->getRepository(Categories::class)->find($data['categorie_relation_id']);
        if (!$categorie) {
            return new JsonResponse(['error' => 'La catégorie est introuvable.'], JsonResponse::HTTP_NOT_FOUND);
        }

        // On affecte la catégorie récupérée
        $produit->setCategorieRelation($categorie);
        $produit->setDateDeCreation(new \DateTime());


        // sauvegarde dans la bdd
        $entityManager->persist($produit);
        $entityManager->flush();

        // Donnée json du produit créé
        return new JsonResponse([
            'status' => 'success',
            'message' => 'Le nouveau produit a été créé avec succès !',
            'produit' => $produit
        ], Response::HTTP_CREATED);
    }

    // Récupérer un produit
    #[Route('/api/produits/{id}', name: 'get_produit', methods: ['GET'])]
    public function getProduit(int $id, EntityManagerInterface $entityManager): Response
    {
        // Même chose mais avec l'id
        $produit = $entityManager->getRepository(Produits::class)->find($id);

        // gestion de validation
        if (!$produit) {
            return new Response('Erreur ! Produit non trouvé', Response::HTTP_NOT_FOUND);
        }

        // Retourner le produit
        return $this->json($produit);

        
    }
    #[Route('/api/produits/{id}', name: 'update_produit', methods: ['PUT'])]
    public function updateProduit(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $produit = $entityManager->getRepository(Produits::class)->find($id);
        //Sélection et vérification du produit
        if (!$produit) {
            return new JsonResponse('Erreur ! Produit non trouvé', Response::HTTP_NOT_FOUND);
        }
        


        $data = json_decode($request->getContent(), true);

        // Validation pour la modification de produit
        if (empty($data['nom']) || empty($data['prix'])) {
            return new JsonResponse(['message' => 'Le nom et le prix sont obligatoires'], Response::HTTP_BAD_REQUEST);
        }


        if ($data['prix'] < 0) {
            return new JsonResponse(['message' => 'Le prix ne peut pas être en-dessous de 0'], Response::HTTP_BAD_REQUEST);
        }

        // On vérifie aussi si la catégorie existe
        $categorie = $entityManager->getRepository(Categories::class)->find($data['categorie_id']);

        if (!$categorie) {
            return new JsonResponse(['message' => 'La catégorie n\'existe pas'], Response::HTTP_BAD_REQUEST);
        }
        

        // Application des modifications au produit
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);
        $produit->setCategorieRelation($categorie);

        // Sauvegarde de la màj dans la bdd
        $this->getDoctrine()->getManager()->flush();

        return new JsonResponse(['message' => 'Produit mis à jour avec succès']);
    }

    // Suppression d'un produit (delete)
    #[Route('/api/produits/{id}', name: 'delete_produit', methods: ['DELETE'])]
    public function deleteProduit(int $id, EntityManagerInterface $entityManager): Response
    {
        $produit = $entityManager->getRepository(Produits::class)->find($id);
        // On vérifie si ce produit existe bien
        if (!$produit) {
            return new Response('Erreur ! Produit non trouvé', Response::HTTP_NOT_FOUND);
        }

        // Supprimer le produit
        $entityManager->remove($produit);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Produit supprimé avec succès']);
    }

}
