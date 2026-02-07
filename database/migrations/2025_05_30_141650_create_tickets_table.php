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
            $table->foreignId('registered_by_id')->constrained('users')->onDelete('restrict');
            $table->foreignId('attended_by_id')->nullable()->constrained('users')->onDelete('restrict');
            $table->unsignedBigInteger('status_id')->default(5); // value of the “waiting” status ID, which is 5 generated from the seeders
            $table->foreign('status_id')
                ->references('id')
                ->on('types')
                ->onDelete('cascade');
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
