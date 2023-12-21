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
    public function index(Request $request): Response
    {
        $user = $this->api->fetch("/myself", "GET", null);
        if($user['is_modo']){
            $users = $this->api->fetch("/user", 'GET', null);
            return $this->render('user/index.html.twig', ['user' => $user, 'users' => $users]);
        }
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

    #[Route('/user/edit/{id}', name: 'user_edit')]
    public function edit($id, Request $request)
    {
        $username = $request->request->get('username');
        $oldPassword = $request->request->get('old-password');
        $newPassword = $request->request->get('new-password');
        $session = $request->getSession();

        if(!empty($oldPassword) && !empty($username)){
            $data['id'] = $id;
            $data['username'] = $username;
            $user = $this->api->fetch('/user/edit', 'PUT', $this->jsonConverter->encodeToJson($data));

            $json = $this->jsonConverter->encodeToJson(['username' => $user['username'], 'password' => $oldPassword]);
            $response = $this->api->fetch("/login", "POST" , $json);

            sleep(5);
            $session->set('token', $response['token']);
            //$user = $this->api->fetch("/myself", "GET" , null);
            //$session->set('profile_picture', $user['photo']);
            //dd($request->getSession()->get('token'));
            //dd($response);
            dd($session);
        }
        //return $this->redirectToRoute('user');
    }

    #[Route('/user/ban/{id}', name: 'user_ban')]
    public function ban($id, Request $request)
    {
        $data['id'] = $id;
        $data['is_banned'] = $request->request->get('is_banned') ? $request->request->get('is_banned') : false;
        $this->api->fetch('/user/edit', 'PUT', $this->jsonConverter->encodeToJson($data));
        return $this->redirectToRoute('user');
    }
}
