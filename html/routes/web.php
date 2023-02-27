<?php

use App\Http\Controllers\AuthenticatedController;
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

Route::any('{all}', function () {
    return view('app');
})->where(['all' => '^(?!api/*).*']);

Route::controller(AuthenticatedController::class)
    ->prefix('api')
    ->name('api.')
    ->group(function () {
        // ログイン認証
        Route::post('login', 'login')->name('login');
        // ログアウト
        Route::post('logout', 'logout')->name('logout');
    });
