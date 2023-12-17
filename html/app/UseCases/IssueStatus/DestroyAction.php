<?php

declare(strict_types=1);

namespace App\UseCases\IssueStatus;

use App\Models\IssueStatus;

class DestroyAction
{
    /**
     * プロジェクト削除
     *
     * @param  IssueStatus  $issueStatus
     * @return bool
     */
    public function __invoke(IssueStatus $issueStatus): bool
    {
        return $issueStatus->delete();
    }
}
