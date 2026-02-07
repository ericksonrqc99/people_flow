<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class HourlyActivityChart extends ChartWidget
{
    protected static ?string $heading = 'Actividad por Horas del Día';
    
    protected static ?int $sort = 7;
    
    protected int | string | array $columnSpan = 1;

    public static function canView(): bool
    {
        return false;
    }

    protected function getData(): array
    {
        // Obtener tickets por hora del día (últimos 7 días)
        $hourlyData = Ticket::select(DB::raw('HOUR(created_at) as hour, COUNT(*) as count'))
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('hour')
            ->orderBy('hour')
            ->get()
            ->pluck('count', 'hour')
            ->toArray();

        // Llenar las horas faltantes con 0
        $data = [];
        $labels = [];
        for ($hour = 0; $hour < 24; $hour++) {
            $data[] = $hourlyData[$hour] ?? 0;
            $labels[] = sprintf('%02d:00', $hour);
        }

        return [
            'datasets' => [
                [
                    'label' => 'Tickets Creados',
                    'data' => $data,
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'borderColor' => 'rgb(59, 130, 246)',
                    'borderWidth' => 2,
                    'fill' => true,
                    'tension' => 0.4,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
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
                    'grid' => [
                        'display' => true,
                    ],
                ],
                'x' => [
                    'grid' => [
                        'display' => false,
                    ],
                ],
            ],
        ];
    }

    protected function getMaxHeight(): ?string
    {
        return '320px';
    }
}