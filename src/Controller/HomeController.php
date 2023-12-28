<?php

namespace App\Controller;

use App\Utils\Api;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{

    public function __construct(private Api $api)
    {
    }

    #[Route('/', name: 'home', methods: ['GET'])]
    public function index(Request $request): Response
    {
        $url = sprintf('/TopPost?filter=%s', $request->query->get('filter'));
        $posts = $this->api->fetch($url, "GET", null);
        $user = $this->api->fetch("/myself", "GET", null);
        if(is_array($user)){
            return $this->render('home/index.html.twig', ["posts" => $posts, "myId" => $user["id"]]);
        }
        return $this->render('home/index.html.twig', ["posts" => $posts, "myId" => null]);
    }
}
