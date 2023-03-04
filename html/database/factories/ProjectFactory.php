<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
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
            'key' => $this->faker->regexify('[A-Z]{6}'),
            'name' => $this->faker->realText(random_int(10, 30)),
            'description' => $this->faker->realText(random_int(100, 255)),
            'created_at' => $randomDate,
            'updated_at' => $randomDate
        ];
    }
}
