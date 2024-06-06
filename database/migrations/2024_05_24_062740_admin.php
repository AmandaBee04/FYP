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
        Schema::create('admins', function (Blueprint $table) {
            $table->string('admin_id')->primary();
            $table->string('password')->nullable();
            $table->string('lec_id');
            $table->string('stud_id');
            $table->foreign('lec_id')->references('lec_id')->on('lecturers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('stud_id')->references('stud_id')->on('students')->onDelete('cascade')->onUpdate('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
