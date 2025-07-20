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
        Schema::create('areas', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('code', 100);
            $table->string('short_name', 100);
            $table->string('description', 255)->nullable();
            $table->boolean('is_active')->default(true);
            
            $table->foreignId('parent_id')->nullable()->constrained('areas')->onDelete('restrict');

            $table->foreignId('type_id')->nullable()->constrained('types')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('areas');
    }
};
