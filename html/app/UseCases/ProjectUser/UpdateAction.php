<?php

declare(strict_types=1);

namespace App\UseCases\ProjectUser;

use App\Models\Project;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UpdateAction
{
    /**
     * @param  int  $project_id
     * @param  int  $user_id
     * @return bool
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function __invoke(int $project_id, int $user_id): bool
    {
        $project = Project::find($project_id);

        if (is_null($project)) {
            throw new NotFoundHttpException();
        }

        Gate::authorize('isAssign', $project);

        $project->users()->attach($user_id);

        return true;
    }
}
