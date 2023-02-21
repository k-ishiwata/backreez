<?php

declare(strict_types=1);

namespace App\UseCases\Project;

use App\Models\Project;

class DestroyAction
{
    /**
     * プロジェクト削除
     *
     * @param  Project  $project
     * @return bool
     */
    public function __invoke(Project $project): bool
    {
        return $project->delete();
    }
}
