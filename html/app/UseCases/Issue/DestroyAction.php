<?php
declare(strict_types=1);

namespace App\UseCases\Issue;

use App\Models\Issue;

class DestroyAction
{
    /**
     * 課題削除
     *
     * @param  Issue  $issue
     * @return bool
     */
    public function __invoke(Issue $issue): bool
    {
        return $issue->delete();
    }
}
