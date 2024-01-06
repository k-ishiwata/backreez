<?php

namespace Database\Seeders;

use App\Models\Issue;
use App\Models\IssueStatus;
use App\Models\Project;
use App\Models\User;
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

        $users = User::all();
        $issueStatus = IssueStatus::all();
        $projects = Project::factory(10)
            ->create()
            ->each(fn ($project) =>
                $project->users()->attach($users->random(random_int(1, 3)))
            );

        Issue::factory(200)
            ->recycle($users)
            ->recycle($issueStatus)
            ->recycle($projects)
            ->create();
    }
}
