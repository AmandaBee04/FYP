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
        Schema::create('question_sets', function (Blueprint $table) {
            $table->id(); 
            $table->string('qs_name')->nullable(); 
            $table->string('type')->nullable();
            $table->integer('time')->nullable();
            $table->date('due_date')->nullable();
            $table->boolean('assign')->nullable(); 
            $table->integer('total_mark')->nullable(); 
            $table->string('sub_id');
            $table->foreign('sub_id')->references('sub_id')->on('subjects')->onDelete('cascade')->onUpdate('cascade');
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
