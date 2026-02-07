<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class TicketsOpenClosedTrendChart extends ChartWidget
{
    protected static ?string $heading = 'Tickets Abiertos vs Cerrados (Tendencia)';

    protected static ?int $sort = 12;

    protected int | string | array $columnSpan = 1;

    public ?string $filter = null;

    protected function getData(): array
    {
        $days = (int) ($this->filter ?? 30);
        $days = in_array($days, [7, 30, 90], true) ? $days : 30;

        $start = now()->subDays($days - 1)->startOfDay();
        $end = now()->endOfDay();

        $rows = Ticket::select(DB::raw('DATE(created_at) as day'), 'status_id', DB::raw('COUNT(*) as count'))
            ->whereBetween('created_at', [$start, $end])
            ->whereIn('status_id', [5, 6, 7, 8])
            ->groupBy('day', 'status_id')
            ->orderBy('day')
            ->get();

        $rowsByDay = $rows->groupBy('day');

        $labels = [];
        $openData = [];
        $closedData = [];

        for ($i = 0; $i < $days; $i++) {
            $date = $start->copy()->addDays($i);
            $key = $date->toDateString();
            $dayRows = $rowsByDay->get($key, collect());

            $openCount = (int) $dayRows->whereIn('status_id', [5, 6])->sum('count');
            $closedCount = (int) $dayRows->whereIn('status_id', [7, 8])->sum('count');

            $labels[] = $date->format('d/m');
            $openData[] = $openCount;
            $closedData[] = $closedCount;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Abiertos',
                    'data' => $openData,
                    'backgroundColor' => 'rgba(245, 158, 11, 0.8)',
                    'borderColor' => 'rgb(245, 158, 11)',
                    'borderWidth' => 1,
                ],
                [
                    'label' => 'Cerrados/Cancelados',
                    'data' => $closedData,
                    'backgroundColor' => 'rgba(34, 197, 94, 0.8)',
                    'borderColor' => 'rgb(34, 197, 94)',
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
                'x' => [
                    'stacked' => true,
                ],
                'y' => [
                    'beginAtZero' => true,
                    'stacked' => true,
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
