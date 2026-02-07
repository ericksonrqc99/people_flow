<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Acceso Denegado - {{ config('app.name') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>

<body class="font-sans antialiased bg-gray-100 min-h-screen">
    <div class="min-h-screen flex flex-col justify-center items-center px-4">
        <!-- Contenedor Principal -->
        <div class="w-full max-w-2xl bg-white border border-gray-300 shadow">
            <!-- Header -->
            <div class="bg-gray-700 text-white px-6 py-4 border-b border-gray-300">
                <h1 class="text-5xl font-bold">403</h1>
                <h2 class="text-xl font-semibold mt-2">Acceso Denegado</h2>
            </div>

            <!-- Contenido -->
            <div class="p-6 space-y-6">
                <!-- Mensaje Principal -->
                <div>
                    <p class="text-base text-gray-700 mb-3">
                        No tienes permisos suficientes para acceder a esta página.
                    </p>
                    <p class="text-sm text-gray-600">
                        Si crees que esto es un error, contacta con el administrador del sistema.
                    </p>
                </div>

                <!-- Información del Sistema -->
                <div class="bg-gray-50 border border-gray-300 p-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div class="w-10 h-10 bg-gray-700 text-white flex items-center justify-center font-bold">T</div>
                        <div>
                            <h3 class="font-bold text-gray-900">Sistema de Gestión de Tickets</h3>
                            <p class="text-xs text-gray-600">Municipalidad de San Miguel - San Román</p>
                        </div>
                    </div>
                </div>

                <!-- Botones -->
                <div class="flex gap-3">
                    <button
                        onclick="window.history.back()"
                        class="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 border border-gray-800 transition-colors">
                        ← Volver Atrás
                    </button>
                    <button
                        onclick="window.location.href='/'"
                        class="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 transition-colors">
                        Ir a Inicio
                    </button>
                </div>
            </div>

            <!-- Footer -->
            <div class="bg-gray-50 border-t border-gray-300 px-6 py-3 text-center">
                <p class="text-xs text-gray-600">
                    © {{ date('Y') }} Municipalidad de San Miguel - San Román. Todos los derechos reservados.
                </p>
            </div>
        </div>
    </div>
</body>

</html>