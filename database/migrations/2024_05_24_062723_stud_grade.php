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
        Schema::create('stud_grades', function (Blueprint $table) {
            $table->id();
            $table->string('grade')->nullable();
            $table->integer('score')->nullable();
            $table->unsignedBigInteger('qs_id');
            $table->string('stud_id');
            $table->foreign('qs_id')->references('id')->on('question_sets')->onDelete('cascade')->onUpdate('cascade'); 
            $table->foreign('stud_id')->references('stud_id')->on('students')->onDelete('cascade')->onUpdate('cascade'); 
            $table->timestamps();
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
