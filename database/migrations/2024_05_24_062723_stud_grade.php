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
        Schema::create('stud_grade', function (Blueprint $table) {
            $table->id();
            $table->string('grade')->nullable();
            $table->timestamps();
            $table->string('stud_id');
            $table->unsignedBigInteger('qs_id');
            $table->foreign('stud_id')->references('stud_id')->on('student')->onDelete('cascade')->onUpdate('cascade'); 
            $table->foreign('qs_id')->references('id')->on('question_set')->onDelete('cascade')->onUpdate('cascade'); 
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
