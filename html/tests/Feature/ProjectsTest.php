<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class ProjectsTest extends TestCase
{
    use RefreshDatabase;

    const URL = '/api/projects';

    public function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();
        $this->actingAs($user);
        $this->user = Auth::user();

        Project::factory(40)
            ->create()
            ->each(fn ($project) =>
                $project->users()->attach($this->user->id)
            );
    }

    /**
     * @test
     */
    public function 一覧を取得できる(): void
    {
        $response = $this->getJson(self::URL);
        $response
            ->assertOk()
            ->assertJsonStructure([
                'current_page',
                'data',
                'first_page_url',
                'from',
                'last_page',
                'last_page_url',
                'links' => [
                    '*' => [
                        'url',
                        'label',
                        'active'
                    ]
                ],
                'next_page_url',
                'path',
                'per_page',
                'prev_page_url',
                'to',
                'total',
            ]);
    }

    /**
     * @test
     */
    public function 登録できる(): void
    {
        $data = [
            'key'         => 'ABC_001',
            'name'        => 'テストプロジェクト',
            'description' => 'これはてすとです。',
        ];

        $response = $this->postJson(self::URL, $data);
        $response
            ->assertCreated()
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('projects', $data);
    }

    /**
     * @test
     */
    public function keyで取得できる(): void
    {
        $data = Project::whereHas('users', fn ($query) =>
            $query->where('user_id', $this->user->id)
        )->first();

        $response = $this->getJson(self::URL . '/' . $data->key);
        $response
            ->assertOk()
            ->assertJson($data->toArray());
    }

    /**
     * @test
     */
    public function 更新できる(): void
    {
        $data = Project::first();

        $data->name = '書き換え';
        $data->description = '内容書き換え';

        $response = $this->putJson(self::URL.'/'.$data->id, $data->toArray());
        $response->assertOk();

        $this->assertDatabaseHas('projects', $data->only([
            'id', 'key', 'name', 'description'
        ]));
    }

    /**
     * @test
     */
    public function 削除できる(): void
    {
        $data = Project::first();

        $response = $this->deleteJson(self::URL.'/'.$data->id);
        $response->assertOk();

        $this->assertSoftDeleted('projects', $data->only([
            'id', 'name', 'description'
        ]));
    }

    /**
     * @test
     */
    public function アサインされていない場合は取得できない(): void
    {
        $user = User::factory(['id' => 9999])->create();

        $data = Project::factory()->create();
        $data->users()->attach($user->id);

        $response = $this->getJson(self::URL . '/' . $data->key);
        $response->assertForbidden();
    }

    /**
     * @test
     */
    public function アサインされていない場合は更新できない(): void
    {
        $user = User::factory(['id' => 9999])->create();

        $data = Project::factory()->create();
        $data->users()->attach($user->id);

        $data->name = '書き換え';

        $response = $this->putJson(self::URL.'/'.$data->id, $data->toArray());
        $response->assertForbidden();
    }

    /**
     * @test
     */
    public function アサインされていない場合は削除できない(): void
    {
        $user = User::factory(['id' => 9999])->create();

        $data = Project::factory()->create();
        $data->users()->attach($user->id);

        $response = $this->deleteJson(self::URL.'/'.$data->id);
        $response->assertForbidden();
    }

    /**
     * @test
     */
    public function 必須項目のバリデーション(): void
    {
        $response = $this->postJson(self::URL, []);
        $response
            ->assertUnprocessable()
            ->assertInvalid([
                'key'  => 'この項目は必須です。',
                'name' => 'この項目は必須です。',
            ]);
    }

    /**
     * @test
     */
    public function 重複keyのバリデーション(): void
    {
        $data = [
            'key'  => 'ABC_001',
            'name' => 'テストプロジェクト'
        ];

        Project::create([
            'key'  => $data['key'],
            'name' => '重複テスト'
        ]);

        $response = $this->postJson(self::URL, $data);
        $response
            ->assertUnprocessable()
            ->assertInvalid(['key' => 'すでに使用されています。']);
    }
}
