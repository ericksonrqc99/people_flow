<?php

namespace App\Filament\Widgets;

use App\Models\Area;
use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class TicketsByAreaChart extends ChartWidget
{
    protected static ?string $heading = 'Distribución de Tickets por Área';
    
    protected static ?int $sort = 6;
    
    protected int | string | array $columnSpan = [
        'default' => 1,
        'md' => 2,
        'lg' => 3,
    ];
    
    protected function getData(): array
    {
        $data = Ticket::select('area_id', DB::raw('COUNT(*) as count'))
            ->with('area')
            ->groupBy('area_id')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        $labels = [];
        $chartData = [];
        $colors = [
            'rgba(239, 68, 68, 0.8)',   // Red
            'rgba(245, 158, 11, 0.8)',  // Amber
            'rgba(34, 197, 94, 0.8)',   // Green
            'rgba(59, 130, 246, 0.8)',  // Blue
            'rgba(147, 51, 234, 0.8)',  // Purple
            'rgba(236, 72, 153, 0.8)',  // Pink
            'rgba(20, 184, 166, 0.8)',  // Teal
            'rgba(251, 146, 60, 0.8)',  // Orange
            'rgba(99, 102, 241, 0.8)',  // Indigo
            'rgba(168, 85, 247, 0.8)',  // Violet
        ];

        foreach ($data as $index => $item) {
            $labels[] = $item->area ? $item->area->name : 'Sin área';
            $chartData[] = $item->count;
        }

        return [
            'datasets' => [
                [
                    'data' => $chartData,
                    'backgroundColor' => array_slice($colors, 0, count($chartData)),
                    'borderWidth' => 0,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => true,
                    'position' => 'bottom',
                ],
            ],
            'maintainAspectRatio' => false,
        ];
    }
}
