<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->timestamp('called_at')->nullable()->after('time_departure');
            $table->foreignId('called_by_id')
                ->nullable()
                ->after('called_at')
                ->constrained('users')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['called_by_id']);
            $table->dropColumn(['called_at', 'called_by_id']);
        });
    }
};
