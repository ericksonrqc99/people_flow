<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\Area;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

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
                    ->columnSpanFull()
                    ->default(true)
                    ->required(),
                Forms\Components\Tabs::make('Tabs')->tabs([
                    Forms\Components\Tabs\Tab::make('Datos del usuario')->schema([
                        Forms\Components\TextInput::make('name')
                            ->label(__('Nombre Completo'))
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->label(__('Correo'))
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('password')
                            ->label(__('Contraseña'))
                            ->password()
                            ->required(fn(string $operation) => $operation === 'create')
                            ->maxLength(255),
                    ]),
                    Forms\Components\Tabs\Tab::make('Area')->schema([
                        Forms\Components\Select::make('area_id')
                            ->label(__('Area'))
                            ->searchable()
                            ->options(fn() => Area::all()->pluck('name', 'id'))
                            ->preload()
                            ->relationship('area', 'name'),
                    ]),
                    Forms\Components\Tabs\Tab::make('Roles')->schema([
                        Forms\Components\Select::make('roles')
                            ->multiple()
                            ->label(__('Rol'))
                            ->preload()
                            ->options(fn() => Role::all()->pluck('name', 'id'))
                            ->relationship('roles', 'name'),
                    ])

                ])->columnSpanFull()

            ]);
    }



    public static function table(Table $table): Table
    {
        return $table
            ->deferLoading()
            ->modifyQueryUsing(fn (Builder $query) => $query->where('id', '!=', Auth::id()))
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('Nombre'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('Correo'))
                    ->searchable(),
                Tables\Columns\TextColumn::make('area.name')
                    ->label(__('Area'))
                    ->badge()
                    ->color('warning')
                    ->numeric()
                    ->searchable()
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
                Tables\Actions\DeleteAction::make()
                    ->visible(function (User $record): bool {
                        $superAdminEmail = env('SUPER_ADMIN_EMAIL', 'super-admin@munisanmiguel-sanroman.gob.pe');
                        // No mostrar delete para super admin (ya está filtrado el usuario logueado en la tabla)
                        return $record->email !== $superAdminEmail;
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->before(function ($records) {
                            $superAdminEmail = env('SUPER_ADMIN_EMAIL', 'super-admin@munisanmiguel-sanroman.gob.pe');
                            // Filtrar para remover al super admin de la selección (el usuario logueado ya está filtrado)
                            return $records->filter(fn($record) => $record->email !== $superAdminEmail);
                        }),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
