<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'role_id',
        'name',
        'description',
        'damage',
        'mana_cost',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
