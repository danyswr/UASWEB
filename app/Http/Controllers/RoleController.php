<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        // Ambil semua data role beserta path animasi breath dan attack
        $roles = Role::all();
        return response()->json($roles);
    }

    public function store(Request $request)
    {
        // Validasi data yang masuk
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'breath' => 'nullable|string',
            'attack' => 'nullable|string',
        ]);

        // Buat role baru, tambahkan animasi breath dan attack jika ada
        $role = Role::create([
            'name' => $request->name,
            'description' => $request->description,
            'breath' => $request->breath ?? null,  // Cek kalau kosong
            'attack' => $request->attack ?? null,  // Cek kalau kosong
        ]);

        return response()->json($role, 201);
    }

    public function update(Request $request, $roleId)
    {
        // Cari role berdasarkan ID
        $role = Role::findOrFail($roleId);

        // Validasi data yang masuk
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'breath' => 'nullable|string',
            'attack' => 'nullable|string',
        ]);

        // Update role dengan data baru, termasuk breath dan attack
        $role->update([
            'name' => $request->name,
            'description' => $request->description,
            'breath' => $request->breath ?? $role->breath,  // Cek kalau kosong, biar nggak override
            'attack' => $request->attack ?? $role->attack,  // Cek kalau kosong, biar nggak override
        ]);

        return response()->json($role);
    }

    public function destroy($roleId)
    {
        // Cari dan hapus role berdasarkan ID
        $role = Role::findOrFail($roleId);
        $role->delete();

        return response()->json(null, 204);
    }

    /**
     * Fungsi untuk mendapatkan animasi berdasarkan kebutuhan frontend
     */
    public function getAnimation(Request $request, $roleId)
    {
        // Cek apakah role ada
        $role = Role::findOrFail($roleId);

        // Ambil animasi berdasarkan permintaan frontend (attack atau breath)
        $animationType = $request->input('animation_type');  // Bisa 'attack' atau 'breath'

        if ($animationType === 'attack') {
            return response()->json(['animation' => $role->attack]);
        } elseif ($animationType === 'breath') {
            return response()->json(['animation' => $role->breath]);
        }

        // Kalau gak ada animasi yang diminta
        return response()->json(['message' => 'Invalid animation type'], 400);
    }
}
