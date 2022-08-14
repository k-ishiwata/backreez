<?php
declare(strict_types=1);

namespace App\UseCases\Issue;

use App\Models\Issue;
use Illuminate\Pagination\LengthAwarePaginator;

class IndexAction
{
    // 表示数
    const DISPLAY_NUMBER = 60;

    /**
     * 課題一覧
     *
     * @return LengthAwarePaginator
     */
    public function __invoke(): LengthAwarePaginator
    {
        return Issue::with([
            'project' => fn ($q) => $q->select(
                'id',
                'key',
                'name'
            )
        ])->select(
            'subject',
            'status_id',
            'priority_id',
            'project_id',
            'due_at',
            'updated_at',
            'created_at'
        )->latest()->paginate(self::DISPLAY_NUMBER);
    }
}
