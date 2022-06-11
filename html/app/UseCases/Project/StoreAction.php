<?php
declare(strict_types=1);

namespace App\UseCases\Project;

use App\Models\Project;
use Illuminate\Support\ValidatedInput;

class StoreAction
{
    /**
     * プロジェクト登録
     *
     * @param  ValidatedInput $request
     * @return Project
     */
    public function __invoke(ValidatedInput $request): Project
    {
        return Project::create($request->all());
    }
}
