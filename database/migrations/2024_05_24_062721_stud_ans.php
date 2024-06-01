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
        Schema::create('stud_ans', function (Blueprint $table) {
            $table->id(); 
            $table->string('answer')->nullable();
            $table->string('remark')->nullable(); 
            $table->string('feedback')->nullable();
            $table->string('stud_id');
            $table->unsignedBigInteger('ques_id');
            $table->foreign('stud_id')->references('stud_id')->on('student')->onDelete('cascade')->onUpdate('cascade'); 
            $table->foreign('ques_id')->references('id')->on('question')->onDelete('cascade')->onUpdate('cascade');
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
