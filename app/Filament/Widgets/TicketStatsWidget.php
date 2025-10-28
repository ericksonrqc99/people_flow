<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\DB;

class TicketStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;
    
    protected int | string | array $columnSpan = 'full';

    protected function getStats(): array
    {
        $totalTickets = Ticket::count();
        $pendingTickets = Ticket::where('status_id', 5)->count(); // 'en espera'
        $inProgressTickets = Ticket::where('status_id', 6)->count(); // 'atendiendo'
        $resolvedTickets = Ticket::where('status_id', 7)->count(); // 'cerrado'
        $cancelledTickets = Ticket::where('status_id', 8)->count(); // 'cancelado'
        
        // Cálculo de porcentaje de resolución
        $resolutionPercentage = $totalTickets > 0 ? round(($resolvedTickets / $totalTickets) * 100, 1) : 0;
        
        // Tickets creados hoy
        $todayTickets = Ticket::whereDate('created_at', today())->count();
        
        return [
            Stat::make('Total de Tickets', $totalTickets)
                ->description('Tickets en el sistema')
                ->descriptionIcon('heroicon-m-ticket')
                ->color('primary')
                ->chart([7, 12, 8, 15, 22, 18, $totalTickets % 30]),
                
            Stat::make('En Espera', $pendingTickets)
                ->description('Esperando atención')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning')
                ->extraAttributes([
                    'class' => 'animate-pulse',
                ]),
                
            Stat::make('Atendiendo', $inProgressTickets)
                ->description('Siendo atendidos')
                ->descriptionIcon('heroicon-m-arrow-path')
                ->color('info'),
                
            Stat::make('Cerrados', $resolvedTickets)
                ->description("{$resolutionPercentage}% de resolución")
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),
                
            Stat::make('Tickets Hoy', $todayTickets)
                ->description('Creados hoy')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color($todayTickets > 10 ? 'danger' : 'success'),
        ];
    }
}
