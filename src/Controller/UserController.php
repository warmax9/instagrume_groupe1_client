<?php

namespace App\Controller;

use App\Utils\Api;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('/search', name:'search')]
    public function search(): Response
    {
        return $this->render('search/index.html.twig');
    }

    #[Route('/userByTerm', methods: ['GET', 'POST'])]
    public function findUserByTerm(Request $request): JsonResponse
    {
        $searchTerm = $request->query->get('searchTerm');
        $data = $this->api->fetch('/userByTerm?searchTerm='.$searchTerm, 'GET', null);
        return new JsonResponse($data);
    }

    #[Route('/user/{id}', name: 'userById')]
    public function userById($id): Response
    {
        $user = $this->api->fetch('/user/'.$id, 'GET', null);
        return $this->render('user/display.html.twig', ['user' => $user]);
    }
}
