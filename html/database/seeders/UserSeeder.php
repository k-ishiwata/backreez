<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public const USERS = [
        [
            'name' => 'admin',
            'email' => 'admin@example.com',
        ], [
            'name' => 'yamada',
            'email' => 'yamada@example.com',
        ], [
            'name' => 'tanaka',
            'email' => 'tanaka@example.com',
        ]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $password = Hash::make('123456789');

        $users = array_map(static fn ($value) => [
            'name' => $value['name'],
            'email' => $value['email'],
            'email_verified_at' => now(),
            'password' => $password,
            'created_at' => now(),
            'updated_at' => now(),
        ], self::USERS);

        DB::table('users')->insert($users);
    }
}
