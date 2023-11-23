<?php

namespace App\Controller;

use App\Utils\Api;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/auth', name: 'auth')]
class AuthController extends AbstractController
{
    public function __construct(private Api $api)
    {
    }

    #[Route('/', name: 'home', methods: ['GET'])]
    public function auth(): Response
    {
        return $this->render('auth/auth.html.twig');
    }

    #[Route('/login', name: 'login', methods: ['GET'])]
    public function login(): Response
    {
        return $this->render('auth/login.html.twig');
    }

    #[Route('/register', name: 'register', methods: ['GET'])]
    public function register(): Response
    {
        return $this->render('auth/register.html.twig');
    }
}
