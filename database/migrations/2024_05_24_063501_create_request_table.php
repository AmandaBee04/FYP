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
        Schema::create('request', function (Blueprint $table) {
            $table->id(); 
            $table->string('request')->nullable(); 
            $table->string('reason')->nullable();
            $table->string('lec_id');
            $table->foreign('lec_id')->references('lec_id')->on('lecturer')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request');
    }
};
