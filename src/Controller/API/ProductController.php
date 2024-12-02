<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductController extends AbstractController
{



    #[Route("/api/products")]
    public function index(ProduitsRepository $repository)
    {
        $products = $repository->findAll();
        return $this->json($produits);

    }
}



?>