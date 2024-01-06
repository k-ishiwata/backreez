<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ProjectUsersTest extends TestCase
{
    use RefreshDatabase;

    const URL = '/api/project/users';

    public function setUp(): void
    {
        parent::setUp();

        $users = User::factory(3)->create();

        $this->actingAs($users[0]);
        $this->user = Auth::user();

        Project::factory(40)
            ->create()
            ->each(fn ($project) =>
                $project->users()->attach($users->random(random_int(1, 3)))
            );
    }

    /**
     * @test
     */
    public function ユーザー一覧を取得できる(): void
    {
        $data = $this->user->projects[0];

        $this->getJson(self::URL . '/' . $data->id)
            ->assertOk()
            ->assertJsonFragment(
                $this->user->only(
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                )
            );
    }

    /**
     * @test
     */
    public function 割り当てできる(): void
    {
        $user = User::factory()->create();
        $project = $this->user->projects[0];

        $data = [
            'user_id' => $user->id,
        ];

        $this->putJson(self::URL . '/' . $project->id, $data)
            ->assertOk();

        $this->assertDatabaseHas('project_user', $data);
    }

    /**
     * @test
     */
    public function 指定したプロジェクトがない場合notfound(): void
    {
        $user = User::factory()->create();

        $data = [
            'user_id' => $user->id,
        ];

        $this->putJson(self::URL . '/9999999', $data)
            ->assertNotFound();
    }

    /**
     * @test
     */
    public function ユーザーが存在しない場合エラー(): void
    {
        $data = [
            'user_id' => 9999999,
        ];

        $this->putJson(self::URL . '/1', $data)
            ->assertInvalid([
                'user_id'  => '選択した値が無効です。',
            ]);
    }

    /**
     * @test
     */
    public function 解除できる(): void
    {
        $project = $this->user->projects[0];

        $data = [
            'user_id' => $this->user->id,
        ];

        $response = $this->deleteJson(self::URL.'/'.$project->id, $data);
        $response->assertOk();

        $this->assertDatabaseMissing('project_user', [
            ...$data,
            'project_id' => $project->id
        ]);
    }

    /**
     * @test
     */
    public function 必須項目のバリデーション(): void
    {
        $response = $this->putJson(self::URL . '/1', []);
        $response
            ->assertUnprocessable()
            ->assertInvalid([
                'user_id'     => 'この項目は必須です。',
            ]);
    }
}
