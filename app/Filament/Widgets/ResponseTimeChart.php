<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class ResponseTimeChart extends ChartWidget
{
    protected static ?string $heading = 'Análisis de Tiempos de Respuesta';
    
    protected static ?int $sort = 9;
    
    protected int | string | array $columnSpan = [
        'default' => 1,
        'md' => 2,
        'lg' => 3,
    ];

    protected function getData(): array
    {
        // Analizar tiempos de respuesta por rangos (en minutos)
        $timeRanges = [
            'Inmediato (0-5min)' => 0,
            'Rápido (5-15min)' => 0,
            'Normal (15-30min)' => 0,
            'Lento (30-60min)' => 0,
            'Muy lento (>60min)' => 0,
        ];

        // Tickets con tiempo de admisión en los últimos 30 días
        $tickets = Ticket::select(DB::raw('TIMESTAMPDIFF(MINUTE, created_at, time_admission) as response_time'))
            ->whereNotNull('time_admission')
            ->where('created_at', '>=', now()->subDays(30))
            ->get();

        foreach ($tickets as $ticket) {
            $responseTime = $ticket->response_time;
            
            if ($responseTime <= 5) {
                $timeRanges['Inmediato (0-5min)']++;
            } elseif ($responseTime <= 15) {
                $timeRanges['Rápido (5-15min)']++;
            } elseif ($responseTime <= 30) {
                $timeRanges['Normal (15-30min)']++;
            } elseif ($responseTime <= 60) {
                $timeRanges['Lento (30-60min)']++;
            } else {
                $timeRanges['Muy lento (>60min)']++;
            }
        }

        return [
            'datasets' => [
                [
                    'data' => array_values($timeRanges),
                    'backgroundColor' => [
                        'rgba(34, 197, 94, 0.8)',   // Verde - Inmediato
                        'rgba(59, 130, 246, 0.8)',  // Azul - Rápido
                        'rgba(251, 191, 36, 0.8)',  // Amarillo - Normal
                        'rgba(249, 115, 22, 0.8)',  // Naranja - Lento
                        'rgba(239, 68, 68, 0.8)',   // Rojo - Muy lento
                    ],
                    'borderWidth' => 2,
                    'borderColor' => '#fff',
                ],
            ],
            'labels' => array_keys($timeRanges),
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