<?php
namespace App\Controller;

use App\Utils\Api;
use App\Utils\JsonConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CommentaireController extends AbstractController
{
    public function __construct(private Api $api, private JsonConverter $jsonConverter)
    {
    }

    #[Route('/commentaire', methods: ['POST'])]
    public function commente(Request $request){
        $data = json_decode($request->getContent(), true);
        $user = $this->api->fetch("/myself", "GET", null);
        $data["user_id"] =  $user["id"];
        $response = $this->api->fetch("/commentaire", "POST" , $this->jsonConverter->encodeToJson($data));
        return $this->render('post/commentaire.html.twig', ['post' => $response, 'myId' => $user['id']]);
        //return new Response($this->jsonConverter->encodeToJson($response));
    }

    #[Route('/commentaire/{id}', methods: ['DELETE'])]
    public function delete($id){
        $this->api->fetch("/commentaire/". $id, "DELETE" , null);
        return new Response("succes");
    }

    #[Route('/commentaire/{postId}', methods: ['GET'])]
    public function getPost($postId){
        $user = $this->api->fetch("/myself", "GET", null);
        $response = $this->api->fetch("/posts/". $postId, "GET" , null);
        return $this->render('post/commentaire.html.twig', ['post' => $response, 'myId' => $user['id']]);
    }

    #[Route('/commentaire', methods: ['PUT'])]
    public function updateComment(Request $request){
        $data = json_decode($request->getContent(), true);
        $response = $this->api->fetch("/commentaire", "PUT" , $this->jsonConverter->encodeToJson($data));
        return new Response($this->jsonConverter->encodeToJson(["reponse" => "ok"]));
    }
}