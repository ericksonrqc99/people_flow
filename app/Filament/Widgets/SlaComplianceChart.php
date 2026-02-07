<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class SlaComplianceChart extends ChartWidget
{
    protected static ?string $heading = 'Cumplimiento de SLA (Tiempo de Resolución)';

    protected static ?int $sort = 13;

    protected int | string | array $columnSpan = 1;

    public ?string $filter = null;

    protected int $slaMinutes = 60;

    protected function getData(): array
    {
        $days = (int) ($this->filter ?? 30);
        $days = in_array($days, [7, 30, 90], true) ? $days : 30;

        $start = now()->subDays($days - 1)->startOfDay();
        $end = now()->endOfDay();

        $rows = Ticket::select(DB::raw('TIMESTAMPDIFF(MINUTE, time_admission, time_departure) as resolution_minutes'))
            ->where('status_id', 7)
            ->whereNotNull('time_admission')
            ->whereNotNull('time_departure')
            ->whereBetween('created_at', [$start, $end])
            ->get();

        $within = 0;
        $outside = 0;

        foreach ($rows as $row) {
            $minutes = (int) $row->resolution_minutes;
            if ($minutes <= $this->slaMinutes) {
                $within++;
            } else {
                $outside++;
            }
        }

        return [
            'datasets' => [
                [
                    'data' => [$within, $outside],
                    'backgroundColor' => [
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                    ],
                    'borderWidth' => 2,
                    'borderColor' => '#fff',
                ],
            ],
            'labels' => [
                'Dentro de SLA (≤ ' . $this->slaMinutes . ' min)',
                'Fuera de SLA (> ' . $this->slaMinutes . ' min)',
            ],
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

    protected function getMaxHeight(): ?string
    {
        return '320px';
    }

    protected function getFilters(): ?array
    {
        return [
            '7' => 'Últimos 7 días',
            '30' => 'Últimos 30 días',
            '90' => 'Últimos 90 días',
        ];
    }
}
