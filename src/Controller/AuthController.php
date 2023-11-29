<?php

namespace App\Controller;

use App\Utils\Api;
use App\Utils\JsonConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/auth')]
class AuthController extends AbstractController
{
    public function __construct(private Api $api, private JsonConverter $jsonConverter)
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
            $session = $request->getSession();
            $session->set('token',  $responseObject['token']);
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
                return $this->redirect('/');
        }
        return $this->render('auth/register.html.twig');
    }
}
