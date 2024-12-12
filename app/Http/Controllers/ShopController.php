<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\UserItem;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index()
    {
        $items = Item::all(); // Ambil semua item yang tersedia di toko
        return view('shop.index', compact('items'));
    }

    public function purchase(Request $request, $itemId)
    {
        $user = auth()->user();
        $item = Item::findOrFail($itemId);

        // Cek jika user punya cukup uang
        if ($user->coins < $item->price) {
            return back()->withErrors('You do not have enough coins!');
        }

        // Kurangi coins user dan simpan item yang dibeli ke user_items
        $user->coins -= $item->price;
        $user->save();

        UserItem::create([
            'user_id' => $user->id,
            'item_id' => $item->id,
            'quantity' => 1, // Asumsikan pembelian 1 item
        ]);

        return back()->with('success', 'Item purchased successfully!');
    }
}
