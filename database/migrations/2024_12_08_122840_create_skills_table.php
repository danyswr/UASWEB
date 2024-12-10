<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_skills_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSkillsTable extends Migration
{
    public function up()
    {
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('role_id'); // Relasi ke tabel roles
            $table->string('name'); // Nama skill (misalnya: Fireball, Heal, etc.)
            $table->text('description'); // Deskripsi skill
            $table->integer('damage'); // Damage atau efek skill
            $table->integer('mana_cost'); // Biaya mana untuk menggunakan skill
            $table->timestamps();

            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('skills');
    }
}
