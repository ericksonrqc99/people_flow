<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use App\Models\User;
use App\Models\Area;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Cache;

class QuickStatsWidget extends BaseWidget
{
    protected static ?int $sort = 2;
    
    protected int | string | array $columnSpan = 'full';

    public function getHeading(): string
    {
        return 'Estadísticas Rápidas';
    }

    protected function getStats(): array
    {
        // Tickets de hoy
        $todayTickets = Cache::remember('today_tickets', 300, function () {
            return Ticket::whereDate('created_at', today())->count();
        });

        // Tickets pendientes
        $pendingTickets = Cache::remember('pending_tickets', 300, function () {
            return Ticket::whereIn('status_id', [5, 6])->count(); // en espera y atendiendo
        });

        // Áreas más ocupadas
        $busiestArea = Cache::remember('busiest_area', 300, function () {
            return Area::select('areas.name', 'areas.id')
                ->withCount('tickets')
                ->orderByDesc('tickets_count')
                ->first();
        });

        // Usuarios activos hoy
        $activeUsers = Cache::remember('active_users_today', 300, function () {
            return User::join('tickets', 'users.id', '=', 'tickets.registered_by_id')
                ->whereDate('tickets.created_at', today())
                ->distinct('users.id')
                ->count();
        });

        return [
            Stat::make('📅 Tickets Hoy', $todayTickets)
                ->description('Nuevos tickets creados')
                ->descriptionIcon('heroicon-m-plus-circle')
                ->color('success')
                ->chart([3, 7, 12, 18, 25, 32, $todayTickets]),

            Stat::make('⏳ Tickets Pendientes', $pendingTickets)
                ->description('En espera y atendiendo')
                ->descriptionIcon('heroicon-m-clock')
                ->color($pendingTickets > 20 ? 'danger' : ($pendingTickets > 10 ? 'warning' : 'success'))
                ->chart([$pendingTickets + 5, $pendingTickets + 3, $pendingTickets + 1, $pendingTickets]),

            Stat::make('🔥 Área Más Activa', $busiestArea ? $busiestArea->name : 'Sin datos')
                ->description($busiestArea ? $busiestArea->tickets_count . ' tickets en total' : 'No hay áreas registradas')
                ->descriptionIcon('heroicon-m-fire')
                ->color('warning')
                ->chart([2, 4, 6, 8, 10, 12, 15]),

            Stat::make('👥 Personal Activo', $activeUsers)
                ->description('Usuarios trabajando hoy')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info')
                ->chart([1, 3, 5, 7, 9, $activeUsers]),
        ];
    }
}