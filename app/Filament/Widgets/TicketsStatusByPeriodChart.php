<?php

namespace App\Filament\Widgets;

use App\Models\Ticket;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class TicketsStatusByPeriodChart extends ChartWidget
{
    protected static ?string $heading = 'Tickets por Estado (Periodo)';

    protected static ?int $sort = 6;

    protected static string $view = 'filament.widgets.tickets-status-by-period-chart';

    protected int | string | array $columnSpan = 1;

    public ?string $selectedDate = null;
    public ?string $endDate = null;

    public function mount(): void
    {
        $this->selectedDate = now()->toDateString();
        $this->endDate = now()->toDateString();
    }

    protected function getData(): array
    {
        $query = Ticket::query();

        if ($this->selectedDate && $this->endDate) {
            $query->whereBetween('created_at', [
                $this->selectedDate . ' 00:00:00',
                $this->endDate . ' 23:59:59',
            ]);
        } elseif ($this->selectedDate) {
            $query->whereDate('created_at', $this->selectedDate);
        } else {
            $query->whereDate('created_at', now()->toDateString());
        }

        $rows = $query
            ->whereIn('status_id', [5, 6, 7, 8])
            ->select(DB::raw('HOUR(created_at) as hour'), 'status_id', DB::raw('COUNT(*) as count'))
            ->groupBy('hour', 'status_id')
            ->orderBy('hour')
            ->get();

        $labels = [];
        for ($hour = 0; $hour < 24; $hour++) {
            $labels[] = sprintf('%02d:00', $hour);
        }

        $statusKeys = [
            5 => 'En espera',
            6 => 'Atendiendo',
            7 => 'Cerrado',
            8 => 'Cancelado',
        ];

        $datasets = [];
        foreach ($statusKeys as $statusId => $label) {
            $data = array_fill(0, 24, 0);
            foreach ($rows as $row) {
                if ((int) $row->status_id === $statusId) {
                    $data[(int) $row->hour] = (int) $row->count;
                }
            }

            $datasets[] = [
                'label' => $label,
                'data' => $data,
            ];
        }

        return [
            'datasets' => [
                array_merge($datasets[0], [
                    'borderColor' => 'rgb(245, 158, 11)',
                    'backgroundColor' => 'rgba(245, 158, 11, 0.15)',
                    'tension' => 0.3,
                    'fill' => false,
                ]),
                array_merge($datasets[1], [
                    'borderColor' => 'rgb(59, 130, 246)',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.15)',
                    'tension' => 0.3,
                    'fill' => false,
                ]),
                array_merge($datasets[2], [
                    'borderColor' => 'rgb(34, 197, 94)',
                    'backgroundColor' => 'rgba(34, 197, 94, 0.15)',
                    'tension' => 0.3,
                    'fill' => false,
                ]),
                array_merge($datasets[3], [
                    'borderColor' => 'rgb(239, 68, 68)',
                    'backgroundColor' => 'rgba(239, 68, 68, 0.15)',
                    'tension' => 0.3,
                    'fill' => false,
                ]),
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
                ],
            ],
        ];
    }

    protected function getMaxHeight(): ?string
    {
        return '320px';
    }

}
