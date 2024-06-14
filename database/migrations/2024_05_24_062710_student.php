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
        Schema::create('students', function (Blueprint $table) {
            $table->string('stud_id')->primary(); 
            $table->string('stud_name')->nullable();
            $table->string('stud_password')->nullable();
            $table->string('stud_email')->unique();
            $table->string('programme')->nullable();
            $table->string('faculty')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('sub_id');
            $table->foreign('sub_id')->references('id')->on('subjects')->onDelete('cascade')->onUpdate('cascade');
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
