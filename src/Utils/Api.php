<?php

namespace App\Utils;

use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class Api
{
    private string $url = 'http://localhost:3000/api';
    public function __construct(
        private readonly HttpClientInterface $client,
        private RequestStack $requestStack
    ) {
        $this->client->withOptions([
            'base_uri' => $this->url,
            'no_proxy' => '127.0.0.1'
        ]);
    }

    public function fetch(string $url, string $method, ?string $data)
    {
        $token = $this->requestStack->getSession()->get('token');

        $options = $data ? ['body' => $data] : [];

        if ($token !== null) {
            $options['auth_bearer'] = $token;
        }

        $response = $this->client->request(
            $method,
            $this->url . $url,
            $options
        );
        
        $content = $response->getContent() == 'null' ? $response->getContent() : $response->toArray();
        return $content;
    }
}
