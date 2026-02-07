<?php

namespace App\Filament\Widgets;

use App\Models\Citizen;
use App\Models\Ticket;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Support\Facades\DB;

class TopCitizensWidget extends BaseWidget
{
    protected static ?string $heading = 'Top 10 Ciudadanos Más Activos';
    
    protected static ?int $sort = 20;
    
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Citizen::withCount('tickets')
                    ->whereHas('tickets')
                    ->orderByDesc('tickets_count')
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('position')
                    ->label('#')
                    ->getStateUsing(function ($record, $rowLoop): string {
                        return '#' . ($rowLoop->index + 1);
                    })
                    ->badge()
                    ->color(fn ($record, $rowLoop): string => match ($rowLoop->index) {
                        0 => 'success',  // 1er lugar
                        1 => 'warning',  // 2do lugar
                        2 => 'danger',   // 3er lugar
                        default => 'gray',
                    }),

                Tables\Columns\TextColumn::make('full_name')
                    ->label('Ciudadano')
                    ->limit(25)
                    ->tooltip(function ($record): ?string {
                        return $record->full_name;
                    }),

                Tables\Columns\TextColumn::make('document_number')
                    ->label('Documento')
                    ->placeholder('Sin documento'),

                Tables\Columns\TextColumn::make('tickets_count')
                    ->label('Total Tickets')
                    ->badge()
                    ->color('info')
                    ->icon('heroicon-m-ticket'),

                Tables\Columns\TextColumn::make('tickets.last.created_at')
                    ->label('Último Ticket')
                    ->getStateUsing(function ($record) {
                        $lastTicket = $record->tickets()->latest()->first();
                        return $lastTicket?->created_at;
                    })
                    ->since()
                    ->dateTimeTooltip()
                    ->icon('heroicon-m-clock')
                    ->color('gray'),
            ])
            ->paginated([10, 25, 50])
            ->paginationPageOptions([10, 25, 50])
            ->emptyStateHeading('Sin datos de ciudadanos')
            ->emptyStateDescription('No se encontraron ciudadanos con tickets.')
            ->emptyStateIcon('heroicon-o-users');
    }
}