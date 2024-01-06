<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ProjectUserRequest;
use App\UseCases\ProjectUser\DestroyAction;
use App\UseCases\ProjectUser\ShowAction;
use App\UseCases\ProjectUser\UpdateAction;
use Illuminate\Http\JsonResponse;

class ProjectUserController extends Controller
{
    /**
     * ユーザーの割り当て
     *
     * @param  UpdateAction  $action
     * @param  ProjectUserRequest  $request
     * @param  int  $project_id
     * @return JsonResponse
     */
    public function update(
        UpdateAction $action,
        ProjectUserRequest $request,
        int $project_id
    ): JsonResponse {
        return response()->json($action($project_id, $request->input('user_id')));
    }

    /**
     * プロジェクトに割り当てされたユーザー一覧を取得
     *
     * @param  int  $project_id
     * @return JsonResponse
     */
    public function show(
        ShowAction $action,
        int $project_id
    ): JsonResponse {
        return response()->json($action($project_id));
    }

    /**
     * プロジェクトの割り当て解除
     *
     * @param  int  $project_id
     * @param  ProjectUserRequest  $request
     * @return JsonResponse
     */
    public function destroy(
        DestroyAction $action,
        ProjectUserRequest $request,
        int $project_id
    ): JsonResponse {
        return response()->json($action($project_id, $request->input('user_id')));
    }
}
