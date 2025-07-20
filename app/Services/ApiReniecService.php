<?php

namespace App\Services;

use App\Models\Token;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Message;
use Illuminate\Database\Console\Migrations\StatusCommand;
use Livewire\Features\SupportTesting\DuskBrowserMacros;

class ApiReniecService
{

    protected static $service = 'api-reniec https://apis.net.pe/';
    protected static $baseUri = 'https://api.apis.net.pe/';





    public static function getDataByDni(string $dni)
    {
        $token = self::getActivatedAccessToken();
        $client = new Client(['base_uri' => self::$baseUri, 'verify' => false]);
        $parameters = [
            'http_errors' => false,
            'connect_timeout' => 5,
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Referer' => 'https://apis.net.pe/api-consulta-dni',
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ],
            'query' => ['numero' => $dni]
        ];
        $res = $client->request('GET', '/v2/reniec/dni', $parameters);
        $statusCode = $res->getStatusCode();

        $body = $res->getBody()->getContents();
        $response = json_decode($body, true);

        if ($statusCode == 429 && $response['message'] == 'Superaste el limite permitido por tu token') {
            self::changeActivatedToken();
            return self::getDataByDni($dni);
        }   
        return $response;
    }


    public static function getActivatedAccessToken()
    {

        $accessToken = Token::where('id', self::getActivedTokenId())->first()->access_token;
        return  $accessToken;
    }

    public static function getActivedTokenId(): ?string
    {

        $found = Token::where('is_active', 1)
            ->where('service', self::$service)
            ->first();
        if (!$found) return null;
        return $found->id;
    }

    public static function changeActivatedToken()
    {

        $idTokens = Token::where('service', self::$service)->pluck('id')->toArray();
        $activeTokenId = self::getActivedTokenId();

        // deactive all tokens
        Token::where('service', self::$service)->update(['is_active' => 0]);

        if ($activeTokenId == end($idTokens)) {
            Token::where('id', $idTokens[0])->update(['is_active' => 1]);
        } else {
            $nextIdToken = $idTokens[array_search($activeTokenId, $idTokens) + 1];
            Token::where('id', $nextIdToken)->update(['is_active' => 1]);
        };
    }

    public static function mapCitizen(array $citizen): array
    {
        $newCitizen = [];
        $newCitizen['names'] = $citizen['nombres'];
        $newCitizen['first_surname'] = $citizen['apellidoPaterno'];
        $newCitizen['second_surname'] = $citizen['apellidoMaterno'];
        $newCitizen['full_name'] = $citizen['nombreCompleto'];
        $newCitizen['dni'] = $citizen['numeroDocumento'];
        $newCitizen['date_of_birth'] = $citizen[''];

        return $newCitizen;
    }
}
