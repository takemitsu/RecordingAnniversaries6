<?php

use App\Http\Controllers\DaysController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [EntityController::class, 'pickup'])->name('dashboard');
    Route::get('/entities', [EntityController::class, 'index'])->name('entities');
    Route::get('/entities/create', [EntityController::class, 'create'])->name('entities.create');
    Route::get('/entities/{entity}/edit', [EntityController::class, 'edit'])->name('entities.edit');
    Route::get('/entities/{entity}/days/create', [DaysController::class, 'create'])->name('entities.days.create');
    Route::get('/entities/{entity}/days/{day}/edit', [DaysController::class, 'edit'])->name('entities.days.edit');

    Route::apiResources([
        'entities' => EntityController::class,
        'entities.days' => DaysController::class,
    ]);
});

require __DIR__ . '/auth.php';
