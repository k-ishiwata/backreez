<?php

declare(strict_types=1);

namespace App\UseCases\ProjectUser;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ShowAction
{
    /**
     * @param  int  $project_id
     * @return Collection
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function __invoke(int $project_id): Collection
    {
        $project = Project::with('users:id,name,email,created_at,updated_at')->find($project_id);

        if (is_null($project)) {
            throw new NotFoundHttpException();
        }

        Gate::authorize('isAssign', $project);

        return $project->users;
    }
}
