<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all(); // Ambil semua role
        return view('roles.index', compact('roles')); // Menampilkan daftar role
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Simpan role baru
        Role::create($request->all());

        return redirect()->route('roles.index')->with('success', 'Role added successfully!');
    }

    public function update(Request $request, $roleId)
    {
        $role = Role::findOrFail($roleId);

        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Update role
        $role->update($request->all());

        return redirect()->route('roles.index')->with('success', 'Role updated successfully!');
    }

    public function destroy($roleId)
    {
        $role = Role::findOrFail($roleId);
        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Role deleted successfully!');
    }
}
