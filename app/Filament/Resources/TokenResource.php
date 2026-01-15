<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TokenResource\Pages;
use App\Filament\Resources\TokenResource\RelationManagers;
use App\Models\Token;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\View\TablesRenderHook;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TokenResource extends Resource
{
    protected static ?string $model = Token::class;

    protected static ?string $navigationIcon = 'heroicon-o-key';

    protected static ?string $navigationLabel = 'Tokens';

    protected static ?string $modelLabel = 'Token';

    protected static ?string $pluralModelLabel = 'Tokens';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Estado del Token')
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

                Forms\Components\Fieldset::make('Datos del Token')
                    ->columns(1)
                    ->schema([
                        Forms\Components\TextInput::make('access_token')
                            ->label(__('Token de Acceso'))
                            ->required()
                            ->placeholder('Ingresa el token de acceso')
                            ->helperText('Token dado por el servicio externo para autenticación')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('service')
                            ->label(__('Servicio'))
                            ->required()
                            ->maxLength(100)
                            ->placeholder('Nombre del servicio asociado')
                            ->helperText('Nombre o identificador único del servicio que utiliza este token')
                            ->columnSpanFull(),
                    ]),
            ])
            ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->paginationPageOptions([5, 20, 50, 100])
            ->deferLoading()
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label(__('ID'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('service')
                    ->label(__('Servicio'))
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('access_token')
                    ->label(__('Token'))
                    ->limit(40)
                    ->searchable()
                    ->copyable()
                    ->copyableState(fn ($state) => $state),
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
            'index' => Pages\ListTokens::route('/'),
            'create' => Pages\CreateToken::route('/create'),
            'edit' => Pages\EditToken::route('/{record}/edit'),
        ];
    }
}
