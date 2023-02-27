<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthenticateService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedController extends Controller
{
    /**
     * ログイン中のユーザー情報
     *
     * @return JsonResponse
     */
    public function user(): JsonResponse
    {
        return response()->json(Auth::user());
    }

    /**
     * ログイン認証
     *
     * @param  LoginRequest  $request
     * @param  AuthenticateService  $authenticateService
     * @return JsonResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(
        LoginRequest $request,
        AuthenticateService $authenticateService
    ): JsonResponse {
        $authenticateService->authenticate();

        $request->session()->regenerate();

        return response()->json(
            Auth::user()?->only(['id', 'name', 'email'])
        );
    }

    /**
     * ログアウト
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(true);
    }
}
