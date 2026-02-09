<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Super Admin siempre tiene acceso
        if ($user->isSuperAdmin()) {
            return $next($request);
        }

        // Verificar si el usuario tiene al menos un permiso
        if ($user->getAllPermissions()->isEmpty()) {
            abort(403, 'No tienes permisos para acceder al sistema.');
        }

        return $next($request);
    }
}
