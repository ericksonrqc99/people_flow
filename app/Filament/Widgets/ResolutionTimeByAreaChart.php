<?php

namespace App\Filament\Widgets;

use App\Models\Area;
use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class ResolutionTimeByAreaChart extends ChartWidget
{
    protected static ?string $heading = 'Tiempo Promedio de Resolución por Área';

    protected static ?int $sort = 14;

    protected int | string | array $columnSpan = 1;

    public ?string $filter = null;

    protected function getData(): array
    {
        $days = (int) ($this->filter ?? 30);
        $days = in_array($days, [7, 30, 90], true) ? $days : 30;

        $start = now()->subDays($days - 1)->startOfDay();
        $end = now()->endOfDay();

        $rows = Ticket::select(
                'area_id',
            DB::raw('AVG(TIMESTAMPDIFF(SECOND, COALESCE(time_admission, created_at), COALESCE(time_departure, updated_at)) / 60) as avg_minutes'),
                DB::raw('COUNT(*) as count')
            )
            ->whereIn('status_id', [7, 8])
            ->where(function ($query) use ($start, $end) {
                $query->whereBetween('time_departure', [$start, $end])
                    ->orWhere(function ($query) use ($start, $end) {
                        $query->whereNull('time_departure')
                            ->whereBetween('updated_at', [$start, $end]);
                    });
            })
            ->groupBy('area_id')
            ->orderByDesc('count')
            ->limit(6)
            ->get();

        $areaNames = Area::whereIn('id', $rows->pluck('area_id'))
            ->pluck('name', 'id');

        $labels = [];
        $data = [];

        foreach ($rows as $row) {
            $labels[] = $areaNames[$row->area_id] ?? ('Área ' . $row->area_id);
            $data[] = $row->avg_minutes ? round((float) $row->avg_minutes, 1) : 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Minutos promedio',
                    'data' => $data,
                    'backgroundColor' => 'rgba(59, 130, 246, 0.8)',
                    'borderColor' => 'rgb(59, 130, 246)',
                    'borderWidth' => 1,
                ],
            ],
            'labels' => $labels,
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
