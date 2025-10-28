<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\DB;

class StaffPerformanceWidget extends BaseWidget
{
    protected static ?int $sort = 4;
    
    protected int | string | array $columnSpan = 'full';

    public function getHeading(): string
    {
        return 'Rendimiento del Personal';
    }

    protected function getStats(): array
    {
        // Top performer del mes
        $topPerformer = User::select('users.id', 'users.name')
            ->join('tickets', 'users.id', '=', 'tickets.attended_by_id')
            ->where('tickets.status_id', 7) // cerrado
            ->where('tickets.updated_at', '>=', now()->startOfMonth())
            ->groupBy('users.id', 'users.name')
            ->selectRaw('COUNT(tickets.id) as tickets_count')
            ->orderByDesc('tickets_count')
            ->first();

        // Promedio de tickets por usuario
        $avgTicketsPerUser = Ticket::where('status_id', 7)
            ->where('updated_at', '>=', now()->startOfMonth())
            ->whereNotNull('attended_by_id')
            ->count() / max(User::count(), 1);

        // Tiempo promedio de resolución (en horas)
        $avgResolutionTime = Ticket::where('status_id', 7)
            ->where('updated_at', '>=', now()->startOfMonth())
            ->whereNotNull('time_admission')
            ->selectRaw('AVG(TIMESTAMPDIFF(HOUR, time_admission, updated_at)) as avg_hours')
            ->value('avg_hours');

        return [
            Stat::make('🏆 Empleado del Mes', $topPerformer ? $topPerformer->name : 'Sin datos')
                ->description($topPerformer ? $topPerformer->tickets_count . ' tickets cerrados' : 'No hay datos suficientes')
                ->descriptionIcon('heroicon-m-trophy')
                ->color('success')
                ->chart([7, 12, 15, 18, 22, 25, 28]),

            Stat::make('📊 Promedio por Usuario', number_format($avgTicketsPerUser, 1))
                ->description('Tickets cerrados este mes')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info')
                ->chart([5, 8, 12, 15, 18, 20, 22]),

            Stat::make('⏱️ Tiempo Promedio', $avgResolutionTime ? number_format($avgResolutionTime, 1) . ' horas' : 'Sin datos')
                ->description('Tiempo de resolución')
                ->descriptionIcon('heroicon-m-clock')
                ->color($avgResolutionTime && $avgResolutionTime < 2 ? 'success' : ($avgResolutionTime < 4 ? 'warning' : 'danger'))
                ->chart([4, 3.5, 3, 2.8, 2.5, 2.2, 2]),
        ];
    }
}