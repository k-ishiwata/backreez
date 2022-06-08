<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Project;

class ProjectsTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        Project::factory(10)->create();
    }

    /**
     * @test
     */
    public function DBのレコードを取得できる()
    {
        $response = $this->getJson('/api/projects');
        $response
            ->assertOk()
            ->assertJsonCount(10);
    }
}
