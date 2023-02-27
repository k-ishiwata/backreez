<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticateTest extends TestCase
{
    use RefreshDatabase;

    const LOGIN_URL = '/api/login';

    /**
     * @test
     */
    public function ログインできる(): void
    {
        $user = User::factory()->create();

        $this
            ->postJson(self::LOGIN_URL, [
                'email'    => $user->email,
                'password' => 'password',
            ])
            ->assertOk()
            ->assertJsonFragment([
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ]);
    }
}
