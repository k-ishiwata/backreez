<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Project;

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

        $projects = Project::get()->pluck('key');

        return [
            'subject' => $this->faker->realText(rand(20, 60)),
            'body' => $this->faker->realText(rand(200, 800)),
            'status_id' => $this->faker->numberBetween(1, 4),
            'priority_id' => $this->faker->boolean(80)
                ? $this->faker->numberBetween(1, 3) : null,
            'project_key' => $projects->random(),
            'due_at' => $this->faker->boolean(20)
                ? $this->faker->dateTimeBetween('now', '+ 20 days')
                : null,
            'created_at' => $randomDate,
            'updated_at' => $randomDate
        ];
    }
}
