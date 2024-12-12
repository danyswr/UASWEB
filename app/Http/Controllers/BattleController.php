<?php

namespace App\Http\Controllers;

use App\Models\Battle;
use App\Models\Monster;
use App\Models\User;
use App\Models\Item;
use Illuminate\Http\Request;

class BattleController extends Controller
{
    public function startBattle($monsterId)
    {
        $user = auth()->user();
        $monster = Monster::findOrFail($monsterId); // Ambil data monster

        // Logika untuk memulai pertempuran, misalnya tentukan level user dan monster
        $battle = Battle::create([
            'user_id' => $user->id,
            'monster_id' => $monster->id,
            'user_level' => $user->level,
            'monster_level' => $monster->level,
            'status' => 'in_progress',
        ]);

        return view('battle.start', compact('battle', 'user', 'monster'));
    }

    public function attack(Request $request, $battleId)
    {
        $battle = Battle::findOrFail($battleId);
        $user = $battle->user;
        $monster = $battle->monster;

        // Hitung damage berdasarkan statistik user dan skill yang dipilih
        $damage = $user->strength - $monster->defense;
        $monster->hp -= max(0, $damage);

        // Update battle status
        if ($monster->hp <= 0) {
            $battle->status = 'won';
            $battle->save();
            return redirect()->route('battle.result', $battle->id);
        }

        $battle->save();
        return back();
    }

    public function defend(Request $request, $battleId)
    {
        $battle = Battle::findOrFail($battleId);
        $user = $battle->user;
        $monster = $battle->monster;

        // Hitung defense berdasarkan item atau skill yang digunakan
        $defense = $user->defense + $request->input('item_defense');
        $monster->attack -= $defense;

        // Update battle status
        $battle->save();
        return back();
    }

    public function endBattle($battleId)
    {
        $battle = Battle::findOrFail($battleId);
        $battle->status = 'completed';
        $battle->save();

        return view('battle.result', compact('battle'));
    }
}
