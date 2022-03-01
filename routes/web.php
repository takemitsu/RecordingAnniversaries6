<?php

use App\Http\Controllers\DaysController;
use App\Http\Controllers\EntityController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Entity;
use \App\Models\Days;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/entities', function () {
        return Inertia::render('Entities');
    })->name('entities');

    Route::get('/entity', function () {
        return Inertia::render('Entity', [
            'entityData' => null,
            'status' => session('status'),
        ]);
    })->name('entity.create');

    Route::get('/entity/{entity}', function (Entity $entity) {
        return Inertia::render('Entity', [
            'entityData' => $entity,
            'status' => session('status'),
        ]);
    })->name('entity.edit');

    Route::get('/entity/{entity}/day', function (Entity $entity) {
        return Inertia::render('Anniv', [
            'entityData' => $entity,
            'dayData' => null,
            'status' => session('status'),
        ]);
    })->name('entities.days.create');

    Route::get('/entity/{entity}/day/{day}', function (Entity $entity, Days $day) {
        return Inertia::render('Anniv', [
            'entityData' => $entity,
            'dayData' => $day,
            'status' => session('status'),
        ]);
    })->name('entities.days.edit');
});

require __DIR__ . '/auth.php';

// とりあえず web 側で api を定義
Route::prefix('api')->group(function () {
    Route::get('entities/pickup', [EntityController::class, 'pickup']);

    Route::apiResources([
        'entities' => EntityController::class,
        'entities.days' => DaysController::class,
    ]);
});
