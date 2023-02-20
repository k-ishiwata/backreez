<?php /** @noinspection NonAsciiCharacters */
declare(strict_types=1);

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Issue;
use App\Models\Project;
use App\UseCases\Issue\IndexAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Carbon\Carbon;

class IssuesTest extends TestCase
{
    use RefreshDatabase;

    const URL = '/api/issues';

    public function setUp(): void
    {
        parent::setUp();

        Project::factory(10)->create();
        Issue::factory(100)->create();
    }

    /**
     * @test
     */
    public function 一覧を取得できる(): void
    {
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
                        'project'
                    ]
                ]
            ]);
    }

    /**
     * @test
     */
    public function 登録できる(): void
    {
        $project = Project::first();
        $data = [
            'subject' => 'テスト課題',
            'body' => 'テスト内容',
            'status_id' => 1,
            'priority_id' => 1,
            'project_key' => $project->key,
            'due_at' => '2022-04-01 10:00'
        ];

        $this->postJson(self::URL, $data)
            ->assertCreated()
            ->assertJsonFragment(
                array_merge($data, [
                    'due_at' => Carbon::parse($data['due_at'])
                ])
            );

        $this->assertDatabaseHas('issues', $data);
    }

    /**
     * @test
     */
    public function 更新できる(): void
    {
        $data = Issue::first();

        $data->subject = '書き換え';
        $data->body = '内容書き換え';

        $this->putJson(self::URL.'/'.$data->id, $data->toArray())
            ->assertOk();

        $this->assertDatabaseHas('issues', $data->only([
            'id', 'subject', 'body'
        ]));
    }

    /**
     * @test
     */
    public function 削除できる(): void
    {
        $data = Issue::first();

        $this->deleteJson(self::URL.'/'.$data->id)
            ->assertOk();

        $this->assertDatabaseMissing('issues', $data->only([
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
                'subject'  => 'この項目は必須です。',
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
