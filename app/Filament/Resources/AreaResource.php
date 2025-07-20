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

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make()
                    ->columnSpanFull()
                    ->schema([
                        Forms\Components\Tabs\Tab::make('Datos Generales')
                            ->schema([
                                Forms\Components\Toggle::make('is_active')
                                    ->label(__('Estado'))
                                    ->onColor('success')
                                    ->offColor('danger')
                                    ->onIcon('heroicon-o-check')
                                    ->offIcon('heroicon-o-x-mark')
                                    ->default(true)
                                    ->columnSpanFull(),
                                Forms\Components\Fieldset::make()->schema([
                                    Forms\Components\TextInput::make('code')
                                        ->label(__('Código correlativo'))
                                        ->readOnly(),
                                    Forms\Components\Select::make('type_id')
                                        ->label(__('Tipo'))
                                        ->relationship('type', 'type')
                                        ->required()
                                        ->columnSpanFull(),
                                    Forms\Components\TextInput::make('name')
                                        ->label(__('Nombre'))
                                        ->required()
                                        ->maxLength(100)
                                        ->columnSpanFull(),
                                    Forms\Components\Textarea::make('description')
                                        ->label(__('Descripción'))
                                        ->maxLength(255)
                                        ->columnSpanFull(),
                                ]),

                            ]),
                        Forms\Components\Tabs\Tab::make(__('Relaciones'))->schema([
                            Forms\Components\Select::make('parent_id')
                                ->label(__('Area padre'))
                                ->relationship('parent', 'name')
                                // ->searchable(['name'])
                                ->extraInputAttributes(['readonly' => true])
                                ->preload(),

                        ])

                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->deferLoading()
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('Nombre'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->label(__('Descripción'))
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('parent.name')
                    ->label(__('Area padre'))
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
                    }),
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
