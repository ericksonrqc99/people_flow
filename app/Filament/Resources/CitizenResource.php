<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CitizenResource\Pages;
use App\Filament\Resources\CitizenResource\RelationManagers;
use App\Models\Citizen;
use App\Services\ApiReniecService;
use App\Services\FactilizaApiService;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

use Filament\Actions;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Notifications\Notification;
use GuzzleHttp\Client;

class CitizenResource extends Resource
{
    protected static ?string $model = Citizen::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public  bool $isReadOnlyCitizenData = true;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Toggle::make('is_active')
                    ->label(__('Estado'))
                    ->onColor('success')
                    ->offColor('danger')
                    ->onIcon('heroicon-o-check')
                    ->offIcon('heroicon-o-x-mark')
                    ->default(true)
                    ->columnSpanFull(),
                Forms\Components\Fieldset::make(__('Buscador por DNI'))
                    ->schema([
                        Forms\Components\TextInput::make('document_number')
                            ->label(__('DNI'))
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->validationMessages(['unique' => 'El DNI ya está siendo usado'])
                            ->suffixActions([
                                Forms\Components\Actions\Action::make('search-citizen')
                                    ->action(function (Set $set, $state) {
                                        if (!is_numeric($state)) {
                                            Notification::make()
                                                ->warning()
                                                ->title('DNI inválido')
                                                ->body('El dni ingresado solo debe contener números')
                                                ->send();
                                            return;
                                        }
                                        if (strlen($state) !== 8) {
                                            Notification::make()
                                                ->warning()
                                                ->title('DNI inválido')
                                                ->body('El dni debe contener 8 dígitos')
                                                ->send();
                                            return;
                                        }
                                        try {
                                            $responseRaw = FactilizaApiService::getDataCitizenByDni($state);
                                            if ((
                                                    $responseRaw['status'] ?? null) === 200
                                                && ($responseRaw['message'] ?? null) === 'Exito'
                                                && ($responseRaw['success'] ?? null) === true
                                            ) {
                                                $response = FactilizaApiService::mapCitizen($responseRaw['data']);
                                                $set('names', Str::title(trim($response['names'])));
                                                $set('first_surname', Str::title(trim($response['first_surname'])));
                                                $set('second_surname', Str::title(trim($response['second_surname'])));
                                                $set('departament', Str::title(trim($response['departament'])));
                                                $set('district', Str::title(trim($response['district'])));
                                                $set('province', Str::title(trim($response['province'])));
                                                $set('address', Str::title(trim($response['address'])));
                                                $set('isReadOnlyCitizenData', true);
                                            } else {
                                                Notification::make()
                                                    ->warning()
                                                    ->title('Ocurrió un problema')
                                                    ->body($responseRaw['message'])
                                                    ->send();
                                                return;
                                            }
                                        } catch (\Throwable $th) {
                                            dd($th);
                                            Notification::make()
                                                ->danger()
                                                ->title('Error desconocido')
                                                ->body('Ocurrió un error, ponte en contacto con el administrador de sistemas')
                                                ->send();
                                        }
                                    })
                                    ->icon('heroicon-o-magnifying-glass')
                            ])
                            ->afterStateUpdated(
                                fn(Set $set) => $set('isReadOnlyCitizenData', false)
                            )
                            ->live()
                            ->numeric(),
                    ])->columns(3)
                    ->hidden(fn(string $operation) => $operation === 'edit'),
                Forms\Components\Fieldset::make(__('Datos'))->schema([
                    Forms\Components\Hidden::make('isReadOnlyCitizenData')
                        ->default(false)
                        ->disabled()
                        ->live(),
                    Forms\Components\TextInput::make('names')
                        ->label(__('Nombres'))
                        ->required()
                        ->readOnly(fn(Get $get) => $get('isReadOnlyCitizenData'))
                        ->maxLength(100),
                    Forms\Components\TextInput::make('first_surname')
                        ->label(__('Primer Apellido'))
                        ->required()
                        ->readOnly(fn(Get $get) => $get('isReadOnlyCitizenData'))
                        ->maxLength(100),
                    Forms\Components\TextInput::make('second_surname')
                        ->label(__('Segundo Apellido'))
                        ->readOnly(fn(Get $get) => $get('isReadOnlyCitizenData'))
                        ->maxLength(100),
                    Forms\Components\TextInput::make('departament')
                        ->label(__('Departamento'))
                        ->readOnly(fn(Get $get) => $get('isReadOnlyCitizenData'))
                        ->maxLength(100),
                    Forms\Components\TextInput::make('province')
                        ->label(__('Provincia'))
                        ->readOnly(fn(Get $get) => $get('isReadOnlyCitizenData'))
                        ->maxLength(100),
                    Forms\Components\TextInput::make('district')
                        ->label(__('Distrito'))
                        ->readOnly(fn(Get $get) => $get('isReadOnlyCitizenData'))
                        ->maxLength(100),
                    Forms\Components\TextInput::make('address')
                        ->label(__('Dirección'))
                        ->readOnly(fn(Get $get) => $get('isReadOnlyCitizenData'))
                        ->maxLength(100),
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->deferLoading()
            ->columns([
                Tables\Columns\TextColumn::make('document_number')
                    ->label(__('DNI'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('names')
                    ->label(__('Nombres'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('first_surname')
                    ->label(__('Primer Apellido'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('second_surname')
                    ->label(__('Segundo Apellido'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('date_of_birth')
                    ->label(__('Fecha de nacimiento'))
                    ->date()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->sortable(),
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
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListCitizens::route('/'),
            'create' => Pages\CreateCitizen::route('/create'),
            'edit' => Pages\EditCitizen::route('/{record}/edit'),
        ];
    }
}
