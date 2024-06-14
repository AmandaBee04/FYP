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
        Schema::create('subject_takens', function (Blueprint $table) {
            $table->id();
            $table->string('stud_id');
            $table->string('sub_id');

            $table->foreign('stud_id')->references('stud_id')->on('students')->onDelete('cascade');
            $table->foreign('sub_id')->references('id')->on('subjects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subject_takens');
    }
};
