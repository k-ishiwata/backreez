<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Issue;
use App\Models\IssueStatus;
use App\Models\Project;
use App\Models\User;
use App\UseCases\Issue\IndexAction;
use Carbon\Carbon;
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
            ->recycle($projects)
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
                        'project_id',
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
    public function 一覧project_key検索できる(): void
    {
        $projects = Project::factory(2)->create();

        Issue::factory(['project_id' => $projects[0]->id])->create();
        Issue::factory(['project_id' => $projects[0]->id])->create();
        Issue::factory(['project_id' => $projects[1]->id])->create();

        $this->getJson(self::URL . '?project_key=' . $projects[0]->key)
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment(['project_id' => $projects[0]->id]);
    }

    /**
     * @test
     */
    public function 一覧project_id検索できる(): void
    {
        Issue::factory(['project_id' => 1])->create();
        Issue::factory(['project_id' => 1])->create();
        Issue::factory(['project_id' => 2])->create();

        $this->getJson(self::URL . '?project_id=1')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment(['project_id' => 1]);
    }

    /**
     * @test
     */
    public function 一覧subjectで検索できる(): void
    {
        Issue::factory(['subject' => 'BAB'])->create();
        Issue::factory(['subject' => 'AAA'])->create();
        Issue::factory(['subject' => 'BBB'])->create();

        $this->getJson(self::URL . '?subject=A')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment(['subject' => 'BAB']);
    }

    /**
     * @test
     */
    public function 一覧status_idで検索できる(): void
    {
        Issue::factory(['status_id' => 1])->create();
        Issue::factory(['status_id' => 2])->create();
        Issue::factory(['status_id' => 2])->create();

        $this->getJson(self::URL . '?status_id=2')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment(['status_id' => 2]);
    }

    /**
     * @test
     */
    public function 一覧priority_idで検索できる(): void
    {
        Issue::factory(['priority_id' => 1])->create();
        Issue::factory(['priority_id' => 2])->create();
        Issue::factory(['priority_id' => 2])->create();

        $this->getJson(self::URL . '?priority_id=2')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment(['priority_id' => 2]);
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
            'project_id' => $project->id,
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

        $this->assertSoftDeleted('issues', $issue->only([
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
                'project_id' => 'この項目は必須です。',
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
