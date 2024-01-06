<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\UseCases\Project\DestroyAction;
use App\UseCases\Project\IndexAction;
use App\UseCases\Project\StoreAction;
use App\UseCases\Project\UpdateAction;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ProjectController extends Controller
{
    /**
     * @param  IndexAction  $action
     * @return JsonResponse
     */
    public function index(IndexAction $action): JsonResponse
    {
        return response()->json($action());
    }

    /**
     * @param  StoreAction  $action
     * @param  ProjectRequest  $request
     * @return JsonResponse
     */
    public function store(StoreAction $action, ProjectRequest $request): JsonResponse
    {
        return response()->json($action($request->safe()), Response::HTTP_CREATED);
    }

    /**
     * @param  string  $key
     * @return JsonResponse
     */
    public function show(string $key): JsonResponse
    {
        $project = Project::with('users:id,name')->where('key', $key)->first();
        $this->authorize('isAssign', $project);
        return response()->json($project);
    }

    /**
     * @param  UpdateAction  $action
     * @param  ProjectRequest  $request
     * @param  Project  $project
     * @return JsonResponse
     */
    public function update(UpdateAction $action, ProjectRequest $request, Project $project): JsonResponse
    {
        $this->authorize('isAssign', $project);
        return response()->json($action($request->safe(), $project));
    }

    /**
     * @param  DestroyAction  $action
     * @param  Project  $project
     * @return JsonResponse
     */
    public function destroy(DestroyAction $action, Project $project): JsonResponse
    {
        $this->authorize('isAssign', $project);
        return response()->json($action($project));
    }
}
