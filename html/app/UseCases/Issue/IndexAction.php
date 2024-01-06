<?php

declare(strict_types=1);

namespace App\UseCases\Issue;

use App\Models\Issue;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class IndexAction
{
    // 表示数
    public const DISPLAY_NUMBER = 20;

    /**
     * 課題一覧
     *
     * @param  Request  $request
     * @return LengthAwarePaginator|null
     */
    public function __invoke(Request $request): LengthAwarePaginator|null
    {
        // project_keyで検索された場合はprojectからidを取得
        $project = Project::where('key', $request->input('project_key'))->first();

        if (is_null($project)) {
            throw ValidationException::withMessages([
                'project_key' => '指定したプロジェクトは登録されてません。'
            ]);
        }

        if (! $project->isAssign(Auth::id())) {
            throw new AccessDeniedHttpException();
        }

        $request->merge(['project_id' => $project->id]);

        return Issue::with([
            'project:id,key,name',
            'status:id,name,color',
            'user:id,name'
        ])
        ->select(
            'id',
            'subject',
            'status_id',
            'priority_id',
            'project_id',
            'due_at',
            'user_id',
            'updated_at',
            'created_at'
        )
        ->search($request)
        ->latest()
        ->paginate(self::DISPLAY_NUMBER);
    }
}
