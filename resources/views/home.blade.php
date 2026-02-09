<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Inicio - {{ config('app.name') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>

<body class="font-sans antialiased bg-gray-100 min-h-screen">
    <div class="min-h-screen">
        <!-- Header -->
        <div class="bg-gray-700 text-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="py-6 flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold">Sistema de Gestión de Tickets</h1>
                        <p class="text-gray-300 text-sm mt-1">Municipalidad de San Miguel - San Román</p>
                    </div>
                    @if (Auth::check())
                    <div class="flex flex-col items-center gap-4 bg-gray-800 px-4 py-3 rounded border border-gray-600">
                        <div class='flex gap-x-6 items-center'>
                            <div class="text-right">
                                <p class="text-sm font-semibold">{{ Auth::user()->name }}</p>
                                @if (Auth::user()->area)
                                <p class="text-xs text-gray-300">{{ Auth::user()->area->name }}</p>
                                @endif
                            </div>
                            <div class="w-10 h-10 bg-blue-700 flex items-center justify-center font-bold rounded">
                                {{ substr(Auth::user()->name, 0, 1) }}
                            </div>

                            <form action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit" class="bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-3 text-sm border border-red-800 transition-colors">
                                    Cerrar Sesión
                                </button>
                            </form>
                        </div>
                        @if (Auth::check() && (Auth::user()->hasRole(config('filament-spatie-roles-permissions.super_admin_role_name', 'Super Admin')) || Auth::user()->can('Ver Panel Administrativo')))
                        <a href="/admin"
                            class="block w-full text-center bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 border border-gray-800 transition-colors">
                            Panel de administración
                        </a>
                        @endif
                    </div>
                    @else
                    <a href="/admin/login" class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-800 transition-colors">
                        Iniciar sesión
                    </a>
                    @endif
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Bienvenida -->
            <div class="bg-white border border-gray-300 shadow mb-8">
                <div class="px-6 py-4 bg-gray-50 border-b border-gray-300">
                    <h2 class="text-xl font-bold text-gray-900">Bienvenido</h2>
                </div>
                <div class="p-6">
                    <p class="text-gray-700 mb-4">
                        Accede a los módulos disponibles del sistema de gestión de tickets para realizar tus actividades.
                    </p>
                    @if (!Auth::check())
                    <p class="text-gray-600 text-sm">
                        <a href="/admin/login" class="text-blue-700 hover:text-blue-800 font-semibold">Inicia sesión</a> para acceder a los módulos.
                    </p>
                    @endif
                </div>
            </div>

            <!-- Módulos Disponibles -->
            <div>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Módulos Disponibles</h2>
                <div class="flex flex-row gap-x-6">
                    <!-- Módulo de Generación de Tickets -->
                    <div class="bg-white border border-gray-300 shadow hover:shadow-lg transition-shadow">
                        <div class="px-6 py-3 bg-blue-700 border-b border-blue-800">
                            <h3 class="text-lg font-bold text-white">Generador de Tickets</h3>
                        </div>
                        <div class="p-6 space-y-4">
                            <p class="text-gray-700 text-sm">
                                Módulo para generar y asignar nuevos tickets a ciudadanos que requieren atención.
                            </p>
                            <ul class="text-gray-600 text-sm space-y-2">
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Búsqueda de ciudadanos por DNI
                                </li>
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Selección de área de atención
                                </li>
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Generación automática de tickets
                                </li>
                            </ul>
                            @if (Auth::check() && Auth::user()->can('Ver Modulo de Tickets'))
                            <a href="{{ route('ticket-generator-get') }}"
                                class="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-800 transition-colors">
                                Acceder al Módulo
                            </a>
                            @else
                            <button disabled
                                class="w-full bg-gray-400 text-gray-600 font-bold py-2 px-4 border border-gray-500 cursor-not-allowed">
                                Acceso Restringido
                            </button>
                            @endif
                        </div>
                    </div>

                    <!-- Pantalla de Tickets (TV) -->
                    <div class="bg-white border border-gray-300 shadow hover:shadow-lg transition-shadow">
                        <div class="px-6 py-3 bg-yellow-700 border-b border-yellow-800">
                            <h3 class="text-lg font-bold text-white">Pantalla de Tickets</h3>
                        </div>
                        <div class="p-6 space-y-4">
                            <p class="text-gray-700 text-sm">
                                Pantalla pública para mostrar tickets llamados y próximos en tiempo real.
                            </p>
                            <ul class="text-gray-600 text-sm space-y-2">
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Visualización en pantallas de atención
                                </li>
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Actualización en tiempo real
                                </li>
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Selección de área a visualizar
                                </li>
                            </ul>
                            <a href="{{ route('tickets.screen') }}"
                                class="block w-full text-center bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-4 border border-yellow-800 transition-colors">
                                Ver Pantalla
                            </a>
                        </div>
                    </div>

                    <!-- Panel de Tickets -->
                    <div class="bg-white border border-gray-300 shadow hover:shadow-lg transition-shadow">
                        <div class="px-6 py-3 bg-green-700 border-b border-green-800">
                            <h3 class="text-lg font-bold text-white">Panel de Tickets</h3>
                        </div>
                        <div class="p-6 space-y-4  ">
                            <p class="text-gray-700 text-sm">
                                Panel de visualización y gestión de tickets para las áreas de atención.
                            </p>
                            <ul class="text-gray-600 text-sm space-y-2">
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Visualización de tickets en espera
                                </li>
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Atención y seguimiento de tickets
                                </li>
                                <li class="flex items-center gap-2">
                                    <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Cierre y derivación de tickets
                                </li>
                            </ul>
                            @if (Auth::check() && Auth::user()->can('Ver Panel De Tickets'))
                            <a href="{{ route('ticket-visualizer') }}"
                                class="block w-full text-center bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 border border-green-800 transition-colors">
                                Acceder al Panel
                            </a>
                            @else
                            <button disabled
                                class="w-full bg-gray-400 text-gray-600 font-bold py-2 px-4 border border-gray-500 cursor-not-allowed">
                                Acceso Restringido
                            </button>
                            @endif
                        </div>
                    </div>
                </div>
            </div>

            <!-- Información del Sistema -->
            <div class="mt-12 bg-white border border-gray-300 shadow">
                <div class="px-6 py-4 bg-gray-50 border-b border-gray-300">
                    <h2 class="text-lg font-bold text-gray-900">Información del Sistema</h2>
                </div>
                <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="border-l-4 border-l-blue-700 pl-4">
                        <h3 class="font-bold text-gray-900 mb-2">Generador de Tickets</h3>
                        <p class="text-sm text-gray-600">
                            Genera nuevos tickets asignándolos a un área específica del municipio.
                        </p>
                    </div>
                    <div class="border-l-4 border-l-green-700 pl-4">
                        <h3 class="font-bold text-gray-900 mb-2">Panel de Gestión</h3>
                        <p class="text-sm text-gray-600">
                            Gestiona los tickets de tu área, realiza seguimiento y cierre de trámites.
                        </p>
                    </div>
                    <div class="border-l-4 border-l-gray-700 pl-4">
                        <h3 class="font-bold text-gray-900 mb-2">Soporte</h3>
                        <p class="text-sm text-gray-600">
                            Para consultas o problemas, contacta con el administrador del sistema.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 bg-gray-700 text-white py-6 border-t border-gray-600">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p class="text-sm text-gray-400">
                    © {{ date('Y') }} Municipalidad de San Miguel - San Román. Todos los derechos reservados.
                </p>
            </div>
        </div>
    </div>
</body>

</html>