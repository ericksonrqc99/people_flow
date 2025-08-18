<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\Ticket;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypesTableSeeder extends Seeder
{

    public function run(): void
    {
        $types = [
            ['id' => 1, 'type' => 'gerencia', 'model' => Area::class, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'type' => 'subgerencia', 'model' => Area::class, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'type' => 'unidad', 'model' => Area::class, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'type' => 'oficina', 'model' => Area::class, 'created_at' => now(), 'updated_at' => now()],

            ['id' => 5, 'type' => 'en espera', 'model' => Ticket::class, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'type' => 'atendiendo', 'model' => Ticket::class, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'type' => 'cerrado', 'model' => Ticket::class, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'type' => 'cancelado', 'model' => Ticket::class, 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('types')->insert($types);
    }
}
