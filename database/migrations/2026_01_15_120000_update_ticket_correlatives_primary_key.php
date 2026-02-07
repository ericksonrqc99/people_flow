<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ticket_correlatives', function (Blueprint $table) {
            $table->dropPrimary(['area_code', 'date']);
            $table->unique(['area_code', 'date']);
        });

        Schema::table('ticket_correlatives', function (Blueprint $table) {
            if (! Schema::hasColumn('ticket_correlatives', 'id')) {
                $table->bigIncrements('id')->first();
            }
        });
    }

    public function down(): void
    {
        Schema::table('ticket_correlatives', function (Blueprint $table) {
            $table->dropPrimary();
            $table->dropUnique(['area_code', 'date']);
            $table->dropColumn('id');
            $table->primary(['area_code', 'date']);
        });
    }
};
