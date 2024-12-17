<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Nama role (misal: 'assassin', 'warrior', dll)
            $table->string('description'); // Deskripsi role
            $table->string('breath')->nullable();  // Menyimpan path ke file breath animation
            $table->string('attack')->nullable();  // Menyimpan path ke file attack animation
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
