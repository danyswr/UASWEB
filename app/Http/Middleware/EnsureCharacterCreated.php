<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureCharacterCreated
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && !Auth::user()->role) {
            return redirect()->route('character.create');
        }

        return $next($request);
    }
}

