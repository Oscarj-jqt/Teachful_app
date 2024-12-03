<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class AuthController
{
    // Première route correspondant à la connexion pour avoir un token JWT
    // Mise en place test Postman
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(): Response
    {
        // Cette route sera interceptée par le firewall JWT
        return new Response('', Response::HTTP_UNAUTHORIZED);
    }
}
