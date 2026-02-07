<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Error del Servidor - {{ config('app.name') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>

<body class="font-sans antialiased bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
    <div class="min-h-screen flex flex-col justify-center items-center px-4">
        <div class="mb-8 text-center">
            <h1 class="text-6xl font-bold text-gray-900 mb-2">500</h1>
            <h2 class="text-3xl font-semibold text-gray-700 mb-2">Error del Servidor</h2>
        </div>

        <div class="max-w-lg mx-auto text-center mb-8">
            <p class="text-lg text-gray-600 mb-4">
                Algo salió mal en nuestros servidores. Estamos trabajando para solucionarlo.
            </p>
            <p class="text-sm text-gray-500">
                Por favor, intenta nuevamente en unos minutos.
            </p>
        </div>

        <div class="bg-white/95 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto border border-gray-200 backdrop-blur-sm">
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.745-.398a3.752 3.752 0 00-.704-1.238 2.25 2.25 0 00-3.182 0 3.752 3.752 0 00-.704 1.238l-2.745.398a2 2 0 00-1.022.547L5.5 12a2 2 0 000 2.828l1.804 1.072a2 2 0 001.022.547l2.745.398a3.752 3.752 0 00.704 1.238 2.25 2.25 0 003.182 0 3.752 3.752 0 00.704-1.238l2.745-.398a2 2 0 001.022-.547L18.5 14.828A2 2 0 0018.5 12l-1.072-1.572z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Sistema de Gestión de Tickets</h3>
                <p class="text-gray-600 text-sm mb-6">
                    Municipalidad de San Miguel - San Román
                </p>
            </div>

            <div class="space-y-3">
                <button
                    onclick="window.location.reload()"
                    class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300">
                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Intentar Nuevamente
                </button>

                <button
                    onclick="window.history.back()"
                    class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-gray-300 hover:border-gray-400">
                    <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Volver Atrás
                </button>
            </div>
        </div>

        <!-- Información adicional -->
        <div class="mt-8 text-center max-w-md mx-auto">
            <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div class="flex items-center justify-center mb-2">
                    <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.768 0L3.045 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <span class="text-sm font-medium text-orange-800">Error Temporal</span>
                </div>
                <p class="text-xs text-orange-700">
                    Si el problema persiste, contacta al soporte técnico.
                </p>
            </div>
        </div>

        <div class="mt-8 text-center">
            <p class="text-xs text-gray-500">
                © {{ date('Y') }} Municipalidad de San Miguel - San Román. Todos los derechos reservados.
            </p>
        </div>
    </div>

    <script>
        // Auto-reload cada 30 segundos si no se resuelve
        setTimeout(function() {
            if (confirm('¿Deseas intentar recargar la página automáticamente?')) {
                window.location.reload();
            }
        }, 30000);
    </script>
</body>

</html>