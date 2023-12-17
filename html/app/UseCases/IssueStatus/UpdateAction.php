<?php

declare(strict_types=1);

namespace App\UseCases\IssueStatus;

use App\Models\IssueStatus;
use Illuminate\Support\ValidatedInput;

class UpdateAction
{
    /**
     * 課題ステータス更新
     *
     * @param  ValidatedInput  $request
     * @param  IssueStatus  $project
     * @return bool
     */
    public function __invoke(ValidatedInput $request, IssueStatus $project): bool
    {
        return $project->update($request->all());
    }
}
