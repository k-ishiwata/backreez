<?php

declare(strict_types=1);

namespace App\UseCases\User;

use App\Models\User;
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
        return User::select(['id as value', 'name as label'])->get();
    }
}
