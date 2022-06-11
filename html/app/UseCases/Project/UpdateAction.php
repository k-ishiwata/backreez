<?php
declare(strict_types=1);

namespace App\UseCases\Project;

use App\Models\Project;
use Illuminate\Support\ValidatedInput;

class UpdateAction
{
    /**
     * プロジェクト更新
     *
     * @param  ValidatedInput  $request
     * @param  Project  $project
     * @return bool
     */
    public function __invoke(ValidatedInput $request, Project $project)
    {
        return $project->update($request->all());
    }
}
