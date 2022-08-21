<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Issue;
use App\UseCases\Issue\IndexAction;
use App\UseCases\Issue\StoreAction;
use App\UseCases\Issue\UpdateAction;
use App\UseCases\Issue\DestroyAction;
use App\Http\Requests\IssueRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class IssueController extends Controller
{
    /**
     * @param  IndexAction  $action
     * @return JsonResponse
     */
    public function index(IndexAction $action, Request $request): JsonResponse
    {
        return response()->json($action($request));
    }

    /**
     * @param  StoreAction  $action
     * @param  IssueRequest  $request
     * @return JsonResponse
     */
    public function store(StoreAction $action, IssueRequest $request): JsonResponse
    {
        return response()->json($action($request->safe()), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  Issue  $issue
     * @return JsonResponse
     */
    public function show(Issue $issue): JsonResponse
    {
        return response()->json($issue);
    }

    /**
     * @param  UpdateAction  $action
     * @param  IssueRequest  $request
     * @param  Issue  $issue
     * @return JsonResponse
     */
    public function update(UpdateAction $action, IssueRequest $request, Issue $issue): JsonResponse
    {
        return response()->json($action($request->safe(), $issue));
    }

    /**
     * @param  DestroyAction  $action
     * @param  Issue  $issue
     * @return JsonResponse
     */
    public function destroy(DestroyAction $action, Issue $issue): JsonResponse
    {
        return response()->json($action($issue));
    }
}
