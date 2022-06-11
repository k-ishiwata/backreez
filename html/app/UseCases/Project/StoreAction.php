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
     * @param  ValidatedInput  $request
     * @return Project|\Illuminate\Database\Eloquent\Model
     */
    public function __invoke(ValidatedInput $request)
    {
        return Project::create($request->all());
    }
}
