<?php

declare(strict_types=1);

namespace App\UseCases\Project;

use App\Models\Project;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class IndexAction
{
    // 表示数
    const DISPLAY_NUMBER = 20;

    /**
     * プロジェクト一覧
     *
     * @return LengthAwarePaginator
     */
    public function __invoke(): LengthAwarePaginator
    {
        return Project::whereHas('users', fn ($query) =>
            $query->where('user_id', Auth::id())
        )
        ->latest()
        ->paginate(self::DISPLAY_NUMBER);
    }
}
