<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_quests_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestsTable extends Migration
{
    public function up()
    {
        Schema::create('quests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['daily', 'weekly']); // Menandai apakah quest harian atau mingguan
            $table->unsignedBigInteger('user_id'); // Relasi ke tabel users
            $table->integer('reward_xp');
            $table->integer('reward_money');
            $table->boolean('is_completed')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Relasi ke user
        });
    }

    public function down()
    {
        Schema::dropIfExists('quests');
    }
}
