<?php

use Illuminate\Http\Request;
use App\Http\Controllers\groubcouste;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JsonController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CalculController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DepenceController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\PermitionController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::resource('calcul',CalculController::class)->middleware('auth:sanctum');
Route::resource('depence',DepenceController::class)->middleware('auth:sanctum');
Route::resource('produit',ProduitController::class)->middleware('auth:sanctum');
Route::put('/produit/qnt/{id}',[ProduitController::class,'edit_qnt'])->middleware('auth:sanctum');
Route::resource('client',ClientController::class)->middleware('auth:sanctum');
Route::resource('category',CategoryController::class)->middleware('auth:sanctum');
Route::resource('commande',CommandeController::class)->middleware('auth:sanctum');
Route::get('commande/{id_user}',[CommandeController::class,'indexx'])->middleware('auth:sanctum');
Route::resource('role',RoleController::class)->middleware('auth:sanctum');
Route::put('commande/status/{idc}',[CommandeController::class,'up_dtae_status'])->middleware('auth:sanctum');
Route::post('produitt/{id}',[ProduitController::class,'up_dtae_image'])->middleware('auth:sanctum');
Route::get('category/produit/{idc}',[CategoryController::class,'produit_category'])->middleware('auth:sanctum');

/////login
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/register', [LoginController::class, 'register'])->name('register');
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [LoginController::class, 'index'])->name('index');
Route::post('/profile', [LoginController::class, 'user'])->name('test')->middleware('auth:sanctum');




Route::post("/permition/{id_user}",[PermitionController::class,'affecter_permition'])->middleware('auth:sanctum');

Route::get('/commandes', [JsonController::class, 'getCommandes']);
Route::get('/commande/{id}', [JsonController::class, 'getCommande']);
Route::post('/commandes', [JsonController::class, 'createCommande']);
Route::put('/commandes/{id}', [JsonController::class, 'updateCommande']);
Route::delete('/commandes/{id}', [JsonController::class, 'deleteCommande']);
Route::get('/SupCommandes/{id}',[JsonController::class, 'hello']);
//Route::apiResource('commandes', JsonController::class);

Route::get('/villes', [JsonController::class, 'getVilles']);
Route::get('/statuses', [JsonController::class, 'getStatuses']);
Route::get('/commandes1', function () {
    return "<h1>Hello my site SMDvv</h1>";
});
Route::get('/commandes2', function () {
    return "<h1>Hello my site SMDvv</h1>";
});
Route::get('/pokemons', [JsonController::class, 'getpokemons']);
Route::post('/pokemons', [JsonController::class, 'createPokemons']);
Route::put('/pokemons/{id}', [JsonController::class, 'updatePokemons']);
Route::delete('/pokemons/{id}', [JsonController::class, 'deletePokemons']);

///////Coust///////////
Route::post('/coust', [groubcouste::class, 'ajouter_coust_jour']);
Route::get('/Groupe_commande', [groubcouste::class, 'get_coust_jour']);
Route::post('/newCoust', [groubcouste::class, 'edit_coust_jour']);
Route::post('/update_commande_jour_cost', [groubcouste::class, 'edit_commande_coust_jour']);
Route::post('/update_coust_cmd', [groubcouste::class, 'edit_coust_cmd']);