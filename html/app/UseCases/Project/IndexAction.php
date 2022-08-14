<?php
declare(strict_types=1);

namespace App\UseCases\Project;

use App\Models\Project;
use Illuminate\Pagination\LengthAwarePaginator;

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
        return Project::latest()->paginate(self::DISPLAY_NUMBER);
    }
}
