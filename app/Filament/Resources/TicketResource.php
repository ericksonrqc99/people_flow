<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TicketResource\Pages;
use App\Filament\Resources\TicketResource\RelationManagers;
use App\Models\Ticket;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TicketResource extends Resource
{
    protected static ?string $model = Ticket::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    protected static ?string $navigationLabel = 'Tickets';

    protected static ?string $modelLabel = 'Ticket';

    protected static ?string $pluralModelLabel = 'Tickets';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Códigos del Ticket (Solo visible al editar)
                Forms\Components\Section::make('Códigos del Ticket')
                    ->description('Los códigos se generan automáticamente al crear el ticket')
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('code')
                                    ->label('Código Interno')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->placeholder('Se genera automáticamente')
                                    ->helperText('Código único del sistema'),

                                Forms\Components\TextInput::make('visible_code')
                                    ->label('Código Visible')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->placeholder('Se genera automáticamente')
                                    ->helperText('Código que ve el ciudadano'),
                            ]),
                    ])
                    ->hidden(fn(string $operation): bool => $operation === 'create')
                    ->collapsible(),

                // Información del Ticket
                Forms\Components\Fieldset::make('Información del Ticket')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('area_id')
                            ->label('Área de Atención')
                            ->relationship('area', 'name')
                            ->searchable()
                            ->preload()
                            ->placeholder('Busca un área por nombre')
                            ->required()
                            ->helperText('Área responsable del ticket')
                            ->columnSpan(1),

                        Forms\Components\Select::make('status_id')
                            ->label('Estado del Ticket')
                            ->relationship('status', 'type', function ($query) {
                                return $query->where('model', \App\Models\Ticket::class);
                            })
                            ->getOptionLabelFromRecordUsing(function ($record) {
                                return ucfirst($record->type);
                            })
                            ->preload()
                            ->required()
                            ->default(5)
                            ->placeholder('Selecciona un estado')
                            ->helperText('Estado actual del ticket')
                            ->columnSpan(1),
                    ]),

                // Información del Ciudadano
                Forms\Components\Fieldset::make('Ciudadano')
                    ->columns(1)
                    ->schema([
                        Forms\Components\Select::make('citizen_id')
                            ->label('Ciudadano')
                            ->relationship('citizen', 'id')
                            ->getOptionLabelFromRecordUsing(function ($record) {
                                $fullName = trim(
                                    ($record->names ?? '') . ' ' .
                                        ($record->first_surname ?? '') . ' ' .
                                        ($record->second_surname ?? '')
                                );

                                $document = $record->document_number ? " (Doc: {$record->document_number})" : '';

                                return $fullName . $document;
                            })
                            ->searchable(['names', 'first_surname', 'second_surname', 'document_number'])
                            ->preload()
                            ->required()
                            ->placeholder('Busca un ciudadano por nombre o documento')
                            ->helperText('Selecciona el ciudadano que solicita el servicio'),
                    ]),

                // Gestión del Personal
                Forms\Components\Fieldset::make('Personal Asignado')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('registered_by_id')
                            ->label('Registrado por')
                            ->relationship('registeredBy', 'name')
                            ->searchable()
                            ->preload()
                            ->placeholder('Busca un usuario por nombre')
                            ->required()
                            ->helperText('Usuario que registra el ticket')
                            ->columnSpan(1),

                        Forms\Components\Select::make('attended_by_id')
                            ->label('Asignado a')
                            ->relationship('attendedBy', 'name')
                            ->searchable()
                            ->preload()
                            ->placeholder('Busca un usuario por nombre')
                            ->helperText('Usuario responsable de atender')
                            ->columnSpan(1),
                    ]),

                // Horarios de Atención
                Forms\Components\Fieldset::make('Horarios de Atención')
                    ->columns(2)
                    ->schema([
                        Forms\Components\DateTimePicker::make('time_admission')
                            ->label('Hora de Admisión')
                            ->helperText('Momento en que el ciudadano es admitido')
                            ->seconds(false)
                            ->columnSpan(1),

                        Forms\Components\DateTimePicker::make('time_departure')
                            ->label('Hora de Salida')
                            ->helperText('Momento en que el ciudadano se retira')
                            ->seconds(false)
                            ->columnSpan(1),
                    ]),

                // Observaciones Adicionales
                Forms\Components\Fieldset::make('Observaciones')
                    ->columns(1)
                    ->schema([
                        Forms\Components\Textarea::make('observations')
                            ->label('Observaciones del Ticket')
                            ->placeholder('Ingresa observaciones, notas o comentarios adicionales...')
                            ->rows(4)
                            ->maxLength(1000)
                            ->helperText('Información adicional relevante para el ticket')
                            ->columnSpanFull(),
                    ]),
            ])
            ->columns(1); // Formulario en una columna para mejor organización
    }

    public static function table(Table $table): Table
    {
        return $table
            ->paginationPageOptions([5, 20, 50, 100])
            ->deferLoading()
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('code')
                    ->label('Código Interno')
                    ->badge()
                    ->color('gray')
                    ->icon('heroicon-m-hashtag')
                    ->searchable(),
                Tables\Columns\TextColumn::make('visible_code')
                    ->label('Código Visible')
                    ->badge()
                    ->color('primary')
                    ->icon('heroicon-m-ticket')
                    ->searchable(),
                Tables\Columns\TextColumn::make('area.name')
                    ->label('Área')
                    ->badge()
                    ->color('info')
                    ->icon('heroicon-m-building-office-2')
                    ->sortable(),
                Tables\Columns\TextColumn::make('citizen.full_name')
                    ->label('Ciudadano')
                    ->getStateUsing(function ($record): string {
                        $citizen = $record->citizen;
                        if (!$citizen) return 'Sin ciudadano';

                        return $citizen->full_name ?: 'Sin nombre';
                    })
                    ->searchable(['citizens.names', 'citizens.first_surname', 'citizens.second_surname'])
                    ->sortable()
                    ->limit(30)
                    ->tooltip(function ($record): ?string {
                        $citizen = $record->citizen;
                        if (!$citizen) return null;

                        return "Documento: " . ($citizen->document_number ?? 'N/A') . "\n" .
                            "Teléfono: " . ($citizen->phone ?? 'N/A') . "\n" .
                            "Email: " . ($citizen->email ?? 'N/A');
                    })
                    ->icon('heroicon-m-user-circle')
                    ->iconColor('gray'),
                Tables\Columns\TextColumn::make('registeredBy.name')
                    ->label(__('Registrado por'))
                    ->badge()
                    ->color('gray')
                    ->icon('heroicon-m-user-plus')
                    ->sortable(),
                Tables\Columns\TextColumn::make('attendedBy.name')
                    ->label(__('Atendido por'))
                    ->badge()
                    ->color('success')
                    ->icon('heroicon-m-user')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status.type')
                    ->label('Estado')
                    ->badge()
                    ->color(fn($record): string => match ($record->status_id) {
                        5 => 'warning',  // en espera
                        6 => 'info',     // atendiendo
                        7 => 'success',  // cerrado
                        8 => 'danger',   // cancelado
                        default => 'gray',
                    })
                    ->formatStateUsing(fn($state): string => ucfirst($state ?? 'Sin estado'))
                    ->icon(fn($record): string => match ($record->status_id) {
                        5 => 'heroicon-m-clock',
                        6 => 'heroicon-m-user-circle',
                        7 => 'heroicon-m-check-circle',
                        8 => 'heroicon-m-x-circle',
                        default => 'heroicon-m-question-mark-circle',
                    })
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('time_admission')
                    ->label(__('Ingreso'))
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('time_departure')
                    ->label(__('Salida'))
                    ->dateTime()
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
            'index' => Pages\ListTickets::route('/'),
            'create' => Pages\CreateTicket::route('/create'),
            'edit' => Pages\EditTicket::route('/{record}/edit'),
        ];
    }
}
