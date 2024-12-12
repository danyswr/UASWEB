<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'effect',
        'type',
    ];

    public function userItems()
    {
        return $this->hasMany(UserItem::class);
    }
}

