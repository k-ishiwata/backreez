<?php

declare(strict_types=1);

namespace App\UseCases\Issue;

use App\Models\Issue;
use Illuminate\Support\ValidatedInput;

class StoreAction
{
    /**
     * 課題登録
     *
     * @param  ValidatedInput  $request
     * @return Issue
     */
    public function __invoke(ValidatedInput $request): Issue
    {
        return Issue::create($request->all());
    }
}
