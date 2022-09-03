<?php
declare(strict_types=1);

namespace App\UseCases\Issue;

use App\Models\Issue;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class IndexAction
{
    // 表示数
    const DISPLAY_NUMBER = 20;

    /**
     * 課題一覧
     *
     * @param Request $request
     * @return LengthAwarePaginator
     */
    public function __invoke(Request $request): LengthAwarePaginator
    {
        $query = Issue::with([
            'project' => fn ($q) => $q->select(
                'id',
                'key',
                'name'
            ),
            'status' => fn ($q) => $q->select(
                'id',
                'name',
                'color'
            ),
        ])->select(
            'id',
            'subject',
            'status_id',
            'priority_id',
            'project_key',
            'due_at',
            'updated_at',
            'created_at'
        );

        // project_keyで絞り込む
        if ($request->anyFilled('project_key')) {
            $query->where('project_key', $request->project_key);
        }

        return $query->latest()->paginate(self::DISPLAY_NUMBER);
    }
}
