<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your ap plication. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
   Route::post('/logout', [AuthController::class, 'logout']);
   Route::apiResource('survey', SurveyController::class);
});

Route::post('/register', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

