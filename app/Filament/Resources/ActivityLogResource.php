<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ActivityLogResource\Pages;
use App\Models\User;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\HtmlString;
use Spatie\Activitylog\Models\Activity;

class ActivityLogResource extends Resource
{
    protected static ?string $model = Activity::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    protected static ?string $navigationLabel = 'Registro de Actividad';

    protected static ?string $modelLabel = 'Registro de Actividad';

    protected static ?string $pluralModelLabel = 'Registro de Actividad';

    protected static ?int $navigationSort = 50;

    protected static ?string $navigationGroup = 'Sistema';

    protected static function isSuperAdmin(): bool
    {
        $user = auth()->user();

        return $user?->hasRole(
            config('filament-spatie-roles-permissions.super_admin_role_name', 'Super Admin')
        ) ?? false;
    }

    public static function canAccess(): bool
    {
        return static::isSuperAdmin();
    }

    public static function canViewAny(): bool
    {
        return static::isSuperAdmin();
    }

    public static function table(Table $table): Table
    {
        return $table
            ->paginationPageOptions([5, 20, 50, 100])
            ->defaultSort('id', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('causer.name')
                    ->label('Usuario')
                    ->default('Sistema')
                    ->sortable(),
                Tables\Columns\TextColumn::make('event')
                    ->label('Acción')
                    ->badge()
                    ->color(fn(?string $state): string => match ($state) {
                        'created' => 'success',
                        'updated' => 'warning',
                        'deleted' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn(?string $state): string => $state ? ucfirst($state) : 'Evento'),
                Tables\Columns\TextColumn::make('description')

                    ->label('Descripción')
                    ->limit(50)
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->tooltip(fn($record) => $record->description),
                Tables\Columns\TextColumn::make('properties')
                    ->label('Cambios')
                    ->formatStateUsing(function ($state, $record): HtmlString {
                        $event = $record->event;
                        $attributes = $record->properties?->get('attributes') ?? [];
                        $old = $record->properties?->get('old') ?? [];

                        if (empty($attributes) && empty($old)) {
                            return new HtmlString(
                                '<span class="text-gray-400 italic text-xs">Sin cambios</span>'
                            );
                        }

                        $count = count($attributes ?: $old);
                        $label = match ($event) {
                            'created' => $count . ' campo' . ($count > 1 ? 's' : '') . ' creado' . ($count > 1 ? 's' : ''),
                            'deleted' => $count . ' campo' . ($count > 1 ? 's' : '') . ' eliminado' . ($count > 1 ? 's' : ''),
                            default => $count . ' cambio' . ($count > 1 ? 's' : ''),
                        };
                        $color = match ($event) {
                            'created' => 'text-green-400',
                            'deleted' => 'text-red-400',
                            default => 'text-amber-400',
                        };
                        $dotColor = match ($event) {
                            'created' => 'bg-green-400',
                            'deleted' => 'bg-red-400',
                            default => 'bg-amber-400',
                        };

                        return new HtmlString(
                            '<div class="flex items-center gap-1.5">'
                                . '<span class="inline-block w-2 h-2 rounded-full ' . $dotColor . '"></span>'
                                . '<span class="text-xs font-medium ' . $color . '">' . $label . '</span>'
                                . '</div>'
                        );
                    })
                    ->html(),
                Tables\Columns\TextColumn::make('log_name')
                    ->label('Registro')
                    ->badge()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('subject_type')
                    ->label('Modelo')
                    ->formatStateUsing(fn(?string $state): string => $state ? class_basename($state) : 'N/A')
                    ->sortable(),
                Tables\Columns\TextColumn::make('subject_id')
                    ->label('ID')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha')
                    ->dateTime()
                    ->sortable()
                    ->tooltip(fn($record) => $record->created_at?->diffForHumans()),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('log_name')
                    ->label('Registro')
                    ->options(fn() => Activity::query()
                        ->select('log_name')
                        ->distinct()
                        ->whereNotNull('log_name')
                        ->pluck('log_name', 'log_name')
                        ->toArray()),
                Tables\Filters\Filter::make('subject_id')
                    ->form([
                        TextInput::make('subject_id')
                            ->label('ID')
                            ->placeholder('Buscar por ID')
                            ->numeric(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['subject_id'] ?? null,
                            fn(Builder $query, $subjectId) => $query->where('subject_id', $subjectId),
                        );
                    }),
                Tables\Filters\SelectFilter::make('causer_id')
                    ->label('Usuario')
                    ->options(fn() => User::query()
                        ->whereIn('id', Activity::query()->whereNotNull('causer_id')->distinct()->pluck('causer_id'))
                        ->pluck('name', 'id')
                        ->toArray())
                    ->searchable()
                    ->placeholder('Todos los usuarios'),
                Tables\Filters\Filter::make('created_at')
                    ->label('Rango de fechas')
                    ->form([
                        DatePicker::make('from')
                            ->label('Desde'),
                        DatePicker::make('until')
                            ->label('Hasta'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['from'] ?? null,
                                fn(Builder $query, $date) => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['until'] ?? null,
                                fn(Builder $query, $date) => $query->whereDate('created_at', '<=', $date),
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['from'] ?? null) {
                            $indicators[] = 'Desde: ' . \Carbon\Carbon::parse($data['from'])->format('d/m/Y');
                        }
                        if ($data['until'] ?? null) {
                            $indicators[] = 'Hasta: ' . \Carbon\Carbon::parse($data['until'])->format('d/m/Y');
                        }
                        return $indicators;
                    }),
            ])
            ->actions([
                Tables\Actions\Action::make('ver_detalle')
                    ->label('Ver detalle')
                    ->icon('heroicon-m-eye')
                    ->color('gray')
                    ->modalHeading(fn($record) => 'Detalle de cambios — ' . ucfirst($record->event ?? 'evento'))
                    ->modalDescription(fn($record) => ($record->subject_type ? class_basename($record->subject_type) : 'Recurso') . ' ID: ' . ($record->subject_id ?? '—') . ' - ' . ($record->created_at?->format('d/m/Y H:i:s') ?? ''))
                    ->modalContent(function ($record): HtmlString {
                        $event = $record->event;
                        $attributes = $record->properties?->get('attributes') ?? [];
                        $old = $record->properties?->get('old') ?? [];

                        if (empty($attributes) && empty($old)) {
                            return new HtmlString(
                                '<div class="p-6 text-center text-gray-400 italic">No hay cambios registrados para esta actividad.</div>'
                            );
                        }

                        $formatValue = function ($value): string {
                            if (is_null($value)) return '<span class="italic text-gray-500">nulo</span>';
                            if (is_bool($value)) return $value
                                ? '<span class="text-green-400 font-semibold">Sí</span>'
                                : '<span class="text-red-400 font-semibold">No</span>';
                            if (is_string($value) && $value === '') return '<span class="italic text-gray-500">vacío</span>';
                            if (is_array($value)) return '<pre class="text-xs bg-gray-800 rounded p-1 inline">' . e(json_encode($value, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) . '</pre>';
                            return e((string) $value);
                        };

                        $eventBadge = match ($event) {
                            'created' => '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">Creado</span>',
                            'updated' => '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400">Actualizado</span>',
                            'deleted' => '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">Eliminado</span>',
                            default => '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400">' . e(ucfirst($event ?? 'Evento')) . '</span>',
                        };

                        $causer = $record->causer?->name ?? 'Sistema';

                        $header = '<div class="flex items-center justify-between mb-4">'
                            . '<div class="flex items-center gap-2">' . $eventBadge . '</div>'
                            . '<span class="text-xs text-gray-400">por <span class="font-medium text-gray-300">' . e($causer) . '</span></span>'
                            . '</div>';

                        $rows = [];

                        if ($event === 'created') {
                            foreach ($attributes as $key => $value) {
                                $rows[] = '<tr class="border-b border-gray-700/50">'
                                    . '<td class="py-2.5 px-3 text-sm font-medium text-gray-300 whitespace-nowrap align-top">' . e($key) . '</td>'
                                    . '<td class="py-2.5 px-3 text-sm text-green-300 break-all">' . $formatValue($value) . '</td>'
                                    . '</tr>';
                            }

                            $table = '<table class="w-full">'
                                . '<thead><tr class="border-b border-gray-600">'
                                . '<th class="py-2 px-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Campo</th>'
                                . '<th class="py-2 px-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor</th>'
                                . '</tr></thead>'
                                . '<tbody>' . implode('', $rows) . '</tbody>'
                                . '</table>';
                        } elseif ($event === 'deleted') {
                            $deletedAttrs = !empty($old) ? $old : $attributes;
                            foreach ($deletedAttrs as $key => $value) {
                                $rows[] = '<tr class="border-b border-gray-700/50">'
                                    . '<td class="py-2.5 px-3 text-sm font-medium text-gray-300 whitespace-nowrap align-top">' . e($key) . '</td>'
                                    . '<td class="py-2.5 px-3 text-sm text-red-300 line-through break-all">' . $formatValue($value) . '</td>'
                                    . '</tr>';
                            }

                            $table = '<table class="w-full">'
                                . '<thead><tr class="border-b border-gray-600">'
                                . '<th class="py-2 px-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Campo</th>'
                                . '<th class="py-2 px-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor eliminado</th>'
                                . '</tr></thead>'
                                . '<tbody>' . implode('', $rows) . '</tbody>'
                                . '</table>';
                        } else {
                            foreach ($attributes as $key => $value) {
                                $oldValue = $old[$key] ?? null;
                                $hasOld = array_key_exists($key, $old);

                                if (!$hasOld && $oldValue === null) {
                                    $rows[] = '<tr class="border-b border-gray-700/50">'
                                        . '<td class="py-2.5 px-3 text-sm font-medium text-gray-300 whitespace-nowrap align-top">' . e($key) . '</td>'
                                        . '<td class="py-2.5 px-3 text-sm text-gray-500 italic align-top">—</td>'
                                        . '<td class="py-2.5 px-3 text-sm text-blue-300 break-all">' . $formatValue($value) . '</td>'
                                        . '</tr>';
                                } else {
                                    $rows[] = '<tr class="border-b border-gray-700/50">'
                                        . '<td class="py-2.5 px-3 text-sm font-medium text-gray-300 whitespace-nowrap align-top">' . e($key) . '</td>'
                                        . '<td class="py-2.5 px-3 text-sm text-red-300/70 line-through break-all align-top">' . $formatValue($oldValue) . '</td>'
                                        . '<td class="py-2.5 px-3 text-sm text-green-300 break-all">' . $formatValue($value) . '</td>'
                                        . '</tr>';
                                }
                            }

                            $table = '<table class="w-full">'
                                . '<thead><tr class="border-b border-gray-600">'
                                . '<th class="py-2 px-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Campo</th>'
                                . '<th class="py-2 px-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Anterior</th>'
                                . '<th class="py-2 px-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nuevo</th>'
                                . '</tr></thead>'
                                . '<tbody>' . implode('', $rows) . '</tbody>'
                                . '</table>';
                        }

                        return new HtmlString(
                            '<div class="p-4">'
                                . $header
                                . '<div class="rounded-lg border border-gray-700 overflow-hidden">'
                                . $table
                                . '</div>'
                                . '</div>'
                        );
                    })
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Cerrar')
                    ->modalWidth('4xl'),
            ])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListActivityLogs::route('/'),
        ];
    }
}
