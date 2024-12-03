<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AuthController extends AbstractController
{
    private $userRepository;
    private $passwordHasher;
    private $jwtManager;

    public function __construct(
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtManager
    ) {
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
        $this->jwtManager = $jwtManager;
    }


    public function login(Request $request): JsonResponse
    {
        dump('login called');
        $data = json_decode($request->getContent(), true);
        dump($data);
        die();

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (null === $email || null === $password) {
            return new JsonResponse(['message' => 'Missing credentials'], 400);
        }

        // Recherche de l'utilisateur par email
        $user = $this->userRepository->findOneBy(['email' => $email]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['message' => 'Invalid credentials'], 401);
        }

        // Si l'utilisateur est valide, générer un token JWT
        $token = $this->jwtManager->create($user);

        return new JsonResponse(['token' => $token]);
    }
}

?>
