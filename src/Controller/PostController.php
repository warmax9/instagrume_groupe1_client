<?php

namespace App\Controller;

use App\Utils\Api;
use App\Utils\JsonConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/post')]
class PostController extends AbstractController
{
    public function __construct(private Api $api, private JsonConverter $jsonConverter)
    {
    }
    
    #[Route('/{id}', name: 'post')]
    public function index($id): Response
    {
        $post = $this->api->fetch(sprintf("/posts/%d", $id), "GET", null);
        return $this->render('post/index.html.twig', ['post' => $post]);
    }

    
    #[Route('/like', methods: ['POST'])]
    public function likePost(Request $request){
        $data = json_decode($request->getContent(), true);
        $user = $this->api->fetch("/myself", "GET", null);
        $data["user_id"] = $user['id'];
        $response = $this->api->fetch("/likes", "POST" , $this->jsonConverter->encodeToJson($data));
        $result["action"] = "creation";
        if(!isset($response['result'])){
            if($response['value'] != $data['value']){
                $data["id"] = $response['id'];
                $this->api->fetch("/likes", "PUT" , $this->jsonConverter->encodeToJson($data));
                $result["action"] = "modification";
            }
            else{
                $response = $this->api->fetch("/likes/". $response['id'], "DELETE", null);
                $result["action"] = "supression";
            }
        }
        return new Response($this->jsonConverter->encodeToJson($result));
    }
}
