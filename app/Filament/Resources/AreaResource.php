<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AreaResource\Pages;
use App\Filament\Resources\AreaResource\RelationManagers;
use App\Models\Area;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\View\TablesRenderHook;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Collection;

class AreaResource extends Resource
{
    protected static ?string $model = Area::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';

    protected static ?string $navigationLabel = 'Áreas';

    protected static ?string $modelLabel = 'Área';

    protected static ?string $pluralModelLabel = 'Áreas';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Estado del Área')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->label(__('Estado'))
                            ->onColor('success')
                            ->offColor('danger')
                            ->onIcon('heroicon-o-check')
                            ->offIcon('heroicon-o-x-mark')
                            ->default(true)
                            ->columnSpanFull(),
                    ])
                    ->collapsible(),

                Forms\Components\Fieldset::make('Datos Generales')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('code')
                            ->label(__('Código Correlativo'))
                            ->readOnly()
                            ->disabled()
                            ->helperText('Identificador único asignado automáticamente por el sistema'),
                        Forms\Components\Select::make('type_id')
                            ->label(__('Tipo'))
                            ->relationship(
                                name: 'type',
                                titleAttribute: 'type',
                                modifyQueryUsing: fn(Builder $query) => $query
                                    ->whereHas(
                                        'area',
                                        fn($q) =>
                                        $q->where('model', Area::class)
                                    ),
                            )
                            ->required()
                            ->placeholder('Selecciona un tipo')
                            ->helperText('Categoría o clasificación operativa del área'),
                        Forms\Components\TextInput::make('name')
                            ->label(__('Nombre'))
                            ->required()
                            ->maxLength(100)
                            ->placeholder('Ingresa el nombre del área')
                            ->helperText('Nombre descriptivo y único del área dentro de la organización')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('description')
                            ->label(__('Descripción'))
                            ->maxLength(255)
                            ->placeholder('Describe brevemente la función del área')
                            ->helperText('Detalla las responsabilidades y funciones principales del área')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Fieldset::make('Jerarquía')
                    ->columns(1)
                    ->schema([
                        Forms\Components\Select::make('parent_id')
                            ->label(__('Área Padre'))
                            ->relationship('parent', 'name')
                            ->preload()
                            ->placeholder('Selecciona un área padre (opcional)')
                            ->helperText('Área superior en la estructura jerárquica de la organización'),
                    ]),
            ])
            ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->deferLoading()
            ->paginationPageOptions([5, 20, 50, 100])
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('code')
                    ->label(__('Código'))
                    ->badge()
                    ->color('gray')
                    ->icon('heroicon-m-hashtag')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('name')
                    ->label(__('Nombre'))
                    ->icon('heroicon-m-building-office-2')
                    ->iconColor('info')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('type.type')
                    ->label(__('Tipo'))
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->label(__('Descripción'))
                    ->icon('heroicon-m-document-text')
                    ->iconColor('gray')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('parent.name')
                    ->label(__('Área Padre'))
                    ->badge()
                    ->color('secondary')
                    ->icon('heroicon-m-arrow-up-right')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('is_active')
                    ->label(__('Estado'))
                    ->badge()
                    ->color(fn(int $state): string => match ($state) {
                        0 => 'danger',
                        1 => 'success'
                    })
                    ->formatStateUsing(fn(int $state): string => match ($state) {
                        0 => 'inactivo',
                        1 => 'activo'
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label(__('Creado'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label(__('Actualizado'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()->action(function ($data, Area $record) {
                    if ($record->users()->exists()) {
                        Notification::make()
                            ->danger()
                            ->title(__('No se pudo eliminar'))
                            ->body(__("El area $record->name está siendo usada"))
                            ->send();
                        return;
                    }

                    Notification::make()
                        ->success()
                        ->title(__('Area eliminada'))
                        ->body(__("El area $record->name fué eliminada"))
                        ->send();

                    $record->delete();
                }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->action(
                            fn(Collection $records) => $records->each(function (Area $record) {
                                if ($record->users()->exists()) {
                                    return Notification::make()
                                        ->danger()
                                        ->title(__('No se pudo eliminar'))
                                        ->body(__("El area $record->name está siendo usada"))
                                        ->send();
                                }
                                Notification::make()
                                    ->success()
                                    ->title(__('Area eliminada'))
                                    ->body(__("El area $record->name fué eliminada"))
                                    ->send();

                                $record->delete();
                            })
                        ),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAreas::route('/'),
            'create' => Pages\CreateArea::route('/create'),
            'edit' => Pages\EditArea::route('/{record}/edit'),
        ];
    }
}
