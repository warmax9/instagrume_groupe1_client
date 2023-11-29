<?php

namespace App\Controller;

use App\Utils\Api;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{

    public function __construct(private Api $api)
    {
    }

    #[Route('/', name: 'home', methods: ['GET'])]
    public function index(): Response
    {
        $this->api->fetch("/posts", "GET", null);
        return $this->render('home/index.html.twig');
    }
}
