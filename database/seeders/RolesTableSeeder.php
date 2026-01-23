<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
    public function run(): void
    {

        $superAdmin = env("SUPER_ADMIN_NAME", 'Super Admin');
        // Very important for permissions
        Role::create([
            'id' => 1,
            'name' => $superAdmin,
            'guard_name' => 'web',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Role::create([
            'id' => 2,
            'name' => 'usuario panel',
            'guard_name' => 'web',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Role::create([
            'id' => 3,
            'name' => 'usuario gat',
            'guard_name' => 'web',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        Role::create([
            'id' => 4,
            'name' => 'usuario modulo',
            'guard_name' => 'web',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
