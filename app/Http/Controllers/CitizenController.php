<?php

namespace App\Http\Controllers;

use App\Services\ApiReniecService;
use App\Services\FactilizaApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CitizenController extends Controller
{

    public function __construct(public ApiReniecService $apiReniecService, public FactilizaApiService $factilizaApiService) {}

    public function getCitizenByDni(int $dni)
    {
        try {
            // $citizenFound = $this->apiReniecService->getDataByDni($dni);

            $citizenFoundRaw = $this->factilizaApiService->getDataCitizenByDni($dni);

            if (($citizenFoundRaw['status'] ?? null) === 200 &&
                ($citizenFoundRaw['message'] ?? null) === 'Exito' &&
                ($citizenFoundRaw['success'] ?? null) === true
            ) {
                $citizenFound = $this->factilizaApiService->mapCitizen($citizenFoundRaw['data']);
                return response()->json(['ok' => true, 'message' => 'success', ...$citizenFound], 200);
            }
            return response()->json(['ok' => false, 'message' => ($citizenFoundRaw['message'] ?? 'ocurrio un problema, inténtelo nuevamente más tarde')], 200);
        } catch (\Throwable $th) {
            Log::error('Error inesperado', [
                'mensaje' => $th->getMessage(),
                'archivo' => $th->getFile(),
                'linea' => $th->getLine(),
            ]);
        }
    }
}
