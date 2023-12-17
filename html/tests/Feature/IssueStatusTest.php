<?php

declare(strict_types=1);

namespace Feature;

use App\Models\IssueStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class IssueStatusTest extends TestCase
{
    use RefreshDatabase;

    const URL = '/api/issue-statuses';

    public function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();
        $this->actingAs($user);
        $this->user = Auth::user();

        IssueStatus::factory(5)->create();
    }

    /**
     * @test
     */
    public function 一覧を取得できる(): void
    {
        $this->getJson(self::URL)
            ->assertOk()
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'name',
                    'color',
                ]
            ]);
    }

    /**
     * @test
     */
    public function 登録できる(): void
    {
        $data = [
            'name'  => 'ステータス1',
            'color' => '#ddd',
        ];

        $this->postJson(self::URL, $data)
            ->assertCreated()
            ->assertJsonFragment($data);

        $this->assertDatabaseHas('issue_statuses', $data);
    }

    /**
     * @test
     */
    public function idで取得できる(): void
    {
        $data = IssueStatus::first();

        $this->getJson(self::URL . '/' . $data->id)
            ->assertOk()
            ->assertExactJson($data->toArray());
    }

    /**
     * @test
     */
    public function 更新できる(): void
    {
        $data = IssueStatus::first();

        $data->name = '書き換え';
        $data->description = '内容書き換え';

        $this->putJson(self::URL.'/'.$data->id, $data->toArray())
            ->assertOk();

        $this->assertDatabaseHas('issue_statuses', $data->only([
            'id', 'name', 'color'
        ]));
    }

    /**
     * @test
     */
    public function 削除できる(): void
    {
        $data = IssueStatus::first();

        $this->deleteJson(self::URL.'/'.$data->id)
            ->assertOk();

        $this->assertDatabaseMissing('issue_statuses', $data->only([
            'id', 'name', 'color'
        ]));
    }

    /**
     * @test
     */
    public function 必須項目のバリデーション(): void
    {
        $this->postJson(self::URL, [])
            ->assertUnprocessable()
            ->assertInvalid([
                'name'  => 'この項目は必須です。',
                'color' => 'この項目は必須です。',
            ]);
    }
}
