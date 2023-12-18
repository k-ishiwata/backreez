<?php

declare(strict_types=1);

namespace App\UseCases\IssueStatus;

use App\Models\IssueStatus;
use Illuminate\Support\Collection;

class SelectListAction
{
    /**
     * セレクトボックス用ユーザー一覧
     *
     * @return Collection
     */
    public function __invoke(): Collection
    {
        return IssueStatus::select(['id as value', 'name as label'])->get();
    }
}
