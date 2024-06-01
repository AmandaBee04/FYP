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
        Schema::create('question', function (Blueprint $table) {
            $table->id(); 
            $table->string('question', 200)->nullable();
            $table->string('instruction', 200)->nullable();
            $table->string('picture', 60)->nullable();
            $table->string('correct_ans', 100)->nullable();
            $table->string('ans_a', 100)->nullable();
            $table->string('ans_b', 100)->nullable();
            $table->string('ans_c', 100)->nullable();
            $table->string('ans_d', 100)->nullable();
            $table->unsignedBigInteger('qs_id'); 
            $table->foreign('qs_id')->references('id')->on('question_set')->onDelete('cascade')->onUpdate('cascade');
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
