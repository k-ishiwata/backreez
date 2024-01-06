<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Issue;
use App\Models\IssueStatus;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
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
     * @param  int  $count
     * @param  int|null  $userId
     * @return Collection
     */
    private function createProjectData(int $count = 5, int $userId = null): Collection
    {
        return Project::factory($count)
            ->create()
            ->each(fn ($project) =>
                $project->users()->attach($userId ?? $this->user->id)
            );
    }

    /**
     * テストデータの登録
     *
     * @param  int|null  $userId
     * @return Collection
     */
    private function createData(int $userId = null): Collection
    {
        $projects = $this->createProjectData(userId: $userId);
        $issueStatuses = IssueStatus::factory(5)->create();
        return Issue::factory(50)
            ->recycle($projects)
            ->recycle($issueStatuses)
            ->create([
                'user_id' => $userId ?? $this->user->id
            ]);
    }

    /**
     * @test
     */
    public function 一覧を取得できる(): void
    {
        $issue = $this->createData()[0];
        $project = $issue->project;

        $this->getJson(self::URL . '?project_key=' . $project->key)
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    [
                        'id',
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
    public function 一覧subjectで検索できる(): void
    {
        $project = $this->createProjectData(1)[0];

        $data = [
            ['subject' => 'BAB', 'project_id' => $project->id],
            ['subject' => 'AAA', 'project_id' => $project->id],
            ['subject' => 'BBB', 'project_id' => $project->id],
        ];

        foreach ($data as $d) {
            Issue::factory($d)->create();
        }

        $this->getJson(self::URL . '?subject=A&project_key=' . $project->key)
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment(['subject' => 'BAB']);
    }

    /**
     * @test
     */
    public function 一覧status_idで検索できる(): void
    {
        $project = $this->createProjectData(1)[0];

        $data = [
            ['status_id' => 1, 'project_id' => $project->id],
            ['status_id' => 2, 'project_id' => $project->id],
            ['status_id' => 2, 'project_id' => $project->id],
        ];

        foreach ($data as $d) {
            Issue::factory($d)->create();
        }

        $this->getJson(self::URL . '?status_id=2&project_key=' . $project->key)
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonFragment(['status_id' => 2]);
    }

    /**
     * @test
     */
    public function 一覧priority_idで検索できる(): void
    {
        $project = $this->createProjectData(1)[0];

        $data = [
            ['priority_id' => 1, 'project_id' => $project->id],
            ['priority_id' => 2, 'project_id' => $project->id],
            ['priority_id' => 2, 'project_id' => $project->id],
        ];

        foreach ($data as $d) {
            Issue::factory($d)->create();
        }

        $this->getJson(self::URL . '?priority_id=2&project_key=' . $project->key)
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
        $issue = $this->createData()[0];

        $data = [
            'subject' => 'テスト課題',
            'body' => 'テスト内容',
            'status_id' => 1,
            'priority_id' => 1,
            'project_id' => $issue->project->id,
            'due_at' => '2022-04-01 10:00',
            'user_id' => $issue->project->users[0]->id,
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
        $issue = $this->createData()[0];

        $issue->subject = '書き換え';
        $issue->body    = '内容書き換え';

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
        $issue = $this->createData()[0];

        $this->deleteJson(self::URL.'/'.$issue->id)
            ->assertOk();

        $this->assertSoftDeleted('issues', $issue->only([
            'id', 'subject'
        ]));
    }

    /**
     * @test
     */
    public function アサインされてないプロジェクトへは登録できない(): void
    {
        $user = User::factory()->create();
        $issue = $this->createData(userId: $user->id)[0];

        $data = [
            'subject' => 'テスト課題',
            'body' => 'テスト内容',
            'status_id' => 1,
            'priority_id' => 1,
            'project_id' => $issue->project->id,
            'due_at' => '2022-04-01 10:00',
            'user_id' => 99999,
        ];

        $this->postJson(self::URL, $data)
            ->assertForbidden();
    }

    /**
     * @test
     */
    public function アサインされてない課題は更新できない(): void
    {
        $user = User::factory()->create();
        $issue = $this->createData(userId: $user->id)[0];

        $this->putJson(self::URL.'/'.$issue->id, $issue->toArray())
            ->assertForbidden();
    }

    /**
     * @test
     */
    public function アサインされてない課題は削除できない(): void
    {
        $user = User::factory()->create();
        $issue = $this->createData(userId: $user->id)[0];

        $this->deleteJson(self::URL.'/'.$issue->id)
            ->assertForbidden();
    }

    /**
     * @test
     */
    public function user_idがアサインされてない課題は登録できない(): void
    {
        $issue = $this->createData()[0];

        $data = [
            'subject' => 'テスト課題',
            'project_id' => $issue->project->id,
            'user_id' => 99999,
        ];

        $this->postJson(self::URL, $data)
            ->assertJsonValidationErrors([
                'user_id' => '指定したユーザーはこのプロジェクトにアサインされてません。'
            ]);
    }

    /**
     * @test
     */
    public function user_idがアサインされてない課題は更新できない(): void
    {
        $issue = $this->createData()[0];

        $issue->user_id = 99999;

        $this->putJson(self::URL.'/'.$issue->id, $issue->toArray())
            ->assertJsonValidationErrors([
                'user_id' => '指定したユーザーはこのプロジェクトにアサインされてません。'
            ]);
    }

    /**
     * @test
     */
    public function 必須項目のバリデーション(): void
    {
        $issue = $this->createData()[0];

        $data = [
            'project_id' => $issue->project->id,
        ];

        $this->postJson(self::URL, $data)
            ->assertUnprocessable()
            ->assertInvalid([
                'subject' => 'この項目は必須です。',
            ]);
    }

    /**
     * @test
     */
    public function 文字数のバリデーション(): void
    {
        $issue = $this->createData()[0];

        $data = [
            'project_id' => $issue->project->id,
            'subject' => str_repeat('あ', 256),
        ];

        $this->postJson(self::URL, $data)
            ->assertUnprocessable()
            ->assertJsonValidationErrors([
                'subject' => '255文字以下で入力してください。'
            ]);
    }
}
