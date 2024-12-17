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
        // Seed Roles dengan animasi Breath dan Attack
        DB::table('roles')->insert([
            [
                'name' => 'Warrior', 
                'description' => 'Strong melee combatant',
                'breath' => 'characters/warrior/breath.png',  // Path animasi breath
                'attack' => 'characters/warrior/attack.png',  // Path animasi attack
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'Assassin', 
                'description' => 'High damage, low defense',
                'breath' => 'characters/assassin/breath.png',  // Path animasi breath
                'attack' => 'characters/assassin/attack.png',  // Path animasi attack
                'created_at' => now(), 
                'updated_at' => now()
            ],
            [
                'name' => 'Knight', 
                'description' => 'Balanced attack and defense',
                'breath' => 'characters/knight/breath.png',  // Path animasi breath
                'attack' => 'characters/knight/attack.png',  // Path animasi attack
                'created_at' => now(), 
                'updated_at' => now()
            ],
        ]);

        // Seed Monsters
        DB::table('monsters')->insert([
            ['name' => 'Goblin', 'hp' => 100, 'attack' => 15, 'defense' => 5, 'speed' => 10, 'level' => 1, 'created_at' => now(), 'updated_at' => now()],
            
        ]);

        // Seed Items
        DB::table('items')->insert([
            ['name' => 'Health Potion', 'description' => 'Restores 50 HP', 'price' => 100, 'effect' => 50, 'type' => 'Potion', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mana Potion', 'description' => 'Restores 30 MP', 'price' => 80, 'effect' => 30, 'type' => 'Potion', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
