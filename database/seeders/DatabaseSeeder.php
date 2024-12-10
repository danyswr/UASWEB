<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed Roles
        DB::table('roles')->insert([
            ['name' => 'Warrior', 'description' => 'Strong melee combatant', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Assassin', 'description' => 'High damage, low defense', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Knight', 'description' => 'Balanced attack and defense', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Seed Monsters
        DB::table('monsters')->insert([
            ['name' => 'Goblin', 'hp' => 100, 'attack' => 15, 'defense' => 5, 'speed' => 10, 'level' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Orc', 'hp' => 200, 'attack' => 25, 'defense' => 20, 'speed' => 15, 'level' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Dragon', 'hp' => 500, 'attack' => 50, 'defense' => 30, 'speed' => 20, 'level' => 3, 'created_at' => now(), 'updated_at' => now()],
        ]);
        
        

        // Seed Items
        DB::table('items')->insert([
            ['name' => 'Health Potion', 'description' => 'Restores 50 HP', 'price' => 100, 'effect' => 50, 'type' => 'Potion', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mana Potion', 'description' => 'Restores 30 MP', 'price' => 80, 'effect' => 30, 'type' => 'Potion', 'created_at' => now(), 'updated_at' => now()],
        ]);
        
        
    }
}
