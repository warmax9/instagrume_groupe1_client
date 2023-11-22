<?php

namespace App\Utils;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class Api
{
    private string $url = 'http://localhost:3000';
    public function __construct(
        private readonly HttpClientInterface $client
    ) {
        $this->client->withOptions([
            'base_uri' => $this->url,
            'no_proxy' => '127.0.0.1'
        ]);
    }

    public function fetch(string $url, string $method, ?string $data)
    {
        $response = $this->client->request(
            $method,
            $url,
            $data ? [ 'body' => $data ] : []
        );
        $content = $response->getContent();
        $content = $response->toArray();
        return $content;
    }
}
