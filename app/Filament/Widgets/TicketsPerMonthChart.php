<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class TicketsPerMonthChart extends ChartWidget
{
    protected static ?string $heading = 'Total de Tickets Creados (Mensual)';

    protected static ?int $sort = 5;
    
    protected int | string | array $columnSpan = 1;

    public ?string $filter = null;
    
    protected function getData(): array
    {
        $year = (int) ($this->filter ?? now()->year);

        $data = Ticket::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
        ->whereYear('created_at', $year)
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        $months = [
            1 => 'Ene', 2 => 'Feb', 3 => 'Mar', 4 => 'Abr',
            5 => 'May', 6 => 'Jun', 7 => 'Jul', 8 => 'Ago',
            9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dic'
        ];

        $chartData = [];
        $labels = [];

        for ($i = 1; $i <= 12; $i++) {
            $labels[] = $months[$i];
            $monthData = $data->where('month', $i)->first();
            $chartData[] = $monthData ? $monthData->count : 0;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Tickets Creados',
                    'data' => $chartData,
                    'backgroundColor' => [
                        'rgba(59, 130, 246, 0.1)',
                    ],
                    'borderColor' => [
                        'rgb(59, 130, 246)',
                    ],
                    'borderWidth' => 2,
                    'fill' => true,
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
                    'display' => false,
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
        $years = Ticket::select(DB::raw('YEAR(created_at) as year'))
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->map(fn ($year) => (string) $year)
            ->all();

        if (empty($years)) {
            $currentYear = (string) now()->year;
            return [$currentYear => $currentYear];
        }

        return collect($years)
            ->mapWithKeys(fn (string $year): array => [$year => $year])
            ->toArray();
    }
}

