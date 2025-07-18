<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;

Route::get('/login', [LoginController::class, 'login'])->name('login');
Route::get('/test', [LoginController::class, 'test'])->name('test');
Route::get('/', function () {
    return "<h1>Hello my site SMDvv</h1>";
});
Route::get('/1', function () {
    return "<h1>Hello my site SMDvv  1</h1>";
});

