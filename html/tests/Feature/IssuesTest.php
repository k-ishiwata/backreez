<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Issue;
use App\Models\IssueStatus;
use App\Models\Project;
use App\Models\User;
use App\UseCases\Issue\IndexAction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class IssuesTest extends TestCase
{
    use RefreshDatabase;

    private const URL = '/api/issues';

    /**
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();
        $this->actingAs($user);
        $this->user = Auth::user();
    }

    /**
     * テストデータの登録
     *
     * @return void
     */
    private function createData(): void
    {
        $projects = Project::factory(5)->create();
        $issueStatuses = IssueStatus::factory(5)->create();
        Issue::factory(50)
            ->state(new Sequence(
                fn () => ['project_key' => $projects->random()->key],
            ))
            ->recycle($issueStatuses)
            ->create([
                'user_id' => $this->user->id
            ]);
    }

    /**
     * @test
     */
    public function 一覧を取得できる(): void
    {
        $this->createData();

        $this->getJson(self::URL)
            ->assertOk()
            ->assertJsonCount(IndexAction::DISPLAY_NUMBER, 'data')
            ->assertJsonStructure([
                'data' => [
                    [
                        'subject',
                        'status_id',
                        'priority_id',
                        'project_key',
                        'due_at',
                        'project' => [
                            'id',
                            'key',
                            'name',
                        ],
                        'status' => [
                            'id',
                            'name',
                            'color',
                        ],
                        'user' => [
                            'id',
                            'name',
                        ],
                    ]
                ]
            ]);
    }

    /**
     * @test
     */
    public function 詳細表示できる(): void
    {
        $this->createData();

        $issue = Issue::with([
            'status:id,name,color',
            'user:id,name'
        ])->first();

        $this->getJson(self::URL . '/' . $issue->id)
            ->assertOk()
            ->assertJsonFragment($issue->toArray());
    }

    /**
     * @test
     */
    public function 登録できる(): void
    {
        $this->createData();

        $project = Project::first();
        $data = [
            'subject' => 'テスト課題',
            'body' => 'テスト内容',
            'status_id' => 1,
            'priority_id' => 1,
            'project_key' => $project->key,
            'due_at' => '2022-04-01 10:00',
            'user_id' => 1,
        ];

        $this->postJson(self::URL, $data)
            ->assertCreated()
            ->assertJsonFragment([
                ...$data,
                'due_at' => Carbon::parse($data['due_at'])
            ]);

        $this->assertDatabaseHas('issues', $data);
    }

    /**
     * @test
     */
    public function 更新できる(): void
    {
        $this->createData();

        $issue = Issue::first();

        $issue->subject = '書き換え';
        $issue->body    = '内容書き換え';
        $issue->user_id = 2;

        $this->putJson(self::URL.'/'.$issue->id, $issue->toArray())
            ->assertOk();

        $this->assertDatabaseHas('issues', $issue->only([
            'id', 'subject', 'body', 'user_id'
        ]));
    }

    /**
     * @test
     */
    public function 削除できる(): void
    {
        $this->createData();

        $issue = Issue::first();

        $this->deleteJson(self::URL.'/'.$issue->id)
            ->assertOk();

        $this->assertDatabaseMissing('issues', $issue->only([
            'id', 'subject'
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
                'subject'     => 'この項目は必須です。',
                'project_key' => 'この項目は必須です。',
            ]);
    }

    /**
     * @test
     */
    public function 文字数のバリデーション(): void
    {
        $data = [
            'subject' => str_repeat('あ', 256)
        ];

        $this->postJson(self::URL, $data)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'subject' => '255文字以下で入力してください。'
            ]);
    }
}
