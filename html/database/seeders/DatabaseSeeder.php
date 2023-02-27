<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(IssueStatusSeeder::class);
        \App\Models\Project::factory(10)->create();
        \App\Models\Issue::factory(200)->create();
    }
}
