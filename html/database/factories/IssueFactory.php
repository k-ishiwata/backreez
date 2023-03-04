<?php

namespace Database\Factories;

use App\Models\IssueStatus;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Issue>
 */
class IssueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $randomDate = $this->faker->dateTimeThisYear();

        return [
            'subject' => $this->faker->realText(random_int(20, 60)),
            'body' => $this->faker->realText(random_int(200, 800)),
            'status_id' => IssueStatus::factory(),
            'priority_id' => $this->faker->boolean(80)
                ? $this->faker->numberBetween(1, 3) : null,
            'project_key' => Project::factory(),
            'due_at' => $this->faker->boolean(20)
                ? $this->faker->dateTimeBetween('now', '+ 20 days')
                : null,
            'user_id' => User::factory(),
            'created_at' => $randomDate,
            'updated_at' => $randomDate
        ];
    }
}
