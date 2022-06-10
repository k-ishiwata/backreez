<?php
declare(strict_types=1);

namespace App\UseCases\Project;

use App\Models\Project;
use Illuminate\Pagination\LengthAwarePaginator;

class IndexAction
{
    /**
     * プロジェクト一覧取得
     *
     * @return LengthAwarePaginator
     */
    public function __invoke(): LengthAwarePaginator
    {
        return Project::latest()->paginate(10);
    }
}
