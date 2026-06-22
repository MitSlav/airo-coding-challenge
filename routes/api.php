<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('login', [Controllers\AuthController::class, 'login']);
    Route::post('refresh', [Controllers\AuthController::class, 'refresh']);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('me', [Controllers\AuthController::class, 'me']);
        Route::post('logout', [Controllers\AuthController::class, 'logout']);

        Route::post('quotation', Controllers\QuotationController::class);
    });
});
