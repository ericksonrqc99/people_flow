<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\Area;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Notifications\Notification;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationLabel = 'Usuarios';

    protected static ?string $modelLabel = 'Usuario';

    protected static ?string $pluralModelLabel = 'Usuarios';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Estado del Usuario')
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
                    ])
                    ->collapsible(),

                Forms\Components\Fieldset::make('Datos del Usuario')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label(__('Nombre Completo'))
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Ingresa el nombre completo')
                            ->helperText('Nombre y apellido del usuario administrativo')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('display_name')
                            ->label(__('Nombre Visible / Cargo'))
                            ->maxLength(255)
                            ->placeholder('Ej: Caja 1')
                            ->helperText('Nombre que se mostrará al llamar tickets')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('email')
                            ->label(__('Correo'))
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Ingresa un correo válido')
                            ->helperText('Correo electrónico único para acceder al panel administrativo')
                            ->columnSpan(1),
                        Forms\Components\TextInput::make('password')
                            ->label(__('Contraseña'))
                            ->password()
                            ->required(fn(string $operation) => $operation === 'create')
                            ->maxLength(255)
                            ->live()
                            ->placeholder('Contraseña segura')
                            ->helperText(fn(string $operation) => $operation === 'create' ? 'Contraseña inicial del usuario' : 'Dejar en blanco para mantener la contraseña actual')
                            ->columnSpan(1),
                        Forms\Components\TextInput::make('password_confirmation')
                            ->label(__('Confirmar Contraseña'))
                            ->password()
                            ->maxLength(255)
                            ->placeholder('Repetir la contraseña')
                            ->helperText(fn(string $operation) => $operation === 'create' ? 'Confirmar contraseña inicial del usuario' : 'Dejar en blanco para mantener la contraseña actual')
                            ->requiredWith('password')
                            ->same('password'),
                    ]),

                Forms\Components\Fieldset::make('Asignación de Área')
                    ->columns(1)
                    ->schema([
                        Forms\Components\Select::make('area_id')
                            ->label(__('Área'))
                            ->searchable()
                            ->options(fn() => Area::all()->pluck('name', 'id'))
                            ->preload()
                            ->relationship('area', 'name')
                            ->placeholder('Selecciona un área')
                            ->helperText('Área departamental donde labora el usuario'),
                    ]),

                Forms\Components\Fieldset::make('Asignación de Roles')
                    ->columns(1)
                    ->schema([
                        Forms\Components\Select::make('roles')
                            ->multiple()
                            ->label(__('Roles'))
                            ->preload()
                            ->options(fn() => Role::all()->pluck('name', 'id'))
                            ->relationship('roles', 'name')
                            ->placeholder('Selecciona uno o más roles')
                            ->helperText('Roles que definen los permisos y funcionalidades del usuario'),
                    ]),
            ])
            ->columns(1);
    }



    public static function table(Table $table): Table
    {
        return $table
            ->deferLoading()
            ->paginationPageOptions([5, 20, 50, 100])
            ->modifyQueryUsing(fn(Builder $query) => $query->where('id', '!=', Auth::id()))
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label(__('Nombre'))
                    ->icon('heroicon-m-user-circle')
                    ->iconColor('gray')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('display_name')
                    ->label(__('Nombre Visible'))
                    ->badge()
                    ->color('secondary')
                    ->icon('heroicon-m-identification')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('email')
                    ->label(__('Correo'))
                    ->badge()
                    ->color('gray')
                    ->icon('heroicon-m-envelope')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('area.name')
                    ->label(__('Área'))
                    ->badge()
                    ->color('primary')
                    ->icon('heroicon-m-building-office-2')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('roles.name')
                    ->label(__('Roles'))
                    ->badge()
                    ->color('secondary')
                    ->icon('heroicon-m-shield-check')
                    ->searchable()
                    ->listWithLineBreaks(),
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
                    ->icon(fn(int $state): string => $state ? 'heroicon-m-check-circle' : 'heroicon-m-x-circle')
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
                Tables\Actions\DeleteAction::make()
                    ->visible(function (User $record): bool {
                        $superAdminEmail = env('SUPER_ADMIN_EMAIL', 'super-admin@munisanmiguel-sanroman.gob.pe');
                        return $record->email !== $superAdminEmail;
                    })
                    ->action(function (User $record) {
                        if (\App\Models\Ticket::where('registered_by_id', $record->id)->exists()
                            || \App\Models\Ticket::where('attended_by_id', $record->id)->exists()) {
                            Notification::make()
                                ->danger()
                                ->title('No se pudo eliminar')
                                ->body('El usuario "' . $record->name . '" tiene tickets asociados.')
                                ->send();
                            return;
                        }

                        $record->delete();

                        Notification::make()
                            ->success()
                            ->title('Usuario eliminado')
                            ->body('El usuario "' . $record->name . '" fue eliminado correctamente.')
                            ->send();
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->action(function ($records) {
                            $superAdminEmail = env('SUPER_ADMIN_EMAIL', 'super-admin@munisanmiguel-sanroman.gob.pe');
                            $records->each(function (User $record) use ($superAdminEmail) {
                                if ($record->email === $superAdminEmail) return;

                                if (\App\Models\Ticket::where('registered_by_id', $record->id)->exists()
                                    || \App\Models\Ticket::where('attended_by_id', $record->id)->exists()) {
                                    Notification::make()
                                        ->danger()
                                        ->title('No se pudo eliminar')
                                        ->body('El usuario "' . $record->name . '" tiene tickets asociados.')
                                        ->send();
                                    return;
                                }

                                $record->delete();

                                Notification::make()
                                    ->success()
                                    ->title('Usuario eliminado')
                                    ->body('El usuario "' . $record->name . '" fue eliminado correctamente.')
                                    ->send();
                            });
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
