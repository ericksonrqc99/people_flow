<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\TicketResource;
use App\Models\Ticket;
use App\Models\User;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentActivityWidget extends BaseWidget
{
    protected static ?string $heading = 'Actividad Reciente de Tickets';
    
    protected static ?int $sort = 21;
    
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Ticket::query()
                    ->with(['citizen', 'area', 'attendedBy', 'status', 'registeredBy'])
                    ->latest()
            )
            ->columns([
                Tables\Columns\TextColumn::make('code')
                    ->label('Código')
                    ->badge()
                    ->color('primary')
                    ->searchable()
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('citizen.full_name')
                    ->label('Ciudadano')
                    ->getStateUsing(function ($record): string {
                        $citizen = $record->citizen;
                        if (!$citizen) return 'Sin ciudadano';
                        
                        return $citizen->full_name ?: 'Sin nombre';
                    })
                    ->limit(25)
                    ->tooltip(function ($record): ?string {
                        $citizen = $record->citizen;
                        if (!$citizen) return null;
                        
                        return "Nombre: " . ($citizen->full_name ?: 'N/A') . "\n" .
                               "Documento: " . ($citizen->document_number ?? 'N/A') . "\n" .
                               "Teléfono: " . ($citizen->phone ?? 'N/A') . "\n" .
                               "Email: " . ($citizen->email ?? 'N/A') . "\n" .
                               "Departamento: " . ($citizen->departament ?? 'N/A') . "\n" .
                               "Provincia: " . ($citizen->province ?? 'N/A') . "\n" .
                               "Distrito: " . ($citizen->district ?? 'N/A') . "\n" .
                               "Dirección: " . ($citizen->address ?? 'N/A');
                    })
                    ->icon('heroicon-m-user-circle')
                    ->iconColor('info'),
                    
                Tables\Columns\TextColumn::make('area.name')
                    ->label('Área')
                    ->badge()
                    ->color('warning')
                    ->icon('heroicon-m-building-office'),
                    
                Tables\Columns\TextColumn::make('status.type')
                    ->label('Estado')
                    ->badge()
                    ->color(fn ($record): string => match ($record->status_id) {
                        5 => 'warning',  // en espera
                        6 => 'info',     // atendiendo
                        7 => 'success',  // cerrado
                        8 => 'danger',   // cancelado
                        default => 'gray',
                    })
                    ->formatStateUsing(fn ($record): string => $record->status?->type ?? 'Sin estado')
                    ->icon('heroicon-m-exclamation-circle'),
                    
                Tables\Columns\TextColumn::make('attended_by_user')
                    ->label('Personal')
                    ->getStateUsing(function ($record): string {
                        $status = $record->status_id;
                        
                        // Estado: Cerrado (7) o Cancelado (8)
                        if (in_array($status, [7, 8])) {
                            if ($record->attendedBy) {
                                return $record->attendedBy->name . ' (Cerró)';
                            }
                            return 'Cerrado automático';
                        }
                        
                        // Estado: Atendiendo (6)
                        if ($status == 6) {
                            if ($record->attendedBy) {
                                return $record->attendedBy->name . ' (Atendiendo)';
                            }
                            return 'En proceso';
                        }
                        
                        // Estado: En espera (5) o cualquier otro
                        if ($record->attendedBy) {
                            return $record->attendedBy->name . ' (Asignado)';
                        }
                        
                        // Sin asignar, mostrar quien registró
                        if ($record->registeredBy) {
                            return $record->registeredBy->name . ' (Registró)';
                        }
                        
                        return 'Sin asignar';
                    })
                    ->tooltip(function ($record): string {
                        $status = $record->status_id;
                        $statusText = $record->status?->type ?? 'Desconocido';
                        
                        $tooltip = "📊 Estado: {$statusText}\n";
                        
                        if ($record->attendedBy) {
                            if (in_array($status, [7, 8])) {
                                $tooltip .= "✅ Cerrado por: " . $record->attendedBy->name . "\n";
                            } elseif ($status == 6) {
                                $tooltip .= "👤 Atendiendo: " . $record->attendedBy->name . "\n";
                            } else {
                                $tooltip .= "🎯 Asignado a: " . $record->attendedBy->name . "\n";
                            }
                        } else {
                            $tooltip .= "❌ Sin asignar\n";
                        }
                        
                        if ($record->registeredBy) {
                            $tooltip .= "📝 Registrado por: " . $record->registeredBy->name;
                        }
                        
                        return rtrim($tooltip);
                    })
                    ->icon(function ($record): string {
                        $status = $record->status_id;
                        
                        if (in_array($status, [7, 8])) {
                            return 'heroicon-m-check-circle';
                        } elseif ($status == 6) {
                            return 'heroicon-m-user-circle';
                        } else {
                            return 'heroicon-m-clock';
                        }
                    })
                    ->iconColor(function ($record): string {
                        $status = $record->status_id;
                        
                        if ($status == 7) return 'success';    // cerrado
                        if ($status == 8) return 'danger';     // cancelado
                        if ($status == 6) return 'info';       // atendiendo
                        if ($status == 5) return 'warning';    // en espera
                        
                        return 'gray';
                    })
                    ->badge(function ($record): bool {
                        return $record->attendedBy ? true : false;
                    })
                    ->color(function ($record): string {
                        $status = $record->status_id;
                        
                        if ($status == 7) return 'success';    // cerrado
                        if ($status == 8) return 'danger';     // cancelado
                        if ($status == 6) return 'info';       // atendiendo
                        if ($status == 5) return 'warning';    // en espera
                        
                        return 'gray';
                    }),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Creado')
                    ->since()
                    ->dateTimeTooltip()
                    ->sortable()
                    ->icon('heroicon-m-clock')
                    ->iconColor('gray'),
                    
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Actualizado')
                    ->since()
                    ->dateTimeTooltip()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->icon('heroicon-m-arrow-path')
                    ->iconColor('gray'),
            ])
            ->actions([
                // Removido temporalmente hasta que se cree el TicketResource
            ])
            ->recordUrl(fn (Ticket $record): string => TicketResource::getUrl('edit', ['record' => $record]))
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->paginated([10, 25, 50])
            ->paginationPageOptions([10, 25, 50])
            ->searchable()
            ->emptyStateHeading('No hay actividad reciente')
            ->emptyStateDescription('Los tickets aparecerán aquí cuando se creen.')
            ->emptyStateIcon('heroicon-o-inbox');
    }
}
