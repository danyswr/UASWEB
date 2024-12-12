<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
        'tanggal_lahir',
        'gender',
        'role',
        'berat_badan',
        'tinggi_badan',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role', 'name');
    }

    public function items()
    {
        return $this->hasMany(UserItem::class);
    }

    public function battles()
    {
        return $this->hasMany(Battle::class);
    }
}
