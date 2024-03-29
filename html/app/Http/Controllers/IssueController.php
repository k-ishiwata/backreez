<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\IssueIndexRequest;
use App\Http\Requests\IssueRequest;
use App\Models\Issue;
use App\UseCases\Issue\DestroyAction;
use App\UseCases\Issue\IndexAction;
use App\UseCases\Issue\StoreAction;
use App\UseCases\Issue\UpdateAction;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class IssueController extends Controller
{
    /**
     * @param  IndexAction  $action
     * @param  IssueIndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexAction $action, IssueIndexRequest $request): JsonResponse
    {
        return response()->json($action($request));
    }

    /**
     * @param  StoreAction  $action
     * @param  IssueRequest  $request
     * @return JsonResponse
     */
    public function store(
        StoreAction $action,
        IssueRequest $request
    ): JsonResponse {
        return response()->json(
            $action($request->safe()),
            Response::HTTP_CREATED
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  Issue  $issue
     * @return JsonResponse
     */
    public function show(Issue $issue): JsonResponse
    {
        $this->authorize('isAssign', $issue);

        $issue->load([
            'status:id,name,color',
            'user:id,name',
        ]);
        return response()->json($issue);
    }

    /**
     * @param  UpdateAction  $action
     * @param  IssueRequest  $request
     * @param  Issue  $issue
     * @return JsonResponse
     */
    public function update(
        UpdateAction $action,
        IssueRequest $request,
        Issue $issue
    ): JsonResponse {
        return response()->json($action($request->safe(), $issue));
    }

    /**
     * @param  DestroyAction  $action
     * @param  Issue  $issue
     * @return JsonResponse
     */
    public function destroy(
        DestroyAction $action,
        Issue $issue
    ): JsonResponse {
        $this->authorize('isAssign', $issue);
        return response()->json($action($issue));
    }
}
