<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TokensTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tokens = [
            ['is_active' => 1, 'access_token' => env('FACTILIZA_TOKEN'), 'service' => 'factiliza', 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('tokens')->insert($tokens);
    }
}
