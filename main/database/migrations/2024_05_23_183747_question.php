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
        Schema::create('questions', function (Blueprint $table) {
            $table->id(); 
            $table->string('question')->nullable();
            $table->integer('marks')->nullable();
            $table->string('picture')->nullable();
            $table->string('correct_ans')->nullable();
            $table->string('ans_a')->nullable();
            $table->string('ans_b')->nullable();
            $table->string('ans_c')->nullable();
            $table->string('ans_d')->nullable();
            $table->string('feedback')->nullable();
            $table->unsignedBigInteger('qs_id'); 
            $table->foreign('qs_id')->references('id')->on('question_sets')->onDelete('cascade')->onUpdate('cascade');
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
