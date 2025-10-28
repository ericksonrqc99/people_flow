<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Althinect\FilamentSpatieRolesPermissions\Commds\PermissionsCommand;

class PermissionsSyncSeeder extends Seeder
{
    public function run()
    {
        app(PermissionsCommand::class)->handle();
    }
}
