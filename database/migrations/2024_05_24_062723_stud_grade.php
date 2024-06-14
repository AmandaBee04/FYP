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
            $table->unsignedBigInteger('studAns_id');
            $table->foreign('studAns_id')->references('id')->on('stud_ans')->onDelete('cascade')->onUpdate('cascade'); 
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
