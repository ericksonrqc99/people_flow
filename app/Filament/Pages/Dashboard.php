<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected static string $view = 'filament.pages.dashboard';
    protected static ?string $title = 'Dashboard';



    protected function isSuperAdmin(): bool
    {
        $user = auth()->user();

        return $user?->hasRole(
            config('filament-spatie-roles-permissions.super_admin_role_name', 'Super Admin')
        ) ?? false;
    }

    public function getWidgets(): array
    {
        if (! $this->isSuperAdmin()) {
            return [];
        }

        return parent::getWidgets();
    }

    public function getColumns(): int | array
    {
        return 2;
    }

    protected function getViewData(): array
    {
        return array_merge(parent::getViewData(), [
            'isSuperAdmin' => $this->isSuperAdmin(),
            'homeUrl' => url('/'),
        ]);
    }
}
