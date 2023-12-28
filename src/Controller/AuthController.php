<?php

namespace App\Controller;

use App\Utils\Api;
use App\Utils\JsonConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/auth')]
class AuthController extends AbstractController
{
    public function __construct(private Api $api, private JsonConverter $jsonConverter, private RequestStack $requestStack)
    {
    }

    #[Route('/', name: 'auth', methods: ['GET', "POST"])]
    public function auth(): Response
    {
        return $this->render('auth/auth.html.twig');
    }

    #[Route('/login', name: 'login', methods: ['GET', "POST"])]
    public function login(Request $request): Response
    {
        $username = $request->request->get('username');
        $password = $request->request->get('password');
        if (!empty($username) && !empty($password)) {
            $data = $this->jsonConverter->encodeToJson(['username' => $username, 'password' => $password]);
            $responseObject = $this->api->fetch("/login", "POST" , $data);
            if($responseObject['token'] == null){
                return $this->redirect('/auth');
            }
            $session = $request->getSession();
            $session->set('token', $responseObject['token']);
            $user = $this->api->fetch("/myself", "GET" , null);
            if($user['is_banned']){
                return $this->render('auth/auth.html.twig', ["isBanned" => true]);
            }
            $session->set('profile_picture', $user['photo']);
            $session->set('myId', $user['id']);
            if(in_array("ROLE_ADMIN", $user['roles'])){
                $session->set('role', 'admin');
            }
            else{
                $session->set('role', 'user');
            }
            return $this->redirect('/');
        }
        return $this->render('auth/login.html.twig');
    }

    #[Route('/register', name: 'register', methods: ['GET', 'POST'])]
    public function register(Request $request): Response
    {
        $username = $request->request->get('username');
        $password = $request->request->get('password');
        if(!empty($username) && !empty($password)){
                $data = $this->jsonConverter->encodeToJson(['username' => $username, 'password' => $password]);
                $responseObject = $this->api->fetch("/register", "POST" , $data);
                return $this->redirect('/auth');
        }
        return $this->render('auth/register.html.twig');
    }

    #[Route('/logout', name: 'logout')]
    public function logout(): Response
    {
        $this->requestStack->getSession()->clear();
        return $this->redirectToRoute('home');
    }
}
