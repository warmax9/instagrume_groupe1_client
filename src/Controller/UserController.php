<?php

namespace App\Controller;

use App\Utils\Api;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    public function __construct(private Api $api)
    {
    }

    #[Route('/user', name: 'user')]
    public function index(): Response
    {
        $user = $this->api->fetch("/myself", "GET", null);
        return $this->render('user/index.html.twig', ['user' => $user]);
    }
}
