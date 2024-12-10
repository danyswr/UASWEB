<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_items_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama item (misalnya: Health Potion, Mana Potion)
            $table->text('description'); // Deskripsi item
            $table->integer('price'); // Harga item
            $table->integer('effect'); // Efek item (misalnya: jumlah HP yang ditambah)
            $table->string('type'); // Jenis item (potion, equipment, etc.)
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('items');
    }
}

