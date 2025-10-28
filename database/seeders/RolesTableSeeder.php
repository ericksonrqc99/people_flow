<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;



class RolesTableSeeder extends Seeder
{
    public function run(): void
    {
        // Very important for permissions
        Role::create([
            'id' => 1,
            'name' => 'Super Admin',
            'guard_name' => 'web',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
