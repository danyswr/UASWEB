<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        $user = auth()->user(); // Ambil data user yang sedang login
        return view('profile.index', compact('user'));
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        // Validasi input data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);

        return back()->with('success', 'Profile updated successfully!');
    }

    public function editSchedule(Request $request)
    {
        $user = auth()->user();
        // Proses update jadwal jika ada
        // Misalnya, update jadwal latihan atau quest
        return back();
    }
}
