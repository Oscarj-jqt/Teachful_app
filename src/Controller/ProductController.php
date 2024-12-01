<?php

# Controleur gérant les routes CRUD de Produits
namespace App\Controller;
use App\Entity\Produits;
// interraction avec la base de donnée
use Doctrine\ORM\EntityManagerInterface; 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ProductController extends AbstractController
{
    // Route pour récupérer les produits (get)
    #[Route(path:'api/produits', name:'get_produits', methods:['GET'])]
    public function getProduits(EntityManagerInterface $entityManager): Response
    {
        // Teste de récupération des produits
        $produits = $entityManager->getRepository(Produits::class)->findAll();
        $data = [];
        foreach ($produits as $produit) {
            $data[] = [
                'id' => $produit->getId(),
                'nom' => $produit->getNom(),
                'description' => $produit->getDescription(),
                'prix' => $produit->getPrix(),
                'categorie' => $produit->getCategorie(),
                'date_de_creation' => $produit->getDateDeCréation(),
            ];
        }
        // Conversion en json
        return $this->json($data);
    }

    // Création d'un produit (post) 
    #[Route('/api/produits', name: 'create_produit', methods: ['POST'])]
    public function createProduit(Request $request, EntityManagerInterface $entityManager): Response
    {
        // Récupérer les données envoyées dans le body de la requête
        $data = json_decode($request->getContent(), true);

        // Création de l'objet
        $produit = new Produits();
        // Gestion des attributs
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);
        $produit->setCategorie($data['catégorie']);
        $produit->setDateDeCréation(date('Y-m-d H:i:s'));

        // Sauvegarde dans la bdd
        $entityManager->persist($produit);
        $entityManager->flush();

        return $this->json($produit, Response::HTTP_CREATED);

    }

    // Récupérer un produit
    #[Route('/api/produits/{id}', name: 'get_produit', methods: ['GET'])]
    public function getProduit(int $id, EntityManagerInterface $entityManager): Response
    {
        // Même chose mais avec l'id
        $produit = $entityManager->getRepository(Produits::class)->find($id);

        // gestion d'erreur
        if (!$produit) {
            return new Response('Erreur ! Produit non trouvé', Response::HTTP_NOT_FOUND);
        }

        // Retourner le produit
        return $this->json($produit);

        
    }
    #[Route('/api/produits/{id}', name: 'update_produit', methods: ['PUT'])]
    public function updateProduit(int $id, Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        //Sélection du produit
        $produit = $entityManager->getRepository(Produits::class)->find($id);

        if (!$produit) {
            return new Response('Erreur ! Produit non trouvé', Response::HTTP_NOT_FOUND);
        }

        // Rappel de la méthode post
        $produit->setNom($data['nom']);
        $produit->setDescription($data['description']);
        $produit->setPrix($data['prix']);
        $produit->setCategorie($data['catégorie']);

        // Sauvegarde de la màj dans la bdd
        $entityManager->flush();

        return $this->json($produit);
    }

    // Suppression d'un produit (delete)
    #[Route('/api/produits/{id}', name: 'delete_produit', methods: ['DELETE'])]
    public function deleteProduit(int $id, EntityManagerInterface $entityManager): Response
    {
        $produit = $entityManager->getRepository(Produits::class)->find($id);
        
        if (!$produit) {
            return new Response('Erreur ! Produit non trouvé', Response::HTTP_NOT_FOUND);
        }

        // Supprimer le produit
        $entityManager->remove($produit);
        $entityManager->flush();

        return new Response(null, Response::HTTP_NO_CONTENT);
    }

}
