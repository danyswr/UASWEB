<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserQuest; // Jika kita menambahkan tabel quest untuk user
use App\Models\Role; // Untuk karakter dan skill
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user(); // Ambil data user yang sedang login
        $quests = UserQuest::where('user_id', $user->id)->get(); // Ambil quest user
        $roles = Role::all(); // Ambil data roles untuk karakter

        // Ambil statistik dari user
        $stats = [
            'strength' => $user->strength,
            'endurance' => $user->endurance,
            'speed' => $user->speed,
            'durability' => $user->durability,
        ];

        return view('dashboard', compact('user', 'quests', 'roles', 'stats'));
    }
}
