<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {

        $hashedPassword = Hash::make(env('SUPER_ADMIN_PASSWORD', 'supersecretpassword'));

        DB::table('users')->insert([
            'name' => 'Super Admin',
            'display_name' => 'Super Admin',
            'email' => env('SUPER_ADMIN_EMAIL', 'superadmin@admin.com'),
            'password' => $hashedPassword,
        ]);
    }
}
