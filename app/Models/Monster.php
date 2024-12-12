<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Monster extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'hp',
        'attack',
        'defense',
        'speed',
        'level',
    ];

    public function battles()
    {
        return $this->hasMany(Battle::class);
    }
}

