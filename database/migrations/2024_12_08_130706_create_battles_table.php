<?php

// Migration untuk membuat tabel battles
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBattlesTable extends Migration
{
    public function up()
    {
        Schema::create('battles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Hubungkan dengan user
            $table->foreignId('monster_id')->constrained()->onDelete('cascade'); // Hubungkan dengan monster
            $table->integer('user_level'); // Level user saat bertarung
            $table->integer('monster_level'); // Level monster yang sedang dilawan
            $table->enum('status', ['in_progress', 'won', 'lost'])->default('in_progress'); // Status pertempuran
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('battles');
    }
}

