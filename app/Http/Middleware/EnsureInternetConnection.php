<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class EnsureInternetConnection
{
    /**
     * Verifica que exista conexión a internet antes de continuar con la solicitud.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->hasInternetConnection()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Conéctese a internet para continuar.',
                ], Response::HTTP_SERVICE_UNAVAILABLE);
            }

            return response()->view('errors.no-internet', [], Response::HTTP_SERVICE_UNAVAILABLE);
        }

        return $next($request);
    }

    private function hasInternetConnection(): bool
    {
        try {
            $response = Http::timeout(2)
                ->retry(1, 200)
                ->withoutVerifying()
                ->get('https://www.google.com/generate_204');

            return $response->successful();
        } catch (Throwable $th) {
            return false;
        }
    }
}
