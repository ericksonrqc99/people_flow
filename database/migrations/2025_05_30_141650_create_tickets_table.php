<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('code', 100)->unique();
            $table->string('visible_code',  100);
            $table->foreignId('area_id')->constrained('areas')->onDelete('restrict');
            $table->foreignId('citizen_id')->constrained('citizens')->onDelete('restrict');
            $table->foreignId('registered_by')->constrained('users')->onDelete('restrict');
            $table->foreignId('attended_by')->nullable()->constrained('users')->onDelete('restrict');
            $table->timestamp("time_admission")->nullable();
            $table->timestamp("time_departure")->nullable();
            $table->text('observations')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('area_citizen');
    }
};
