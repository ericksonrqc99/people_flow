<?php

use App\Http\Controllers\CitizenController;
use App\Http\Controllers\TicketController;
use App\Models\Area;
use App\Services\FactilizaApiService;
use App\Services\TicketCorrelativeService;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

// ticket generator
Route::get('ticket-generator', [TicketController::class, 'generator'])->middleware('auth')->name('ticket-generator-get');

Route::post('ticket-generator', [TicketController::class, 'store'])->middleware('auth')->name('ticket-generator.store');

// citizen
Route::get('/citizen/{dni}', [CitizenController::class, 'getCitizenByDni'])->middleware('auth')->name('citizen.search-citizen-by-dni');


Route::get('/info', fn() => phpinfo());
Route::redirect('/login', '/admin/login')->name('login');
