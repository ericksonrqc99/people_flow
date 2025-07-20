<?php


namespace App\Services;

use App\Models\Token;
use GuzzleHttp\Client;

class FactilizaApiService
{

    protected static $baseUrlService = "https://api.factiliza.com/";
    protected static $apiServiceName = "factiliza";

    public static function getDataCitizenByDni($dni)
    {

        $activatedToken = self::getActivatedAccessToken();
        // dd($activatedToken);
        $client = new Client(['base_uri' => self::$baseUrlService, 'verify' => false]);
        $parameters = [
            'http_errors' => false,
            'connect_timeout' => 5,
            'headers' => [
                'Authorization' => 'Bearer ' . $activatedToken,
                'Referer' => 'https://api.factiliza.com/',
                'User-Agent' => 'laravel/guzzle',
                'Accept' => 'application/json',
            ]

        ];
        $res = $client->request('GET', 'v1/dni/info/' . $dni, $parameters);

        $statusCode = $res->getStatusCode();

        $body = $res->getBody()->getContents();
        $response = json_decode($body, true);

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
            ->where('service', self::$apiServiceName)
            ->first();
        if (!$found) return null;
        return $found->id;
    }

    public static function changeActivatedToken()
    {

        $idTokens = Token::where('service', self::$apiServiceName)->pluck('id')->toArray();
        $activeTokenId = self::getActivedTokenId();

        // deactive all tokens
        Token::where('service', self::$apiServiceName)->update(['is_active' => 0]);

        if ($activeTokenId == end($idTokens)) {
            Token::where('id', $idTokens[0])->update(['is_active' => 1]);
        } else {
            $nextIdToken = $idTokens[array_search($activeTokenId, $idTokens) + 1];
            Token::where('id', $nextIdToken)->update(['is_active' => 1]);
        };
    }

    public static function mapCitizen(array $citizenRaw): array
    {
        $newCitizen = [];
        $newCitizen['dni'] = trim($citizenRaw['numero']);
        $newCitizen['names'] = trim($citizenRaw['nombres']);
        $newCitizen['first_surname'] = trim($citizenRaw['apellido_paterno']);
        $newCitizen['second_surname'] = trim($citizenRaw['apellido_materno']);
        $newCitizen['departament'] = trim($citizenRaw['departamento']);
        $newCitizen['province'] = trim($citizenRaw['provincia']);
        $newCitizen['district'] = trim($citizenRaw['distrito']);
        $newCitizen['address'] = trim($citizenRaw['direccion']);

        return $newCitizen;
    }
}
