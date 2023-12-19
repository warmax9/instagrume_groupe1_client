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
        $response = $this->api->fetch("/commentaire", "POST" , $this->jsonConverter->encodeToJson($data));
        
    }
}