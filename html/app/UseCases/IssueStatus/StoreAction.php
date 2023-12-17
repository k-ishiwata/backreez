<?php

declare(strict_types=1);

namespace App\UseCases\IssueStatus;

use App\Models\IssueStatus;
use Illuminate\Support\ValidatedInput;

class StoreAction
{
    /**
     * 課題ステータス登録
     *
     * @param  ValidatedInput  $request
     * @return IssueStatus
     */
    public function __invoke(ValidatedInput $request): IssueStatus
    {
        return IssueStatus::create($request->all());
    }
}
