<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Project;
use App\UseCases\Project\IndexAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectsTest extends TestCase
{
    use RefreshDatabase;

    const URL = '/api/projects';

    public function setUp(): void
    {
        parent::setUp();

        Project::factory(40)->create();
    }

    /**
     * @test
     */
    public function 一覧を取得できる(): void
    {
        $response = $this->getJson(self::URL);
        $response
            ->assertOk()
            ->assertJsonCount(IndexAction::DISPLAY_NUMBER, 'data')
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
    public function idで取得できる(): void
    {
        $data = Project::first();

        $response = $this->getJson(self::URL . '/' . $data->id);
        $response
            ->assertOk()
            ->assertExactJson($data->toArray());
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
            'id', 'name', 'description'
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

        $this->assertDatabaseMissing('projects', $data->only([
            'id', 'name', 'description'
        ]));
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
