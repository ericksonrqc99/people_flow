<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Página No Encontrada - {{ config('app.name') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>

<body class="font-sans antialiased bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
    <div class="min-h-screen flex flex-col justify-center items-center px-4">

        <div class="mb-8 text-center">
            <h1 class="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <h2 class="text-3xl font-semibold text-gray-700 mb-2">Página No Encontrada</h2>
        </div>

        <div class="max-w-lg mx-auto text-center mb-8">
            <p class="text-lg text-gray-600 mb-4">
                La página que buscas no existe o ha sido movida.
            </p>
            <p class="text-sm text-gray-500">
                Verifica la URL o regresa a la página principal.
            </p>
        </div>

        <div class="bg-white/95 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto border border-gray-200 backdrop-blur-sm">
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Sistema de Gestión de Tickets</h3>
                <p class="text-gray-600 text-sm mb-6">
                    Municipalidad de San Miguel - San Román
                </p>
            </div>

            <div class="space-y-3">
                <button
                    onclick="window.history.back()"
                    class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300">
                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Volver Atrás
                </button>
            </div>
        </div>

        <div class="mt-8 text-center">
            <p class="text-xs text-gray-500">
                © {{ date('Y') }} Municipalidad de San Miguel - San Román. Todos los derechos reservados.
            </p>
        </div>
    </div>
</body>

</html>