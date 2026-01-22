<?php

namespace App\Filament\Resources;

use Althinect\FilamentSpatieRolesPermissions\Resources\RoleResource as BaseRoleResource;
use App\Filament\Resources\RoleResource\Pages\ListRoles;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class RoleResource extends BaseRoleResource
{
    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationLabel = 'Roles';

    protected static ?string $modelLabel = 'Rol';

    protected static ?string $pluralModelLabel = 'Roles';

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

    public static function canCreate(): bool
    {
        return static::isSuperAdmin();
    }

    public static function canEdit(Model $record): bool
    {
        return static::isSuperAdmin();
    }

    public static function canDelete(Model $record): bool
    {
        return static::isSuperAdmin();
    }

    public static function canDeleteAny(): bool
    {
        return static::isSuperAdmin();
    }

    public static function canForceDelete(Model $record): bool
    {
        return static::isSuperAdmin();
    }

    public static function canForceDeleteAny(): bool
    {
        return static::isSuperAdmin();
    }

    public static function canRestore(Model $record): bool
    {
        return static::isSuperAdmin();
    }

    public static function canRestoreAny(): bool
    {
        return static::isSuperAdmin();
    }

    public static function canReplicate(Model $record): bool
    {
        return static::isSuperAdmin();
    }

    public static function canReorder(): bool
    {
        return static::isSuperAdmin();
    }

    public static function table(Table $table): Table
    {
        $superAdminName = config('filament-spatie-roles-permissions.super_admin_role_name', 'Super Admin');

        return parent::table($table)
            ->modifyQueryUsing(static fn(Builder $query) => $query->where('name', '!=', $superAdminName))
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        if (config('filament-spatie-roles-permissions.should_use_simple_modal_resource.roles')) {
            return [
                'index' => ListRoles::route('/'),
            ];
        }

        return [
            'index' => ListRoles::route('/'),
            'create' => \Althinect\FilamentSpatieRolesPermissions\Resources\RoleResource\Pages\CreateRole::route('/create'),
            'edit' => \Althinect\FilamentSpatieRolesPermissions\Resources\RoleResource\Pages\EditRole::route('/{record}/edit'),
            'view' => \Althinect\FilamentSpatieRolesPermissions\Resources\RoleResource\Pages\ViewRole::route('/{record}'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        $superAdminName = config('filament-spatie-roles-permissions.super_admin_role_name', 'Super Admin');

        return parent::getEloquentQuery()
            ->where('name', '!=', $superAdminName);
    }
}
