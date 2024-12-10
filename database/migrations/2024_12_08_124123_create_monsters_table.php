<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMonstersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monsters', function (Blueprint $table) {
            $table->id();  // ID unik untuk monster
            $table->string('name');  // Nama monster
            $table->integer('hp');  // Health points (HP) monster
            $table->integer('attack');  // Attack stat monster
            $table->integer('defense');  // Defense stat monster
            $table->integer('speed');  // Speed monster
            $table->integer('level');  // Level monster (untuk kesulitan)
            $table->timestamps();  // Tanggal buat dan update (default)
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('monsters');
    }
}
