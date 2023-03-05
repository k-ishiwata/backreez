<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\UseCases\User\SelectListAction;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * セレクトボックス用ユーザー一覧
     *
     * @param  SelectListAction  $action
     * @return JsonResponse
     */
    public function selectList(SelectListAction $action): JsonResponse
    {
        return response()->json($action());
    }
}
