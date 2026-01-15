<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class TicketsStatusMonthlyChart extends ChartWidget
{
    protected static ?string $heading = 'Tickets por Estado (Mensual)';

    protected static ?int $sort = 7;

    protected int | string | array $columnSpan = 1;

    public ?string $filter = null;

    protected function getData(): array
    {
        $year = (int) ($this->filter ?? now()->year);

        $rows = Ticket::select(
                DB::raw('MONTH(created_at) as month'),
                'status_id',
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('created_at', $year)
            ->whereIn('status_id', [5, 6, 7, 8])
            ->groupBy('month', 'status_id')
            ->orderBy('month')
            ->get();

        $months = [
            1 => 'Ene', 2 => 'Feb', 3 => 'Mar', 4 => 'Abr',
            5 => 'May', 6 => 'Jun', 7 => 'Jul', 8 => 'Ago',
            9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dic',
        ];

        $labels = [];
        for ($i = 1; $i <= 12; $i++) {
            $labels[] = $months[$i];
        }

        $statusLabels = [
            5 => 'En espera',
            6 => 'Atendiendo',
            7 => 'Cerrado',
            8 => 'Cancelado',
        ];

        $colors = [
            5 => ['border' => 'rgb(245, 158, 11)', 'bg' => 'rgba(245, 158, 11, 0.15)'],
            6 => ['border' => 'rgb(59, 130, 246)', 'bg' => 'rgba(59, 130, 246, 0.15)'],
            7 => ['border' => 'rgb(34, 197, 94)', 'bg' => 'rgba(34, 197, 94, 0.15)'],
            8 => ['border' => 'rgb(239, 68, 68)', 'bg' => 'rgba(239, 68, 68, 0.15)'],
        ];

        $datasets = [];
        foreach ($statusLabels as $statusId => $label) {
            $data = array_fill(0, 12, 0);

            foreach ($rows as $row) {
                if ((int) $row->status_id === $statusId) {
                    $data[(int) $row->month - 1] = (int) $row->count;
                }
            }

            $datasets[] = [
                'label' => $label,
                'data' => $data,
                'borderColor' => $colors[$statusId]['border'],
                'backgroundColor' => $colors[$statusId]['bg'],
                'tension' => 0.3,
                'fill' => false,
            ];
        }

        return [
            'datasets' => $datasets,
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
