<?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\Area;
use App\Models\Citizen;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Cache;

class SystemInfoWidget extends BaseWidget
{
    protected static ?int $sort = 3;
    
    protected int | string | array $columnSpan = 'full';

    protected function getStats(): array
    {
        // Usar cache para mejorar performance
        $totalUsers = Cache::remember('total_users', 300, fn() => User::count());
        $totalAreas = Cache::remember('total_areas', 300, fn() => Area::count());
        $totalCitizens = Cache::remember('total_citizens', 300, fn() => Citizen::count());
        $activeUsers = Cache::remember('active_users', 300, fn() => User::where('is_active', true)->count());
        
        // Información del servidor
        $phpVersion = PHP_VERSION;
        $laravelVersion = app()->version();
        
        return [
            Stat::make('Usuarios del Sistema', $totalUsers)
                ->description("{$activeUsers} activos")
                ->descriptionIcon('heroicon-m-users')
                ->color('info')
                ->extraAttributes([
                    'title' => "Total de usuarios registrados en el sistema",
                ]),
                
            Stat::make('Áreas Activas', $totalAreas)
                ->description('Departamentos')
                ->descriptionIcon('heroicon-m-building-office')
                ->color('success'),
                
            Stat::make('Ciudadanos Registrados', $totalCitizens)
                ->description('En la base de datos')
                ->descriptionIcon('heroicon-m-identification')
                ->color('warning'),
                
            Stat::make('Versión PHP', $phpVersion)
                ->description("Laravel {$laravelVersion}")
                ->descriptionIcon('heroicon-m-code-bracket')
                ->color('gray'),
        ];
    }
}
