<?php

namespace App\Filament\Widgets;

use App\Models\Area;
use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class TicketsByAreaMonthlyChart extends ChartWidget
{
    protected static ?string $heading = 'Tickets por Área (Mensual)';

    protected static ?int $sort = 8;

    protected int | string | array $columnSpan = 1;

    public ?string $filter = null;

    protected function getData(): array
    {
        $year = (int) ($this->filter ?? now()->year);

        $topAreaIds = Ticket::select('area_id', DB::raw('COUNT(*) as count'))
            ->whereYear('created_at', $year)
            ->whereNotNull('area_id')
            ->groupBy('area_id')
            ->orderByDesc('count')
            ->limit(5)
            ->pluck('area_id')
            ->all();

        $areaNames = Area::whereIn('id', $topAreaIds)
            ->pluck('name', 'id')
            ->all();

        $rows = Ticket::select(
                DB::raw('MONTH(created_at) as month'),
                'area_id',
                DB::raw('COUNT(*) as count')
            )
            ->whereYear('created_at', $year)
            ->groupBy('month', 'area_id')
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

        $datasets = [];
        $colorPalette = [
            ['border' => 'rgb(59, 130, 246)', 'bg' => 'rgba(59, 130, 246, 0.15)'],
            ['border' => 'rgb(16, 185, 129)', 'bg' => 'rgba(16, 185, 129, 0.15)'],
            ['border' => 'rgb(245, 158, 11)', 'bg' => 'rgba(245, 158, 11, 0.15)'],
            ['border' => 'rgb(139, 92, 246)', 'bg' => 'rgba(139, 92, 246, 0.15)'],
            ['border' => 'rgb(236, 72, 153)', 'bg' => 'rgba(236, 72, 153, 0.15)'],
            ['border' => 'rgb(107, 114, 128)', 'bg' => 'rgba(107, 114, 128, 0.15)'],
        ];

        foreach ($topAreaIds as $index => $areaId) {
            $data = array_fill(0, 12, 0);

            foreach ($rows as $row) {
                if ((int) $row->area_id === (int) $areaId) {
                    $data[(int) $row->month - 1] = (int) $row->count;
                }
            }

            $color = $colorPalette[$index % count($colorPalette)];
            $datasets[] = [
                'label' => $areaNames[$areaId] ?? 'Área ' . $areaId,
                'data' => $data,
                'borderColor' => $color['border'],
                'backgroundColor' => $color['bg'],
                'tension' => 0.3,
                'fill' => false,
            ];
        }

        // Otros
        if (! empty($rows)) {
            $otherData = array_fill(0, 12, 0);

            foreach ($rows as $row) {
                if (! in_array($row->area_id, $topAreaIds, true)) {
                    $otherData[(int) $row->month - 1] += (int) $row->count;
                }
            }

            if (array_sum($otherData) > 0) {
                $color = $colorPalette[5];
                $datasets[] = [
                    'label' => 'Otros',
                    'data' => $otherData,
                    'borderColor' => $color['border'],
                    'backgroundColor' => $color['bg'],
                    'tension' => 0.3,
                    'fill' => false,
                ];
            }
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
