<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\QuestController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
// ------------------------- Auth Routes -------------------------
Route::get('/', [UserController::class, 'showLoginForm'])->name('login');
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->name('logout');

// Registration Routes
Route::get('/register', [AuthController::class, 'showRegister'])->name('register'); // Form register
Route::post('/register', [AuthController::class, 'register'])->name('register.post'); // Proses register ke database

/*
|--------------------------------------------------------------------------
| Authenticated Routes (User-specific pages)
|--------------------------------------------------------------------------
*/
// ------------------------- User Dashboard Routes -------------------------
Route::middleware(['auth'])->group(function () {
    // Dashboard Route
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    
    // Quest Routes (Daily, Weekly)
    Route::get('/quests', [QuestController::class, 'index'])->name('quests.index');
    Route::post('/quests/daily', [QuestController::class, 'storeDailyQuest'])->name('quests.storeDaily');
    Route::post('/quests/weekly', [QuestController::class, 'storeWeeklyQuest'])->name('quests.storeWeekly');
    
    // Battle Routes
    Route::get('/battle', [BattleController::class, 'index'])->name('battle.index');
    Route::post('/battle/fight', [BattleController::class, 'fight'])->name('battle.fight');
    
    // Item Shop Routes
    Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
    Route::post('/shop/buy', [ShopController::class, 'buyItem'])->name('shop.buy');
    Route::post('/shop/upgrade', [ShopController::class, 'upgradeSkill'])->name('shop.upgrade');
    
    // BMI Calculator Route
    Route::get('/bmi-calculator', [UserController::class, 'bmiCalculator'])->name('bmi.calculator');
});

/*
|--------------------------------------------------------------------------
| Guest Routes (User not logged in)
|--------------------------------------------------------------------------
*/
// ------------------------- Auth Routes for Guests -------------------------
Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');
});

/*
|--------------------------------------------------------------------------
| Role Management Routes (API)
|--------------------------------------------------------------------------
*/
// ------------------------- Role Management API -------------------------
Route::prefix('api')->group(function () {
    Route::get('/roles', [RoleController::class, 'index'])->name('api.roles.index');
    Route::post('/roles', [RoleController::class, 'store'])->name('api.roles.store');
    Route::put('/roles/{id}', [RoleController::class, 'update'])->name('api.roles.update');
    Route::delete('/roles/{id}', [RoleController::class, 'destroy'])->name('api.roles.destroy');

    // New: API endpoint to fetch specific animations (attack or breath)
    Route::get('/roles/{id}/animation', [RoleController::class, 'getAnimation'])->name('api.roles.animation');
});
