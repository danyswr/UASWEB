<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all(); // Ambil semua user
        return view('users.index', compact('users')); // Menampilkan daftar user
    }

    public function show($userId)
    {
        $user = User::findOrFail($userId); // Ambil data user berdasarkan ID
        return view('users.show', compact('user')); // Menampilkan profil user
    }

    public function update(Request $request, $userId)
    {
        $user = User::findOrFail($userId);

        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        // Update data user
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
        ]);

        return redirect()->route('users.show', $user->id)->with('success', 'Profile updated successfully!');
    }

    public function destroy($userId)
    {
        $user = User::findOrFail($userId);
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully!');
    }
}
