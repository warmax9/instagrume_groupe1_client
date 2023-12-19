<?php

namespace App\Controller;

use App\Utils\Api;
use App\Utils\JsonConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    public function __construct(private Api $api, private JsonConverter $jsonConverter)
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

    #[Route('/user/edit/{id}', name: 'user_edit', methods: ['POST'])]
    public function edit($id, Request $request)
    {
        if(!empty($request->request->get('old-password')) && !empty($request->request->get('username'))){
            $data['id'] = $id;
            $data['username'] = $request->request->get('username');
            if(!empty($request->request->get('new-password'))){
                $data['password'] = $request->request->get('new-password');
            }
            $user = $this->api->fetch('/user/edit', 'PUT', $this->jsonConverter->encodeToJson($data));

            $oldPassword = $request->request->get('old-password');

            $json = $this->jsonConverter->encodeToJson(['username' => $user['username'], 'password' => !empty($data['password']) ? $data['password'] : $oldPassword]);
            $response = $this->api->fetch("/login", "POST" , $json);
            $session = $request->getSession();
            $session->set('token', $response['token']);
            $user = $this->api->fetch("/myself", "GET" , null);
            $session->set('profile_picture', $user['photo']);
        }
        return $this->redirectToRoute('user');
    }
}
