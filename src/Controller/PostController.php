<?php

namespace App\Controller;

use App\Utils\Api;
use App\Utils\JsonConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class PostController extends AbstractController
{
    public function __construct(private Api $api, private JsonConverter $jsonConverter)
    {
    }

    #[Route('/post/{id}', name: 'post_home')]
    public function index($id): Response
    {
        $post = $this->api->fetch(sprintf("/posts/%d", $id), "GET", null);
        $mySelf = $user = $this->api->fetch("/myself", "GET", null);
        if(is_array($user)){
            return $this->render('post/index.html.twig', ['post' => $post, 'myId' => $mySelf['id']]);
        }
        return $this->render('post/index.html.twig', ['post' => $post, 'myId' => null]);
    }

    #[Route('/post/edit', name: 'post_edit', methods: ['PUT'])]
    public function edit(Request $request)
    {
        if(!empty($request->request->get('id')) && empty($request->request->get('del'))){
            $data['id'] = $request->request->get('id');
            if(!empty($request->request->get('is_open'))) $data['is_open'] = $request->request->get('is_open');
            if(!empty($request->request->get('description'))) $data['description'] = $request->request->get('description');
    
            $this->api->fetch('/posts', "PUT", $this->jsonConverter->encodeToJson($data));   
        } elseif (!empty($request->request->get('id')) && !empty($request->request->get('del'))) {
            $this->api->fetch('/posts/'.$request->request->get('id') , "DELETE", null);
        }
        return $this->redirectToRoute('home');
    }

    #[Route('/post', name: 'post_add', methods: ['GET', 'POST'])]
    public function add(Request $request)
    {
        $user = $this->api->fetch("/myself", "GET", null);

        $data= [];
        $data['image'] = base64_encode(file_get_contents($request->files->get('img')->getPathname()));
        if(is_array($user)){
            $data["user_id"] = $user['id'];
        }
        $data['description'] = $request->request->get('description');

        $this->api->fetch('/posts', "POST", $this->jsonConverter->encodeToJson($data));

        return $this->redirectToRoute('home');
    }
}
