<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\IssueStatusRequest;
use App\Models\IssueStatus;
use App\UseCases\IssueStatus\DestroyAction;
use App\UseCases\IssueStatus\IndexAction;
use App\UseCases\IssueStatus\StoreAction;
use App\UseCases\IssueStatus\UpdateAction;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class IssueStatusController extends Controller
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
     * @param  IssueStatusRequest  $request
     * @return JsonResponse
     */
    public function store(StoreAction $action, IssueStatusRequest $request): JsonResponse
    {
        return response()->json($action($request->safe()), Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  IssueStatus  $issueStatus
     * @return JsonResponse
     */
    public function show(IssueStatus $issueStatus): JsonResponse
    {
        return response()->json($issueStatus);
    }

    /**
     * @param  UpdateAction  $action
     * @param  IssueStatusRequest  $request
     * @param  IssueStatus  $issueStatus
     * @return JsonResponse
     */
    public function update(UpdateAction $action, IssueStatusRequest $request, IssueStatus $issueStatus): JsonResponse
    {
        return response()->json($action($request->safe(), $issueStatus));
    }

    /**
     * @param  DestroyAction  $action
     * @param  IssueStatus  $issueStatus
     * @return JsonResponse
     */
    public function destroy(DestroyAction $action, IssueStatus $issueStatus): JsonResponse
    {
        return response()->json($action($issueStatus));
    }
}
