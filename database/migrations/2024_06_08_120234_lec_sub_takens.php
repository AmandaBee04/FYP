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
        Schema::create('lec_sub_takens', function (Blueprint $table) {
            $table->id();
            $table->string('lec_id');
            $table->string('sub_id');

            $table->foreign('lec_id')->references('id')->on('lecturers')->onDelete('cascade');
            $table->foreign('sub_id')->references('id')->on('subjects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lec_sub_takens');
    }
};
