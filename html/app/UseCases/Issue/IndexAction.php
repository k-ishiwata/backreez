<?php

declare(strict_types=1);

namespace App\UseCases\Issue;

use App\Models\Issue;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class IndexAction
{
    // 表示数
    public const DISPLAY_NUMBER = 20;

    /**
     * 課題一覧
     *
     * @param  Request  $request
     * @return LengthAwarePaginator
     */
    public function __invoke(Request $request): LengthAwarePaginator
    {
        $query = Issue::with([
            'project:id,key,name',
            'status:id,name,color',
            'user:id,name'
        ])->select(
            'id',
            'subject',
            'status_id',
            'priority_id',
            'project_key',
            'due_at',
            'user_id',
            'updated_at',
            'created_at'
        );

        // project_keyで絞り込む
        if ($request->filled('project_key')) {
            $query->where('project_key', $request->project_key);
        }

        return $query->latest()->paginate(self::DISPLAY_NUMBER);
    }
}
