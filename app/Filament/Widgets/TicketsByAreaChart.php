<?php

namespace App\Filament\Widgets;

use App\Models\Area;
use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Filament\Support\RawJs;
use Illuminate\Support\Facades\DB;

class TicketsByAreaChart extends ChartWidget
{
    protected static ?string $heading = 'Distribución de Tickets por Área';
    
    protected static ?int $sort = 6;
    
    protected int | string | array $columnSpan = 1;

    // Number of areas to display individually before grouping
    protected int $maxDisplayAreas = 5;
    
    protected function getData(): array
    {
        $data = Ticket::select('area_id', DB::raw('COUNT(*) as count'))
            ->with('area')
            ->groupBy('area_id')
            ->orderByDesc('count')
            ->get();

        $labels = [];
        $chartData = [];
        $colors = [
            'rgba(239, 68, 68, 0.8)',   // Red
            'rgba(245, 158, 11, 0.8)',  // Amber
            'rgba(34, 197, 94, 0.8)',   // Green
            'rgba(59, 130, 246, 0.8)',  // Blue
            'rgba(168, 85, 247, 0.8)',  // Violet
        ];

        $topAreas = $data->take($this->maxDisplayAreas);
        $remainingAreas = $data->skip($this->maxDisplayAreas);
        
        $remainingCount = 0;
        foreach ($remainingAreas as $item) {
            $remainingCount += $item->count;
        }

        $index = 0;
        foreach ($topAreas as $item) {
            $labels[] = $item->area ? $item->area->name : 'Sin área';
            $chartData[] = $item->count;
            $index++;
        }

        // Add "Otros" if there are remaining areas
        if ($remainingCount > 0) {
            $labels[] = 'Otros (' . $remainingAreas->count() . ' áreas)';
            $chartData[] = $remainingCount;
        }

        return [
            'datasets' => [
                [
                    'data' => $chartData,
                    'backgroundColor' => array_slice($colors, 0, count($chartData)),
                    'borderWidth' => 2,
                    'borderColor' => '#fff',
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

    protected function getMaxHeight(): ?string
    {
        return '320px';
    }
}
