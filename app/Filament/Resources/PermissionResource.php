<?php

namespace App\Filament\Resources;

use Althinect\FilamentSpatieRolesPermissions\Resources\PermissionResource as BasePermissionResource;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class PermissionResource extends BasePermissionResource
{
    protected static ?string $navigationIcon = 'heroicon-o-lock-closed';

    protected static ?string $navigationLabel = 'Permisos';

    protected static ?string $modelLabel = 'Permiso';

    protected static ?string $pluralModelLabel = 'Permisos';

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
        return parent::table($table)
            ->defaultSort('created_at', 'desc');
    }
}
