<?php

declare(strict_types=1);

use App\Http\Controllers\AuthenticatedController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\IssueStatusController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectUserController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthenticatedController::class, 'user']);
    Route::apiResource('project/users', ProjectUserController::class)->only([
        'show', 'update', 'destroy'
    ]);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('issues', IssueController::class);
    Route::get('issue-statuses/select-list', [IssueStatusController::class, 'selectList']);
    Route::apiResource('issue-statuses', IssueStatusController::class);
    Route::get('users/select-list', [UserController::class, 'selectList']);
});
