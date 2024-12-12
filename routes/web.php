<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/battle/start/{monsterId}', 'BattleController@startBattle')->middleware('auth');
Route::post('/battle/attack/{battleId}', 'BattleController@attack')->middleware('auth');
Route::post('/battle/defend/{battleId}', 'BattleController@defend')->middleware('auth');
Route::get('/battle/end/{battleId}', 'BattleController@endBattle')->middleware('auth');