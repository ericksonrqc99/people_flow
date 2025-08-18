<?php

use App\Http\Controllers\CitizenController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

// generator of tickets
Route::get('/ticket-generator', [TicketController::class, 'ticketGenerator'])->middleware('auth')->name('ticket-generator-get');

Route::post('/ticket-generator', [TicketController::class, 'store'])->middleware('auth')->name('ticket-generator.store');

// show tickets for area
Route::get('/tickets', [TicketController::class, 'ticketPanel'])->middleware('auth')->name('ticket-visualizer');

Route::put('/tickets', [TicketController::class, 'update'])->middleware('auth')->name('tickets.update');


// citizen
Route::get('/citizen/{dni}', [CitizenController::class, 'getCitizenByDni'])->middleware('auth')->name('citizen.search-citizen-by-dni');

Route::redirect('/login', '/admin/login')->name('login');
