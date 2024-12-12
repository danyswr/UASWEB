<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all(); // Ambil semua item
        return view('items.index', compact('items')); // Menampilkan daftar item
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|integer',
            'effect' => 'required|integer',
            'type' => 'required|string',
        ]);

        // Simpan item baru ke dalam database
        Item::create($request->all());

        return redirect()->route('items.index')->with('success', 'Item added successfully!');
    }

    public function update(Request $request, $itemId)
    {
        $item = Item::findOrFail($itemId);

        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|integer',
            'effect' => 'required|integer',
            'type' => 'required|string',
        ]);

        // Update item
        $item->update($request->all());

        return redirect()->route('items.index')->with('success', 'Item updated successfully!');
    }

    public function destroy($itemId)
    {
        $item = Item::findOrFail($itemId);
        $item->delete();

        return redirect()->route('items.index')->with('success', 'Item deleted successfully!');
    }
}
