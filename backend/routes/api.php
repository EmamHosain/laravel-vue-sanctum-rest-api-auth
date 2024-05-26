<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




// public route
Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);


Route::put('/forget-password', [UserController::class, 'forgetPassword']);
Route::post('/email-verify', [UserController::class, 'emailVerify']);
Route::post('/reset-password', [UserController::class, 'resetPassword']);


// protected route
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
