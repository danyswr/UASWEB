<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'tanggal_lahir' => 'required|date',
            'gender' => 'required|in:male,female',
            'role' => 'required|in:warrior,assassin,knight',
            'berat_badan' => 'required|numeric|between:30,300',
            'tinggi_badan' => 'required|numeric|between:100,250',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'tanggal_lahir' => $request->tanggal_lahir,
            'gender' => $request->gender,
            'role' => $request->role,
            'berat_badan' => $request->berat_badan,
            'tinggi_badan' => $request->tinggi_badan,
        ]);

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
