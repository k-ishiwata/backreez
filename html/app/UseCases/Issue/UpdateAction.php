<?php
declare(strict_types=1);

namespace App\UseCases\Issue;

use App\Models\Issue;
use Illuminate\Support\ValidatedInput;

class UpdateAction
{
    /**
     * 課題更新
     *
     * @param  ValidatedInput  $request
     * @param  Issue  $issue
     * @return bool
     */
    public function __invoke(ValidatedInput $request, Issue $issue): bool
    {
        return $issue->update($request->all());
    }
}
