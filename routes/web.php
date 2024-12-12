<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BattleController;

Route::get('/', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard')->middleware(['auth']);

// Battle routes
Route::middleware(['auth'])->group(function () {
    Route::get('/battle/start/{monsterId}', [BattleController::class, 'startBattle']);
    Route::post('/battle/attack/{battleId}', [BattleController::class, 'attack']);
    Route::post('/battle/defend/{battleId}', [BattleController::class, 'defend']);
    Route::get('/battle/end/{battleId}', [BattleController::class, 'endBattle']);
});

