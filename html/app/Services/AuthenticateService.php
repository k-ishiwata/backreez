<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/**
 * @see https://github.com/laravel/breeze/blob/1.x/stubs/default/app/Http/Requests/Auth/LoginRequest.php
 */
class AuthenticateService
{
    /** @var int 試行回数上限 */
    public const ATTEMPT_LIMIT = 5;

    /** @var int ロック時間 */
    public const LOCK_TIME = 60 * 60;

    /**
     * @param  Request  $request
     */
    public function __construct(
        private readonly Request $request
    ) {
    }

    /**
     * リクエストから認証を試行
     *
     * @return void
     *
     * @throws ValidationException
     */
    public function authenticate(): void
    {
        // 試行回数上限に達しているか確認
        $this->ensureIsNotRateLimited();

        $result = Auth::attempt(
            $this->request->only('email', 'password'),
            $this->request->boolean('remember')
        );

        if (! $result) {
            // 試行回数を追加
            RateLimiter::hit($this->throttleKey(), self::LOCK_TIME);

            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        // 試行回数をクリア
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * 試行回数上限に達していないか確認
     *
     * @return void
     *
     * @throws ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        // 試行回数上限に達していない場合は返す
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), self::ATTEMPT_LIMIT)) {
            return;
        }

        event(new Lockout($this->request));

        // 再試行可能秒数取得
        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * リクエストから制限キーを取得
     *
     * @return string
     */
    public function throttleKey(): string
    {
        return Str::lower($this->request->input('email')).'|'.$this->request->ip();
    }
}
