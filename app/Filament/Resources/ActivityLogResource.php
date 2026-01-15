<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ActivityLogResource\Pages;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
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
                Tables\Columns\TextColumn::make('event')
                    ->label('Acción')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'created' => 'success',
                        'updated' => 'warning',
                        'deleted' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (?string $state): string => $state ? ucfirst($state) : 'Evento'),
                Tables\Columns\TextColumn::make('description')
                    ->label('Descripción')
                    ->limit(50)
                    ->tooltip(fn ($record) => $record->description),
                Tables\Columns\TextColumn::make('properties')
                    ->label('Cambios')
                    ->formatStateUsing(function ($state, $record): HtmlString {
                        $attributes = $record->properties?->get('attributes') ?? [];
                        $old = $record->properties?->get('old') ?? [];

                        if (empty($attributes)) {
                            return new HtmlString('<span class="text-gray-400">Sin cambios</span>');
                        }

                        $lines = [];
                        foreach ($attributes as $key => $value) {
                            $oldValue = $old[$key] ?? null;
                            if ($oldValue === null) {
                                $lines[] = '<div><span class="text-gray-400">' . e($key) . ':</span> ' . e(json_encode($value, JSON_UNESCAPED_UNICODE)) . '</div>';
                            } else {
                                $lines[] = '<div><span class="text-gray-400">' . e($key) . ':</span> <span class="text-gray-500">' . e(json_encode($oldValue, JSON_UNESCAPED_UNICODE)) . '</span> <span class="text-gray-400">→</span> <span class="text-gray-200">' . e(json_encode($value, JSON_UNESCAPED_UNICODE)) . '</span></div>';
                            }
                        }

                        return new HtmlString('<div class="space-y-1 text-xs leading-5">' . implode('', $lines) . '</div>');
                    })
                    ->html()
                    ->wrap()
                    ->tooltip(function ($record) {
                        $attributes = $record->properties?->get('attributes') ?? [];
                        $old = $record->properties?->get('old') ?? [];

                        if (empty($attributes)) {
                            return 'Sin cambios';
                        }

                        $lines = [];
                        foreach ($attributes as $key => $value) {
                            $oldValue = $old[$key] ?? null;
                            if ($oldValue === null) {
                                $lines[] = $key . ': ' . json_encode($value, JSON_UNESCAPED_UNICODE);
                            } else {
                                $lines[] = $key . ': ' . json_encode($oldValue, JSON_UNESCAPED_UNICODE) . ' → ' . json_encode($value, JSON_UNESCAPED_UNICODE);
                            }
                        }

                        return implode("\n", $lines);
                    }),
                Tables\Columns\TextColumn::make('log_name')
                    ->label('Registro')
                    ->badge()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('subject_type')
                    ->label('Modelo')
                    ->formatStateUsing(fn (?string $state): string => $state ? class_basename($state) : 'N/A')
                    ->sortable(),
                Tables\Columns\TextColumn::make('subject_id')
                    ->label('ID')
                    ->sortable(),
                Tables\Columns\TextColumn::make('causer.name')
                    ->label('Usuario')
                    ->default('Sistema')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha')
                    ->since()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('log_name')
                    ->label('Registro')
                    ->options(fn () => Activity::query()
                        ->select('log_name')
                        ->distinct()
                        ->whereNotNull('log_name')
                        ->pluck('log_name', 'log_name')
                        ->toArray()),
            ])
            ->actions([])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListActivityLogs::route('/'),
        ];
    }
}
