<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class WeeklyComparisonChart extends ChartWidget
{
    protected static ?string $heading = 'Comparación Semanal: Esta Semana vs Anterior';
    
    protected static ?int $sort = 8;
    
    protected int | string | array $columnSpan = [
        'default' => 1,
        'md' => 2,
        'lg' => 3,
    ];

    protected function getData(): array
    {
        // Esta semana
        $thisWeek = Ticket::select(DB::raw('DAYNAME(created_at) as day, DAYOFWEEK(created_at) as day_order, COUNT(*) as count'))
            ->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])
            ->groupBy('day', 'day_order')
            ->orderBy('day_order')
            ->get()
            ->pluck('count', 'day')
            ->toArray();

        // Semana pasada
        $lastWeek = Ticket::select(DB::raw('DAYNAME(created_at) as day, DAYOFWEEK(created_at) as day_order, COUNT(*) as count'))
            ->whereBetween('created_at', [now()->subWeek()->startOfWeek(), now()->subWeek()->endOfWeek()])
            ->groupBy('day', 'day_order')
            ->orderBy('day_order')
            ->get()
            ->pluck('count', 'day')
            ->toArray();

        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

        $thisWeekData = [];
        $lastWeekData = [];

        foreach ($days as $day) {
            $thisWeekData[] = $thisWeek[$day] ?? 0;
            $lastWeekData[] = $lastWeek[$day] ?? 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Esta Semana',
                    'data' => $thisWeekData,
                    'backgroundColor' => 'rgba(34, 197, 94, 0.8)',
                    'borderColor' => 'rgb(34, 197, 94)',
                    'borderWidth' => 2,
                ],
                [
                    'label' => 'Semana Anterior',
                    'data' => $lastWeekData,
                    'backgroundColor' => 'rgba(156, 163, 175, 0.8)',
                    'borderColor' => 'rgb(156, 163, 175)',
                    'borderWidth' => 2,
                ],
            ],
            'labels' => $dayLabels,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                ],
            ],
        ];
    }
}