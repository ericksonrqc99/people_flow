<?php

use App\Http\Controllers\CitizenController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

// generator of tickets
Route::get('/tickets/module', [TicketController::class, 'ticketGenerator'])
    ->middleware(['auth', 'no-cache', 'can:Ver Modulo de Tickets'])
    ->name('ticket-generator-get');

Route::post('/tickets/module', [TicketController::class, 'store'])
    ->middleware(['auth', 'no-cache'])
    ->name('ticket-generator.store');

// show tickets for area
Route::get('/tickets/panel', [TicketController::class, 'ticketPanel'])
    ->middleware(['auth', 'no-cache', 'can:Ver Panel De Tickets'])
    ->name('ticket-visualizer');

Route::put('/tickets/panel', [TicketController::class, 'update'])
    ->middleware(['auth', 'no-cache'])
    ->name('tickets.update');

// Derive ticket to another area
Route::post('/tickets/derive', [TicketController::class, 'derive'])
    ->middleware(['auth', 'no-cache'])
    ->name('tickets.derive');

// Get server time for client synchronization
Route::get('/clock/server-time', [TicketController::class, 'getServerTime'])
    ->middleware(['auth', 'no-cache'])
    ->name('clock.server-time');

// citizen
Route::get('/citizen/{dni}', [CitizenController::class, 'getCitizenByDni'])->middleware('auth')->name('citizen.search-citizen-by-dni');

// logout route
Route::post('/logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/admin/login')
        ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
        ->header('Pragma', 'no-cache')
        ->header('Expires', '0');
})->middleware('auth')->name('logout');

Route::redirect('/login', '/admin/login')->name('login');

